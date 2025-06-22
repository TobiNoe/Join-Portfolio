let clickedContact;
let contactListClicked = 0;

/**
 * Initializes the contact-related functionalities.
 * This function includes HTML, loads users, tasks, and current user,
 * loads initials, and renders the contacts.
 * @returns {void}
 */
async function contactInit() {
  await includeHTML();
  await loadTasks();
  loadCurrentUser();
  loadInitials();
  renderContacts();
}

/**
 * Renders the contact list in alphabetical order with a header for each letter.
 * @returns {void}
 */
async function renderContacts() {
  let contactlist = document.getElementById("contact-list");
  let sortedContacts = [];
  contactlist.innerHTML = "";
  await loadContacts();
  sortedContacts = contacts.slice();
  sortedContacts.sort((a, b) => a.name.localeCompare(b.name));
  let currentLetter = null;

  for (let i = 0; i < sortedContacts.length; i++) {
    let you = "";
    const contact = sortedContacts[i];
    const firstLetter = contact.name.charAt(0).toUpperCase();

    if (currentUser.email === contact.email) {
      you = "(You)";
    }

    if (firstLetter !== currentLetter) {
      currentLetter = firstLetter;
      contactlist.innerHTML += `<h2>${firstLetter}</h2>`;
      contactlist.innerHTML += `<div class="contact-list-spacer">&nbsp;</div>`;
    }

    contactlist.innerHTML += await renderContactsHTML(contact, you);
  }
}

/**
 * Shows the details of a clicked contact.
 * @param {number} contactId - The ID of the contact to be displayed.
 * @returns {void}
 */
async function showContact(contactId) {
  await loadContacts();
  clickedContact = contactId;
  let bigContactCard = document.getElementById("big-contact-card");
  const contact = contacts.find((c) => c.id === contactId);
  bigContactCard.innerHTML = "";
  // bigContactCard.innerHTML = showContactHTML(); Zum Beispiel
  bigContactCard.innerHTML = await showContactHTML(contact);

  // Reset background color and text color for all contact cards
  if (contactListClicked > 0) {
    for (let j = 0; j < contacts.length; j++) {
      const contactCard = document.getElementById(
        `contact-card-${contacts[j].id}`
      );
      if (contactCard) {
        contactCard.classList.remove("selected-contact");
        contactCard.style.color = "#000000";
      }
    }
  }
  contactListClicked++;
  // Change background color and text color for the selected contact card
  document
    .getElementById(`contact-card-${contact.id}`)
    .classList.add("selected-contact");
  document.getElementById(`contact-card-${contact.id}`).style.color = "#FFFFFF";

  // Adjusting styles for mobile view
  if (document.documentElement.clientWidth < 850) {
    document.getElementById("contact-container-right").style.display = "flex";
    document.getElementById("contact-container-left").style.display = "none";
    bigContactCard.innerHTML += `
      <img class="contact-back-button-mobile" 
        src="img/contact/arrow-left-line.svg"
        onclick="closeMobileBigContact()"
      >`;
  }
}

/**
 * Deletes a contact based on the provided contact ID.
 * Displays an alert if the contact is a user or assigned to a task.
 * @param {number} contactId - The ID of the contact to be deleted.
 * @returns {void}
 */
async function deleteContact(contactId) {
  const contactToDelete = contacts.find((c) => c.id === contactId);

  // Check if the contact is a user
  /*  const isUser = users.some((user) => user.id === contactToDelete.id);
 
   if (isUser) {
     alert("Cannot delete contact as it is a user.");
     return;
   } */
  if (contactToDelete.is_user === true) {
    alert("Cannot delete contact as it is a user.");
    return;
  }

  // Check if the contact is assigned to a Task
  const isContactAssignedToTask = tasks.some((task) => {
    return task.assignedTo.includes(contactToDelete.id);
  });

  if (isContactAssignedToTask) {
    alert("Cannot delete contact as it is assigned to a task.");
    return;
  }

  // Update the contacts in storage
  await deleteItem("contacts", contactId);

  // Clear and close the bigContactCard
  const bigContactCard = document.getElementById("big-contact-card");
  bigContactCard.innerHTML = "";
  closeEditContact();

  // If on mobile, redirect to contact.html
  if (document.documentElement.clientWidth < 850) {
    window.location.href = "contact.html";
  }

  // Re-render the contact list
  renderContacts();
}

/**
 * Opens the contact editing form, populating it with the details of the selected contact.
 * @param {number} contactId - The ID of the contact to be edited.
 * @returns {void}
 */
async function openEditContact(contactId) {
  await loadContacts();

  // Find the contact to edit
  const contact = contacts.find((c) => c.id === contactId);
  document.getElementById("edit-contact-circle").innerHTML = `
  <div class="edit-circle" style="background-color: ${contact.color};">${contact.initials}</div>`;

  // Populate the edit form with contact information
  document.getElementById("contact-edit-name").value = contact.name;
  document.getElementById("contact-edit-email").value = contact.email;
  document.getElementById("contact-edit-phone").value = contact.phone;

  // Show the edit contact form
  const editContactCard = document.getElementById("edit-contact-card");
  const editContactForm = document.getElementById("edit-contact-form");
  const editContactFilter = document.getElementById("edit-contact-filter");

  editContactCard.classList.add("contact-transform-in");
  editContactCard.classList.remove("contact-transform-out");
  editContactFilter.classList.remove("contact-d-none");
  editContactCard.classList.remove("contact-d-none");

  closeMobileOptions();
}

