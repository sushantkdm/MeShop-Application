let fname = document.getElementById("fname");
let lname = document.getElementById("lname");

let saveBtn = document.getElementById("save-btn");

let oldPass = document.getElementById("old-pass");
let newPass = document.getElementById("new-pass");

let confirmPass = document.getElementById("confirm-pass");
let changeBtn = document.getElementById("change-btn");

let logoutBtn = document.getElementById("logout-btn");

if (!localStorage.getItem("currentUser")) {
  location.href = "../login/index.html";
}
let bank = JSON.parse(localStorage.getItem("bank"));
let currentUser = JSON.parse(localStorage.getItem("currentUser"));

for (let itm of bank) {
  if (itm.email === currentUser.email) {
    fname.value = itm.ele.fname;
    lname.value = itm.ele.lname;
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
  }
}

let us=document.querySelector(".us")
us.style.display="none"

saveBtn.addEventListener("click", (e) => {
  e.preventDefault();
  currentUser.fname = fname.value;
  currentUser.lname = lname.value;

  localStorage.setItem("currentUser", JSON.stringify(currentUser));

  for (let itm of bank) {
    if (itm.email === currentUser.email) {
      itm.ele.fname = fname.value;
      itm.ele.lname = lname.value;

      localStorage.setItem("bank", JSON.stringify(bank));
    }
  }
  us.style.display="block"
  setTimeout(()=>{
    us.style.display="none"
  },1000)
});
let old=document.querySelector(".old")
let neww=document.querySelector(".new")
let suc=document.querySelector(".suc")

suc.style.display="none"
old.style.display="none"
neww.style.display="none"
changeBtn.addEventListener("click", (e) => {
  e.preventDefault();

  if (currentUser.password === oldPass.value) {
    old.style.display="none"
    if (newPass.value === confirmPass.value) {
      neww.style.display="none"
      for (let itm of bank) {
        if (itm.email === currentUser.email) {
          itm.ele.password = newPass.value;
          itm.ele.cpassword = newPass.value;

          localStorage.setItem("bank", JSON.stringify(bank));

          currentUser.password = newPass.value;
          currentUser.cpassword = newPass.value;
          localStorage.setItem("currentUser", JSON.stringify(currentUser));
          
          suc.style.display="block"
          setTimeout(()=>{
            suc.style.display="none"
          },1000)
        }
      }
    }
    else{
      neww.style.display="block"
    }
  }
  else{
    old.style.display="block"
  }
  newPass.value=""
  oldPass.value=""
  confirmPass.value=""
  // localStorage.setItem("myUser", JSON.stringify(arr));
});

logoutBtn.addEventListener("click", () => {
  localStorage.setItem("currentUser", "");
  location.href = "../index.html";
});
