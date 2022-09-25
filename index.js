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
