(function () {
  "use strict";

  /* ---------- Google Forms wiring ----------
     TODO before launch: replace FORM_ACTION_URL with the real form's formResponse
     endpoint (open the form -> the three-dot menu -> "Get pre-filled link" is the
     easiest way to read off the real action URL and entry IDs), and replace each
     ENTRY id below with the matching entry.NNNNNNNNN name from that form.
     Field set confirmed in v8 §4: name, phone, email, optional postal code,
     Ward 3/4 checkbox. Submission destination (voteforsandeep@gmail.com vs. the
     Form's own response Sheet) still needs confirming with Sandeep's team. */
  var GOOGLE_FORM = {
    actionUrl: "https://docs.google.com/forms/d/e/REPLACE_WITH_FORM_ID/formResponse",
    entries: {
      name: "entry.REPLACE_ME",
      phone: "entry.REPLACE_ME",
      email: "entry.REPLACE_ME",
      livesInWard: "entry.REPLACE_ME",
      postalCode: "entry.REPLACE_ME",
      tasks: "entry.REPLACE_ME",
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
