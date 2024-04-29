import db from "../models";
const getTranscriptsByStudentId = async (studentId) => {
  try {
    const [user, created] = await db.Users.findOrCreate({
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
      defaults: {
        name: "Transcript 0",
        user_id: studentId,
        rankedacademic_id: 6,
        conduct_id: 5,
        semester_id: 1,
        schoolyear: "2017-2018",
      },
    });
    if (created) {
      return {
        status: 200,
        message: "create new transcript success",
        code: 0,
        data: res,
      };
    } else {
      if (user) {
        return {
          status: 200,
          message: "success",
          code: 0,
          data: user,
        };
      } else {
        return { status: 500, message: "not found", code: 1, data: null };
      }
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
