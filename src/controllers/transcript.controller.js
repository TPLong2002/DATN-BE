import transcriptService from "../services/transcript.service";
const getTranscriptsByStudentId = async (req, res) => {
  try {
    const studentId = req.query.studentId;
    const response = await transcriptService.getTranscriptsByStudentId(
      studentId
    );
    res.status(response.status).send(response);
  } catch (error) {
    res.status(500).send(error);
  }
};
const createTranscript = async (req, res) => {
  try {
    const data = req.body;
    const response = await transcriptService.createTranscript(data);
    res.status(response.status).send(response);
  } catch (error) {
    res.status(500).send(error);
  }
};
const updateTranscript = async (req, res) => {
  try {
    const data = req.body;
    const response = await transcriptService.updateTranscript(data);
    res.status(response.status).send(response);
  } catch (error) {
    res.status(500).send(error);
  }
};
const deleteTranscript = async (req, res) => {
  try {
    const id = req.query.id;
    const response = await transcriptService.deleteTranscript(id);
    res.status(response.status).send(response);
  } catch (error) {
    res.status(500).send(error);
  }
};
module.exports = {
  getTranscriptsByStudentId,
  createTranscript,
  deleteTranscript,
  updateTranscript,
};
