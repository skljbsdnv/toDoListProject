const button = document.querySelector("button");
const questionsDiv = document.querySelector(".questions");
const legend = document.querySelector("legend");
const timerDiv = document.querySelector(".timer");
let i = 0;
let startPage = true;
let questions = [];
let chosenAnsewrsArr = [];
let questionNumber;
let answers;
 
async function fetchQuestions() {
    const url = "http://127.0.0.1:5500/questions.json";
    try {
        const response = await fetch(url);
        console.log(response);
        // await makeJson(response);
        const jResponse = await response.json();
        console.log(jResponse);
        return jResponse;
    } catch {
        throw new Error(`Response status: ${response.status}`);
    }
}
 
// async function makeJson(response) {
//     try {
 
//     } catch {
//         throw new Error(`Response status: ${response.status}`);
//     }
// }
 
button.addEventListener("click", async () => {
    if (startPage === true) {
        questions = Object.keys(await fetchQuestions());
        answers = Object.values(await fetchQuestions());
        button.innerHTML = "next";
        startPage = false;
        localStorage.setItem("startPage", startPage);
    }
    startQuiz();
})

function review() {
    
}

let choices;
let j=0;
let choicesParentDiv;
const feildSet = document.querySelector("fieldset");

function getChoice() {
    choices = Object.values(answers[i]);
    createChoicesParentDiv();

    choices.forEach((choice) => {
        let createdChoiceDiv = createChoiceDiv();
        createChoiceRadioButton(createdChoiceDiv,choice);
        createChoiceLabel(createdChoiceDiv, choice);
        j++;
    })
    return;
}

function createChoicesParentDiv() {
    if(choicesParentDiv){
        feildSet.removeChild(choicesParentDiv);
    }
    choicesParentDiv = document.createElement("div");
    feildSet.appendChild(choicesParentDiv);
}

function createChoiceDiv() {
    let choiceDiv = document.createElement("div");
    choiceDiv.setAttribute("class", "choice");
    choicesParentDiv.appendChild(choiceDiv);
    return choiceDiv;
}

function createChoiceRadioButton(createdChoiceDiv,choice) {
    let choiceRadioButton = document.createElement("input");
    choiceRadioButton.setAttribute("onclick","storeAnswers(this)");
    choiceRadioButton.setAttribute("type","radio");
    choiceRadioButton.setAttribute("id",`answer${j}`);
    choiceRadioButton.setAttribute("name","answers");
    choiceRadioButton.setAttribute("value",choice);
    createdChoiceDiv.appendChild(choiceRadioButton);
}

function createChoiceLabel(createdChoiceDiv, choice) {
    let choiceLabel = document.createElement("label");
    choiceLabel.setAttribute("for", `answer${j}`);
    choiceLabel.setAttribute("id",`label${j}`);
    choiceLabel.innerHTML = choice;
    createdChoiceDiv.appendChild(choiceLabel);
}
 
// window.onload = function() {
//     localStoragestartPage = window.localStorage.getItem("startPage");
//     if(localStoragestartPage === "false") {startPage = localStoragestartPage;}  
// }
 
function startQuiz() {
    timer();
    if(i >= questions.length){
        return;
    }
    if(i < questions.length) {
        questionsDiv.innerHTML = questions[i];
        getChoice();
        // uncheckRadioBtn();
        questionNumber = `Question ${i+1}`
        legend.innerHTML = questionNumber;
    }
    if (i === questions.length-1) {
        button.innerHTML = "finish";
    }
    i++;
}
 
// function uncheckRadioBtn() {
//     answerChoices.forEach((answer) => {
//         answer.checked = false;
//     })
// }
 
let seconds = 10;
let countdownId;
 
function timer() {
    if (countdownId) {
        clearInterval(countdownId);
        seconds = 10;
    }
    // console.log(i);
 
    if (i >= questions.length) {
        console.log(i);
        clearInterval(countdownId);
        return;
    }
    // let duration = seconds < 10 ? `00:00:0${seconds}` :  `00:00:${seconds}`
 
    timerDiv.innerHTML = `00:0${seconds--}`;
 
    countdownId = setInterval(() => {
        timerDiv.innerHTML = `00:0${seconds}`;
        seconds--;
        if (seconds === -1) {
            seconds = 5;
            startQuiz();
            chosenAnsewrsArr.push()
        }
    }, 1000)
}
 
function storeAnswers(e) {
    let answerObj = { [questionNumber] : e.value};
    chosenAnsewrsArr.push(answerObj);
    window.localStorage.setItem("answers", JSON.stringify(chosenAnsewrsArr));
    console.log(e.value);  
}