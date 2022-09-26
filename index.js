var saveNotes = [];
var note_id = 0;
var editing = false;

if (!editing) {
    document.querySelector("#save-btn").firstChild.innerText = "save";
} else {
}
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

function removeEle(ele) {
    return saveNotes.filter(function (e) {
        console.log(e.note_id, ele[ele.length - 1]);
        return e.note_id !== parseInt(ele[ele.length - 1]);
    });
}

// add new
function addNew() {
    document.querySelector("#title_input").readOnly = false;
    document.querySelector("#save-btn").childNodes[1].innerText = "save";
    document.querySelector("#title_input").value = "";
    document.querySelector("#note_input").innerHTML = "Write Here";
}

// update

function save() {
    document.querySelector("#title_input").readOnly = false;
    document.querySelector("#save-btn").childNodes[1].innerText = "save";
    var title_in = document.querySelector("#title_input").value;
    var note_in = document.querySelector("#note_input").innerHTML.trim();
    _save(title_in, note_in);
}
// save
function _save(title_in, note_in) {
    saveNotes.push({
        note_id,
        title_in,
        note_in,
    });

    // new list item
    if (title_in != "") {
        document.querySelector("#title_input").value = "";
        document.querySelector("#note_input").innerHTML = "Write Here";
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
            var newLiClassName = newLI.className.split(" ");
            saveNotes = removeEle(newLiClassName);
            console.log(saveNotes);
        };
        var newBtnEdit = document.createElement("button");
        newBtnEdit.className = "cub-btn";
        newBtnEdit.style.padding = "0 0.2rem";
        newBtnEdit.onclick = function () {
            document.querySelector("#title_input").readOnly = false;
            var notesStore = document.getElementById("note-list-ul");
            notesStore.removeChild(newLI);
            var newLiClassName = newLI.className.split(" ");
            saveNotes = removeEle(newLiClassName);
            document.querySelector("#save-btn").childNodes[1].innerText =
                "edit";
            document.querySelector("#save-btn").onclick = save;
            document.querySelector("#title_input").value = title_in;
            document.querySelector("#note_input").innerHTML = note_in;
        };
        var newBtnView = document.createElement("button");
        newBtnView.className = "cub-btn";
        newBtnView.onclick = function () {
            document.querySelector("#title_input").value = title_in;
            document.querySelector("#title_input").readOnly = true;
            document.querySelector("#note_input").innerHTML = note_in;
            document.querySelector("#note_input").style.display =
                "inline-block";
        };
        var newSpanView = document.createElement("span");
        newSpanView.className = "material-symbols-outlined";
        newSpanView.innerText = "visibility";
        newSpanView.style.fontSize = "1.2rem";
        newSpanView.style.color = "#264653";

        // button symble
        var newSpanDel = document.createElement("span");
        newSpanDel.className = "material-symbols-outlined";
        newSpanDel.innerText = "delete";
        newSpanDel.style.fontSize = "1.2rem";
        newSpanDel.style.color = "#e63946";
        // newSpanDel.style.fontWeight = "bold";

        var newSpanEdit = document.createElement("span");
        newSpanEdit.className = "material-symbols-outlined";
        newSpanEdit.innerText = "edit";
        newSpanEdit.style.fontSize = "1.2rem";
        newSpanEdit.style.color = "#a8dadc";
        // newSpanEdit.style.fontWeight = "bold";

        newBtnView.appendChild(newSpanView);
        newBtnDel.appendChild(newSpanDel);
        newBtnEdit.appendChild(newSpanEdit);

        newBtns.appendChild(newBtnDel);
        newBtns.appendChild(newBtnEdit);
        newBtns.appendChild(newBtnView);

        newLI.appendChild(newBtns);

        var noteList = document.querySelector("#note-list-ul");
        noteList.appendChild(newLI);
    } else {
        window.alert("Title can not be empty.");
    }
}
