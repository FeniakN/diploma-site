
  const products = [
  { id: 1, name: "Біла Гвоздика (21шт)", price: 750, img: "gv.png" },
  { id: 2, name: "Біла Хризантема (15шт)", price: 800, img: "hr.png" },
  { id: 3, name: "Троянди Наомі (51шт)", price: 1200, img: "rr.png" },
  { id: 4, name: "Рожеві півонії (15шт)", price: 1100, img: "pivtr.png" },
  { id: 5, name: "Ромашки (17шт)", price: 600, img: "roma.png" },
  { id: 6, name: "Мікс біло-блакитний (20шт)", price: 950, img: "mix.png" },
  { id: 7, name: "Блакитні гіпсофіли (51шт)", price: 700, img: "sucho.png" },
  { id: 8, name: "Мікс в коробці (51шт)", price: 1340, img: "mix-2.png" },
  { id: 9, name: "Тюльпани  (51шт)", price: 989, img: "tulp.png" },




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


