// Get the profile image and the dropdown menu
const profileImg = document.getElementById("profile-img");
const contextMenu = document.getElementById("context-menu");

// Event listener to show the context menu when the profile image is clicked
profileImg.addEventListener("click", function (event) {
  contextMenu.style.display =
    contextMenu.style.display === "block" ? "none" : "block";
});