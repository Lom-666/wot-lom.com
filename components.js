document.addEventListener("DOMContentLoaded", function () {
  // Определяем базовый путь, чтобы ссылки никогда не двоились
  const isLocal = window.location.protocol === 'file:';
  const inSubfolder = window.location.pathname.includes('/wot-lom/');
  const basePath = isLocal ? (inSubfolder ? '' : 'wot-lom/') : '/wot-lom.com/wot-lom/';

  // ── 0. СТИЛИ ДЛЯ ПЛАШКИ ЗЕРКАЛА ──
  if (!document.getElementById("mirror-badge-style")) {
    const style = document.createElement("style");
    style.id = "mirror-badge-style";
    style.textContent = `
      .mirror-badge-container {
        box-sizing: border-box;
        z-index: 999;
      }

      .mirror-badge-box {
        box-sizing: border-box;
        width: 100%;
        background: var(--panel, #111820);
        border: 1px solid rgba(232, 124, 30, 0.45);
        border-top: 2px solid var(--orange, #e87c1e);
        border-radius: 4px;
        padding: 10px 14px;
        text-align: center;
        position: relative;
        overflow: hidden;
        box-shadow: 0 4px 20px rgba(0,0,0,0.6), 0 0 15px rgba(232, 124, 30, 0.2);
        animation: mirrorPulse 3.5s infinite ease-in-out;
      }

      /* Плавный и замедленный бегущий блик (6 секунд) */
      .mirror-badge-box::after {
        content: '';
        position: absolute;
        top: -50%;
        left: -150%;
        width: 70px;
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
        letter-spacing: 1.5px;
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

      /* ══ ВЫРАВНИВАНИЕ НА МОНИТОРАХ (ФИКСАЦИЯ И СТРОГО ПО ЛИНИИ БЛОКА) ══ */
      @media (min-width: 1441px) {
        .mirror-badge-container {
          position: fixed;
          top: 24px;
          left: calc(50% + 504px); /* Точные координаты правого рекламного блока */
          width: 220px;            /* Ровно ширина правого рекламного блока */
        }
      }

      /* На экранах ноутбуков и планшетов центрируется в шапке */
      @media (max-width: 1440px) {
        .mirror-badge-container {
          position: static;
          margin: 0 auto 16px auto;
          width: 260px;
        }
      }
    `;
    document.head.appendChild(style);
  }

  // ── 1. ВСТАВКА ПЛАШКИ ЗЕРКАЛА ──
  let mirrorBox = document.getElementById("mirror-badge");
  if (!mirrorBox) {
    const header = document.querySelector("header");
    if (header) {
      mirrorBox = document.createElement("div");
      mirrorBox.id = "mirror-badge";
      header.prepend(mirrorBox);
    }
  }

  if (mirrorBox) {
    mirrorBox.className = "mirror-badge-container";
    mirrorBox.innerHTML = `
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
  }

  // ── 2. КОД НАВИГАЦИОННОГО МЕНЮ ──
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

  // ── 3. КОД ЛЕВОГО РЕКЛАМНОГО БЛОКА ──
  const adLeft = document.getElementById("ad-left");
  if (adLeft) {
    adLeft.innerHTML = `
      <div class="partner-placeholder">
        РЕКЛАМНЫЙ БЛОК<br>160 × 600<br>(ЛЕВЫЙ)
      </div>
    `;
  }

  // ── 4. КОД ПРАВОГО РЕКЛАМНОГО БЛОКА ──
  const adRight = document.getElementById("ad-right");
  if (adRight) {
    adRight.innerHTML = `
      <div class="partner-placeholder">
        РЕКЛАМНЫЙ БЛОК<br>160 × 600<br>(ПРАВЫЙ)
      </div>
    `;
  }
});
