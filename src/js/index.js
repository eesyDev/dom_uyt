jQuery(document).ready(function ($) {
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
});
