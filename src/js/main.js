import '../scss/main.scss';
import '../index.html';

// заполнение основных данных о нажатой клавише
function addMainData(arrMain) {
  arrMain.forEach((item, i) => {
    document.querySelectorAll('.main__description')[i].innerHTML = item;
  });
}

// заполнение данных в popup
function addDetails(arrDetails) {
  arrDetails.forEach((item, i) => {
    document.querySelectorAll('.popup__details')[i].innerHTML = item;
  });
}

// показ и скрытие элементов
function toggleVisibility() {
  document.querySelector('.popup__container').classList.toggle('show');
  document.querySelector('.expansion__container').classList.toggle('show');
  document.querySelector('.mainpage__container').classList.toggle('show');
}

// установка значений и видимости элементов в зависимости от localStorage
function setValuesVisibility() {
  if (localStorage.length > 0) {
    document.querySelector('.mainpage__container').classList.toggle('show');
    document.querySelector('.button__clear').classList.toggle('show');
    document.title = `${localStorage.getItem(0)} - ${localStorage.getItem(2)}`;
    const arrDetails = [];
    const arrMain = [];
    for (let i = 0; i < 8; i += 1) {
      if (i === 1 || i === 2 || i === 4 || i === 5) {
        arrMain.push(localStorage.getItem(i));
      }
      arrDetails.push(localStorage.getItem(i));
    }
    addDetails(arrDetails);
    addMainData(arrMain);
    document.querySelector('.mainpage__big-keycode').innerHTML = localStorage.getItem(0);
  } else {
    document.querySelector('.homepage__container').classList.toggle('show');
  }
  document.querySelector('.expansion__container').classList.toggle('show');
}

document.addEventListener('DOMContentLoaded', setValuesVisibility);

// слушатель на нажатие клавиш
document.addEventListener('keydown', (event) => {
  document.querySelector('.homepage__container').classList.add('show');
  if (document.querySelector('.popup__container').classList.contains('show')) {
    document.querySelector('.mainpage__container').classList.remove('show');
  }
  if (!document.querySelector('.popup__container').classList.contains('show') && event.keyCode === 27) {
    toggleVisibility();
  }

  let { key: keyKey } = event;
  const { code: codeKey } = event;
  const { keyCode: keycodeKey } = event;
  const { location: locationKey } = event;
  let prevent;
  const shiftkey = event.shiftKey ? 'with shift' : 'without shift';
  const altkey = event.altKey ? 'with alt' : 'without alt';
  const ctrlkey = event.ctrlKey ? 'with ctrl' : 'without ctrl';

  document.title = `${keycodeKey} - ${codeKey}`;

  if (keycodeKey === 32) {
    keyKey = '(space character)';
  }
  if (event.key !== 'F11') {
    event.preventDefault();
    prevent = event.defaultPrevented ? 'yes' : 'no';
  }

  document.querySelector('.mainpage__big-keycode').innerHTML = keycodeKey;

  const arrMain = [keyKey, codeKey, shiftkey, altkey];
  const arrDetails = [keycodeKey, keyKey, codeKey, ctrlkey, shiftkey, altkey, locationKey, prevent];

  addMainData(arrMain);
  addDetails(arrDetails);
});

// сохранение данных в localStorage
function saveData() {
  localStorage.clear();
  const data = document.querySelectorAll('.popup__details');
  for (let i = 0; i < data.length; i += 1) {
    localStorage.setItem(i, data[i].innerHTML);
  }
  document.querySelector('.button__clear').classList.remove('show');
}

document.querySelector('.button__save').addEventListener('click', saveData);

// очистка данных из localStorage
function cleanLocalStorage() {
  localStorage.clear();
  document.querySelector('.button__clear').classList.toggle('show');
}

document.querySelector('.button__clear').addEventListener('click', cleanLocalStorage);

// переход в полноэкранный режим и наоборот
function expansion() {
  const fullScreenMode = document.fullscreenElement;
  if (!fullScreenMode) {
    const docElm = document.documentElement;
    if (docElm.requestFullscreen) {
      docElm.requestFullscreen();
    }
    document.querySelector('.expansion__img').src = 'minimize.png';
    document.querySelector('.expansion__img').title = 'Exit full screen mode';
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
    document.querySelector('.expansion__img').src = 'full-screen.png';
    document.querySelector('.expansion__img').title = 'Enter full screen mode';
  }
}

document.querySelector('.expansion__img').addEventListener('click', expansion);

// открытие popup
document.querySelector('.more__img').addEventListener('click', toggleVisibility);

// закрытие popup
document.querySelector('.button__close__img').addEventListener('click', toggleVisibility);
