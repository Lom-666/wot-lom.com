document.addEventListener("DOMContentLoaded", function () {
  // ── 0. БАЗОВЫЕ ПУТИ ──
  const isLocal = window.location.protocol === 'file:';
  const inSubfolder = window.location.pathname.includes('/wot-lom/');
  const basePath = isLocal ? (inSubfolder ? '' : 'wot-lom/') : '/wot-lom.com/wot-lom/';

  // ── 1. СТИЛИ (СИНХРОНИЗИРОВАНЫ РОВНО НА 1400px) ──
  if (!document.getElementById("site-dynamic-styles")) {
    const style = document.createElement("style");
    style.id = "site-dynamic-styles";
    style.textContent = `
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

      /* ── НА МОНИТОРЕ (>1400px): СТРОГО НАД ПРАВОЙ КОЛОНКОЙ ── */
      @media (min-width: 1401px) {
        .mirror-badge-container {
          position: absolute !important;
          bottom: calc(100% + 40px) !important;
          left: 0 !important;
          width: 100% !important;
          margin: 0 !important;
        }
      }

      /* ── НА ЭКРАНАХ <= 1400px: СТРОГО НАД РЕКЛАМОЙ И ОТРЫВ ОТ ПОЛА ── */
      @media (max-width: 1400px) {
        .layout-container {
          padding-bottom: 30px !important;
        }
        .wrap {
          grid-column: 1 / -1 !important;
          grid-row: 1 !important;
        }
        .mirror-badge-container {
          grid-column: 1 / -1 !important;
          grid-row: 2 !important;
          margin: 15px auto 25px auto !important;
          position: static !important;
          width: 100% !important;
          max-width: 320px !important;
        }
        .side-column.side-left {
          grid-column: 1 !important;
          grid-row: 3 !important;
        }
        .side-column.side-right {
          grid-column: 2 !important;
          grid-row: 3 !important;
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

  // ── 2. СОЗДАНИЕ И ПЕРЕМЕЩЕНИЕ ПЛАШКИ ──
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

  // Синхронизированный с CSS медиа-запрос ровно на 1400px
  const mediaQuery = window.matchMedia("(max-width: 1400px)");

  function positionBadge() {
    const rightCol = document.querySelector(".side-column.side-right");
    const wrap = document.querySelector(".wrap");
    const layout = document.querySelector(".layout-container");

    if (!badge || !layout) return;

    if (!mediaQuery.matches && rightCol) {
      // Большой монитор (>1400px): внутрь правой колонки над баннером
      if (badge.parentElement !== rightCol) {
        rightCol.prepend(badge);
      }
    } else if (wrap) {
      // Экран <= 1400px: строго ПОСЛЕ контента сайта (перед рекламой)
      if (badge.parentElement !== layout || badge.previousElementSibling !== wrap) {
        wrap.after(badge);
      }
    }
  }

  positionBadge();
  // Слушаем изменение ширины окна без малейших задержек
  mediaQuery.addEventListener("change", positionBadge);

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
