// ===============================
// CONNECTION 2026
// Admin Login
// ===============================

const form = document.getElementById("adminLoginForm");

form.addEventListener("submit", async function (e) {

    e.preventDefault();

    const username = document.getElementById("username").value.trim();

    const password = document.getElementById("password").value.trim();

    try {

        const response = await fetch("/api/auth/admin-login", {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify({

                username,

                password

            })

        });

        const data = await response.json();

        if (data.success) {

            localStorage.setItem("admin", JSON.stringify(data.admin));

            alert("Login Successful");

            window.location.href = "dashboard.html";

        } else {

            alert(data.message);

        }

    }

    catch (err) {

        console.log(err);

        alert("Unable to connect to server.");

    }

});