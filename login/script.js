let loginarr = [];

let email = document.getElementById("email");
let password = document.getElementById("password");

let invalidMsg = document.getElementById("invalid-msg");
let fieldMsg = document.getElementById("field-msg");
invalidMsg.style.display = "none";
fieldMsg.style.display = "none";

let loginBtn = document.getElementById("login-btn");
let successMsg = document.getElementById("successMsg");
successMsg.style.display = "none";

if (localStorage.getItem("currentUser")) {
  window.alert("you have already logged-in, Are sure you want to log-out?");

  localStorage.setItem("currentUser", "");

  // setTimeout(()=>{
  //   window.location.href  ="../shop/index.html";
  //  },1000);
}

function validateUser() {
  if (email.value === "" || password.value === "") {
    fieldMsg.style.display = "block";
    return;
  }
  if (localStorage.getItem("bank")) {
    bank = JSON.parse(localStorage.getItem("bank"));
    bank.map((ele, idx) => {
      if (ele.email === email.value && ele.ele.password === password.value) {
        localStorage.setItem("currentUser", JSON.stringify(ele.ele));

        // =====================================

        let cu = JSON.parse(localStorage.getItem("currentUser"));
        console.log(cu);

        if (localStorage.getItem("bank")) {
          let currBank = JSON.parse(localStorage.getItem("bank"));
          let flag = true;
          for (let itm of currBank) {
            if (itm.email === cu.email) {
              flag = false;
            }
          }
          if (flag) {
            let bank = { ele: cu, email: cu.email, bankArr: [] };
            currBank.push(bank);
            localStorage.setItem("bank", JSON.stringify(currBank));
          }
        } else {
          let bank = [{ ele: cu, email: cu.email, bankArr: [] }];
          localStorage.setItem("bank", JSON.stringify(bank));
        }
        // alert(mycurr)

        // ======================================================

        invalidMsg.style.display = "none";
        fieldMsg.style.display = "none";
        successMsg.style.display = "block";

        setTimeout(() => {
          location.href = "../shop/index.html";
        }, 1000);
      } else {
        invalidMsg.style.display = "block";
        return;
      }
    });
  } else {
    invalidMsg.style.display = "block";
    return;
  }

  // invalidMsg.style.display = "none";
  // fieldMsg.style.display = "none";

  // console.log(loginarr);
}

loginBtn.addEventListener("click", validateUser);
