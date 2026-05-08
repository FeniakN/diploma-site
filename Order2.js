
function getUrlParams() {
    const params = {};
    const queryString = window.location.search.substring(1);
    const pairs = queryString.split('&');
    
    pairs.forEach(pair => {
        const [key, value] = pair.split('=');
        params[key] = decodeURIComponent(value || '');
    });
    
    return params;
}

document.addEventListener('DOMContentLoaded', function() {
    const params = getUrlParams();
    
    if (params.name && params.price) {
        // 1. Оновлюємо назву
        const nameElement = document.getElementById('flower-name-only');
        if (nameElement) {
            // Якщо назва і кількість в одному рядку
            nameElement.textContent = params.name + (params.quantity ? ' - ' + params.quantity + ' шт' : '');
        }
        
        // 2. Оновлюємо кількість (якщо окремий елемент)
        const quantityElement = document.getElementById('flower-quantity');
        if (quantityElement && params.quantity) {
            quantityElement.textContent = params.quantity + ' шт';
        }
        
        // 3. Оновлюємо ціну
        const priceElement = document.getElementById('flower-price');
        if (priceElement) {
            priceElement.textContent = 'Всього : ' + params.price + ' грн';
        }
        
        // 4. Оновлюємо маленьку ціну
        const priceSmallElement = document.getElementById('flower-price-small');
        if (priceSmallElement) {
            priceSmallElement.textContent = params.price + ' грн';
        }
        
        // 5. Оновлюємо картинку
        const imageElement = document.getElementById('flower-image');
        if (imageElement && params.img) {
            imageElement.src = 'images/' + params.img;
            imageElement.alt = params.name;
        }
    }
});


function selectPack(option) {
  document.getElementById('pack1').style.background = 'white';
  document.getElementById('pack2').style.background = 'white';

  if (option === 1) {
    document.getElementById('pack1').style.background = 'black';
    extraPrice = 50;
  } else {
    document.getElementById('pack2').style.background = 'black';
    extraPrice = 100;
  }

  updatePrice();
}

let deliveryType = "pickup"; 
let quantity = 1;
let unitPrice = 0;
let extraPrice = 0;

document.addEventListener("DOMContentLoaded", function() {

  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart.length === 0) {
    console.log("Кошик порожній");
    return;
  }

  const item = cart[0]; // беремо перший товар

  quantity = item.quantity;
  unitPrice = item.price;

  // назва
  document.getElementById("flower-name-only").textContent =
    item.name + " - " + quantity + " шт";

  // картинка
  document.getElementById("flower-image").src =
    "images/" + item.img;

  updatePrice();
});

function changeQuantity(step) {
  quantity += step;
  if (quantity < 1) quantity = 1;
  updatePrice();
}

function updatePrice() {

  const flowersTotal = unitPrice * quantity;
  const total = flowersTotal + extraPrice;

  document.getElementById("flowers-price").textContent =
    flowersTotal + " ₴";

  document.getElementById("total-price").textContent =
    "Всього : " + total + " грн";

  document.getElementById("quantity-value").textContent =
    quantity;
}








document.addEventListener('DOMContentLoaded', function () {
  const params = new URLSearchParams(window.location.search);

  if (params.get('price')) {
    unitPrice = Number(params.get('price')); // 🔥 ЦІНА З URL
  }

  if (params.get('quantity')) {
    quantity = Number(params.get('quantity'));
  }

  updatePrice();
});

function changeQuantity(step) {
  quantity += step;
  if (quantity < 1) quantity = 1;
  updatePrice();
}

function updatePrice() {
  // 🔹 ціна за квіти
  const flowersTotal = unitPrice * quantity;
  document.getElementById('flowers-price').textContent =
    flowersTotal + ' ₴';

  // 🔹 всього
  const total = flowersTotal + extraPrice;
  document.getElementById('total-price').textContent =
    'Всього : ' + total + ' грн';

  // 🔹 назва + кількість
  const nameEl = document.getElementById('flower-name-only');
  const baseName = nameEl.textContent.split(' - ')[0];
  nameEl.textContent = baseName + ' - ' + quantity + ' шт';

  document.getElementById('quantity-value').textContent = quantity;
}

let isChecked = false;

