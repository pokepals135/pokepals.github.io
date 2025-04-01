// Get checkout data from localStorage
let checkoutData = JSON.parse(localStorage.getItem("checkoutData")) || {
  items: [],
  subtotal: 0,
  discount: 0,
  total: 0,
};

// Initialize payment page
function initializePaymentPage() {
  displayOrderSummary();
  setupFormValidation();
}

// Display order summary
function displayOrderSummary() {
  const orderItems = document.getElementById("orderItems");
  const totalAmount = document.getElementById("totalAmount");
  const subtotalAmount = document.getElementById("subtotalAmount");

  // Clear existing items
  orderItems.innerHTML = "";

  // Display order items
  checkoutData.items.forEach((item) => {
    const orderItem = document.createElement("div");
    orderItem.className = "order-item";
    orderItem.innerHTML = `
      <div class="item-info">
        <div class="item-image-container">
          <img src="${item.image}" alt="${item.name}" class="item-thumbnail">
        </div>
        <div class="item-details">
          <span class="item-name">${item.name}</span>
          <div class="item-meta">
            <span class="item-quantity">Quantity: ${item.quantity}</span>
            <span class="item-price">₱${(item.price * item.quantity).toFixed(
              2
            )}</span>
          </div>
        </div>
      </div>
    `;
    orderItems.appendChild(orderItem);
  });

  // Display amounts
  subtotalAmount.textContent = `₱${checkoutData.subtotal.toFixed(2)}`;
  totalAmount.textContent = `₱${checkoutData.total.toFixed(2)}`;
}

// Setup form validation
function setupFormValidation() {
  const form = document.getElementById("paymentForm");
  const cardNumber = document.getElementById("cardNumber");
  const expiryDate = document.getElementById("expiryDate");
  const cvv = document.getElementById("cvv");

  // Card number formatting and validation
  cardNumber.addEventListener("input", (e) => {
    let value = e.target.value.replace(/\D/g, "");
    value = value.replace(/(.{4})/g, "$1 ").trim();
    e.target.value = value.substring(0, 19);
  });

  // Expiry date formatting and validation
  expiryDate.addEventListener("input", (e) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length >= 2) {
      value = value.substring(0, 2) + "/" + value.substring(2);
    }
    e.target.value = value.substring(0, 5);
  });

  // CVV validation
  cvv.addEventListener("input", (e) => {
    e.target.value = e.target.value.replace(/\D/g, "").substring(0, 3);
  });

  // Form submission
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Show processing state
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.disabled = true;
    submitButton.textContent = "Processing...";

    try {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Clear cart and checkout data
      localStorage.removeItem("cartItems");
      localStorage.removeItem("checkoutData");

      // Show success message and redirect
      alert("Payment successful! Thank you for your purchase.");
      window.location.href = "store.html";
    } catch (error) {
      alert("Payment failed. Please try again.");
      submitButton.disabled = false;
      submitButton.textContent = originalText;
    }
  });
}

// Payment method selection handling
const paymentMethods = document.querySelectorAll('input[name="paymentMethod"]');
const cardDetails = document.querySelector(".card-details");

paymentMethods.forEach((method) => {
  method.addEventListener("change", (e) => {
    if (e.target.value === "paypal") {
      cardDetails.style.display = "none";
    } else {
      cardDetails.style.display = "block";
    }
  });
});

// Theme toggle functionality
function initializeTheme() {
  const themeToggle = document.querySelector(".theme-toggle");
  const currentTheme = localStorage.getItem("theme") || "light";
  document.documentElement.setAttribute("data-theme", currentTheme);

  themeToggle.addEventListener("click", () => {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = currentTheme === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  });
}

// Initialize page when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  initializePaymentPage();
  initializeTheme();
});
