import passport from "passport";
import express from "express";
import { getPassport } from "./helpers/passportHelpers";
import authRouter from "./routers/authRouter";
import usersRouter from "./routers/usersRouter";
import gamesRouter from "./routers/gamesRouter";
import cors from "cors";
import morgan from "morgan";
import roundsRouter from "./routers/roundsRouter";
import questionsRouter from "./routers/questionsRouter";

require("dotenv").config();

const app = express();

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", "*");
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
app.use(roundsRouter);
app.use(questionsRouter);

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
