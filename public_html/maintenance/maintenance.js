// Maintenance Page JavaScript

// Client Tab Functionality
document.addEventListener("DOMContentLoaded", () => {
  const clientTabBtns = document.querySelectorAll(".client-tab-btn");
  const clientTabContents = document.querySelectorAll(".client-tab-content");

  clientTabBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Remove active class from all buttons and contents
      clientTabBtns.forEach((b) => b.classList.remove("active"));
      clientTabContents.forEach((c) => c.classList.remove("active"));

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

  // Form Submission
  const maintenanceForm = document.getElementById("maintenanceForm");
  if (maintenanceForm) {
    maintenanceForm.addEventListener("submit", (e) => {
      e.preventDefault();

      // Get form data
      const formData = new FormData(maintenanceForm);
      const data = Object.fromEntries(formData);

      // Simple validation
      if (!data.name || !data.phone || !data.email) {
        alert("필수 항목을 모두 입력해주세요.");
        return;
      }

      // Simulate form submission
      alert("견적 문의가 접수되었습니다. 빠른 시일 내에 연락드리겠습니다.");
      maintenanceForm.reset();
    });
  }

  // Smooth scroll for anchor links
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
});

