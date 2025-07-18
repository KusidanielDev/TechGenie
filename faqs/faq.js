document.addEventListener("DOMContentLoaded", function () {
  // FAQ Accordion Functionality
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");
    const icon = question.querySelector("i");

    // Initialize all answers as closed
    answer.style.maxHeight = "0";
    answer.style.padding = "0 1.5rem";

    question.addEventListener("click", () => {
      // Close all other items first
      faqItems.forEach((otherItem) => {
        if (otherItem !== item) {
          otherItem.classList.remove("active");
          otherItem.querySelector(".faq-answer").style.maxHeight = "0";
          otherItem.querySelector(".faq-answer").style.padding = "0 1.5rem";
          otherItem.querySelector(".faq-question i").style.transform =
            "rotate(0)";
        }
      });

      // Toggle current item
      const isActive = item.classList.toggle("active");

      if (isActive) {
        answer.style.maxHeight = answer.scrollHeight + "px";
        answer.style.padding = "0 1.5rem 1.5rem";
        icon.style.transform = "rotate(180deg)";
      } else {
        answer.style.maxHeight = "0";
        answer.style.padding = "0 1.5rem";
        icon.style.transform = "rotate(0)";
      }
    });

    // Handle keyboard navigation for accessibility
    question.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        question.click();
      }
    });
  });

  // Smooth scroll for anchor links from other pages
  if (window.location.hash) {
    const target = document.querySelector(window.location.hash);
    if (target) {
      setTimeout(() => {
        target.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }
});
