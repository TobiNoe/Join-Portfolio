/**
 * if link in menu is aktive the background color changed
 */
function changeMenuLinkBgColor() {
  let currentPage = window.location.pathname;
  let links = document.querySelectorAll(".nav-menu a");
  links.forEach((link) => {
    if (link.href.includes(`${currentPage}`)) {
      link.classList.add("active-menu-link");
    }
  });
}
