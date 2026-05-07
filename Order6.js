
function submitPayment() {
  const card = document.getElementById('card-number')?.value;
  const date = document.getElementById('card-date')?.value;
  const cvv = document.getElementById('card-cvv')?.value;
  const name = document.getElementById('card-name')?.value;
  const email = document.getElementById('email')?.value;
  const phone = document.getElementById('phone')?.value;

  if (!card || !date || !cvv || !name || !email || !phone) {
    alert('Будь ласка, заповніть усі поля 💗');
    return;
  }

  alert('Оплата успішна ✨ (демо)');
}

function submitPayment() {
  const inputs = document.querySelectorAll('input');
  const message = document.getElementById('payment-message');

  let allFilled = true;

  inputs.forEach(input => {
    if (input.value.trim() === '') {
      allFilled = false;
    }
  });

  // ❌ якщо не всі заповнені
  if (!allFilled) {
    message.textContent = 'Будь ласка, заповніть усі поля';
    message.style.background = '#fdecea';
    message.style.color = '#b71c1c';
    message.style.display = 'block';
    return;
  }
// ---- ВІДПРАВКА ДАНИХ У GOOGLE ТАБЛИЦЮ ----
const params = new URLSearchParams(window.location.search);
const orderForServer = {
    date: new Date().toLocaleString(),
    name: params.get('name') || 'Букет',
    quantity: params.get('quantity') || '1',
    total: params.get('total') || '0',
    delivery: params.get('delivery') || 'pickup',
    customer_name: params.get('customer_name') || 'Не вказано',
    customer_phone: params.get('customer_phone') || 'Не вказано',
    delivery_address: params.get('delivery_address') || ''  // ← НОВИЙ РЯДОК
};

// Надсилаємо дані на твій Google Apps Script
fetch('https://api.sheetbest.com/sheets/4401b4e7-f7a4-4dec-8c34-0c79247a4f43', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(orderForServer)
})
.then(response => response.json()) // Тепер ми можемо прочитати відповідь!
.then(data => {
  console.log('✅ Відповідь від сервера:', data);
  if (data.result === 'success') {
    console.log('Дані успішно збережено в таблиці!');
  } else {
    console.error('Помилка від сервера:', data);
    alert('Сталася помилка при збереженні замовлення. Ми зв\'яжемося з вами вручну.');
  }
})
.catch(error => {
  console.error('❌ Помилка при відправці:', error);
  alert('Помилка зв\'язку з сервером. Ваше замовлення збережено локально, ми зв\'яжемося з вами.');
});
  // ---- КІНЕЦЬ БЛОКУ ВІДПРАВКИ ----
  // ✅ якщо все ок
  message.textContent = 'Оплата пройшла успішно 💖 Очікуйте на повідомлення';
  message.style.background = '#e8f5e9';
  message.style.color = '#2e7d32';
  message.style.display = 'block';

  // очищаємо поля
  inputs.forEach(input => input.value = '');

  // блокуємо кнопку
  const btn = document.getElementById('pay-btn');
  btn.style.pointerEvents = 'none';
  btn.style.opacity = '0.6';
}



  
function getUrlParams() {
  const params = {};
  const query = new URLSearchParams(window.location.search);
  query.forEach((value, key) => {
    params[key] = isNaN(Number(value)) ? value : Number(value);
  });
  return params;
}

document.addEventListener('DOMContentLoaded', function () {
    console.log("🟢 Сторінка order6 завантажена");

    const params = new URLSearchParams(window.location.search);
    const total = parseFloat(params.get('total')) || 0;
    const name = params.get('name') || 'Букет';
    const delivery = params.get('delivery'); // pickup або delivery
    const fee = 49.05;

    let deliveryPrice = 0;
    if (delivery === 'delivery') {
        deliveryPrice = 100;
    }

    const finalTotal = total + fee + deliveryPrice;

    // Відображаємо назву букета
    const nameEl = document.getElementById('bouquet-name');
    if (nameEl) nameEl.textContent = name;

    // Відображаємо загальну суму
    const totalEl = document.getElementById('total-price');
    if (totalEl) totalEl.textContent = finalTotal.toFixed(2) + ' UAH';

    // Формуємо деталі (тепер без червоного кольору)
    let html = `Сума замовлення: ${total.toFixed(2)} UAH<br>`;
    if (deliveryPrice > 0) {
        html += `Доставка: ${deliveryPrice.toFixed(2)} UAH<br>`;
    }
    html += `Комісія за обробку замовлення: ${fee.toFixed(2)} UAH<br>
             <strong>До сплати: ${finalTotal.toFixed(2)} UAH</strong>`;

    const detailsEl = document.getElementById('payment-details');
    if (detailsEl) {
        detailsEl.innerHTML = html;
        console.log("🟢 Деталі оновлено");
    } else {
        console.log("❌ Елемент payment-details не знайдено!");
    }
});
