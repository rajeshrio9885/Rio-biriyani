const cart = document.querySelector('.cart');
const cartIcon = document.querySelector('#cart-icon');
const closeBtn = document.getElementById('close-btn')
// code for openng cart
cartIcon.addEventListener('click',() =>{
    cart.classList.add('cart-active');
})

// code for closing cart
closeBtn.addEventListener('click',()=>{
    cart.classList.remove('cart-active');
})

document.addEventListener('DOMContentLoaded',reloadContent);

function reloadContent(){
selectingItem()
}

function selectingItem(){
    const trashBox = document.querySelectorAll('.cart-remove');
    trashBox.forEach((trashBtn)=>{
        trashBtn.addEventListener('click',removeItem)
    })
    //  qty not to be 0 and negative
    const qtyChange = document.querySelectorAll('.cart-quantity');
    qtyChange.forEach((qtyBtn)=>{
        qtyBtn.addEventListener('click',quantityChange);
    })

    //adding cart
    const cartBtn = document.querySelectorAll('.add-cart');
    cartBtn.forEach((cartAdd)=>{
        cartAdd.addEventListener('click',createCart);
    })
    updateTotal()
}

// remove from Cart
function removeItem(){
    if(confirm('do you want to remove the item?')){
    let title = this.parentElement.querySelector('.cart-food-title').innerHTML;
    itemList = itemList.filter((el)=> el.title != title)
    const parentDiv = this.parentElement.remove();
    reloadContent()
}}

// change qty mean not negative and zero
function quantityChange() {
    if(isNaN(this.value) || this.value < 1){
        this.value = 1;
        
    }
    reloadContent()
}

let itemList = [];

// create cart
function createCart() {
    const parent = this.parentElement
    const price = parent.querySelector('.food-price').innerHTML;
    const title = parent.querySelector('.food-title').innerHTML;
    const imgSrc = parent.querySelector('.food-img').src;

    let objList = {title,price,imgSrc}
    if(itemList.find((items)=>items.title == objList.title)){
        alert('Its is already added in the cart');
        return ;
    }else{
        itemList.push(objList)
    }

    const cartDown = document.querySelector('.cart-content');
    let newDiv = createNewItems(price,title,imgSrc);
    let passDiv = document.createElement('div');
    passDiv.innerHTML = newDiv;
    cartDown.append(passDiv);
    reloadContent()

}

function createNewItems(price,title,imgSrc) {
     return `
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
                <ion-icon name="trash" class="cart-remove"></ion-icon>
                
                </div>

     `;
}
function updateTotal(){
    let cartItems = document.querySelectorAll('.cart-box');
    let totalValue = document.querySelector('.total-price');

    let total = 0;

    cartItems.forEach((cp)=>{
        let cartPrice = cp.querySelector('.cart-price').innerHTML;
        let price = parseFloat(cartPrice.replace('Rs.',''));
         let qty = cp.querySelector('.cart-quantity').value;
        total+=(price*qty);
        cp.querySelector('.cart-amt').innerHTML = `Rs.${price*qty}`
    })
    totalValue.innerHTML = `Rs.${total}`

    // cart-count
    const cartCount = itemList.length;
    const getCount = document.querySelector('.cart-count');
    getCount.innerHTML = cartCount;
    if(cartCount == 0){
        getCount.style.display = 'none'
    }else{
        getCount.style.display = 'block'
    }
}