
const routeAuth=(()=>{
    const data=localStorage.getItem("token")
    if (data) {
        window.location.href="./dashboard.html"
    }
   
    
    })()


const login=async()=>{
try {
    const email=document.getElementById("email").value;
const password=document.getElementById("password").value;


const userobj={
    email,
    password
}
console.log(userobj);

const response= await fetch("http://localhost:4000/login",{
    method:"POST",
    headers: {
        "Content-Type": "application/json"
    },
    body:JSON.stringify(userobj)

}
 )

 const result= await response.json()
         console.log(result);

         if (result.status) {
        
            localStorage.setItem("token",  result.token)
            // localStorage.setItem("user", JSON.stringify( result.data))
            alert("Login succesfully",)
           console.log( result.data.fullName);
          
           
            window.location.href="./dashboard.html"

         }
         else{
            alert(result.message)
         }
} catch (error) {
    alert(error.message)
}
}