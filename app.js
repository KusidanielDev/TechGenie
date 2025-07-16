document.addEventListener("DOMContentLoaded", function () {
  // Mobile menu toggle
  const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
  const mainNav = document.querySelector(".main-nav");

  // Toggle menu on button click
  mobileMenuToggle.addEventListener("click", function (e) {
    e.stopPropagation();
    mainNav.classList.toggle("active");
  });

  // Close menu when clicking outside
  document.addEventListener("click", function (e) {
    const isClickInsideMenu =
      mainNav.contains(e.target) || e.target === mobileMenuToggle;

    if (!isClickInsideMenu && mainNav.classList.contains("active")) {
      mainNav.classList.remove("active");
    }
  });

  // Close menu when clicking links
  const navLinks = document.querySelectorAll(".nav-list a");
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      mainNav.classList.remove("active");
    });
  });
});

// Cart functionality
const cartBtns = document.querySelectorAll(".cart-btn, .cart-link");
const cartModal = document.getElementById("cart-modal");
const closeModal = document.querySelector(".close-modal");
const cartItemsContainer = document.getElementById("cart-items");
const cartCountElements = document.querySelectorAll(".cart-count");
const cartTotalAmount = document.getElementById("cart-total-amount");

let cart = [];

// Sample product data
const products = [
  {
    id: 1,
    name: "Smart Laptop Pro",
    price: 999,
    category: "laptops",
    images: [
      "./media/img/laptop1.jpg",
      "./media/img/laptop1.jpg",
      "./media/img/laptop1.jpg",
    ],
    description: '15.6" FHD Display • 16GB RAM • 512GB SSD',
  },
  {
    id: 2,
    name: "Ultra Slim Laptop",
    price: 899,
    category: "laptops",
    images: [
      "./media/img/laptop2.jpg",
      "./media/img/laptop1.jpg",
      "./media/img/laptop3.jpg",
    ],
    description: '15.6" FHD Display • 32GB RAM • 1TB SSD',
  },
  {
    id: 3,
    name: "Gaming Laptop",
    price: 1299,
    category: "laptops",
    images: [
      "./media/img/laptop3.jpg",
      "./media/img/laptop2.jpg",
      "./media/img/laptop1.jpg",
    ],
    description: '15.6" FHD Display • 16GB RAM • 512GB SSD',
  },
  {
    id: 4,
    name: "Premium Smartphone",
    price: 799,
    category: "phones",
    images: [
      "./media/img/laptop4.jpg",
      "./media/img/laptop2.jpg",
      "./media/img/laptop1.jpg",
    ],
    description: '15.6" FHD Display • 16GB RAM • 512GB SSD',
  },
  {
    id: 5,
    name: "Bluetooth Headphones",
    price: 149,
    category: "accessories",
    images: [
      "./media/img/laptop5.jpg",
      "./media/img/laptop2.jpg",
      "./media/img/laptop1.jpg",
    ],
    description: '15.6" FHD Display • 16GB RAM • 512GB SSD',
  },
];

// Generate product cards
const productsContainer = document.getElementById("products-container");

products.forEach((product) => {
  const productCard = document.createElement("article");
  productCard.className = "product-card";
  productCard.dataset.category = product.category;
  productCard.dataset.id = product.id;

  productCard.innerHTML = `
    <div class="product-image">
      <img src="${product.images[0]}" alt="${product.name}" loading="lazy">
    </div>
    <div class="product-info">
      <h3>${product.name}</h3>
      <p>${product.category}</p>
      <p class="product-price">$${product.price.toFixed(2)}</p>
      <button class="btn view-details">View Details</button>
      <button class="btn add-to-cart" data-id="${
        product.id
      }">Add to Cart</button>
    </div>
  `;

  productsContainer.appendChild(productCard);
});

// Filter products
const filterBtns = document.querySelectorAll(".filter-btn");

filterBtns.forEach((btn) => {
  btn.addEventListener("click", function () {
    filterBtns.forEach((b) => b.classList.remove("active"));
    this.classList.add("active");

    const category = this.dataset.category;
    const productCards = document.querySelectorAll(".product-card");

    productCards.forEach((card) => {
      if (category === "all" || card.dataset.category === category) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });
});

// Cart functions
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
  showCartNotification();
}

function updateCart() {
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  cartCountElements.forEach((count) => {
    count.textContent = totalItems;
  });

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
    return;
  }

  let total = 0;

  cart.forEach((item) => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    const cartItem = document.createElement("div");
    cartItem.className = "cart-item";

    cartItem.innerHTML = `
      <img src="${item.image}" alt="${item.name}" class="cart-item-image">
      <div class="cart-item-details">
        <h4 class="cart-item-title">${item.name}</h4>
        <p>$${item.price.toFixed(2)} × ${item.quantity}</p>
        <p class="cart-item-price">$${itemTotal.toFixed(2)}</p>
      </div>
      <button class="cart-item-remove" data-id="${item.id}">&times;</button>
    `;

    cartItemsContainer.appendChild(cartItem);
  });

  cartTotalAmount.textContent = total.toFixed(2);

  document.querySelectorAll(".cart-item-remove").forEach((btn) => {
    btn.addEventListener("click", function () {
      removeFromCart(parseInt(this.dataset.id));
    });
  });
}

