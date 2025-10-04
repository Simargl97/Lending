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
const MONTH_FACTOR = 4.33; // среднее количество недель в месяце
const AVERAGE_SCHEDULE = { hours: 6, days: 5 };
const AVERAGE_EXPENSES = 150;
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
  const hoursRange = document.getElementById('hoursRange');
  const daysRange = document.getElementById('daysRange');
  const expensesInput = document.getElementById('expensesInput');
  if(!(citySel && modeSel && hint)) return;
  const modeKey = modeSel.value || 'walk';
  const cityName = citySel.value || 'вашем городе';
  const hours = hoursRange ? parseInt(hoursRange.value, 10) : 0;
  const days = daysRange ? parseInt(daysRange.value, 10) : 0;
  const city = CITY_DATA.find(c => c.name === citySel.value) || CITY_DATA[0];
  const mode = MODE_OPTIONS.find(m => m.key === modeSel.value) || MODE_OPTIONS[0];
  const expenses = expensesInput ? parseFloat(expensesInput.value) || 0 : 0;
  const baseDaily = (mode?.hourlyRate || 0) * hours * (city?.multiplier || 1);
  const cityTips = typeof city?.avgTips === 'number' ? city.avgTips : 0;
  const dailyGross = baseDaily + cityTips;
  const dailyNet = Math.max(dailyGross - expenses, 0);
  const netValue = Math.round(dailyNet);
  const hasSchedule = hours > 0 && days > 0 && !Number.isNaN(netValue);
  const netText = hasSchedule ? ` · При ${hours} ч/день и ${days} дн/неделе ориентир ${netValue.toLocaleString('ru-RU')} ₽ чистыми с учётом средних чаевых.` : '';
  hint.textContent = (MODE_TIPS[modeKey] || '') + ' · Совет для ' + cityName + ': начинайте в час-пик и следите за погодой — осенью спрос выше.' + netText;
}
document.addEventListener('input', (e)=>{
  if(e.target && (e.target.id==='citySelect' || e.target.id==='modeSelect' || e.target.id==='hoursRange' || e.target.id==='daysRange' || e.target.id==='expensesInput')){
    updateCalcHint();
  }
});
document.addEventListener('DOMContentLoaded', updateCalcHint);

