const router = require("express").Router();

const {
  getAllMessages,
  getOneMessage,
  findByAggregateQuery,
  findBymessageTypeAggregateQuery,
  findByAggregateQueryMessagePerDay
} = require("../controllers/message_controller");


router.get("/messageTracing", getAllMessages);
router.get("/messageTracingWithQuery", getOneMessage);
router.get("/findByAggregateQuery", findByAggregateQuery);
router.get("/messageTypeAggregateQuery", findBymessageTypeAggregateQuery);
router.get("/findByAggregateQueryMessagePerDay", findByAggregateQueryMessagePerDay);
//router.post("/messageTracingWithQuery", getOneMessage);

module.exports = router;
