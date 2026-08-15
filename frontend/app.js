// const  getStudents= async ()=>{
//             const response = await fetch("http://localhost:4000/get-all-std");
//             const result= await response.json();
//             console.log(result);






            
// }
            


const routeAuth=(()=>{
    const data=localStorage.getItem("token")
    if (data) {
        window.location.href="./dashboard.html"
    }
   
    
    })()

const signup= async()=>{

   try {
    const fullName=document.getElementById("fullName").value;
    const email=document.getElementById("email").value;
    const password =document.getElementById("password").value;
    
        const userObj={
            fullName,
            email,
            password
        }
        console.log(userObj);
        if (!fullName || !email|| !password) {
            Swal.fire({
                title: "Missing Fields!",
                text: "Please fill in all required fields.",
                icon: "warning"
            });
            return
        } 
        
        
       const response= await fetch("https://full-stack-crud-todo-app.vercel.app/sign-up",{
            method:"POST",
            headers: {
                "Content-Type": "application/json"
            },
            body:JSON.stringify(userObj)
    
        }
         )
    
         const result= await response.json()
         console.log(result);
    
         if (result.status) {
            Swal.fire({
                title: "Account Created!",
                text: "Your account has been created successfully.",
                icon: "success"
            }).then(() => {
                window.location.href = "./index.html";
            });
         }
    else{
        Swal.fire({
            title: result.message,
         
            icon: "error"
        });
    }
   } catch (error) {
    alert(error.message)
    
   }

}



