// const scene = new THREE.Scene();
// const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000); // 기본 카메라 설정
// const renderer = new THREE.WebGLRenderer();
// renderer.setClearColor(0x101010); // 배경색 설정
//
// // item1 div의 크기 가져오기
// const item1 = document.querySelector('.item1');
// const rect = item1.getBoundingClientRect();
//
// // 렌더러의 크기를 item1의 크기로 설정
// renderer.setSize(rect.width, rect.height);
// item1.appendChild(renderer.domElement); // 캔버스 추가
//
// // 조명 추가
// const light = new THREE.DirectionalLight(0xE0FD48, 1);
// light.position.set(0, 1, 1).normalize();
// scene.add(light);
//
// // OBJ 파일 로드 및 크기, 위치 설정
// const loader = new THREE.OBJLoader();
// let object;
//
// loader.load('img/M1.obj', function (obj) {
//     object = obj;
//     object.position.set(0, 0, 0);
//
//     // 기본 스케일 조정
//     const scaleFactor = 1; // 기본 스케일
//     object.scale.set(scaleFactor, scaleFactor, scaleFactor); // 모델의 비율 조정
//
//     // 재질 설정
//     object.traverse(function (child) {
//         if (child.isMesh) {
//             child.material.transparent = true; // 투명도 적용
//             child.material.opacity = 0.5; // 50% 투명도 설정
//         }
//     });
//
//     scene.add(object);
// });
//
// // 카메라 위치 설정
// camera.position.z = 10; // 카메라 위치를 조정하여 깊이감을 줄이기
//
// // 비율을 유지하기 위해 카메라의 aspect 비율을 업데이트
// camera.aspect = rect.width / rect.height; // 카메라 비율 설정
// camera.updateProjectionMatrix(); // 프로젝션 매트릭스 업데이트
//
// // 마우스 좌표 변수
// let mouseX = 0;
// let mouseY = 0;
// let targetX = 0;
// let targetY = 0;
//
// const windowHalfX = window.innerWidth / 2;
// const windowHalfY = window.innerHeight / 2;
//
// document.addEventListener('mousemove', onDocumentMouseMove);
//
// function onDocumentMouseMove(event) {
//     mouseX = (event.clientX - windowHalfX) / 100;
//     mouseY = (event.clientY - windowHalfY) / 100;
// }
//
// // 애니메이션 루프
// function animate() {
//     requestAnimationFrame(animate);
//     targetX = mouseX * 1;
//     targetY = mouseY * 1;
//
//     if (object) {
//         object.rotation.y += 0.05 * (targetX - object.rotation.y);
//         object.rotation.x += 0.05 * (targetY - object.rotation.x);
//     }
//
//     renderer.render(scene, camera);
// }
// animate();
//
// // 반응형 처리
// function updateSize() {
//     const rect = item1.getBoundingClientRect();
//     renderer.setSize(rect.width, rect.height);
//     camera.aspect = rect.width / rect.height; // 카메라 비율 조정
//     camera.updateProjectionMatrix();
// }
//
// window.addEventListener('resize', updateSize);
//
//
//


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000); // 기본 카메라 설정
const renderer = new THREE.WebGLRenderer({ antialias: true }); // 렌더러에 안티앨리어싱 추가
renderer.setClearColor(0x101010); // 배경색 설정

// item1 div의 크기 가져오기
const item1 = document.querySelector('.item1');
const rect = item1.getBoundingClientRect();

// 렌더러의 크기를 item1의 크기로 설정
renderer.setSize(rect.width, rect.height);
item1.appendChild(renderer.domElement); // 캔버스 추가

// 카메라 비율 설정
camera.aspect = rect.width / rect.height;
camera.updateProjectionMatrix(); // 프로젝션 매트릭스 업데이트

// 조명 추가
const light = new THREE.DirectionalLight(0xE0FD48, 1);
light.position.set(0, 1, 1).normalize();
scene.add(light);

// OBJ 파일 로드 및 크기, 위치 설정
const loader = new THREE.OBJLoader();
let object;

loader.load('img/M1.obj', function (obj) {
    object = obj;
    object.position.set(0, 0, 0);

    // 기본 스케일 조정
    const scaleFactor = 1; // 기본 스케일
    object.scale.set(scaleFactor, scaleFactor, scaleFactor); // 모델의 비율 조정

    // 재질 설정
    object.traverse(function (child) {
        if (child.isMesh) {
            child.material.transparent = true; // 투명도 적용
            child.material.opacity = 0.5; // 50% 투명도 설정
        }
    });

    scene.add(object);
});

// 카메라 위치 설정
camera.position.z = 10; // 카메라 위치를 조정하여 깊이감을 줄이기

// 마우스 좌표 변수
let mouseX = 0;
let mouseY = 0;
let targetX = 0;
let targetY = 0;

const windowHalfX = window.innerWidth / 2;
const windowHalfY = window.innerHeight / 2;

document.addEventListener('mousemove', onDocumentMouseMove);

function onDocumentMouseMove(event) {
    mouseX = (event.clientX - windowHalfX) / 100;
    mouseY = (event.clientY - windowHalfY) / 100;
}

// 애니메이션 루프
function animate() {
    requestAnimationFrame(animate);
    targetX = mouseX * 1;
    targetY = mouseY * 1;

    if (object) {
        object.rotation.y += 0.05 * (targetX - object.rotation.y);
        object.rotation.x += 0.05 * (targetY - object.rotation.x);
    }

    renderer.render(scene, camera);
}
animate();

// 반응형 처리
function updateSize() {
    const rect = item1.getBoundingClientRect();
    renderer.setSize(rect.width, rect.height); // 렌더러 크기 업데이트
    camera.aspect = rect.width / rect.height; // 카메라 비율 조정
    camera.updateProjectionMatrix(); // 카메라 프로젝션 매트릭스 업데이트
}

window.addEventListener('resize', updateSize);
