const goalOutput = document.getElementById("goal-output");
const timelineOutput = document.getElementById("timeline-output");
const habitOutput = document.getElementById("habit-output");
const momentumOutput = document.getElementById("momentum-output");
const momentumBar = document.getElementById("momentum-bar");
const planForm = document.getElementById("plan-form");
const startPlanButton = document.getElementById("start-plan");
const surpriseButton = document.getElementById("surprise-me");

const surprisePlans = [
  {
    goal: "$100k career runway",
    timeline: 24,
    habit: "Invoice one client follow-up",
    momentum: 6,
  },
  {
    goal: "$75k home down payment",
    timeline: 30,
    habit: "Sell one unused item",
    momentum: 12,
  },
  {
    goal: "Debt-free in 18 months",
    timeline: 18,
    habit: "Call one bill to negotiate",
    momentum: 8,
  },
];

const updatePreview = ({ goal, timeline, habit, momentum }) => {
  goalOutput.textContent = goal;
  timelineOutput.textContent = `${timeline} months`;
  habitOutput.textContent = habit;
  momentumOutput.textContent = `Day ${momentum} streak`;

  const percent = Math.min(100, Math.max(10, Math.round((momentum / 30) * 100)));
  momentumBar.style.width = `${percent}%`;
};

planForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(planForm);
  updatePreview({
    goal: formData.get("goal"),
    timeline: formData.get("timeline"),
    habit: formData.get("habit"),
    momentum: formData.get("momentum"),
  });
});

startPlanButton.addEventListener("click", () => {
  const goal = prompt("What's your wealth goal?", "Build a $20k safety net");
  if (goal) {
    planForm.goal.value = goal;
  }
  planForm.scrollIntoView({ behavior: "smooth" });
});

surpriseButton.addEventListener("click", () => {
  const pick = surprisePlans[Math.floor(Math.random() * surprisePlans.length)];
  planForm.goal.value = pick.goal;
  planForm.timeline.value = pick.timeline;
  planForm.habit.value = pick.habit;
  planForm.momentum.value = pick.momentum;
  updatePreview(pick);
});
