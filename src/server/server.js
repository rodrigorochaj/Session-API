import express from "express";
import * as dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";

import router from "../routes/index.js";

dotenv.config();
const app = express();
app.use(router);
app.use(express.json());

const prisma = new PrismaClient();

await prisma.$connect().then(() => {
  console.log(`[Database] [CONNECTED - ${process.env.DATABASE_TYPE}]`);
}).catch((err) => {
  console.log(`[Database] [ERROR - ${process.env.DATABASE_TYPE}]`);
  console.log(err);
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

