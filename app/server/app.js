import  express  from "express";
import {authRoutes} from "./routes/authRoutes.js";
import {migrationRoutes} from "./routes/migrationRoutes.js";
import {dataRoutes} from "./routes/dataRoutes.js";
import {config} from "./config/default.js";
import cookieParser from "cookie-parser";

const app = express();

app.listen(config.port, () => console.log(`Server is running on port: http://localhost:${config.port}`));
app.use(cookieParser());
app.use("/oauth2", authRoutes);
app.use("/data", dataRoutes);
app.use("/migrate", migrationRoutes);
