export function openDialog(html) {
  document.querySelector("#dialog-content").innerHTML = html;
  document.querySelector("#detail-dialog").showModal();
}
export function closeDialog() {
  document.querySelector("#detail-dialog").close();
}
export function bindDialog() {
  const dialog = document.querySelector("#detail-dialog");
  document
    .querySelector(".dialog-close")
    .addEventListener("click", closeDialog);
  dialog.addEventListener("click", (event) => {
    const rect = dialog.getBoundingClientRect();
    if (
      event.target === dialog &&
      (event.clientX < rect.left ||
        event.clientX > rect.right ||
        event.clientY < rect.top ||
        event.clientY > rect.bottom)
    )
      closeDialog();
  });
}
let toastTimer;
export function notify(message) {
  const element = document.querySelector(".toast");
  element.textContent = message;
  element.classList.add("visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => element.classList.remove("visible"), 5000);
}
