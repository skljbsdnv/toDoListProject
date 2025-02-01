const signUpButton = document.getElementById("sign-up");
const loginButton = document.getElementById("login");
const signupForm = document.getElementById("sign-up-form");
const loginForm = document.getElementById("login-form");
const loginButtonsDiv = document.getElementById("login-buttons");
const signupSubmitButton = document.getElementById("sign-up-submit");
const loginSubmitButton = document.getElementById("login-submit");
let loginPassword;
// let userName;
let password;
let dataArr=[] ;


signUpButton.addEventListener("click", () => {
    signupForm.style.display = "flex";
    signupForm.style.flexDirection = "column";
    loginButtonsDiv.style.display = "none";
})

loginButton.addEventListener("click", () => {
    loginForm.style.display = "flex";
    loginForm.style.flexDirection = "column";
    loginButtonsDiv.style.display = "none";
})

signupSubmitButton.addEventListener("click", () => {
    userName = document.querySelector(".username").value;
    password = document.querySelector(".password").value;
    dataArr.push({"userName" : userName,
        "password" : password
    });
    localStorage.setItem("users", JSON.stringify(dataArr));
})

loginSubmitButton.addEventListener("click", () => {
    loginPassword = document.querySelector(".login-password").value;
    // console.log(loginPassword);
    let localStoragesUsers = localStorage.getItem("users");
    let users = JSON.parse(localStoragesUsers);
    users.forEach(userObject => {
        userDetails = Object.values(userObject);
        if(loginPassword === userDetails[1]){
            // console.log(userDetails[0]);
            localStorage.setItem("currentUser" , loginPassword)
            window.location.href = "index.html";
    }
        // console.log(userDetails[1])
    });
})