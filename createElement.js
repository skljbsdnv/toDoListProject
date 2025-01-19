class createElement {
    constructor(elementNum) {
        this.elementNum = elementNum;
    }
     
    createParentElement(element) {
        for(let i = 0; i < this.elementNum ; i++) {
            let cretaedElement = document.createElement(element);
            document.body.append(cretaedElement);
        }
    }

    createChildElement(parentElement,element, atribs) {
        const selectedParentElement = document.querySelector(parentElement);
        for(let i = 0; i < this.elementNum ; i++) {
            const createdElement = document.createElement(element);
            selectedParentElement.appendChild(createdElement); 
        }
        const createdChildElement = selectedParentElement.lastElementChild;

        if(atribs) {
            for (const [key, value] of Object.entries(atribs)) {
                createdChildElement.setAttribute(key, value);
            }
        }
        return createdChildElement;
    }
}

export {createElement};