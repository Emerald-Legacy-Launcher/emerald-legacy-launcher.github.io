import './style.css';

document.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelectorAll('.tab-item');
  const contents = document.querySelectorAll('.tab-content');

  let activeIndex = 0;

  const updateTabs = (index: number) => {
    if (index < 0) index = tabs.length - 1;
    if (index >= tabs.length) index = 0;

    activeIndex = index;

    tabs.forEach((tab, i) => {
      tab.classList.toggle('active', i === index);
    });

    contents.forEach((content, i) => {
      content.classList.toggle('active', i === index);
    });
  };

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => updateTabs(index));
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'q' || e.key === 'ArrowLeft') updateTabs(activeIndex - 1);
    if (e.key === 'e' || e.key === 'ArrowRight') updateTabs(activeIndex + 1);
  });

  document.getElementById('prev-tab')?.addEventListener('click', () => updateTabs(activeIndex - 1));
  document.getElementById('next-tab')?.addEventListener('click', () => updateTabs(activeIndex + 1));

  const carouselImg = document.querySelector('.carousel-img') as HTMLImageElement;
  const screenshots = ['/TU7_Panorama_Background_S.png', '/logo.png'];
  let screenIndex = 0;

  const rotateScreenshot = (dir: number) => {
    screenIndex = (screenIndex + dir + screenshots.length) % screenshots.length;
    if (carouselImg) {
      carouselImg.style.opacity = '0';
      setTimeout(() => {
        carouselImg.src = screenshots[screenIndex];
        carouselImg.style.opacity = '1';
      }, 100);
    }
  };

  document.querySelector('.carousel-arrow.left')?.addEventListener('click', () => rotateScreenshot(-1));
  document.querySelector('.carousel-arrow.right')?.addEventListener('click', () => rotateScreenshot(1));

  setInterval(() => rotateScreenshot(1), 5000);
});
