

//Create Task class
class Task{
  constructor(newTask){
    this.newTask = newTask;
  }
}


//Create UI class
class UI{
  constructor(){}
  
  addTask(task){
    //Targetion parent
    const tbody = document.querySelector('.tbody');
    //Creating tr element
    const tr = document.createElement('tr');
    //ineerHTML
    tr.innerHTML = `
    <td>${task.newTask}</td>
    <td><td>
    <td><td>
    <td><td>
    <td><a href="#" class="delete">X</td>`;
    //Appent tr into tbody
    tbody.appendChild(tr);

  }

  showAlert(message, className){
    //Create div element
    const div = document.createElement('div');
    //Add class
    div.className = `alert ${className}`;
    //Add Text Node
    div.appendChild(document.createTextNode(message));
    //Target Parent
    const card = document.querySelector('.card-header');
    //Target Children
    const form = document.querySelector('#form');
    //Insert
    card.insertBefore(div, form);


    //Set Time Out Alert
    setTimeout(function(){
      document.querySelector('.alert').remove();
    },2000)
  }

  //Search Task
  searchTask(target){
    const text = target.value.toLowerCase();
    // console.log(text);
    document.querySelectorAll('tr').forEach(function(task){
      if(task.textContent.toLowerCase().indexOf(text) !== -1){
        task.style.display = 'Block';
      }else{
        task.style.display = 'none';
      }
    });
  }


  //Remove Task
  removeTask(target){
    if(target.className === 'delete'){
      target.parentElement.parentElement.remove();
    }
  }



  //Clear Task Input
  clearTask(){
    document.getElementById('new-task').value = '';
  }


   //Clear Task BTN
   ClearTaskBtn(){
    document.querySelector('.tbody').innerHTML = '';
    
 }

}