function toggleReceiver() {
  const checkbox = document.getElementById('same-as-sender');

  const senderName = document.getElementById('sender-name').value;
  const senderPhone = document.getElementById('sender-phone').value;

  const receiverName = document.getElementById('receiver-name');
  const receiverPhone = document.getElementById('receiver-phone');

  if (!isChecked) {
    // ✅ ставимо галочку
    checkbox.innerHTML = '✓';
    checkbox.style.fontSize = '16px';

    // ✅ копіюємо дані
    receiverName.value = senderName;
    receiverPhone.value = senderPhone;

    isChecked = true;
  } else {
    // ❌ прибираємо галочку
    checkbox.innerHTML = '';

    // ❌ очищаємо поля
    receiverName.value = '';
    receiverPhone.value = '';

    isChecked = false;
  }
}

const dateButtons = document.querySelectorAll('.date-btn');
const timeBox = document.getElementById('time-box');
const timeText = document.getElementById('time-text');
const timeInput = document.getElementById('time-input');
const dateInput = document.getElementById('custom-date');

let selectedType = 'today';

// Функції для кожного типу кнопки
function selectToday() {
  selectedType = 'today';
  timeText.textContent = 'Обрати час';
  timeInput.value = '';
  
  // Автоматично відкриваємо вибір часу
  setTimeout(() => {
    timeInput.showPicker();
  }, 100);
}

function selectTomorrow() {
  selectedType = 'tomorrow';
  timeText.textContent = 'Обрати час';
  timeInput.value = '';
  
  // Автоматично відкриваємо вибір часу
  setTimeout(() => {
    timeInput.showPicker();
  }, 100);
}

function selectCustomDay() {
  selectedType = 'custom';
  timeText.textContent = 'Обрати дату';
  dateInput.value = '';
  
  // Автоматично відкриваємо календар
  setTimeout(() => {
    dateInput.showPicker();
  }, 100);
}

// Обробка кліків на кнопки
dateButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    // Скидаємо стилі всіх кнопок
    dateButtons.forEach(b => {
      b.style.background = 'white';
      b.style.color = 'black';
    });

    // Застосовуємо стилі для активної кнопки
    btn.style.background = 'black';
    btn.style.color = 'white';

    selectedType = btn.dataset.type;

    // Викликаємо відповідну функцію
    if (selectedType === 'today') {
      selectToday();
    } else if (selectedType === 'tomorrow') {
      selectTomorrow();
    } else if (selectedType === 'custom') {
      selectCustomDay();
    }
  });
});

// Обробка кліку по рамці для вибору часу/дати
timeBox.addEventListener('click', () => {
  if (selectedType === 'custom') {
    dateInput.showPicker();
  } else {
    timeInput.showPicker();
  }
});

// Обробка вибору дати
dateInput.addEventListener('change', () => {
  const date = new Date(dateInput.value);
  
  // Форматуємо дату у вигляді "03.02.26"
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear().toString().slice(-2);
  
  const formatted = `${day}.${month}.${year}`;
  timeText.textContent = formatted;
  
  // Автоматично відкриваємо вибір часу після вибору дати
  setTimeout(() => {
    timeInput.showPicker();
  }, 100);
});

// Обробка вибору часу
timeInput.addEventListener('change', () => {
  // Форматуємо час у зручний вигляд
  const timeParts = timeInput.value.split(':');
  const hours = timeParts[0];
  const minutes = timeParts[1];
  timeText.textContent = `${hours}:${minutes}`;
  
  // Якщо обрано "інший день", показуємо дату і час разом
  if (selectedType === 'custom' && dateInput.value) {
    const date = new Date(dateInput.value);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString().slice(-2);
    
    timeText.textContent = `${day}.${month}.${year} ${hours}:${minutes}`;
  }
});


// Ініціалізація при завантаженні сторінки
document.addEventListener('DOMContentLoaded', function() {
  // Встановлюємо поточну дату як мінімальну для вибору
  const today = new Date();
  const minDate = today.toISOString().split('T')[0];
  dateInput.min = minDate;
  
  // Встановлюємо початковий стан
  selectToday();
});

// Додайте цей код для покращення UX
timeBox.addEventListener('mouseenter', () => {
  timeBox.style.borderColor = '#007bff';
  timeBox.style.boxShadow = '0 0 0 1px rgba(0,123,255,0.25)';
});

