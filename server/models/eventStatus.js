const mongoose = require("mongoose");

const eventStatusSchema = new mongoose.Schema({

    currentRound:{

        type:Number,

        default:1

    },

    isLive:{

        type:Boolean,

        default:false

    },

    announcement:{

        type:String,

        default:"Waiting for Coordinator..."

    }

});

module.exports = mongoose.model("EventStatus",eventStatusSchema);