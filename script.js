document.addEventListener("DOMContentLoaded", function () {
  // Animate on scroll (AOS)
  if (typeof AOS !== "undefined") {
    AOS.init({ duration: 1200 });
  }


  const header = document.querySelector("header");
  const hamburger = document.getElementById("hamburger");
  const mobileMenu = document.getElementById("mobileMenu");
  const backToTop = document.getElementById("backToTop");

  /** ---------------------------
   * Header height and sticky padding
   * -------------------------- */
  // function setHeaderHeight() {
  //   if (!header) return;
  //   const h = Math.round(header.getBoundingClientRect().height);
  //   document.documentElement.style.setProperty("--header-h", h + "px");
  //   document.body.style.paddingTop = h + "px";
  // }
  // setHeaderHeight();
  // window.addEventListener("resize", setHeaderHeight);

  /** ---------------------------
   * Mobile Menu
   * -------------------------- */
if (hamburger && mobileMenu) {
  // Toggle menu
  hamburger.addEventListener("click", (e) => {
    e.stopPropagation();
    mobileMenu.classList.toggle("hidden");
  });

  // Close menu if clicking outside
  document.addEventListener("click", (e) => {
    if (
      !mobileMenu.classList.contains("hidden") &&
      !mobileMenu.contains(e.target) &&
      !hamburger.contains(e.target)
    ) {
      mobileMenu.classList.add("hidden");
    }
  });

  // Close after clicking a link
  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.add("hidden");
    });
  });
}


document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });

      // Close mobile menu after clicking
      if (!mobileMenu.classList.contains("hidden")) {
        mobileMenu.classList.add("hidden");
      }
    }
  });
});

  /** ---------------------------
   * Scroll: shrink header + show Back-to-Top
   * -------------------------- */
  window.addEventListener(
    "scroll",
    () => {
      if (header) {
        header.classList.toggle("scrolled", window.scrollY > 28);
      }
      if (backToTop) {
        backToTop.style.display = window.scrollY > 300 ? "block" : "none";
      }
    },
    { passive: true }
  );

  if (backToTop) {
    backToTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /** ---------------------------
   * Reveal (IntersectionObserver fallback)
   * -------------------------- */
  const reveals = document.querySelectorAll(".reveal");
  const projectCards = document.querySelectorAll(".projects .project-card");
  projectCards.forEach((el, i) => (el.dataset.delay = i * 0.06 + "s"));

  if ("IntersectionObserver" in window) {
    const obs = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            el.style.transitionDelay = el.dataset.delay || "0s";
            el.classList.add("active");
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.12 }
    );
    reveals.forEach((r) => obs.observe(r));
  } else {
    reveals.forEach((r) => r.classList.add("active"));
  }

  /** ---------------------------
   * Scrollspy
   * -------------------------- */
  const sections = document.querySelectorAll("main section[id]");
  const navLinks = document.querySelectorAll("header nav a, #mobileMenu a");
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

  /** ---------------------------
   * Download CV (placeholder)
   * -------------------------- */
  const downloadBtn = document.getElementById("downloadCV");
  if (downloadBtn) {
    downloadBtn.addEventListener("click", () => {
      alert("Under Maintenance 😁");
    });
  }

  /** ---------------------------
   * Contact Form
   * -------------------------- */
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
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        formMsg.textContent = "Please enter a valid email.";
        return;
      }

      const subject = encodeURIComponent("Portfolio Inquiry from " + name);
      const body = encodeURIComponent(
        message + "\n\n— " + name + " (" + email + ")"
      );
      window.location.href = `mailto:renellequinones7@gmail.com?subject=${subject}&body=${body}`;
      formMsg.textContent = "Opening your email client...";
      form.reset();
    });
  }

  /** ---------------------------
   * Dynamic Year
   * -------------------------- */
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
});
