import { validateInput, clearFormState } from './validation.js';

const form = document.querySelector('#form');
const itemName = document.querySelector('#itemname');
const category=document.querySelector('#category');
const stockLevel = document.querySelector('#stockLevel');
const reorderLevel = document.querySelector('#reorderLevel');
const searchInput=document.querySelector('#searchInput');
const newText = document.querySelector('#other-input');
const submitbtn = document.querySelector('#submit-btn');
const quantity=document.querySelector('#quantity');
const cancelbtn=document.querySelectorAll('.cancel');

console.log(newText);
cancelbtn.forEach(el=>{
    el.addEventListener('click',function(e){
        e.preventDefault();
        clearFormAfterclose();
        
    })
})
const clearFormAfterclose = () => {
    itemName.classList.remove('is-invalid', 'is-valid');
    stockLevel.classList.remove('is-invalid', 'is-valid');
    reorderLevel.classList.remove('is-invalid', 'is-valid');
    quantity.classList.remove('is-invalid', 'is-valid');
    newText.classList.remove('is-invalid', 'is-valid');

    
    const errorMessages = document.querySelectorAll('.error');
    errorMessages.forEach((msg) => msg.textContent = '');

    
    newText.classList.add('d-none')
    console.log(newText);
    newText.value='';

    itemName.value='';
    category.value='';
    stockLevel.value='';
    reorderLevel.value='';

};

let buyindex=-1;
let editIndex = -1;
let type=submitbtn.innerText ==="Update";
console.log(type);

//itemName.addEventListener('blur', () => validitemname(itemName));
itemName.addEventListener('blur', () => validitemname(itemName, category,type));
stockLevel.addEventListener('blur', () => validstockLevel(stockLevel));
//reorderLevel.addEventListener('blur', () => validreorderLevel(reorderLevel));
reorderLevel.addEventListener('blur', () => validreorderLevel(reorderLevel, stockLevel));
quantity.addEventListener('blur', () => validationquantity(quantity));
newText.addEventListener('blur',()=>validNewText(newText));


category.addEventListener('change',function(){
    if(category.value==='other'){
        other();
    }else {
        newText.classList.add("d-none");
    }
})
const other = () => {
    const category = document.getElementById('category');
    
    if (category.value === 'other') {
        newText.classList.remove("d-none");
        console.log(newText)
    } 
}


// Load data from localStorage
const data = JSON.parse(localStorage.getItem('stockData')) || [];

// Save data to localStorage
const dataStorage = () => {
    const finalCategory = category.value === 'other' ? newText.value.trim() : category.value;
    if (editIndex === -1) {
        data.push({
            itemName: itemName.value,
            category: finalCategory,
            stockLevel: stockLevel.value,
            reorderLevel: reorderLevel.value,
        });
    } else {
        data[editIndex] = {
            itemName: itemName.value,
            category: finalCategory,
            stockLevel: stockLevel.value,
            reorderLevel: reorderLevel.value,
        };
        editIndex = -1;
        submitbtn.innerText = "Submit";
    }

    localStorage.setItem('stockData', JSON.stringify(data));
    showData();
    clearFormState();

    // Close modal after submission
    const modal = bootstrap.Modal.getInstance(document.querySelector('#formModal'));
    modal.hide();
};

