
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
  const params = getUrlParams();

  const total = params.total || 0;
  const bouquetName = params.name || 'Букет';
  const fee = 49.05;
  const finalTotal = total + fee;

document.getElementById('total-price').textContent =
  finalTotal.toFixed(2) + ' UAH';


  document.getElementById('bouquet-name').textContent =
    bouquetName;

document.getElementById('payment-details').innerHTML =
  `Сума замовлення: ${total.toFixed(2)} UAH<br>
   Комісія за обробку замовлення: ${fee.toFixed(2)} UAH<br>
   <strong>До сплати: ${finalTotal.toFixed(2)} UAH</strong>`;

});
