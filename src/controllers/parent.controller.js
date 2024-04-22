import parentService from "../services/parent.service";
const getFeesByParentId = async (req, res) => {
  try {
    const fees = await parentService.getFeesByParentId(req.query.id);
    res.status(200).send(fees);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
module.exports = { getFeesByParentId };
