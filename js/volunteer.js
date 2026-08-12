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

  function encodeFormData(formEl) {
    var data = new FormData(formEl);
    var params = new URLSearchParams();
    data.forEach(function (value, key) { params.append(key, value); });
    return params.toString();
  }

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

    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encodeFormData(form),
    })
      .then(function (res) {
        if (!res.ok) throw new Error("Network response was not ok");
        showMessage("Thanks for signing up — we'll be in touch soon!", false);
        form.reset();
        selected.clear();
        taskCards.querySelectorAll(".task-card").forEach(function (c) { c.classList.remove("is-selected"); });
        renderSelected();
      })
      .catch(function () {
        showMessage("Thanks for signing up! (Form submissions go live once this site is deployed on Netlify.)", true);
      })
      .finally(function () {
        submitBtn.disabled = false;
        submitBtn.textContent = "Submit";
      });
  });

  renderSelected();
})();