timeBox.addEventListener('mouseleave', () => {
  timeBox.style.borderColor = 'black';
  timeBox.style.boxShadow = 'none';
});

timeBox.addEventListener('mousedown', () => {
  timeBox.style.backgroundColor = '#f8f9fa';
});

timeBox.addEventListener('mouseup', () => {
  timeBox.style.backgroundColor = 'white';
});

const addressInput = document.getElementById('address-input');
const addressText = document.getElementById('address-text');
const addressBox = document.getElementById('address-box');

// коли вводять адресу
addressInput.addEventListener('input', () => {
  addressText.textContent = addressInput.value || 'Обрати адресу';
  addressText.style.color = addressInput.value
    ? 'black'
    : 'rgba(0,0,0,0.6)';
});


// фокус ефект
addressInput.addEventListener('focus', () => {
  addressBox.style.borderColor = '#007bff';
  addressBox.style.boxShadow = '0 0 0 1px rgba(0,123,255,0.25)';
});

addressInput.addEventListener('blur', () => {
  addressBox.style.borderColor = 'black';
  addressBox.style.boxShadow = 'none';
});

document.getElementById('cart-btn').addEventListener('click', function () {

  const confirmDelete = confirm('Очистити кошик?');

  if (!confirmDelete) return;

  // очищаємо URL-параметри → просто й надійно
  window.location.href = 'кошик.html';

});

let paymentType = 'online';

const dotOnline = document.getElementById('dot-online');
const dotCash = document.getElementById('dot-cash');
const resultText = document.getElementById('order-result');
const buttonText = document.getElementById('pay-btn-text');

function selectPayment(type) {
  paymentType = type;
  resultText.textContent = '';

  if (type === 'online') {
    dotOnline.style.background = 'black';
    dotCash.style.background = 'white';
    buttonText.textContent = 'Перейти до оплати';
  }

  if (type === 'cash') {
    dotOnline.style.background = 'white';
    dotCash.style.background = 'black';
    buttonText.textContent = 'Оформити замовлення';
  }
}

function handlePaymentClick() {
    console.log("🟢 Початок переходу");

    // 1. Назва букета
    let name = 'Букет';
    const nameEl = document.getElementById('flower-name-only');
    if (nameEl) {
        const fullText = nameEl.textContent;
        name = fullText.split(' - ')[0];
    }
    console.log("📌 Назва:", name);

    // 2. Кількість
    const quantityValue = quantity;

    // 3. Ціна
    const total = unitPrice * quantity + extraPrice;

    // 4. Фото
    let img = '';
    const imgEl = document.getElementById('flower-image');
    if (imgEl) {
        img = imgEl.src.split('/').pop();
    }

    // 5. Тип доставки
    const delivery = deliveryType;
    console.log("🚚 Тип доставки:", delivery);

    // 6. Ім'я та телефон
    const customerName = document.getElementById('sender-name')?.value || '';
    const customerPhone = document.getElementById('sender-phone')?.value || '';
    console.log("👤 Ім'я:", customerName);
    console.log("📞 Телефон:", customerPhone);

    // 7. Адреса доставки
    let deliveryAddress = document.getElementById('address-input')?.value || '';
    console.log("📍 Адреса:", deliveryAddress);

    // 8. Формуємо URL
    const url = 'order6.html?' + 
        'name=' + encodeURIComponent(name) +
        '&quantity=' + quantityValue +
        '&total=' + total +
        '&img=' + encodeURIComponent(img) +
        '&delivery=' + delivery +
        '&customer_name=' + encodeURIComponent(customerName) +
        '&customer_phone=' + encodeURIComponent(customerPhone) +
        '&delivery_address=' + encodeURIComponent(deliveryAddress);

    console.log("🟢 Перехід на:", url);
    window.location.href = url;
}


document.addEventListener("DOMContentLoaded", function() {

  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  let container = document.getElementById("order-items");
  let totalContainer = document.getElementById("order-total");

  if (!container) return;

  if (cart.length === 0) {
    container.innerHTML = "<h3>Кошик порожній</h3>";
    return;
  }

  let total = 0;

  cart.forEach(item => {

    total += item.price * item.quantity;

    container.innerHTML += `
      <div style="display:flex; margin-bottom:15px;">
        <img src="images/${item.img}" width="80" style="margin-right:10px;">
        <div>
          <div><b>${item.name}</b></div>
          <div>${item.quantity} x ${item.price} грн</div>
        </div>
      </div>
    `;
  });

  totalContainer.innerHTML = `Загальна сума: ${total} грн`;

});



