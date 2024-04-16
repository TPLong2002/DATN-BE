import env from "dotenv";
env.config();
const allowCrossDomain = (req, res, next) => {
  res.header(`Access-Control-Allow-Origin`, process.env.URL);
  res.header(`Access-Control-Allow-Methods`, `GET,PUT,POST,DELETE`);
  res.header(`Access-Control-Allow-Headers`, `Content-Type`);
  next();
};
export default allowCrossDomain;
