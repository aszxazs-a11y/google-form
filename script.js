// 메뉴 데이터
const menuData = {
    coffee: [
        { name: '오피스 블렌드', description: '부드러운 바디감과 견과류 향이 특징인 시그니처 블렌드', price: '5,500원' },
        { name: '아메리카노', description: '깔끔하고 깊은 풍미의 에스프레소 베이스', price: '4,500원' },
        { name: '카페 라떼', description: '부드러운 우유와 에스프레소의 조화', price: '5,000원' },
        { name: '바닐라 라떼', description: '달콤한 바닐라 시럽이 더해진 라떼', price: '5,500원' },
        { name: '콜드브루', description: '18시간 저온 추출한 부드러운 커피', price: '5,500원' },
        { name: '아인슈패너', description: '비엔나 스타일 휘핑크림 커피', price: '6,000원' }
    ],
    drink: [
        { name: '제주 녹차 라떼', description: '제주 녹차로 만든 부드러운 라떼', price: '6,000원' },
        { name: '한라봉 에이드', description: '새콤달콤한 제주 한라봉 에이드', price: '6,500원' },
        { name: '감귤 스무디', description: '제주 감귤로 만든 상큼한 스무디', price: '6,500원' },
        { name: '자몽 에이드', description: '상큼한 자몽이 가득한 에이드', price: '6,000원' },
        { name: '얼그레이 밀크티', description: '향긋한 얼그레이 밀크티', price: '5,500원' },
        { name: '유자차', description: '따뜻한 제주 유자차', price: '5,000원' }
    ],
    dessert: [
        { name: '바스크 치즈케이크', description: '겉은 바삭하고 속은 부드러운 치즈케이크', price: '7,500원' },
        { name: '당근 케이크', description: '촉촉하고 건강한 당근 케이크', price: '6,500원' },
        { name: '티라미수', description: '에스프레소가 스며든 이탈리안 디저트', price: '7,000원' },
        { name: '스콘 세트', description: '버터 스콘과 클로티드 크림', price: '6,000원' },
        { name: '브라우니', description: '진한 초콜릿 브라우니', price: '5,500원' },
        { name: '마들렌', description: '버터향 가득한 프랑스 과자', price: '3,500원' }
    ]
};

// DOM 요소
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const menuTabs = document.querySelectorAll('.menu-tab');
const menuGrid = document.getElementById('menu-grid');
const navLinks = document.querySelectorAll('.nav-menu a');

// 모바일 메뉴 토글
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// 네비게이션 링크 클릭 시 모바일 메뉴 닫기
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// 메뉴 렌더링 함수
function renderMenu(category) {
    const items = menuData[category];
    menuGrid.innerHTML = items.map(item => `
        <div class="menu-item fade-in">
            <h4>${item.name}</h4>
            <p class="description">${item.description}</p>
            <p class="price">${item.price}</p>
        </div>
    `).join('');
}

// 메뉴 탭 클릭 이벤트
menuTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // 활성 탭 변경
        menuTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        // 메뉴 렌더링
        const category = tab.dataset.category;
        renderMenu(category);
    });
});

// 스크롤 시 네비게이션 스타일 변경
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }

    lastScroll = currentScroll;
});

// 플로팅 버튼 스크롤 시 표시/숨김
const floatingBtn = document.querySelector('.floating-btn');
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 500) {
        floatingBtn.style.opacity = '1';
        floatingBtn.style.visibility = 'visible';
    } else {
        floatingBtn.style.opacity = '0';
        floatingBtn.style.visibility = 'hidden';
    }
});

// 초기 상태 설정
floatingBtn.style.opacity = '0';
floatingBtn.style.visibility = 'hidden';
floatingBtn.style.transition = 'all 0.3s ease';

// 스크롤 애니메이션 (Intersection Observer)
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// 관찰할 요소들 등록
document.querySelectorAll('.about-content, .reservation-card, .menu-item, .gallery-item, .location-content').forEach(el => {
    observer.observe(el);
});

// 부드러운 스크롤 (네비게이션 링크)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// 페이지 로드 시 초기 메뉴 렌더링
document.addEventListener('DOMContentLoaded', () => {
    renderMenu('coffee');
});

// 현재 섹션 하이라이트
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-menu a:not(.nav-reservation)');

    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (window.pageYOffset >= sectionTop - 150) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === `#${current}`) {
            link.style.color = '#2d5a45';
        }
    });
});

// 예약 버튼 클릭 추적 (선택적 기능)
document.querySelectorAll('a[href*="forms.gle"]').forEach(btn => {
    btn.addEventListener('click', () => {
        console.log('예약 버튼 클릭됨');
        // 여기에 분석 코드 추가 가능 (예: Google Analytics)
    });
});
