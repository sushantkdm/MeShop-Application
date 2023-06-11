let arr = [];
let userId=0;

let fname = document.getElementById("fname");
let lname = document.getElementById("lname");
let email = document.getElementById("email");
let password = document.getElementById("password");
let cpassword = document.getElementById("cpassword");

let msg = document.getElementById("msg");
let Passmsg = document.getElementById("Passmsg");
msg.style.display = "none";
Passmsg.style.display = "none";

let userExist=document.getElementById("userExist")
userExist.style.display="none"

let signupBtn = document.getElementById("signup-btn");

let suc=document.querySelector(".suc")
suc.style.display="none"

function addUser(e) {
  // e.preventDefault();

  if (password.value !== cpassword.value) {
    Passmsg.style.display = "block";
    return;
  }
  if (
    fname.value === "" ||
    lname.value === "" ||
    email.value === "" ||
    password.value === "" ||
    cpassword.value === ""
  ) {
    msg.style.display = "block";
    password.value = "";
    cpassword.value = "";
    return;
  }
  msg.style.display = "none";
  Passmsg.style.display = "none";

  userId++;

  let objBank = {
    userId:userId,
    fname: fname.value,
    lname: lname.value,
    email: email.value,
    password: password.value,
    cpassword: cpassword.value,
  };
  

  if(localStorage.getItem("bank")){
    bank= JSON.parse(localStorage.getItem("bank")) 

    for(let itm of bank){
      if(itm.email===email.value){
          userExist.innerText=`User already exist with this ${email.value}`
          userExist.style.display="block"
          return;

      }
    }

    bank.push({ele:objBank, email:objBank.email,bankArr:[]})
    userExist.style.display="none"
    localStorage.setItem("bank", JSON.stringify(bank))
  }
  else{
    bank.push({ele:objBank, email:objBank.email,bankArr:[]})
    userExist.style.display="none"
    localStorage.setItem("bank", JSON.stringify(bank))
  }

  suc.style.display="block"
  setTimeout(()=>{
    suc.style.display="none"
  },1000)

  
  

  setTimeout(()=>{
    location.href="../login/index.html"
  },700)





}

signupBtn.addEventListener("click", addUser);
