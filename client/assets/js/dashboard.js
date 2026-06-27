// ======================================
// CONNECTION 2026
// Participant Dashboard
// ======================================

// Get logged-in team
const team = JSON.parse(localStorage.getItem("team"));

// Check Login
if (!team) {
    alert("Please login first!");
    window.location.href = "login.html";
}

// ---------- Helper Function ----------
function setText(id, text) {
    const element = document.getElementById(id);

    if (element) {
        element.textContent = text;
    }
}

// ======================================
// Display Team Details
// ======================================

setText(
    "welcome",
    "Welcome " + (team.teamName || team.loginId)
);

setText(
    "loginId",
    team.loginId
);

setText(
    "teamName",
    team.teamName || "Not Assigned"
);

setText(
    "currentRound",
    "Round " + ((team.currentRound || 0) + 1)
);

setText(
    "status",
    "Waiting for Coordinator..."
);

setText(
    "announcement",
    "Welcome to CONNECTION 2026. Please wait until the coordinator starts the event."
);

// ======================================
// Round 1 Button
// ======================================

const round1Btn = document.getElementById("round1Btn");

if (round1Btn) {

    round1Btn.disabled = true;

    round1Btn.addEventListener("click", () => {

        alert("Round 1 will open here.");

        // window.location.href = "round1.html";

    });

}

// ======================================
// Demo Function
// ======================================

function startRound1() {

    setText(
        "status",
        "🟢 Round 1 Live"
    );

    setText(
        "announcement",
        "Round 1 has started. Click START ROUND."
    );

    if (round1Btn) {

        round1Btn.disabled = false;

        round1Btn.textContent = "START ROUND";

        round1Btn.style.background = "#16a34a";

    }

}

// Demo (Remove Later)
setTimeout(() => {

    startRound1();

}, 10000);

// ======================================
// Logout
// ======================================

const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {

    logoutBtn.addEventListener("click", () => {

        if (confirm("Are you sure you want to logout?")) {

            localStorage.removeItem("team");

            window.location.href = "../index.html";

        }

    });

}