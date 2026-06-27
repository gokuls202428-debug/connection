const Team = require("../models/team");
const Admin = require("../models/admin");

// =====================================
// TEAM LOGIN
// =====================================

const teamLogin = async (req, res) => {

    try {

        const { loginId, password } = req.body;

        if (!loginId || !password) {

            return res.status(400).json({
                success: false,
                message: "Login ID and Password are required"
            });

        }

        const team = await Team.findOne({
            loginId,
            password
        });

        if (!team) {

            return res.status(401).json({
                success: false,
                message: "Invalid Login ID or Password"
            });

        }

        return res.json({

            success: true,

            message: "Login Successful",

            team: {
                _id: team._id,
                loginId: team.loginId,
                teamName: team.teamName,
                currentRound: team.currentRound,
                round1: team.round1,
                round2: team.round2,
                round3: team.round3,
                round4: team.round4
            }

        });

    }

    catch (err) {

        console.error(err);

        return res.status(500).json({

            success: false,

            message: "Internal Server Error"

        });

    }

};



// =====================================
// ADMIN LOGIN
// =====================================

const adminLogin = async (req, res) => {

    try {

        const { username, password } = req.body;

        if (!username || !password) {

            return res.status(400).json({

                success: false,

                message: "Username and Password are required"

            });

        }

        const admin = await Admin.findOne({

            username,
            password

        });

        if (!admin) {

            return res.status(401).json({

                success: false,

                message: "Invalid Username or Password"

            });

        }

        return res.json({

            success: true,

            message: "Admin Login Successful",

            admin: {

                _id: admin._id,

                username: admin.username

            }

        });

    }

    catch (err) {

        console.error(err);

        return res.status(500).json({

            success: false,

            message: "Internal Server Error"

        });

    }

};



// =====================================
// EXPORTS
// =====================================

module.exports = {

    teamLogin,
    adminLogin

};