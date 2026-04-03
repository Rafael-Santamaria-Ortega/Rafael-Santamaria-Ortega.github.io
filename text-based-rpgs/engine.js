// ─── Core display helpers ───────────────────────────────────────────────────

function setStoryText(html) {
  document.getElementById("storyText").innerHTML = html;
}

function appendStoryText(html) {
  document.getElementById("storyText").innerHTML += html;
}

function clearChoices() {
  document.getElementById("choicesContainer").innerHTML = "";
}

// ─── Pagination helpers ─────────────────────────────────────────────────────

function showContinueHint() {
  const hint = document.createElement("p");
  hint.id = "continueHint";
  hint.innerHTML = "<em>Press Enter to continue...</em>";
  document.getElementById("storyText").appendChild(hint);
}

function removeContinueHint() {
  document.getElementById("continueHint")?.remove();
}

function waitForEnter(callback) {
  showContinueHint();
  function handleKey(e) {
    if (e.key === "Enter") {
      document.removeEventListener("keydown", handleKey);
      removeContinueHint();
      callback();
    }
  }
  document.addEventListener("keydown", handleKey);
}

// ─── Choice renderer ────────────────────────────────────────────────────────

function showChoices(choices) {
  clearChoices();
  const container = document.getElementById("choicesContainer");
  choices.forEach(({ label, action }) => {
    const btn = document.createElement("button");
    btn.textContent = label;
    btn.className = "btn btn-primary";
    btn.onclick = action;
    container.appendChild(btn);
  });
}

// ─── Main scene runner ──────────────────────────────────────────────────────

/**
 * Paginates through an array of text pages one at a time,
 * then renders choice buttons when all pages are exhausted.
 *
 * @param {string[]} pages   - Array of HTML strings to display in sequence
 * @param {Array<{label: string, action: function}>} choices - Buttons to show at the end
 */
function runScene(sceneId) {
  const { pages, choices } = SCENES[sceneId];
  
  clearChoices();
  let index = 0;

  function showNext() {
    if (index < pages.length) {
      setStoryText(`<p>${pages[index]}</p>`);
      index++;
      waitForEnter(showNext);
    } else {
	  removeContinueHint();
      showChoices(choices);
    }
  }

  showNext();
}