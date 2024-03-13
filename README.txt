Function name: in camelCase / example -  boardFunctionName() or summaryFunctionName() etc...

const name: in CapitalCase / example - const STORAGE_TOKEN etc...

Global variable: in camelCase / example -  boardVariableName or summaryVariableName etc...

ID name: in snake_case / example - board_id_name or summary_idname etc...

Class name: in kebab-case / example - board-class-name or summary-class-name etc...

__


example to load other html-files into a div: '<div w3-include-html="header.html"></div>'

__

images in svg  or png if this version is smaller

--

  <body onload="init()">
    <div class="main-container">
      <div w3-include-html="./templates/desktop/nav_desktop.html"></div>
      <div class="index-body">
        <div w3-include-html="./templates/desktop/header_desktop.html"></div>
        <div>
          Inhalt
        </div>
      </div>
    </div>
  </body>