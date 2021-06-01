var tbody = document.querySelector('#table tbody');
var dataset = [];
var 중단플래그 = false;
var 열은칸 = 0;
document.querySelector('#exec').addEventListener('click', function() {
    // 내부 먼저 초기화
    tbody.innerHTML = '';
    dataset = [];
    열은칸 = 0;
    중단플래그 = false;
    document.querySelector('#result').textContent = '';
    var hor = parseInt(document.querySelector('#hor').value);
    var ver = parseInt(document.querySelector('#ver').value);
    var mine = parseInt(document.querySelector('#mine').value);
    console.log(hor, ver, mine);

    // 지뢰 위치 뽑기
    var 후보군 = Array(hor * ver)
    .fill()
    .map(function (요소, 인덱스) {
        return 인덱스;
    });

    var 셔플 = [];
    
    while (후보군.length > 80) {
        var 이동값 = 후보군.splice(Math.floor(Math.random() * 후보군.length), 1)[0];
        셔플.push(이동값);
    }

    console.log(셔플);
    // 지뢰 테이블 만들기
    for (var i = 0; i < ver; i += 1) {
        var arr = [];
        var tr = document.createElement('tr');
        dataset.push(arr);
        for (var j = 0; j < hor; j += 1) {
            arr.push(1);
            var td = document.createElement('td');
            td.addEventListener('contextmenu', function(e) {
                e.preventDefault();
                if (중단플래그) {
                    return;
                }
                var 부모tr = e.currentTarget.parentNode;
                var 부모tbody = e.currentTarget.parentNode.parentNode;
                var 칸 = Array.prototype.indexOf.call(부모tr.children, e.currentTarget);
                var 줄 = Array.prototype.indexOf.call(부모tbody.children, 부모tr);
                console.log (부모tr, 부모tbody, e.currentTarget, 칸, 줄);
                if (e.currentTarget.textContent === '' || e.currentTarget.textContent === 'X') {
                    e.currentTarget.textContent = '!';
                } else if(e.currentTarget.textContent === '!') {
                    e.currentTarget.textContent = '?'
                } else if(e.currentTarget.textContent === '?') {
                    e.currentTarget.textContent = '';
                    if (dataset[줄][칸] === '1') {
                        e.currentTarget.textContent = '';
                    } else if (dataset[줄][칸] === 'X') {
                        e.currentTarget.textContent = 'X';
                    }
                }
            });
            td.addEventListener('click', function(e){
                if (중단플래그) {
                    return;
                }
                // 클릭했을 때 주변 지뢰 개수
                var 부모tr = e.currentTarget.parentNode;
                var 부모tbody = e.currentTarget.parentNode.parentNode;
                var 칸 = Array.prototype.indexOf.call(부모tr.children, e.currentTarget);
                var 줄 = Array.prototype.indexOf.call(부모tbody.children, 부모tr);
                e.currentTarget.classList.add('opened');
                열은칸 += 1;
                if (dataset[줄][칸] === 'X') { // 지뢰 클릭
                    e.currentTarget.textContent = '펑';
                    document.querySelector('#result').textContent = '실패';
                    중단플래그 = true;
                } else { // 지뢰가 아닌 경우 주변 지뢰 개수
                    dataset[줄][칸] = 1;
                    var 주변 = [
                        dataset[줄][칸-1], dataset[줄][칸+1]
                    ];
                    if (dataset[줄-1]) {
                        주변 = 주변.concat([dataset[줄-1][칸-1], dataset[줄-1][칸], dataset[줄-1][칸+1]]);
                    }
                    if (dataset[줄+1]) {
                        주변 = 주변.concat([dataset[줄+1][칸-1], dataset[줄+1][칸], dataset[줄+1][칸+1]]);
                    }
                    e.currentTarget.textContent = 주변.filter(function(v) {
                        return v === 'X';
                    }).length;
                    e.currentTarget.textContent = 주변지뢰개수 || '';
                    if (주변지뢰개수 === 0) {
                        console.log('주변을 엽니다');
                        var 주변칸 = [];
                        if (tbody.children[줄-1]) {
                            주변칸 = 주변칸.concat([
                                tbody.children[줄 - 1].children[칸 - 1],
                                tbody.children[줄 - 1].children[칸],
                                tbody.children[줄 - 1].children[칸 + 1],
                            ]);
                        }
                        주변칸 = 주변칸.concat([
                            tbody.children[줄].children[칸 - 1],
                            tbody.children[줄].children[칸 + 1],
                        ]);

                        if (tbody.children[줄+1]) {
                            주변칸 = 주변칸.concat([
                                tbody.children[줄 + 1].children[칸 - 1],
                                tbody.children[줄 + 1].children[칸],
                                tbody.children[줄 + 1].children[칸 + 1],
                            ]);
                        }
                        주변칸.filter(function (v) {
                            return !!v;
                        }).forEach(function(옆칸) {
                            var 부모tr = 옆칸.parentNode;
                            var 부모tbody = 옆칸.parentNode.parentNode;
                            var 옆칸칸 = Array.prototype.indexOf.call(부모tr.children, 옆칸);
                            var 옆칸줄 = Array.prototype.indexOf.call(부모tbody.children, 부모tr);
                            if (dataset[옆칸줄][옆칸칸] !== 코드표.연칸) {
                                옆칸.click();
                            }
                        });
                   }
                }
                if (열은칸 === hor * ver - mine) {
                    중단플래그 = true;
                    document.querySelector('#result').textContent = '승리';
                }
            });
            tr.appendChild(td);
        }
        tbody.appendChild(tr);
    }
    //지뢰 심기
    for (var k = 0; k < 셔플.length; k++) {
        var 세로 = Math.floor(셔플[k] / 10);
        var 가로 = 셔플[k] % 10;
        tbody.children[세로].children[가로].textContent = 'X';
        dataset[세로][가로] = 'X';
    }
});