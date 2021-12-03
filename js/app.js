//selecting elements
const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");

//classes names
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

let LIST, id;

//get item from localstrorage
let data = localStorage.getItem("TODO");

//check if data is not empty
if (data) {
  LIST = JSON.parse(data);
  id = LIST.length;
  loadList(LIST);
} else {
  //if data is empty
  LIST = [];
  id = 0;
}

//load items to the user's interface
function loadList(array) {
  list.innerHTML = "";
  array.forEach(function (item) {
    addToDo(item.name, item.id, item.done, item.trash);
  });
}

//clear the local storage
clear.addEventListener("click", function () {
  localStorage.clear();
  location.reload();
});

//show todays date
const options = { weekday: "long", month: "short", day: "numeric" };
const today = new Date();

dateElement.innerHTML = today.toLocaleDateString("en-US", options);

//add to do function

function addToDo(todo, id, done, trash) {
  if (trash) {
    return;
  }
  const DONE = done ? CHECK : UNCHECK;
  const isPrime = done ? "afterbegin" : "beforeend";
  const LINE = done ? LINE_THROUGH : "";
  const item = `
  <li class="item  ">
  <i class="fa ${DONE} co" job="complete" id="${id}"></i>
    <p class="text ${LINE} ">${todo}</p>
    <i class="fa fa-trash-o de" job="delete" id="${id}"></i> `;
  list.insertAdjacentHTML(isPrime, item);
}

//add an ietm to the list when user hit the enter key
document.addEventListener("keyup", function (e) {
  if (e.keyCode == 13) {
    const todo = input.value;

    //if the input isn't empty
    if (todo) {
      addToDo(todo, id, false, false);

      LIST.push({
        name: todo,
        id: id,
        done: false,
        trash: false,
      });
      //add item to localstorage(this code must be added where the LIST array is updated)
      localStorage.setItem("TODO", JSON.stringify(LIST));
      id++;
    }
    input.value = ""; //clear after inserting
  }
});

//complete to do -making green button and through line to text or remove
function completeToDo(element) {
  element.classList.toggle(CHECK);
  element.classList.toggle(UNCHECK);
  element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

  LIST[element.id].done = LIST[element.id].done ? false : true;

  loadList(LIST);
}

//remove to do
function removeToDo(element) {
  element.parentNode.parentNode.removeChild(element.parentNode);
  LIST[element.id].trash = true;
}

//target the items created dynamically
list.addEventListener("click", function (e) {
  const element = e.target;

  const elementJob = element.attributes.job.value;
  if (elementJob == "complete") {
    completeToDo(element);
  } else if (elementJob == "delete") removeToDo(element);

  //add item to localstorage(this code must be added where the LIST array is updated)
  localStorage.setItem("TODO", JSON.stringify(LIST));
});
