// Mobile Navigation Toggle
const hamburger = document.querySelector(".hamburger");
const mobileNavOverlay = document.getElementById("mobileNavOverlay");
const mobileNavClose = document.getElementById("mobileNavClose");

if (hamburger && mobileNavOverlay && mobileNavClose) {
  // Open mobile navigation
  hamburger.addEventListener("click", () => {
    if (window.innerWidth <= 860) {
      mobileNavOverlay.classList.add("active");
      document.body.style.overflow = "hidden";
      hamburger.classList.add("active");
      document.body.classList.add("mobile-nav-active");
    }
  });

  // Close mobile navigation
  mobileNavClose.addEventListener("click", () => {
    mobileNavOverlay.classList.remove("active");
    document.body.style.overflow = "auto";
    hamburger.classList.remove("active");
    document.body.classList.remove("mobile-nav-active");
  });

  // Close mobile navigation when clicking overlay
  mobileNavOverlay.addEventListener("click", (e) => {
    if (e.target === mobileNavOverlay) {
      mobileNavOverlay.classList.remove("active");
      document.body.style.overflow = "auto";
      hamburger.classList.remove("active");
      document.body.classList.remove("mobile-nav-active");
    }
  });

  // Close mobile navigation on escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && mobileNavOverlay.classList.contains("active")) {
      mobileNavOverlay.classList.remove("active");
      document.body.style.overflow = "auto";
      hamburger.classList.remove("active");
      document.body.classList.remove("mobile-nav-active");
    }
  });
}

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Results Tab Functionality
const tabBtns = document.querySelectorAll(".tab-btn");
const tabContents = document.querySelectorAll(".tab-content");

tabBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    // Remove active class from all buttons and contents
    tabBtns.forEach((b) => b.classList.remove("active"));
    tabContents.forEach((c) => c.classList.remove("active"));

    // Add active class to clicked button
    btn.classList.add("active");

    // Show corresponding content
    const targetTab = btn.getAttribute("data-tab");
    const targetContent = document.getElementById(targetTab);
    if (targetContent) {
      targetContent.classList.add("active");
    }
  });
});

// Quote Button Responsive Interaction
function handleQuoteButtonResize() {
  const quoteBtn = document.querySelector(".quote-btn");
  const windowWidth = window.innerWidth;

  if (quoteBtn) {
    if (windowWidth <= 860) {
      quoteBtn.style.opacity = "0";
      quoteBtn.style.transform = "scale(0.8)";
      quoteBtn.style.width = "0";
      quoteBtn.style.padding = "0";
      quoteBtn.style.margin = "0";
      quoteBtn.style.overflow = "hidden";
      quoteBtn.style.pointerEvents = "none";
    } else {
      quoteBtn.style.opacity = "1";
      quoteBtn.style.transform = "scale(1)";
      quoteBtn.style.width = "auto";
      quoteBtn.style.padding = "12px 24px";
      quoteBtn.style.margin = "0";
      quoteBtn.style.overflow = "visible";
      quoteBtn.style.pointerEvents = "auto";
    }
  }
}

// Header Scroll Effect
window.addEventListener("scroll", () => {
  const header = document.querySelector(".header");
  const navContainer = document.querySelector(".nav-container");
  const aboutSection = document.querySelector(".about");
  const navMenuLinks = document.querySelectorAll(".nav-menu a");
  const hamburgerSpans = document.querySelectorAll(".hamburger span");
  const logoImages = document.querySelectorAll(".logo-img");
  const asset9Image = logoImages.length > 1 ? logoImages[1] : null; // asset9.png (두 번째 이미지)

  if (window.scrollY > 100) {
    header.style.background = "#ffffff";
    header.style.backdropFilter = "blur(20px)";
    navContainer.style.background = "rgba(255, 255, 255, 0.1)";
    header.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)";

    // Change nav menu links to dark color
    navMenuLinks.forEach((link) => {
      link.style.color = "#333";
    });

    // Change hamburger to dark color
    hamburgerSpans.forEach((span) => {
      span.style.background = "#333";
    });

    // Change asset9.png to black
    if (asset9Image) {
      asset9Image.style.filter = "brightness(0) saturate(100%)";
    }
  } else {
    header.style.background = "transparent";
    header.style.backdropFilter = "blur(10px)";
    navContainer.style.background = "rgba(255, 255, 255, 0.1)";
    header.style.boxShadow = "none";

    // Change nav menu links to white color
    navMenuLinks.forEach((link) => {
      link.style.color = "#ffffff";
    });

    // Change hamburger to white color
    hamburgerSpans.forEach((span) => {
      span.style.background = "#ffffff";
    });

    // Reset asset9.png to original color
    if (asset9Image) {
      asset9Image.style.filter = "none";
    }
  }

  // About section text color change
  if (aboutSection) {
    const aboutRect = aboutSection.getBoundingClientRect();
    const aboutTop = aboutRect.top;

    if (navContainer.offsetHeight <= 5) {
      // When nav-container height is 0-5px, make text white
      const aboutTextH2 = aboutSection.querySelector(".about-text h2");
      const aboutTextP = aboutSection.querySelector(".about-text p");
      const aboutCardH3 = aboutSection.querySelectorAll(".about-card h3");

      if (aboutTextH2) aboutTextH2.style.color = "#ffffff";
      if (aboutTextP) aboutTextP.style.color = "#ffffff";
      aboutCardH3.forEach((h3) => {
        h3.style.color = "#ffffff";
      });
    } else {
      // When scrolled, maintain current colors
      const aboutTextH2 = aboutSection.querySelector(".about-text h2");
      const aboutTextP = aboutSection.querySelector(".about-text p");
      const aboutCardH3 = aboutSection.querySelectorAll(".about-card h3");

      if (aboutTextH2) aboutTextH2.style.color = "#333";
      if (aboutTextP) aboutTextP.style.color = "#666";
      aboutCardH3.forEach((h3) => {
        h3.style.color = "#333";
      });
    }
  }
});

