// result.js

const data = JSON.parse(localStorage.getItem("resultData"));

if (!data) {
  alert("No data found. Please upload a PDF first.");
} else {

  // 🔹 Title
  document.getElementById("title").innerText =
    data.title || "Scheme Details";

  // 🔹 Helper function to render lists safely
  function renderList(elementId, items) {
    const el = document.getElementById(elementId);
    el.innerHTML = "";

    if (!items || items.length === 0) {
      el.innerHTML = "<li>Not specified</li>";
      return;
    }

    items.forEach(item => {
      const li = document.createElement("li");
      li.innerText = item;
      el.appendChild(li);
    });
  }

  // 🔹 Inject data
  renderList("eligibility", data.eligibility);
  renderList("benefits", data.benefits);
  renderList("documents", data.documents_required);
  renderList("notes", data.important_notes);

  // 🔹 Steps (ordered list)
  const stepsEl = document.getElementById("steps");
  stepsEl.innerHTML = "";

  if (data.application_steps && data.application_steps.length > 0) {
    data.application_steps.forEach(step => {
      const li = document.createElement("li");
      li.innerText = step;
      stepsEl.appendChild(li);
    });
  } else {
    stepsEl.innerHTML = "<li>Not specified</li>";
  }

  // 🔹 Deadline
  document.getElementById("deadline").innerText =
    data.deadline || "Not specified";
}
