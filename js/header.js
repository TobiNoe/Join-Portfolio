/**
 * shows user innitials in header
 */
function loadInitials() {
  document.getElementById("header_initials").innerHTML =
    currentUser["initials"];
}

/**
 * pen context menu in header
 */
function openContextMenuHeader() {
  document.getElementById("context_menu_header").classList.toggle("d-none");
}
