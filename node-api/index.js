import express from "express";
import "express-async-errors";
import cors from "cors";
import rewardsRouter from "./routes/rewards";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.sendStatus(200));
app.use("/rewards", rewardsRouter);

app.use((err, req, res, next) => {
  if (err.message === "User not found") {
    res.status(400);
    res.json({ error: err.message });
  }

  next();
});

app.get("*", (req, res) => {
  res.status(404);
  res.json({ error: "Not Found" });
});

const HOSTNAME = process.env.HOSTNAME;
const PORT = process.env.PORT || 5000;

app.listen(PORT, HOSTNAME, () =>
  console.log(`🚀 Server listening on ${HOSTNAME}:${PORT}...`)
);
