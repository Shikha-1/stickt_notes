showNotes();

let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", (e) => {
  e.preventDefault()
  addNotes()
});

//function to check notes from localStorage
function findNotes() {
   let notes = localStorage.getItem("notes");
   if (notes == null) {
     notesObj = [];
   } else {
     notesObj = JSON.parse(notes);
   }
}

// If user adds a note, add it to the localStorage
function addNotes() {
  let addTxt = document.getElementById("textArea");
  let addTitle = document.getElementById("inputTitle");
  findNotes();
  let myObj = {
    title: addTitle.value,
    text: addTxt.value
  }
  if (myObj.text.length >= 3) {
    notesObj.push(myObj);
    alertMszSuccess();
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addTxt.value = "";
    addTitle.value = "";
    showNotes();
  } else {
    alertMszFailure();
  }
};
//function to display alert
function alertMszSuccess() {
    document.getElementById("success").innerHTML = `<div class="alert alert-success alert-dismissible fade show" role="alert">
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
        <span class="sr-only">Close</span>
        </button>
        <strong>Congrats!</strong> Your note has been added.
        </div>`
  setTimeout(() => {
      document.getElementById(
        "success"
      ).innerHTML = ""
    }, 2000);
}
  function alertMszFailure() {
      document.getElementById(
        "success"
      ).innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
        <span class="sr-only">Close</span>
        </button>
        <strong>Sorry!</strong> Description too short. Your note can't be added.
        </div>`;
    setTimeout(() => {
      document.getElementById(
        "success"
      ).innerHTML = ""
    }, 2000);
  }

  // Function to show elements from localStorage
function showNotes() {
  findNotes()
  let html = "";
  notesObj.forEach((element, index) => {
    if (element.text.length >= 3) {
      html += `
            <div class="noteCard my-2 mx-4 card" style="width: 20rem;">
                    <div class="card-body">
                        <h5 class="card-title">${index + 1}. ${element.title}</h5>
                        <p class="card-text">${element.text}</p>
                        
                        <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
                    </div>
                </div>`;
    }
  })
  let notesElm = document.getElementById("notes");
  if (notesObj.length != 0) {
    notesElm.innerHTML = html;
  } else {
    notesElm.innerHTML = `<p class="mx-4" style="font-size: large";>Nothing to show! Use above section to add a note.</p>`;
  }
}
  // Function to delete a note
  function deleteNote(index) {
    findNotes()
    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
  }

  // Function to search for some text in a note
function search() {
  let inputVal = searchTxt.value.toLowerCase();
  let noteCards = document.getElementsByClassName("noteCard");
  Array.from(noteCards).forEach((element) => {
    let cardTxt = element.getElementsByTagName("p")[0].innerText;
    if (cardTxt.includes(inputVal)) {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
  });
}
let searchTxt = document.getElementById('searchTxt');
let searchBtn = document.getElementById("searchBtn");
searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  search()
})
searchTxt.addEventListener("input", () => search())