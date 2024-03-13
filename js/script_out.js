/**
 * insert HTML code
 */
async function includeHTML() {
  let includeElements = document.querySelectorAll("[w3-include-html]");
  for (let i = 0; i < includeElements.length; i++) {
    const element = includeElements[i];
    let file = element.getAttribute("w3-include-html");
    try {
      let resp = await fetch(file);
      if (resp.ok) {
        let htmlContent = await resp.text();
        element.innerHTML = htmlContent;
      } else {
        element.innerHTML = "Page not found.";
      }
    } catch (error) {
      console.error("Error fetching or parsing the HTML:", error);
      element.innerHTML = "Error loading the page.";
    }
  }
}
