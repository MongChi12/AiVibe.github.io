$(function() {
    // 뷰포트의 가로길이가 1024px 이상이면, pc버전, 1024px 미만이면 모바일 버전으로 주메뉴 애니메이션 설정
    if ($(window).width() >= 1024) {
        // 주메뉴에서 마우스 오버하면 서브메뉴와 배경 나타남
        $("nav > ul > li").mouseenter(function() {
            $(".sub").stop().slideDown();
            $(".sub-bg").stop().fadeIn();
        });
        // 메뉴 영역에서 마우스아웃하면 서브메뉴와 배경 사라짐
        $("nav").mouseleave(function() {
            $(".sub").stop().slideUp();
            $(".sub-bg").stop().fadeOut();
        });
    } else {
        // 아코디언 메뉴
        $('nav > ul > li > a').click(function() {
            if (!$(this).hasClass('active')) {
                $('nav > ul > li > a').next().slideUp();
                $('nav > ul > li > a').removeClass('active');
                $(this).addClass('active');
                $(this).next().slideDown();
            } else {
                $(this).removeClass('active');
                $(this).next().slideUp();
            }
        });
    }

    const swipercontainer = new Swiper('.swiper-container', {
        slidesPerView: 3,
        spaceBetween: 20,
        loop: false,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
        },
        breakpoints: {
            1200: {
                slidesPerView: 2,
                spaceBetween: 20
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 20
            },
            768: {
                slidesPerView: 3,
                spaceBetween: 20
            },
            480: {
                slidesPerView: 2,
                spaceBetween: 20
            },
            360: {
                slidesPerView: 2,
                spaceBetween: 20
            }
        },
        on: {
            slideChangeTransitionStart: function () {
                document.querySelector('.swiper-button-prev').classList.add('active');
                document.querySelector('.swiper-button-next').classList.add('active');
            }
        }
    });
    
    let lastHoveredCard = null; // 마지막으로 호버된 카드를 저장할 변수

    $(".is-Active").hover(
        function() {
            // 이전에 호버된 카드가 있다면 active 클래스 제거
            if (lastHoveredCard) {
                $(lastHoveredCard).removeClass("active").css("background-color", "");
            }

            // 현재 카드에 active 클래스 추가 및 배경색 변경
            const color = $(this).data("color");
            $(this).addClass("active").css("background-color", color);
            lastHoveredCard = this;
        },
        function() {
            // 마우스 아웃 시에도 active 클래스를 유지하므로 아무 작업도 하지 않음
        }
    );

    $(".is-Active").hover(
        function() {
            // 이전에 호버된 카드가 있다면 active 클래스를 제거하여 이미지 초기화
            if (lastHoveredCard && lastHoveredCard !== this) {
                $(lastHoveredCard).removeClass("active");
            }

            // 현재 카드에 active 클래스 추가
            $(this).addClass("active");
            lastHoveredCard = this;
        },
        function() {
            // 마우스 아웃 시에도 active 클래스를 유지하므로 아무 작업도 하지 않음
        }
    );

    $(".mainScroll-link").on("click", function(event) {
        event.preventDefault(); // 기본 동작 막기

        // 부드러운 스크롤 애니메이션
        $("html, body").animate({
            scrollTop: $("#scrollSection").offset().top
        }, 800); // 800ms 동안 스크롤 (시간 조정 가능)
    });

    //family site
    $(".family").click(function(e){
        e.preventDefault();
        $(".menu-familylist").stop().slideToggle();
        $(this).toggleClass("is-Open"); // 상태 관리를 위한 클래스 토글
    });
    
    // top-btn 요소 선택
    const $topButton = $('.top-btn');

    // 1. Footer 관찰: footer가 보이면 top-btn에 is-Stop 클래스 추가하여 고정
    const footerObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                // footer가 보이면 top-btn을 absolute로 고정
                $topButton.addClass("is-Stop");
            } else {
                // footer가 보이지 않으면 top-btn을 fixed로 유지
                $topButton.removeClass("is-Stop");
            }
        });
    }, {
        root: null, // 뷰포트를 기준으로 관찰
        threshold: 0 // footer가 1픽셀이라도 보이면 트리거
    });

    // 관찰할 요소인 footer를 지정
    const footer = document.querySelector('footer');
    footerObserver.observe(footer);

    // 2. .s1 구간 관찰: .s1이 보일 때 top-btn을 숨기고, 벗어나면 표시
    const s1Observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // .s1이 보이면 top-btn 숨기기
                $topButton.removeClass("is-Open");
            } else {
                // .s1이 보이지 않으면 top-btn 보이기
                $topButton.addClass("is-Open");
            }
        });
    }, {
        root: null,
        threshold: 0
    });

    // 관찰할 요소인 .s1을 지정
    const s1Section = document.querySelector('.s1');
    s1Observer.observe(s1Section);

    // 3. top-btn 클릭 시 화면 맨 위로 부드럽게 스크롤 이동
    $(".top-btn").click(function() {
        $("html, body").animate({ scrollTop: 0 }, 500);
    });

    


    function headerHide() {
        let $window = $(window);
        let $header = $('header');
        let work_scroll = false;
        let current_scroll = 0;
        let last_scroll = 0;
        let move_scroll = 10; // 헤더가 반응할 최소 스크롤 거리 (10px)
    
        // 스크롤 이벤트 설정
        $window.on("scroll", function () {
            work_scroll = true; // 스크롤 중임을 표시
        });
    
        // 스크롤 감지를 위한 반복 처리 (requestAnimationFrame으로 성능 개선)
        function handleScroll() {
            if (work_scroll) {
                current_scroll = $window.scrollTop();
    
                // 현재 스크롤 위치와 마지막 스크롤 위치의 차이가 move_scroll보다 크면 실행
                if (Math.abs(last_scroll - current_scroll) > move_scroll) {
                    if (current_scroll > last_scroll && current_scroll > $header.height()) {
                        // 스크롤을 내릴 때: 헤더 숨기기
                        gsap.to($header, 0.4, {
                            autoAlpha: 0,
                            y: -$header.outerHeight(),
                            ease: Power3.easeOut
                        });
                    } else {
                        // 스크롤을 올릴 때: 헤더 나타내기
                        gsap.to($header, 0.4, {
                            autoAlpha: 1,
                            y: 0,
                            ease: Power3.easeOut
                        });
                    }
    
                    // 현재 스크롤 위치를 마지막 스크롤 위치로 업데이트
                    last_scroll = current_scroll;
                }
    
                work_scroll = false; // 스크롤 처리 완료
            }
            
            // 다음 프레임에서 다시 실행
            requestAnimationFrame(handleScroll);
        }
    
        // 스크롤 핸들러 호출
        handleScroll();
    }
    
    // 함수 호출
    headerHide();
});