for (var i = 0; i < 100; i ++) {
    setTimeout(function () {
        console.log(i); // i는 스코프에 의해 1번째 줄 i가 된다.
    }, i * 1000)
}