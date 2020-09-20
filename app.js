//Define UI Variables
const form = document.querySelector('#task-form');
const taskInput = document.querySelector('#task');
const taskList = document.querySelector('.collection');
const filter = document.querySelector('#filter');
const clearBtn = document.querySelector('.clear-tasks');

//Load all event listeners callback function
loadEventListeners();

//Load all event listeners function
function loadEventListeners(){
  //DOM load event
  document.addEventListener('DOMContentLoaded', getTasks);
  //Add task event
  form.addEventListener('submit', addTask);
  //Remove task event
  taskList.addEventListener('click', removeTask);
  //Clear tasks event
  clearBtn.addEventListener('click', clearTasks);
  // Filter task event
  filter.addEventListener('keyup', filterTasks);
}
//----------------------------------------------------------


//Get task from LS function 
function getTasks(){
  let tasks;
  if (localStorage.getItem('tasks') === null){
    tasks = [];
  }else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task){


  //Create li element
  const li = document.createElement('li');
  //Add class 
  li.className = 'collection-item';
  //Create text node and append to li
  li.appendChild(document.createTextNode(task));//====> the value are coming from task.

  //Create new link element
  const link = document.createElement('a');
  //Add class
  link.className = 'delete-item secondary-content';
  //Add icon html
  link.innerHTML = '<i class="fa fa-remove"></i>';
  
  //Append the link to li
  li.appendChild(link);


  //Append the li to ul
  taskList.appendChild(li);
  });
}


//---------------------------------------------------------------


//Add Task function
function addTask(e){

 
  if(taskInput.value.trim() === ''){
    alert('Add a task');
  }else{

    //Create li element
    const li = document.createElement('li');
    //Add class 
    li.className = 'collection-item';
    //Create text node and append to li
    li.appendChild(document.createTextNode(taskInput.value));
  
    //Create new link element
    const link = document.createElement('a');
    //Add class
    link.className = 'delete-item secondary-content';
    //Add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    
    //Append the link to li
    li.appendChild(link);
  
  
    //Append the li to ul
    taskList.appendChild(li);
  
    //Store in LS callback function
    const task = taskInput.value;// in function argument we need to put values come from the task input. so for better understanding i assign it to Task variable.
    storeTaskInLocalStorage(task);
  
     // Clear input
     taskInput.value = '';
  }


  e.preventDefault();
}

//----------------------------------------------------------

//Store task in LS function

function storeTaskInLocalStorage(task){
  let tasks;

  if(localStorage.getItem('tasks') === null){
    tasks = [];
  }else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  //add the value to the end of the array
  tasks.push(task);

  //set it back to local storage
  localStorage.setItem('tasks', JSON.stringify(tasks));
}






//---------------------------------------------------------




//Remove Task function
function removeTask(e){

  if(e.target.parentElement.classList.contains('delete-item')){

    if(confirm('Are you sure?')){
      e.target.parentElement.parentElement.remove();

      //Remove task from LS callback function
      //since we don't have id passing, What we'll have to pass in, is the actual element
      const taskItem = e.target.parentElement.parentElement;
      removeTaskFromLocalStorage(taskItem);

    }
  }

}

//Remove task form LS function

function removeTaskFromLocalStorage(taskItem){
  
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  }else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  

  tasks.forEach(function(task, index){
    if(taskItem.textContent === task){
      tasks.splice(index, 1);
    }
  });

  //then we need set localstorage again
  localStorage.setItem('tasks', JSON.stringify(tasks));

}// now everything is fine except the Cleartask function we need to fix it.







//------------------------------------------------------
//Clear Tasks function



//First way  which has problem when we click on cleartask btn after deleting the whole ul after that if we add some new task they will not display on task list
// function clearTasks(e){
//   const liElements = document.querySelectorAll('li.collection-item');

//   liElements.forEach(function(li){
//     if(e.target.classList.contains('clear-tasks')){
//         li.remove();
//     }
//   });  
// }

//Second way
function clearTasks(){
  // taskList.innerHTML = '';
}

//Third way =>fastest way
function clearTasks(){

while(taskList.firstChild){
  taskList.removeChild(taskList.firstChild);
}
  // https://jsperf.com/innerhtml-vs-removechild



  //Clear task from LS callback function
  clearTaskFromLocalStorage();
}


//Clear task from LS function

function clearTaskFromLocalStorage(){
  localStorage.clear();
}







//-----------------------------------------------

//Filter Tasks (search tasks)

function filterTasks(e){

  const text = e.target.value.toLowerCase();


  document.querySelectorAll('li').forEach(function(task){

    //Find text inside item, If found the method returns the index, if not it returns -1.
    const item = task.firstChild.textContent;
    if(item.toLowerCase().indexOf(text) != -1){
      task.style.display = "block";
    }else{
      task.style.display = "none";
    }
  });
}











