// CONNECTION 2026 - Round 1 Quiz
const TOTAL_QUESTIONS = 20;
const QUIZ_TIME = 15 * 60;

let currentQuestion = 0;
let timeLeft = QUIZ_TIME;
let answers = new Array(TOTAL_QUESTIONS).fill(null);

const questions = Array.from({ length: TOTAL_QUESTIONS }, (_, i) => ({
  question: `Sample Question ${i + 1}`,
  options: [
    `Option A for Question ${i + 1}`,
    `Option B for Question ${i + 1}`,
    `Option C for Question ${i + 1}`,
    `Option D for Question ${i + 1}`
  ]
}));

const $ = id => document.getElementById(id);

const qNo = $("questionNumber");
const qText = $("questionText");
const timer = $("timer");
const answered = $("answeredCount");
const progress = $("progressFill");
const saveStatus = $("saveStatus");

const optionElements = {
  A: $("optionA"),
  B: $("optionB"),
  C: $("optionC"),
  D: $("optionD")
};

const optionButtons = document.querySelectorAll(".option-btn");

function renderQuestion() {
  const q = questions[currentQuestion];

  qNo.textContent = `${currentQuestion + 1} / ${TOTAL_QUESTIONS}`;
  qText.textContent = q.question;

  optionElements.A.textContent = q.options[0];
  optionElements.B.textContent = q.options[1];
  optionElements.C.textContent = q.options[2];
  optionElements.D.textContent = q.options[3];

  optionButtons.forEach(btn => {
    btn.style.border = "2px solid transparent";
    if (answers[currentQuestion] === btn.dataset.option) {
      btn.style.border = "2px solid #22c55e";
    }
  });

  updateProgress();
}

function updateProgress() {
  const count = answers.filter(Boolean).length;
  answered.textContent = count;
  progress.style.width = `${(count / TOTAL_QUESTIONS) * 100}%`;
}

optionButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    answers[currentQuestion] = btn.dataset.option;
    saveStatus.textContent = "Saved ✓";
    renderQuestion();
  });
});

$("nextBtn").onclick = () => {
  if (currentQuestion < TOTAL_QUESTIONS - 1) {
    currentQuestion++;
    renderQuestion();
  }
};

$("prevBtn").onclick = () => {
  if (currentQuestion > 0) {
    currentQuestion--;
    renderQuestion();
  }
};

const nav = $("navigatorGrid");
for (let i = 0; i < TOTAL_QUESTIONS; i++) {
  const b = document.createElement("button");
  b.textContent = i + 1;
  b.onclick = () => {
    currentQuestion = i;
    renderQuestion();
  };
  nav.appendChild(b);
}

function updateTimer() {
  const m = Math.floor(timeLeft / 60);
  const s = timeLeft % 60;
  timer.textContent = `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;

  if (timeLeft <= 0) {
    submitQuiz();
    return;
  }

  timeLeft--;
}

setInterval(updateTimer, 1000);
updateTimer();

function submitQuiz() {
  alert("Round 1 Submitted!");
  console.log(answers);
  // Future:
  // fetch('/api/round1/submit', ...)
}

$("submitBtn").onclick = () => {
  if (confirm("Submit Round 1?")) {
    submitQuiz();
  }
};

document.addEventListener("keydown", e => {
  const map = { a: "A", b: "B", c: "C", d: "D" };

  if (map[e.key.toLowerCase()]) {
    answers[currentQuestion] = map[e.key.toLowerCase()];
    renderQuestion();
  }

  if (e.key === "ArrowRight") $("nextBtn").click();
  if (e.key === "ArrowLeft") $("prevBtn").click();
});

renderQuestion();
