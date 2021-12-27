let list = document.querySelectorAll('.list');

function activeLink() {
  list.forEach((item) => {
    item.classList.remove('active');
    this.classList.add('active');
  })
}
var url = window.location.href;
for (var i = url.length - 1; i >= 0; i--) {
  if (url[i] == '/') {
    url = url.slice(i + 1, url.length)
    break;
  }
}
// if(url=="news") {
  // document.getElementsByClassName('.list').classList.remove('active');
// }
list.forEach((item) => {
  item.addEventListener('click', activeLink);
});
