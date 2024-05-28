let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let listCard = document.querySelector('.listCard');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');

// Define click sound
let clickSound = new Audio('sound/service-bell-ring-14610.mp3');


openShopping.addEventListener('click', () => {
    body.classList.add('active');
    // Play click sound
    clickSound.play();
});

closeShopping.addEventListener('click', () => {
    body.classList.remove('active');
    // Play click sound
    clickSound.play();
});


let products = [
    {
        id: 1,
        name: 'Scrambled',
        code: 'Code:T31',
        image: 'c1.png',
        price: 1800
    },
    {
        id: 2,
        name: 'Chicken Wings',
        code: 'Code:T31',
        image: 'c2.png',
        price: 2000
    },
    {
        id: 3,
        name: 'Loads of Chicken Salad',
        code: 'Code:T31',
        image: 'c3.png',
        price: 1900
    },
    {
        id: 4,
        name: 'Mango Pudding',
        code: 'Code:T31',
        image: 'c4.PNG',
        price: 1000
    },
    {
        id: 5,
        name: 'Fresh Salad',
        code: 'Code:T31',
        image: 'down.jfif',
        price: 1400
    },
    {
        id: 6,
        name: 'Tomato Pizza',
        code: 'Code:T31',
        image: 'grilled-chicken-roasted.avif',
        price: 1500
    },
    {
        id: 7,
        name: 'Chicken Wings',
        code: 'Code:T31',
        image: 'c7.PNG',
        price: 2000
    },
    {
        id: 8,
        name: 'Chicken Wings',
        code: 'Code:T31',
        image: 'c8.PNG',
        price: 2000
    },
    {
        id: 9,
        name: 'Chicken Wings',
        code: 'Code:T31',
        image: 'c9.PNG',
        price: 2000
    },{
        id: 10,
        name: 'Chicken Wings',
        code: 'Code:T31',
        image: 'c10.PNG',
        price: 2000
    },
    {
        id: 11,
        name: 'Chicken Wings',
        code: 'Code:T31',
        image: 'c11.PNG',
        price: 2000
    },
    {
        id: 12,
        name: 'Chicken Wings',
        code: 'Code:T31',
        image: 'c12.PNG',
        price: 2000
    },

];

let listCards  = [];

function initApp(){
    products.forEach((value, key) =>{
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
        newDiv.innerHTML = `
            <img src="image/${value.image}">
            <div class="title">${value.name}</div>
            <div class="code">${value.code}</div>  
            <div class="price">${value.price.toLocaleString()}Price</div>
            <button onclick="addToCard(${key})">Add To Card</button>`;
        list.appendChild(newDiv);
    })
} 





initApp();

function addToCard(key){
    if(listCards[key] == null){
        // copy product form list to list card
        listCards[key] = JSON.parse(JSON.stringify(products[key]));
        listCards[key].quantity = 1;
    }
    reloadCard();
}

function reloadCard(){
    listCard.innerHTML = '';
    let count = 0;
    let totalPrice = 0;
    listCards.forEach((value, key)=>{
        totalPrice = totalPrice + value.price;
        count = count + value.quantity;
        if(value != null){
            let newDiv = document.createElement('li');
            newDiv.innerHTML = `
                <div><img src="image/${value.image}"/></div>
                <div>${value.name}</div>
                <div>${value.code}</div>  
                <div>Price/DN ${value.price.toLocaleString()}</div>
                <div>
                    <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                    <div class="count">${value.quantity}</div>
                    <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
                </div>`;
            listCard.appendChild(newDiv);
        }
    })
    total.innerText = totalPrice.toLocaleString();
    quantity.innerText = count;
} 


function changeQuantity(key, quantity){
    if(quantity == 0){
        delete listCards[key];
    }else{
        listCards[key].quantity = quantity;
        listCards[key].price = quantity * products[key].price;
    }
    reloadCard();
}
