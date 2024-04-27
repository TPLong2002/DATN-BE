import express from "express";
import transcriptController from "../controllers/transcript.controller";
const router = express.Router();

router.get("/", transcriptController.getTranscriptsByStudentId);
router.post("/", transcriptController.createTranscript);
router.put("/", transcriptController.updateTranscript);
router.delete("/", transcriptController.deleteTranscript);

export default router;
