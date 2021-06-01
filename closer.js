// // 클로저 문제
// for (var i = 0; i < 100; i ++) {
//     setTimeout(function () {
//         console.log(i); // i는 스코프에 의해 1번째 줄 i가 된다.
//     }, i * 1000)
// }

// //클로저 해결방법
// for (var i = 0; i < 100; i ++) {
//     function 클로저(j) {
//         setTimeout(function () {
//             console.log(j);
//         }, j * 1000)
//     }
//     클로저(i);
// }

//클로저 즉시실행
for (var i = 0; i < 100; i ++) {
    (function 클로저(j) {
        setTimeout(function () {
            console.log(j);
        }, j * 1000)
    })(i);
}