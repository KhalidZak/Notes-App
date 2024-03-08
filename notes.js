console.log("connected");
const addBtn = document.querySelector(".add");

const notes = JSON.parse(localStorage.getItem("notes"));

if (notes) {
  notes.forEach((note) => {
    addNewNote(note);
  });
}

addBtn.addEventListener("click", () => {
  addNewNote();
});

function addNewNote(note = "") {
  const notes = document.createElement("div");
  notes.classList.add("note");
  notes.innerHTML = `
<div class="tools">
    <button class="edit"><i class="fas fa-edit"></i></button>
    <button class="delete"><i class="fas fa-trash-alt"></i></button>
</div>
<div class="main ${note ? "" : "hidden"}"></div>
<textarea class="${note ? "hidden" : ""}"></textarea>
`;
  const editBtn = notes.querySelector(".edit");
  const mainEl = notes.querySelector(".main");
  //same for mainEl
  mainEl.value = note;
  //or mainEl.innerHTML=marked(note);
  const textArea = notes.querySelector("textarea");
  //we had to put mainEl after text

  //so we stopped working with just textarea and work with texarea value
  //which has gone through local storage
  textArea.value = note;
  const deleteBtn = notes.querySelector(".delete");

  editBtn.addEventListener("click", () => {
    mainEl.classList.toggle("hidden");
    textArea.classList.toggle("hidden");
  });
  md = window.markdownit();
  textArea.addEventListener("input", (e) => {
    const { value } = e.target;
    mainEl.innerHTML = md.render(value);
    updateLS();
  });

  deleteBtn.addEventListener("click", () => {
    notes.remove();
    updateLS();
  });

  document.body.appendChild(notes);
}

function updateLS() {
  const notesText = document.querySelectorAll("textarea");

  const notes = [];

  notesText.forEach((note) => {
    notes.push(note.value);
  });

  localStorage.setItem("notes", JSON.stringify(notes));
}
