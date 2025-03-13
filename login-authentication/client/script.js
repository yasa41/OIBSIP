document.addEventListener("DOMContentLoaded", function () {
    const registerForm = document.querySelector("#register-form");
    const loginForm = document.querySelector("#login-form");
    const logoutButton = document.querySelector("#logout-btn");

    // Handle User Registration
    if (registerForm) {
        registerForm.addEventListener("submit", async function (event) {
            event.preventDefault();

            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("email").value.trim();
            const password = document.getElementById("password").value.trim();

            try {
                const response = await axios.post("http://localhost:3000/api/auth/register", {
                    name,
                    email,
                    password
                }, { withCredentials: true });

                alert("Registration successful! Redirecting to login...");
                window.location.href = "login.html";
            } catch (error) {
                alert(error.response?.data?.message || "Registration failed!");
                console.error("Registration Error:", error);
            }
        });
    }

    // Handle User Login
    if (loginForm) {
        loginForm.addEventListener("submit", async function (event) {
            event.preventDefault();
    
            const email = document.getElementById("email").value.trim();
            const password = document.getElementById("password").value.trim();
    
            try {
                const response = await axios.post("http://localhost:3000/api/auth/login", {
                    email,
                    password
                }, { withCredentials: true });
    
                console.log("Full Response:", response);
                console.log("Response Data:", response.data);
    
                if (!response.data.token) {
                    throw new Error("No token received from server!");
                }
    
                localStorage.setItem("token", response.data.token);
                alert("Login successful!");
                window.location.href = "dashboard.html";
            } catch (error) {
                console.error("Login Error:", error.response?.data || error.message);
                alert(error.response?.data?.message || "Invalid credentials!");
            }
        });
    }
    
    // Handle User Logout
    if (logoutButton) {
        logoutButton.addEventListener("click", async function () {
            try {
                localStorage.removeItem("token");

                await axios.post("http://localhost:3000/api/auth/logout", {}, { withCredentials: true });

                alert("Logged out successfully!");
                window.location.href = "login.html";
            } catch (error) {
                alert("Error logging out!");
                console.error("Logout Error:", error);
            }
        });
    }

    // Redirect Unauthorized Users from Dashboard
    const token = localStorage.getItem("token");
    if (!token && window.location.pathname.includes("dashboard.html")) {
        alert("You must be logged in to access the dashboard!");
        window.location.href = "login.html";
    }
});
