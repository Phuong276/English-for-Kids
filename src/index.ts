import passport from "passport";
import express from "express";
import { getPassport } from "./helpers/passportHelpers";
import authRouter from "./routers/authRouter";
import usersRouter from "./routers/usersRouter";
import gamesRouter from "./routers/gamesRouter";
import cors from "cors";
import morgan from "morgan";

require("dotenv").config();

const app = express();

app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", "*");

  // Pass to next layer of middleware
  next();
});

app.use(passport.initialize());

const authenticate = getPassport();
app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));

app.use(authRouter);
app.use(usersRouter);
app.use(gamesRouter);

// app.use(authenticate.authenticate("jwt", { session: false }), usersRouter );

app.get(
  "/cow",
  authenticate.authenticate("jwt", { session: false }),
  async (req, res) => {
    res.json("oke");
  }
);

const port = process.env.PORT;

const server = app.listen(port, () =>
  console.log(`
🚀 Server ready at: http://localhost:${port}`)
);
