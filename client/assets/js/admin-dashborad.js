// ===============================================
// CONNECTION 2026
// Admin Dashboard
// ===============================================

// Check Admin Login
const admin = JSON.parse(localStorage.getItem("admin"));

if (!admin) {
    alert("Please login first.");
    window.location.href = "login.html";
}

// Helper Function
function get(id) {
    return document.getElementById(id);
}

const logoutBtn = get("logoutBtn");
const startRoundBtn = get("startRoundBtn");
const endRoundBtn = get("endRoundBtn");
const refreshTeamsBtn = get("refreshTeams");
const sendAnnouncementBtn = get("sendAnnouncement");

const currentRound = get("currentRound");
const eventStatus = get("eventStatus");
const announcement = get("announcement");

const teamTable = get("teamTable");

const totalTeams = get("totalTeams");
const loggedIn = get("loggedIn");
const completed = get("completed");
const winner = get("winner");

let round = 1;

// Initial Values
if (currentRound) currentRound.textContent = "Round 1";
if (eventStatus) eventStatus.textContent = "Waiting";
if (winner) winner.textContent = "--";

// ===============================================
// Load Teams
// ===============================================

async function loadTeams() {

    if (!teamTable) return;

    try {

        const response = await fetch("/api/admin/teams");

        if (!response.ok) throw new Error();

        const teams = await response.json();

        teamTable.innerHTML = "";

        let online = 0;
        let finished = 0;

        teams.forEach(team => {

            if (team.status === "Online") online++;

            if (team.completed) finished++;

            teamTable.innerHTML += `
            <tr>
                <td>${team.loginId}</td>
                <td>${team.teamName || "-"}</td>
                <td>${team.currentRound || 1}</td>
                <td>${team.status || "Waiting"}</td>
            </tr>
            `;

        });

        if (totalTeams) totalTeams.textContent = teams.length;
        if (loggedIn) loggedIn.textContent = online;
        if (completed) completed.textContent = finished;

    }

    catch (err) {

        console.log("Backend not ready.");

        teamTable.innerHTML = `
        <tr>
            <td>TEAM01</td>
            <td>Demo Team</td>
            <td>1</td>
            <td>Waiting</td>
        </tr>
        `;

        if (totalTeams) totalTeams.textContent = "20";
        if (loggedIn) loggedIn.textContent = "0";
        if (completed) completed.textContent = "0";

    }

}

loadTeams();

// ===============================================
// Refresh
// ===============================================

if (refreshTeamsBtn) {

    refreshTeamsBtn.addEventListener("click", loadTeams);

}

// ===============================================
// Start Round
// ===============================================

if (startRoundBtn) {

    startRoundBtn.addEventListener("click", () => {

        if (!confirm("Start Round " + round + "?")) return;

        if (eventStatus)
            eventStatus.textContent = "Round Live";

        startRoundBtn.disabled = true;

        if (endRoundBtn)
            endRoundBtn.disabled = false;

        alert("Round Started");

    });

}

// ===============================================
// End Round
// ===============================================

if (endRoundBtn) {

    endRoundBtn.addEventListener("click", () => {

        if (!confirm("End Round?")) return;

        if (eventStatus)
            eventStatus.textContent = "Waiting";

        endRoundBtn.disabled = true;

        if (startRoundBtn)
            startRoundBtn.disabled = false;

        alert("Round Ended");

    });

}

// ===============================================
// Round Buttons
// ===============================================

["round1", "round2", "round3", "round4"].forEach((id, index) => {

    const btn = get(id);

    if (btn) {

        btn.addEventListener("click", () => {

            round = index + 1;

            if (currentRound)
                currentRound.textContent = "Round " + round;

        });

    }

});

// ===============================================
// Announcement
// ===============================================

if (sendAnnouncementBtn) {

    sendAnnouncementBtn.addEventListener("click", () => {

        if (!announcement) return;

        const msg = announcement.value.trim();

        if (msg === "") {

            alert("Please enter an announcement.");

            return;

        }

        alert("Announcement Sent!");

        announcement.value = "";

    });

}

// ===============================================
// Logout
// ===============================================

if (logoutBtn) {

    logoutBtn.addEventListener("click", () => {

        if (!confirm("Logout?")) return;

        localStorage.removeItem("admin");

        window.location.href = "../index.html";

    });

}

// ===============================================
// Auto Refresh
// ===============================================

setInterval(loadTeams, 5000);

console.log("Admin Dashboard Loaded Successfully");