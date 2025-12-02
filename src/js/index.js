jQuery(document).ready(function ($) {
    window.App = window.App || {};

    App.isScrollTopBody = true;
    App.winLocHash = window.location.hash;
    App.$body = $('body');
    App.$htmlBody = $('html, body');
    App.$modelsMenu = $('.slider-menu .models-menu');
    App.$productsMobile = $('.products-mobile');
    App.$headerMobile = $('.header-mobile');
    App.$currentProduct = null;
    App.$nextProduct = null;

    //Mask	
    // $('.inpt-tel').mask('+7 (999) 999-99-99');

    // opening popups
    App.$body.on('click touch', '.open-dialog, .open-popup, .open-form, .open-modal', function (event) {
        event.preventDefault();
        const category = $(this).attr('href');
        const $dialogs = $('.dialogs');
        const $categoryDialogs = $dialogs.find(category);
        const $flexPopup = $dialogs.find('.flex-popup');
        const popupCategory = category.slice(1);

        if (popupCategory !== 'policy') {
            localStorage.setItem('popup', popupCategory);
        }

        if (popupCategory === 'list') {
            App.$body.css({ 'overflow-y': 'hidden' });
            $dialogs.css({ 'overflow-y': 'hidden' });
        }

        $dialogs.find('.popup').removeClass('active').hide();

        if (!$categoryDialogs.length) {
            console.log(`Попап с ID ${category} не найден.`);
            return false;
        }

        $dialogs.find('.popup').removeClass('active').hide();
        $categoryDialogs.show();
        $dialogs.show();

        $flexPopup.addClass('popup--' + popupCategory);
        $dialogs.animate({ opacity: 1 }, 300, () => {
            $categoryDialogs.addClass('active');
            App.$body.css({ 'overflow-y': 'hidden' });
        });

        return false;
    });

    // closing popups
    $('.dialogs').on('click touch', '.close, .close-bg', function () {
        const $dialogs = $('.dialogs');
        const $flexPopup = $dialogs.find('.flex-popup');
        const $activePopup = $dialogs.find('.popup.active');
        const popupId = $activePopup.attr('id');

        const bodyScroll = () => {
            App.$body.css({ 'overflow-y': 'auto' });
        };

        const removeClassPopup = () => {
            $flexPopup.removeClass(function (index, className) {
                return (className.match(/popup--\S+/g) || []).join(' ');
            });
        };

        const $popupActive = $flexPopup.find('.popup.active');

        if (popupId === 'cart') { // Корзина
            $popupActive.animate({ right: '-100%', opacity: 0 }, 600, function () {
                $dialogs.animate({ opacity: 0 }, 300, function () {
                    $dialogs.find('.popup').removeClass('active').hide();
                    $popupActive.removeAttr('style');
                    $dialogs.hide();
                    $dialogs.find('.thanks-popup').hide();
                    removeClassPopup();
                });
                bodyScroll();
            });

        } else if (popupId === 'policy') { // Политика конфиденциальности

            $popupActive.removeClass('active').hide();

            let popupCategory = localStorage.getItem('popup');

            // Открываем popup с соответствующим ID
            const $popupToOpen = $('.dialogs #' + popupCategory);
            if ($popupToOpen.length) {
                $popupToOpen.addClass('active').show();
                $dialogs.show();
            } else {
                console.log('Попап с ID ' + popupCategory + ' не найден.');
            }

        } else if (popupId === 'details') { // Детали преимуществ

            $popupActive.animate({ top: '100%', opacity: 0 }, 600, function () {
                $dialogs.animate({ opacity: 0 }, 400, function () {
                    $dialogs.find('.popup').removeClass('active').hide();
                    $popupActive.removeAttr('style');
                    $dialogs.hide();
                    removeClassPopup();
                });
                bodyScroll();
            });

        } else if (popupId === 'list') {

            $popupActive.animate({ bottom: '-100%', opacity: 0 }, 600, function () {
                $dialogs.animate({ opacity: 0 }, 300, function () {
                    $dialogs.find('.popup').removeClass('active').hide();
                    $popupActive.removeAttr('style');
                    $dialogs.hide();
                    removeClassPopup();
                });
                bodyScroll();
            });

        } else { // Остальные окна

            $popupActive.removeClass('active').hide();
            $dialogs.animate({ opacity: 0 }, 300, function () {
                $dialogs.hide();
                $dialogs.find('.thanks-popup').hide();
                removeClassPopup();
                bodyScroll();
            });
        }
        pauseOtherVideos('.swiper-slide');
    });

    const workTitleLinks = document.querySelectorAll('.work-title-link');
    const workItems = document.querySelectorAll('.work-item');
    let activeIndex = null;

    workTitleLinks.forEach((link, index) => {
        link.addEventListener('click', (e) => {
            const clickedTitleLinkWrap = link.parentElement.parentElement.parentElement;
            e.preventDefault();

            if (activeIndex === index) {
                return;
            }

            workItems.forEach((item, itemIndex) => {
                if (item === clickedTitleLinkWrap) {
                    item.classList.add('u-pointer');
                    gsap.to(item, {
                        opacity: 0,
                        duration: 0.3,
                        ease: 'power2.out'
                    });
                    gsap.to(clickedTitleLinkWrap, {
                        opacity: 0,
                        duration: 0.3,
                        ease: 'power2.out'
                    });
                } else {
                    item.classList.remove('u-pointer');
                    gsap.to(item, {
                        opacity: 1,
                        duration: 0.3,
                        ease: 'power2.out'
                    });
                    gsap.to(workTitleLinks[itemIndex].parentElement.parentElement, {
                        opacity: 1,
                        duration: 0.3,
                        ease: 'power2.out'
                    });
                }
            });
            activeIndex = index;
            console.log(index)
        });
    });

    $(document).ready(function () {
        $('.accordion-header:first').addClass('active');
        $('.accordion-content:first').show();

        $('.accordion-header').click(function () {
            const content = $(this).next('.accordion-content');

            $('.accordion-content').not(content).slideUp(300);
            $('.accordion-header').not(this).removeClass('active');

            $(this).toggleClass('active');
            content.slideToggle(300);
        });
    });

    wow = new WOW(
        {
            boxClass: 'wow',
            animateClass: 'animated',
            offset: 50,
            mobile: true,
            live: true
        }
    );
    wow.init();

    $('.header__burger').on('click', function () {
        $(this).toggleClass('active');
        if ($(this).hasClass('active')) {
            $('.burger-menu').addClass('active');
        } else {
            $('.burger-menu').removeClass('active');
        }
    });
    $(document).ready(function () {
        $(".cases-img").on("load", function () {
            $(this).closest(".cases-shot-loader").hide();
        });
    });


    $(document).ready(function () {
        $(".tab-nav a").click(function (event) {
            event.preventDefault();
            var tabId = $(this).attr("href");

            $(".tab-nav li").removeClass("active");
            $(this).parent().addClass("active");

            $(".tab-content").removeClass("active");
            $(tabId).addClass("active");
        });
    });

    // ===== MOBILE MENU =====
    const burger = document.querySelector('.burger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileMenuOverlay = document.querySelector('.mobile-menu__overlay');
    const mobileMenuLinks = document.querySelectorAll('.mobile-menu__nav a');

    function toggleMobileMenu() {
        burger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        mobileMenuOverlay.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    }

    function closeMobileMenu() {
        burger.classList.remove('active');
        mobileMenu.classList.remove('active');
        mobileMenuOverlay.classList.remove('active');
        document.body.classList.remove('menu-open');
    }

    if (burger) {
        burger.addEventListener('click', toggleMobileMenu);
    }

    if (mobileMenuOverlay) {
        mobileMenuOverlay.addEventListener('click', closeMobileMenu);
    }

    if (mobileMenuLinks) {
        mobileMenuLinks.forEach(link => {
            link.addEventListener('click', closeMobileMenu);
        });
    }


    const promoSliders = document.querySelectorAll('.portfolio__card-slider');
    try {
        promoSliders && promoSliders.forEach((slider, index) => {
            new Swiper(`.portfolio__card-slider--${index + 1}`, {
                slidesPerView: 1,
                spaceBetween: 20,
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },
                // breakpoints: {
                //     1199: {
                //         slidesPerView: 4,
                //     },
                //     1024: {
                //         slidesPerView: 3,
                //     },
                //     620: {
                //         slidesPerView: 2,
                //     }
                // }
            })
        })
    } catch (error) {
        console.log(error)
    }

    try {
        new Swiper('.jk-slider', {
            slidesPerView: 1,
            spaceBetween: 20,
            navigation: {
                nextEl: '.jk-slider-btn--next',
                prevEl: '.jk-slider-btn--prev',
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            breakpoints: {
                320: {
                    slidesPerView: 1,
                    spaceBetween: 15,
                },
                640: {
                    slidesPerView: 2,
                    spaceBetween: 15,
                },
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 20,
                },
                1280: {
                    slidesPerView: 4,
                    spaceBetween: 20,
                }
            }
        })
    } catch (error) {
        console.log(error)
    }
    document.querySelectorAll('.portfolio__card-descr-wrapper').forEach(wrapper => {
        const text = wrapper.querySelector('.portfolio__card-descr');
        const btn = wrapper.querySelector('.portfolio__card-descr-toggle');

        console.log('hhfhf')

        btn.addEventListener('click', () => {
            text.classList.toggle('portfolio__card-descr--expanded');
            btn.textContent = text.classList.contains('portfolio__card-descr--expanded')
                ? 'Свернуть'
                : 'Развернуть';
        });
    });


    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq__item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq__question');
        const answer = item.querySelector('.faq__answer');

        if (item.classList.contains('active')) {
            answer.style.maxHeight = answer.scrollHeight + 'px';
        }

        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.faq__answer').style.maxHeight = null;
                }
            });

            if (isActive) {
                item.classList.remove('active');
                answer.style.maxHeight = null;
            } else {
                item.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });

    // ===== CALCULATOR =====
    const calculator = {
        currentStep: 1,
        totalSteps: 3,
        state: {
            propertyType: null,
            finishingClass: null,
            area: 76,
            height: 76,
            rooms: 'studio',
            repairType: null
        },

        init() {
            this.bindEvents();
            this.updateCalculation();
        },

        bindEvents() {
            // Navigation buttons
            document.querySelectorAll('.calculator__btn--next').forEach(btn => {
                btn.addEventListener('click', () => this.nextStep());
            });

            document.querySelectorAll('.calculator__btn--prev').forEach(btn => {
                btn.addEventListener('click', () => this.prevStep());
            });

            // Radio buttons
            document.querySelectorAll('.calculator__option input[type="radio"]').forEach(radio => {
                radio.addEventListener('change', (e) => {
                    const name = e.target.name;
                    const value = e.target.value;
                    this.state[name] = value;
                    this.updateCalculation();
                });
            });

            // Input fields
            document.querySelectorAll('.calculator__input').forEach(input => {
                input.addEventListener('input', (e) => {
                    const name = e.target.name;
                    const value = parseFloat(e.target.value) || 0;
                    this.state[name] = value;
                    this.updateCalculation();
                });
            });

            // Select
            const roomsSelect = document.querySelector('.calculator__select[name="rooms"]');
            if (roomsSelect) {
                roomsSelect.addEventListener('change', (e) => {
                    this.state.rooms = e.target.value;
                    this.updateCalculation();
                });
            }
        },

        nextStep() {
            if (!this.validateStep()) {
                alert('Пожалуйста, выберите опцию перед продолжением');
                return;
            }

            if (this.currentStep < this.totalSteps) {
                this.currentStep++;
                this.updateStepDisplay();
            }
        },

        prevStep() {
            if (this.currentStep > 1) {
                this.currentStep--;
                this.updateStepDisplay();
            }
        },

        validateStep() {
            if (this.currentStep === 1) {
                return this.state.propertyType !== null;
            }
            if (this.currentStep === 2) {
                return this.state.finishingClass !== null;
            }
            return true;
        },

        updateStepDisplay() {
            document.querySelectorAll('.calculator__step').forEach((step, index) => {
                if (index + 1 === this.currentStep) {
                    step.classList.add('calculator__step--active');
                } else {
                    step.classList.remove('calculator__step--active');
                }
            });

            // Update step indicators
            document.querySelectorAll('.calculator__step-indicator').forEach(indicator => {
                indicator.textContent = `Шаг ${this.currentStep} / ${this.totalSteps}`;
            });

            // Update prev button state
            document.querySelectorAll('.calculator__btn--prev').forEach(btn => {
                btn.disabled = this.currentStep === 1;
            });
        },

        updateCalculation() {
            const { propertyType, finishingClass, area, repairType } = this.state;

            // Base price per m² depending on property type
            const propertyTypeMultiplier = {
                'newbuild-no-finish': 1.0,
                'newbuild-whitebox': 0.9,
                'secondary': 1.1,
                'old-building': 1.3,
                'commercial': 1.4,
                'country-house': 1.2
            };

            // Finishing class multiplier
            const finishingMultiplier = {
                'budget': 1.0,
                'comfort': 1.5,
                'premium': 2.0
            };

            // Repair type multiplier
            const repairMultiplier = {
                'cosmetic': 0.7,
                'major': 1.0,
                'designer': 1.5
            };

            const basePricePerSqm = 15000; // Base price per m²
            const propertyMult = propertyTypeMultiplier[propertyType] || 1.0;
            const finishMult = finishingMultiplier[finishingClass] || 1.0;
            const repairMult = repairMultiplier[repairType] || 1.0;

            // Calculate each component
            const baseWork = Math.round(area * basePricePerSqm * 0.3 * propertyMult * repairMult);
            const design = repairType === 'designer' ? Math.round(area * 5000) : Math.round(area * 2000);
            const roughMaterials = Math.round(area * basePricePerSqm * 0.15 * propertyMult);
            const finishMaterials = Math.round(area * basePricePerSqm * 0.4 * finishMult);
            const furniture = Math.round(area * basePricePerSqm * 0.6 * finishMult);

            const total = baseWork + design + roughMaterials + finishMaterials + furniture;

            // Update UI
            this.updateResultValue('baseWork', baseWork);
            this.updateResultValue('design', design);
            this.updateResultValue('roughMaterials', roughMaterials);
            this.updateResultValue('finishMaterials', finishMaterials);
            this.updateResultValue('furniture', furniture);
            this.updateResultValue('total', total);
        },

        updateResultValue(key, value) {
            const element = document.querySelector(`[data-calc="${key}"]`);
            if (element) {
                element.textContent = this.formatPrice(value);
            }
        },

        formatPrice(price) {
            return new Intl.NumberFormat('ru-RU', {
                style: 'currency',
                currency: 'RUB',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
            }).format(price);
        }
    };

    // Initialize calculator if it exists on page
    if (document.querySelector('.calculator')) {
        calculator.init();
    }
});
