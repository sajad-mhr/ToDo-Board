const $ = document;
const modal = $.getElementById("todo_form");
const todoInput = $.getElementById("todo_input");
const todoSubmit = $.getElementById("todo_submit");
const addBtn = $.getElementById("add_btn");
const btnCloseModal = $.querySelector(".close-modal");
const noStatusContainer = $.getElementById("no_status");
const statusTodo = $.querySelectorAll(".status");
const overlay = $.getElementById("overlay");
const error = $.querySelector(".error");
const colors = ["lightgreen", "yellow", "skyblue"];

function showModal() {
  modal.classList.add("active");
  todoInput.focus();
  overlay.style.display = "block";
}
function closeModal() {
  modal.classList.remove("active");
  overlay.style.display = "none";
}

function removeTodo(event) {
  event.target.parentNode.remove();
}

{
  /* <div class="todo" draggable="true">
          <i class="fa fa-close"></i>
          <p class="textTodo">
            ابتدا ممد میره بعدقلی بعد رضا ابتدا ممد میره بعدقلی بعد رضا ابتدا
            ممد میره بعدقلی بعد رضا ابتدا ممد میره بعدقلی بعد رضا
          </p>
    </div> */
}

let id = 0;
function addTodo() {
  if (todoInput.value.trim() === "") {
    error.style.display = "block";
    todoInput.focus();
  } else {
    error.style.display = "none";

    let todocontainer = $.createElement("div");
    todocontainer.classList.add("todo");
    todocontainer.setAttribute("draggable", true);
    todocontainer.setAttribute("id", id + 1);
    id++;

    let removeIcon = $.createElement("i");
    removeIcon.className = "fa fa-close";
    removeIcon.style.cursor = "pointer";
    removeIcon.style.padding = "10px";
    todocontainer.append(removeIcon);
    removeIcon.addEventListener("click", function (event) {
      removeTodo(event);
    });

    let textTodo = $.createElement("p");
    textTodo.textContent = todoInput.value.trim();
    textTodo.classList.add("textTodo");
    todocontainer.append(textTodo);

    noStatusContainer.append(todocontainer);

    let rColor = Math.floor(Math.random() * (250 - 150) + 150);
    let gColor = Math.floor(Math.random() * (250 - 150) + 150);
    let bColor = Math.floor(Math.random() * (250 - 150) + 150);
    console.log(rColor, gColor, bColor);
    // console.log(randomColor);
    todocontainer.style.backgroundColor = `rgb(${rColor},${gColor},${bColor})`;
    todoInput.value = "";
    closeModal();
    todocontainer.addEventListener("dragstart", function (event) {
      event.dataTransfer.setData("todo", event.target.id);
    });
  }
}

statusTodo.forEach(function (status) {
  status.addEventListener("drop", function (event) {
    let itemId = event.dataTransfer.getData("todo");
    let itemElem = $.getElementById(itemId);
    status.append(itemElem);
  });

  status.addEventListener("dragenter", function (event) {
    status.style.border = "1px solid gray";
  });

  status.addEventListener("dragover", function (event) {
    event.preventDefault();
    status.style.border = "1px solid gray";
  });
  status.addEventListener("dragleave", function (event) {
    status.style.border = "none";
  });

  status.addEventListener("dragend", function (event) {
    status.style.border = "none";
  });
});

addBtn.addEventListener("click", showModal);
btnCloseModal.addEventListener("click", closeModal);
todoSubmit.addEventListener("click", addTodo);

