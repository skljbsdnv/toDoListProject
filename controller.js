import { createElement } from "./createElement.js";


let inputField = new createElement(1);
inputField = inputField.createChildElement("div","input",{"type":"text",
    "class":"todo-list-input",
    "placeholder" : "To-Do"
});

let addBtn = new createElement(1);
addBtn = addBtn.createChildElement("div", "button");
addBtn.innerHTML = "ADD";

let toDoListDiv = new createElement(1);
toDoListDiv = toDoListDiv.createChildElement("div","div",{"class" : "todo-list"});

let counter = 0;
let arr = [];
let bool = false;
 

const myPromise = new Promise((resolve) => {
    addBtn.addEventListener("click", () => {
        let itemDiv = new createElement(1);
        counter++;
        let createdItemDiv = itemDiv.createChildElement(".todo-list", "div",{"class" : `item-${counter}`});
        createdItemDiv.innerHTML = inputField.value;
        inputField.value = "";

        let tasks = {"class":createdItemDiv.className,
            value : createdItemDiv.innerHTML
        };
        arr.push(tasks);
        window.localStorage.setItem("Tasks", JSON.stringify(arr));

        const deleteBtn = new createElement(1);
        let createdDeleteBtn = deleteBtn.createChildElement(`.${createdItemDiv.className}`, "button" ,{"class" : "delete-btn"});
        createdDeleteBtn.innerHTML = "Delete";
        deleteBtnFun(createdDeleteBtn);
        resolve();   
    });
})


function deleteBtnFun(createdDeleteBtn) {
    createdDeleteBtn.addEventListener("click", () => {
        console.log(createdDeleteBtn.parentElement);

        let taskIndex = arr.findIndex(e=>e.class === createdDeleteBtn.parentElement.className);
        arr.splice(taskIndex, 1);
        window.localStorage.setItem("Tasks", JSON.stringify(arr));

        createdDeleteBtn.parentElement.remove();
        counter--;
    })
}


window.addEventListener("load", () => {
    let storedTasks = localStorage.getItem("Tasks");
    if(storedTasks && bool === false) {
        let tasksArray = JSON.parse(storedTasks);
        tasksArray.forEach(element => {
            arr.push(element);

            let itemDiv = new createElement(1);
            counter++;
            let createdItemDiv = itemDiv.createChildElement(".todo-list", "div",{"class" : `item-${counter}`});
            createdItemDiv.innerHTML = element.value;

            const deleteBtn = new createElement(1);
            let createdDeleteBtn = deleteBtn.createChildElement(`.${createdItemDiv.className}`, "button" ,{"class" : "delete-btn"});
            createdDeleteBtn.innerHTML = "Delete";
            deleteBtnFun(createdDeleteBtn);
        });
        bool = true;
    }

    

});
