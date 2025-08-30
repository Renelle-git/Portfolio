document.addEventListener("DOMContentLoaded", function () {
  // Initialize AOS
  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 1200,
      once: true,
      offset: 100,
    });
  }

  const header = document.querySelector("header");
  const hamburger = document.getElementById("hamburger");
  const mobileMenu = document.getElementById("mobileMenu");
  const backToTop = document.getElementById("backToTop");

  /** ---------------------------
   * Mobile Menu Toggle
   * -------------------------- */
  if (hamburger && mobileMenu) {
    // Toggle menu
    hamburger.addEventListener("click", (e) => {
      e.stopPropagation();
      mobileMenu.classList.toggle("hidden");

      // Update hamburger icon
      const icon = hamburger.querySelector("i");
      if (mobileMenu.classList.contains("hidden")) {
        icon.className = "fa-solid fa-bars";
      } else {
        icon.className = "fa-solid fa-times";
      }
    });

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
      if (
        !mobileMenu.classList.contains("hidden") &&
        !mobileMenu.contains(e.target) &&
        !hamburger.contains(e.target)
      ) {
        mobileMenu.classList.add("hidden");
        hamburger.querySelector("i").className = "fa-solid fa-bars";
      }
    });

    // Close menu when clicking on navigation links
    mobileMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenu.classList.add("hidden");
        hamburger.querySelector("i").className = "fa-solid fa-bars";
      });
    });
  }

  /** ---------------------------
   * Smooth Scrolling for anchor links
   * -------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        const headerHeight = header ? header.offsetHeight : 0;
        const targetPosition = target.offsetTop - headerHeight - 20;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });

        // Close mobile menu if open
        if (mobileMenu && !mobileMenu.classList.contains("hidden")) {
          mobileMenu.classList.add("hidden");
          hamburger.querySelector("i").className = "fa-solid fa-bars";
        }
      }
    });
  });

  /** ---------------------------
   * Scroll Effects
   * -------------------------- */
  let ticking = false;

  function updateOnScroll() {
    const scrollY = window.scrollY;

    // Header shadow on scroll
    if (header) {
      header.classList.toggle("shadow-md", scrollY > 20);
    }

    // Back to top button
    if (backToTop) {
      if (scrollY > 300) {
        backToTop.classList.remove("hidden");
      } else {
        backToTop.classList.add("hidden");
      }
    }

    ticking = false;
  }

  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        requestAnimationFrame(updateOnScroll);
        ticking = true;
      }
    },
    { passive: true }
  );

  /** ---------------------------
   * Back to Top Button
   * -------------------------- */
  if (backToTop) {
    backToTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /** ---------------------------
   * Active Navigation (Scrollspy)
   * -------------------------- */
  const sections = document.querySelectorAll("main section[id]");
  const navLinks = document.querySelectorAll(
    "header nav a[href^='#'], #mobileMenu a[href^='#']"
  );

  if ("IntersectionObserver" in window && sections.length > 0) {
    const observerOptions = {
      threshold: 0.3,
      rootMargin: "-20% 0px -70% 0px",
    };

    const spy = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navLinks.forEach((link) => {
            const isActive = link.getAttribute("href") === "#" + id;
            link.classList.toggle("text-blue-500", isActive);
            link.classList.toggle("font-semibold", isActive);
          });
        }
      });
    }, observerOptions);

    sections.forEach((section) => spy.observe(section));
  }

  /** ---------------------------
   * Download CV Buttons
   * -------------------------- */
  // const downloadBtns = document.querySelectorAll(
  //   "#downloadCV, #downloadCVMobile"
  // );
  // downloadBtns.forEach((btn) => {
  //   btn.addEventListener("click", () => {
  //     alert("CV Download - Under Maintenance 😁");
  //   });
  // });

  const toggleBtn = document.getElementById("requestCvBtn");
  const closeBtn = document.getElementById("closeFormBtn");
  const formCard = document.getElementById("cvFormCard");
  const cvform = document.getElementById("cvRequestForm");

  toggleBtn.addEventListener("click", () => {
    formCard.classList.toggle("hidden");
  });

  closeBtn.addEventListener("click", () => {
    formCard.classList.add("hidden");
  });

  cvform.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = cvform.querySelector("input[name='body']").value;
    const email = cvform.querySelector("input[name='email']").value;
    try {
      window.location.href = `mailto:quinonesrenelle7@gmail.com?subject=CV Request&body=Name: ${name}%0D%0AEmail: ${email}`;
    } catch (error) {
      alert("Error opening email client. Please try again.");
    }
  });

  /** ---------------------------
   * Contact Form Handler
   * -------------------------- */
  const form = document.getElementById("contactForm");
  const formMsg = document.getElementById("formMsg");

  if (form && formMsg) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const message = document.getElementById("message").value.trim();

      // Clear previous messages
      formMsg.textContent = "";
      formMsg.className = "text-sm";

      // Validation
      if (!name || !email || !message) {
        formMsg.textContent = "Please fill out all fields.";
        formMsg.className = "text-red-500 text-sm";
        return;
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        formMsg.textContent = "Please enter a valid email address.";
        formMsg.className = "text-red-500 text-sm";
        return;
      }

      // Create mailto link
      const subject = encodeURIComponent(`Portfolio Inquiry from ${name}`);
      const body = encodeURIComponent(
        `${message}\n\n—\nFrom: ${name}\nEmail: ${email}`
      );

      try {
        window.location.href = `mailto:quinonesrenelle7@gmail.com?subject=${subject}&body=${body}`;
        formMsg.textContent = "Opening your email client...";
        formMsg.className = "text-green-600 text-sm";

        // Reset form after successful submission
        setTimeout(() => {
          form.reset();
          formMsg.textContent = "";
        }, 2000);
      } catch (error) {
        formMsg.textContent = "Error opening email client. Please try again.";
        formMsg.className = "text-red-500 text-sm";
      }
    });

    // Real-time validation feedback
    const inputs = form.querySelectorAll("input, textarea");
    inputs.forEach((input) => {
      input.addEventListener("blur", () => {
        if (input.value.trim() === "") {
          input.classList.add("border-red-300");
        } else {
          input.classList.remove("border-red-300");
        }
      });

      input.addEventListener("input", () => {
        input.classList.remove("border-red-300");
        if (formMsg.textContent && input.value.trim() !== "") {
          formMsg.textContent = "";
        }
      });
    });
  }

  /** ---------------------------
   * Dynamic Year in Footer
   * -------------------------- */
  const yearElement = document.getElementById("year");
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  /** ---------------------------
   * Handle window resize for mobile menu
   * -------------------------- */
  window.addEventListener("resize", () => {
    if (window.innerWidth >= 768) {
      // md breakpoint
      if (mobileMenu && !mobileMenu.classList.contains("hidden")) {
        mobileMenu.classList.add("hidden");
        hamburger.querySelector("i").className = "fa-solid fa-bars";
      }
    }
  });
});

