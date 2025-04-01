// Sign-in button functionality
document.addEventListener("DOMContentLoaded", () => {
  const signInBtn = document.querySelector(".sign-in-btn");
  if (signInBtn) {
    signInBtn.addEventListener("click", () => {
      window.location.href = "signin.html";
    });
  }
});

// Carousel functionality with enhanced animations
const carousel = document.querySelector(".carousel-container");
const slides = document.querySelectorAll(".carousel-slide");
const prevButton = document.querySelector(".carousel-nav.prev");
const nextButton = document.querySelector(".carousel-nav.next");
const dotsContainer = document.querySelector(".carousel-dots");

let currentSlide = 0;
let isAnimating = false;
let autoSlideInterval;

// Initialize navigation arrows
prevButton.innerHTML = "&#10094;";
nextButton.innerHTML = "&#10095;";

// Create dot indicators with animation
slides.forEach((_, index) => {
  const dot = document.createElement("div");
  dot.classList.add("carousel-dot");
  if (index === 0) dot.classList.add("active");
  dot.addEventListener("click", () => {
    if (!isAnimating && currentSlide !== index) {
      goToSlide(index);
    }
  });
  dotsContainer.appendChild(dot);
});

function updateSlides(direction = "next") {
  if (isAnimating) return;
  isAnimating = true;

  const currentSlideElement = slides[currentSlide];
  currentSlideElement.classList.add("active");

  // Update dots
  const dots = document.querySelectorAll(".carousel-dot");
  dots.forEach((dot) => dot.classList.remove("active"));
  dots[currentSlide].classList.add("active");

  // Reset any slides that might be in transition
  slides.forEach((slide, index) => {
    if (index !== currentSlide) {
      slide.classList.remove("active");
    }
  });

  // Wait for transition to complete
  setTimeout(() => {
    isAnimating = false;
  }, 800); // Match this with CSS transition duration
}

function nextSlide() {
  if (!isAnimating) {
    currentSlide = (currentSlide + 1) % slides.length;
    updateSlides("next");
  }
}

function prevSlide() {
  if (!isAnimating) {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    updateSlides("prev");
  }
}

function goToSlide(index) {
  if (!isAnimating && currentSlide !== index) {
    currentSlide = index;
    updateSlides(index > currentSlide ? "next" : "prev");
    resetAutoSlide();
  }
}

function resetAutoSlide() {
  clearInterval(autoSlideInterval);
  autoSlideInterval = setInterval(nextSlide, 6000); // Slightly longer interval for better UX
}

// Event listeners with hover pause
carousel.addEventListener("mouseenter", () => {
  clearInterval(autoSlideInterval);
});

carousel.addEventListener("mouseleave", () => {
  resetAutoSlide();
});

prevButton.addEventListener("click", () => {
  prevSlide();
  resetAutoSlide();
});

nextButton.addEventListener("click", () => {
  nextSlide();
  resetAutoSlide();
});

// Theme toggle functionality
const themeToggle = document.querySelector(".theme-toggle");
const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

// Check for saved theme preference or use system preference
const getCurrentTheme = () => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) return savedTheme;
  return prefersDarkScheme.matches ? "dark" : "light";
};

// Apply theme
const setTheme = (theme) => {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
};

// Initialize theme
setTheme(getCurrentTheme());

// Handle theme toggle click
themeToggle.addEventListener("click", () => {
  const currentTheme = getCurrentTheme();
  const newTheme = currentTheme === "light" ? "dark" : "light";
  setTheme(newTheme);
});

// Handle system theme changes
prefersDarkScheme.addEventListener("change", (e) => {
  if (!localStorage.getItem("theme")) {
    setTheme(e.matches ? "dark" : "light");
  }
});

// Start auto-sliding
resetAutoSlide();
updateSlides(); // Initialize first slide

// Modal functionality
const ticketBoxModal = document.getElementById("ticketBoxModal");
const globalTicketModal = document.getElementById("globalTicketModal");
const itemModal = document.getElementById("itemModal");
const firstSlide = slides[0];
const secondSlide = slides[1];

// Function to handle modal open/close
const handleModal = (modal) => {
  const modalClose = modal.querySelector(".modal-close");

  const openModal = () => {
    modal.style.display = "block";
    setTimeout(() => modal.classList.add("active"), 10);
  };

  const closeModal = () => {
    modal.classList.remove("active");
    setTimeout(() => (modal.style.display = "none"), 300);
  };

  // Remove any existing event listeners
  modalClose.replaceWith(modalClose.cloneNode(true));
  const newModalClose = modal.querySelector(".modal-close");

  newModalClose.addEventListener("click", closeModal);

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  return openModal;
};