function removeFromCart(productId) {
  cart = cart.filter((item) => item.id !== productId);
  updateCart();
}

function showCartNotification() {
  const notification = document.createElement("div");
  notification.className = "cart-notification";
  notification.textContent = "Item added to cart!";
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.classList.add("show");
  }, 10);

  setTimeout(() => {
    notification.classList.remove("show");
    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 2000);
}

// Event delegation for product interactions
document.addEventListener("click", function (e) {
  // View Details
  if (e.target.classList.contains("view-details")) {
    const productCard = e.target.closest(".product-card");
    const productId = parseInt(productCard.dataset.id);
    const product = products.find((p) => p.id === productId);
    openProductModal(product);
    return;
  }

  // Add to Cart
  if (e.target.classList.contains("add-to-cart")) {
    const productId = parseInt(e.target.dataset.id);
    const product = products.find((p) => p.id === productId);
    addToCart(product);
    return;
  }
});

// Cart modal controls
cartBtns.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    e.preventDefault();
    cartModal.style.display = "flex";
    document.body.style.overflow = "hidden";
  });
});

closeModal.addEventListener("click", function () {
  cartModal.style.display = "none";
  document.body.style.overflow = "auto";
});

window.addEventListener("click", function (e) {
  if (e.target === cartModal) {
    cartModal.style.display = "none";
    document.body.style.overflow = "auto";
  }
});

// Product Modal
const productModal = document.getElementById("product-modal");
const productGallery = productModal.querySelector(".product-gallery");
const productDetails = productModal.querySelector(".product-details");
const galleryPrev = productModal.querySelector(".gallery-prev");
const galleryNext = productModal.querySelector(".gallery-next");
const galleryIndicators = productModal.querySelector(".gallery-indicators");
let currentSlide = 0;

function openProductModal(product) {
  productGallery.innerHTML = "";
  productDetails.innerHTML = "";
  galleryIndicators.innerHTML = "";

  product.images.forEach((imgSrc, index) => {
    const mediaElement = imgSrc.endsWith(".mp4")
      ? createVideoElement(imgSrc)
      : createImageElement(imgSrc, product.name, index);

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

function createImageElement(src, alt, index) {
  const img = document.createElement("img");
  img.src = src;
  img.alt = `${alt} - Image ${index + 1}`;
  img.loading = "lazy";
  return img;
}

function createVideoElement(src) {
  const video = document.createElement("video");
  video.src = src;
  video.controls = true;
  video.muted = true;
  video.autoplay = true;
  video.loop = true;
  return video;
}

function updateGallery() {
  const slideWidth = productGallery.clientWidth;
  productGallery.style.transform = `translateX(-${
    currentSlide * slideWidth
  }px)`;

  document
    .querySelectorAll(".gallery-indicator")
    .forEach((indicator, index) => {
      indicator.classList.toggle("active", index === currentSlide);
    });
}

function goToSlide(index) {
  currentSlide = index;
  updateGallery();
}

galleryPrev.addEventListener("click", () => {
  currentSlide = Math.max(0, currentSlide - 1);
  updateGallery();
});

galleryNext.addEventListener("click", () => {
  currentSlide = Math.min(productGallery.children.length - 1, currentSlide + 1);
  updateGallery();
});

productModal.querySelector(".close-modal").addEventListener("click", () => {
  productModal.style.display = "none";
  document.body.style.overflow = "auto";
});

productModal.addEventListener("click", (e) => {
  if (e.target === productModal) {
    productModal.style.display = "none";
    document.body.style.overflow = "auto";
  }
});

// Form submissions
document
  .getElementById("contact-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;
    console.log("Form submitted:", { name, email, message });
    alert("Thank you for your message! We will get back to you soon.");
    this.reset();
  });

document
  .querySelector(".newsletter-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    const email = this.querySelector("input").value;
    console.log("Newsletter subscription:", email);
    alert("Thank you for subscribing to our newsletter!");
    this.reset();
  });
