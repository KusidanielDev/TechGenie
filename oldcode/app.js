document.addEventListener("DOMContentLoaded", function () {
  // Mobile menu toggle
  const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
  const mainNav = document.querySelector(".main-nav");

  mobileMenuToggle.addEventListener("click", function () {
    mainNav.classList.toggle("active");
  });

  // Close mobile menu when clicking on a link
  const navLinks = document.querySelectorAll(".nav-list a");
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      mainNav.classList.remove("active");
    });
  });

  // Cart functionality - UPDATED FOR MOBILE
  const cartBtns = document.querySelectorAll(".cart-btn, .cart-link");
  const cartModal = document.getElementById("cart-modal");
  const closeModal = document.querySelector(".close-modal");
  const cartItemsContainer = document.getElementById("cart-items");
  const cartCountElements = document.querySelectorAll(".cart-count");
  const cartTotalAmount = document.getElementById("cart-total-amount");
  const addToCartBtns = document.querySelectorAll(".product-card button");

  let cart = [];

  // Sample product data
  const products = [
    {
      id: 1,
      name: "Smart Laptop Pro",
      price: 999,
      category: "laptops",
      image: "./media/img/laptop1.jpg",
    },
    {
      id: 2,
      name: "Ultra Slim Laptop",
      price: 899,
      category: "laptops",
      image: "./media/img/laptop2.jpg",
    },
    {
      id: 3,
      name: "Gaming Laptop",
      price: 1299,
      category: "laptops",
      image: "./media/img/laptop3.jpg",
    },
    {
      id: 4,
      name: "Premium Smartphone",
      price: 799,
      category: "phones",
      image: "./media/img/iphone16.jpg",
    },
    {
      id: 5,
      name: "Bluetooth Headphones",
      price: 149,
      category: "accessories",
      image: "./media/img/earphone1.jpg",
    },
  ];

  // Generate product cards
  const productsContainer = document.getElementById("products-container");

  products.forEach((product) => {
    const productCard = document.createElement("article");
    productCard.className = "product-card";
    productCard.dataset.category = product.category;

    productCard.innerHTML = `
      <div class="product-image">
        <img src="${product.image}" alt="${product.name}" loading="lazy">
      </div>
      <div class="product-info">
        <h3>${product.name}</h3>
        <p>${product.category}</p>
        <p class="product-price">$${product.price.toFixed(2)}</p>
        <button data-id="${product.id}">Add to Cart</button>
      </div>
    `;

    productsContainer.appendChild(productCard);
  });

  // Filter products
  const filterBtns = document.querySelectorAll(".filter-btn");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      // Remove active class from all buttons
      filterBtns.forEach((b) => b.classList.remove("active"));
      // Add active class to clicked button
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

  // Add to cart functionality
  document.addEventListener("click", function (e) {
    if (e.target && e.target.matches(".product-card button")) {
      const productId = parseInt(e.target.dataset.id);
      const product = products.find((p) => p.id === productId);

      addToCart(product);
    }
  });

  function addToCart(product) {
    const existingItem = cart.find((item) => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({
        ...product,
        quantity: 1,
      });
    }

    updateCart();
    showCartNotification();
  }

  function updateCart() {
    // Update cart count for ALL elements - UPDATED FOR MOBILE
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCountElements.forEach((count) => {
      count.textContent = totalItems;
    });

    // Update cart modal
    cartItemsContainer.innerHTML = "";

    if (cart.length === 0) {
      cartItemsContainer.innerHTML = "<p>Your cart is empty</p>";
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

    // Add event listeners to remove buttons
    const removeBtns = document.querySelectorAll(".cart-item-remove");
    removeBtns.forEach((btn) => {
      btn.addEventListener("click", function () {
        const productId = parseInt(this.dataset.id);
        removeFromCart(productId);
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

  // Cart modal toggle for ALL cart buttons - UPDATED FOR MOBILE
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

  // Close modal when clicking outside
  window.addEventListener("click", function (e) {
    if (e.target === cartModal) {
      cartModal.style.display = "none";
      document.body.style.overflow = "auto";
    }
  });

  // Contact form submission
  const contactForm = document.getElementById("contact-form");

  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    console.log("Form submitted:", { name, email, message });
    alert("Thank you for your message! We will get back to you soon.");
    contactForm.reset();
  });

  // Newsletter form submission
  const newsletterForm = document.querySelector(".newsletter-form");

  newsletterForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = this.querySelector("input").value;
    console.log("Newsletter subscription:", email);
    alert("Thank you for subscribing to our newsletter!");
    this.reset();
  });
});