// Setup modal handlers
firstSlide.addEventListener("click", () => {
  const modalTag = ticketBoxModal.querySelector(".modal-tag");
  const modalTitle = ticketBoxModal.querySelector("h2");
  const modalBuy = ticketBoxModal.querySelector(".modal-buy");

  modalTag.textContent = "ONE TIME ONLY";
  modalTitle.textContent = "Power Up Ticket Ultra Ticket Box";

  // Add click handler for modal buy button
  modalBuy.onclick = (e) => {
    e.stopPropagation(); // Prevent modal from closing
    window.location.href = "store.html";
  };

  handleModal(ticketBoxModal)();
});

secondSlide.addEventListener("click", () => {
  const modalTag = globalTicketModal.querySelector(".modal-tag");
  const modalTitle = globalTicketModal.querySelector("h2");
  const modalBuy = globalTicketModal.querySelector(".modal-buy");

  modalTag.textContent = "ONE TIME ONLY";
  modalTitle.textContent = "Pokémon GO Fest 2025: Global Ticket";

  // Add click handler for modal buy button
  modalBuy.onclick = (e) => {
    e.stopPropagation(); // Prevent modal from closing
    window.location.href = "store.html";
  };

  handleModal(globalTicketModal)();
});

// Featured card modal handler
const featuredCard = document.querySelector(".featured-card");
if (featuredCard) {
  featuredCard.addEventListener("click", () => {
    const title = featuredCard.querySelector("h2");
    const image = featuredCard.querySelector(".featured-image");
    const items = featuredCard.querySelectorAll(".featured-item");
    const buyButton = featuredCard.querySelector(".featured-buy");
    const subtitle = featuredCard.querySelector(".featured-subtitle");

    // Update modal content
    const modalTag = itemModal.querySelector(".modal-tag");
    const modalTitle = itemModal.querySelector("h2");
    const modalImage = itemModal.querySelector(".modal-image");
    const modalItems = itemModal.querySelector(".modal-items");
    const modalBuy = itemModal.querySelector(".modal-buy");
    const modalNote = itemModal.querySelector(".modal-note");

    modalTag.textContent = "FEATURED";
    modalTitle.textContent = title.textContent;
    modalImage.src = image.src;
    modalImage.alt = image.alt;
    modalItems.innerHTML = Array.from(items)
      .map((item) => {
        const img = item.querySelector("img");
        const count = item.querySelector(".item-count");
        return `
        <div class="modal-item">
          <img src="${img.src}" alt="${img.alt}" />
          <span class="modal-item-label">${img.alt}</span>
          <span class="modal-item-count">×${count.textContent}</span>
        </div>
      `;
      })
      .join("");
    modalBuy.textContent = buyButton.textContent;
    modalNote.textContent = subtitle ? subtitle.textContent : "";

    // Add click handler for modal buy button
    modalBuy.onclick = (e) => {
      e.stopPropagation(); // Prevent modal from closing
      window.location.href = "store.html";
    };

    // Open modal with proper close handling
    handleModal(itemModal)();
  });
}

// Dynamic Modal functionality for item cards and pokecoin cards
const itemCards = document.querySelectorAll(".item-card");
const pokecoinCards = document.querySelectorAll(".pokecoin-card");

// Function to create modal items HTML
function createModalItemsHTML(itemIcons) {
  return Array.from(itemIcons)
    .map((icon) => {
      const img = icon.querySelector("img");
      const count = icon.querySelector(".item-count");
      return `
      <div class="modal-item">
        <img src="${img.src}" alt="${img.alt}" />
        <span class="modal-item-label">${img.alt}</span>
        <span class="modal-item-count">×${count.textContent}</span>
      </div>
    `;
    })
    .join("");
}

// Setup modal handlers for all item cards
itemCards.forEach((card) => {
  card.addEventListener("click", () => {
    const tag = card.querySelector(".item-tag");
    const title = card.querySelector("h3");
    const image = card.querySelector(".item-image");
    const itemIcons = card.querySelectorAll(".item-icon");
    const buyButton = card.querySelector(".item-buy");
    const subtitle = card.querySelector(".item-subtitle");

    // Update modal content
    const modalTag = itemModal.querySelector(".modal-tag");
    const modalTitle = itemModal.querySelector("h2");
    const modalImage = itemModal.querySelector(".modal-image");
    const modalItems = itemModal.querySelector(".modal-items");
    const modalBuy = itemModal.querySelector(".modal-buy");
    const modalNote = itemModal.querySelector(".modal-note");

    modalTag.textContent = tag ? tag.textContent : "";
    modalTitle.textContent = title.textContent;
    modalImage.src = image.src;
    modalImage.alt = image.alt;
    modalItems.innerHTML = createModalItemsHTML(itemIcons);
    modalBuy.textContent = buyButton.textContent;
    modalNote.textContent = subtitle ? subtitle.textContent : "";

    // Add click handler for modal buy button
    modalBuy.onclick = (e) => {
      e.stopPropagation(); // Prevent modal from closing
      window.location.href = "store.html";
    };

    // Open modal with proper close handling
    handleModal(itemModal)();
  });
});

