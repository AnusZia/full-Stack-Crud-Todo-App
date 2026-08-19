import "dotenv/config";
import http from"http";
import nodemailer from "nodemailer"
import fs from "fs"
import  express, { application, json, response }  from "express";
import { log } from "console";
import { CLIENT_RENEG_LIMIT } from "tls";
import { findPackageJSON } from "module";
import cors from "cors";
import bcrypt, { compare } from "bcrypt";
import  Jwt  from "jsonwebtoken";
const app =express();
const PORT=  process.env.PORT || 4000;;

// const SERVER= http.createServer((req,res)=>{
//     if (req.url=="/"){
// res.end("welcome to the CRUD App")
//     }
//     else if(req.url=="/create-user"){
//         const user = {
//             id: 1,
//             name: "Anas",
//             email: "anas@gmail.com"
//         };

//         const users=[];
//         users.push(user);
//         fs.writeFileSync("users.json",JSON.stringify(user,null,2))

//         res.end("User Created Successfully");
//     }

//     else if(req.url=="/get-user"){

//         const data=fs.readFileSync("users.json","utf-8")
//         res.setHeader("Content-Type","application/json")
//         res.end(data)
//     }

//     else if(req.url=="/update-user"){
//         const data=fs.readFileSync("users.json","utf-8");
//         const users=JSON.parse(data);
        
//         users.name="Ali"
//         users.email="Ali@gmail.com"

//         fs.writeFileSync("users.json",JSON.stringify(users))

//         res.end("user updated successfully")

//     }

//     else if(req.url=="/delete-user"){

//         fs.writeFileSync("users.json","")
//         res.end("user deleted")
//     }

// })






// 
import mongoose from "mongoose";
import { setServers } from "node:dns/promises";
// import StdModel from "./studentschema.js";
app.use(express.json());
app.use(cors());

// setServers(["8.8.8.8", "1.1.1.1"]);
import userModel from "./models/user.js";

const URI = process.env.MONGO_URI;

mongoose.connect(URI)
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log("MongoDB ERROr:", err));
    console.log("MONGO URI EXISTS:", !!process.env.MONGO_URI);
    

//     app.post("/create-std", async (req,res)=>{
//         console.log(req.body);
// const userobj=req.body;
//  await StdModel.create(userobj);
// res.send("student-craeted")

//     });
//     app.post("/get-std-by-id", async (req,res)=>{
       
//     //    const body=req.body;
//     //     const students=await StdModel.findOne({
//     //         email:"anas@gmail.com"
//     //      });
//  const students=await StdModel.find();
// // const students=await StdModel.findById("6a6341b9d6981add867d34f1");
// //  console.log(students);
// res.send(students)

//     });

app.post("/sign-up", async (request, response) => {
    console.log("SIGNUP API HIT")
try {
        
console.log(request.body);
 
const{fullName, email ,password }=request.body
if (!fullName || !email|| !password) {
    response.json({
        message: "required fields are missing",
        status:false
        
    });
    return
}






const useremail= await userModel.findOne({email})

if (useremail) {
    response.json({
        message: "useremail already exist",
        status:false
        
    });
    
   return 
}

const hashPassword=await bcrypt.hash(request.body.password,10)
//  console.log("req.body.password", request.body.password)
//         console.log("hashPassword", hashPassword)

const obj={
    ...request.body,
    password:hashPassword
}

await userModel.create(obj)
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});

console.log("ABOUT TO SEND EMAIL");
console.log("Sending to:", email);

await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "🎉 Welcome to Our App!",
    html:  `
    <div style="margin:0; padding:30px 15px; background:#f5f5f5; font-family:Arial, sans-serif;">
    
        <div style="max-width:500px; margin:auto; background:#ffffff; padding:30px; border-radius:12px;">
    
            <h2 style="margin:0 0 15px; color:#222;">
                Welcome, ${fullName}! 👋
            </h2>
    
            <p style="color:#555; font-size:15px; line-height:1.6;">
                Thanks for signing up!
            </p>
    
            <p style="color:#555; font-size:15px; line-height:1.6;">
                Your account has been created successfully. 
                You can now log in and start using the application.
            </p>
    
            <div style="margin:25px 0; padding:15px; background:#f7f7f7; border-radius:8px;">
                <p style="margin:0; color:#333;">
                    <strong>Email:</strong> ${email}
                </p>
            </div>
    
            <p style="color:#777; font-size:14px; line-height:1.5;">
                Hope you enjoy using the app! 🚀
            </p>
    
            <p style="margin-top:25px; color:#555; font-size:14px;">
                Thanks,<br>
                <strong>Anas</strong>
            </p>
    
        </div>
    
    </div>
    `

});

