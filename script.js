/**
 * FAQ Accordion - Study Notes:
 * - querySelectorAll gets all matching elements (returns NodeList)
 * - forEach loops through each question
 * - classList.toggle adds/removes a class
 * - addEventListener can take 'keydown' for keyboard support
 * - Only one question open at a time (accordion behavior)
 */

const questions = document.querySelectorAll(".question");

function closeQuestion(question) {
  const answer = question.querySelector(".answer");

  if (!answer) return;
  if (!question.classList.contains("active")) {
    answer.style.height = "0px";
    return;
  }

  const currentHeight = answer.scrollHeight;
  answer.style.height = `${currentHeight}px`;
  question.classList.remove("active");

  requestAnimationFrame(() => {
    answer.style.height = "0px";
  });
}

function openQuestion(question) {
  const answer = question.querySelector(".answer");

  if (!answer) return;

  question.classList.add("active");
  answer.style.height = "0px";

  requestAnimationFrame(() => {
    answer.style.height = `${answer.scrollHeight}px`;
  });
}

function toggleQuestion(question) {
  const isCurrentlyOpen = question.classList.contains("active");

  // Close all questions first (animated)
  questions.forEach((item) => closeQuestion(item));

  // If it wasn't open, open it (toggle behavior)
  if (!isCurrentlyOpen) {
    openQuestion(question);
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

  const answer = question.querySelector(".answer");

  // After expand animation, let the browser use natural content height
  if (answer) {
    answer.addEventListener("transitionend", (e) => {
      if (e.propertyName !== "height") return;
      if (question.classList.contains("active")) {
        answer.style.height = "auto";
      }
    });
  }
});

// Update aria-expanded for all questions (for screen readers)
function updateAllAria() {
  questions.forEach((q) => {
    const btn = q.querySelector(".question-btn");
    btn.setAttribute("aria-expanded", q.classList.contains("active"));
  });
}

updateAllAria(); // Set initial state (all collapsed)

// Ensure all answers start collapsed with explicit inline height
questions.forEach((question) => {
  const answer = question.querySelector(".answer");
  if (answer && !question.classList.contains("active")) {
    answer.style.height = "0px";
  }
});
