let userDetails = JSON.parse(localStorage.getItem("userDetails"));
const myQuizesDiv = document.querySelector("div");

userDetails.arr.forEach(quizeObjects => {
    console.log(quizeObjects);
    const myQuizBtn = document.createElement("button");
    myQuizBtn.innerHTML = quizeObjects.quizname;
    myQuizBtn.setAttribute("onclick" , "editMyQuiz(this)");
    myQuizesDiv.appendChild(myQuizBtn);
});

function editMyQuiz(e) {
    let quizName = e.innerHTML;
    localStorage.setItem("selectedQuiz", quizName);

    // Redirect to the edit page
    window.location.href = "editMyQuiz.html";
}

