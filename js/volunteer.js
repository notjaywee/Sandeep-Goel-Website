(function () {
  "use strict";

  var taskCards = document.getElementById("task-cards");
  var selectedList = document.getElementById("selected-tasks-list");
  var tasksField = document.getElementById("tasks-field");
  var form = document.getElementById("signup-form");
  var formMsg = document.getElementById("form-msg");
  if (!taskCards || !form) return;

  var selected = new Set();

  function renderSelected() {
    selectedList.innerHTML = "";
    selected.forEach(function (task) {
      var li = document.createElement("li");
      li.className = "chip";
      li.textContent = task;
      selectedList.appendChild(li);
    });
    selectedList.classList.toggle("is-empty", selected.size === 0);
    tasksField.value = Array.from(selected).join(", ");
  }

  taskCards.querySelectorAll(".task-card").forEach(function (card) {
    card.addEventListener("click", function () {
      var task = card.getAttribute("data-task");
      var isSelected = card.classList.toggle("is-selected");
      if (isSelected) selected.add(task);
      else selected.delete(task);
      renderSelected();
    });
  });

  function showMessage(text, isError) {
    formMsg.textContent = text;
    formMsg.style.color = isError ? "#8a5a00" : "var(--gold-deep)";
    formMsg.classList.add("show");
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    var submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = "Submitting…";

    var params = new URLSearchParams();
    params.append("form-name", "signup-form");
    params.append("name", form.elements["name"].value);
    params.append("phone", form.elements["phone"].value);
    params.append("email", form.elements["email"].value);
    params.append("lives-in-ward", form.elements["lives-in-ward"].checked ? "Yes" : "No");
    params.append("postal-code", form.elements["postal-code"].value);
    params.append("tasks", tasksField.value);

    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString(),
    })
      .then(function (res) {
        if (!res.ok) throw new Error("Submission failed");
        showMessage("Thanks for signing up — we'll be in touch soon!", false);
        form.reset();
        selected.clear();
        taskCards.querySelectorAll(".task-card").forEach(function (c) { c.classList.remove("is-selected"); });
        renderSelected();
      })
      .catch(function () {
        showMessage("Something went wrong submitting the form. Please try again in a moment.", true);
      })
      .finally(function () {
        submitBtn.disabled = false;
        submitBtn.textContent = "Submit";
      });
  });

  renderSelected();
})();
