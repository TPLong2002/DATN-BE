import groupService from "../services/group.service";
const getGroups = async (req, res) => {
  try {
    const result = await groupService.getGroups();
    res.status(result.status).send(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
module.exports = { getGroups };
