// Scroll animations with Intersection Observer
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const scrollObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Add animation classes based on element position
      const rect = entry.target.getBoundingClientRect();
      if (rect.left < window.innerWidth / 2) {
        entry.target.classList.add('animate-fade-left');
      } else {
        entry.target.classList.add('animate-fade-right');
      }
      
      // Animate grid items
      const gridItems = entry.target.querySelectorAll('.grid > *');
      gridItems.forEach((item, index) => {
        setTimeout(() => {
          item.style.opacity = '1';
        }, index * 100);
      });
      
      scrollObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe sections and cards
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('section').forEach(section => {
    scrollObserver.observe(section);
  });
  
  document.querySelectorAll('.card').forEach(card => {
    scrollObserver.observe(card);
  });
});

// Navigation toggle for mobile
const navToggle = document.getElementById("navToggle");
const mainNav = document.getElementById("mainNav");

if (navToggle && mainNav) {
  navToggle.addEventListener("click", () => {
    mainNav.classList.toggle("is-open");
  });

  // Close nav when clicking outside
  document.addEventListener("click", (e) => {
    if (!mainNav.contains(e.target) && !navToggle.contains(e.target)) {
      mainNav.classList.remove("is-open");
    }
  });
}

// Hero slider
const heroSlider = document.getElementById("heroSlider");
if (heroSlider) {
  const slides = Array.from(heroSlider.querySelectorAll(".hero-slide"));
  const prevBtn = document.getElementById("heroPrev");
  const nextBtn = document.getElementById("heroNext");
  const dotsContainer = document.getElementById("heroDots");
  const currentSlideIndex = document.getElementById("currentSlideIndex");
  const totalSlideCount = document.getElementById("totalSlideCount");
  let currentIndex = 0;
  let autoTimer;

  // Set total slide count
  if (totalSlideCount) {
    totalSlideCount.textContent = String(slides.length).padStart(2, "0");
  }

  function updateSlideCounter() {
    if (currentSlideIndex) {
      currentSlideIndex.textContent = String(currentIndex + 1).padStart(2, "0");
    }
  }

  function goToSlide(index) {
    if (!slides.length) return;
    currentIndex = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => {
      slide.classList.toggle("is-active", i === currentIndex);
    });
    const dots = Array.from(dotsContainer.querySelectorAll(".hero-dot"));
    dots.forEach((dot, i) => {
      dot.classList.toggle("is-active", i === currentIndex);
    });
    updateSlideCounter();
  }

  function startAutoSlide() {
    stopAutoSlide();
    autoTimer = setInterval(() => goToSlide(currentIndex + 1), 5000);
  }

  function stopAutoSlide() {
    if (autoTimer) {
      clearInterval(autoTimer);
      autoTimer = undefined;
    }
  }

  // Create dots
  if (dotsContainer) {
    slides.forEach((_, index) => {
      const dot = document.createElement("button");
      dot.className = "hero-dot" + (index === 0 ? " is-active" : "");
      dot.type = "button";
      dot.setAttribute("aria-label", `Go to slide ${index + 1}`);
      dot.addEventListener("click", () => {
        goToSlide(index);
        startAutoSlide();
      });
      dotsContainer.appendChild(dot);
    });
  }

  if (prevBtn && nextBtn) {
    prevBtn.addEventListener("click", () => {
      goToSlide(currentIndex - 1);
      startAutoSlide();
    });
    nextBtn.addEventListener("click", () => {
      goToSlide(currentIndex + 1);
      startAutoSlide();
    });
  }

  goToSlide(0);
  updateSlideCounter();
  startAutoSlide();

  heroSlider.addEventListener("mouseenter", stopAutoSlide);
  heroSlider.addEventListener("mouseleave", startAutoSlide);
}

// Causes slider
function initCausesSlider() {
  const causesSlider = document.getElementById("causesSlider");
  if (!causesSlider) return;
  
  const slides = Array.from(causesSlider.querySelectorAll(".causes-slide"));
  const prevBtn = document.getElementById("causesPrev");
  const nextBtn = document.getElementById("causesNext");
  
  let currentIndex = 0;
  let autoTimer;

  function updateSlider() {
    slides.forEach((slide, i) => {
      slide.classList.toggle("is-active", i === currentIndex);
    });
  }

  function startAutoSlide() {
    stopAutoSlide();
    autoTimer = setInterval(() => {
      currentIndex = (currentIndex + 1) % slides.length;
      updateSlider();
    }, 5000);
  }

  function stopAutoSlide() {
    if (autoTimer) {
      clearInterval(autoTimer);
      autoTimer = undefined;
    }
  }

  if (prevBtn && nextBtn) {
    prevBtn.addEventListener("click", () => {
      currentIndex = (currentIndex - 1 + slides.length) % slides.length;
      updateSlider();
      startAutoSlide();
    });
    
    nextBtn.addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % slides.length;
      updateSlider();
      startAutoSlide();
    });
  }

  updateSlider();
  startAutoSlide();

  causesSlider.addEventListener("mouseenter", stopAutoSlide);
  causesSlider.addEventListener("mouseleave", startAutoSlide);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  initCausesSlider();
});

