import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import SequelizeStore from "connect-session-sequelize";
import db from "./config/Database.js";
// Router
import AuthRouter from "./routes/AuthRouter.js";
import Tb_userRoute from "./routes/Tb_userRoute.js";
import Tb_ibuhamilRoute from "./routes/Tb_ibuHamilRoute.js";
import Tb_bayilahirRoute from "./routes/Tb_bayilahirRoute.js";
import Tb_bayiRoute from "./routes/Tb_bayiRoute.js";
import Tb_kalaRoute from "./routes/Tb_kalaRoute.js";
import Tb_kaladuaRoute from "./routes/Tb_kaladuaRoute.js";
import Tb_kalatigaRoute from "./routes/Tb_kalatigaRoute.js";
import Tb_idntsreproduksiRoute from "./routes/Tb_idntsreproduksiRoute.js";
import Tb_kunjunganRoute from "./routes/Tb_kunjunganRoute.js";
import Tb_kunjunganbayiRoute from "./routes/Tb_kunjunganbayiRoute.js";
import Tb_masanifasRoute from "./routes/Tb_masanifasRoute.js";
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
app.use(Tb_userRoute);
app.use(AuthRouter);
app.use(Tb_ibuhamilRoute);
app.use(Tb_bayilahirRoute);
app.use(Tb_bayiRoute);
app.use(Tb_kalaRoute);
app.use(Tb_kaladuaRoute);
app.use(Tb_kalatigaRoute);
app.use(Tb_idntsreproduksiRoute);
app.use(Tb_kunjunganRoute);
app.use(Tb_kunjunganbayiRoute);
app.use(Tb_masanifasRoute);

app.listen(process.env.APP_PORT, () => {
  console.log("Server up and running...");
});

// (async () => {
//   await db.sync();
// })();
// store.sync();
