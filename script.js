// locomotive here



//  all form logic are here
let list = document.querySelector('ul.list');
let btnAdd = document.getElementById('btnAdd');
let listTask = [
    {
        content: 'content task 1',
        status: 'doing'
    },
    {
        content: 'content task 2',
        status: 'complete'
    }
];

if (localStorage.getItem("listTask") !== null) {
    listTask = JSON.parse(localStorage.getItem("listTask"));
}
//clear the input
btnAdd.onclick = function (event) {
    event.preventDefault();
    let content = document.getElementById('task').value;
    if (content !== '') {
        listTask.unshift({
            content: content,
            status: 'doing'
        });
    }

    addTaskToHTML();

    document.getElementById('task').value='';
    saveLocalStorage();
};

function saveLocalStorage() {
    localStorage.setItem("listTask", JSON.stringify(listTask));
}

function addTaskToHTML() {
    list.innerHTML = '';
    listTask.forEach((task, index) => {
        let newTask = document.createElement('li');
        newTask.classList.add(task.status);
        newTask.innerHTML = ` <div class="complete-icon" onClick="completeTask(${index})">
        <svg  aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
            <path fill-rule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm13.707-1.293a1 1 0 0 0-1.414-1.414L11 12.586l-1.793-1.793a1 1 0 0 0-1.414 1.414l2.5 2.5a1 1 0 0 0 1.414 0l4-4Z" clip-rule="evenodd"/>
          </svg>
    </div>
    <div class="content">${task.content}</div>
    <div class="close-icon"  onClick="deleteTask(${index})">
        <svg  aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18 17.94 6M18 18 6.06 6"/>
          </svg>
    </div>
    `;
        list.appendChild(newTask);
    });
}
addTaskToHTML();

// clear the box

function completeTask(index) {
    listTask[index].status = 'complete';
    addTaskToHTML();
    saveLocalStorage();
}

function deleteTask(index) {
    listTask = listTask.filter((task, newIndex) => { return newIndex != index; });
    addTaskToHTML();
    saveLocalStorage();
}