document.addEventListener("DOMContentLoaded", function() {

  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  let container = document.getElementById("order-items");
  let totalContainer = document.getElementById("order-total");

  if (!container) {
    console.log("Немає блоку order-items");
    return;
  }

  if (cart.length === 0) {
    container.innerHTML = "<h3>Кошик порожній</h3>";
    return;
  }

  let total = 0;

  cart.forEach(item => {

    total += item.price * item.quantity;

    container.innerHTML += `
      <div style="display:flex; margin-bottom:20px;">
        <img src="images/${item.img}" width="80" style="margin-right:15px;">
        <div>
          <div style="font-size:18px;"><b>${item.name}</b></div>
          <div>${item.quantity} × ${item.price} грн</div>
        </div>
      </div>
    `;
  });

  totalContainer.innerHTML = `
    <div style="font-size:20px; margin-top:20px;">
      Загальна сума: <b>${total} грн</b>
    </div>
  `;

  // ========== КНОПКИ ДОСТАВКИ / САМОВИВОЗУ ==========
const deliveryBtn = document.getElementById('delivery-btn');
const pickupBtn = document.getElementById('pickup-btn');

if (deliveryBtn) {
    deliveryBtn.addEventListener('click', function() {
        deliveryType = 'delivery';
        console.log("🟢 Обрано ДОСТАВКУ, deliveryType =", deliveryType);
    });
}

if (pickupBtn) {
    pickupBtn.addEventListener('click', function() {
        deliveryType = 'pickup';
        console.log("🟢 Обрано САМОВИВІЗ, deliveryType =", deliveryType);
    });
} 
// ========== ФІКС ДОСТАВКИ (ПРАЦЮЄ БЕЗ F12) ==========
setTimeout(function() {
    const deliveryBtn = document.getElementById('delivery-btn');
    const pickupBtn = document.getElementById('pickup-btn');

    if (deliveryBtn) {
        deliveryBtn.onclick = function() {
            deliveryType = 'delivery';
            console.log("🟢 Доставка обрана");
        };
    }

    if (pickupBtn) {
        pickupBtn.onclick = function() {
            deliveryType = 'pickup';
            console.log("🟢 Самовивіз обраний");
        };
    }
}, 200);
// ========== АВТОМАТИЧНЕ ВИБІР ДОСТАВКИ ПРИ ЗАВАНТАЖЕННІ ==========
// ========== АВТОМАТИЧНА ДОСТАВКА ПРИ ЗАВАНТАЖЕННІ ==========
(function() {
    // Встановлюємо доставку за замовчуванням
    deliveryType = 'delivery';
    console.log("🟢 Доставка активована автоматично");

    // Шукаємо кнопки за текстом (надійніше, ніж за id або стилями)
    const allDivs = document.querySelectorAll('div');
    let deliveryBtn = null;
    let pickupBtn = null;
    
    allDivs.forEach(div => {
        const text = div.innerText || div.textContent;
        if (text === 'Доставка' && div.style.cursor === 'pointer') {
            deliveryBtn = div;
        }
        if (text === 'Самовивіз' && div.style.cursor === 'pointer') {
            pickupBtn = div;
        }
    });
    
    // Якщо знайшли кнопку "Доставка" — робимо її активною візуально
    if (deliveryBtn) {
        deliveryBtn.style.opacity = '1';
        deliveryBtn.style.fontWeight = 'bold';
        // Шукаємо кружечок всередині
        const circle = deliveryBtn.querySelector('div:first-child');
        if (circle) circle.style.background = 'black';
    }
    
    // Робимо кнопку "Самовивіз" неактивною візуально
    if (pickupBtn) {
        pickupBtn.style.opacity = '0.6';
        const circle = pickupBtn.querySelector('div:first-child');
        if (circle) circle.style.background = 'white';
    }
    
    // Оновлюємо ціну (щоб доставка врахувалася)
    if (typeof updatePrice === 'function') {
        updatePrice();
    }
})();


});


