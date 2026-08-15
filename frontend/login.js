
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

const response= await fetch("https://full-stack-crud-todo-app.vercel.app/login",{
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
            // alert("Login succesfully",)
            Swal.fire({
                title: "Login Successfully!",
                text: "Welcome back",
                icon: "success"
            }).then(() => {
                window.location.href = "./dashboard.html";
            });

         }
         else{
            Swal.fire({
                title: "Login Failed!",
                text: result.message,
                icon: "error"
            });
         }
} catch (error) {
    Swal.fire({
        title: error.message,
       
        icon: "error"
    });
}
}