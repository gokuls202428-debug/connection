const EventStatus = require("../models/eventStatus");


// Get Event Status

exports.getStatus = async(req,res)=>{

    try{

        let status = await EventStatus.findOne();

        if(!status){

            status = await EventStatus.create({});

        }

        res.json(status);

    }

    catch(err){

        res.status(500).json({

            message:"Server Error"

        });

    }

};



// Start Round

exports.startRound = async(req,res)=>{

    try{

        const {round} = req.body;

        let status = await EventStatus.findOne();

        if(!status){

            status = await EventStatus.create({});

        }

        status.currentRound = round;

        status.isLive = true;

        await status.save();

        res.json({

            success:true,

            message:"Round Started"

        });

    }

    catch(err){

        res.status(500).json({

            success:false

        });

    }

};


// End Round

exports.endRound = async(req,res)=>{

    try{

        let status = await EventStatus.findOne();

        status.isLive = false;

        await status.save();

        res.json({

            success:true,

            message:"Round Ended"

        });

    }

    catch(err){

        res.status(500).json({

            success:false

        });

    }

};