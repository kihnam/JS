var left = 0;
setInterval(function () {
   if (left === 0) {
       left = '-190px';
   } else if (left === '-190px' ) {
       left ='-400px';
   } else {
       left = 0;
   }
   document.querySelector('#computer').style.background = 
   'url(./가위바위보.jpg)' + left + ' 0';
}, 100);

document.querySelectorAll('.btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
        console.log(this.textContent);
    });
})