(function () {
  "use strict";

  /* ---------- Google Forms wiring ----------
     Field set confirmed in v8 §4: name, phone, email, optional postal code,
     Ward 3/4 checkbox. Submissions route to voteforsandeep@gmail.com via the
     Form's own "email notifications for new responses" setting (Responses
     tab), since the Form was created under that account. */
  var GOOGLE_FORM = {
    actionUrl: "https://docs.google.com/forms/d/e/1FAIpQLSfbD8Mw28hL7Ln9lNWVgMiZZ6Sl4ZWfwmN9y449iy2EQctIRg/formResponse",
    entries: {
      name: "entry.571925108",
      phone: "entry.149487316",
      email: "entry.1395770416",
      livesInWard: "entry.193922718",
      postalCode: "entry.1585690799",
      tasks: "entry.1699241462",
    },
  };
  var GOOGLE_FORM_READY = GOOGLE_FORM.actionUrl.indexOf("REPLACE_WITH_FORM_ID") === -1;

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

  function encodeForGoogleForm(formEl) {
    var params = new URLSearchParams();
    params.append(GOOGLE_FORM.entries.name, formEl.elements["name"].value);
    params.append(GOOGLE_FORM.entries.phone, formEl.elements["phone"].value);
    params.append(GOOGLE_FORM.entries.email, formEl.elements["email"].value);
    params.append(GOOGLE_FORM.entries.livesInWard, formEl.elements["lives-in-ward"].checked ? "Yes" : "No");
    params.append(GOOGLE_FORM.entries.postalCode, formEl.elements["postal-code"].value);
    params.append(GOOGLE_FORM.entries.tasks, tasksField.value);
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

    if (!GOOGLE_FORM_READY) {
      showMessage("Form isn't wired up yet — needs a real Google Form URL (see js/volunteer.js).", true);
      return;
    }

    var submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = "Submitting…";

    /* Google Forms' formResponse endpoint doesn't send CORS headers, so this
       request has to be no-cors — the response is opaque and always looks
       "successful" to fetch() even if the entry IDs are wrong. Double-check
       an actual submission lands in the form's response Sheet after wiring
       in the real IDs above. */
    fetch(GOOGLE_FORM.actionUrl, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encodeForGoogleForm(form),
    })
      .then(function () {
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
