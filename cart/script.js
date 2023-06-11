let items = document.querySelector(".items");

let cartItem = [];
if(!localStorage.getItem("currentUser")){
  location.href="../login/index.html"
}

if (localStorage.getItem("bank")) {
  let bank = JSON.parse(localStorage.getItem("bank"));
  let currentUser=JSON.parse(localStorage.getItem("currentUser"));

  for(let itm of bank){
    if(itm.email == currentUser.email){
      cartItem=itm.bankArr
    }
  }
  

  displayItem(cartItem);
}

function displayItem(arr) {
  console.log(arr);
  // let items=document.querySelector(".items")
  let myhtml = "";
  let totalPrice=0;

  // console.log(arr)
  arr.map((ele) => {
    if(ele !==null){
      totalPrice+=ele.price
      myhtml += `
          <div class="item1">
          <div class="img">
            <img
              src="${ele.image}"               
              alt="item"
            />
          </div>
          <p>${ele.title}</p>
          
          <p><b>$${ele.price}</b></p>
        
     
          <button class="cart-btn"  onClick=removeItem(${ele.id})>Remove Item</button>
        </div>
          `;
    }
    
    
  });
  

  localStorage.setItem("totalPrice", JSON.stringify(totalPrice))
  items.innerHTML = myhtml;
}

function removeItem(id) {
  cartItem = cartItem.filter((ele, idx) => {
    if(ele.id !== id){
      return ele;
    }
  });
  let bank = JSON.parse(localStorage.getItem("bank"));
  let currentUser=JSON.parse(localStorage.getItem("currentUser"));

  for(let itm of bank){
    if(itm.email == currentUser.email){
      itm.bankArr=cartItem
      localStorage.setItem("bank", JSON.stringify(bank));
    }
  }
  
  displayItem(cartItem);
  printcheckoutlist(cartItem)
}


// ===========================



let checkoutlistcont = document.querySelector(".checkoutlist");

function printcheckoutlist(cartproducts) {

  if(cartItem.length==0){
    checkoutlistcont.innerHTML = `
    <h2 class="cll" >Checkout List</h2>
    <div class="row-ele total">
    <span>Total(USD)</span>
    <span>$0</span>
    </div>
    <div class="row-ele total">
    <span>Total(INR)</span>
    <span>₹0</span>
    </div>
    `;

    return;
  }

  let str = `
     <h2>Checkout List</h2>
    `
  let i = 1;
  let total = 0;
  for (let product of cartItem) {
    str += `
       <div class="row-ele">
       <span>${i}.${product.title}</span>
       <span>$${product.price}</span>
       </div>
       `
    i++;
    total += product.price;
  }
  total = Math.round(total * 100) / 100;
  str += `
    <div class="row-ele total">
    <span>Total(USD)</span>
    <span>$${total}</span>
    </div>
    <div class="row-ele total">
    <span>Total(INR)</span>
    <span>₹${Math.round(total * 82)}</span>
    </div>
    <div class="checkout-btn-cont">
    <button class="checkout-btn"> Click To Checkout</button>
    </div>
    `

  checkoutlistcont.innerHTML = str;

}


printcheckoutlist(cartItem);

function giveprice(cartItem) {
  let total = 0;
  for (let product of cartItem) {
    total += product.price;
  }
  total = total * 82;
  total = Math.round(total * 100) / 100;
  return total;
}

document.querySelector(".checkout-btn").addEventListener("click", function (e) {
 
  localStorage.setItem('totalPrice', JSON.stringify(giveprice(cartItem)));
  // cartItem = [];
  displayItem(cartItem);
  printcheckoutlist(cartItem);
  window.open("../razorpay/razorpay.html", "_blank");
 


});