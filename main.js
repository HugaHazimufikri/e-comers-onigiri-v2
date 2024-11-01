const cart = document.querySelector(".cart");
const cartIcon = document.getElementById("cart-icon");
const closeCart = document.getElementById("close-cart");
const cartContent = document.querySelector(".cart-content");
const totalElement = document.querySelector(".total-price");
const container = document.getElementById("container");
const popup = document.getElementById("popup");
const buyButton = document.querySelector(".btn-buy");
const closePopup = document.getElementById("close-popup");

// Fungsi untuk menampilkan cart
function showCart() {
  cart.classList.add("active");
  container.classList.add("shifted");
}

// Fungsi untuk menyembunyikan cart
function hideCart() {
  cart.classList.remove("active");
  container.classList.remove("shifted");
}

// Fungsi untuk menampilkan popup dan mengosongkan cart
function handleBuy() {
  // Tampilkan popup
  popup.style.display = "flex";
  // Kosongkan semua item di cart
  cartContent.innerHTML = "";
  // Perbarui total harga
  updateTotal();
}

// Fungsi untuk menutup popup
function closePopupHandler() {
  popup.style.display = "none";
}

// Event listeners
cartIcon.addEventListener("click", showCart);
closeCart.addEventListener("click", hideCart);
buyButton.addEventListener("click", handleBuy);
closePopup.addEventListener("click", closePopupHandler);

function ready() {
  const removeCartButtons = document.getElementsByClassName("cart-remove");
  for (let button of removeCartButtons) {
    button.addEventListener("click", removeCartItem);
  }

  const quantityInputs = document.getElementsByClassName("cart-quantity");
  for (let input of quantityInputs) {
    input.addEventListener("change", quantityChanged);
  }

  const addCartButtons = document.getElementsByClassName("add-cart");
  for (let button of addCartButtons) {
    button.addEventListener("click", addCartClicked);
  }
}

function removeCartItem(event) {
  const buttonClicked = event.target;
  buttonClicked.closest(".cart-box").remove();
  updateTotal();
}

function addCartClicked(event) {
  const button = event.target;
  const productBox = button.closest(".product-box");
  const title = productBox.querySelector(".product-title").innerText;
  const price = productBox.querySelector(".price").innerText;
  const productImg = productBox.querySelector(".product-img").src;

  addItemToCart(title, price, productImg);
}

function addItemToCart(title, price, productImg) {
  const cartBoxContent = `
    <div class="cart-box">
        <img src="${productImg}" alt="" class="cart-img">
        <div class="detail-box">
            <div class="cart-product-title">${title}</div>
            <div class="cart-price">${price}</div>
            <input type="number" value="1" class="cart-quantity">
        </div>
        <i class='bx bxs-trash-alt cart-remove'></i>
    </div>
  `;
  cartContent.insertAdjacentHTML("beforeend", cartBoxContent);

  ready(); // Tambahkan listener setelah item baru ditambahkan
  updateTotal();
}

function updateTotal() {
  const cartBoxes = cartContent.querySelectorAll(".cart-box");
  let total = 0;

  cartBoxes.forEach((cartBox) => {
    const priceElement = cartBox.querySelector(".cart-price");
    const quantityElement = cartBox.querySelector(".cart-quantity");
    const price = parseFloat(
      priceElement.innerText.replace("IDR ", "").replace("K", "")
    );
    const quantity = quantityElement.value;

    total += price * quantity;
  });

  totalElement.innerText = "IDR " + total.toFixed(1) + "K";
}

function quantityChanged(event) {
  const input = event.target;
  if (input.value <= 0) {
    input.value = 1;
  }
  updateTotal();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}
