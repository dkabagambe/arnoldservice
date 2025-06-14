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
document.querySelectorAll(".dropdown, .mega-dropdown").forEach((dropdown) => {
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
    document
      .querySelectorAll(".dropdown, .mega-dropdown")
      .forEach((dropdown) => {
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

// Close mega menu when clicking outside
document.addEventListener("click", (e) => {
  if (!e.target.closest(".mega-dropdown")) {
    document.querySelectorAll(".mega-menu").forEach((menu) => {
      menu.style.opacity = "0";
      menu.style.visibility = "hidden";
      menu.style.transform = "translateY(10px)";
    });
  }
});

// Add to cart animation
document.querySelectorAll(".cta-button").forEach((button) => {
  button.addEventListener("click", function (e) {
    e.preventDefault();
    showNotification("Request received! We will contact you shortly.");
  });
});
// this is the code for the search bar
document.addEventListener("DOMContentLoaded", function () {
  const input = document.querySelector(".search-box input");
  const button = document.querySelector(".search-box button");

  button.addEventListener("click", function () {
    const keyword = input.value.trim().toLowerCase();
    if (!keyword) return;

    // Remove previous highlights
    document.querySelectorAll(".highlight").forEach((el) => {
      el.outerHTML = el.innerText;
    });

    let found = false;

    // Recursively search and highlight text nodes
    function searchAndHighlight(node) {
      if (node.nodeType === 3) {
        const text = node.textContent;
        const index = text.toLowerCase().indexOf(keyword);
        if (index > -1) {
          const span = document.createElement("span");
          span.className = "highlight";
          span.textContent = text.substr(index, keyword.length);

          const after = document.createTextNode(
            text.substr(index + keyword.length)
          );
          const before = document.createTextNode(text.substr(0, index));

          const parent = node.parentNode;
          parent.replaceChild(after, node);
          parent.insertBefore(span, after);
          parent.insertBefore(before, span);

          if (!found) {
            span.scrollIntoView({ behavior: "smooth", block: "center" });
            found = true;
          }
        }
      } else if (
        node.nodeType === 1 &&
        node.childNodes &&
        !["SCRIPT", "STYLE", "NOSCRIPT"].includes(node.tagName)
      ) {
        node.childNodes.forEach(searchAndHighlight);
      }
    }

    searchAndHighlight(document.body);
  });

  // Also trigger search on Enter key
  input.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      button.click();
    }
  });
});
// Load Google Translate script dynamically
function loadGoogleTranslate() {
  const script = document.createElement("script");
  script.src =
    "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
  script.type = "text/javascript";
  document.body.appendChild(script);
}

// Initialize Google Translate
function googleTranslateElementInit() {
  new google.translate.TranslateElement(
    {
      pageLanguage: "sv", // Swedish is default
      includedLanguages: "sv,en", // Add more if needed: 'sv,en,fr,de'
      layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
      autoDisplay: false,
    },
    "google_translate_element"
  );
}

// Load the script after DOM is ready
document.addEventListener("DOMContentLoaded", function () {
  loadGoogleTranslate();
});
