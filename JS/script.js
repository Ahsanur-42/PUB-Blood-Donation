// Get the profile image and the dropdown menu
const profileImg = document.getElementById("profile-img");
const contextMenu = document.getElementById("context-menu");

// Event listener to show the context menu when the profile image is clicked
profileImg.addEventListener("click", function (event) {
  contextMenu.style.display =
    contextMenu.style.display === "block" ? "none" : "block";
});

// Add event listeners to each menu item
document.querySelectorAll('.menu li').forEach(item => {
  item.addEventListener('click', function () {
    const contentId = item.getAttribute('data-content'); // Get content ID
    loadContent(contentId);

    // Optionally, highlight the active menu item
    document.querySelectorAll('.menu li').forEach(link => {
      link.classList.remove('active'); // Remove active class from all items
    });
    item.classList.add('active'); // Add active class to clicked item
  });
});

// Function to dynamically load content based on clicked link
function loadContent(contentId) {
  const contentArea = document.getElementById('page-content'); // The section where content will be injected

  // Example of content for each page, you can modify or load from separate files
  const contentData = {
    dashboard: "<h2>Dashboard</h2><p>Welcome to the Dashboard!</p>",
    about: {
      src: "./pages/about.html",
    },
    eligibility: "<h2>Eligibility Criteria</h2><p>Check the eligibility to donate blood.</p>",
    preparation: "<h2>How to Prepare for Donation</h2><p>Preparation tips for blood donation.</p>",
    partners: "<h2>Partner Organizations</h2><p>View our partner organizations.</p>",
    gallery: "<h2>Gallery</h2><p>Explore the gallery of blood donation events.</p>",
    contact: "<h2>Contact Us</h2><p>Get in touch with us for more information.</p>"
  };

  // Check if contentId requires an external HTML file (like "about.html")
  if (contentData[contentId] && contentData[contentId].src) {
    // Fetch the HTML content from the specified source (e.g., about.html)
    fetch(contentData[contentId].src)
      .then(response => response.text())
      .then(html => {
        contentArea.innerHTML = html; // Inject the fetched HTML into the content area
      })
      .catch(error => {
        console.error("Error loading the page:", error);
        contentArea.innerHTML = "<h2>Page Not Found</h2><p>The page you're looking for does not exist.</p>";
      });
  } else {
    // For content directly defined in the object
    contentArea.innerHTML = contentData[contentId] || "<h2>Page Not Found</h2><p>The page you're looking for does not exist.</p>";
  }
}


// Handle link copy button
document.getElementById("copy-link-btn").addEventListener("click", () => {
  const pageUrl = window.location.href; // Get the current page URL
  const messageElement = document.getElementById("copy-message");

  navigator.clipboard.writeText(pageUrl)
    .then(() => {
      messageElement.textContent = "Link copied to clipboard!";
      messageElement.style.color = "white";
      messageElement.style.display = "block";
      setTimeout(() => messageElement.style.display = "none", 1000);
    })
    .catch(err => {
      messageElement.textContent = "Failed to copy link!";
      messageElement.style.color = "red";
      messageElement.style.display = "block";
      setTimeout(() => messageElement.style.display = "none", 3000);
    });
});