// Scroll Down Button
const scrollDownBtn = document.querySelector(".scroll-down-btn");
const scrollBtn = document.querySelector(".scroll-btn");
if (scrollDownBtn) {
  scrollDownBtn.addEventListener("click", () => {
    const aboutSection = document.querySelector(".about");
    if (aboutSection) {
      aboutSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
}

if (scrollBtn) {
  scrollBtn.addEventListener("click", () => {
    const aboutSection = document.querySelector(".about");
    if (aboutSection) {
      aboutSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
}

// Form Submission
const contactForm = document.querySelector(".contact-form form");
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Get form data
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);

    // Simple validation
    if (!data.name || !data.phone || !data.email) {
      alert("필수 항목을 모두 입력해주세요.");
      return;
    }

    // Simulate form submission
    alert("견적 문의가 접수되었습니다. 빠른 시일 내에 연락드리겠습니다.");
    contactForm.reset();
  });
}

// Intersection Observer for Animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Observe elements for animation
document
  .querySelectorAll(".service-card, .product-item, .about-card")
  .forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(el);
  });

// Product Item Click Handler
document.querySelectorAll(".product-item").forEach((item) => {
  item.addEventListener("click", () => {
    const title = item.querySelector("h4").textContent;
    alert(`${title} 제품에 대한 자세한 정보를 보여드립니다.`);
  });
});

// Service Card Hover Effects
document.querySelectorAll(".service-card").forEach((card) => {
  card.addEventListener("mouseenter", () => {
    card.style.transform = "translateY(-10px)";
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "translateY(0)";
  });
});

// Page Load Animation
window.addEventListener("load", () => {
  // 히어로 섹션 요소들에 애니메이션 클래스 추가
  const heroTitle = document.querySelector(".hero-title");
  const heroSubtitle = document.querySelector(".hero-subtitle");
  const ctaButton = document.querySelector(".cta-button");
  const scrollDownBtn = document.querySelector(".scroll-down-btn");

  // 초기 상태 설정
  if (heroTitle) {
    heroTitle.style.opacity = "0";
    heroTitle.style.transform = "translateY(50px)";
    heroTitle.style.transition =
      "all 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
  }

  if (heroSubtitle) {
    heroSubtitle.style.opacity = "0";
    heroSubtitle.style.transform = "translateY(50px)";
    heroSubtitle.style.transition =
      "all 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
  }

  if (ctaButton) {
    ctaButton.style.opacity = "0";
    ctaButton.style.transform = "translateY(50px)";
    ctaButton.style.transition =
      "all 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
  }

  if (scrollDownBtn) {
    scrollDownBtn.style.opacity = "0";
    scrollDownBtn.style.transform = "translateX(-50%) translateY(50px)";
    scrollDownBtn.style.transition =
      "all 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
  }

  // 순차적 애니메이션 실행
  setTimeout(() => {
    if (heroTitle) {
      heroTitle.style.opacity = "1";
      heroTitle.style.transform = "translateY(0)";
    }
  }, 200);

  setTimeout(() => {
    if (heroSubtitle) {
      heroSubtitle.style.opacity = "1";
      heroSubtitle.style.transform = "translateY(0)";
    }
  }, 600);

  setTimeout(() => {
    if (ctaButton) {
      ctaButton.style.opacity = "1";
      ctaButton.style.transform = "translateY(0)";
    }
  }, 1000);

  setTimeout(() => {
    if (scrollDownBtn) {
      scrollDownBtn.style.opacity = "1";
      scrollDownBtn.style.transform = "translateX(-50%) translateY(0)";
    }
  }, 1400);
});

// Window resize event listener for quote button
window.addEventListener("resize", handleQuoteButtonResize);

// Initial call to set correct state
handleQuoteButtonResize();

// (삭제) 사이트맵 관련 코드 제거됨

console.log("인템 웹사이트가 성공적으로 로드되었습니다!");
