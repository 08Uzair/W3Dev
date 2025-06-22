import express from "express";
import cors from "cors"
import bodyParser from "body-parser";
import { dataBaseConnection } from "./db/connection.js";
import { userRouter } from "./routes/webhookRoutes.js";

const app = express();
const PORT = 8700;

app.use(cors());
dataBaseConnection();
app.use(bodyParser.json({ limit: "50mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use("/auth0", userRouter);
app.listen(PORT, () => {
  console.log(`SERVER IS RUNNING ON PORT ${PORT}`);
});
