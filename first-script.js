//  add to cart

const tbnCart = document.querySelector('.btnCart');
const cart = document.querySelector('.cart');
const btnClose = document.querySelector('#cart-close');

btnCart.addEventlistener('click',()=>{
    cart.classList.add('cart-active');
});

btnClose.addEventListener('click',()=>{
    cart.classList.remove('cart-active');
});

document.addEventlistener('DOMEContentLoaded',loadfood);

function loadfood(){
    loadContent();
}

function loadContent(){
    let btnRemove = document.querySelectorAll('.cart-remove');
    console.log(btnRemove);
    btnRemove.forEach((btn)=>{
        btn.addEventListener('click',removeItem);
    });

    let qtyElements = document.querySelectorAll('.cart-quantity');
    qtyElements.forEach((input)=>{
        input.addEventListener('change',changeQty);
    });

    let cartBtns = document.querySelectorAll('.add-cart');
    cartBtns.forEach((btn)=>{
        btn.addEventListener('click',addCart);
    });
    updateTotal();
}

function removeItem(){
    if(confirm('Are You Sure You Want To Remove It ?')){
        let title = this.prentElement.querySelector('.cart-food-title')
        itemList = itemList.filter(el => el.title != title);
        this.prentElement.remove();
        loadContent();
    }
}

function changeQty(){
    if(isNaN(this.value) || this.value < 1){
        this.value = 1;
    }
    loadContent();
}

let itemList = [];

function addCart(){
    let food = this.prentElement;
    let title = food.querySelector('.food-title').innerHTML;
    let price = food.querySelector('.food-price').innerHTML;
    let imgSrc = this.prentElement.querySelector('.food-img').src;

    let newProduct = {title,price,imgSrc}


    if(itemList.find((el) => el.title == newProduct.title)){
        alert("product already added in cart");
        return;
    }
    else{
        itemList.push(newProduct);
    }
    let newProductElement = createCartProduct(title,price,imgSrc);
    let elemnt = document.createElement('div');
    elemnt.innerHTML = newProductElement;
    let cartBasket = document.querySelector('.cart-content');
    cartBasket.append(elemnt);
    loadContent();
}

function createCartProduct(title,price,imgSrc){
  return`
     <div class="cart-box">
        <img src="${imgSrc}" class="cart-img">
        <div class="detail-box">
            <div class="cart-food-title">${title}</div>
            <div class="price-box">
                <div class="cart-price">${price}</div>
                <div class="cart-amt">${price}</div>
    </div>   
           <input type="number" value="1" class="cart-quantity">
    </div>
    <i class="fa fa-trash cart-remove"></i>
    </div>
     `;          
}

function updateTotal(){
  const cartItems = document.querySelectorAll('.cart-box');
  const totalValue = document.querySelector('.total-price');

  let total = 0;
  cartItems.forEach(product=>{
  let priceElement = product.querySelector('.cart-price');
  let price = parseFloat(priceElement.innerHTML.replace("Rs.",""));
  let qty = product.querySelector('.cart-quantity').value;
  total += (price*qty);
  product.querySelector('.cart-amt').innerHTML = "Rs." + (price*qty);
  });
  totalValue.innerHTML = 'Rs.' + total;

const cartCount = document.querySelector('.cart-count');
let count = itemList.length;
cartCount.innerHTML = count;

if(count == 0){
  cartCount.style.display = 'none';
}
else{
  cartCount.style.display = 'block';
}
}