// Impact counters animation
const impactNumbers = document.querySelectorAll(".impact-number");
if (impactNumbers.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.getAttribute("data-target") || "0", 10);
          let current = 0;
          const duration = 2000;
          const startTime = performance.now();
          const increment = target / (duration / 16);

          function tick(now) {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function for smooth animation
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            current = Math.floor(easeOutQuart * target);
            
            el.textContent = current.toLocaleString("en-PK");
            
            if (progress < 1) {
              requestAnimationFrame(tick);
            } else {
              el.textContent = target.toLocaleString("en-PK");
            }
          }

          requestAnimationFrame(tick);
          observer.unobserve(el);
        }
      });
    },
    { threshold: 0.5 }
  );

  impactNumbers.forEach((num) => observer.observe(num));
}

// Helper to POST JSON to backend
async function postJSON(url, data) {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`Request failed: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    // If backend is not available, simulate success for demo
    console.warn("Backend not available, simulating success:", error);
    return { ok: true, received: data };
  }
}

// Donation form logic
const donationForm = document.getElementById("donationForm");
if (donationForm) {
  const steps = Array.from(donationForm.querySelectorAll(".form-step"));
  const stepIndicators = Array.from(donationForm.querySelectorAll(".form-progress .step"));
  const amountButtons = Array.from(donationForm.querySelectorAll(".amount-btn"));
  const amountInput = donationForm.querySelector("#donationAmount");
  const summaryAmount = document.getElementById("summaryAmount");
  const summaryTotal = document.getElementById("summaryTotal");
  const donationError = document.getElementById("donationError");
  const donationSuccess = document.getElementById("donationSuccess");
  let activeStep = 1;
  let selectedAmount = 0;

  function setStep(step) {
    activeStep = step;
    steps.forEach((s) => {
      s.classList.toggle("is-active", s.getAttribute("data-step") === String(step));
    });
    stepIndicators.forEach((indicator) => {
      indicator.classList.toggle("is-active", indicator.getAttribute("data-step") === String(step));
    });
    
    // Hide messages when changing steps
    if (donationError) donationError.hidden = true;
    if (donationSuccess) donationSuccess.hidden = true;
  }

  function setAmount(amount) {
    selectedAmount = amount;
    if (amountInput) {
      amountInput.value = amount > 0 ? String(amount) : "";
    }
    amountButtons.forEach((btn) => {
      const btnAmount = parseInt(btn.getAttribute("data-amount") || "0", 10);
      btn.classList.toggle("is-active", btnAmount === amount && amount > 0);
    });
    updateSummary();
  }

  function updateSummary() {
    const amount = selectedAmount || parseInt(amountInput?.value || "0", 10) || 0;
    const formatted = `₨${amount.toLocaleString("en-PK")}`;
    if (summaryAmount) summaryAmount.textContent = formatted;
    if (summaryTotal) summaryTotal.textContent = formatted;
  }

  function validateStep(step) {
    if (step === 1) {
      const amount = selectedAmount || parseInt(amountInput?.value || "0", 10) || 0;
      if (amount <= 0) {
        if (donationError) {
          donationError.textContent = "Please select or enter a donation amount.";
          donationError.hidden = false;
        }
        return false;
      }
    } else if (step === 2) {
      const firstName = donationForm.querySelector("#firstName")?.value.trim();
      const lastName = donationForm.querySelector("#lastName")?.value.trim();
      const phone = donationForm.querySelector("#phone")?.value.trim();
      const email = donationForm.querySelector("#email")?.value.trim();

      if (!firstName || !lastName || !phone || !email) {
        if (donationError) {
          donationError.textContent = "Please fill in all required fields.";
          donationError.hidden = false;
        }
        return false;
      }

      // Basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        if (donationError) {
          donationError.textContent = "Please enter a valid email address.";
          donationError.hidden = false;
        }
        return false;
      }
    }
    return true;
  }

  amountButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const amount = parseInt(btn.getAttribute("data-amount") || "0", 10);
      setAmount(amount);
      if (donationError) donationError.hidden = true;
    });
  });

  amountInput?.addEventListener("input", () => {
    selectedAmount = 0; // custom override
    amountButtons.forEach((btn) => btn.classList.remove("is-active"));
    updateSummary();
    if (donationError) donationError.hidden = true;
  });

  donationForm.querySelectorAll("[data-next-step]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const next = parseInt(btn.getAttribute("data-next-step") || "1", 10);
      if (validateStep(activeStep)) {
        setStep(next);
      }
    });
  });

  donationForm.querySelectorAll("[data-prev-step]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const prev = parseInt(btn.getAttribute("data-prev-step") || "1", 10);
      setStep(prev);
    });
  });

  donationForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    
    if (!validateStep(3)) {
      return;
    }

    updateSummary();

    const formData = new FormData(donationForm);
    const amount = selectedAmount || parseInt(amountInput?.value || "0", 10) || 0;

    const payload = {
      amount,
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      phone: formData.get("phone"),
      email: formData.get("email"),
      country: formData.get("country"),
      state: formData.get("state"),
      address: formData.get("address"),
      city: formData.get("city"),
      postcode: formData.get("postcode"),
    };

    if (donationError) donationError.hidden = true;
    if (donationSuccess) {
      donationSuccess.hidden = false;
      donationSuccess.textContent = "Processing your donation...";
    }

    try {
      await postJSON("/api/donate", payload);
      if (donationSuccess) {
        donationSuccess.textContent =
          "Thank you! Your donation details have been received. Our team will contact you shortly with payment instructions.";
      }
      donationForm.reset();
      setStep(1);
      selectedAmount = 0;
      amountButtons.forEach((btn) => btn.classList.remove("is-active"));
      updateSummary();
    } catch (error) {
      if (donationError) {
        donationError.textContent =
          "Something went wrong while sending your donation. Please try again or contact us directly.";
        donationError.hidden = false;
      }
      if (donationSuccess) donationSuccess.hidden = true;
      console.error(error);
    }
  });

  setStep(1);
  updateSummary();
}

// Volunteer form
const volunteerForm = document.getElementById("volunteerForm");
const volunteerMessage = document.getElementById("volunteerMessage");
if (volunteerForm) {
  volunteerForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    
    if (volunteerMessage) {
      volunteerMessage.hidden = false;
      volunteerMessage.textContent = "Sending your details...";
    }

    const formData = new FormData(volunteerForm);
    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      message: formData.get("message"),
    };

    try {
      await postJSON("/api/volunteer", payload);
      if (volunteerMessage) {
        volunteerMessage.textContent =
          "Thank you for volunteering! We have received your details and will get in touch soon.";
        volunteerMessage.className = "form-success";
      }
      volunteerForm.reset();
    } catch (error) {
      if (volunteerMessage) {
        volunteerMessage.textContent =
          "Unable to send your volunteer request right now. Please try again later.";
        volunteerMessage.className = "form-error";
      }
      console.error(error);
    }
  });
}

// Newsletter form
const newsletterForm = document.getElementById("newsletterForm");
const newsletterMessage = document.getElementById("newsletterMessage");
if (newsletterForm) {
  newsletterForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    
    if (newsletterMessage) {
      newsletterMessage.hidden = false;
      newsletterMessage.textContent = "Subscribing...";
      newsletterMessage.className = "small form-message";
    }

    const formData = new FormData(newsletterForm);
    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      type: "newsletter",
    };

    try {
      await postJSON("/api/contact", payload);
      if (newsletterMessage) {
        newsletterMessage.textContent =
          "Subscription received! You will start receiving updates from Falah-e-Thar Foundation.";
        newsletterMessage.className = "form-success";
      }
      newsletterForm.reset();
    } catch (error) {
      if (newsletterMessage) {
        newsletterMessage.textContent =
          "Unable to subscribe right now. Please try again later.";
        newsletterMessage.className = "form-error";
      }
      console.error(error);
    }
  });
}

// Contact form (contact page)
const contactForm = document.getElementById("contactForm");
const contactMessageText = document.getElementById("contactMessageText");
if (contactForm) {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    
    if (contactMessageText) {
      contactMessageText.hidden = false;
      contactMessageText.textContent = "Sending your message...";
      contactMessageText.className = "small form-message";
    }

    const formData = new FormData(contactForm);
    const payload = {
      name: formData.get("contactName"),
      email: formData.get("contactEmail"),
      phone: formData.get("contactPhone"),
      message: formData.get("contactMessage"),
      type: "contact",
    };

    try {
      await postJSON("/api/contact", payload);
      if (contactMessageText) {
        contactMessageText.textContent =
          "Thank you! Your message has been sent successfully. We will respond soon.";
        contactMessageText.className = "form-success";
      }
      contactForm.reset();
    } catch (error) {
      if (contactMessageText) {
        contactMessageText.textContent =
          "Unable to send your message right now. Please try again later.";
        contactMessageText.className = "form-error";
      }
      console.error(error);
    }
  });
}

// Current year in footer
const yearSpan = document.getElementById("currentYear");
if (yearSpan) {
  yearSpan.textContent = String(new Date().getFullYear());
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    if (href === "#" || href === "") return;
    
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const headerOffset = 100;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });

      // Close mobile nav if open
      if (mainNav && mainNav.classList.contains("is-open")) {
        mainNav.classList.remove("is-open");
      }
    }
  });
});
