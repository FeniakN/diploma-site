
function sendForm(event) {
  event.preventDefault();

  const name = document.getElementById('name').value;
  const phone = document.getElementById('phone').value;
  const comment = document.getElementById('comment').value;

  alert(
    "Дякуємо за звернення!\n\n" +
    "Імʼя: " + name + "\n" +
    "Телефон: " + phone + "\n" +
    "Коментар: " + comment
  );

  event.target.reset();
}


let cart = JSON.parse(localStorage.getItem('cart')) || [];

function openCart() {
  document.getElementById("cart-popup").style.right = "0";
  renderCart();
}

function closeCart() {
  document.getElementById("cart-popup").style.right = "-400px";
}

function addToCart(name, price, img) {

  let existing = cart.find(item => item.name === name);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({
      name,
      price,
      img,
      quantity: 1
    });
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  renderCart();
}

function renderCart() {

  let container = document.getElementById("cart-items");
  let totalContainer = document.getElementById("cart-total");

  container.innerHTML = "";
  totalContainer.innerHTML = "";

  if (cart.length === 0) {

    container.innerHTML = `
      <div style="margin-top:40px; text-align:center;">
        <h3>Ваш кошик порожній</h3>
        <p style="color:gray;">Додайте замовлення в кошик</p>
      </div>
    `;

    totalContainer.innerHTML = `
      <button 
        onclick="window.location.href='catalog.html'"
        style="
          margin-top:20px;
          width:100%;
          padding:10px;
          background:black;
          color:white;
          border:none;
          cursor:pointer;
        ">
        Каталог
      </button>
    `;

    return;
  }

  let total = 0;

  cart.forEach((item, index) => {

    total += item.price * item.quantity;

    let itemBlock = document.createElement("div");
    itemBlock.style.display = "flex";
    itemBlock.style.marginBottom = "15px";

    itemBlock.innerHTML = `
      <img src="all/${item.img}" width="60" style="margin-right:10px;">
      <div>
        <div>${item.name}</div>
        <div>${item.quantity} x ${item.price} грн</div>
        <button 
          style="border:none; background:none; color:red; cursor:pointer;">
          Видалити
        </button>
      </div>
    `;

    // 🔥 тут правильне видалення
    itemBlock.querySelector("button").addEventListener("click", function() {
      cart.splice(index, 1);
      localStorage.setItem('cart', JSON.stringify(cart));
      renderCart();
    });

    container.appendChild(itemBlock);

  });

  totalContainer.innerHTML = `
    <h3 style="margin-top:20px;">Загальна сума: ${total} грн</h3>

    <button 
      onclick="window.location.href='order2.html?'"
      style="
        margin-top:15px;
        width:100%;
        padding:10px;
        background:black;
        color:white;
        border:none;
        cursor:pointer;
      ">
      Оформити замовлення
    </button>
  `;
}



