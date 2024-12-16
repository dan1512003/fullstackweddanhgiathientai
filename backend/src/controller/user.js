const User =require('../model/user')
const nodemailer =require('nodemailer')
const {google} =require('googleapis')
require('dotenv').config();


async function sendMail (gmail,text,html) {
try{

const transport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER, 
        pass:process.env.EMAIL_PASSWORD,
    },
  tls:{
    rejectUnauthorized:false
  }
})

let info = await transport.sendMail({
    from: "'ĐÁN SAID' <nnguyengg123@gmail.com>",
    to: gmail,
    subject: "Message",
    text: text,
    html:html,
  
  });
  console.log(info)

}catch(err){
    console.log('err :',err)
}
}


 


exports.getSendMail=async(req,res)=>{
sendMail()
     
  }


exports.getUser=async(req,res)=>{
    try{
      const page = parseInt(req.query.page) || 1;
      const limit = 3;
      const skip = (page - 1) * limit;
      const items = await User.find().skip(skip).limit(limit);
      const totalItems = await User.countDocuments();
      const totalPages = Math.ceil(totalItems / limit);
       
  res.render("pageuser",{
     title:"User page",
     items:items,
     currentPage: page,
     totalPages: totalPages,
     skip:skip,
  })
    }catch(err){
        console.error(err)
        res.json({ message: 'Error saving user', type:'danger' });
    }
     
  }
  exports.getSignIn=async(req,res)=>{
    let errorgmail =req.session.errorgmail
    let errorusername =req.session.errorusername
    let errorpassword =req.session.errorpassword
    delete req.session.errorgmail
    delete req.session.errorusername
    delete req.session.errorpassword
    res.render("pagesignin",{title:'Page sign in', errorgmail, errorusername, errorpassword})
    
  }
  exports.postSignIn=async(req,res)=>{
    const {username,gmail,password}= req.body
   console.log(username)
   console.log(gmail)
   console.log(password)
   try{
    if(username && gmail && password){
    
        const userByUsername = await User.findOne({ username });
        const userByGmail = await User.findOne({ gmail });
        const userByPassword = await User.findOne({password})
        if (userByGmail && userByUsername && userByPassword){
             const text="You have logged in successfully"
             const sendgmail=`${gmail}`
             const html=`<p>Thank you for coming to our page! <p/>`
             sendMail(sendgmail,text,html)
            res.redirect("/todos")
        }else if(userByUsername && userByPassword){
            req.session.errorgmail='Gmail is wrong'
            res.redirect("/todos/signin")
        }else if(userByGmail && userByUsername){
           req.session.errorpassword='Password is wrong'
           res.redirect("/todos/signin")
        }else if(userByGmail && userByPassword){
          req.session.errorusername='Username is wrong'
          res.redirect("/todos/signin")
        }else if(userByUsername){
            req.session.errorgmail='Gmail is wrong'
            req.session.errorpassword='Password is wrong'
           res.redirect("/todos/signin")
        }else if(userByGmail){
            req.session.errorusername='Username is wrong'
            req.session.errorpassword='Password is wrong'
           res.redirect("/todos/signin")
        }else if(userByPassword){
            req.session.errorusername='Username is wrong'
            req.session.errorgmail='Gmail is wrong'
           res.redirect("/todos/signin")
        }else{
            req.session.errorpassword='Password is wrong'
            req.session.errorusername='Username is wrong'
            req.session.errorgmail='Gmail is wrong'
           res.redirect("/todos/signin")
        }

   }
   }catch(err){
console.log(err)
   }
      
    }

  exports.getSignUp=async(req,res,next)=>{
    let errorgmail =req.session.errorgmail
    let errorusername =req.session.errorusername
    let errorpassword =req.session.errorpassword
    delete req.session.errorgmail
    delete req.session.errorusername
    delete req.session.errorpassword
    res.render("pagesignup",{title:'Page sign up', errorgmail, errorusername, errorpassword})
   

  }
  exports.postSignUp=async(req,res)=>{
   const {username,gmail,password,repassword}= req.body
   console.log(username)
   console.log(gmail)
   console.log(password)
   console.log(repassword)
   try{
    if(username && gmail && password){
    
        const userByUsername = await User.findOne({ username });
        const userByGmail = await User.findOne({ gmail });
      
        if(password === repassword){
         if (userByUsername && userByGmail) {
            req.session.errorusername='User name already exists'
            req.session.errorgmail='Gmail already exists'
                return  res.redirect("/todos/signup");
            } else if (userByUsername) {
                 req.session.errorusername='User name already exists'
                return  res.redirect("/todos/signup");
            } else if (userByGmail) {
                 req.session.errorgmail='Gmail already exists'
                 return  res.redirect("/todos/signup");
            } else {
                const newUser = new User({ username, gmail, password: password});
                await newUser.save();
                const text ="You have successfully registered"
                const sendgmail=`${gmail}`
                const html=`<p>Thank you for coming to our page! <p/>`
                sendMail(sendgmail,text,html)
                return res.redirect("/todos/signin")
            }
        }
        else{
            if (userByUsername && userByGmail) {
             req.session.errorpassword='Passwords do not match'
             req.session.errorusername='User name already exists'
             req.session.errorgmail='Gmail already exists'
                return  res.redirect("/todos/signup");
            } else if (userByUsername) {
             req.session.errorpassword='Passwords do not match'
             req.session.errorusername='User name already exists'
                return  res.redirect("/todos/signup");
            } else if (userByGmail) {
            req.session.errorpassword='Passwords do not match'
            req.session.errorgmail='Gmail already exists'
                return  res.redirect("/todos/signup");
            } else {
            req.session.errorpassword='Passwords do not match'
                return  res.redirect("/todos/signup");
            }  
        }

   }
   }catch(err){
console.log(err)
   }
   
   
  }
  exports.getFogotPassword=async(req,res)=>{
    let error =req.session.error
    delete req.session.error
    res.render("pagefogotpassword",{title:'Page fogotpassword', error})
    
  }
  exports.postFogotPassword=async(req,res)=>{
  const reset=req.body.username
   console.log(reset)
    try{
     if(reset){
     
         const userByUsername = await User.findOne({ username:reset});
         const userByGmail = await User.findOne({ gmail:reset});
       if(userByUsername || userByGmail){
       if(userByUsername){
    const text ="Password reset requested"
    const sendgmail=`${userByUsername.gmail}`
    const html=` <p>Click on the following link to reset your password</p>`
     sendMail(sendgmail,text,html)
    req.session.message="We have sent you a password reset link!"
     return  res.redirect("/todos/fogotpassword");
}
if(userByGmail){
    const text ="Password reset requested"
    const sendgmail=`${userByGmail.gmail}`
    const html=` <p>Click on the following link to reset your password</p>`
     sendMail(sendgmail,text,html)
     req.session.message="We have sent you a password reset link!"
     return  res.redirect("/todos/fogotpassword");
}
       }else{
        req.session.error='User name or gmail already exists'
        return  res.redirect("/todos/fogotpassword");
       }
 
    }
    }catch(err){
 console.log(err)
    }
    
    
   }