// Setup modal handlers for all pokecoin cards
pokecoinCards.forEach((card) => {
  card.addEventListener("click", () => {
    const image = card.querySelector(".pokecoin-image");
    const amount = card.querySelector(".pokecoin-amount");
    const bonus = card.querySelector(".bonus-coins");
    const buyButton = card.querySelector(".item-buy");

    // Update modal content
    const modalTag = itemModal.querySelector(".modal-tag");
    const modalTitle = itemModal.querySelector("h2");
    const modalImage = itemModal.querySelector(".modal-image");
    const modalItems = itemModal.querySelector(".modal-items");
    const modalBuy = itemModal.querySelector(".modal-buy");
    const modalNote = itemModal.querySelector(".modal-note");

    modalTag.textContent = "POPULAR";
    modalTitle.textContent = amount.textContent;
    modalImage.src = image.src;
    modalImage.alt = image.alt;
    modalItems.innerHTML = `
      <div class="modal-item">
        <img src="${image.src}" alt="${image.alt}" />
        <span class="modal-item-label">${amount.textContent}</span>
        <span class="modal-item-count">${bonus.textContent}</span>
      </div>
    `;
    modalBuy.textContent = buyButton.textContent;
    modalNote.textContent = "Instant delivery to your Pokémon GO account";

    // Add click handler for modal buy button
    modalBuy.onclick = (e) => {
      e.stopPropagation(); // Prevent modal from closing
      window.location.href = "store.html";
    };

    // Open modal with proper close handling
    handleModal(itemModal)();
  });
});

// Cart functionality
let cartCount = 0;
const cartCountElement = document.querySelector(".cart-count");
const addToCartButtons = document.querySelectorAll(".add-to-cart");

addToCartButtons.forEach((button) => {
  button.addEventListener("click", () => {
    cartCount++;
    cartCountElement.textContent = cartCount;
    button.textContent = "Added!";
    setTimeout(() => {
      button.textContent = "Add to Cart";
    }, 1000);
  });
});

// Category filtering
const categoryButtons = document.querySelectorAll(".category-btn");
const featuredSection = document.querySelector(".featured-section");
const sections = {
  featured: document.querySelector(".featured-section"),
  "item boxes": document.querySelector(".item-boxes-section"),
  pokécoins: document.querySelector(".pokecoins-section"),
  "daily bundles": document.querySelector(".daily-bundles-section"),
};

// Update active category based on scroll position
function updateActiveCategory() {
  const scrollPosition = window.scrollY + window.innerHeight / 3;
  const navHeight = document.querySelector(".nav").offsetHeight;
  const categoriesHeight = document.querySelector(".categories").offsetHeight;
  const offset = navHeight + categoriesHeight + 60;

  let currentSection = null;
  Object.entries(sections).forEach(([key, section]) => {
    if (section && scrollPosition >= section.offsetTop - offset) {
      currentSection = key;
    }
  });

  categoryButtons.forEach((button) => {
    const buttonText = button.textContent.trim().toLowerCase();
    if (buttonText === currentSection) {
      button.classList.add("active");
    } else {
      button.classList.remove("active");
    }
  });
}

// Add scroll event listener
window.addEventListener("scroll", updateActiveCategory);

categoryButtons.forEach((button) => {
  button.addEventListener("click", () => {
    categoryButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    const buttonText = button.textContent.trim().toLowerCase();
    const navHeight = document.querySelector(".nav").offsetHeight;
    const categoriesHeight = document.querySelector(".categories").offsetHeight;

    if (buttonText === "featured") {
      const featuredOffset =
        featuredSection.offsetTop - navHeight - categoriesHeight - 60;
      window.scrollTo({
        top: featuredOffset,
        behavior: "smooth",
      });
    } else if (buttonText === "item boxes") {
      const itemBoxesSection = document.querySelector(".item-boxes-section");
      const itemBoxesOffset =
        itemBoxesSection.offsetTop - navHeight - categoriesHeight - 60;
      window.scrollTo({
        top: itemBoxesOffset,
        behavior: "smooth",
      });
    } else if (buttonText === "pokécoins") {
      const pokecoinsSection = document.querySelector(".pokecoins-section");
      const pokecoinsOffset =
        pokecoinsSection.offsetTop - navHeight - categoriesHeight - 60;
      window.scrollTo({
        top: pokecoinsOffset,
        behavior: "smooth",
      });
    } else if (buttonText === "daily bundles") {
      const dailyBundlesSection = document.querySelector(
        ".daily-bundles-section"
      );
      const dailyBundlesOffset =
        dailyBundlesSection.offsetTop - navHeight - categoriesHeight - 60;
      window.scrollTo({
        top: dailyBundlesOffset,
        behavior: "smooth",
      });
    }
  });
});
