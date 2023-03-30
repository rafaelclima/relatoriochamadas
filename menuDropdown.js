const menuItems = document.querySelectorAll('.menu li');
menuItems.forEach(item => {
  const content = item.querySelector('.content');
  const link = item.querySelector('a');
  link.addEventListener('click', function(event) {
    event.preventDefault();
    content.classList.toggle('show');
    content.style.opacity = 1
  });
});