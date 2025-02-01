const addQuestionButton = document.getElementById('add-question');
const finishButton = document.getElementById('finish');

let userQuizesArr = [];
let questionIndex = 0;
let answerIndex = 0;
let arr = [];
let currentUser = localStorage.getItem("currentUser");
let userObj = {currentUser,arr};
let parentName;

addQuestionButton.addEventListener("click", () => {
    // Get the questions container div where new questions will be added
    const questionsDiv = document.getElementById("questions");

    // Create a new div for the question
    const newQuestionDiv = document.createElement("div");
    newQuestionDiv.classList.add("question");
    let questionName = `question${++questionIndex}`;
    newQuestionDiv.setAttribute("name", questionName);


    // Create the "Question" label and input
    const questionLabel = document.createElement("label");
    questionLabel.textContent = "Question:";
    const questionInput = document.createElement("input");
    questionInput.setAttribute("name", questionName);
    questionInput.type = "text";

    // Create the "Answer" label and input
    const answerLabel = document.createElement("label");
    answerLabel.textContent = "Answer:";

    const answerInput = document.createElement("input");
    answerInput.type = "text";


    // Create the "Add Answer" button
    const addAnswerButton = document.createElement("button");
    addAnswerButton.type = "button";
    addAnswerButton.setAttribute("class", "add-answer")
    addAnswerButton.setAttribute("onclick", "addAnswer(this)")
    addAnswerButton.textContent = "Add Answer";

    // Create the "Delete Question" button
    const deleteQuestionButton = document.createElement("button");
    deleteQuestionButton.type = "button";
    deleteQuestionButton.textContent = "Delete Question";

    // Add event listener to the "Delete Question" button
    deleteQuestionButton.addEventListener("click", () => {
        questionsDiv.removeChild(newQuestionDiv); // Remove the entire question div
    });

    // Append the elements to the new question div
    newQuestionDiv.appendChild(questionLabel);
    newQuestionDiv.appendChild(questionInput);
    newQuestionDiv.appendChild(answerLabel);
    newQuestionDiv.appendChild(answerInput);
    newQuestionDiv.appendChild(addAnswerButton);
    newQuestionDiv.appendChild(deleteQuestionButton);
    parentName = answerInput.parentElement.getAttribute("name");
    answerInput.setAttribute("name", `${parentName}answer${++answerIndex}`);


    // Insert the new question div before the "Add Question" button
    questionsDiv.insertBefore(newQuestionDiv, addQuestionButton);

});

function addAnswer(e) {
    // Create a new input element for the answer
    const newAnswerInput = document.createElement("input");
    newAnswerInput.type = "text";
    newAnswerInput.placeholder = "New Answer"; // Add a placeholder
   


    // Append the new answer input to the question div
    e.parentElement.insertBefore(newAnswerInput, e);
    parentName = newAnswerInput.parentElement.getAttribute("name");
    newAnswerInput.setAttribute("name", `${parentName}answer${++answerIndex}`);

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.textContent = "Delete";
    e.parentElement.insertBefore(deleteButton, e);

    deleteButton.addEventListener("click", () => {
        e.parentElement.removeChild(newAnswerInput);
        e.parentElement.removeChild(deleteButton);
    });
}

finishButton.addEventListener("click", () => {
    const createQuestionForm = document.querySelector('#create-question-form');
    const formData = new FormData(createQuestionForm);
    
    const formDataObj = {};
    formData.forEach((value, key) => {
        formDataObj[key] = value;
    });
    arr.push(formDataObj);
    localStorage.setItem("userDetails", JSON.stringify(userObj));
})



