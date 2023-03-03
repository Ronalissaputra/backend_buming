import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import SequelizeStore from "connect-session-sequelize";
import db from "./config/Database.js";
import AuthRouter from "./routes/AuthRouter.js";
import IbuHamilRoute from "./routes/IbuHamilRoute.js";
import AdminRoute from "./routes/AdminRoute.js";
dotenv.config();

const app = express();
const sessionStore = SequelizeStore(session.Store);
const store = new sessionStore({
  db: db,
});

app.use(
  session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
      secure: "auto",
    },
  })
);

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);
app.use(express.json());
app.use(AdminRoute);
app.use(IbuHamilRoute);
app.use(AuthRouter);

app.listen(process.env.APP_PORT, () => {
  console.log("Server up and running...");
});

// (async () => {
//   await db.sync();
// })();
// store.sync();
