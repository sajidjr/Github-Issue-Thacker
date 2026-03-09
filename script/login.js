document.getElementById('login-btn').addEventListener('click', function(e){
    e.preventDefault(); // prevent form submit

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Hardcoded credentials
    if(username === "admin" && password === "admin123"){
        // store username in localStorage
        localStorage.setItem("loggedInUser", username);
        alert("Login Success");

        // redirect to index.html
        window.location.href = "./home.html";
    } else {
        alert("Login Failed");
    }
});
