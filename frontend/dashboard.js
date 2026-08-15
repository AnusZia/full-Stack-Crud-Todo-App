




const userName=document.getElementById("userName");
const userEmail=document.getElementById("userEmail");


const getProfile= async()=>{
    try {
        const token=localStorage.getItem("token")
    console.log(token);
    const response=await fetch("https://full-stack-crud-todo-app.vercel.app/profile",{
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
    window.location.href="./index.html"
}


})()
getProfile()



const logout=()=>{
    
    localStorage.removeItem("token");
    window.location.href="./index.html"
}

const gettodo=async()=>{
    try {
        const todolist=document.getElementById("todoList");
        const token = localStorage.getItem("token");
        const todoCount=document.getElementById("todoCount")
    
    const getresponse = await fetch("https://full-stack-crud-todo-app.vercel.app/todo", {
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
    const response = await fetch("https://full-stack-crud-todo-app.vercel.app/todo", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(userobj)
    });

    const createResult = await response.json();
    console.log("CREATE:", createResult);
   
    Swal.fire({
        title: createResult.message,
        text: "Your todo was added successfully.",
        icon: "success"
    });
gettodo() 
 
    // GET
 
   } catch (error) {
    Swal.fire({
        title: "Create Failed!",
        text: error.message,
        icon: "error"
    });
   }

   


};

const edittodo = async (ele) => {

    console.log(ele);

    const result = await Swal.fire({
        title: "Edit Todo",
        html: `
            <input id="swal-title" class="swal2-input" placeholder="Todo title">
            <input id="swal-description" class="swal2-input" placeholder="Todo description">
        `,
        showCancelButton: true,
        confirmButtonText: "Update",
        cancelButtonText: "Cancel"
    });

    if (!result.isConfirmed) {
        return;
    }

    const editValue = document.getElementById("swal-title").value;
    const editdesc = document.getElementById("swal-description").value;

    const obj = {
        title: editValue,
        description: editdesc
    };

    const token = localStorage.getItem("token");

    const response = await fetch(`https://full-stack-crud-todo-app.vercel.app/todo/${ele}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(obj)
    });

    const editRes = await response.json();

    console.log("UPDATE:", editRes.Status);

    if (!editRes.Status) {
        Swal.fire({
            title: "Update Failed!",
            text: editRes.message,
            icon: "error"
        });
    } else {
        Swal.fire({
            title: editRes.message,
            text: "Your todo was updated successfully.",
            icon: "success"
        });

        gettodo();
    }
};
const deletetodo = async (ele) =>{
    console.log( ele)

const token = localStorage.getItem("token");
const confirmDelete = await Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to recover this todo!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "Cancel"
});

if (!confirmDelete.isConfirmed) {
    return;
}
const response = await fetch(`https://full-stack-crud-todo-app.vercel.app/todo/${ele}`, {
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
        Swal.fire({
            title: "Delete Failed!",
            text: result.message,
            icon: "error"
        });
    } else {

    

    await Swal.fire({
        title: "Deleted!",
        text: result.message,
        icon: "success"
    });

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
//         const response = await fetch("https://full-stack-crud-todo-app.vercel.app/todo", {
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