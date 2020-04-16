
//Function To Display Popup
function div_show() {
    document.getElementById('abc').style.display = "block";
    get()
    }

    
       
//Function to Hide Popup
function div_hide(){
    document.getElementById('abc').style.display = "none";
  }

  function openUpdateForm(id,task,description,done,priority,due){
        
       document.getElementById('editform').style.display = "block";
       document.getElementById('editname').value = task
       document.getElementById('todoid').value = id
      document.getElementById('editemail').value = description
      
       document.getElementById('editstatus').value = done
    
      document.getElementById('editpriority').value = priority
      
      document.getElementById('editdate').value = due 
    } 


  function div2_hide() {
    document.getElementById('editform').style.display = "none";
    
    }  
    
function addData() {
    //getdata()
     let task = document.getElementById('name').value
     let descrp = document.getElementById('email').value
     let due = document.getElementById('date').value
     let status = document.querySelector('input[name="status"]:checked').value
     let priority = document.querySelector('input[name="Priorty"]:checked').value
    addNewTodoJson(task, descrp , due, status, priority)
    div_hide()
    
 }

 function editData() {
  //getdata()
   let task = document.getElementById('editname').value
   let descrp = document.getElementById('editemail').value
   let due = document.getElementById('editdate').value
   let status = document.getElementById('editstatus').value
   let priority = document.getElementById('editpriority').value
   let id = document.getElementById('todoid').value
  EditTodoJson(id,task, descrp , due, status, priority)
  div2_hide()
  
}

 
 function getdata() {

    var data = getTodos();
     
        return data;
 }



async function getTodos() {

  const resp = await fetch('/todos', { method: 'GET' })
  const todos = await resp.json()
  console.log(todos)
  return todos

}

// async function addNewTodoUrlEncoded(task, done, due) {

//   const resp = await fetch('/todos', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/x-www-form-urlencoded'
//     },
//     body: `task=${task}&done=${done}&due=2020-04-05`
//   })

// }

async function addNewTodoJson(task,description,due, done,Priority) {

  const resp = await fetch('/todos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ task, description, due, done, Priority })
  })

}

function get()
{
    var tomorrow = new Date();
    var dd = tomorrow.getDate()+1;
    tomorrow.setDate(dd);
    document.querySelector("#date").valueAsDate = tomorrow;
}


$(function (){
  div2_hide()
  div3_hide()
  let todolist = $("#list")
  fetchtodo(function (todos){
    todolist.empty()
    for(todo of todos){
      todolist.append(createtodo(todo))
    }
  })
 
})

function fetchtodo(done){
  $.get('/todos',function(data){
    done(data)
  })
}

function createtodo(todo)
{
  return $(`
   <tr>
  <td><button type="button" class="btn btn-link" onclick="getnotes(${todo.id})">${todo.task}</button></td>   
  <td>${todo.description}</td>
  <td>${todo.done}</td>
  <td>${todo.due}</td>
  <td>${todo.Priority}</td>
  <td><button onclick="openUpdateForm(${todo.id},'${todo.task}','${todo.description}','${todo.done}','${todo.Priority}','${todo.due}')" class="btn btn-secondary" style="width:100%; background-color:black">Edit</button></td>
  </tr>`
  )
}

async function EditTodoJson(id,task,description,due, done,Priority) {

  const resp = await fetch('/todos/'+id, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ task, description, due, done, Priority })
  })

}


function div_note_show() {
  document.getElementById('noteform').style.display = "block";

  }

  function div3_hide() {
    document.getElementById('noteform').style.display = "none";
    
    } 



function getnotes(id)
{
   div_note_show()
   document.getElementById('todoid').value = id
    let notelist = $("#notelist")

  fetchnote(id,function (notes){
    notelist.empty()
    for(note of notes){
    notelist.append(createnote(note))
    }
  })

}

function fetchnote(id,done){
  $.get('/notes/'+id,function(data){
    done(data)
  })
}


function createnote(note)
{
  return $(`
   <li>${note.description}</li>
  `
  )
}

function addnotes()
{

  let id = document.getElementById('todoid').value
  console.log(id)
  let description = document.getElementById('notes').value
  AddNoteJson(id,description)
}


async function AddNoteJson(id,description) {

  const resp = await fetch('/notes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ id, description })
  })

}
