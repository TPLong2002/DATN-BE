import db from "../models";
const getTranscriptsByStudentId = async (studentId) => {
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
const createTranscript = async (data) => {
  try {
    const res = await db.Transcripts.create(data);
    if (res) {
      return { status: 200, message: "success", code: 0, data: res };
    } else {
      return { status: 500, message: "fail", code: 1, data: null };
    }
  } catch (error) {
    return { status: 500, message: error.message, code: -1, data: null };
  }
};
const updateTranscript = async (data) => {
  try {
    const res = await db.Transcripts.update(data, {
      where: { id: data.id },
    });
    if (res) {
      return { status: 200, message: "success", code: 0, data: res };
    } else {
      return { status: 500, message: "fail", code: 1, data: null };
    }
  } catch (error) {
    return { status: 500, message: error.message, code: -1, data: null };
  }
};
const deleteTranscript = async (id) => {
  try {
    const res = await db.Transcripts.update(
      { ishidden: 1 },
      {
        where: { id: id },
      }
    );
    if (res) {
      return { status: 200, message: "success", code: 0, data: res };
    } else {
      return { status: 500, message: "fail", code: 1, data: null };
    }
  } catch (error) {
    return { status: 500, message: error.message, code: -1, data: null };
  }
};
module.exports = {
  getTranscriptsByStudentId,
  createTranscript,
  updateTranscript,
  deleteTranscript,
};
