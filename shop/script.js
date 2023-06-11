let products = [];

if (!localStorage.getItem("currentUser")) {
  location.href = "../login/index.html";
}

// +++++++++++++++++++++++++++
// if(localStorage.getItem('cartArr')){
//   var cartArr=JSON.parse(localStorage.getItem('cartArr'));
// }
// else{
//   var cartArr=[];
// }
// +++++++++++++++++++++++++++++++++++++
async function getData() {
  let fetching = await fetch("https://fakestoreapi.com/products");
  products = await fetching.json();
  // console.log(products);
  localStorage.setItem("productArr", JSON.stringify(products));

  displayItem(products);

  let arr = ["aram"];
  console.log(products[0].arr);
  console.log(products);
}
getData();

function displayItem(arr) {
  let myhtml = "";

  arr.forEach((ele) => {
    // console.log(ele)
    myhtml += `
        <div class="item1">
        <div class="img">
          <img
            src="${ele.image}"                
            alt="item"
          />
        </div>
        <p>${ele.title}</p>
        
        <p><b>Cost: $${ele.price}</b></p>
        <p>Rating:${ele.rating.rate}</p>
   
        <button class="cart-btn" id=${ele.id} onClick=addToCart(${ele.id})>Add to Cart</button>
      </div>
        `;
  });
  // console.log(myhtml)
  document.querySelector(".items").innerHTML = myhtml;
}

document.getElementById("search").addEventListener("input", (e) => {
  let myArr = products.filter((ele) => {
    if (
      ele.title
        .toLowerCase()
        .includes(document.getElementById("search").value.trim().toLowerCase())
    ) {
      return ele;
    }
    // else if(ele.price.includes(search.value.trim())){
    //   return ele;
    // }
  });
  if (myArr.length == 0) {
    document.querySelector(".items").innerHTML.innerHTML = `
    <p>Oops,No products found for this filtering, try different combinations!</P>
    `;
    return;
  }
  displayItem(myArr);
});

let allBtn = document.getElementById("all-btn");
let menbtn = document.getElementById("mens-btn");
let womenbtn = document.getElementById("womens-btn");
let Jewellerybtn = document.getElementById("Jewellery-btn");
let ele = document.getElementById("ele-btn");

function catBtn(id) {
  console.log(id);
  let msg = "";

  console.log(id);

  if (id === "mens-btn") {
    msg = "men's clothing";
    menbtn.classList.add("activeBlack");
    womenbtn.classList.remove("activeBlack");
    Jewellerybtn.classList.remove("activeBlack");
    ele.classList.remove("activeBlack");
    womenbtn.classList.remove("activeBlack");
    allBtn.classList.remove("activeBlack");
  } else if (id == "womens-btn") {
    msg = "women's clothing";
    womenbtn.classList.add("activeBlack");
    Jewellerybtn.classList.remove("activeBlack");
    ele.classList.remove("activeBlack");
    allBtn.classList.remove("activeBlack");
    menbtn.classList.remove("activeBlack");
  } else if (id == "ele-btn") {
    msg = "electronics";
    ele.classList.add("activeBlack");
    womenbtn.classList.remove("activeBlack");
    Jewellerybtn.classList.remove("activeBlack");
    menbtn.classList.remove("activeBlack");
    allBtn.classList.remove("activeBlack");
  } else if (id == "Jewellery-btn") {
    msg = "jewelery";
    Jewellerybtn.classList.add("activeBlack");
    womenbtn.classList.remove("activeBlack");
    menbtn.classList.remove("activeBlack");
    ele.classList.remove("activeBlack");
    allBtn.classList.remove("activeBlack");
  }

  let menarr = products.filter((elem) => {
    if (elem.category === msg) {
      return elem;
    }
  });
  displayItem(menarr);
}

allBtn.classList.add("activeBlack");

allBtn.addEventListener("click", () => {
  allBtn.classList.toggle("activeBlack");
  menbtn.classList.remove("activeBlack");

  displayItem(products);
});

menbtn.addEventListener("click", (e) => {
  catBtn(e.target.id);
});

womenbtn.addEventListener("click", (e) => {
  catBtn(e.target.id);
});
Jewellerybtn.addEventListener("click", (e) => {
  catBtn(e.target.id);
});

ele.addEventListener("click", (e) => {
  catBtn(e.target.id);
});

