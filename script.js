/**
 * FAQ Accordion - Study Notes:
 * - querySelectorAll gets all matching elements (returns NodeList)
 * - forEach loops through each question
 * - classList.toggle adds/removes a class
 * - addEventListener can take 'keydown' for keyboard support
 * - Only one question open at a time (accordion behavior)
 */

const questions = document.querySelectorAll(".question");

function toggleQuestion(question) {
  const isCurrentlyOpen = question.classList.contains("active");

  // Close all questions first
  questions.forEach((item) => item.classList.remove("active"));

  // If it wasn't open, open it (toggle behavior)
  if (!isCurrentlyOpen) {
    question.classList.add("active");
  }

  updateAllAria();
}

questions.forEach((question) => {
  const btn = question.querySelector(".question-btn");

  // Click: toggle this question, close others
  btn.addEventListener("click", () => {
    toggleQuestion(question);
  });

  // Keyboard: Enter or Space to activate (same as click)
  btn.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " " || e.key === "Spacebar") {
      e.preventDefault();
      toggleQuestion(question);
    }
  });
});

// Update aria-expanded for all questions (for screen readers)
function updateAllAria() {
  questions.forEach((q) => {
    const btn = q.querySelector(".question-btn");
    btn.setAttribute("aria-expanded", q.classList.contains("active"));
  });
}

updateAllAria(); // Set initial state (all collapsed)
