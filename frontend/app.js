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
            alert("required field are missing")
            return
        } 
        
        
       const response= await fetch("http://localhost:4000/sign-up",{
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
            alert("sign-up success")

            window.location.href="./login.html"
            
         }
    else{
        alert(result.message)
    }
   } catch (error) {
    alert(error.message)
    
   }

}



