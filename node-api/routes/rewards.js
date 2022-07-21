import { Router } from "express";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const rewardsRouter = Router();

const baseUrl = "https://atmosphere.myvtex.com";
const headers = {
  "X-VTEX-API-AppKey": process.env.VTEX_APPKEY,
  "X-VTEX-API-AppToken": process.env.VTEX_APPTOKEN,
};

const getPoints = async (email) => {
  const options = {
    method: "GET",
    url: `${baseUrl}/api/dataentities/CL/search?email=${email}&_fields=id,sPoints`,
    headers,
  };
  const response = await axios.request(options);
  return response.data;
};

const spendPoints = async (id, points) => {
  const options = {
    method: "PATCH",
    url: `${baseUrl}/api/dataentities/CL/documents/${id}`,
    headers,
    data: points,
  };
  return await axios.request(options);
};

// Obter pontos de recompensa de um usuário específico (via clientProfileId)
rewardsRouter.get("/", async (req, res) => {
  const { email } = req.query;
  const data = await getPoints(email);
  if (data.length === 0) throw Error("User not found");

  const [{ id, sPoints }] = data;

  res.json({
    id,
    rewardPoints: sPoints || 0,
  });
});

// Atualizar pontos de recompensa no Master Data da VTEX
rewardsRouter.post("/", async (req, res) => {
  const { email, pointsSpent } = req.body;
  const data = await getPoints(email);
  if (data.length === 0) throw Error("User not found");

  const [{ id, sPoints }] = data;
  const currentPoints = sPoints || 0;
  const balance = currentPoints - pointsSpent;

  const newData = { sPoints: balance < 0 ? 0 : balance };
  const response = await spendPoints(id, newData);
  if (response.status !== 204) throw Error();

  res.sendStatus(204);
});

export default rewardsRouter;
