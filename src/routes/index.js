import { Router } from "express";
import userRoutes from "./user.route";
import profileRoutes from "./profile.route";
import classRoutes from "./class.route";
import feeRoutes from "./fee.route";
import MarkTypeRoutes from "./marktype.route";

const router = Router();
const initApiRoutes = (app) => {
  router.use("/user", userRoutes);
  router.use("/profile", profileRoutes);
  router.use("/class", classRoutes);
  router.use("/fee", feeRoutes);
  router.use("/marktype", MarkTypeRoutes);
  app.use("/api/v1/", router);
};
export default initApiRoutes;
