const sliderContainer = document.querySelector('.slider-container');
const slider = document.querySelector('.slider');
let isMouseDown = false;
let startY;
let scrollTop;
let autoScrollInterval;
let currentPosition = 0;

// 슬라이더 아이템 복사 및 설정
function setupInfiniteSlider() {
    const items = Array.from(slider.children);
    const itemCount = items.length;

    // 앞뒤로 아이템 복사
    for (let i = 0; i < itemCount; i++) {
        const cloneStart = items[i].cloneNode(true);
        const cloneEnd = items[i].cloneNode(true);
        slider.insertBefore(cloneStart, items[0]);
        slider.appendChild(cloneEnd);
    }

    // 초기 위치 설정
    updateSliderPosition();
}

function updateSliderPosition() {
    const itemHeight = 110; // item height + gap
    slider.style.transform = `translateY(${currentPosition}px)`;

    // 슬라이더 위치 재설정
    const totalItems = slider.children.length;
    const originalItems = totalItems / 3;
    const totalHeight = originalItems * itemHeight;

    if (Math.abs(currentPosition) >= totalHeight * 2) {
        currentPosition = -totalHeight;
        slider.style.transition = 'none';
        slider.style.transform = `translateY(${currentPosition}px)`;
        // Force reflow
        slider.offsetHeight;
        slider.style.transition = 'transform 0.3s ease';
    } else if (currentPosition > 0) {
        currentPosition = -totalHeight;
        slider.style.transition = 'none';
        slider.style.transform = `translateY(${currentPosition}px)`;
        slider.offsetHeight;
        slider.style.transition = 'transform 0.3s ease';
    }
}

// 자동 스크롤 시작
function startAutoScroll() {
    stopAutoScroll();
    autoScrollInterval = setInterval(() => {
        if (!isMouseDown) {
            currentPosition -= 1;
            updateSliderPosition();
        }
    }, 16); // 약 60fps
}

// 자동 스크롤 정지
function stopAutoScroll() {
    if (autoScrollInterval) {
        clearInterval(autoScrollInterval);
    }
}

// 마우스 이벤트 핸들러
sliderContainer.addEventListener('mousedown', (e) => {
    isMouseDown = true;
    startY = e.pageY - sliderContainer.offsetTop;
    scrollTop = currentPosition;
    stopAutoScroll();
    slider.style.transition = 'none';
});

document.addEventListener('mousemove', (e) => {
    if (!isMouseDown) return;

    const y = e.pageY - sliderContainer.offsetTop;
    const walk = (y - startY);
    currentPosition = scrollTop + walk;
    updateSliderPosition();
});

document.addEventListener('mouseup', () => {
    isMouseDown = false;
    slider.style.transition = 'transform 0.3s ease';
    startAutoScroll();
});

// 터치 이벤트 핸들러
sliderContainer.addEventListener('touchstart', (e) => {
    isMouseDown = true;
    startY = e.touches[0].pageY - sliderContainer.offsetTop;
    scrollTop = currentPosition;
    stopAutoScroll();
    slider.style.transition = 'none';
});

document.addEventListener('touchmove', (e) => {
    if (!isMouseDown) return;

    const y = e.touches[0].pageY - sliderContainer.offsetTop;
    const walk = (y - startY);
    currentPosition = scrollTop + walk;
    updateSliderPosition();
});

document.addEventListener('touchend', () => {
    isMouseDown = false;
    slider.style.transition = 'transform 0.3s ease';
    startAutoScroll();
});

// 초기화
setupInfiniteSlider();
startAutoScroll();


//---홈 목업 애니메이션

$(document).ready(function () {
    MovingMock1();
    MovingMock2();
});

function MovingMock1() {
    $(".mock1").animate({ marginTop: "-200px" }, 2700, "swing", function () { // 위에서 아래로
        $(this).animate({ marginTop: "150px" }, 2700, "swing", function () {
            MovingMock1();
        });
    });
}

function MovingMock2() {
    $(".mock2").animate({ marginTop: "200px" }, 2700, "swing", function () { // 아래에서 위로
        $(this).animate({ marginTop: "0px" }, 2700, "swing", function () {
            MovingMock2();
        });
    });
}

//--top버튼

    // 버튼 스크롤 시 보이기/숨기기
    window.onscroll = function() {
    const button = document.getElementById("scrollToTopBtn");
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
    button.style.display = "block";
} else {
    button.style.display = "none";
}
};

    // 스크롤 애니메이션
    document.getElementById("scrollToTopBtn").addEventListener("click", function() {
    scrollToTop();
});

    function scrollToTop() {
    let currentPosition = document.documentElement.scrollTop || document.body.scrollTop;
    if (currentPosition > 0) {
    window.requestAnimationFrame(scrollToTop);
    window.scrollTo(0, currentPosition - currentPosition / 8); // 부드럽게 이동
}
}

//--애니메이션 재생

//--애니메이션 재생

//--애니메이션 재생
const observerOptions = {
    root: null,
    threshold: 0.6
};

const sceneObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const wrapper = entry.target.querySelector('.wrapper');
        const ball = wrapper.querySelector('.ball');
        const rings = ball.querySelectorAll('.ring');

        if (entry.isIntersecting) {
            // 먼저 요소들을 보이게 함
            ball.style.visibility = 'visible';

            // 모든 애니메이션 초기화
            ball.style.animation = 'none';
            rings.forEach(ring => {
                ring.style.animation = 'none';
            });

            // 리플로우 강제 실행
            void wrapper.offsetWidth;

            // 애니메이션 제거하여 CSS에 정의된 애니메이션이 다시 적용되도록 함
            ball.style.animation = '';
            rings.forEach(ring => {
                ring.style.animation = '';
            });
        } else {
            // 뷰포트에서 벗어났을 때 숨김
            ball.style.visibility = 'hidden';
        }
    });
}, observerOptions);

// scene 요소 관찰 시작
document.addEventListener('DOMContentLoaded', () => {
    const scene = document.querySelector('.scene');
    if (scene) {
        // 초기 상태는 숨김
        const ball = scene.querySelector('.ball');
        if (ball) {
            ball.style.visibility = 'hidden';
        }
        sceneObserver.observe(scene);
    }
});






