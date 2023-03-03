import {STATUSES, PRIORITIES, list} from './variables.js'
import {isValidPriority, isValidStatus, isValidTask, getTask} from './utils.js'

let forms = document.querySelectorAll('.todo-form')
let todos = document.querySelectorAll('.todo')
let count = 0;

for(let form of forms) {
  form.addEventListener('submit', function(e) {
    e.preventDefault();
  
    let currentTodo = e.target.closest('.todo');
    let currentInput = currentTodo.querySelector('.add-task');
    let priority = currentTodo.dataset.priority === "high" ? "High" : "Low";
    let currentTodoList = currentTodo.querySelector('.todo-list')
  
    if(currentInput.value.trim() === '') return;
  
    let listIsUpdated = addTask(currentInput.value, STATUSES.TO_DO, PRIORITIES[priority.toUpperCase()]);
    if(!listIsUpdated) {
      currentInput.value = ''
      return;
    } ;

    render(currentTodoList, priority);
  
    currentInput.value = '';
  
    count++
  })
}

function render(currentTodoList, priority) {
  let filteredList = priority ? list.filter( todoItem => todoItem.priority === priority) : list;
  if(!filteredList.length) return;

  let div;
  for(let todoItem of filteredList) {
    div = document.createElement('div');
    div.classList.add('todo-list__item');
    div.innerHTML = `<div class="round">
                        <input type="checkbox"  id="checkbox${count}" class="checkbox">
                        <label for="checkbox${count}" class="labelForCheck"></label>
                    </div>
                    <p class="todo-list__item-text">${todoItem.name}</p>
                    <button class="delete-task"><img src="images/close-icon.svg" alt=""></button>`;

  }
  currentTodoList.append(div);
}


for(let todo of todos) {
  todo.addEventListener('click', function(e) {
    if(e.target.closest('.delete-task')) {
      let currentListItem = e.target.closest('.todo-list__item');
      deleteTask(currentListItem.querySelector('.todo-list__item-text').textContent);
      currentListItem.remove();
    }
  
    if(e.target.classList.contains('checkbox')) {
      e.target.closest('.todo-list__item').style.backgroundColor = e.target.checked ? '#F4F4F4' : '#fff';
    }
  })
}






  function addTask(task, status = STATUSES.TO_DO, priority = PRIORITIES.LOW) {
    if(task.trim() === '') return;
    if(isValidTask(task)) {
      alert('This task already was created');
      return false;
    } else {
      list.push({name: task, status, priority})
      return true;
    }
  }

  function deleteTask(task) {
    if (isValidTask(task)) {
      list.splice([list.findIndex( item => item.name === task)], 1);
    } else {
      console.log('There\'s no such task.')
    }
  }

  function changePriority(task, priority) {
    if(isValidTask(task) && isValidPriority(priority)) {
      getTask(task).priority = priority;
    }
  
  }
  
  function changeStatus(task, status) {
    if(isValidTask(task) && isValidStatus(status)) {
      getTask(task).status = status;
    }
  
  }
  
  

  
