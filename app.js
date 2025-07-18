// ========== PRODUCT DATA ==========
const products = [
  {
    id: 1,
    name: "Smart Laptop Pro",
    price: 999,
    category: "laptops",
    images: [
      "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?q=80&w=1800",
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=1800",
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1800",
    ],
    description: '15.6" FHD Display • 16GB RAM • 512GB SSD',
  },
  {
    id: 2,
    name: "Ultra Slim Laptop",
    price: 899,
    category: "laptops",
    images: [
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=1800",
      "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?q=80&w=1800",
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1800",
    ],
    description: '15.6" FHD Display • 32GB RAM • 1TB SSD',
  },
  {
    id: 3,
    name: "Gaming Laptop",
    price: 1299,
    category: "laptops",
    images: [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1800",
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=1800",
      "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?q=80&w=1800",
    ],
    description: '15.6" FHD Display • 16GB RAM • 512GB SSD',
  },
  {
    id: 4,
    name: "Premium Smartphone",
    price: 799,
    category: "phones",
    images: [
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=1800",
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1800",
      "https://images.unsplash.com/photo-1589492477829-5e65395b66cc?q=80&w=1800",
    ],
    description: '6.7" OLED Display • 12GB RAM • 512GB Storage',
  },
  {
    id: 5,
    name: "Bluetooth Headphones",
    price: 149,
    category: "accessories",
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1800",
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=1800",
      "https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?q=80&w=1800",
    ],
    description: "Wireless • Noise Cancelling • 30hr Battery Life",
  },
];

let cart = [];

// ========== UTILITY FUNCTIONS ==========
function showNotification(message, type = "success") {
  const notification = document.createElement("div");
  notification.className = `notification ${type}`;
  notification.textContent = message;
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.classList.add("show");
    setTimeout(() => {
      notification.classList.remove("show");
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  }, 10);
}

// ========== MOBILE MENU MODULE ==========
(function mobileMenuModule() {
  const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
  const mainNav = document.querySelector(".main-nav");
  const navLinks = document.querySelectorAll(".nav-list a");

  function toggleMenu(e) {
    e.stopPropagation();
    mainNav.classList.toggle("active");
  }

  function closeMenuOnClickOutside(e) {
    const isClickInsideMenu =
      mainNav.contains(e.target) || e.target === mobileMenuToggle;
    if (!isClickInsideMenu && mainNav.classList.contains("active")) {
      mainNav.classList.remove("active");
    }
  }

  function closeMenuOnLinkClick() {
    mainNav.classList.remove("active");
  }

  function init() {
    if (mobileMenuToggle && mainNav) {
      mobileMenuToggle.addEventListener("click", toggleMenu);
      document.addEventListener("click", closeMenuOnClickOutside);
      navLinks.forEach((link) => {
        link.addEventListener("click", closeMenuOnLinkClick);
      });
    }
  }

  document.addEventListener("DOMContentLoaded", init);
})();

