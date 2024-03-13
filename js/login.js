/**
 * Initializes the login-related functionalities by loading users and contacts.
 * @returns {Promise<void>} A promise that resolves when the initialization is complete.
 */
async function loginInit() {
  await loadUsers();
  await loadContacts();
}

/**
 * Attempts to log in the user using the provided email and password.
 * Displays error messages for incorrect credentials.
 * Redirects to "summary.html" upon successful login.
 * @returns {void}
 */
function login() {
  const email = document.getElementById("login-input-email").value;
  const password = document.getElementById("input-password1").value;
  let user = users.find((u) => u.email == email && u.password == password);
  if (user) {
    currentUser = {
      email: user.email,
      userId: user.id,
      name: user.name,
      initials: user.initials,
    };
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
    window.location.href = "summary.html";
  } else {
    let usernameExists = users.some((u) => u.email == email);
    let passwordCorrect = users.some(
      (u) => u.email == email && u.password == password
    );

    if (!usernameExists) {
      document.getElementById("errorbox").innerHTML =
        "Wrong username. Please try again.";
    } else if (usernameExists && !passwordCorrect) {
      document.getElementById("errorbox").innerHTML =
        "Wrong password. Please try again.";
    }
  }
}

/**
 * Initiates a guest login, setting the current user to a guest user.
 * Redirects to "summary.html" after the guest login.
 * @returns {void}
 */
function guestLogin() {
  currentUser = {
    email: "Guest",
    userId: "Guest",
    name: "Guest",
    initials: "G",
  };
  //console.log(currentUser);
  localStorage.setItem("currentUser", JSON.stringify(currentUser));
  window.location.href = "summary.html";
}

/**
 * Toggles the visibility of the password input in the login form.
 * @param {number} i - The index of the password input (used for multiple password inputs).
 * @returns {void}
 */
function togglePasswordVisibility(i) {
  const passwordInput = document.getElementById(`input-password${i}`);
  const visibilityToggle = document.getElementById(
    `password-visibility-toggle${i}`
  );
  passwordInput.type = passwordInput.type === "password" ? "text" : "password";
  visibilityToggle.style.backgroundImage =
    passwordInput.type === "password"
      ? "url(/img/login/visibility_off.svg)"
      : "url(/img/login/visibility.svg)";
}

/**
 * Initiates the animation sequence on page load.
 * Determines whether to start the desktop or mobile animation based on viewport width.
 * @returns {void}
 */
function startAnimation() {
  // Check if the viewport width is under 550px
  if (window.innerWidth <= 550) {
    //console.log("Mobile animation triggered");
    startAnimationMobile();
    return;
  }

  //console.log("Desktop animation triggered");
  let logo = document.getElementById("logo");
  let initialTop = window.innerHeight / 2 - logo.clientHeight / 2;
  let initialLeft = window.innerWidth / 2 - logo.clientWidth / 2;

  // Set initial position at the center of the screen
  logo.style.top = initialTop + "px";
  logo.style.left = initialLeft + "px";

  // Get the background fade element
  let backgroundFade = document.querySelector(".background-fade");

  // Use requestAnimationFrame for smoother animations
  function animateLogo(timestamp) {
    // Calculate progress based on time (2 seconds duration)
    let progress = (timestamp - startTime) / 2000;

    // Ease-out animation formula for smoother motion
    let easeOutProgress = 1 - Math.pow(1 - progress, 3);

    // Calculate new position
    let targetTop = 80;
    let targetLeft = 77;

    let newTop = initialTop + (targetTop - initialTop) * easeOutProgress;
    let newLeft = initialLeft + (targetLeft - initialLeft) * easeOutProgress;

    // Apply new position
    logo.style.top = newTop + "px";
    logo.style.left = newLeft + "px";

    // Fade background during animation
    let backgroundOpacity = 1 - easeOutProgress;
    backgroundFade.style.backgroundColor = `rgba(255, 255, 255, ${backgroundOpacity})`;

    // Continue animation until progress reaches 1
    if (progress < 1) {
      requestAnimationFrame(animateLogo);
    }
  }

  // Record the start time of the animation
  let startTime = null;

  // Trigger the animation
  function startAnimation() {
    startTime = performance.now();
    requestAnimationFrame(animateLogo);
  }

  // Start the animation after a short delay (adjust as needed)
  setTimeout(startAnimation, 500);
}

/**
 * Initiates the mobile-specific animation sequence on page load.
 * @returns {void}
 */
function startAnimationMobile() {
  let logo = document.getElementById("logo");
  let initialTop = window.innerHeight / 2 - logo.clientHeight / 2;
  let initialLeft = window.innerWidth / 2 - logo.clientWidth / 2;

  // Set initial position at the center of the screen
  logo.style.top = initialTop + "px";
  logo.style.left = initialLeft + "px";

  // Get the background fade element
  let backgroundFade = document.querySelector(".background-fade");

  // Set background color to dark initially for mobile version
  backgroundFade.style.backgroundColor = "#2A3647";

  // Set the initial logo to logo-white.svg
  logo.setAttribute("src", "img/login/logo-white.svg");

  // Use requestAnimationFrame for smoother animations
  function animateLogoMobile(timestamp) {
    // Calculate progress based on time (2 seconds duration)
    let progress = (timestamp - startTime) / 2000;

    // Ease-out animation formula for smoother motion
    let easeOutProgress = 1 - Math.pow(1 - progress, 3);

    // Calculate new position
    let targetTop = 37;
    let targetLeft = 38;

    let newTop = initialTop + (targetTop - initialTop) * easeOutProgress;
    let newLeft = initialLeft + (targetLeft - initialLeft) * easeOutProgress;

    // Apply new position
    logo.style.top = newTop + "px";
    logo.style.left = newLeft + "px";

    // Set background color to transparent during the animation
    let backgroundOpacity = 1 - easeOutProgress;
    backgroundFade.style.backgroundColor = `rgba(42, 54, 71, ${backgroundOpacity})`;

    // Calculate the transition between logo-white.svg and login_icon.svg
    let logoSrc =
      easeOutProgress > 0.5
        ? "img/login/login_icon.svg"
        : "img/login/logo-white.svg";
    logo.setAttribute("src", logoSrc);

    // Continue animation until progress reaches 1
    if (progress < 1) {
      requestAnimationFrame(animateLogoMobile);
    }
  }

  // Record the start time of the animation
  let startTime = null;

  // Trigger the mobile animation
  function startAnimationMobile() {
    startTime = performance.now();
    requestAnimationFrame(animateLogoMobile);
  }

  // Start the mobile animation after a short delay (adjust as needed)
  setTimeout(startAnimationMobile, 1000); // Delay increased to 1000 milliseconds
}
