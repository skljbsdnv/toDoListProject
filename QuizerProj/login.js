const signUpButton = document.getElementById("sign-up");
const loginButton = document.getElementById("login");
const signupForm = document.getElementById("sign-up-form");
const loginForm = document.getElementById("login-form");
const loginButtonsDiv = document.getElementById("login-buttons");
const signupSubmitButton = document.getElementById("sign-up-submit");
const loginSubmitButton = document.getElementById("login-submit");
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
    dataArr.push({"userName" : userName})
    localStorage.setItem(password, JSON.stringify(dataArr));
})

loginSubmitButton.addEventListener("click", () => {
    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        password = document.querySelector(".password").value;

        if(password == key) {
            console.log(JSON.parse(value));
        }
    }
})