console.log("EMAIL SENT");

console.log("EMAIL SENT");
response.json({
    message: "user singup success",
    status:true
    
});
} catch (error) {
    console.log("email error", error);
    response.json({
        message: "something went wrong",
        status:false
        
    });
   
}



});



// app.put("/update-std", async (req,res)=>{
//      const body=req.body;
//      await StdModel.findByIdAndUpdate(body.id, body)
// res.send("student-upadted ")

//     });

// app.delete("/delete-std", async (req,res)=>{
//     const body=req.body;
//     await StdModel.findByIdAndDelete(body.id)
// res.send("student-deleted ")

//    });
app.post("/login", async (request, response) => {

try {
    console.log(request.body);
    const {email,password}=request.body;
    if (!email || !password) {
        response.json({
            message:"required fields are missing",
            status:false
        })
    return
    
    }
    
    const userdata=await userModel.findOne({email})
    // console.log(userdata);
    
    if (!userdata) {
        response.json({
            message:"user not found",
            status:false
        })
        return
    }

    const comparepass= await bcrypt.compare(request.body.password,userdata.password);
    console.log("compare pass", comparepass);
    
    if (comparepass) {

        
     
        const JWTtoken=Jwt.sign(
            {
                id: userdata._id
        },
        process.env.JWT_SECRET,
        // {
            // expiresIn:"1"
        // }
        )
        response.json({
            message:"login success",
            status:true,
            data:userdata,
        token:JWTtoken
        })
    }
    else{
        response.json({
            message:"user not found",
            status:false
        })
        
    } 
} catch (error) {
    response.json({
        message:"something went wrong",
        status:false
    }) 
}

})



// app.get("/user/:id",async (req, res) => {

   
// const id=req.params.id;
// console.log(id);

// const user= await userModel.findById(id);
// res.json(user);
   

// });


import isAuth from "./middlewear/auth.js";
import TodoModel from "./models/todoScheam.js";

app.get("/profile" ,isAuth ,async (req, res) => {
    // console.log(req.userId);
    const dbId= await userModel.findById(req.userId).select("-password");
    // console.log(dbId);
   res.json(dbId);

})




app.post("/todo", isAuth, async (req, res) => {
    await TodoModel.create({
        title: req.body.title,
        description: req.body.description,
        userId: req.userId
    });

    res.json({
        
        message:"todo created",
        status:true
    });
});


app.get("/todo", isAuth, async (req, res) => {
    try {
        console.log("GET TODO ROUTE HIT");

        const tododata = await TodoModel.find({
            userId: req.userId
        });

        // console.log("TODO DATA:", tododata);

        res.json({
            data: tododata,
          
        });

    } catch (error) {
        console.log("ERROR:", error);
    }
});

app.put("/todo/:id", isAuth, async (req, res) => {
  
try {
    const body=req.body;
    const todoId=req.params.id

    console.log(body);
    console.log(todoId);
    if (!todoId) {
       return res.json({
            message:"ID REQUIRED",
            Status:false
          
        });
        
    }
    else{
        const upadtedData=await TodoModel.findByIdAndUpdate (todoId,body,{new: true}) 
        res.json({
            message:"Todo Updated",
            Status:true,
            data:upadtedData
          
        });
    }
    
    
       
} catch (error) {
     res.json({
        message:error,
        Status:false
      
    });
}
});
        
  
app.delete("/todo/:id", isAuth, async (req, res) => {
  
    try {
       
        const todoId=req.params.id
    
        
        console.log(todoId);
        const upadtedData=await TodoModel.findByIdAndDelete (todoId) 
        if (!todoId) {
           return res.json({
                message:"ID REQUIRED",
                Status:false
              
            });
            
        }
        else{
            const upadtedData=await TodoModel.findByIdAndDelete (todoId) 
            res.json({
                message:"delete Scuccesfully",
                Status:true,
               
              
            });
        }
        
        
           
    } catch (error) {
         res.json({
            message:error,
            Status:false
          
        });
    }
    });

  

  

app.listen(PORT, () => {
    console.log(`server running on http://localhost:${PORT}`);
});

 