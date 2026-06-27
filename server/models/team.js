const mongoose = require("mongoose");

const TeamSchema = new mongoose.Schema({

    loginId: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    teamName: {
        type: String,
        default: ""
    },

    currentRound: {
        type: Number,
        default: 0
    },
    round1: {
    answers: {
        type: [String],
        default: Array(20).fill("")
    }
},

round2: {
    answers: {
        type: [String],
        default: Array(15).fill("")
    }
},

round3: {
    answers: {
        type: [String],
        default: Array(10).fill("")
    }
},

round4: {
    answers: {
        type: [String],
        default: Array(5).fill("")
    }
}
    

});

module.exports = mongoose.model("Team", TeamSchema);