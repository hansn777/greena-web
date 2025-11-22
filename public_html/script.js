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

// Smooth Scrolling for Navigation Links (다른 페이지로 이동하는 링크는 제외)
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    // 같은 페이지 내 해시 링크만 처리 (다른 페이지의 해시는 제외)
    if (href && !href.includes(".html")) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
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
  navSubBtns: null,
};

// 초기 요소 캐싱
function cacheScrollElements() {
  scrollElements.header = document.querySelector(".header");
  // nav-container 또는 navTop_container__E1TtP 찾기
  scrollElements.navContainer =
    document.querySelector(".nav-container") ||
    document.querySelector(".navTop_container__E1TtP");
  scrollElements.megaMenuBg = document.querySelector(".navbar_hoveredMenuBg");
  scrollElements.navMenuLinks = document.querySelectorAll(".nav-menu a");
  scrollElements.hamburgerSpans = document.querySelectorAll(".hamburger span");
  scrollElements.navSubBtns = document.querySelectorAll(".nav-sub-btn");
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
    navSubBtns,
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
    // nav-sub-btn 색상 변경
    if (navSubBtns) {
      navSubBtns.forEach((btn) => {
        btn.style.background = "rgba(0, 0, 0, 0.05)";
        btn.style.color = "#333";
        btn.style.borderColor = "rgba(0, 0, 0, 0.1)";
      });
    }
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
    // nav-sub-btn 색상 변경
    if (navSubBtns) {
      navSubBtns.forEach((btn) => {
        btn.style.background = "rgba(255, 255, 255, 0.1)";
        btn.style.color = "#ffffff";
        btn.style.borderColor = "rgba(255, 255, 255, 0.2)";
      });
    }
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

// NHN Style Products Section - Slider and Hover Effects
document.addEventListener("DOMContentLoaded", () => {
  const productCards = document.querySelectorAll(
    ".products li.relative.h-526.w-224"
  );
  const sliderTrack = document.getElementById("productsSliderTrack");
  const navButtons = document.querySelectorAll(".products-nav-btn");
  const sliderList = document.querySelector(".products-slider-list");
  const sliderContainer = document.querySelector(".products-slider-container");

  if (!sliderTrack || !navButtons.length || !sliderList || !sliderContainer)
    return;

  // 반응형 브레이크포인트 상수
  const BREAKPOINTS = {
    mobile: 480,
    tablet: 860,
    desktop: 1360,
  };

  // 카드 너비와 간격 계산 함수 (반응형 대응)
  const getCardWidth = () => {
    const viewportWidth = window.innerWidth;
    const containerWidth =
      sliderContainer.offsetWidth ||
      sliderContainer.clientWidth ||
      viewportWidth;

    // 반응형에 따라 카드 너비 결정
    if (viewportWidth <= BREAKPOINTS.mobile) {
      // 모바일: 화면 너비 - 패딩
      return Math.max(containerWidth - 48, 280);
    } else if (viewportWidth <= BREAKPOINTS.tablet) {
      // 태블릿: 화면 너비 - 패딩
      return Math.max(containerWidth - 48, 320);
    } else if (viewportWidth <= BREAKPOINTS.desktop) {
      // 작은 데스크톱: 컨테이너 너비
      return containerWidth;
    } else {
      // 큰 데스크톱: 컨테이너 너비 (최대 1920px)
      return Math.min(containerWidth, 1920);
    }
  };

  const cardGap = 20; // space-x-20
  let cardWidth = getCardWidth();
  let cardTotalWidth = cardWidth + cardGap;

  // 컨테이너 너비와 중앙 위치 계산 함수 (리사이즈 시에도 사용)
  const getCenterOffset = (targetCardWidth = cardWidth) => {
    const containerWidth =
      sliderContainer.offsetWidth || sliderContainer.clientWidth;
    // 컨테이너 너비가 0이면 기본값 사용
    if (containerWidth === 0) {
      const viewportWidth = window.innerWidth;
      // 카드의 중앙이 화면 중앙에 오도록 계산
      // 컨테이너 중앙 - 카드 중앙 = (containerWidth / 2) - (카드 왼쪽 끝 + cardWidth / 2)
      // 카드 왼쪽 끝 위치 = (containerWidth - cardWidth) / 2
      return (viewportWidth - targetCardWidth) / 2;
    }
    // 컨테이너의 중앙에서 카드 너비의 절반을 뺀 위치
    // 이렇게 하면 카드의 중앙이 컨테이너 중앙에 정확히 위치함
    return (containerWidth - targetCardWidth) / 2;
  };

  // 초기 위치 설정 (첫 번째 카드가 화면에 보이도록)
  let currentIndex = 0;
  let centerOffset = getCenterOffset(cardWidth);

  // 카드 크기 업데이트 함수 (반응형 대응)
  const updateCardSizes = () => {
    const newCardWidth = getCardWidth();
    const viewportWidth = window.innerWidth;

    // 반응형에 따라 높이도 조정
    let cardHeight = 526;
    if (viewportWidth <= BREAKPOINTS.mobile) {
      cardHeight = Math.max(200, (newCardWidth * 526) / 224); // 비율 유지
    } else if (viewportWidth <= BREAKPOINTS.tablet) {
      cardHeight = Math.max(300, (newCardWidth * 526) / 224);
    }

    // 카드 크기 업데이트
    productCards.forEach((card) => {
      card.style.width = `${newCardWidth}px`;
      card.style.height = `${cardHeight}px`;
    });

    // 컨테이너 높이도 업데이트
    sliderContainer.style.height = `${cardHeight}px`;

    return newCardWidth;
  };

  // 초기화 함수 (최적화된 버전)
  function initializeSlider() {
    // 카드 너비 및 크기 업데이트
    cardWidth = updateCardSizes();
    cardTotalWidth = cardWidth + cardGap;
    centerOffset = getCenterOffset(cardWidth);
    currentIndex = 0;

    // 첫 번째 카드에 active 클래스 추가
    if (productCards[0] && !productCards[0].classList.contains("active")) {
      productCards[0].classList.add("active");
    }

    // 첫 번째 카드가 화면 중앙에 오도록 설정
    const initialTranslateX = centerOffset - 0 * cardTotalWidth;

    // 초기화 시에는 transition 없이 즉시 이동
    sliderTrack.style.transition = "none";
    sliderTrack.style.transform = `translateX(${initialTranslateX}px)`;

    // 다음 프레임에서 transition 다시 활성화
    requestAnimationFrame(() => {
      sliderTrack.style.transition = "";
    });
  }

  // 초기화 실행 (한 번만)
  requestAnimationFrame(() => {
    initializeSlider();
  });

  // 슬라이드 이동 함수 (네비게이션 버튼과 카드 클릭 시 공통 사용)
  const moveToSlide = (index) => {
    // 유효성 검사
    if (index < 0 || index >= productCards.length) return;

    // 이미 활성화된 인덱스면 무시
    if (currentIndex === index) return;

    // 카드 너비 및 크기 재계산 (반응형 대응)
    cardWidth = updateCardSizes();
    cardTotalWidth = cardWidth + cardGap;

    // centerOffset 재계산
    centerOffset = getCenterOffset(cardWidth);

    // 모든 버튼에서 active 제거
    navButtons.forEach((btn) => {
      btn.classList.remove("active");
      btn.classList.remove("cursor-default");
      btn.style.fontWeight = "400";
    });

    // 모든 카드에서 active 제거 (강제 리플로우를 위해 약간의 지연)
    productCards.forEach((card) => {
      card.classList.remove("active");
    });

    // requestAnimationFrame을 사용하여 브라우저 리플로우 보장
    requestAnimationFrame(() => {
      // 클릭한 버튼에 active 추가
      if (navButtons[index]) {
        navButtons[index].classList.add("active");
        navButtons[index].classList.add("cursor-default");
        navButtons[index].style.fontWeight = "500";
      }

      // 클릭한 카드에 active 추가 (풀사이즈로 보이도록)
      if (productCards[index]) {
        productCards[index].classList.add("active");
      }

      // 슬라이드 이동 - 클릭된 카드가 화면 중앙에 오도록 계산
      currentIndex = index;
      // 카드의 중앙이 컨테이너 중앙에 오도록 계산
      // 슬라이더 트랙의 초기 위치(0)에서 시작하여
      // 클릭된 카드의 왼쪽 끝이 centerOffset 위치에 오도록 이동
      const translateX = centerOffset - index * cardTotalWidth;
      sliderTrack.style.transform = `translateX(${translateX}px)`;
    });
  };

  // 네비게이션 버튼 클릭 이벤트
  navButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      moveToSlide(index);
    });
  });

  // 카드 클릭 이벤트
  productCards.forEach((card, index) => {
    card.addEventListener("click", (e) => {
      // 링크가 있는 경우 링크 클릭을 방지하지 않도록 처리
      const link = card.querySelector("a");
      if (link && e.target.closest("a")) {
        // 링크를 클릭한 경우는 기본 동작 허용
        return;
      }
      moveToSlide(index);
    });
  });

  // 초기 상태는 setTimeout 내에서 설정됨

  productCards.forEach((card) => {
    const hiddenContent = card.querySelector("[hidden]");
    const gradientOverlay = card.querySelector(".gradient-overlay");

    card.addEventListener("mouseenter", () => {
      if (hiddenContent) {
        hiddenContent.style.display = "block";
        hiddenContent.style.visibility = "visible";
        hiddenContent.style.opacity = "1";
        hiddenContent.style.willChange = "auto";
      }
      if (gradientOverlay) {
        gradientOverlay.style.background =
          "linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.7))";
      }
    });

    card.addEventListener("mouseleave", () => {
      if (hiddenContent) {
        hiddenContent.style.display = "none";
        hiddenContent.style.visibility = "hidden";
        hiddenContent.style.opacity = "0";
        hiddenContent.style.willChange = "auto";
      }
      if (gradientOverlay) {
        gradientOverlay.style.background =
          "linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.5))";
      }
    });
  });

  // Scroll Animation for Header
  const headerElement =
    document.querySelector(".products .z-1.w-full") ||
    document.querySelector(".z-1.w-full");
  if (headerElement) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            headerElement.style.opacity = "1";
            headerElement.style.transform = "translateY(0) translateZ(0)";
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(headerElement);
  }

  // 윈도우 리사이즈 시 위치 재계산 (최적화된 버전)
  let resizeTimeout;
  const handleResize = () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      // 카드 너비 및 크기 업데이트
      cardWidth = updateCardSizes();
      cardTotalWidth = cardWidth + cardGap;

      // centerOffset 재계산
      centerOffset = getCenterOffset(cardWidth);

      // 현재 활성화된 인덱스의 카드가 중앙에 오도록 재계산
      const translateX = centerOffset - currentIndex * cardTotalWidth;
      sliderTrack.style.transform = `translateX(${translateX}px)`;
    }, 150); // 디바운스 시간 단축 (250ms -> 150ms)
  };

  window.addEventListener("resize", handleResize);
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

