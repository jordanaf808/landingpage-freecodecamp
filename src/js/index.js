console.log('🕴️ We Making This Happen People!');

const menuButton = document.querySelector('.header__mobile--burger');
const header = document.querySelector('.header');
const overlay = document.querySelector('.overlay');

menuButton.addEventListener('click', e => {
  e.preventDefault();
  console.log('menu button clicked');

  if (header.classList.contains('open')) {
    header.classList.remove('open');
    overlay.classList.remove('fade-in');
    overlay.classList.add('fade-out');
    return console.log('menu closed');
  }
  header.classList.add('open');
  overlay.classList.remove('fade-out');
  overlay.classList.add('fade-in');
  return console.log('menu opened');
});
