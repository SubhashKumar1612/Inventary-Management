const setError = function (element, message) {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');
    const childElement = inputControl.querySelector('input');
    errorDisplay.innerText = message;
    childElement.classList.add('is-invalid');
    childElement.classList.remove('is-valid');
};

const setSuccess = function (element) {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');
    const childElement = inputControl.querySelector('input');
    errorDisplay.innerText = '';
    childElement.classList.add('is-valid');
    childElement.classList.remove('is-invalid');
};



const clearFormState = () => {
    const inputControls = document.querySelectorAll('input');
    inputControls.forEach((control) => {
        control.classList.remove('is-valid');
        control.classList.remove('is-invalid');
        control.innerText = '';
        
    });
};



const isUniqueName = (name, category) => {
    console.log("yes i am checking")
    return !data.some(item => item.itemName === name && item.category === category);
};

const validitemname = (itemname, category,type) => {
    const itemNameValue = itemname.value.trim();
    if(type){
        console.log('yes i am working if part')
        if (itemNameValue === '') {
            setError(itemname, "Item name is required");
            return false;
        } else if (itemNameValue.length > 20) {
            setError(itemname, "itemName must be less than 20 characters");
            return false;
        } else if (itemNameValue.length < 4) {
            setError(itemname, "itemName must be greater than 4 characters");
            return false;
        } else {
            setSuccess(itemname);
            return true;
        }

    }else{
       
        if (itemNameValue === '') {
            setError(itemname, "Item name is required");
            return false;
        } else if (itemNameValue.length > 20) {
            setError(itemname, "itemName must be less than 20 characters");
            return false;
        } else if (itemNameValue.length < 4) {
            setError(itemname, "itemName must be greater than 4 characters");
            return false;
        } else if (!isUniqueName(itemNameValue, category.value)) {
            setError(itemname, "Item name must be unique within the category");
            return false;
        } else {
            setSuccess(itemname);
            return true;
        }

    }
    
    
};

const validreorderLevel = (reorderLevel, stockLevel) => {
    const reorderValue = Number(reorderLevel.value.trim());
    const stockValue = Number(stockLevel.value.trim());

    if (reorderLevel.value.trim() === '') {
        setError(reorderLevel, "Reorder level is required");
        return false;
    } else if (reorderValue < 2) {
        setError(reorderLevel, "Reorder level must be at least 2 units");
        return false;
    } else if (reorderValue >= stockValue) {
        setError(reorderLevel, "Reorder level must be less than stock level");
        return false;
    } else {
        setSuccess(reorderLevel);
        return true;
    }
};



const validstockLevel = (stockLevel) => {
    const stockLevelValue=Number(stockLevel.value.trim());
    if (stockLevel.value.trim() === '') {
        setError(stockLevel, "Stock level is required");
        return false;
    }else if(stockLevelValue<2){
        setError(stockLevel, "Stock level must be atleast 2 unit ");
        return false;
    } else {
        setSuccess(stockLevel);
        return true;
    }
};
const validNewText=(newText)=>{
    const newTextValue=Number(newText.value.trim());
    if (newText.value.trim() === '') {
        setError(newText, "newText is required");
        return false;
    }else {
        setSuccess(newText);
        return true;
    }
}

const validationquantity=(quantity)=>{
    const quantityValue=Number(quantity.value.trim());
    if (quantity.value.trim() === '') {
        setError(quantity, "quantity is required");
        return false;
    }else if(isNaN(quantityValue)){
        setError(quantity, "quantity should be digit");
        return false;
    }else {
        setSuccess(quantity);
        return true;
    }
}
window.validationquantity=validationquantity;
window.validitemname = validitemname;
window.validstockLevel = validstockLevel;
window.validreorderLevel = validreorderLevel;
window.validNewText = validNewText;

export {
    clearFormState
};
const data = JSON.parse(localStorage.getItem('stockData')) || [];
console.log(data)