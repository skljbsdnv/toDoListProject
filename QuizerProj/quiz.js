const startButton = document.querySelector(".start-button");
const nextButton = document.querySelector(".next-button");
const finishButton = document.querySelector(".finish-button");
const questionTitleDiv = document.querySelector(".question-title");
const questionChoicesDiv = document.querySelector(".question-choices");
const title = document.querySelector("legend");
const timerDiv = document.querySelector(".timer");
const feildSet = document.querySelector("fieldset");
const questionDiv = document.querySelector(".question");
const reviewDiv = document.querySelector(".review");
const mapDiv = document.querySelector(".map");
const signUpButton = document.querySelector(".sign-up");


let questionIndex= 0;
// let startPage = true;
let questions = [];
let quizChoices = [];
let chosenAnsewrsArr = [];
let questionNumber;
let choiceIndex = 0;
let choicesParentDiv;
let seconds = 5;
let countdownId;



startButton.addEventListener("click", async () => {
    questions = Object.keys(await fetchQuestions());
    quizChoices = Object.values(await fetchQuestions());
    createMap();
    timer();
    // console.log(quizChoices);
    startButton.style.display = "none";
    nextButton.style.display = "block";
    feildSet.style.justifyContent = 'space-between';
    questionTitleDiv.style.display = "block";
    questionChoicesDiv.style.display = "block";
    // startPage = false;
    // localStorage.setItem("startPage", startPage);
    getQuestion();
    title.innerHTML = questionNumber;
})

nextButton.addEventListener("click", () => {
    createReviewBtns();
    questionIndex++;
    timer();
    getQuestion();
    title.innerHTML = questionNumber;
    questionChoicesDiv.style.display = "block";
    if(questionIndex === questions.length-1) {
        nextButton.style.display = "none";
        finishButton.style.display = "block";
    }
})

finishButton.addEventListener("click", () => {
    createReviewBtns();
    finish();
})
 
async function fetchQuestions() {
    const url = "http://127.0.0.1:5500/questions.json";
    try {
        const response = await fetch(url);
        // console.log(response);
        // await makeJson(response);
        const jResponse = await response.json();
        // console.log(jResponse);
        return jResponse;
    } catch {
        throw new Error(`Response status: ${response.status}`);
    }
}

function getQuestion() {
    if(questionIndex === questions.length) {return;}
    questionTitleDiv.innerHTML = questions[questionIndex];
    questionNumber = `Question ${questionIndex+1}`
    getChoice();
}

function getChoice() {
    const questionChoices = Object.values(quizChoices[questionIndex]);
    questionChoicesDiv.replaceChildren();
    questionChoices.forEach((choice) => {
        let createdChoiceDiv = createChoiceDiv();
        createChoiceRadioButton(createdChoiceDiv,choice);
        createChoiceLabel(createdChoiceDiv, choice);
        choiceIndex++;
    })
    return;
}
 
function createChoiceDiv() {
    let choiceDiv = document.createElement("div");
    choiceDiv.setAttribute("class", "choice");
    questionChoicesDiv.appendChild(choiceDiv);
    return choiceDiv;
}
 
function createChoiceRadioButton(createdChoiceDiv,choice) {
    let choiceRadioButton = document.createElement("input");
    choiceRadioButton.setAttribute("onclick","storequizChoices(this)");
    choiceRadioButton.setAttribute("type","radio");
    choiceRadioButton.setAttribute("id",`answer${choiceIndex}`);
    choiceRadioButton.setAttribute("name","quizChoices");
    choiceRadioButton.setAttribute("value",choice);
    createdChoiceDiv.appendChild(choiceRadioButton);
}
 
function createChoiceLabel(createdChoiceDiv, choice) {
    let choiceLabel = document.createElement("label");
    choiceLabel.setAttribute("for", `answer${choiceIndex}`);
    choiceLabel.setAttribute("id",`label${choiceIndex}`);
    choiceLabel.innerHTML = choice;
    createdChoiceDiv.appendChild(choiceLabel);
}
 
 
// async function makeJson(response) {
//     try {
 
//     } catch {
//         throw new Error(`Response status: ${response.status}`);
//     }
// }

// window.onload = function() {
//     localStorageBool = window.localStorage.getItem("bool");
//     if(localStorageBool === "false") {bool = localStorageBool;}  
// }
 
function timer() {
    // console.log(1)
    if (countdownId) {
        clearInterval(countdownId);
        seconds = 5;
    }
    // console.log(i);
 
    if (questionIndex >= questions.length) {
        console.log("t");
        clearInterval(countdownId);
        return;
    }
 
    timerDiv.innerHTML = `00:0${seconds--}`;
 
    countdownId = setInterval(() => {
        timerDiv.innerHTML = `00:0${seconds}`;
        seconds--;
        if (seconds === -1) {
            seconds = 5;
            if(questionIndex < questions.length-1){createReviewBtns();} 
            questionIndex++; 
            timer();          
            getQuestion();
            if(questionIndex === questions.length-1) {
                nextButton.style.display = "none";
                finishButton.style.display = "block";
            }
            title.innerHTML = questionNumber;
            chosenAnsewrsArr.push();
        }
    }, 1000)
}

function createReviewBtns() {
    reviewBtn = document.createElement("button");
    reviewBtn.setAttribute("class", questionIndex);
    reviewBtn.style.margin = "10px";
    // reviewBtn.style.display = "none";
    reviewBtn.innerHTML = `${questionNumber} Not Answered`;
 
    if(chosenAnsewrsArr.length > 0) {
        localStorageAnswer = getItemsFromLocalStorage();
        if(localStorageAnswer === questionNumber) {
            reviewBtn.innerHTML = `${questionNumber} Answered`;
        }
    }
   
    reviewDiv.appendChild(reviewBtn);
}
 
function storequizChoices(e) {
    let answerObj = { [questionNumber] : e.value};
    chosenAnsewrsArr.push(answerObj);
    window.localStorage.setItem("quizChoices", JSON.stringify(chosenAnsewrsArr));
    // console.log(e.value);  
}

function getItemsFromLocalStorage() {
    let localStoragequizChoices = JSON.parse(localStorage.getItem("quizChoices"));
    let localStorageAnswer = Object.keys(localStoragequizChoices[chosenAnsewrsArr.length-1]);
    // console.log(localStoragequizChoices[chosenAnsewrsArr.length-1]);
    // console.log(localStorageAnswer[0]);
    return localStorageAnswer[0];
}
 
function finish() {
    questionDiv.style.display = "none";
    finishButton.style.display = "none";
    reviewDiv.style.display = "flex";
    reviewDiv.style.flexDirection = "column";
    clearInterval(countdownId);
} 

function createMap() {
    questions.forEach((e, index) => {
        const mapButton = document.createElement("button");
        mapButton.innerHTML = `Q ${index+1}`;
        mapButton.setAttribute("class", "map-button");
        mapButton.setAttribute("id", index);
        mapButton.setAttribute("onclick", "questionMap(this)");
        mapDiv.appendChild(mapButton); 
    })
}

function questionMap(e) {
    questionIndex = e.id;
    getQuestion();
    if(questionIndex == questions.length-1) {
        console.log(questionIndex);

        nextButton.style.display = "none";
        finishButton.style.display = "block";
    }else {
        nextButton.style.display = "block";
        finishButton.style.display = "none";
    }
    console.log(questionIndex);
    createReviewBtns()
    timer();
}