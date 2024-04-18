import { Router } from "express";
import userRoutes from "./user.route";
import profileRoutes from "./profile.route";
import classRoutes from "./class.route";
import feeRoutes from "./fee.route";
import markTypeRoutes from "./marktype.route";
import semesterRoutes from "./semester.route";
import conductRoutes from "./conduct.route";
import newsRoutes from "./news.route";
import subjectRoutes from "./subject.route";

const router = Router();
const initApiRoutes = (app) => {
  router.use("/user", userRoutes);
  router.use("/profile", profileRoutes);
  router.use("/class", classRoutes);
  router.use("/fee", feeRoutes);
  router.use("/marktype", markTypeRoutes);
  router.use("/semester", semesterRoutes);
  router.use("/conduct", conductRoutes);
  router.use("/news", newsRoutes);
  router.use("/subject", subjectRoutes);
  app.use("/api/v1/", router);
};
export default initApiRoutes;