// ========== CART MODULE ==========
(function cartModule() {
  const cartBtns = document.querySelectorAll(".cart-btn, .cart-link");
  const cartModal = document.getElementById("cart-modal");
  const closeModalBtns = document.querySelectorAll(".close-modal");
  const cartItemsContainer = document.getElementById("cart-items");
  const cartCountElements = document.querySelectorAll(".cart-count");
  const cartTotalAmount = document.getElementById("cart-total-amount");
  const grandTotalElement = document.getElementById("grand-total");
  const checkoutBtn = document.querySelector(".checkout-btn");

  function updateCart() {
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCountElements.forEach((count) => (count.textContent = totalItems));

    if (!cartItemsContainer || !cartTotalAmount || !grandTotalElement) return;

    cartItemsContainer.innerHTML = "";

    if (cart.length === 0) {
      cartItemsContainer.innerHTML = `
                        <div class="empty-cart">
                            <i class="fas fa-shopping-cart"></i>
                            <p>Your cart is empty</p>
                            <a href="#products" class="btn">Continue Shopping</a>
                        </div>
                    `;
      cartTotalAmount.textContent = "0.00";
      grandTotalElement.textContent = "0.00";
      if (checkoutBtn) checkoutBtn.disabled = true;
      return;
    } else if (checkoutBtn) {
      checkoutBtn.disabled = false;
    }

    let subtotal = 0;
    cart.forEach((item) => {
      const itemTotal = item.price * item.quantity;
      subtotal += itemTotal;

      const cartItem = document.createElement("div");
      cartItem.className = "cart-item";
      cartItem.innerHTML = `
                        <img src="${item.image}" alt="${
        item.name
      }" class="cart-item-image">
                        <div class="cart-item-details">
                            <h4 class="cart-item-title">${item.name}</h4>
                            <p>$${item.price.toFixed(2)} × ${item.quantity}</p>
                            <p class="cart-item-price">$${itemTotal.toFixed(
                              2
                            )}</p>
                        </div>
                        <button class="cart-item-remove" data-id="${
                          item.id
                        }">&times;</button>
                    `;
      cartItemsContainer.appendChild(cartItem);
    });

    const deliveryFee = 5;
    const grandTotal = subtotal + deliveryFee;
    cartTotalAmount.textContent = subtotal.toFixed(2);
    grandTotalElement.textContent = grandTotal.toFixed(2);

    document.querySelectorAll(".cart-item-remove").forEach((btn) => {
      btn.addEventListener("click", () =>
        removeFromCart(parseInt(btn.dataset.id))
      );
    });
  }

  function addToCart(product) {
    const existingItem = cart.find((item) => item.id === product.id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({
        ...product,
        quantity: 1,
        image: product.images[0],
      });
    }
    updateCart();
    showNotification("Item added to cart!");
  }

  function removeFromCart(productId) {
    cart = cart.filter((item) => item.id !== productId);
    updateCart();
    showNotification("Item removed from cart!");
  }

  function init() {
    // Cart modal controls
    cartBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        if (cartModal) {
          cartModal.style.display = "flex";
          document.body.style.overflow = "hidden";
          updateCart();
        }
      });
    });

    // Close modal handlers
    closeModalBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const modal = btn.closest(".modal");
        if (modal) {
          modal.style.display = "none";
          document.body.style.overflow = "auto";
        }
      });
    });

    // Close when clicking outside modal
    window.addEventListener("click", (e) => {
      if (e.target.classList.contains("modal")) {
        e.target.style.display = "none";
        document.body.style.overflow = "auto";
      }
    });

    // Expose functions to global scope
    window.getCart = () => cart;
    window.addToCart = addToCart;
    window.updateCart = updateCart;
  }

  document.addEventListener("DOMContentLoaded", init);
})();

// ========== PRODUCT DISPLAY MODULE ==========
(function productDisplayModule() {
  const productsContainer = document.getElementById("products-container");
  const filterBtns = document.querySelectorAll(".filter-btn");

  function generateProductCards() {
    if (!productsContainer) return;

    productsContainer.innerHTML = "";
    products.forEach((product) => {
      const productCard = document.createElement("article");
      productCard.className = "product-card";
      productCard.dataset.category = product.category;
      productCard.dataset.id = product.id;

      productCard.innerHTML = `
                        <div class="product-image">
                            <img src="${product.images[0]}" alt="${
        product.name
      }" loading="lazy">
                        </div>
                        <div class="product-info">
                            <h3>${product.name}</h3>
                            <p class="product-category">${product.category}</p>
                            <p class="product-price">$${product.price.toFixed(
                              2
                            )}</p>
                            <div class="product-buttons">
                                <button class="btn view-details">View Details</button>
                                <button class="btn add-to-cart" data-id="${
                                  product.id
                                }">Add to Cart</button>
                            </div>
                        </div>
                    `;
      productsContainer.appendChild(productCard);
    });
  }

  function filterProducts(category) {
    const productCards = document.querySelectorAll(".product-card");
    productCards.forEach((card) => {
      card.style.display =
        category === "all" || card.dataset.category === category
          ? "block"
          : "none";
    });
  }

  function init() {
    generateProductCards();

    filterBtns.forEach((btn) => {
      btn.addEventListener("click", function () {
        filterBtns.forEach((b) => b.classList.remove("active"));
        this.classList.add("active");
        filterProducts(this.dataset.category);
      });
    });
  }

  document.addEventListener("DOMContentLoaded", init);
})();

