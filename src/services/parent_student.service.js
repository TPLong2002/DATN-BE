import db from "../models";
import { Op } from "sequelize";
const addRetation = async (data) => {
  try {
    const result = await db.sequelize.transaction(async (transaction) => {
      const existingRelations = await db.Parent_Student.findAll({
        where: {
          [Op.or]: data.map((item) => ({
            student_id: item.student_id,
            parent_id: item.parent_id,
          })),
        },
        attributes: ["student_id", "parent_id"],
        transaction,
      });

      const existingRelationsSet = new Set(
        existingRelations.map((rel) => `${rel.student_id}-${rel.parent_id}`)
      );

      const newRelations = data.filter(
        (item) =>
          !existingRelationsSet.has(`${item.student_id}-${item.parent_id}`)
      );

      if (newRelations.length > 0) {
        return await db.Parent_Student.bulkCreate(newRelations, {
          transaction,
        });
      } else {
        throw new Error("No new relations to add");
      }
    });

    return { status: 200, code: 0, message: "Success", data: result };
  } catch (error) {
    return { status: 500, code: 1, message: error.message, data: [] };
  }
};
const deleteRetation = async (id) => {
  try {
    const result = await db.Parent_Student.destroy({
      where: { id },
    });

    return { status: 200, code: 0, message: "Success", data: result };
  } catch (error) {
    return { status: 500, code: 1, message: error.message, data: [] };
  }
};
module.exports = { addRetation, deleteRetation };
