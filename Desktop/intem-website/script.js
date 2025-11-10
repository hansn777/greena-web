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

// Header Scroll Effect - 최적화된 버전
let scrollTimeout;
const SCROLL_THRESHOLD = 100;
const BLUR_VALUE = "blur(12px) saturate(140%)";
const BG_COLOR_GLASS = "rgb(219 219 219 / 10%)";
const BG_COLOR_SCROLLED = "rgba(255, 255, 255, 0.2)";

// 요소 캐싱 (성능 최적화)
const scrollElements = {
  header: null,
  navContainer: null,
  megaMenuBg: null,
  navMenuLinks: null,
  hamburgerSpans: null,
  asset9Image: null,
  aboutSection: null,
};

// 초기 요소 캐싱
function cacheScrollElements() {
  scrollElements.header = document.querySelector(".header");
  scrollElements.navContainer = document.querySelector(".nav-container");
  scrollElements.megaMenuBg = document.querySelector(".navbar_hoveredMenuBg");
  scrollElements.navMenuLinks = document.querySelectorAll(".nav-menu a");
  scrollElements.hamburgerSpans = document.querySelectorAll(".hamburger span");
  const logoImages = document.querySelectorAll(".logo-img");
  scrollElements.asset9Image = logoImages.length > 1 ? logoImages[1] : null;
  scrollElements.aboutSection = document.querySelector(".about");
}

// 스크롤 효과 적용 함수
function applyScrollEffects(isScrolled) {
  const {
    header,
    navContainer,
    megaMenuBg,
    navMenuLinks,
    hamburgerSpans,
    asset9Image,
  } = scrollElements;

  if (!header || !navContainer) return;

  if (isScrolled) {
    // 100px 이상: 스크롤된 상태
    header.style.background = "#ffffff";
    header.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)";

    // nav-container와 megaMenuBg 동시 효과 적용
    navContainer.style.background = BG_COLOR_SCROLLED;
    navContainer.style.backdropFilter = "";
    navContainer.style.webkitBackdropFilter = "";
    navContainer.style.removeProperty("backdrop-filter");
    navContainer.style.removeProperty("-webkit-backdrop-filter");

    if (megaMenuBg) {
      megaMenuBg.style.background = "#ffffff";
      megaMenuBg.style.backdropFilter = "";
      megaMenuBg.style.webkitBackdropFilter = "";
      megaMenuBg.style.removeProperty("backdrop-filter");
      megaMenuBg.style.removeProperty("-webkit-backdrop-filter");
      // !important로 강제 적용
      megaMenuBg.style.setProperty("background", "#ffffff", "important");
      megaMenuBg.style.setProperty("backdrop-filter", "none", "important");
      megaMenuBg.style.setProperty(
        "-webkit-backdrop-filter",
        "none",
        "important"
      );
    }

    // 텍스트 색상 변경
    navMenuLinks.forEach((link) => {
      link.style.color = "#333";
    });
    hamburgerSpans.forEach((span) => {
      span.style.background = "#333";
    });
    if (asset9Image) {
      asset9Image.style.filter = "brightness(0) saturate(100%)";
    }
  } else {
    // 0px~100px: 글래스모피즘 상태
    header.style.background = "transparent";
    header.style.boxShadow = "none";

    // nav-container와 megaMenuBg 동시 효과 적용
    navContainer.style.background = BG_COLOR_GLASS;
    navContainer.style.backdropFilter = BLUR_VALUE;
    navContainer.style.webkitBackdropFilter = BLUR_VALUE;

    if (megaMenuBg) {
      megaMenuBg.style.background = BG_COLOR_GLASS;
      megaMenuBg.style.backdropFilter = BLUR_VALUE;
      megaMenuBg.style.webkitBackdropFilter = BLUR_VALUE;
      // !important로 강제 적용
      megaMenuBg.style.setProperty("background", BG_COLOR_GLASS, "important");
      megaMenuBg.style.setProperty("backdrop-filter", BLUR_VALUE, "important");
      megaMenuBg.style.setProperty(
        "-webkit-backdrop-filter",
        BLUR_VALUE,
        "important"
      );
    }

    // 텍스트 색상 변경
    navMenuLinks.forEach((link) => {
      link.style.color = "#ffffff";
    });
    hamburgerSpans.forEach((span) => {
      span.style.background = "#ffffff";
    });
    if (asset9Image) {
      asset9Image.style.filter = "none";
    }
  }
}

