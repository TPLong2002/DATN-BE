import transcriptService from "../services/transcript.service";
const getAllTranscriptsByStudentId = async (req, res) => {
  try {
    const studentId = req.query.studentId;
    const response = await transcriptService.getAllTranscriptsByStudentId(
      studentId
    );
    res.status(response.status).send(response);
  } catch (error) {
    res.status(500).send(error);
  }
};
module.exports = { getAllTranscriptsByStudentId };
