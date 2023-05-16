let todoItemsContainerEl = document.getElementById('todoItemsContainer');
let todoUserInput = document.getElementById('todoUserInput');


let SaveBtn = document.getElementById("SaveBtn");
SaveBtn.onclick = function() {
    localStorage.setItem('List', JSON.stringify(List));
}

function GetTodo() {
    let StoredStringList = localStorage.getItem('List');
    let StoredParseList = JSON.parse(StoredStringList);
    if (StoredParseList === null) {
        return [];
    } else {
        return StoredParseList;
    }

}
let List = GetTodo();
let uniqId = List.length;


function onToDoStatus(InpId, LabelId, TodoId) {
    let CheckboxEl = document.getElementById(InpId);
    let LabelEl = document.getElementById(LabelId);
    LabelEl.classList.toggle('checked');
    let IndexofItem = List.findIndex(function(eachTodo) {
        let eachTodoId = 'Todo' + eachTodo.uniqueNo;
        if (eachTodoId === TodoId) {
            return true;
        } else {
            return false;
        }
    })
    let TodoObject = List[IndexofItem];
    if (TodoObject.isChecked === true) {
        TodoObject.isChecked = false;
    } else {
        TodoObject.isChecked = true;
    }

}

function OnDelete(TodoId) {
    let todoEl = document.getElementById(TodoId);
    todoItemsContainerEl.removeChild(todoEl);
    let TodoIndex = List.findIndex(function(eachTodo) {
        let Id = 'Todo' + eachTodo.uniqueNo;
        if (Id === TodoId) {
            return true;
        } else {
            return false;
        }
    })
    List.splice(TodoIndex, 1);
}

function CreateTodoItem(Todo) {
    let InpId = 'myCheckbox' + Todo.uniqueNo;
    let LabelId = 'Label' + Todo.uniqueNo;
    let TodoId = 'Todo' + Todo.uniqueNo;
    let todoEl = document.createElement('li');
    todoEl.classList.add('todo-item-container', 'd-flex', 'flex-row');
    todoEl.id = TodoId;
    todoItemsContainerEl.appendChild(todoEl);
    let InputEl = document.createElement('input');
    InputEl.type = "checkbox";
    InputEl.id = InpId;
    InputEl.checked = Todo.isChecked;
    InputEl.classList.add("checkbox-input");
    InputEl.onclick = function() {
        onToDoStatus(InpId, LabelId, TodoId);
    }
    todoEl.appendChild(InputEl);
    let LabelContainer = document.createElement('div');
    LabelContainer.classList.add('label-container', 'd-flex', 'flex-row');
    todoEl.appendChild(LabelContainer);
    let LabelEl = document.createElement('label');
    LabelEl.classList.add('checkbox-label');
    LabelEl.setAttribute("for", InpId);
    LabelEl.textContent = Todo.text;
    LabelEl.id = LabelId;
    if (Todo.isChecked === true) {
        LabelEl.classList.add('checked');
    }
    LabelContainer.appendChild(LabelEl);
    let DivContainerEl = document.createElement('div');
    DivContainerEl.classList.add('delete-icon-container');
    LabelContainer.appendChild(DivContainerEl);
    let DeleteIconEl = document.createElement('i');
    DeleteIconEl.classList.add('far', 'fa-trash-alt', 'delete-icon');
    DeleteIconEl.onclick = function() {
        OnDelete(TodoId)
    }
    DivContainerEl.appendChild(DeleteIconEl);
}
for (let Todo of List) {
    CreateTodoItem(Todo);
}
let BtnEl = document.getElementById('AddBtn');
BtnEl.onclick = function() {
    if (todoUserInput.value === "") {
        alert("Enter Valid Text");
        return;
    }
    uniqId += 1;
    let newTodo = {
        text: todoUserInput.value,
        uniqueNo: uniqId,
        isChecked: false
    };
    List.push(newTodo)
    CreateTodoItem(newTodo)
    todoUserInput.value = ""
}