// 스크롤 이벤트 핸들러 (throttle 적용)
window.addEventListener("scroll", () => {
  // Throttle: 16ms마다 실행 (약 60fps)
  if (scrollTimeout) {
    return;
  }

  scrollTimeout = requestAnimationFrame(() => {
    const isScrolled = window.scrollY > SCROLL_THRESHOLD;
    applyScrollEffects(isScrolled);

    // 호버 중에도 스크롤 효과가 적용되도록 강제 업데이트
    if (scrollElements.megaMenuBg) {
      const megaMenuBg = scrollElements.megaMenuBg;
      if (isScrolled) {
        megaMenuBg.style.setProperty("background", "#ffffff", "important");
        megaMenuBg.style.setProperty("backdrop-filter", "none", "important");
        megaMenuBg.style.setProperty(
          "-webkit-backdrop-filter",
          "none",
          "important"
        );
      } else {
        megaMenuBg.style.setProperty("background", BG_COLOR_GLASS, "important");
        megaMenuBg.style.setProperty(
          "backdrop-filter",
          BLUR_VALUE,
          "important"
        );
        megaMenuBg.style.setProperty(
          "-webkit-backdrop-filter",
          BLUR_VALUE,
          "important"
        );
      }
    }

    // About section text color change
    if (scrollElements.aboutSection && scrollElements.navContainer) {
      const aboutRect = scrollElements.aboutSection.getBoundingClientRect();
      const navHeight = scrollElements.navContainer.offsetHeight;

      if (navHeight <= 5) {
        const aboutTextH2 =
          scrollElements.aboutSection.querySelector(".about-text h2");
        const aboutTextP =
          scrollElements.aboutSection.querySelector(".about-text p");
        const aboutCardH3 =
          scrollElements.aboutSection.querySelectorAll(".about-card h3");

        if (aboutTextH2) aboutTextH2.style.color = "#ffffff";
        if (aboutTextP) aboutTextP.style.color = "#ffffff";
        aboutCardH3.forEach((h3) => {
          h3.style.color = "#ffffff";
        });
      } else {
        const aboutTextH2 =
          scrollElements.aboutSection.querySelector(".about-text h2");
        const aboutTextP =
          scrollElements.aboutSection.querySelector(".about-text p");
        const aboutCardH3 =
          scrollElements.aboutSection.querySelectorAll(".about-card h3");

        if (aboutTextH2) aboutTextH2.style.color = "#333";
        if (aboutTextP) aboutTextP.style.color = "#666";
        aboutCardH3.forEach((h3) => {
          h3.style.color = "#333";
        });
      }
    }

    scrollTimeout = null;
  });
});

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

// Mega Menu는 스크롤 이벤트에서만 처리 (호버 이벤트 제거로 충돌 방지)

// Hero carousel
(function () {
  const slides = Array.from(document.querySelectorAll(".hero-slide"));
  const idxCurrent = document.querySelector(".hero-idx.current");
  const idxTotal = document.querySelector(".hero-idx.total");
  const prevBtn = document.querySelector(".hero-arrows .prev");
  const nextBtn = document.querySelector(".hero-arrows .next");
  const heroTitle = document.querySelector(".hero-title");
  const heroSubtitle = document.querySelector(".hero-subtitle");
  let current = 0;
  const durationMs = 5000;

  // 슬라이드별 텍스트 내용
  const slideContents = [
    {
      highlight: "그린에이",
      title: "공기의 가치를 새롭게",
      subtitle: "매일 더 깨끗한 공기, 그린에이와 함께 해보세요",
    },
    {
      highlight: "전문가의 관리가",
      title: "공기를 더 진심으로",
      subtitle: "매 순간 깨끗한 공기를 위한 맞춤 케어 솔루션",
    },
    {
      highlight: "실내 공기관리,",
      title: "번거로움 없이 맡기세요",
      subtitle: "렌탈부터 유지관리까지 원스톱 케어 서비스",
    },
  ];

  function pad2(n) {
    return String(n).padStart(2, "0");
  }

  function setSlide(i) {
    slides.forEach((s, si) => s.classList.toggle("active", si === i));
    const nextIdx = (i + 1) % slides.length;
    if (idxCurrent) idxCurrent.textContent = pad2(i + 1);
    if (idxTotal) idxTotal.textContent = pad2(nextIdx + 1);
    current = i;

    // 텍스트 내용 변경
    if (heroTitle && heroSubtitle && slideContents[i]) {
      const content = slideContents[i];
      const highlightSpan = heroTitle.querySelector(".highlight");
      if (highlightSpan) {
        highlightSpan.textContent = content.highlight;
      }
      // highlight 다음의 텍스트를 찾아서 변경
      const titleText = heroTitle.childNodes;
      for (let j = 0; j < titleText.length; j++) {
        if (titleText[j].nodeType === 3 && titleText[j].textContent.trim()) {
          // 텍스트 노드이고 <br> 다음의 텍스트
          if (j > 0 && titleText[j - 1].tagName === "BR") {
            titleText[j].textContent = content.title;
            break;
          }
        }
      }
      // 또는 더 간단하게: hero-title의 구조를 확인하고 적절히 변경
      heroTitle.innerHTML = `<span class="highlight">${content.highlight}</span><br />${content.title}`;
      heroSubtitle.textContent = content.subtitle;
    }

    // restart progress bar
    const fill = document.querySelector(".hero-progress-fill");
    if (fill) {
      fill.style.setProperty("--slide-duration", durationMs / 1000 + "s");
      fill.classList.remove("animating");
      void fill.offsetWidth; // reflow to restart animation
      fill.classList.add("animating");
    }
  }

  if (prevBtn)
    prevBtn.addEventListener("click", () =>
      setSlide((current - 1 + slides.length) % slides.length)
    );
  if (nextBtn)
    nextBtn.addEventListener("click", () =>
      setSlide((current + 1) % slides.length)
    );

  // Auto-rotate with reduced-motion respect
  const autoTimer = () => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const next = (current + 1) % slides.length;
    setSlide(next);
  };
  setInterval(autoTimer, durationMs);

  // Initialize
  if (slides.length > 0) {
    setSlide(0);
  }
})();

// Window resize event listener for quote button
window.addEventListener("resize", handleQuoteButtonResize);

// Initial call to set correct state
handleQuoteButtonResize();

// 페이지 로드 시 초기 상태 설정
document.addEventListener("DOMContentLoaded", () => {
  cacheScrollElements();
  const isScrolled = window.scrollY > SCROLL_THRESHOLD;
  applyScrollEffects(isScrolled);
});

// (삭제) 사이트맵 관련 코드 제거됨

// 스크롤 시 메가 메뉴 텍스트 색상 변경
window.addEventListener("scroll", () => {
  const scrolled = window.scrollY > 100;
  document.body.classList.toggle("scrolled", scrolled);
});

console.log("인템 웹사이트가 성공적으로 로드되었습니다!");
