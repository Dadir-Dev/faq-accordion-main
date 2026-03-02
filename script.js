/**
 * FAQ Accordion - Study Notes:
 * - querySelectorAll gets all matching elements (returns NodeList)
 * - forEach loops through each question
 * - classList.add/remove controls open/closed state
 * - addEventListener can take 'keydown' for keyboard support
 * - One open question at a time (accordion behavior)
 * - height animates between 0px and scrollHeight for smooth transitions
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
});

// Update aria-expanded for all questions (for screen readers)
function updateAllAria() {
  questions.forEach((q) => {
    const btn = q.querySelector(".question-btn");
    btn.setAttribute("aria-expanded", q.classList.contains("active"));
  });
}

updateAllAria(); // Sync initial aria-expanded with existing active class in HTML

// Initialize inline heights so JS controls all accordion animations consistently
questions.forEach((question) => {
  const answer = question.querySelector(".answer");
  if (!answer) return;

  if (question.classList.contains("active")) {
    // Keep open answer at a concrete pixel height to avoid the final auto-height jump.
    answer.style.height = `${answer.scrollHeight}px`;
    return;
  }

  answer.style.height = "0px";
});
