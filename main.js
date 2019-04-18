var api = "5395665618e8d3629bbba9fd20c4de1c8c9b2f75d3920055fafab922fdf16f6d";


var getToDos = new XMLHttpRequest();
getToDos.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    var newVar = JSON.parse(this.responseText);
    console.log(newVar);
    for (var i = 0; i < newVar.length ; ++i) {
      render(newVar[i]);
    }
  } else if (this.readyState == 4) {
    console.log(this.responseText);
  }
}
getToDos.open("GET", "https://api.kraigh.net/todos/", true);
getToDos.setRequestHeader("x-api-key", api);
getToDos.send();


document.getElementById("todoform").addEventListener("submit", function(event){
  event.preventDefault();
  console.log(newItems.value);
  var textInput = {
    text: newItems.value
  }
  var newAsk = new XMLHttpRequest();
  newAsk.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var todo = JSON.parse(this.responseText);
      render(todo);
    } else if (this.readyState == 4) {
      console.log(this.responseText);
    }
  };
  newAsk.open("POST", "https://api.kraigh.net/todos/", true);
  newAsk.setRequestHeader("Content-type", "application/json");
  newAsk.setRequestHeader("x-api-key", api);
  newAsk.send(JSON.stringify(textInput));
});


function render(todoText) {
  var newToDo = document.createElement("DIV");
  newToDo.setAttribute("id", todoText.id);
  newToDo.classList.add("todo");
  if (todoText.completed == true) {
    newToDo.classList.add("finished")
  }

  var cButton = document.createElement("BUTTON");
  cButton.classList.add("check");
  cButton.innerHTML = "Check";
  newToDo.appendChild(cButton);

  var todoparagraph = document.createElement("P");
  todoparagraph.classList.add("todop");
  todoparagraph.innerHTML = todoText.text;
  newToDo.appendChild(todoparagraph);

  var dButton = document.createElement("BUTTON");
  dButton.classList.add("delete");
  dButton.innerHTML = "Delete";
  newToDo.appendChild(dButton);

  document.getElementById("maintodo").appendChild(newToDo);
  document.getElementById('newItems').value = '';
  cButton.addEventListener("click", finishT);
  dButton.addEventListener("click", deleteT)
}


function finishT(event) {
  var cButtonPress = event.target.parentNode.id;
  var cButtonWasPressed = {
    completed: true
  };
  var checkThisToDo = new XMLHttpRequest();
  checkThisToDo.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      event.target.parentNode.classList.add("finished");
    } else if (this.readyState == 4) {
      console.log(this.responseText);
    }
  }
  checkThisToDo.open("PUT", "https://api.kraigh.net/todos/" + cButtonPress, true);
  checkThisToDo.setRequestHeader("Content-type", "application/json");
  checkThisToDo.setRequestHeader("x-api-key", api);
  checkThisToDo.send(JSON.stringify(cButtonWasPressed));
}


function deleteT(event) {
  var dButtonPress = event.target.parentNode.id;
  var deleteThisToDo = new XMLHttpRequest();
  deleteThisToDo.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      console.log(this.responseText)
      event.target.parentNode.remove();
    } else if (this.readyState == 4) {
      console.log(this.responseText);
    }
  }
  deleteThisToDo.open("DELETE", "https://api.kraigh.net/todos/" + dButtonPress, true);
  deleteThisToDo.setRequestHeader("Content-type", "application/json");
  deleteThisToDo.setRequestHeader("x-api-key", api);
  deleteThisToDo.send();
}

