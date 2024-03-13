/**
 * Initializes the sign-up related functionalities by loading users and contacts.
 * @returns {Promise<void>} A promise that resolves when the initialization is complete.
 */
async function signupInit() {
  await loadUsers();
  await loadContacts();
}

let acceptChecked = false;

/**
 * Registers a new user with the provided name, email, and password.
 * Generates a unique user ID, initials, and a random color for the user.
 * Checks if the privacy policy is accepted before allowing registration.
 * Saves the new user to the users and contacts arrays and redirects to "index.html".
 * @returns {void}
 */
async function registerUser() {
  let name = document.getElementById("signup-input-name").value;
  let email = document.getElementById("signup-input-email").value;
  let password = document.getElementById("input-password2").value;
  let userId = generateUserId();
  let initials = generateUserInitials(name);
  let i = Math.floor(Math.random() * allColors.length);
  let color = allColors[i];

  await loadContacts();
  await loadUsers();
  if (!acceptChecked) {
    document.getElementById("errorbox").innerHTML =
      "Please accept our Privacy Policy to sign up!";
    return;
  } else {
    signupbutton.disabled = true;
    users.push({
      id: userId,
      name: name,
      email: email,
      password: password,
      initials: initials,
      color: color,
    });
    contacts.push({
      id: userId,
      name: name,
      email: email,
      initials: initials,
      phone: "",
      color: color,
    });

    await setItem("users", JSON.stringify(users));
    await setItem("contacts", JSON.stringify(contacts));
    signupbutton.disabled = false;
    window.location.href = "index.html";
  }
}

/**
 * Generates initials for a user based on their name.
 * Takes the first character of each word in the name and capitalizes it.
 * @param {string} name - The name of the user.
 * @returns {string} The generated initials.
 */
function generateUserInitials(name) {
  return name
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase())
    .join("");
}

/**
 * Generates a unique user ID based on the current timestamp.
 * @returns {number} The generated user ID.
 */
function generateUserId() {
  return Date.now();
}

/**
 * Checks if the entered password matches the confirmed password.
 * Displays an error message if the passwords do not match.
 * @returns {void}
 */
function checkPasswordMatch() {
  let password = document.getElementById("input-password2").value;
  let confirmPassword = document.getElementById("input-password3").value;
  let confirmPwdInput = document.getElementById("errorbox");

  if (password !== confirmPassword) {
    confirmPwdInput.innerHTML = "Die Passwörter stimmen nicht überein!";
  } else {
    confirmPwdInput.innerHTML = "";
  }
}

/**
 * Toggles the state of the privacy policy acceptance button.
 * @returns {void}
 */
function togglePrivacyButton() {
  acceptChecked = !acceptChecked;
}
