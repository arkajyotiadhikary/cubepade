var saveNotes = [];
var note_id = 0;
function changeStyle(style) {
    var sel = window.getSelection(); // Gets selection
    if (sel.rangeCount) {
        // Creates a new element, and insert the selected text with the chosen style
        var span_el = document.createElement("span");
        span_el.classList.add(style.value);
        span_el.innerHTML = sel.toString(); // Selected text

        // https://developer.mozilla.org/en-US/docs/Web/API/Selection/getRangeAt
        var range = sel.getRangeAt(0);
        range.deleteContents(); // Deletes selected text…
        range.insertNode(span_el); // … and inserts the new element at its place
    }
}
// function remove(item) {
//     var notes = document.querySelectorAll(
//         ".d-flex justify-content-between note-item"
//     );
//     console.log(notes);
// }
function save() {
    var title_in = document.querySelector("#title_input").value;
    var note_in = document.querySelector("#note_input").innerHTML.trim();
    saveNotes.push({
        title_in,
        note_in,
    });

    // new list item
    if (title_in != "") {
        document.querySelector("#title_input").value = "";

        var newLI = document.createElement("li");
        newLI.className =
            "note-item d-flex justify-content-between " + note_id.toString();
        note_id += 1;
        // list title
        var newP = document.createElement("p");
        newP.innerText = title_in;
        newLI.appendChild(newP);
        // list delete button
        var newBtns = document.createElement("div");
        newBtns.className = "d-flex justify-content-center";

        var newBtnDel = document.createElement("button");
        newBtnDel.className = "cub-btn";
        newBtnDel.onclick = function () {
            window.alert("Sure you wnat to delete this?");
            var notesStore = document.getElementById("note-list-ul");
            notesStore.removeChild(newLI);
            console.log(notesStore);
        };
        var newBtnEdit = document.createElement("button");
        newBtnEdit.className = "cub-btn";
        newBtnEdit.onclick = function () {
            document.querySelector("#title_input").value = title_in;
            document.querySelector("#note_input").innerHTML = note_in;
        };
        // button symble
        var newSpanDel = document.createElement("span");
        newSpanDel.className = "material-symbols-outlined";
        newSpanDel.innerText = "delete";
        newSpanDel.style.fontSize = "1.5rem";
        newSpanDel.style.color = "#e63946";
        // newSpanDel.style.fontWeight = "bold";

        var newSpanEdit = document.createElement("span");
        newSpanEdit.className = "material-symbols-outlined";
        newSpanEdit.innerText = "edit";
        newSpanEdit.style.fontSize = "1.5rem";
        newSpanEdit.style.color = "#a8dadc";
        // newSpanEdit.style.fontWeight = "bold";

        newBtnDel.appendChild(newSpanDel);
        newBtnEdit.appendChild(newSpanEdit);

        newBtns.appendChild(newBtnDel);
        newBtns.appendChild(newBtnEdit);

        newLI.appendChild(newBtns);

        var noteList = document.querySelector("#note-list-ul");
        noteList.appendChild(newLI);
    } else {
        window.alert("Title can not be empty.");
    }
}
