document.addEventListener('DOMContentLoaded', () => {
    mtv_hViewScrollHrzntl_grabbers();
});

function mtv_hViewScrollHrzntl_grabbers() {
    var horizontals = document.querySelectorAll('.mtv-h-hzl-carousel')
    if (horizontals.length > 0) {
        Array.from(horizontals).forEach(horizontal => {

            var options = {
                    item: horizontal.getAttribute('mtv-h-scroll-item') || 'div',
                    arrowPosition: horizontal.getAttribute('mtv-h-scroll-arrows') || 'center',
                    breakpoint: horizontal.getAttribute('mtv-h-scroll-breakpoint') || 0,
                    min: horizontal.getAttribute('mtv-h-scroll-min-items') || 0,
                }
                /*set parents etc*/

            /*check if we have to set horozintal scroll*/
            var items = horizontal.querySelectorAll(options.item);
            if (items.length > parseInt(options.min)) {
                var html = horizontal.innerHTML;
                var new_html = '<div class= "mtv-h-horizontal-scroll"><div class= "mtv-h-content-container "><div class="mtv-h-content-wrapper ">' + html + '</div></div></div>';
                if (options.arrowPosition != 'none') {
                    new_html += '<div class="mtv_h_carousel_triggers ' + options.arrowPosition + '"><div class="mtv-h-left-trigger" onclick="mtv_hViewScrollHrzntl(\'left\', this);"><span class="arrow left"></span></div><div class="mtv-h-right-trigger" onclick="mtv_hViewScrollHrzntl(\'right\', this);"><span class="arrow right"></span></div></div>'
                }
                horizontal.innerHTML = new_html;
                horizontal.classList.add('scroll-initialized');

                const slider = horizontal.querySelector('.mtv-h-horizontal-scroll');
                let isDown = false;
                let startX;
                let scrollLeft;

                slider.addEventListener('mousedown', (e) => {
                    isDown = true;
                    slider.classList.add('active');
                    startX = e.pageX - slider.offsetLeft;
                    scrollLeft = slider.scrollLeft;
                });
                slider.addEventListener('mouseleave', () => {
                    isDown = false;
                    slider.classList.remove('active');
                });
                slider.addEventListener('mouseup', () => {
                    isDown = false;
                    slider.classList.remove('active');
                });
                slider.addEventListener('mousemove', (e) => {
                    if (!isDown) return;
                    e.preventDefault();
                    const x = e.pageX - slider.offsetLeft;
                    const walk = (x - startX) * 2; //scroll-fast
                    slider.scrollLeft = scrollLeft - walk;
                    slider.classList.add('active');
                    if (options.arrowPosition != 'none') {
                        var arrow_selector = scrollLeft > 0 ? '.mtv-h-right-trigger' : '.mtv-h-left-trigger';
                        mtv_hCarouselArrows(horizontal.querySelector(arrow_selector));
                    }

                });
            }
        });
    }

}


function mtv_hViewScrollHrzntl(action, el) {
    let parent = el.closest('.mtv-h-hzl-carousel');
    if (parent) {
        let item_selector = parent.getAttribute('mtv-h-scroll-item') || 'div';
        let card = parent.querySelector(item_selector);
        let cardWidth = card.offsetWidth;
        var distance = -cardWidth;
        if (action == 'right') {
            distance = cardWidth;
        }
        parent.querySelector('.mtv-h-horizontal-scroll').scrollBy({
            left: distance,
            behavior: 'smooth'
        });
        mtv_hCarouselArrows(el)
    }
}



function mtv_hCarouselArrows(element) {
    var parentElement = element.closest('.mtv-h-hzl-carousel ');
    var scrolledElement = parentElement.querySelector('.mtv-h-horizontal-scroll');
    var rightElement = parentElement.querySelector('.mtv-h-right-trigger');
    var leftElement = parentElement.querySelector('.mtv-h-left-trigger');
    var width = scrolledElement.offsetWidth;
    var scrollLeft = scrolledElement.scrollLeft;
    var scrollWidth = scrolledElement.scrollWidth;
    if (scrollLeft < 10) {
        leftElement.style.display = 'none';
        rightElement.style.display = 'flex';
    } else if (scrollWidth - scrollLeft - width < 10) {
        leftElement.style.display = 'flex';
        rightElement.style.display = 'none';
    } else {
        leftElement.style.display = 'flex';
        rightElement.style.display = 'flex';
    }
}