// ========== PRODUCT MODAL MODULE ==========
(function productModalModule() {
  const productModal = document.getElementById("product-modal");
  const productGallery = productModal?.querySelector(".product-gallery");
  const productDetails = productModal?.querySelector(".product-details");
  const galleryPrev = productModal?.querySelector(".gallery-prev");
  const galleryNext = productModal?.querySelector(".gallery-next");
  const galleryIndicators = productModal?.querySelector(".gallery-indicators");
  let currentSlide = 0;

  function updateGallery() {
    if (!productGallery || !productGallery.children.length) return;
    const slideWidth = productGallery.clientWidth;
    productGallery.style.transform = `translateX(-${
      currentSlide * slideWidth
    }px)`;

    if (galleryIndicators) {
      document
        .querySelectorAll(".gallery-indicator")
        .forEach((indicator, index) => {
          indicator.classList.toggle("active", index === currentSlide);
        });
    }
  }

  function goToSlide(index) {
    currentSlide = index;
    updateGallery();
  }

  // Helper function to create image element
  function createImageElement(src, alt, index) {
    const img = document.createElement("img");
    img.src = src;
    img.alt = `${alt} - Image ${index + 1}`;
    img.loading = "lazy";
    return img;
  }

  // Helper function to create video element
  function createVideoElement(src) {
    const video = document.createElement("video");
    video.src = src;
    video.controls = true;
    video.muted = true;
    video.autoplay = true;
    video.loop = true;
    return video;
  }

  function openProductModal(product) {
    if (
      !productModal ||
      !productGallery ||
      !productDetails ||
      !galleryIndicators
    )
      return;

    productGallery.innerHTML = "";
    productDetails.innerHTML = "";
    galleryIndicators.innerHTML = "";

    product.images.forEach((mediaSrc, index) => {
      // Determine if it's a video or image
      const isVideo = mediaSrc.toLowerCase().endsWith(".mp4");

      const mediaElement = isVideo
        ? createVideoElement(mediaSrc)
        : createImageElement(mediaSrc, product.name, index);

      productGallery.appendChild(mediaElement);

      const indicator = document.createElement("div");
      indicator.className = "gallery-indicator";
      if (index === 0) indicator.classList.add("active");
      indicator.addEventListener("click", () => goToSlide(index));
      galleryIndicators.appendChild(indicator);
    });

    productDetails.innerHTML = `
      <h2>${product.name}</h2>
      <p class="product-price">$${product.price.toFixed(2)}</p>
      <p>${product.description}</p>
      <button class="btn btn-primary add-to-cart" data-id="${
        product.id
      }">Add to Cart</button>
    `;

    productModal.style.display = "flex";
    document.body.style.overflow = "hidden";
    currentSlide = 0;
    updateGallery();
  }

  function init() {
    if (galleryPrev)
      galleryPrev.addEventListener("click", () =>
        goToSlide(Math.max(0, currentSlide - 1))
      );
    if (galleryNext)
      galleryNext.addEventListener("click", () =>
        goToSlide(
          Math.min(productGallery.children.length - 1, currentSlide + 1)
        )
      );

    // View details button handler
    document.addEventListener("click", (e) => {
      if (e.target.classList.contains("view-details")) {
        const productCard = e.target.closest(".product-card");
        if (productCard) {
          const productId = parseInt(productCard.dataset.id);
          const product = products.find((p) => p.id === productId);
          if (product) openProductModal(product);
        }
      }
    });
  }

  document.addEventListener("DOMContentLoaded", init);
})();

