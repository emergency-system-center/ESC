let animationTriggered = false;

window.addEventListener('scroll', function() {
    const strokeElement = document.querySelector('.stroke');
    const rect = strokeElement.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // stroke 영역의 30%에 도달했는지 확인
    if (rect.top <= windowHeight * 0.1 && rect.bottom >= 0) {
        if (!animationTriggered) {
            // 애니메이션 시작
            document.querySelectorAll('.line').forEach(function(line) {
                line.style.opacity = '1';
                line.style.animation = 'lineAnimation 3s linear forwards';
            });
            document.querySelectorAll('.perpe').forEach(function(perpe) {
                perpe.style.opacity = '1';
                perpe.style.animation = 'verticalAnimation 3s linear forwards';
            });
            document.querySelectorAll('.diagonal').forEach(function(diagonal) {
                diagonal.style.opacity = '1';
                diagonal.style.animation = 'diagonalAnimation 3s linear forwards';
            });
            document.querySelectorAll('.circle').forEach(function(diagonal) {
                diagonal.style.opacity = '1';
                diagonal.style.animation = 'diagonalAnimation 3s linear forwards';
            });
            animationTriggered = true; // 애니메이션이 실행되었음을 기록
        }
    } else {
        // stroke 영역을 벗어났을 경우 애니메이션 다시 초기화
        animationTriggered = false;
        document.querySelectorAll('.line, .perpe, .diagonal, .circle').forEach(function(line) {
            line.style.opacity = '0';
            line.style.animation = 'none'; // 애니메이션 초기화
        });
    }
});