console.log("그린에이 웹사이트가 성공적으로 로드되었습니다!");

// Floating Action Button
document.addEventListener("DOMContentLoaded", () => {
  const floatMainBtn = document.getElementById("floatMainBtn");
  const floatMenu = document.getElementById("floatMenu");
  const floatLabelButton = document.getElementById("floatLabelButton");
  const floatContainer = document.getElementById("floatContainer");

  // 플로팅 메뉴 열기/닫기 함수
  const toggleFloatMenu = () => {
    if (floatMainBtn && floatMenu) {
      const isActive = floatMainBtn.classList.toggle("active");
      floatMenu.classList.toggle("active");

      // 라벨 버튼 표시/숨김 제어
      if (floatLabelButton) {
        if (isActive) {
          // 클릭 시 즉시 숨기기 (애니메이션 없이)
          floatLabelButton.style.transition = "none";
          floatLabelButton.style.opacity = "0";
          floatLabelButton.style.visibility = "hidden";
          floatLabelButton.style.pointerEvents = "none";
          floatLabelButton.style.transform = "translateY(-10px)";
          // 다음 프레임에서 transition 복원 (다시 표시할 때 애니메이션 적용)
          requestAnimationFrame(() => {
            floatLabelButton.style.transition = "";
          });
        } else {
          // 다시 표시할 때는 애니메이션 적용
          floatLabelButton.style.transition = "";
          floatLabelButton.style.opacity = "1";
          floatLabelButton.style.visibility = "visible";
          floatLabelButton.style.pointerEvents = "auto";
          floatLabelButton.style.transform = "translateY(0)";
        }
      }
    }
  };

  if (floatMainBtn && floatMenu) {
    // 메인 버튼 클릭 시 메뉴 토글
    floatMainBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleFloatMenu();
    });

    // 라벨 버튼 클릭 시 메뉴 토글
    if (floatLabelButton) {
      floatLabelButton.addEventListener("click", (e) => {
        e.stopPropagation();
        toggleFloatMenu();
      });
    }

    // 메뉴 외부 클릭 시 닫기
    document.addEventListener("click", (e) => {
      if (
        floatContainer &&
        !floatContainer.contains(e.target) &&
        floatMenu.classList.contains("active")
      ) {
        floatMainBtn.classList.remove("active");
        floatMenu.classList.remove("active");

        // 라벨 버튼 다시 표시 (애니메이션 적용)
        if (floatLabelButton) {
          floatLabelButton.style.transition = "";
          floatLabelButton.style.opacity = "1";
          floatLabelButton.style.visibility = "visible";
          floatLabelButton.style.pointerEvents = "auto";
          floatLabelButton.style.transform = "translateY(0)";
        }
      }
    });

    // ESC 키로 닫기
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        floatMainBtn.classList.remove("active");
        floatMenu.classList.remove("active");

        // 라벨 버튼 다시 표시 (애니메이션 적용)
        if (floatLabelButton) {
          floatLabelButton.style.transition = "";
          floatLabelButton.style.opacity = "1";
          floatLabelButton.style.visibility = "visible";
          floatLabelButton.style.pointerEvents = "auto";
          floatLabelButton.style.transform = "translateY(0)";
        }
      }
    });
  }
});
