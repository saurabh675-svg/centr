const goalOutput = document.getElementById("goal-output");
const contributionOutput = document.getElementById("contribution-output");
const timelineOutput = document.getElementById("timeline-output");
const habitOutput = document.getElementById("habit-output");
const momentumBar = document.getElementById("momentum-bar");
const planForm = document.getElementById("plan-form");
const focusFormButton = document.getElementById("focus-form");
const loadTemplateButton = document.getElementById("load-template");

const templates = [
  {
    goal: "$80,000 career runway",
    current: 20000,
    target: 80000,
    monthly: 1400,
    extra: 300,
    habit: "Schedule a monthly side-income review",
  },
  {
    goal: "$35,000 emergency fund",
    current: 7000,
    target: 35000,
    monthly: 700,
    extra: 200,
    habit: "Negotiate one bill this week",
  },
  {
    goal: "$120,000 down payment",
    current: 45000,
    target: 120000,
    monthly: 1800,
    extra: 600,
    habit: "Automate a 1% savings raise",
  },
];

const formatCurrency = (value) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

const calculateTimeline = ({ current, target, monthly, extra }) => {
  const monthlyTotal = monthly + extra;
  if (monthlyTotal <= 0) {
    return Infinity;
  }
  const remaining = Math.max(0, target - current);
  return Math.ceil(remaining / monthlyTotal);
};

const updatePreview = ({ goal, current, target, monthly, extra, habit }) => {
  const monthlyTotal = monthly + extra;
  const months = calculateTimeline({ current, target, monthly, extra });
  const progress = target > 0 ? (current / target) * 100 : 0;

  goalOutput.textContent = goal;
  contributionOutput.textContent = `${formatCurrency(monthlyTotal)}/month`;
  timelineOutput.textContent =
    months === Infinity ? "Add a monthly contribution" : `${months} months to target`;
  habitOutput.textContent = habit;
  momentumBar.style.width = `${clamp(Math.round(progress), 8, 100)}%`;
};

const getFormValues = () => ({
  goal: planForm.goal.value,
  current: Number(planForm.current.value),
  target: Number(planForm.target.value),
  monthly: Number(planForm.monthly.value),
  extra: Number(planForm.extra.value),
  habit: planForm.habit.value,
});

planForm.addEventListener("submit", (event) => {
  event.preventDefault();
  updatePreview(getFormValues());
});

focusFormButton.addEventListener("click", () => {
  planForm.scrollIntoView({ behavior: "smooth" });
  planForm.goal.focus();
});

loadTemplateButton.addEventListener("click", () => {
  const pick = templates[Math.floor(Math.random() * templates.length)];
  planForm.goal.value = pick.goal;
  planForm.current.value = pick.current;
  planForm.target.value = pick.target;
  planForm.monthly.value = pick.monthly;
  planForm.extra.value = pick.extra;
  planForm.habit.value = pick.habit;
  updatePreview(pick);
});

updatePreview(getFormValues());
