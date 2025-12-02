jQuery(document).ready(function ($) {
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
