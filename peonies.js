
  const products = [
  { id: 25, name: "Сара Бернар", price: 90, img: "sara.png" },
  { id: 26, name: "Пані Александра", price: 90, img: "pani.png" },
  { id: 27, name: "Карл Розенфельд", price: 80, img: "karl.png" },
  { id: 28, name: "Півонія Персик", price: 90, img: "peatch.png" },
  { id: 29, name: "Синя Півонія", price: 90, img: "sunia.png" },
  { id: 30, name: "Червона Півонія", price: 80, img: "chervona.png" },






  ];

let cart = JSON.parse(localStorage.getItem('cart')) || [];

function openCart() {
  document.getElementById("cart-popup").style.right = "0";
  renderCart();
}

function closeCart() {
  document.getElementById("cart-popup").style.right = "-400px";
}

function addToCart(id) {

  let product = products.find(p => p.id === id);

  if (!product) return;

  let existing = cart.find(item => item.id === id);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      img: product.img,
      quantity: 1
    });
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  showToast();
}


function renderCart() {

  let container = document.getElementById("cart-items");
  let totalContainer = document.getElementById("cart-total");

  container.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    container.innerHTML = "<h3>Ваш кошик порожній</h3>";
    totalContainer.innerHTML = `
      <button onclick="window.location.href='catalog.html'"
      style="width:100%; padding:10px; background:black; color:white; border:none;">
      Каталог
      </button>
    `;
    return;
  }

  cart.forEach((item, index) => {
    total += item.price * item.quantity;

    container.innerHTML += `
      <div style="display:flex; margin-bottom:15px;">
        <img src="images/${item.img}" width="60" style="margin-right:10px;">
        <div>
          <div>${item.name}</div>
          <div>${item.quantity} x ${item.price} грн</div>
          <button onclick="removeItem(${index})"
          style="border:none; background:none; color:red; cursor:pointer;">
          Видалити
          </button>
        </div>
      </div>
    `;
  });

  totalContainer.innerHTML = `
    <h3>Загальна сума: ${total} грн</h3>
    <button onclick="window.location.href='Order2.html'"
      style="margin-top:10px; width:100%; padding:10px; background:black; color:white; border:none;">
      Оформити замовлення
    </button>
  `;
}
function showToast() {
  let toast = document.getElementById("toast");
  toast.style.opacity = "1";

  setTimeout(() => {
    toast.style.opacity = "0";
  }, 2000);
}



function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cart));
  renderCart();
}

function clearCart() {
  cart = [];
  localStorage.removeItem('cart');
  renderCart();
}
