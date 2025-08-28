document.addEventListener("DOMContentLoaded", function () {
  const header = document.querySelector("header");
  const hamburger = document.getElementById("hamburger");
  const mobileMenu = document.getElementById("mobileMenu");

  function setHeaderHeight() {
    if (!header) return;
    const h = Math.round(header.getBoundingClientRect().height);
    document.documentElement.style.setProperty("--header-h", h + "px");
    document.body.style.paddingTop = h + "px";
  }

  setHeaderHeight();
  window.addEventListener("resize", setHeaderHeight);

  // Mobile menu toggle and close helper
  function closeMenu() {
    if (mobileMenu) mobileMenu.classList.remove("open");
    if (hamburger) hamburger.setAttribute("aria-expanded", "false");
  }
  window.closeMenu = closeMenu; // exposed for inline onclick

  if (hamburger && mobileMenu) {
    hamburger.addEventListener("click", function (e) {
      e.stopPropagation();
      const open = mobileMenu.classList.toggle("open");
      hamburger.setAttribute("aria-expanded", String(open));
    });

    // close menu on outside click
    document.addEventListener("click", function (e) {
      if (!mobileMenu.classList.contains("open")) return;
      if (!mobileMenu.contains(e.target) && !hamburger.contains(e.target))
        closeMenu();
    });
  }

  // shrink header on scroll
  window.addEventListener(
    "scroll",
    function () {
      if (!header) return;
      if (window.scrollY > 28) header.classList.add("scrolled");
      else header.classList.remove("scrolled");
    },
    { passive: true }
  );

  // Scroll reveal
  const reveals = document.querySelectorAll(".reveal");
  const projectCards = document.querySelectorAll(".projects .project-card");
  projectCards.forEach((el, i) => (el.dataset.delay = i * 0.06 + "s"));

  if ("IntersectionObserver" in window) {
    const obs = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            const d = el.dataset.delay || "0s";
            el.style.transitionDelay = d;
            el.classList.add("active");
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.12 }
    );
    reveals.forEach((r) => obs.observe(r));
  } else {
    // fallback: show everything
    reveals.forEach((r) => r.classList.add("active"));
  }

  // Scrollspy for nav links
  const sections = document.querySelectorAll("main section[id]");
  const navLinks = document.querySelectorAll(".nav-links a");
  if ("IntersectionObserver" in window) {
    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            navLinks.forEach((a) =>
              a.classList.toggle("active", a.getAttribute("href") === "#" + id)
            );
          }
        });
      },
      { threshold: 0.5 }
    );
    sections.forEach((s) => spy.observe(s));
  }

  // Download CV
  const downloadBtn = document.getElementById("downloadCV");
  if (downloadBtn) {
    downloadBtn.addEventListener("click", function () {
      // const blob = new Blob(
      //   [
      //     `John Doe — Backend Developer\n\n` +
      //       `Email: johndoe@example.com\nGitHub: https://github.com/johndoe\nLinkedIn: https://linkedin.com/in/johndoe\n\nSkills: PHP (Laravel 12), Node.js, MySQL, Redis, Docker, REST/GraphQL\n\nExperience: Built and maintained scalable APIs and services.\nProjects: Document Tracking, Inventory System, Training Portal, Task Manager.\n`,
      //   ],
      //   { type: "text/plain" }
      // );
      // const url = URL.createObjectURL(blob);
      // const a = document.createElement("a");
      // a.href = url;
      // a.download = "John-Doe-CV.txt";
      // a.click();
      // URL.revokeObjectURL(url);


      alert('Under Maintenance 😁');
    });
  }

  // Contact form basic handling
  const form = document.getElementById("contactForm");
  const formMsg = document.getElementById("formMsg");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const message = document.getElementById("message").value.trim();
      if (!name || !email || !message) {
        formMsg.textContent = "Please fill out all fields.";
        return;
      }
      if (!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email)) {
        formMsg.textContent = "Please enter a valid email.";
        return;
      }
      const subject = encodeURIComponent("Portfolio Inquiry from " + name);
      const body = encodeURIComponent(
        message + "\\n\\n— " + name + " (" + email + ")"
      );
      window.location.href = `mailto:renellequinones7@gmail.com?subject=${subject}&body=${body}`;
      formMsg.textContent = "Opening your email client...";
      form.reset();
    });
  }

  // dynamic year
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
});
