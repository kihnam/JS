var word = '남기훈'
while (true) {
var answer = prompt(word)
if (word[word.length - 1] === answer[0]) {
    // 맞았을 때
        alert('딩동댕')
        word = answer;
    } else {
    // 틀렸을 때
       alert('땡')
    }
}

for (var word = '남기훈'; true;) {
    var answer = prompt(word)
if (word[word.length - 1] === answer[0]) {
    // 맞았을 때
        alert('딩동댕')
        word = answer;
    } else {
    // 틀렸을 때
       alert('땡')
    }
}