// Cart state management
let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
let firstPurchaseDiscount = 0.15; // 15% discount

// Initialize cart display
function initializeCart() {
  updateCartDisplay();
  updateCartSummary();
}

// Update cart display
function updateCartDisplay() {
  const cartContainer = document.getElementById("cartItems");
  cartContainer.innerHTML = "";

  if (cartItems.length === 0) {
    cartContainer.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
    return;
  }

  cartItems.forEach((item, index) => {
    const cartItem = document.createElement("div");
    cartItem.className = "cart-item";
    cartItem.innerHTML = `
            <div class="item-image">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="item-details">
                <h3>${item.name}</h3>
                <div class="item-price">₱${item.price.toFixed(2)}</div>
                <div class="quantity-controls">
                    <button class="quantity-btn" onclick="updateQuantity(${index}, -1)">-</button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateQuantity(${index}, 1)">+</button>
                </div>
            </div>
            <button class="remove-btn" onclick="removeItem(${index})">×</button>
        `;
    cartContainer.appendChild(cartItem);
  });
}

// Update cart summary
function updateCartSummary() {
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const discount = subtotal >= 9.99 ? subtotal * firstPurchaseDiscount : 0;
  const total = subtotal - discount;

  document.getElementById("subtotal").textContent = `₱${subtotal.toFixed(2)}`;
  document.getElementById("discount").textContent = `-₱${discount.toFixed(2)}`;
  document.getElementById("total").textContent = `₱${total.toFixed(2)}`;

  const checkoutBtn = document.getElementById("checkoutBtn");
  checkoutBtn.disabled = cartItems.length === 0;
}

// Update item quantity
function updateQuantity(index, change) {
  const item = cartItems[index];
  const newQuantity = item.quantity + change;

  if (newQuantity > 0) {
    item.quantity = newQuantity;
    saveCart();
    updateCartDisplay();
    updateCartSummary();
  }
}

// Remove item from cart
function removeItem(index) {
  cartItems.splice(index, 1);
  saveCart();
  updateCartDisplay();
  updateCartSummary();
}

// Save cart to localStorage
function saveCart() {
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
}

// Handle checkout
document.getElementById("checkoutBtn").addEventListener("click", () => {
  // Save cart data for payment page
  localStorage.setItem(
    "checkoutData",
    JSON.stringify({
      items: cartItems,
      subtotal: parseFloat(
        document.getElementById("subtotal").textContent.slice(1)
      ),
      discount: parseFloat(
        document.getElementById("discount").textContent.slice(2)
      ),
      total: parseFloat(document.getElementById("total").textContent.slice(1)),
    })
  );

  // Redirect to payment page
  window.location.href = "payment.html";
});

// Theme toggle functionality
function initializeTheme() {
  const theme = localStorage.getItem("theme") || "light";
  document.documentElement.setAttribute("data-theme", theme);
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  const newTheme = currentTheme === "light" ? "dark" : "light";
  document.documentElement.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
}

// Initialize cart and theme when page loads
document.addEventListener("DOMContentLoaded", () => {
  initializeCart();
  initializeTheme();

  // Add theme toggle button event listener
  const themeToggle = document.querySelector(".theme-toggle");
  if (themeToggle) {
    themeToggle.addEventListener("click", toggleTheme);
  }
});
