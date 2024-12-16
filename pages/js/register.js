// Lấy ra elements của trang
const formRegister = document.getElementById("formRegister");
const userNameElement = document.getElementById("userName");
const EmailElement = document.getElementById("Email");
const passwordElement = document.getElementById("password");
const rePasswordElement = document.getElementById("rePassword");


//Elements liên quan đến lỗi
const userNameError = document.getElementById("userNameError");
const EmailError = document.getElementById("EmailError");
const passwordError = document.getElementById("passwordError");
const rePasswordError = document.getElementById("rePasswordError");


//Lấy dữ liệu từ localStorage
const userLocal = JSON.parse(localStorage.getItem("users")) || [];

//Lắng nghe sự kiện submit form đăng ký tài khoản
formRegister.addEventListener("submit",function(e){
    //Ngăn chặn sự kiện load lại trang
    e.preventDefault();

    //Validate dữ liệu đầu vào
    if(!userNameElement.value){
        //Hiển thị lỗi
        userNameError.style.display="block";
    }else{
        //Ẩn lỗi
        userNameError.style.display="none";
    }

    if(!EmailElement.value){
        EmailError.style.display="block";
    }else{
        EmailError.style.display="none";
      
    }

    if(!passwordElement.value){
        passwordError.style.display="block";
    }else{
        passwordError.style.display="none";
    }
    if(!rePasswordElement.value){
        rePasswordError.style.display="block";
    }else{
        rePasswordError.style.display="none";
    }
  
//Kiểm tra nhập khẩu với nhập lại mật khẩu
if (passwordElement.value !== rePasswordElement.value){
    rePasswordError.style.display="block";
    rePasswordError.innerHTML="Mật khẩu không khớp";
}
//Gửi dữ liệu từ form lên localStorage
    if(userNameElement.value && EmailElement.value && passwordElement.value && rePasswordElement.value && passwordElement.value === rePasswordElement.value ) {


    //Lấy dữ liệu từ form và gộp thành đối tượng user (UUID cdn)
    const user ={
        userId: Math.ceil(Math.random() * 10000000),
        userName: userNameElement.value,
        Email: EmailElement.value,
        password:passwordElement.value,
      

    };
    // push user vào trong mảng userLocal
    userLocal.push(user);

    //Lưu trữ dữ liệu lên local
    localStorage.setItem("users",JSON.stringify(userLocal));

    //Chuyển hướng về trang đăng nhập
    window.location.href ="login.html";
    }
});