// function addToCart(id){
//   let cartItem;
//   // console.log(id)

//   products.forEach((ele)=>{
//     if(ele.id==id){

//       cartItem=ele
//       console.log("ele  " + ele)
//         console.log("eleid " + ele.id)
//         console.log("id    " + id)
//     }

//   })
//   if(cartItem){
//     cartArr.push(cartItem);
//     localStorage.setItem('cartArr',JSON.stringify(cartArr));
//   }

//   console.log(cartArr)
//   // console.log(JSON.parse(localStorage.getItem('cartArr')));
// }

function addToCart(id) {
  // let item;
  // products.forEach((ele)=>{
  //   if(ele.id==id){
  //     item=ele;
  //     console.log("ele  " + ele)
  //     console.log("eleid " + ele.id)
  //     console.log("id    " + id)
  //   }
  // })
  // console.log(id);

  // let cartBtn=document.querySelector("#id")

  let item = products.filter((ele, idx) => {
    if (ele.id == id) {
      let y = ele.id;
      let cartId = document.getElementById(y);
      cartId.innerText = "Added to Cart";
      cartId.style.backgroundColor = "green";
      return ele;
    }
  });

  if (localStorage.getItem("bank")) {
    let bank = JSON.parse(localStorage.getItem("bank"));
    console.log(bank);
    let currentUser = JSON.parse(localStorage.getItem("currentUser"));
    for (let itm of bank) {
      if (itm.email == currentUser.email) {
        console.log(itm.email);
        console.log(currentUser.email);
        itm.bankArr.push(item[0]);
        console.log(itm.ele);
      }
    }
    localStorage.setItem("bank", JSON.stringify(bank));
  }

  if (localStorage.getItem("currentStore")) {
    let myCartArray = JSON.parse(localStorage.getItem("currentStore"));
    myCartArray.storeCart.push(item[0]);
    console.log(item[0]);
    localStorage.setItem("currentStore", JSON.stringify(myCartArray));
  }

  if (localStorage.getItem("myCartArray")) {
    let myCartArray = JSON.parse(localStorage.getItem("myCartArray"));
    myCartArray.push(item[0]);
    localStorage.setItem("myCartArray", JSON.stringify(myCartArray));
  } else {
    let myCartArray = [];
    myCartArray.push(item[0]);
    localStorage.setItem("myCartArray", JSON.stringify(myCartArray));
  }

  // console.log(JSON.parse(localStorage.getItem('cartArr')));
}

let low = document.querySelector(".low");
let medium = document.querySelector(".medium");
let high = document.querySelector(".high");
let xhigh = document.querySelector(".xhigh");
let filter = document.querySelector(".filter");

function filtering(e) {
  e.preventDefault();

  let filterarr = products.filter((ele, idx) => {
    let val = [];
    if (low.checked === true) {
      val.push(low.value);
      if (ele.price < low.value) {
        return ele;
      }
    }
    if (medium.checked === true) {
      val.push(medium.value);
      if (ele.price > 25 && ele.price < 50) {
        return ele;
      }
    }
    if (high.checked === true) {
      val.push(high.value);
      if (ele.price > 50 && ele.price < 100) {
        return ele;
      }
    }
    if (xhigh.checked === true) {
      val.push(xhigh.value);
      if (ele.price > 100) {
        return ele;
      }
    }
  });

  console.log(filterarr);
  displayItem(filterarr);
}

filter.addEventListener("click", filtering);

function sliderChange(val) {
  console.log(val);
  let filterarr = products.filter((ele, idx) => {
    if (val <= ele.rating.rate) {
      return ele;
    }
  });
  displayItem(filterarr);
}

let logoutbtn = document.querySelector(".logoutbtn");

logoutbtn.addEventListener("click", () => {
  localStorage.setItem("currentUser", "");
  location.href = "../index.html";
});

let bank=JSON.parse(localStorage.getItem("bank"))
let user = document.querySelector(".user");
let userEmail = document.querySelector(".userEmail");
let currentUser = JSON.parse(localStorage.getItem("currentUser"));
for (let itm of bank) {
  if (itm.email === currentUser.email) {
  
    user.innerText = itm.ele.fname + "  " + itm.ele.lname;
    userEmail.innerText = itm.email;

  }
}


let profile = document.querySelector(".profile");
profile.addEventListener("click", () => {
  location.href = "../profile/index.html";
});