// Display data in table
const showData = () => {
    const list = document.querySelector('.student-list');
    list.innerHTML = '';
    data.forEach((data, i) => {
        const warningIcon = Number(data.stockLevel) <= Number(data.reorderLevel)
        ? `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="orange" class="bi bi-exclamation-triangle-fill" viewBox="0 0 16 16">
              <path d="M7.938 2.016a.13.13 0 0 1 .125 0l6.857 11.856c.03.053.041.11.033.166a.13.13 0 0 1-.125.096H1.172a.13.13 0 0 1-.125-.096.13.13 0 0 1 .033-.166L7.938 2.016zM8 5.5c-.535 0-.954.43-.995.912L7 10.5c0 .514.41.932.923.995.514.064.986-.31.995-.923l.005-.077-.01-4.076c0-.513-.41-.932-.923-.995A.999.999 0 0 0 8 5.5zm.002 6.025a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
          </svg>`
        : '';
        const row = `
            <tr>
                <td>${data.itemName}</td>
                <td >${data.category}</td>
                <td>${data.stockLevel} ${warningIcon}</td>
                <td>${data.reorderLevel}</td>
                <td>
                    <button class="btn cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" data-index="${i}" height="20" fill="currentColor" class="bi bi-cart2 cart text-warning me-2" viewBox="0 0 16 16" data-toggle="modal" data-target="#exampleModal">
                        <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5M3.14 5l1.25 5h8.22l1.25-5zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0m9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0"/>
                      </svg>
                    </button>

                    <button class="btn  cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" data-index="${i}" height="20" fill="currentColor" class="bi bi-pencil edit text-primary me-2" viewBox="0 0 16 16">
                        <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325"/>
                      </svg>
                    </button>

                    <button class="btn  cursor-pointer">
                         <svg xmlns="http://www.w3.org/2000/svg" width="20" data-index="${i}" height="20" fill="currentColor" class="bi bi-trash3 delete text-danger" viewBox="0 0 16 16">
                        <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
                      </svg>
                    </button>
                </td>
            </tr>`;
        list.innerHTML += row;
    });
};

console.log()
// Handle form submission
submitbtn.addEventListener('click', (e) => {
    e.preventDefault();
    type=submitbtn.innerText ==="Update";
    console.log(type);

    if ( validitemname(itemName, category,type) && validstockLevel(stockLevel) && validreorderLevel(reorderLevel, stockLevel)) {
        if((category.value.trim()==="other" && validNewText(newText)) ){
            dataStorage();
            itemName.value='';
            category.value='';
            stockLevel.value='';
            reorderLevel.value='';
        }else if(category.value.trim()!=="other" &&category.value.trim()!==''){
            dataStorage();
            itemName.value='';
            category.value='';
            stockLevel.value='';
            reorderLevel.value='';
        }else{
            validNewText(newText)
        }
    }
});

document.getElementById('confirmDelete').addEventListener('click', () => {
    if (deleteIndex !== null) {
        data.splice(deleteIndex, 1);
        localStorage.setItem('stockData', JSON.stringify(data));
        showMessage();
        showData()
        const modal = bootstrap.Modal.getOrCreateInstance(document.querySelector('#deleteModal'));
        modal.hide();
    }
});
//console.log(document.querySelector("#toast"))
const showMessage=()=>{
    const toast=document.querySelector(".toast");
    toast.classList.add('show');
    setTimeout(()=>{
        toast.classList.remove('show')
    },2000)
}


let deleteIndex = -1;
document.querySelector('.student-list').addEventListener('click', (e) => {
    e.preventDefault();
    const idx = e.target.getAttribute('data-index');
    if (e.target.classList.contains('edit')) {
        const infoCart = data[idx];
        itemName.value = infoCart.itemName;
        category.value = infoCart.category;
        stockLevel.value = infoCart.stockLevel;
        reorderLevel.value = infoCart.reorderLevel;
        editIndex = idx;
        submitbtn.innerText ="Update";
        const modal = new bootstrap.Modal(document.querySelector('#formModal'));
        modal.show();
    } else if (e.target.classList.contains('delete')) {
        deleteIndex = e.target.getAttribute('data-index');
            const modal = new bootstrap.Modal(document.querySelector('#deleteModal'));
            modal.show();

    }else if(e.target.classList.contains('cart')){
        buyindex=idx;
        const infoCart = data[idx];
        const modelbuyStock=document.querySelector('.buystock');
        
        const existingNode = modelbuyStock.querySelector('h3');
    const existingExtra = modelbuyStock.querySelector('p');
    if (existingNode) existingNode.remove();
    if (existingExtra) existingExtra.remove();

        const node=document.createElement("h3");
        const extra=document.createElement('p');
        extra.classList.add('text-secondary')
        extra.textContent=`current Stock :${infoCart.stockLevel}`
        const content=node.textContent=`${infoCart.itemName}`
        
        modelbuyStock.appendChild(node);
        node.appendChild(extra)
        const modal = new bootstrap.Modal(document.querySelector('#buy'));
        modal.show();
    }
});

