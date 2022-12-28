import "./style.css";

const ul = document.querySelector("ul");
const form = document.querySelector("form");
const input = document.querySelector("input");

// Création de mon objet todos qui contiendra mes todos
const todos = [
  {
    text: "Ajoute, supprime, modifie et suis",
    done: false,
    editMode: false,
  },
];

// Afficher mes todos

const displayTodo = () => {
  const todoElement = todos.map(createTodoElement);
  ul.innerHTML = "";
  ul.append(...todoElement);
};

// Créér les éléments todos sur le DOM

const createTodoElement = (todo, index) => {
  if (todo.editMode) {
    return createEditMode(todo, index);
  } else {
    const li = document.createElement("li");
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = `Supprimer`;
    deleteButton.addEventListener("click", (event) => {
      deleteTodo(index);
      event.stopPropagation();
    });
    const editButton = document.createElement("button");
    editButton.innerHTML = `Modifier`;
    editButton.addEventListener("click", (event) => {
      event.stopPropagation();
      toggleEditMode(index);
    });
    li.innerHTML = `
  <span class="todo ${todo.done ? "done" : ""}"></span>
  <p>${todo.text}</p>
  `;
    li.append(editButton, deleteButton);
    li.addEventListener("click", (event) => {
      toggleTodo(index);
    });
    return li;
  }
};

// Ajouter une todo : event-listener et fonction add

form.addEventListener("submit", (event) => {
  event.preventDefault();
  addTodo(input.value);
  input.value = "";
});

const addTodo = (text) => {
  todos.push({
    text,
    done: false,
  });
  displayTodo();
};

// Supprimer une todo : fonction supprimer

const deleteTodo = (index) => {
  todos.splice(index, 1);
  displayTodo();
};

// Modifier le statut d'une Todo

const toggleTodo = (index) => {
  todos[index].done = !todos[index].done;
  displayTodo();
};

// Passer en mode edit

const toggleEditMode = (index) => {
  todos[index].editMode = !todos[index].editMode;
  displayTodo();
};

// Création de la fonction edit

const createEditMode = (todo, index) => {
  const li = document.createElement("li");
  const input = document.createElement("input");
  input.type = "text";
  input.value = todo.text;
  const cancelButton = document.createElement("button");
  cancelButton.classList.add("editButton");
  cancelButton.innerHTML = `Annuler`;
  cancelButton.addEventListener("click", (event) => {
    event.stopPropagation();
    toggleEditMode(index);
  });
  const saveButton = document.createElement("button");
  saveButton.innerHTML = `Enregistrer`;
  saveButton.classList.add("editButton");
  saveButton.addEventListener("click", (event) => {
    saveEditTodo(index, input);
  });
  li.append(input, cancelButton, saveButton);
  return li;
};

// Création de la fonction saveEditTodo

const saveEditTodo = (index, input) => {
  const value = input.value;
  todos[index].text = value;
  todos[index].editMode = false;
  displayTodo();
};

displayTodo();
