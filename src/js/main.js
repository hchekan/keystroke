import '../scss/main.scss';
import '../index.html';
//установка значений и видимости элементов в зависимости от localStorage
document.addEventListener('DOMContentLoaded', function() {
  if(localStorage.length > 0){
    document.querySelector('.mainpage__container').classList.toggle('show');
    document.querySelector('.button__clear').classList.toggle('show');
    document.title = localStorage.getItem(0) + ' - ' + localStorage.getItem(2);
    let arr_details = [], arr_main = [];
    for(let i = 0; i < 8; i++) {
      if(i===1 || i===2 || i===4 || i===5){
        arr_main.push(localStorage.getItem(i));
      }
      arr_details.push(localStorage.getItem(i));
    }
    addDetails(arr_details);
    addMainData(arr_main);
    document.querySelector('.mainpage__big-keycode').innerHTML=localStorage.getItem(0);
  } else {
    document.querySelector('.homepage__container').classList.toggle('show');
  }
  document.querySelector('.expansion__container').classList.toggle('show');
});
//слушатель на нажатие клавиш
document.addEventListener('keydown', function(event) {
  document.querySelector('.homepage__container').classList.add('show');
  if(document.querySelector('.popup__container').classList.contains('show')){
    document.querySelector('.mainpage__container').classList.remove('show');
  }
  if(!document.querySelector('.popup__container').classList.contains('show') && event.keyCode===27){
    show();
  }
//обьявление переменных и занесение в них значений
  let key = event.key;
  const code = event.code;
  const keycode = event.keyCode;
  const location = event.location;
  let prevent, shiftkey, altkey, ctrlkey;

  document.title = keycode + ' - ' + code;

  if(keycode === 32) {
    key='(space character)';
  }
  if(event.key !== 'F11'){
    event.preventDefault();
    event.defaultPrevented ? prevent = 'yes' : prevent = 'no';
  }
  event.ctrlKey ? ctrlkey = 'with ctrl' : ctrlkey = 'without ctrl';
  event.shiftKey ? shiftkey = 'with shift' : shiftkey = 'without shift';
  event.altKey ? altkey = 'with alt' : altkey = 'without alt';

  document.querySelector('.mainpage__big-keycode').innerHTML=keycode;
//занесение переменных в массивы для передачи в функции,
//которые заполняют информацию о нажатой клавише
  const arr_main = [key, code, shiftkey, altkey];
  const arr_details = [keycode, key, code, ctrlkey, shiftkey, altkey, location, prevent];

  addMainData(arr_main);
  addDetails(arr_details);
});
//заполнение основных данных о нажатой клавише
function addMainData(arr_main){
  arr_main.forEach(function(item, i){
    document.querySelectorAll('.main__description')[i].innerHTML=item;
  });
}
//заполнение данных в popup
function addDetails(arr_details){
  arr_details.forEach(function(item, i){
    document.querySelectorAll('.popup__details')[i].innerHTML=item;
  });
}
//сохранение данных в localStorage
document.querySelector('.button__save').addEventListener('click', function(){
  localStorage.clear();
  const data = document.querySelectorAll('.popup__details');
  for(let i = 0; i < data.length; i++){
    localStorage.setItem(i, '' + data[i].innerHTML + '');
  }
  document.querySelector('.button__clear').classList.remove('show');
});
//очистка данных из localStorage
document.querySelector('.button__clear').addEventListener('click', function(){
  localStorage.clear();
  document.querySelector('.button__clear').classList.toggle('show');
});
//переход в полноэкранный режим и наоборот
document.querySelector('.expansion__img').addEventListener('click', function(){
  const fullScreenMode = document.fullscreenElement;
  if(!fullScreenMode) {
    const docElm = document.documentElement;
    if(docElm.requestFullscreen) {
      docElm.requestFullscreen();
    }
    document.querySelector('.expansion__img').src='minimize.png';
    document.querySelector('.expansion__img').title='Exit full screen mode';
  } else {
    if(document.exitFullscreen) {
      document.exitFullscreen();
    }
    document.querySelector('.expansion__img').src='full-screen.png';
    document.querySelector('.expansion__img').title='Enter full screen mode';
  }
});
//открытие popup
document.querySelector('.more__img').addEventListener('click', function(){
  show();
});
//закрытие popup
document.querySelector('.button__close__img').addEventListener('click', function(){
  show();
});
//показ и скрытие элементов
function show(){
  document.querySelector('.popup__container').classList.toggle('show');
  document.querySelector('.expansion__container').classList.toggle('show');
  document.querySelector('.mainpage__container').classList.toggle('show');
}
