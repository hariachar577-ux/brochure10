const navToggle = document.getElementById("navToggle");
const siteNav = document.getElementById("siteNav");
const navTriggers = document.querySelectorAll(".nav-trigger");
const megaMenu = document.getElementById("megaMenu");
const megaPanels = document.querySelectorAll(".mega-panel");
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

function setActiveMenu(menuName) {
  if (!megaMenu) {
    return;
  }

  let hasMatch = false;

  navTriggers.forEach((trigger) => {
    const isActive = trigger.dataset.menu === menuName;
    trigger.classList.toggle("is-active", isActive);
    trigger.setAttribute("aria-expanded", String(isActive));
    hasMatch = hasMatch || isActive;
  });

  megaPanels.forEach((panel) => {
    const isActive = panel.dataset.panel === menuName;
    panel.classList.toggle("is-active", isActive);
  });

  megaMenu.classList.toggle("is-open", hasMatch);
}

if (navToggle && siteNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  siteNav.querySelectorAll("a, button").forEach((link) => {
    link.addEventListener("click", () => {
      if (link.tagName === "A") {
        siteNav.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      }
    });
  });
}

if (navTriggers.length && megaMenu) {
  navTriggers.forEach((trigger) => {
    trigger.addEventListener("click", () => {
      const isAlreadyActive = trigger.classList.contains("is-active");
      const isCompactView = window.innerWidth <= 760;

      if (isAlreadyActive && !isCompactView) {
        megaMenu.classList.remove("is-open");
        trigger.classList.remove("is-active");
        trigger.setAttribute("aria-expanded", "false");
        megaPanels.forEach((panel) => panel.classList.remove("is-active"));
        return;
      }

      setActiveMenu(trigger.dataset.menu);
    });
  });

  megaMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      megaMenu.classList.remove("is-open");
      navTriggers.forEach((trigger) => {
        trigger.classList.remove("is-active");
        trigger.setAttribute("aria-expanded", "false");
      });
      megaPanels.forEach((panel) => panel.classList.remove("is-active"));
      siteNav?.classList.remove("open");
      navToggle?.setAttribute("aria-expanded", "false");
    });
  });

  document.addEventListener("click", (event) => {
    const clickedInsideNav = event.target.closest(".nav-wrap");

    if (!clickedInsideNav) {
      megaMenu.classList.remove("is-open");
      navTriggers.forEach((trigger) => {
        trigger.classList.remove("is-active");
        trigger.setAttribute("aria-expanded", "false");
      });
      megaPanels.forEach((panel) => panel.classList.remove("is-active"));
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      megaMenu.classList.remove("is-open");
      navTriggers.forEach((trigger) => {
        trigger.classList.remove("is-active");
        trigger.setAttribute("aria-expanded", "false");
      });
      megaPanels.forEach((panel) => panel.classList.remove("is-active"));
    }
  });
}

if (contactForm && formStatus) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    formStatus.textContent = "Thanks for submitting!";
    contactForm.reset();
  });
}
