document.addEventListener("DOMContentLoaded", function () {
  // Определяем, где открыта страница: на главной или в подпапке wot-lom
  const inSubfolder = window.location.pathname.includes('/wot-lom/');
  
  // Автоматически настраиваем правильные пути к файлам
  const pagePath = inSubfolder ? '' : 'wot-lom/';
  const homePath = inSubfolder ? '../index.html' : 'index.html';

  // 1. КОД НАВИГАЦИОННОГО МЕНЮ
  const navContainer = document.getElementById("site-nav");
  if (navContainer) {
    navContainer.innerHTML = `
	  <a href="wot-lom/modpack-wot-lom.html">WoT-Lom Модпак (RU/EU)</a>
      <a href="wot-lom/modpack-tankalomych.html">Tankalomыч · Мир Танков</a>
      <a href="wot-lom/modpack-common-test.html">Модпак для тест-сервера</a>
      <a href="wot-lom/trial-cheats.html">Читы по отдельности</a>
	  
      <!-- ВНЕШНИЕ ССЫЛКИ В НОВОЙ ВКЛАДКЕ -->
	  <a href="wot-lom/magazin-akkauntov-kupit-akkaunt.html">☑ Магазин аккаунтов и ключей</a>
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