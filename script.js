const tabs = Array.from(document.querySelectorAll(".note-tab"));
const panels = Array.from(document.querySelectorAll(".note-content"));

function activateTab(tab) {
  const targetId = tab.getAttribute("aria-controls");

  tabs.forEach((item) => {
    const isSelected = item === tab;
    item.classList.toggle("is-active", isSelected);
    item.setAttribute("aria-selected", String(isSelected));
  });

  panels.forEach((panel) => {
    const isTarget = panel.id === targetId;
    panel.classList.toggle("is-active", isTarget);
    panel.hidden = !isTarget;
  });
}

tabs.forEach((tab) => {
  tab.addEventListener("click", () => activateTab(tab));

  tab.addEventListener("keydown", (event) => {
    const currentIndex = tabs.indexOf(tab);
    const direction = event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;

    if (!direction) {
      return;
    }

    event.preventDefault();
    const nextTab = tabs[(currentIndex + direction + tabs.length) % tabs.length];
    nextTab.focus();
    activateTab(nextTab);
  });
});

document.querySelectorAll(".check-item input").forEach((input) => {
  input.addEventListener("change", () => {
    input.closest(".check-item").classList.toggle("is-checked", input.checked);
  });
});
