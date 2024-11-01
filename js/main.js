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

//--ai 인터랙션

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // 요소가 뷰포트에 들어올 때 애니메이션 실행
        entry.target.classList.add('visible');
      } else {
        // 요소가 뷰포트에서 벗어날 때 클래스 제거
        entry.target.classList.remove('visible');
        
        // 애니메이션 리셋을 위해 잠시 대기 후 스타일 초기화
        setTimeout(() => {
          entry.target.querySelectorAll('.ai').forEach(ai => {
            ai.style.animation = 'none';
            ai.offsetHeight; // 리플로우 강제 실행
            ai.style.animation = null;
          });
        }, 100);
      }
    });
  }, {
    threshold: 0.5, // 20% 정도 보일 때 트리거
    rootMargin: '-50px' // 뷰포트 상단에서 50px 아래에서부터 감지 시작
  });
  
  // 모든 .aiV 요소에 observer 적용
  document.querySelectorAll('.aiV').forEach(element => {
    observer.observe(element);
  });

//menu

// 메뉴 클릭시 부드러운 스크롤
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop,
                behavior: 'smooth'
            });
        }
    });
});


//디자인 시스템

document.addEventListener("DOMContentLoaded", function() {
    const gridItems = document.querySelectorAll(".font, .mainColor, .subColor1, .subColor2, .subColor3");
    const gridContainer = document.querySelector(".systemGrid-container");

    // 옵저버 설정
    const observerOptions = {
        threshold: 0.5 // 요소가 20% 정도 화면에 보일 때 트리거
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                // 컨테이너가 화면에 보이면 모든 그리드 아이템에 애니메이션 적용
                gridItems.forEach((el, index) => {
                    // 각 요소에 인덱스를 기반으로 지연 시간 설정
                    let delay = 0; // 기본 지연 시간

                    if (index === 0 || index === 1) {
                        delay = 0.2;
                    } else if (index === 3) {
                        delay = 0.3;
                    } else if (index === 2 || index === 4) {
                        delay = 0.4;
                    }

                    el.style.transitionDelay = `${delay}s`;
                    el.classList.add("visible");
                });
            } else {
                // 컨테이너가 화면에서 벗어나면 모든 그리드 아이템의 애니메이션 초기화
                gridItems.forEach(el => {
                    el.classList.remove("visible");
                    el.style.transitionDelay = '0s';
                });
            }
        });
    }, observerOptions);

    // systemGrid-container 관찰 시작
    if (gridContainer) {
        observer.observe(gridContainer);
    }
});

//Vision-Value

document.addEventListener("DOMContentLoaded", function() {
    const svElements = document.querySelectorAll('.sv');
    const serviceContainer = document.querySelector('.service-value1');

    // Intersection Observer 설정
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };

    const observerCallback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // 컨테이너가 화면에 보이면 모든 sv 요소에 애니메이션 적용
                svElements.forEach((el, index) => {
                    let delay = 0;

                    if (index === 0) {
                        delay = 0.2;
                    } else if (index === 1) {
                        delay = 0.4;
                    } else if (index === 2) {
                        delay = 0.6;
                    }

                    el.style.transitionDelay = `${delay}s`;
                    el.classList.add('visible');
                });
            } else {
                // 컨테이너가 화면에서 벗어나면 모든 sv 요소의 애니메이션 초기화
                svElements.forEach(el => {
                    el.classList.remove('visible');
                    el.style.transitionDelay = '0s';
                });
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // service-value1 컨테이너 관찰 시작
    if (serviceContainer) {
        observer.observe(serviceContainer);
    }
});

//페르소나

document.addEventListener("DOMContentLoaded", function() {
    const perElements = document.querySelectorAll(".per");
    const personaContainer = document.querySelector(".persona1");

    // 옵저버 설정
    const observerOptions = {
        root: null,
        threshold: 0.3 // 요소가 30% 정도 화면에 보일 때 트리거
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                // 컨테이너가 화면에 보이면 모든 per 요소에 애니메이션 적용
                perElements.forEach((el, index) => {
                    let delay = 0; // 기본 지연 시간

                    if (index === 0 || index === 1) {
                        delay = 0.2; // per1-1, per1-2
                    } else if (index === 2 || index === 3) {
                        delay = 0.4; // per1-3, per1-4
                    } else if (index === 4 || index === 5) {
                        delay = 0.8; // per1-5, per1-6
                    }

                    el.style.transitionDelay = `${delay}s`;
                    el.classList.add("visible");
                });
            } else {
                // 컨테이너가 화면에서 벗어나면 모든 per 요소의 애니메이션 초기화
                perElements.forEach(el => {
                    el.classList.remove("visible");
                    el.style.transitionDelay = '0s';
                });
            }
        });
    }, observerOptions);

    // persona1 컨테이너 관찰 시작
    if (personaContainer) {
        observer.observe(personaContainer);
    }
});