//Create Store class
class Store{
  constructor(){}
  //Get Data from LS
  static getData(){
    let tasks;
    if(localStorage.getItem('tasks') === null){
      tasks = [];
    }else{
      tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    return tasks;
  }

  //Set Data from LS
  static setData(task){
    const tasks = Store.getData();
    

    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
  }


  //Display Data in UI from LS
  static displayData(){
    const tasks = Store.getData();

    //Inte ui
    const ui = new UI;

    tasks.forEach(function(task){
      ui.addTask(task);
    })
  }

  //Remove Data From LS
  static removeData(newTask){
    // console.log(newTask);
    const tasks = Store.getData();
    tasks.forEach(function(task, index){
      if(task.newTask === newTask){
        tasks.splice(index, 1);
      }
    });
    //Set in LS
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }


  //Clear All Data From LS
  static clearData(){

    localStorage.clear();
  }
}








//Display Data in UI DOM Load Event Listener
document.addEventListener('DOMContentLoaded', Store.displayData);


//Form Event Listener
document.getElementById('form').addEventListener('submit', function(e){

  //Getting New Task Value
  const newTask = document.getElementById('new-task').value;

  //Inte task
  const task = new Task(newTask);
  //Inte ui
  const ui = new UI;

  //Validation
  if(newTask === ''){
    //showAlert
    ui.showAlert('Please Fill The Task Field', 'error')

  }else{
    //addTask
    ui.addTask(task);

    //Set Data in LS
    Store.setData(task);

    //Add Task Alert
    ui.showAlert('Task Added!', 'success');



    //clearTask
    ui.clearTask();

  }

  e.preventDefault();
});


//Search Task Event Listener
document.getElementById('search').addEventListener('keyup', function(e){


  //Inte ui
  const ui = new UI;

  //SearchTask
  ui.searchTask(e.target);
  
  
})



//Remove Task Event Listener
document.querySelector('.tbody').addEventListener('click', function(e){
  //Inte ui
  const ui = new UI;


  //removeTask
  ui.removeTask(e.target);

  //Remove Task Alert
  ui.showAlert('Task Removed!', 'error');

  //Remove Data From LS
  Store.removeData(e.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.textContent);
})





//Clear Tasks BTN Event Listener
document.querySelector('.clear-tasks').addEventListener('click', function(){
  //Inte ui
  const ui = new UI;

  //ClearTaskBtn
  ui.ClearTaskBtn();

  //Clear Datas From LS
  Store.clearData();

  //Clear Task Alert
  ui.showAlert('Removed All Tasks!', 'error');
});














//-----------------------------------------------
// //Targeting Elements
// const newTask = document.getElementById('new-task');
// const searchInput = document.getElementById('search');
// const clearBTN = document.querySelector('.clear-tasks');
// const form = document.getElementById('form');
// const tr = document.querySelector('.table-item');

// //callback allEventListeners()
// allEventListeners();

// //Event Listeners
// function allEventListeners(){

//   //DOM load event
//   document.addEventListener('DOMContentLoaded', getTasks);

//   //Form Event Listener
//   form.addEventListener('submit', addNewTask);

//   //Delete Task Event Listener
//   tr.addEventListener('click', deleteTask);

//   //Clear Task BTN Event Listener
//   clearBTN.addEventListener('click', clearTaskBTN);

//   //Search Tasks Event Listenter
//   searchInput.addEventListener('keyup', searchTask);
// }


// //getTask function
// function getTasks(){
//   let tasks;
//       if(localStorage.getItem('tasks') === null){
//         tasks = [];
//       }else{
//        tasks = JSON.parse(localStorage.getItem('tasks'));
//       }

//       tasks.forEach(function(task){
//         //Creating Elements: To dissplay in UI
//         //Create td 
//         const td = document.createElement('td');
//         //Add Class
//         td.className ='d-flex justify-content-between';
//         //Add text node
//         td.appendChild(document.createTextNode(task));
      
//         //Create a element
//         const link = document.createElement('a');
//         //Add Class
//         link.className = 'delete-item';
//         //Inner HTML
//         link.innerHTML = '<i class="fas fa-times"></i>';
//         //Append link into td
//         td.appendChild(link);
//         //Append td into tr
//         tr.appendChild(td);
//       })
//     }




// //addNewTask function
// function addNewTask(e){
//   const newTaskInputText = newTask.value;
//   // console.log(NewTaskInputText);


//   if(newTaskInputText.trim() == ''){
//     alert('Please Add a Task');
//   }else{
//     //Creating Elements: To dissplay in UI
//     //Create td 
//     const td = document.createElement('td');
//     //Add Class
//     td.className ='d-flex justify-content-between';
//     //Add text node
//     td.appendChild(document.createTextNode(newTaskInputText));
  
//     //Create a element
//     const link = document.createElement('a');
//     //Add Class
//     link.className = 'delete-item';
//     //Inner HTML
//     link.innerHTML = '<i class="fas fa-times"></i>';
//     //Append link into td
//     td.appendChild(link);
//     //Append td into tr
//     tr.appendChild(td);
    
  
//     //Stor task in LS
//     function storeTaskInLocalStorage(newTaskInputText){
//       let tasks;
//       if(localStorage.getItem('tasks') === null){
//         tasks = [];
//       }else{
//        tasks = JSON.parse(localStorage.getItem('tasks'));
//       }

//       tasks.push(newTaskInputText);
//       localStorage.setItem('tasks', JSON.stringify(tasks));
//     }
    
//     storeTaskInLocalStorage(newTaskInputText);
  
//     //Clear New Task input 
//     newTask.value = '';

//   }



//   e.preventDefault();
// }








// //deleteTask function
// function deleteTask(e){
  
  
//   if(e.target.parentElement.className === 'delete-item'){
//     e.target.parentElement.parentElement.remove();
//   }

//   let taskItem = e.target.parentElement.parentElement;
//   deleteTaskFromLS(taskItem);

//   //Delete task from LS
//   function deleteTaskFromLS(taskItem){

//     let tasks;
//       if(localStorage.getItem('tasks') === null){
//         tasks = [];
//       }else{
//        tasks = JSON.parse(localStorage.getItem('tasks'));
//       }

//       tasks.forEach(function(task,index){
//         if(taskItem.textContent === task){
//           tasks.splice(index, 1);
//         }
//       });
      
//       localStorage.setItem('tasks', JSON.stringify(tasks));

//     }
// }




// //clearTaskBTN function
// function clearTaskBTN(){
//   tr.innerHTML = '';



//   //Clear all tasks from LS
//   function clearTasksFromLS(){
//     localStorage.clear();
//   }
//   clearTasksFromLS();
// }




// //searchTask function
// function searchTask(e){
//   const searchText = e.target.value.toLowerCase();
//   // console.log(searchText);

//   //Loop Through Array of tasks
//   document.querySelectorAll('tr').forEach(function(task){

//     const item = task.textContent;
//     if(item.toLowerCase().indexOf(searchText) != -1){
//       task.style.display = "block";
//     }else{
//       task.style.display = "none";
//     }
//   });
// }









//--------------------------------------------------


// // const form = document.querySelector('#form');
// // const newTask = document.querySelector('#new-task');
// // const search = document.querySelector('#search');
// // const table = document.querySelector('.table');
// // const tbody = document.querySelector('.tbody');
// // const taskList = document.querySelector('.table-item');
// // const clearTask = document.querySelector('.clear-tasks');



// // // Load all event listeners callback function
// // loadAllEventSelectors();

// // // Load all event listeners function
// // function loadAllEventSelectors(){
// //    //DOM load event
// //    document.addEventListener('DOMContentLoaded', getTasks);
// //   // Add task event
// //   form.addEventListener('submit', addTask);
// //   // Remove task event
// //   tbody.addEventListener('click', removeTask);
// //   // Clear task event
// //   clearTask.addEventListener('click', clearTaskBtn);
// //   // Search task event
// //   search.addEventListener('keyup', searchTask);
// // }


// // // getTasks function
// // function getTasks(){
// //   let tasks;
// //   if(localStorage.getItem('tasks') === null){
// //     tasks = [];
// //   }else{
// //     tasks = JSON.parse(localStorage.getItem('tasks'));
// //   }

// //   tasks.forEach(function(task){

// //     //Create tr element
// //   const tr = document.createElement('tr');
// //   //Add className
// //   tr.className = 'table-item';
// //   //Append tr into tbody
// //   tbody.appendChild(tr);

// //   //Create td element
// //   const td = document.createElement('td');
// //   //Add className
// //   td.className = 'd-flex justify-content-between';
// //   //Create text node and append to td
// //   td.appendChild(document.createTextNode(task));
// //   //Appent td into tr
// //   tr.appendChild(td);


// //   //Create link element
// //   const link = document.createElement('a');
// //   //Add className
// //   link.className = 'delete-item';
// //   //Add icon html
// //   link.innerHTML = '<i class="fas fa-times"></i>';
// //   //Append link into td
// //   td.appendChild(link);
// //   }
// //   )}


// // // addTask function
// // function addTask(e){
// //   let task = newTask.value;
// // // when you click 'add task' either without inputting any value, or by typing only spaces. And it screws things up a bit. But It's also an easy fix. All you have to do is 1) ensure the commands for creating new list items is contained in else {}'s after checking for empty input values, and 2) trimming out out the white spaces from the taskInput.value  (using  .trim() )

// //   if (task.trim() === ''){
// //     alert('Task is empty');
// //   }else{
// //     //Create tr element
// //     const tr = document.createElement('tr');
// //     //Add className
// //     tr.className = 'table-item';
// //     //Append tr into tbody
// //     tbody.appendChild(tr);
  
// //     //Create td element
// //     const td = document.createElement('td');
// //     //Add className
// //     td.className = 'd-flex justify-content-between';
// //     //Create text node and append to td
// //     td.appendChild(document.createTextNode(task));
// //     //Appent td into tr
// //     tr.appendChild(td);
  
  
// //     //Create link element
// //     const link = document.createElement('a');
// //     //Add className
// //     link.className = 'delete-item';
// //     //Add icon html
// //     link.innerHTML = '<i class="fas fa-times"></i>';
// //     //Append link into td
// //     td.appendChild(link);



// //     //Store in LS callback function
// //     let taskItem = newTask.value;
// //     storeTaskInLocalStorage(taskItem);
  
  
// //     //Clear task
// //     newTask.value = '';
// //   }


  
// //     e.preventDefault();
// //   }





// // // storeTaskInLocalStorage function 
// // function storeTaskInLocalStorage(taskItem){
// //   let tasks;
// //   if(localStorage.getItem('tasks') === null){
// //     tasks = [];
// //   }else{
// //     tasks = JSON.parse(localStorage.getItem('tasks'));
// //   }

// //   //add the value to the end of the array
// //   tasks.push(taskItem);

// //   //set it back to local storage
// //   localStorage.setItem('tasks', JSON.stringify(tasks));

// // }



// // // removeTask function
// // function removeTask(e){
// //   if(e.target.parentElement.classList.contains('delete-item')){

// //     if(confirm('Are you sure?')){
      
// //       e.target.parentElement.parentElement.parentElement.remove();
// //     }
// //   }

// //   //removeTaskFromLocalStorage callback 
// //   const taskItems = e.target.parentElement.parentElement.parentElement;
// //   removeTaskFromLocalStorage(taskItems);

// // }

// // //removeTaskFromLocalStorage function
// // function removeTaskFromLocalStorage(taskItems){
// //   let tasks;
// //   if(localStorage.getItem('tasks') === null){
// //     tasks = [];
// //   }else{
// //     tasks = JSON.parse(localStorage.getItem('tasks'));
// //   }

// //   tasks.forEach(function(task, index){
// //     if(taskItems.textContent === task){
// //       tasks.splice(index, 1);
// //     }
// //   });

// //   //set in localstorage 
// //   localStorage.setItem('tasks', JSON.stringify(tasks));
// // }



// // // clearTaskBtn function
// // function clearTaskBtn(e){

// //   //1)easy way but slower than third way
// //   // tbody.innerHTML = '';

// //   //2)fast way
// //   while(tbody.firstChild){
// //     tbody.removeChild(tbody.firstChild);
// //   }


// //   clearTaskFromLocalStorage();

// // }

// // //clearTaskFromLocalStorage function
  
// // function clearTaskFromLocalStorage(){
// //   localStorage.clear();
// // }




// // // searchTask function
// // function searchTask(e){

// //   const text = e.target.value.toLowerCase();

// //   document.querySelectorAll('tr').forEach(function(task){

// //   const item = task.textContent;
// //   if(item.toLowerCase().indexOf(text) != -1){
// //     task.style.display = "block";
// //   }else{
// //     task.style.display = "none";
// //   }
// // });
  
// // }
  