console.log(data)




//filter using the search button
searchInput.addEventListener('keyup', function (e) {
    e.preventDefault();
    const searchTerm = searchInput.value.toLowerCase();
    
    const filteredData = data.filter((item) => 
        //item.itemName.toLowerCase().includes(searchTerm) ||item.category.toLowerCase().includes(searchTerm) // ||item.stockLevel.includes(finalSearchValue)
        item.itemName.toLowerCase().includes(searchTerm) || 
        item.category.toLowerCase().includes(searchTerm) || 
        String(item.stockLevel).toLowerCase().includes(searchTerm)
        //console.log(item.stockLevel.toLowerCase().includes(searchTerm))
    );
    displayFilteredData(filteredData);
});

const displayFilteredData = (filteredData) => {
    const list = document.querySelector('.student-list');
    list.innerHTML = '';
    filteredData.forEach((data, i) => {
        const row = `
            <tr>
                <td>${data.itemName}</td>
                <td>${data.category}</td>
                <td>${data.stockLevel}</td>
                <td>${data.reorderLevel}</td>
                <td>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" data-index="${i}" height="20" fill="currentColor" class="bi bi-cart2 cart text-warning me-2" viewBox="0 0 16 16">
                        <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5M3.14 5l1.25 5h8.22l1.25-5zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0m9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0"/>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" data-index="${i}" height="20" fill="currentColor" class="bi bi-pencil edit text-primary me-2" viewBox="0 0 16 16">
                        <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325"/>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" data-index="${i}" height="20" fill="currentColor" class="bi bi-trash3 delete text-danger" viewBox="0 0 16 16">
                        <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
                    </svg>
                </td>
            </tr>`;
        list.innerHTML += row;
    });
};


// buying the stock
const buyStock = JSON.parse(localStorage.getItem('buyStock')) || [];

const buybtn = document.querySelector('.buybtn');
buybtn.addEventListener('click', function (e) {
    e.preventDefault();
    if (!validationquantity(quantity)) {
        return; 
    }
    if (buyindex !== -1) {
        const infoCart = data[buyindex];
        const changedStockLevel = Number(infoCart.stockLevel) - Number(quantity.value);

        if (changedStockLevel >= 0) {
            infoCart.stockLevel = changedStockLevel;
            localStorage.setItem('stockData', JSON.stringify(data));
            
            buyStock.push({
                itemName: infoCart.itemName,
                quantity: quantity.value,
            });

            quantity.value = '';
            quantity.classList.remove('is-invalid');
            quantity.classList.remove('is-valid');
            localStorage.setItem('buyStock', JSON.stringify(buyStock));
           
            const modal = bootstrap.Modal.getOrCreateInstance(document.querySelector('#buy'));
            modal.hide();
            if(modal.hide()){
                quantity.classList.remove('is-invalid');
                 quantity.classList.remove('is-valid');
            }

            showData(); 
            showCard(); 
            
        } else {
            alert('Not enough stock available!');
        }
    }
});


const showCard=()=>{
    const card=document.querySelector('#card');
    card.innerHTML = '';
    buyStock.forEach((data, i) => {
        
        const row = `<div class="card" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title">${data.itemName}</h5>
                <h6 class="card-subtitle mb-2 text-body-secondary">${data.quantity}</h6>
            </div>
        </div>
            `;
        card.innerHTML += row;
    })
}

document.querySelector('#viewBoughtItems').addEventListener('click', () => {
    window.location.href = 'buy.html';
});

showCard();
showData();