import express from "express";
import knex from "knex";
import bcrypt from "bcrypt";
import bodyParser from "body-parser";
import jwt from "jsonwebtoken";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import * as config from "./knexfile.js";
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const db = knex(config.development);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "./frontend", "dist")));

app.post("/register", (req, res) => {
  db("users")
    .insert({
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 10),
    })
    .then(() => {
      res.json({
        status: "success"
      });
    })
    .catch((err) => {
      res.json({
        status: "error",
        data: err,
      });
    });
});

app.post("/login", async (req, res) => {
  const user = await db
    .select("email","password")
    .from("users")
    .where({ email: req.body.email })
    .first();
  const token = jwt.sign(
    {
      date: Date.now(),
      email: user.email,
    },
    process.env.JWT_SECRET
  );
  if (bcrypt.compareSync(req.body.password, user.password)) {
    user.token = token;
    await db
      .from("users")
      .where({ email: user.email })
      .first()
      .update({ token: token });
  }
  res.json({
    status: "success",
    token: token,
  });
});

app.all('*',(req,res,next) => {
  // const valid = jwt.verify(req.headers.cookie.split("token=")[1], process.env.JWT_SECRET);
  next();
})

app.all("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./frontend/dist", "index.html"));
});

app.listen(3000, async () => {
  console.log("Server started...");
});
export default app;