



const userName=document.getElementById("userName");
const userEmail=document.getElementById("userEmail");


const getProfile= async()=>{
    try {
        const token=localStorage.getItem("token")
    console.log(token);
    const response=await fetch("http://localhost:4000/profile",{
method:"GET",
headers:{
    Authorization:`Bearer ${token}`
}

    });
    const result=await response.json()
    console.log(result);
    userName.innerHTML=result.fullName;
    userEmail.innerHTML=result.email


     
    } catch (error) {
        console.log(error);
    }
}


const routeAuth=(()=>{
    const token=localStorage.getItem("token")
if (!token) {
    window.location.href="./login.html"
}


})()
getProfile()



const logout=()=>{
    
    localStorage.removeItem("token");
    window.location.href="./login.html"
}

const gettodo=async()=>{
    try {
        const todolist=document.getElementById("todoList");
        const token = localStorage.getItem("token");
        const todoCount=document.getElementById("todoCount")
    
    const getresponse = await fetch("http://localhost:4000/todo", {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    
    const result = await getresponse.json();
    
    // console.log("TODOS:", result.data);
    todolist.innerHTML=" ";
    const data = result.data;
    console.log(data.length);
    todoCount.innerHTML=` ${data.length} Tasks`
    
    data.forEach((Obj) => {
    
        console.log(Obj);
    
        todolist.innerHTML += `
            <div class="todo-card">
    
                <div class="todo-content">
                    <h3>${Obj.title}</h3>
                    <p>${Obj.description}</p>
                </div>
    
                <div class="todo-actions">
                    <button class="edit-btn"onclick="edittodo('${Obj._id}')" >Edit</button>
                    <button class="delete-btn" onclick="deletetodo('${Obj._id}')")>Delete</button>
                </div>
    
            </div>
        `;
       
       
    });
    } catch (error) {
        alert(error)
    }
}
const createTodo = async () => {
   try {
    const title = document.getElementById("todoTitle").value;
    const description = document.getElementById("todoDescription").value;
    

    const userobj = {
        title,
        description
    };

    const token = localStorage.getItem("token");

    // POST
    const response = await fetch("http://localhost:4000/todo", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(userobj)
    });

    const createResult = await response.json();
    console.log("CREATE:", createResult);
   
alert(createResult.message)
gettodo() 
 
    // GET
 
   } catch (error) {
    alert (error);
   }

   


};

const edittodo = async (ele) =>{
    console.log( ele)
const editValue=prompt("edit todo value")
const editdesc=prompt("edit decription value")
const obj={
    title:editValue,
     description:editdesc
}
const token = localStorage.getItem("token");

const response = await fetch(`http://localhost:4000/todo/${ele}`, {
    method: "PUT",
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(obj)
});
const editRes = await response.json();

    console.log("CREATE:", editRes.Status);
    

    if (!editRes.Status) {
        alert(error.message)
    }

    else{
        alert(editRes.message)
        gettodo() 
       
    }


}
const deletetodo = async (ele) =>{
    console.log( ele)

const token = localStorage.getItem("token");

const response = await fetch(`http://localhost:4000/todo/${ele}`, {
    method: "DELETE",
    headers: {
        
        Authorization: `Bearer ${token}`
    }
    // body: JSON.stringify(obj)
});
// const editRes = await response.json();

    // console.log("CREATE:", editRes.Status);
    

    const result = await response.json();

    console.log(result.message);
    
    if (!result.Status) {
        alert(error.message)
    } else {

        alert(result.message);
        gettodo();
    }


}

window.deletetodo=deletetodo
window.edittodo = edittodo
window.createTodo = createTodo
window.gettodo = gettodo
// const getTodos = async () => {
//     console.log("1. FUNCTION STARTED");

//     const token = localStorage.getItem("token");
//     console.log("2. TOKEN:", token);

//     try {
//         const response = await fetch("http://localhost:4000/todo", {
//             method: "GET",
//             headers: {
//                 Authorization: `Bearer ${token}`
//             }
//         });

//         console.log("3. RESPONSE:", response);

//         const result = await response.json();

//         console.log("4. RESULT:", result);

//     } catch (error) {
//         console.log("5. ERROR:", error);
//     }
// };

// getTodos();