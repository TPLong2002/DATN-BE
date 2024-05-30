import express from "express";
import bodyParser from "body-parser";
import env from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import allowCrossDomain from "./configs/configCORS";
import initApiRoutes from "./routes/index";
import swaggerDocs from "./swagger.js";

env.config();
const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(allowCrossDomain);
app.use(cors({ credentials: true, origin: true }));

initApiRoutes(app);

// app.get("/", (req, res) => {
//   res.send("Hello World");
// });

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
  swaggerDocs(app, port);
});
