import db from "../models";
const getAllTranscriptsByStudentId = async (studentId) => {
  try {
    const res = await db.Users.findOne({
      where: { id: studentId },
      include: [
        {
          model: db.Transcripts,
          include: [
            {
              model: db.Marks,
            },
          ],
        },
      ],
    });
    if (res) {
      return { status: 200, message: "success", code: 0, data: res };
    } else {
      return { status: 500, message: "not found", code: 1, data: null };
    }
  } catch (error) {
    return { status: 500, message: error.message, code: -1, data: null };
  }
};
module.exports = { getAllTranscriptsByStudentId };
