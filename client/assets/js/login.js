const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const loginId = document.getElementById("loginId").value.trim();
    const password = document.getElementById("password").value.trim();

    try {

        const response = await fetch("/api/auth/team-login", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                loginId,
                password
            })

        });

        const data = await response.json();

        if (data.success) {

            // Save team data
            localStorage.setItem("team", JSON.stringify(data.team));

            alert("Login Successful!");

            window.location.href = "dashboard.html";

        } else {

            alert(data.message);

        }

    } catch (error) {

        console.error(error);

        alert("Unable to connect to the server.");

    }

});