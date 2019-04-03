'use strict';
/*
  Создайте компонент галлереи изображений следующего вида.
  
    <div class="image-gallery js-image-gallery">
      <div class="fullview">
        <!-- Если выбран первый элемент из preview -->
        <img src="img/fullview-1.jpeg" alt="alt text 1">
      </div>
      <!-- li будет столько, сколько объектов в массиве картинок. Эти 3 для примера -->
      <ul class="preview">
        <li><img src="img/preview-1.jpeg" data-fullview="img/fullview-1.jpeg" alt="alt text 1"></li>
        <li><img src="img/preview-2.jpeg" data-fullview="img/fullview-2.jpeg" alt="alt text 2"></li>
        <li><img src="img/preview-3.jpeg" data-fullview="img/fullview-3.jpeg" alt="alt text 3"></li>
      </ul>
    </div>   
    
    🔔 Превью компонента: https://monosnap.com/file/5rVeRM8RYD6Wq2Nangp7E4TkroXZx2
      
      
    Реализуйте функционал:
      
      - image-gallery есть изначально в HTML-разметке как контейнер для компонента.
    
      - fullview содержит в себе увеличенную версию выбранного изображения из preview, и
        создается динамически при загрузке страницы.
    
      - preview это список маленьких изображений, обратите внимание на атрибут data-fullview,
        он содержит ссылку на большое изображение. preview и его элементы, также создаются 
        динамически, при загрузке страницы.
        
      - При клике в элемент preview, необходимо подменить src тега img внутри fullview
        на url из data-атрибута выбраного элемента.
        
      - По умолчанию, при загрузке страницы, активным должен быть первый элемент preview.
        
      - Изображений может быть произвольное количество.
      
      - Используйте делегирование для элементов preview.
      
      - При клике, выбраный элемент из preview должен получать произвольный эффект выделения.
      
      - CSS-оформление и имена классов на свой вкус.
      
      
    🔔 Изображения маленькие и большие можно взять с сервиса https://www.pexels.com/, выбрав при скачивании
      размер. Пусть маленькие изображения для preview будут 320px по ширине, большие для fullview 1280px.
      Подберите изображения одинаковых пропорций.
*/

/*
  Массив объектов с данными для создания компонента выглядит следующим образом.
  Замените пути на соотвествующие вашим, или назовите изображения аналогично.
*/

const galleryItems = [
  { preview: './img/s1.jpg', fullview: 'img/L1.jpg', alt: 'alt text 1' },
  { preview: './img/s2.jpg', fullview: 'img/L2.jpg', alt: 'alt text 2' },
  { preview: './img/s3.jpg', fullview: 'img/L3.jpg', alt: 'alt text 3' },
  { preview: './img/s4.jpg', fullview: 'img/L4.jpg', alt: 'alt text 4' },
  { preview: './img/s5.jpg', fullview: 'img/L5.jpg', alt: 'alt text 5' },
  { preview: './img/s6.jpg', fullview: 'img/L6.jpg', alt: 'alt text 6' },
  { preview: './img/s8.jpg', fullview: 'img/L8.jpg', alt: 'alt text 8' },
  { preview: './img/s1.jpg', fullview: 'img/L1.jpg', alt: 'alt text 1' },
  { preview: './img/s2.jpg', fullview: 'img/L2.jpg', alt: 'alt text 2' },
  { preview: './img/s3.jpg', fullview: 'img/L3.jpg', alt: 'alt text 3' },
  { preview: './img/s4.jpg', fullview: 'img/L4.jpg', alt: 'alt text 4' },
  { preview: './img/s5.jpg', fullview: 'img/L5.jpg', alt: 'alt text 5' },
  { preview: './img/s6.jpg', fullview: 'img/L6.jpg', alt: 'alt text 6' },
  { preview: './img/s8.jpg', fullview: 'img/L8.jpg', alt: 'alt text 8' },
];

document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.js-image-gallery');
  const fullview = document.createElement('div');
  fullview.classList.add('fullview');
  const preview__container = document.querySelector('.preview__container');
  const preview = document.createElement('ul');
  preview.classList.add('preview');
  container.prepend(fullview);
  preview__container.prepend(preview);

  const fullImg = document.createElement('img');
  fullImg.setAttribute('src', galleryItems[0].fullview);
  fullview.appendChild(fullImg);

  const createPreview = arr => {
    const items = [];
    arr.map(el => {
      const item = document.createElement('li');
      const img = document.createElement('img');
      img.classList.add('grayscale');
      img.setAttribute('src', el.preview);
      img.setAttribute('data-fullview', el.fullview);
      img.setAttribute('alt', el.alt);
      item.appendChild(img);
      items.push(item);
    });
    preview.prepend(...items);
  };
  createPreview(galleryItems);

  const images = document.querySelectorAll('.preview > img');
  console.log(images);

  preview.addEventListener('click', e => {
    if (e.target.nodeName === 'IMG') {
      fullImg.setAttribute('src', e.target.dataset.fullview);
      e.target.classList.remove('grayscale');
    }
    if (fullImg.getAttribute('alt') !== e.target.getAttribute('alt')) {
    }
  });

  const carusel = () => {
    const leftButton = document.querySelector("[data-action='slideLeft']");
    const rightButton = document.querySelector("[data-action='slideRight']");

    const card = preview.querySelector('li');
    const cardWidth = card.offsetWidth;
    const cardMarginRight = +window.getComputedStyle(card).marginRight.match(/\d+/g)[0];
    const cardCount = preview.querySelectorAll('li').length;

    let offset = 0;
    const maxX = -(cardCount * cardWidth);
    leftButton.addEventListener('click', () => {
      if (offset !== 0) {
        offset += cardWidth + cardMarginRight;
        preview.style.transform = `translateX(${offset}px)`;
      }
      if (null) {
      }
    });
    rightButton.addEventListener('click', () => {
      console.log(offset);
      console.log(maxX + cardWidth * 6);
      if (offset > maxX + cardWidth * 6) {
        offset -= cardWidth + cardMarginRight;
        preview.style.transform = `translateX(${offset}px)`;
      }
    });
  };
  carusel();
});

/*
  ⚠️ ЗАДАНИЕ ПОВЫШЕННОЙ СЛОЖНОСТИ - ВЫПОЛНЯТЬ ПО ЖЕЛАНИЮ
  
  Создайте плагин галлереи используя ES6 класс. Добавьте поля и методы класса так, 
  чтобы можно было создать любое количество галлерей на странице. Функционал плагина 
  аналогичный заданию выше.
  
  При создании экземпляра конструктор получает:
    - items - список элементов для preview
    - parentNode - ссылку на DOM-узел в который будут помещены fullview и preview
    - defaultActiveItem - номер активного элемента preview по умолчанию
    
  Тогда создание экземпляра будет выглядеть следующим образом.
*/

// new Gallery({
//   items: galleryItems,
//   parentNode: document.querySelector('.image-gallery'),
//   defaultActiveItem: 1,
// });

/* Далее плагин работает в автономном режиме */