// ========== CHECKOUT MODULE ==========
(function checkoutModule() {
  const checkoutModal = document.getElementById("checkout-modal");
  const checkoutForm = document.getElementById("customer-checkout-form");
  const checkoutFormMessage = document.getElementById("checkout-form-message");
  const closeCheckoutBtns = document.querySelectorAll(
    "#checkout-modal .close-modal"
  );
  const cancelCheckoutBtn = document.querySelector(".cancel-checkout");
  const submitOrderBtn = document.querySelector(".submit-order");
  const cartModal = document.getElementById("cart-modal");
  const checkoutBtn = document.querySelector(".checkout-btn");

  function showFormMessage(message, type = "error") {
    if (checkoutFormMessage) {
      checkoutFormMessage.textContent = message;
      checkoutFormMessage.className = `form-message ${type}`;
      checkoutFormMessage.style.display = "block";
    }
  }

  function hideFormMessage() {
    if (checkoutFormMessage) {
      checkoutFormMessage.style.display = "none";
    }
  }

  function sendOrderToWhatsApp(name, phone, address, notes) {
    const cartItems = window.getCart ? window.getCart() : [];
    if (cartItems.length === 0) {
      showFormMessage("Your cart is empty!", "error");
      return false;
    }

    let message = `📋 *NEW ORDER - TECH GENIE* 📋\n\n`;
    message += `👤 *Customer:* ${name}\n`;
    message += `📞 *Phone:* ${phone}\n`;
    message += `🏠 *Address:* ${address}\n\n`;
    message += `🛒 *Order Items:*\n`;

    let subtotal = 0;
    cartItems.forEach((item) => {
      const itemTotal = item.price * item.quantity;
      message += `➤ ${item.name} (Qty: ${item.quantity}) - $${itemTotal.toFixed(
        2
      )}\n`;
      subtotal += itemTotal;
    });

    const deliveryFee = 5;
    const grandTotal = subtotal + deliveryFee;

    message += `\n💰 *Subtotal:* $${subtotal.toFixed(2)}\n`;
    message += `🚚 *Delivery Fee:* $${deliveryFee.toFixed(2)}\n`;
    message += `💵 *Total:* $${grandTotal.toFixed(2)}\n\n`;

    if (notes) message += `📝 *Special Instructions:* ${notes}\n\n`;
    message += `⏰ *Order Time:* ${new Date().toLocaleString()}`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/233204376083?text=${encodedMessage}`;

    window.open(whatsappUrl, "_blank");

    // Clear cart
    if (window.updateCart) {
      cart.length = 0;
      window.updateCart();
    }

    checkoutModal.style.display = "none";
    document.body.style.overflow = "auto";
    checkoutForm.reset();
    return true;
  }

  function init() {
    if (checkoutBtn) {
      checkoutBtn.addEventListener("click", (e) => {
        e.preventDefault();
        const cartItems = window.getCart ? window.getCart() : [];

        if (cartItems.length === 0) {
          showNotification("Your cart is empty!", "error");
          return;
        }

        if (cartModal) cartModal.style.display = "none";
        if (checkoutModal) {
          checkoutModal.style.display = "flex";
          document.body.style.overflow = "hidden";
          hideFormMessage();
        }
      });
    }

    if (checkoutForm) {
      checkoutForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = document.getElementById("customer-name").value.trim();
        const phone = document.getElementById("customer-phone").value.trim();
        const address = document
          .getElementById("customer-address")
          .value.trim();
        const notes = document.getElementById("customer-notes").value.trim();

        if (!name || !phone || !address) {
          showFormMessage("Please fill in all required fields", "error");
          return;
        }

        sendOrderToWhatsApp(name, phone, address, notes);
      });
    }

    if (cancelCheckoutBtn) {
      cancelCheckoutBtn.addEventListener("click", () => {
        checkoutModal.style.display = "none";
        document.body.style.overflow = "auto";
        checkoutForm.reset();
        hideFormMessage();
        if (cartModal) {
          cartModal.style.display = "flex";
          document.body.style.overflow = "hidden";
        }
      });
    }
  }

  document.addEventListener("DOMContentLoaded", init);
})();

// ========== FORM SUBMISSIONS ==========
(function formModules() {
  document.addEventListener("DOMContentLoaded", () => {
    const contactForm = document.getElementById("contact-form");
    const newsletterForm = document.querySelector(".newsletter-form");

    if (contactForm) {
      contactForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const message = document.getElementById("message").value;
        showNotification(
          "Thank you for your message! We will get back to you soon."
        );
        contactForm.reset();
      });
    }

    if (newsletterForm) {
      newsletterForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector("input").value;
        showNotification("Thank you for subscribing to our newsletter!");
        newsletterForm.reset();
      });
    }
  });
})();

// ========== GLOBAL EVENT LISTENERS ==========
document.addEventListener("click", (e) => {
  // Add to cart buttons (including those in modals)
  if (e.target.classList.contains("add-to-cart")) {
    const productId = parseInt(e.target.dataset.id);
    const product = products.find((p) => p.id === productId);
    if (product && window.addToCart) {
      window.addToCart(product);
    }
  }
});

// Initialize the page
document.addEventListener("DOMContentLoaded", () => {
  // Generate initial products
  const productsContainer = document.getElementById("products-container");
  products.forEach((product) => {
    const productCard = document.createElement("article");
    productCard.className = "product-card";
    productCard.dataset.category = product.category;
    productCard.dataset.id = product.id;

    productCard.innerHTML = `
                    <div class="product-image">
                        <img src="${product.images[0]}" alt="${
      product.name
    }" loading="lazy">
                    </div>
                    <div class="product-info">
                        <h3>${product.name}</h3>
                        <p class="product-category">${product.category}</p>
                        <p class="product-price">$${product.price.toFixed(
                          2
                        )}</p>
                        <div class="product-buttons">
                            <button class="btn view-details">View Details</button>
                            <button class="btn add-to-cart" data-id="${
                              product.id
                            }">Add to Cart</button>
                        </div>
                    </div>
                `;
    productsContainer.appendChild(productCard);
  });
});
