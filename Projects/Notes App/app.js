let notes = JSON.parse(localStorage.getItem("notes")) || [];

function saveNotes() {
  localStorage.setItem("notes", JSON.stringify(notes));
  renderNotes();
}

function addNote() {
  const title = document.getElementById("note-title").value.trim();
  const body = document.getElementById("note-body").value.trim();
  if (!body) return alert("Note cannot be empty!");

  const newNote = {
    id: Date.now(),
    title: title || "Untitled",
    body,
    updated: new Date().toLocaleString(),
  };

  notes.unshift(newNote);
  saveNotes();
  document.getElementById("note-title").value = "";
  document.getElementById("note-body").value = "";
}

function deleteNote(id) {
  if (!confirm("Delete this note?")) return;
  notes = notes.filter(note => note.id !== id);
  saveNotes();
}

function editNote(id) {
  const note = notes.find(n => n.id === id);
  const newTitle = prompt("Edit Title:", note.title);
  const newBody = prompt("Edit Note:", note.body);
  if (newBody !== null) {
    note.title = newTitle || "Untitled";
    note.body = newBody;
    note.updated = new Date().toLocaleString();
    saveNotes();
  }
}

function renderNotes() {
  const container = document.getElementById("notes");
  container.innerHTML = "";
  notes.forEach(note => {
    container.innerHTML += `
      <div class="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition transform hover:scale-[1.01]">
        <div class="flex justify-between items-center mb-2">
          <h2 class="text-lg font-semibold text-purple-700">${note.title}</h2>
          <div class="space-x-2">
            <button onclick="editNote(${note.id})" class="text-blue-500 hover:underline">Edit</button>
            <button onclick="deleteNote(${note.id})" class="text-red-500 hover:underline">Delete</button>
          </div>
        </div>
        <p class="text-gray-800 whitespace-pre-line">${note.body}</p>
        <p class="text-sm text-gray-400 mt-2">Last updated: ${note.updated}</p>
      </div>
    `;
  });
}

renderNotes();
