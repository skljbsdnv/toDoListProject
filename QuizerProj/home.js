const createQuizBtn = document.getElementById("create-quiz");
const myQuizesBtn = document.getElementById("my-quizes");

createQuizBtn.addEventListener("click", () => {
    window.location.href = "createQuiz.html";
})

myQuizesBtn.addEventListener("click", () => {
    window.location.href = "myQuizes.html";
})