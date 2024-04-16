import { Router } from "express";
import userRoutes from "./user.route";

const router = Router();
const initApiRoutes = (app) => {
  router.use("/user", userRoutes);
  app.use("/api/v1/", router);
};
export default initApiRoutes;