// === Data for calculator (approximate rates and city multipliers)
const MODE_OPTIONS = [
  { key: 'walk', label: 'Пешком', hourlyRate: 250 },
  { key: 'bike', label: 'Велосипед', hourlyRate: 400 },
  { key: 'ebike', label: 'Электровело', hourlyRate: 450 },
  { key: 'moto', label: 'Мото', hourlyRate: 500 },
  { key: 'auto', label: 'Авто', hourlyRate: 550 }
];
const CITY_DATA = [
  { name: 'Москва', multiplier: 1.2, avgTips: 320 },
  { name: 'Санкт‑Петербург', multiplier: 1.15, avgTips: 300 },
  { name: 'Екатеринбург', multiplier: 1.1, avgTips: 270 },
  { name: 'Новосибирск', multiplier: 1.05, avgTips: 260 },
  { name: 'Казань', multiplier: 1.05, avgTips: 250 },
  { name: 'Краснодар', multiplier: 1.05, avgTips: 250 },
  { name: 'Нижний Новгород', multiplier: 1.0, avgTips: 230 },
  { name: 'Ростов-на-Дону', multiplier: 1.0, avgTips: 230 },
  { name: 'Самара', multiplier: 1.0, avgTips: 220 },
  { name: 'Уфа', multiplier: 0.95, avgTips: 210 },
  { name: 'Пермь', multiplier: 0.95, avgTips: 210 },
  { name: 'Воронеж', multiplier: 0.95, avgTips: 200 },
  { name: 'Челябинск', multiplier: 0.95, avgTips: 200 },
  { name: 'Красноярск', multiplier: 0.9, avgTips: 190 },
  { name: 'Омск', multiplier: 0.9, avgTips: 190 },
  { name: 'Саратов', multiplier: 0.9, avgTips: 180 }
];
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
  const personalDayIncome = document.getElementById('personalDayIncome');
  const personalWeekIncome = document.getElementById('personalWeekIncome');
  const personalMonthIncome = document.getElementById('personalMonthIncome');
  const personalDayNet = document.getElementById('personalDayNet');
  const personalWeekNet = document.getElementById('personalWeekNet');
  const personalMonthNet = document.getElementById('personalMonthNet');
  const expensesInput = document.getElementById('expensesInput');
  const cityAveragePanel = document.getElementById('cityAveragePanel');
  const cityAverageTitle = document.getElementById('cityAverageTitle');
  const cityAvgDay = document.getElementById('cityAvgDay');
  const cityAvgWeek = document.getElementById('cityAvgWeek');
  const cityAvgMonth = document.getElementById('cityAvgMonth');
  const cityAvgDayNet = document.getElementById('cityAvgDayNet');
  const cityAvgWeekNet = document.getElementById('cityAvgWeekNet');
  const cityAvgMonthNet = document.getElementById('cityAvgMonthNet');
  const cityAverageNote = document.getElementById('cityAverageNote');

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

  function formatCurrency(value) {
    return Math.round(value).toLocaleString('ru-RU') + ' ₽';
  }

  // Compute and display incomes
  function updateIncome() {
    const hours = parseInt(hoursRange.value, 10);
    const days = parseInt(daysRange.value, 10);
    const city = CITY_DATA.find(c => c.name === citySelect.value) || CITY_DATA[0];
    const mode = MODE_OPTIONS.find(m => m.key === modeSelect.value) || MODE_OPTIONS[0];
    const expenses = expensesInput ? parseFloat(expensesInput.value) || 0 : 0;
    const cityTips = typeof city.avgTips === 'number' ? city.avgTips : 0;
    const baseDaily = mode.hourlyRate * hours * city.multiplier;
    const dailyGross = baseDaily + cityTips;
    const weeklyGross = dailyGross * days;
    const monthlyGross = weeklyGross * MONTH_FACTOR;
    const dailyNet = Math.max(dailyGross - expenses, 0);
    const weeklyNetValue = Math.max(dailyNet * days, 0);
    const monthlyNetValue = weeklyNetValue * MONTH_FACTOR;
    if (personalDayIncome) personalDayIncome.textContent = formatCurrency(dailyGross);
    if (personalWeekIncome) personalWeekIncome.textContent = formatCurrency(weeklyGross);
    if (personalMonthIncome) personalMonthIncome.textContent = formatCurrency(monthlyGross);
    if (personalDayNet) personalDayNet.textContent = 'Чистыми ' + formatCurrency(dailyNet);
    if (personalWeekNet) personalWeekNet.textContent = 'Чистыми ' + formatCurrency(weeklyNetValue);
    if (personalMonthNet) personalMonthNet.textContent = 'Чистыми ' + formatCurrency(monthlyNetValue);
    hoursValue.textContent = hours;
    daysValue.textContent = days;
  }

  function updateCityAverage() {
    if (!cityAveragePanel) return;
    const city = CITY_DATA.find(c => c.name === citySelect.value) || CITY_DATA[0];
    const mode = MODE_OPTIONS.find(m => m.key === modeSelect.value) || MODE_OPTIONS[0];
    if (!city || !mode) {
      return;
    }
    const schedule = city.averageSchedule || AVERAGE_SCHEDULE;
    const expenses = typeof city.avgExpenses === 'number' ? city.avgExpenses : AVERAGE_EXPENSES;
    const tips = typeof city.avgTips === 'number' ? city.avgTips : 0;
    const hours = schedule.hours || AVERAGE_SCHEDULE.hours;
    const days = schedule.days || AVERAGE_SCHEDULE.days;
    const baseDaily = (mode.hourlyRate || 0) * hours * (city.multiplier || 1);
    const dailyGross = baseDaily + tips;
    const weeklyGross = dailyGross * days;
    const monthlyGross = weeklyGross * MONTH_FACTOR;
    const dailyNet = Math.max(dailyGross - expenses, 0);
    const weeklyNetValue = Math.max(dailyNet * days, 0);
    const monthlyNetValue = weeklyNetValue * MONTH_FACTOR;

    if (cityAverageTitle) {
      cityAverageTitle.textContent = `Средний доход — ${city.name}`;
    }
    if (cityAvgDay) cityAvgDay.textContent = formatCurrency(dailyGross);
    if (cityAvgWeek) cityAvgWeek.textContent = formatCurrency(weeklyGross);
    if (cityAvgMonth) cityAvgMonth.textContent = formatCurrency(monthlyGross);
    if (cityAvgDayNet) cityAvgDayNet.textContent = 'Чистыми ' + formatCurrency(dailyNet);
    if (cityAvgWeekNet) cityAvgWeekNet.textContent = 'Чистыми ' + formatCurrency(weeklyNetValue);
    if (cityAvgMonthNet) cityAvgMonthNet.textContent = 'Чистыми ' + formatCurrency(monthlyNetValue);
    if (cityAverageNote) {
      const modeLabel = mode.label ? `для режима «${mode.label}» ` : '';
      cityAverageNote.textContent = `${modeLabel}при графике ~${hours} ч/день и ${days} смен в неделю, средних чаевых ${formatCurrency(tips)} и расходах ${formatCurrency(expenses)}.`;
    }
  }

  // Listen to changes
  citySelect.addEventListener('change', () => { updateIncome(); updateCalcHint(); updateCityAverage(); });
  modeSelect.addEventListener('change', () => { updateActiveModeIcon(); updateIncome(); updateCalcHint(); updateCityAverage(); });
  hoursRange.addEventListener('input', updateIncome);
  daysRange.addEventListener('input', updateIncome);
  expensesInput && expensesInput.addEventListener('input', updateIncome);

  // Initialize
  updateActiveModeIcon();
  updateIncome();
  updateCalcHint();
  updateCityAverage();
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