/**
 * Closes the contact editing form and triggers a contact list re-render.
 * @returns {void}
 */
function closeEditContact() {
  const editContactCard = document.getElementById("edit-contact-card");
  const editContactFilter = document.getElementById("edit-contact-filter");

  editContactCard.classList.add("contact-transform");

  setTimeout(function () {
    editContactFilter.classList.add("contact-d-none");
    editContactCard.classList.add("contact-d-none");
  }, 500);
}

/**
 * Edits the contact details based on the provided contact ID and updated information.
 * @param {number} contactId - The ID of the contact to be edited.
 * @returns {void}
 */
async function editContact() {
  // Load contacts and get input values
  const contact = contacts.find((c) => c.id === clickedContact);

  const nameInput = document.getElementById("contact-edit-name");
  const emailInput = document.getElementById("contact-edit-email");
  const phoneInput = document.getElementById("contact-edit-phone");

  // Generate initials for the user
  const newName = nameInput.value;
  const newInitials = generateUserInitials(newName);

  let Contact = {
    name: nameInput.value,
    email: emailInput.value,
    phone: parseInt(phoneInput.value),
    color: contact.color,
    initials: newInitials
  };

  // Save the updated contacts to storage
  await editItem("contacts", contact.id, Contact);
  closeEditContact();
  await renderContacts();
  showContact(clickedContact);
}

/**
 * Opens the form for adding a new contact.
 * @returns {void}
 */
async function openAddContact() {
  document
    .getElementById("add-contact-card")
    .classList.add("contact-transform-in");
  document
    .getElementById("add-contact-card")
    .classList.remove("contact-transform-out");
  document
    .getElementById("add-contact-filter")
    .classList.remove("contact-d-none");
  document
    .getElementById("add-contact-card")
    .classList.remove("contact-d-none");
  //await loadUsers();
  await loadContacts();
}

/**
 * Clears the contact input form fields.
 */
function clearContactForm() {
  document.getElementById("contact-input-name").value = "";
  document.getElementById("contact-input-email").value = "";
  document.getElementById("contact-input-phone").value = "";
}

/**
 * Closes the form for adding a new contact.
 * @returns {void}
 */
function closeAddContact() {
  clearContactForm()
  document
    .getElementById("add-contact-card")
    .classList.remove("contact-transform-in");
  document
    .getElementById("add-contact-card")
    .classList.add("contact-transform-out");
  setTimeout(function () {
    document
      .getElementById("add-contact-filter")
      .classList.add("contact-d-none");
    document.getElementById("add-contact-card").classList.add("contact-d-none");
  }, 500);
}

/**
 * Adds a new contact to the contact list.
 * @returns {void}
 */
async function addContact() {
  let name = document.getElementById("contact-input-name").value;
  let email = document.getElementById("contact-input-email").value;
  let phone = document.getElementById("contact-input-phone").value;
  let i = Math.floor(Math.random() * allColors.length);
  let color = allColors[i];
  let initials = generateUserInitials(name);

  const emailExists = contacts.some(contact => contact.email.toLowerCase() === email.toLowerCase());
  if (emailExists) {
    alert("Ein Kontakt mit dieser E-Mail-Adresse existiert bereits.");
    return;
  }

  let newContact = {
    name: name,
    email: email,
    phone: parseInt(phone), // Sicherstellen, dass phone als Zahl gesendet wird
    color: color,
    initials: initials
  };

  await postItem("contacts", newContact);
  await loadContacts();
  closeAddContact();
  renderContacts();
}

/**
 * Closes the expanded view of a contact on mobile devices.
 * @returns {void}
 */
function closeMobileBigContact() {
  document.getElementById("contact-container-right").style.display = "none";
  document.getElementById("contact-container-left").style.display = "flex";
  renderContacts();
}

let optionsOpened = false;

/**
 * Toggles the visibility of the mobile options menu.
 * @returns {void}
 */
function openMobileOptions() {
  optionsOpened = true;
  document.getElementById("mobile-contact-bubble").style.right = "15px";
}

/**
 * Closes the mobile options menu.
 * @returns {void}
 */
function closeMobileOptions() {
  optionsOpened = false;
  document.getElementById("mobile-contact-bubble").style.right = "-200px";
}

/**
 * Handles clicks on the mobile options menu, closing it if clicked outside the button.
 * @param {Event} event - The click event.
 * @returns {void}
 */
function handleMobileOptions(event) {
  const screenWidth = document.documentElement.clientWidth;

  if (screenWidth < 850) {
    const mobileOptionsButton = document.getElementById(
      "mobile-options-button"
    );
    const isMobileOptionsButton =
      mobileOptionsButton && mobileOptionsButton.contains(event.target);

    if (optionsOpened && !isMobileOptionsButton) {
      closeMobileOptions();
    }
  }
}

document.addEventListener("DOMContentLoaded", function () {
  document.addEventListener("click", handleMobileOptions);
});
