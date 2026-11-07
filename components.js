document.addEventListener("DOMContentLoaded", function () {
  // Определяем базовый путь, чтобы ссылки никогда не двоились
  const isLocal = window.location.protocol === 'file:';
  const inSubfolder = window.location.pathname.includes('/wot-lom/');
  
  // На GitHub Pages используем точный путь от корня /wot-lom.com/wot-lom/, а локально — относительный
  const basePath = isLocal ? (inSubfolder ? '' : 'wot-lom/') : '/wot-lom.com/wot-lom/';

  // 1. КОД НАВИГАЦИОННОГО МЕНЮ
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
    `;

    // Автоматическая подсветка активной страницы
    const currentFile = window.location.pathname.split('/').pop() || 'index.html';
    const activeLink = navContainer.querySelector(`a[href$="${currentFile}"]`);
    if (activeLink) {
      activeLink.classList.add("active");
    }
  }

  // 2. КОД ЛЕВОГО РЕКЛАМНОГО БЛОКА
  const adLeft = document.getElementById("ad-left");
  if (adLeft) {
    adLeft.innerHTML = `
      <div class="partner-placeholder">
        РЕКЛАМНЫЙ БЛОК<br>160 × 600<br>(ЛЕВЫЙ)
      </div>
    `;
  }

  // 3. КОД ПРАВОГО РЕКЛАМНОГО БЛОКА
  const adRight = document.getElementById("ad-right");
  if (adRight) {
    adRight.innerHTML = `
      <div class="partner-placeholder">
        РЕКЛАМНЫЙ БЛОК<br>160 × 600<br>(ПРАВЫЙ)
      </div>
    `;
  }
});
