const express = require("express");

const router = express.Router();

const {

getStatus,

startRound,

endRound

}=require("../controllers/eventController");

router.get("/status",getStatus);

router.post("/start",startRound);

router.post("/end",endRound);

module.exports=router;