import express from "express";
import bodyParser from "body-parser";
import env from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import allowCrossDomain from "./configs/configCORS";
import initApiRoutes from "./routes/index";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(allowCrossDomain);
app.use(cors({ credentials: true, origin: true }));
app.use(cookieParser());
env.config();

initApiRoutes(app);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(process.env.PORT || 8080);
