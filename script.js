// === Data for calculator (approximate rates and city multipliers)
const MODE_OPTIONS = [
  { key: 'walk', label: 'Пешком', hourlyRate: 250 },
  { key: 'bike', label: 'Велосипед', hourlyRate: 400 },
  { key: 'ebike', label: 'Электровело', hourlyRate: 450 },
  { key: 'moto', label: 'Мото', hourlyRate: 500 },
  { key: 'auto', label: 'Авто', hourlyRate: 550 }
];

const DEFAULT_CITY_MULTIPLIER = 0.95;
const CITY_MULTIPLIERS = {
  'Москва': 1.2,
  'Санкт-Петербург (СПБ)': 1.15,
  'Екатеринбург': 1.1,
  'Новосибирск': 1.05,
  'Казань': 1.05,
  'Краснодар': 1.05,
  'Нижний Новгород': 1.0,
  'Ростов-на-Дону': 1.0,
  'Самара': 1.0,
  'Сочи': 1.0,
  'Нижневартовск': 1.0,
  'Сургут': 1.02,
  'Ханты-Мансийск': 1.02,
  'Новый Уренгой': 1.02,
  'Калининград': 0.98,
  'Красноярск': 0.98,
  'Тюмень': 0.98,
  'Мурманск': 0.97,
  'Тольятти': 0.96,
  'Уфа': 0.95,
  'Пермь': 0.95,
  'Воронеж': 0.95,
  'Челябинск': 0.95,
  'Волгоград': 0.95,
  'Ярославль': 0.95,
  'Омск': 0.93,
  'Саратов': 0.93,
  'Магнитогорск': 0.94
};

const CITY_NAMES = [
  'Абакан',
  'Адлер',
  'Альметьевск',
  'Анапа',
  'Апрелевка',
  'Армавир',
  'Архангельск',
  'Астрахань',
  'Балаково',
  'Балашиха',
  'Барнаул',
  'Батайск',
  'Белгород',
  'Бердск',
  'Благовещенск',
  'Бронницы',
  'Брянск',
  'Великий Новгород',
  'Видное',
  'Владивосток',
  'Владикавказ',
  'Владимир',
  'Волгоград',
  'Волжский',
  'Вологда',
  'Воронеж',
  'Воскресенск',
  'Всеволжск',
  'Выборг',
  'Гатчина',
  'Геленджик',
  'Дзержинск',
  'Дзержинский',
  'Дмитров',
  'Долгопрудный',
  'Домодедово',
  'Дубна',
  'Егорьевск',
  'Екатеринбург',
  'Елабуга',
  'Ессентуки',
  'Железнодорожный',
  'Звенигород',
  'Зеленоград',
  'Иваново',
  'Ивантеевка',
  'Ижевск',
  'Иркутск',
  'Йошкар-Ола',
  'Казань',
  'Калининград',
  'Калуга',
  'Кемерово',
  'Кингисепп',
  'Киров',
  'Кисловодск',
  'Клин',
  'Ковров',
  'Коломна',
  'Колпино',
  'Королёв',
  'Кострома',
  'Котельники',
  'Красногорск',
  'Краснодар',
  'Красноярск',
  'Курган',
  'Курск',
  'Лобня',
  'Лыткарино',
  'Люберцы',
  'Магнитогорск',
  'Майкоп',
  'Махачкала',
  'Москва',
  'Мурманск',
  'Мытищи',
  'Набережные Челны',
  'Нальчик',
  'Наро-Фоминск',
  'Нефтекамск',
  'Нижневартовск',
  'Нижнекамск',
  'Нижний Новгород',
  'Нижний Тагил',
  'Новокузнецк',
  'Новомосковск',
  'Новороссийск',
  'Новосибирск',
  'Новочеркасск',
  'Новый Уренгой',
  'Ногинск',
  'Обнинск',
  'Одинцово',
  'Омск',
  'Оренбург',
  'Орехово-Зуево',
  'Орёл',
  'Павловский Посад',
  'Пенза',
  'Пермь',
  'Петрозаводск',
  'Подольск',
  'Псков',
  'Пушкин',
  'Пушкино',
  'Пятигорск',
  'Раменское',
  'Реутов',
  'Ростов-на-Дону',
  'Рязань',
  'Самара',
  'Санкт-Петербург (СПБ)',
  'Саранск',
  'Саратов',
  'Северодвинск',
  'Сергиев Посад',
  'Серпухов',
  'Смоленск',
  'Солнечногорск',
  'Сочи',
  'Ставрополь',
  'Старый Оскол',
  'Стерлитамак',
  'Ступино',
  'Сургут',
  'Сыктывкар',
  'Таганрог',
  'Тамбов',
  'Тверь',
  'Тобольск',
  'Тольятти',
  'Томск',
  'Троицк',
  'Тула',
  'Тюмень',
  'Ульяновск',
  'Уссурийск',
  'Уфа',
  'Фрязино',
  'Хабаровск',
  'Ханты-Мансийск',
  'Химки',
  'Чебоксары',
  'Челябинск',
  'Череповец',
  'Чехов',
  'Шахты',
  'Щербинка',
  'Щёлково',
  'Электросталь',
  'Ярославль'
];

