const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

const Team = require("./models/team");
const Admin = require("./models/admin");

mongoose.connect(process.env.MONGO_URI)
.then(async () => {

    console.log("✅ MongoDB Connected");

    await Team.deleteMany({});
    await Admin.deleteMany({});

    await Admin.create({
        username: "admin",
        password: "admin123"
    });

    console.log("✅ Admin Created");

    const teams = [];

    for (let i = 1; i <= 20; i++) {

        teams.push({

            loginId: `TEAM${String(i).padStart(2,"0")}`,

            password: `TEAM${String(i).padStart(2,"0")}`,

            teamName: "",

            currentRound: 0

        });

    }

    await Team.insertMany(teams);

    console.log("✅ 20 Teams Created Successfully");

    process.exit();

})
.catch(err=>{

    console.log(err);

    process.exit();

});