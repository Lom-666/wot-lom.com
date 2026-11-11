document.addEventListener("DOMContentLoaded", function () {
  // ── 0. БАЗОВЫЕ ПУТИ ──
  const isLocal = window.location.protocol === 'file:';
  const inSubfolder = window.location.pathname.includes('/wot-lom/');
  const basePath = isLocal ? (inSubfolder ? '' : 'wot-lom/') : '/wot-lom.com/wot-lom/';

  // ── 1. СТИЛИ (НЕ ТРОГАЮТ ВЫСОТУ РЕКЛАМЫ И СТРОГО ВЫРАВНИВАЮТ ПЛАШКУ) ──
  if (!document.getElementById("site-dynamic-styles")) {
    const style = document.createElement("style");
    style.id = "site-dynamic-styles";
    style.textContent = `
      /* ── ПЛАШКА ЗЕРКАЛА ── */
      .mirror-badge-container {
        box-sizing: border-box;
        z-index: 10;
      }

      .mirror-badge-box {
        box-sizing: border-box;
        width: 100%;
        background: var(--panel, #111820);
        border: 1px solid rgba(232, 124, 30, 0.45);
        border-top: 2px solid var(--orange, #e87c1e);
        border-radius: 4px;
        padding: 10px 12px;
        text-align: center;
        position: relative;
        overflow: hidden;
        box-shadow: 0 4px 20px rgba(0,0,0,0.6), 0 0 15px rgba(232, 124, 30, 0.2);
        animation: mirrorPulse 3.5s infinite ease-in-out;
      }

      /* Плавный блик */
      .mirror-badge-box::after {
        content: '';
        position: absolute;
        top: -50%;
        left: -150%;
        width: 60px;
        height: 200%;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.35), rgba(255, 255, 255, 0.75), transparent);
        transform: rotate(25deg);
        animation: mirrorShimmer 6s infinite ease-in-out;
        pointer-events: none;
      }

      @keyframes mirrorShimmer {
        0%, 30% { left: -150%; }
        70%, 100% { left: 200%; }
      }

      @keyframes mirrorPulse {
        0%, 100% {
          border-color: rgba(232, 124, 30, 0.45);
          box-shadow: 0 4px 15px rgba(0,0,0,0.5), 0 0 10px rgba(232, 124, 30, 0.2);
        }
        50% {
          border-color: #ff9b3a;
          box-shadow: 0 4px 20px rgba(0,0,0,0.6), 0 0 20px rgba(232, 124, 30, 0.5);
        }
      }

      .mirror-badge-top {
        font-family: 'Exo 2', sans-serif;
        font-size: 11px;
        font-weight: 600;
        letter-spacing: 1.2px;
        color: var(--textdim, #7a8fa0);
        text-transform: uppercase;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 6px;
        margin-bottom: 4px;
      }

      .mirror-live-dot {
        width: 7px;
        height: 7px;
        background: #27ae60;
        border-radius: 50%;
        box-shadow: 0 0 8px #2ecc71;
        display: inline-block;
        animation: dotBlink 1.8s infinite;
      }

      @keyframes dotBlink {
        0%, 100% { opacity: 1; transform: scale(1); }
        50% { opacity: 0.4; transform: scale(0.85); }
      }

      .mirror-badge-bottom {
        font-family: 'Exo 2', sans-serif;
        font-size: 12px;
        color: #fff;
        font-weight: 500;
      }

      .mirror-badge-bottom a {
        font-family: 'Russo One', sans-serif;
        font-size: 13px;
        color: #ff9b3a;
        text-decoration: none;
        letter-spacing: 0.8px;
        text-shadow: 0 0 10px rgba(232, 124, 30, 0.6);
        transition: all 0.2s;
        border-bottom: 1px dashed rgba(255, 155, 58, 0.5);
        padding-bottom: 1px;
      }

      .mirror-badge-bottom a:hover {
        color: #fff;
        border-bottom-color: #fff;
        text-shadow: 0 0 15px #ff9b3a;
      }

      /* ── НА ШИРОКИХ ЭКРАНАХ: СИДИТ РОВНО НАД ПРАВОЙ КОЛОНКОЙ, НЕ СМЕЩАЯ ЕЁ ── */
      @media (min-width: 1441px) {
        .mirror-badge-container {
          position: absolute !important;
          bottom: calc(100% + 20px) !important; /* Ровно на 20px выше правого блока */
          left: 0 !important;
          width: 100% !important; /* Ширина ровно 220px по границам блока */
          margin: 0 !important;
        }
      }

      /* ── НА МАЛЕНЬКИХ ЭКРАНАХ: СТРОГО НАД БЛОКАМИ РЕКЛАМЫ И ОТРЫВ ОТ ПОЛА ── */
      @media (max-width: 1440px) {
        .layout-container {
          padding-bottom: 70px !important; /* Отрыв рекламы от нижнего края */
        }
        .wrap {
          grid-column: 1 / -1 !important;
          grid-row: 1 !important;
        }
        .mirror-badge-container {
          grid-column: 1 / -1 !important;
          grid-row: 2 !important; /* СТРОГО ВТОРАЯ СТРОКА (НАД РЕКЛАМОЙ) */
          margin: 15px auto 25px auto !important;
          position: static !important;
          width: 100% !important;
          max-width: 320px !important;
        }
        .side-column.side-left {
          grid-column: 1 !important;
          grid-row: 3 !important; /* РЕКЛАМА УХОДИТ НА ТРЕТЬЮ СТРОКУ (ПОД ПЛАШКУ) */
        }
        .side-column.side-right {
          grid-column: 2 !important;
          grid-row: 3 !important; /* РЕКЛАМА УХОДИТ НА ТРЕТЬЮ СТРОКУ (ПОД ПЛАШКУ) */
        }
      }

      @media (max-width: 650px) {
        .side-column.side-left {
          grid-column: 1 !important;
          grid-row: 3 !important;
        }
        .side-column.side-right {
          grid-column: 1 !important;
          grid-row: 4 !important;
        }
      }
    `;
    document.head.appendChild(style);
  }

  // ── 2. СОЗДАНИЕ И ПРАВИЛЬНОЕ ПЕРЕМЕЩЕНИЕ ПЛАШКИ ──
  let badge = document.getElementById("mirror-badge");
  if (!badge) {
    badge = document.createElement("div");
    badge.id = "mirror-badge";
  }
  badge.className = "mirror-badge-container";
  badge.innerHTML = `
    <div class="mirror-badge-box">
      <div class="mirror-badge-top">
        <span class="mirror-live-dot"></span>
        Официальное зеркало
      </div>
      <div class="mirror-badge-bottom">
        сайта <a href="https://wot-lom.com/" target="_blank" rel="noopener noreferrer">WoT-Lom.com</a>
      </div>
    </div>
  `;

  function positionBadge() {
    const rightCol = document.querySelector(".side-column.side-right");
    const leftCol = document.querySelector(".side-column.side-left");
    const layout = document.querySelector(".layout-container");

    if (!badge || !layout) return;

    if (window.innerWidth > 1440 && rightCol) {
      // ПК: крепим внутрь правой колонки (она сидит над ней)
      if (badge.parentElement !== rightCol) {
        rightCol.prepend(badge);
      }
    } else if (leftCol) {
      // Ноутбук/телефон: переносим в контейнер ПЕРЕД рекламными блоками
      if (badge.parentElement !== layout || badge.nextElementSibling !== leftCol) {
        layout.insertBefore(badge, leftCol);
      }
    }
  }

  positionBadge();
  window.addEventListener("resize", positionBadge);

  // ── 3. МЕНЮ НАВИГАЦИИ ──
  const navContainer = document.getElementById("site-nav");
  if (navContainer) {
    navContainer.innerHTML = `
      <a href="${basePath}modpack-wot-lom.html">WoT-Lom Модпак (RU/EU)</a>
      <a href="${basePath}modpack-tankalomych.html">Tankalomыч · Мир Танков</a>
      <a href="${basePath}modpack-common-test.html">Модпак для тест-сервера</a>
      <a href="${basePath}trial-cheats.html">Читы по отдельности</a>
      <a href="${basePath}magazin-akkauntov-kupit-akkaunt.html">☑ Магазин аккаунтов и ключей</a>
      
      <!-- ВНЕШНИЕ ССЫЛКИ В НОВОЙ ВКЛАДКЕ -->
      <a href="https://www.youtube.com/@WoT-Lomm" target="_blank" rel="noopener noreferrer">★ Ютуб канал сайта</a>
      <a href="https://t.me/WoTLom" target="_blank" rel="noopener noreferrer">★ ТГ канал сайта</a>
      <a href="https://t.me/WoT_Lom" target="_blank" rel="noopener noreferrer">★ ТГ группа сайта</a>
      
      <a href="${basePath}full-aimbot-lombot.html">★ Full AimBot (шайтан)</a>
      <a href="${basePath}rozygrysh-goldy.html">★ Розыгрыш голды</a>
    `;

    const currentFile = window.location.pathname.split('/').pop() || 'index.html';
    const activeLink = navContainer.querySelector(`a[href$="${currentFile}"]`);
    if (activeLink) {
      activeLink.classList.add("active");
    }
  }

  // ── 4. ЛЕВЫЙ РЕКЛАМНЫЙ БЛОК ──
  const adLeft = document.getElementById("ad-left");
  if (adLeft) {
    adLeft.innerHTML = `
      <div class="partner-placeholder">
        РЕКЛАМНЫЙ БЛОК<br>160 × 600<br>(ЛЕВЫЙ)
      </div>
    `;
  }

  // ── 5. ПРАВЫЙ РЕКЛАМНЫЙ БЛОК ──
  const adRight = document.getElementById("ad-right");
  if (adRight) {
    adRight.innerHTML = `
      <div class="partner-placeholder">
        РЕКЛАМНЫЙ БЛОК<br>160 × 600<br>(ПРАВЫЙ)
      </div>
    `;
  }
});