const CITY_DATA = CITY_NAMES.map(name => ({
  name,
  multiplier: CITY_MULTIPLIERS[name] ?? DEFAULT_CITY_MULTIPLIER
}));

const DEFAULT_CITY_NAME = 'Москва';

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

function normalizeCityString(value) {
  return (value || '')
    .toLowerCase()
    .replace(/ё/g, 'е')
    .replace(/[^a-zа-я0-9]/gi, '');
}

function highlightCityInList(cityName) {
  const items = document.querySelectorAll('[data-city-name]');
  if (!items.length) return;
  items.forEach(item => {
    if (cityName && item.dataset.cityName === cityName) {
      item.classList.add('is-active');
    } else {
      item.classList.remove('is-active');
    }
  });
}

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
  const citySearch = document.getElementById('citySearch');
  const cityDatalist = document.getElementById('cityOptions');
  const cityGrid = document.querySelector('.cities-grid');

  if (!citySelect || !modeSelect) return;

  citySelect.innerHTML = '';
  if (cityDatalist) {
    cityDatalist.innerHTML = '';
  }

  // Populate city options
  CITY_DATA.forEach(city => {
    const opt = document.createElement('option');
    opt.value = city.name;
    opt.textContent = city.name;
    citySelect.appendChild(opt);
    if (cityDatalist) {
      const option = document.createElement('option');
      option.value = city.name;
      cityDatalist.appendChild(option);
    }
  });

  const fallbackCity = CITY_DATA.find(c => c.name === DEFAULT_CITY_NAME) || CITY_DATA[0];
  if (fallbackCity) {
    citySelect.value = fallbackCity.name;
  }

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
    if (dayIncome) {
      dayIncome.textContent = Math.round(daily).toLocaleString('ru-RU') + ' ₽';
    }
    if (weekIncome) {
      weekIncome.textContent = Math.round(weekly).toLocaleString('ru-RU') + ' ₽';
    }
    if (monthIncome) {
      monthIncome.textContent = Math.round(monthly).toLocaleString('ru-RU') + ' ₽';
    }
    hoursValue.textContent = hours;
    daysValue.textContent = days;
    if (city) {
      highlightCityInList(city.name);
    } else {
      highlightCityInList(null);
    }
    if (citySearch && city && document.activeElement !== citySearch) {
      citySearch.value = city.name;
    }
  }

  // Listen to changes
  citySelect.addEventListener('change', () => {
    updateIncome();
    updateCalcHint();
    if (citySearch && document.activeElement !== citySearch) {
      citySearch.value = citySelect.value;
    }
  });
  modeSelect.addEventListener('change', () => { updateActiveModeIcon(); updateIncome(); updateCalcHint(); });
  hoursRange.addEventListener('input', updateIncome);
  daysRange.addEventListener('input', updateIncome);

  if (citySearch) {
    citySearch.addEventListener('input', () => {
      const normalizedQuery = normalizeCityString(citySearch.value);
      if (!normalizedQuery) {
        if (fallbackCity) {
          citySelect.value = fallbackCity.name;
          updateIncome();
          updateCalcHint();
        }
        return;
      }
      const match = CITY_DATA.find(city => normalizeCityString(city.name).includes(normalizedQuery));
      if (match) {
        citySelect.value = match.name;
        updateIncome();
        updateCalcHint();
      } else {
        highlightCityInList(null);
      }
    });
  }

  if (cityGrid) {
    cityGrid.addEventListener('click', (event) => {
      const target = event.target.closest('[data-city-name]');
      if (!target) return;
      const cityName = target.dataset.cityName;
      if (!cityName) return;
      citySelect.value = cityName;
      updateIncome();
      updateCalcHint();
      if (citySearch) {
        citySearch.value = cityName;
      }
    });
  }

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
