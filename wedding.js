function submitWeddingForm() {

  const name = document.getElementById('name').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const comment = document.getElementById('comment').value.trim();

  if (!name || !phone) {
    alert("Будь ласка, заповніть ім'я та номер телефону");
    return;
  }

  // можна тут зберігати в localStorage якщо потрібно
  // localStorage.setItem('weddingRequest', JSON.stringify({name, phone, comment}));

  alert("Заявка відправлена 💐 Ми звʼяжемось з вами!");

  // очистити поля
  document.getElementById('name').value = '';
  document.getElementById('phone').value = '';
  document.getElementById('comment').value = '';
}

  const products = [
  { id: 31, name: "Ніжний ранок", price: 600, img: "morning.png" },
  { id: 32, name: "Сонячна усмішка", price: 800, img: "sun.png" },
  { id: 33, name: "Пудрова Мрія", price: 750, img: "mria.png" },
  { id: 34, name: "Поцілунок нареченої", price: 600, img: "wedd.png" },
  { id: 35, name: "Біла симфонія", price: 540, img: "sumf.png" },
  { id: 36, name: "Весняна чистота", price: 345, img: "vesna.png" },
  { id: 37, name: "Перлина кохання", price: 550, img: "perl.png" },
  { id: 38, name: "Небесна ніжність", price: 600, img: "nebo.png" },
  { id: 39, name: "Рожевий шепіт", price: 660, img: "sepit.png" },
  { id: 40, name: "Королівська елегантність", price: 550, img: "ele.png" },
  { id: 41, name: "Солодка мелодія", price: 680, img: "melo.png" },
  { id: 42, name: "Вічне кохання", price: 490, img: "visne.png" },
  { id: 43, name: "Чарівна чистота", price: 550, img: "susto.png" },
  { id: 44, name: "Сяйво ніжності", price: 500, img: "saivo.png" },
  { id: 45, name: "Квіткова мелодія", price: 560, img: "ost.png" },


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
        <img src="all/${item.img}" width="60" style="margin-right:10px;">
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
