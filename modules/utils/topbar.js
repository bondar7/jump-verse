export function hideTopbar() {
  document.getElementById("top-bar").classList.add("hide");
}
export function showTopbar() {
  document.getElementById("top-bar").classList.remove("hide");
}
export function resetScore() {
  document.getElementById("score").innerHTML = 0;
}