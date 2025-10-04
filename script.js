// === Data for calculator (approximate rates and city multipliers)
const MODE_OPTIONS = [
  { key: 'walk', label: 'Пешком', hourlyRate: 250 },
  { key: 'bike', label: 'Велосипед', hourlyRate: 400 },
  { key: 'ebike', label: 'Электровело', hourlyRate: 450 },
  { key: 'moto', label: 'Мото', hourlyRate: 500 },
  { key: 'auto', label: 'Авто', hourlyRate: 550 }
];

const CITY_DATA = [
  { name: 'Москва', multiplier: 1.2 },
  { name: 'Санкт‑Петербург', multiplier: 1.15 },
  { name: 'Екатеринбург', multiplier: 1.1 },
  { name: 'Новосибирск', multiplier: 1.05 },
  { name: 'Казань', multiplier: 1.05 },
  { name: 'Краснодар', multiplier: 1.05 },
  { name: 'Нижний Новгород', multiplier: 1.0 },
  { name: 'Ростов-на-Дону', multiplier: 1.0 },
  { name: 'Самара', multiplier: 1.0 },
  { name: 'Уфа', multiplier: 0.95 },
  { name: 'Пермь', multiplier: 0.95 },
  { name: 'Воронеж', multiplier: 0.95 },
  { name: 'Челябинск', multiplier: 0.95 },
  { name: 'Красноярск', multiplier: 0.9 },
  { name: 'Омск', multiplier: 0.9 },
  { name: 'Саратов', multiplier: 0.9 }
];

// script.js — минимальная логика: модал формы, анимация появления и отправка формы (локально)
document.addEventListener('DOMContentLoaded', function () {
  // Modal open/close
  const modal = document.getElementById('modal');
  const openBtns = document.querySelectorAll('#openFormBtn, #openFormBtn2');
  const closeBtn = document.getElementById('modalClose');
  const cancelBtn = document.getElementById('modalCancel');

  function openModal(e){
    e && e.preventDefault();
    modal.setAttribute('aria-hidden','false');
    document.body.style.overflow = 'hidden';
  }
  function closeModal(){
    modal.setAttribute('aria-hidden','true');
    document.body.style.overflow = '';
  }
  openBtns.forEach(b=> b && b.addEventListener('click', openModal));
  closeBtn && closeBtn.addEventListener('click', closeModal);
  cancelBtn && cancelBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', function(e){
    if(e.target === modal) closeModal();
  });

  // Simple form handling (local demo)
  const form = document.getElementById('applyForm');
  const result = document.getElementById('formResult');

  form && form.addEventListener('submit', function(e){
    e.preventDefault();
    const data = new FormData(form);
    const payload = {};
    data.forEach((v,k)=> payload[k]=v);
    // Здесь можно отправить данные на сервер или в Google Forms / Telegram webhook.
    // Для демонстрации — выводим сообщение и очищаем форму.
    result.textContent = 'Спасибо! Ваша заявка отправлена. Мы свяжемся с вами в ближайшее время.';
    form.reset();
    setTimeout(()=> {
      result.textContent = '';
      closeModal();
    }, 3500);
    console.log('Заявка (пример):', payload);
  });

  // Плавное появление секций при скролле
  const showOnScroll = () => {
    const items = document.querySelectorAll('.feature-card, .aud-card, .step, .product, .test');
    const trigger = window.innerHeight * 0.9;
    items.forEach(i=>{
      const top = i.getBoundingClientRect().top;
      if(top < trigger) i.style.opacity = 1, i.style.transform = 'translateY(0)';
    });
  };

  // Инициализация стилей для анимации
  document.querySelectorAll('.feature-card, .aud-card, .step, .product, .test').forEach(el=>{
    el.style.opacity = 0;
    el.style.transform = 'translateY(18px)';
    el.style.transition = 'all 600ms cubic-bezier(.2,.9,.3,1)';
  });

  showOnScroll();
  window.addEventListener('scroll', showOnScroll);
});

// ===== Build city tags dynamically from CITY_DATA
(function buildCityTags(){
  const tags = document.getElementById('citiesTags');
  if(!tags) return;
  tags.innerHTML = '';
  CITY_DATA.forEach((c, idx) => {
    const b = document.createElement('button');
    b.className = 'city-tag';
    b.setAttribute('role','listitem');
    b.setAttribute('data-city', c.name);
    b.textContent = c.name;
    if(idx < 18) b.classList.add('highlight'); // визуальный приоритет крупнейшим
    tags.appendChild(b);
  });
})();

