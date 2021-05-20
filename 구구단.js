while (true) {
    var 숫자1 = Math.ceil(Math.random() * 9)
    var 숫자2 = Math.ceil(Math.random() * 9)
    var 결과 = 숫자1 * 숫자2
    var 조건 = true;
    while (조건) {
        var 답 = prompt(String(숫자1) + '곱하기' + String(숫자2) + '는?')
        if (결과 === Number(답)) {
            alert('딩동댕');
            조건 = false;
        } else {
            alert('땡');    
        }
    }
}