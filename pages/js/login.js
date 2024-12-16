//Element của trang
const formLogin =document.getElementById("formLogin");
const EmailElement = document.getElementById("Email");
const passwordElement = document.getElementById("password");
//Lắng nghe sự kiện submit form đăng nhập tài khoản
formLogin.addEventListener("submit",function(e){
    //Ngăn chặn sự kiện load lại trang
    e.preventDefault();


    //validate dữ liệu vào

    //Lấy dữ liệu từ local về
const userLocal = JSON.parse(localStorage.getItem("users")) || [];
    //Tìm kiếm email và mật khẩu mà người dùng nhập vào có tồn tại trên local không 
const findUser = userLocal.find(user => user.Email === EmailElement.value && user.password === passwordElement.value);

    //Nếu không thì thông báo cho người dùng nhập lại dữ liệu
if(!findUser){
    alert("email hoặc mật khẩu không đúng");
    //Nếu có thì đăng nhập thành công và chuyển hướng về trang chủ chính 
}else{
    window.location.href ="http://localhost:3000";

    //Lưu thông tin của user đăng nhập lên local
    localStorage.setItem("userLogin",JSON.stringify(findUser));
}
});