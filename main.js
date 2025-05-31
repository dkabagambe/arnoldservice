// Mobile Navigation Toggle
const hamburger = document.getElementById("hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
  navMenu.classList.toggle("active");
  const icon = hamburger.querySelector("i");
  if (navMenu.classList.contains("active")) {
    icon.classList.remove("fa-bars");
    icon.classList.add("fa-times");
  } else {
    icon.classList.remove("fa-times");
    icon.classList.add("fa-bars");
  }
});

// Mobile Dropdown Toggle
document.querySelectorAll(".dropdown").forEach((dropdown) => {
  const dropdownToggle = dropdown.querySelector("a");

  dropdownToggle.addEventListener("click", function (e) {
    if (window.innerWidth <= 768) {
      e.preventDefault();
      dropdown.classList.toggle("active");

      const dropdownIcon = dropdown.querySelector(".dropdown-icon");
      if (dropdown.classList.contains("active")) {
        dropdownIcon.style.transform = "rotate(180deg)";
      } else {
        dropdownIcon.style.transform = "rotate(0)";
      }
    }
  });
});

// Close menu when clicking outside
document.addEventListener("click", (e) => {
  if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
    navMenu.classList.remove("active");
    const icon = hamburger.querySelector("i");
    icon.classList.remove("fa-times");
    icon.classList.add("fa-bars");

    // Close all dropdowns
    document.querySelectorAll(".dropdown").forEach((dropdown) => {
      dropdown.classList.remove("active");
      const dropdownIcon = dropdown.querySelector(".dropdown-icon");
      dropdownIcon.style.transform = "rotate(0)";
    });
  }
});

// Cart functionality
const cartCount = document.querySelector(".cart-count");
let count = 0;

document.querySelectorAll(".service-link").forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    count++;
    cartCount.textContent = count;
    cartCount.style.display = "flex";

    // Animation effect
    cartCount.style.transform = "scale(1.5)";
    setTimeout(() => {
      cartCount.style.transform = "scale(1)";
    }, 300);

    // Show notification
    showNotification("Service added to cart!");
  });
});

// Responsive header adjustments
function adjustHeader() {
  const topBar = document.querySelector(".top-bar");
  const headerMain = document.querySelector(".header-main");
  const mainNav = document.querySelector(".main-nav");

  if (window.innerWidth <= 768) {
    const topBarHeight = topBar.offsetHeight;
    const headerHeight = headerMain.offsetHeight;
    mainNav.style.top = `${topBarHeight + headerHeight}px`;
  } else {
    mainNav.style.top = "130px";
  }
}

// Show notification
function showNotification(message) {
  const notification = document.createElement("div");
  notification.textContent = message;
  notification.classList.add("notification");
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.opacity = "0";
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 500);
  }, 2000);
}

// Initial adjustment
adjustHeader();

// Adjust on resize
window.addEventListener("resize", adjustHeader);

// Set active navigation item
document.querySelectorAll(".nav-menu > li > a").forEach((link) => {
  link.addEventListener("click", function () {
    document.querySelectorAll(".nav-menu > li > a").forEach((item) => {
      item.classList.remove("active");
    });
    this.classList.add("active");
  });
});

// Set initial active item
document
  .querySelector(".nav-menu > li:first-child > a")
  .classList.add("active");
