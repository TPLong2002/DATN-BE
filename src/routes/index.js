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
import assignmentRoutes from "./assignment.route";
import class_subject_userRoutes from "./class_subject_user.route";
import teacherRoutes from "./teacher.route";
import userFeeRoutes from "./userFee.route";
import parentRoutes from "./parent.route";
import studentRoutes from "./student.route";
import assignment_classRoutes from "./assignment_class.route";

const router = Router();
const initApiRoutes = (app) => {
  /**
   * @openapi
   * /api/v1/ping:
   *  get:
   *     tags:
   *     - Ping
   *     description: Returns API operational status
   *     responses:
   *       200:
   *         description: API is  running
   */
  router.get("/ping", (req, res) => res.sendStatus(200));
  router.use("/user", userRoutes);
  router.use("/profile", profileRoutes);
  router.use("/class", classRoutes);
  router.use("/fee", feeRoutes);
  router.use("/marktype", markTypeRoutes);
  router.use("/semester", semesterRoutes);
  router.use("/conduct", conductRoutes);
  router.use("/news", newsRoutes);
  router.use("/subject", subjectRoutes);
  router.use("/assignment", assignmentRoutes);
  router.use("/csu", class_subject_userRoutes);
  router.use("/teacher", teacherRoutes);
  router.use("/userfee", userFeeRoutes);
  router.use("/parent", parentRoutes);
  router.use("/student", studentRoutes);
  router.use("/assignment_class", assignment_classRoutes);
  app.use("/api/v1/", router);
};
export default initApiRoutes;
