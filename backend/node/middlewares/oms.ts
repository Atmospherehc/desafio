/* eslint-disable no-console */
import type { ItemTotal } from "@vtex/clients";
import { json } from "co-body";

interface Data {
  id: string;
  sPoints: number | null;
}

const calculateRewardPoints = (totals: ItemTotal[]) => {
  const items = (totals.find((item) => item.id === "Items") as ItemTotal).value;
  const discounts = (totals.find(
    (item) => item.id === "Discounts"
  ) as ItemTotal).value;

  const points = items - discounts;

  return +points.toString().slice(0, -2);
};

const handleOrders = async (ctx: Context, next: () => Promise<any>) => {
  try {
    // Obtém id do pedido e extrai dados do cliente e total da comopra
    const { OrderId } = await json(ctx.req);
    const { clientProfileData, totals } = await ctx.clients.oms.order(OrderId);

    const user = {
      document: clientProfileData.document,
      awardedPoints: calculateRewardPoints(totals),
    };

    // Procura pelo usuário no Master Data e obtém a quantiade de pontos de recompensa atual
    const data: Data[] = await ctx.clients.masterdata.searchDocuments({
      dataEntity: "CL",
      where: `document=${user.document}`,
      fields: ["id", "sPoints"],
      pagination: {
        pageSize: 1,
        page: 1,
      },
    });

    // Atualiza os pontos de recompensa do usuário no Master Data
    if (data.length !== 0) {
      let [{ id, sPoints: currentPoints }] = data;
      if (!currentPoints) currentPoints = 0;
      const balance = currentPoints + user.awardedPoints;

      await ctx.clients.masterdata.updatePartialDocument({
        dataEntity: "CL",
        id,
        fields: {
          sPoints: balance,
        },
      });

      ctx.body = "OK";
      ctx.status = 200;
      ctx.set("Cache-Control", "no-cache no-store");
    } else {
      ctx.body = "User not found in the Master Data";
      ctx.status = 404;
    }

    await next();
  } catch (err) {
    ctx.body = JSON.stringify({
      message:
        err?.response?.data?.error?.message || "Could not save reward points",
    });
    ctx.status = 200;
    ctx.set("Cache-Control", "no-cache no-store");
    await next();
  }
};

export default handleOrders;
