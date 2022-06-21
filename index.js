//1) создаю три главных переменных, которые подключаются к основным html функционалом туду листа
const addTask = document.getElementById('add-task');
const inputTask = document.getElementById('task-input');
const allTasks = document.querySelector('.all-tasks');
const delAll = document.getElementById('delete-all-tasks')

let tasks = [];
let todoTasks = [];

/*
if (!localStorage.tasks) {
  tasks = []
} else {
  tasks = JSON.parse(localStorage.getItem('tasks'))
}*/


//2) создаю функцию-конструктор, которая поможет создать много однотипных объектов
function Task(task) {
  this.task = task;
  this.completed = false;
}

//6) создаю функцию, где будет сам таск
function createTask(description, index) {
  return `
        <div class="create-task ${description.completed ? 'checked' : ''}">
             <div class="task">${description.task}</div>
             <div class="action">           
                  <input onclick="completedTask(${index})" class="complete" type="checkbox" 
                        ${description.completed ? 'checked' : ''}>
                  <span onclick="editTask(${index})" class="btn-edit"><i class="fa-solid fa-pen-to-square"></i>edit</span>
                  <span onclick="deletedTask(${index})" class="delete"><i class="fa-solid fa-trash"></i></span>
             </div>
        </div>          
    `
}


//9) создаю функцию, которая будет фильтровать завершенные таски и опускать их вниз
function filterTasks() {
  const activeTasks = tasks.length && tasks.filter(item => item.completed === false);
  const completedTasks = tasks.length && tasks.filter(item => item.completed === true);
  tasks = [...activeTasks, ...completedTasks];
}

//5) создаю функцию, в которой таски будут выводится на странице
function showTasks() {
  allTasks.innerHTML = "";
  if (tasks.length === 0) {
    delAll.classList.add("hide");
  } else {
    delAll.classList.remove("hide");
  }
  if (tasks.length > 0) {
    filterTasks();
    tasks.forEach((item, index) => {
      allTasks.innerHTML += createTask(item, index)
    });
    todoTasks = document.querySelectorAll('.create-task');

  }
}

showTasks();

//4) создаю функцию, где я буду обращаться к locale storage, чтобы хранить там таски
function storage() {
  //localStorage.setItem('tasks', JSON.stringify(tasks))
}

//7) создаю функцию, которая будет отвечать за завершения таска
function completedTask(index) {
  tasks[index].completed = !tasks[index].completed;
  if (tasks[index].completed) {
    todoTasks[index].classList.add('checked')
    setTimeout(() => {
      alertify.success('Task done!')
    }, 150)
  } else {
    todoTasks[index].classList.remove('checked')
    setTimeout(() => {
      alertify.warning('Task not done!')
    }, 150)
  }
  storage();
  showTasks();
}

//8) создаю функцию, которая будет отвечать за удаления таска
function deletedTask(index) {
  todoTasks[index].classList.add('deleted')
  setTimeout(() => {
    tasks.splice(index, 1);
    storage();
    showTasks();
  }, 500)
  setTimeout(() => {
    alertify.success('Task deleted!')
  }, 550)

}

// Редактирование таска
function editTask(index) {
  let curTask = todoTasks[index]; // выбранный таск
  if(!curTask.classList.contains('edit')) { // При первом нажатии на кнопку редактирования, начинаем редактировать.
    curTask.classList.add('edit'); // Добавляем класс 
    curTask.querySelector('.task').innerHTML = `<input type="test" value="${tasks[index].task}">`; // Вместо задачи добавляем инпут с редактированием
  } else { // При втором нажатии, когда класс `.edit` есть, мы сохраним
    let newTask = curTask.querySelector('.task > input').value;
    tasks[index].task = newTask;
    curTask.querySelector('.task').innerText = newTask;
    curTask.classList.remove('edit');
    // storage();
    
  }
}

// 3) создаю нажатие на кнопку добавить новый таск
addTask.addEventListener("click", () => {
  if (inputTask.value === '') {
    // alertify.error('Enter a task!')
  } else {
    setTimeout(() => {
      alertify.success('Task added!')
    }, 100)
    tasks.push(new Task(inputTask.value));
  }
  storage();
  showTasks();
  inputTask.value = '';

});

// Выполнение функции, когда пользователь отпускает клавишу на клавиатуре
inputTask.addEventListener("keyup", function(event) {
  // Число 13 в "Enter" и клавиши на клавиатуре
  if (event.keyCode === 13) {
    // При необходимости отмените действие по умолчанию
    event.preventDefault();
    // Вызов элемента button одним щелчком мыши
    document.getElementById("add-task").click();
  }
});


// input.addEventListener("keyup", function(event) {
//   if (event.keyCode === 13) {
//    event.preventDefault();
//     document.getElementById("task").click();
//   }
// });


//10 создаю нажатие на кнопку, которая удаляет все таски
delAll.addEventListener("click", () => {
  setTimeout(() => {
    alertify.success('All tasks deleted!')
  }, 100)
  tasks = [];
  storage();
  showTasks();
});