// ===== calc tips
const MODE_TIPS = {
  walk: 'Пеший курьер — удобнее в центре и рядом с метро. Ставьте короткие слоты в час-пик.',
  bike: 'Велосипед — идеален для плотной застройки и парков. Проверьте подсветку/дождевик.',
  ebike: 'Электровело — выше темп и радиус, следите за зарядом и маршрутом.',
  moto: 'Мото — быстрые дальние заказы. Выбирайте районы с крупными магистралями.',
  auto: 'Авто — удобно по крупным радиусам и в непогоду. Планируйте парковки у ТЦ.'
};
function updateCalcHint(){
  const citySel = document.getElementById('citySelect');
  const modeSel = document.getElementById('modeSelect');
  const hint = document.getElementById('calcHint');
  if(!(citySel && modeSel && hint)) return;
  const modeKey = modeSel.value || 'walk';
  const city = citySel.value || 'вашем городе';
  hint.textContent = (MODE_TIPS[modeKey] || '') + ' · ' + 'Совет для ' + city + ': начинайте в час-пик и следите за погодой — осенью спрос выше.';
}
document.addEventListener('input', (e)=>{
  if(e.target && (e.target.id==='citySelect' || e.target.id==='modeSelect' || e.target.id==='hoursRange' || e.target.id==='daysRange')){
    updateCalcHint();
  }
});
document.addEventListener('DOMContentLoaded', updateCalcHint);

/**
 * Populate select options for city and mode, and set up event listeners
 */
function initCalculator() {
  const citySelect = document.getElementById('citySelect');
  const modeSelect = document.getElementById('modeSelect');
  const hoursRange = document.getElementById('hoursRange');
  const daysRange = document.getElementById('daysRange');
  const hoursValue = document.getElementById('hoursValue');
  const daysValue = document.getElementById('daysValue');
  const dayIncome = document.getElementById('dayIncome');
  const weekIncome = document.getElementById('weekIncome');
  const monthIncome = document.getElementById('monthIncome');

  if (!citySelect || !modeSelect) return;

  // Populate city options
  CITY_DATA.forEach(city => {
    const opt = document.createElement('option');
    opt.value = city.name;
    opt.textContent = city.name;
    citySelect.appendChild(opt);
  });
  citySelect.selectedIndex = 0;

  // Populate mode options
  MODE_OPTIONS.forEach(optData => {
    const opt = document.createElement('option');
    opt.value = optData.key;
    opt.textContent = optData.label;
    modeSelect.appendChild(opt);
  });
  modeSelect.value = MODE_OPTIONS[0].key;

  // Add active state to mode icons when clicked
  const modeIcons = document.querySelectorAll('.mode-icons img');
  modeIcons.forEach((img, idx) => {
    img.addEventListener('click', () => {
      modeSelect.value = MODE_OPTIONS[idx].key;
      updateActiveModeIcon();
      updateIncome();
      updateCalcHint();
    });
  });

  function updateActiveModeIcon() {
    const selectedKey = modeSelect.value;
    modeIcons.forEach((img, idx) => {
      const key = MODE_OPTIONS[idx].key;
      if (key === selectedKey) {
        img.classList.add('active');
      } else {
        img.classList.remove('active');
      }
    });
  }

  // Compute and display incomes
  function updateIncome() {
    const hours = parseInt(hoursRange.value, 10);
    const days = parseInt(daysRange.value, 10);
    const city = CITY_DATA.find(c => c.name === citySelect.value) || CITY_DATA[0];
    const mode = MODE_OPTIONS.find(m => m.key === modeSelect.value) || MODE_OPTIONS[0];
    const daily = mode.hourlyRate * hours * city.multiplier;
    const weekly = daily * days;
    const monthly = weekly * 4;
    dayIncome.textContent = Math.round(daily).toLocaleString('ru-RU') + ' ₽';
    weekIncome.textContent = Math.round(weekly).toLocaleString('ru-RU') + ' ₽';
    monthIncome.textContent = Math.round(monthly).toLocaleString('ru-RU') + ' ₽';
    hoursValue.textContent = hours;
    daysValue.textContent = days;
  }

  // Listen to changes
  citySelect.addEventListener('change', () => { updateIncome(); updateCalcHint(); });
  modeSelect.addEventListener('change', () => { updateActiveModeIcon(); updateIncome(); updateCalcHint(); });
  hoursRange.addEventListener('input', updateIncome);
  daysRange.addEventListener('input', updateIncome);

  // Initialize
  updateActiveModeIcon();
  updateIncome();
  updateCalcHint();
}

// Initialize calculator on DOMContentLoaded
document.addEventListener('DOMContentLoaded', initCalculator);

// === Reviews tab switching and toggle logic ===
function initReviews() {
  const tabs = document.querySelectorAll('.tab');
  const panels = document.querySelectorAll('.tab-panel');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.getAttribute('data-tab');
      // update active tab
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      // show relevant panel
      panels.forEach(p => {
        if (p.id === 'tab-' + target) {
          p.classList.add('active');
        } else {
          p.classList.remove('active');
        }
      });
    });
  });

  // Review expand/collapse
  const toggles = document.querySelectorAll('.review-toggle');
  toggles.forEach(btn => {
    btn.addEventListener('click', () => {
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', (!expanded).toString());
      btn.textContent = expanded ? 'Развернуть' : 'Свернуть';
      const text = btn.previousElementSibling;
      if (!text) return;
      if (expanded) {
        text.style.maxHeight = '4.2em';
        text.style.overflow = 'hidden';
      } else {
        text.style.maxHeight = 'none';
        text.style.overflow = 'visible';
      }
    });
  });
}


document.addEventListener('DOMContentLoaded', initReviews);
