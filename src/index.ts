import passport from "passport";
import express from "express";
import { getPassport } from "./helpers/passportHelpers";
import authRouter from "./routers/authRouter";
import studentsRouter from "./routers/studentsRouter";

const app = express();

app.use(passport.initialize());

const authenticate = getPassport();
app.use(express.json());

app.use(authRouter);

app.use(authenticate.authenticate("jwt", { session: false }), studentsRouter);

app.get(
  "/cow",
  authenticate.authenticate("jwt", { session: false }),
  async (req, res) => {
    res.json("oke");
  }
);

const server = app.listen(3000, () =>
  console.log(`
🚀 Server ready at: http://localhost:3000`)
);