function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.innerHTML = "";

  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }

  type();
}

// Multiple phrases to cycle through
const phrases = [
  "Aspiring Backend Developer",
  "Code Newbie with Big Dreams",
  "Learning One Bug at a Time",
  "Building APIs & Breaking Things",
  "From Zero to Full Stack Hero",
  "Debugging Life, One Line at a Time",
  "Writing Code, Changing Lives",
  "API Creator in Progress",
  "Next Stop: Full Stack Developer",
  "Turning Ideas into Code",
  "Backend Rookie, Frontend Curious"
];

let currentPhraseIndex = 0;
const typingElement = document.getElementById("typing-text");

function startTypingCycle() {
  const currentPhrase = phrases[currentPhraseIndex];

  // Type the current phrase
  typeWriter(typingElement, currentPhrase, 80);

  // After typing is complete, wait then clear and move to next phrase
  setTimeout(() => {
    // Clear text with backspace effect
    let currentText = typingElement.innerHTML;

    function backspace() {
      if (currentText.length > 0) {
        currentText = currentText.slice(0, -1);
        typingElement.innerHTML = currentText;
        setTimeout(backspace, 50);
      } else {
        // Move to next phrase
        currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
        setTimeout(startTypingCycle, 500);
      }
    }

    setTimeout(backspace, 2000); // Wait 2 seconds before backspacing
  }, currentPhrase.length * 80 + 500);
}

// Start the typing animation when page loads
window.addEventListener("load", () => {
  setTimeout(startTypingCycle, 1000); // Start after 1 second delay
});
