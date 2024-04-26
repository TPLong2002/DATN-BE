import express from "express";
import transcriptController from "../controllers/transcript.controller";
const router = express.Router();

router.get("/", transcriptController.getAllTranscriptsByStudentId);

export default router;
