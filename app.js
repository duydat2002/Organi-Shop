// All
const rootStyle = getComputedStyle(document.documentElement);

// Slidebar
const slidebarFunction = function() {
    const menuSlidebar = document.querySelector('#menu-slidebar');
    const openMenuSlidebar = document.querySelector('#header__body .open-menu');
    const overlay = document.querySelector('#overlay');

    // Close/ Open menu slidebar
    openMenuSlidebar.onclick = function() {
        menuSlidebar.classList.toggle('active');
        overlay.style.visibility = "visible";
    }

    overlay.onclick = function() {
        menuSlidebar.classList.toggle('active');
        overlay.style.visibility = "hidden";
    }

    // Close menu slidebar when click tab 
    const trueLink = document.querySelectorAll('.menu-slidebar__menu--list a[href*="#"]');
    trueLink.forEach((link) => {
        link.onclick = function() {
            menuSlidebar.classList.toggle('active');
            overlay.style.visibility = "hidden";
        }
    })

    // Close/ Open menu in slidebar
    const menu = document.querySelector('.menu-slidebar__menu--open');
    const menuList = document.querySelector('.menu-slidebar__menu--list');

    menu.onclick = function() {
        if (menuList.style.height == "0px" || menuList.style.height == "") {
            menuList.style.height = menuList.scrollHeight + "px";
        } else {
            menuList.style.height = "0px";
        }
    }
    
    // Close/ Open sub-menu in slidebar
    const subMenu = document.querySelector('.sub-menu');
    const subMenuTitle = document.querySelector('.sub-menu > a');
    
    subMenuTitle.onclick = function() {
        menuList.style.height = "auto";

        subMenu.classList.toggle('active');

        setTimeout(() => {
            menuList.style.height = menuList.scrollHeight + "px";
        },500);
    }

}()


// Hero categories
const heroCategories = function() {
    const title = document.querySelector('.hero__categories__title');
    const list = document.querySelector('.hero__categories__list');
    list.style.height = list.scrollHeight + "px";

    title.onclick = function() {
        if (list.style.height == "0px" || list.style.height == "") {
            list.style.height = list.scrollHeight + "px";
        } else {
            list.style.height = "0px";
        }
    }
}()

// Feature product
const featureProduct = function() {
    const filterControls = document.querySelectorAll('.featured-product__filter-control > ul > li');
    const filterItems = document.querySelectorAll('.filter-item');
    
    filterControls.forEach(control => {
        control.onclick = function() {
            // Active filter control
            const activeControl = document.querySelector('.featured-product__filter-control > ul > li.active');
            activeControl.className = "";

            control.classList.add('active');

            // Show filter 
            const nameFilter = control.dataset.value;

            filterItems.forEach((item) => {
                if(nameFilter == "all") {
                    item.style.display = "block";
                    setTimeout(() => {
                        
                        item.style.opacity = "1";
                        item.style.transform = "scale(1)";
                    }, 10);
                } else {
                    if(item.className.indexOf(nameFilter) == -1) {
                        item.style.opacity = "0";
                        item.style.transform = "scale(0)";
                        setTimeout(() => {
                            item.style.display = "none";
                        }, 250);
                    } else {
                        item.style.display = "block";
                        setTimeout(() => {
                            
                            item.style.opacity = "1";
                            item.style.transform = "scale(1)";
                        }, 10);
                    }
                }
            })
        }
    });
}()


// Carousel js
function carousel(items, next, prev, timeAuto) {
    var isNext;
    var isPause = false;
    
    const slideWidth = items.children[0].clientWidth;
    const slideCount = items.childElementCount;
    const transitionText = items.style.transition;
    
    // Clone child
    items.style.width = slideWidth*(slideCount+1) + "px";
    items.prepend(items.lastElementChild.cloneNode(true));
    items.style.transform = "translateX(" + -slideWidth + "px)";
    
    // Control
    function move() {
        const slideWidth = items.children[0].clientWidth;
        items.style.width = slideWidth*(slideCount+1) + "px";
        if (isNext == true) {
            items.style.transform = "translateX(" + -2*slideWidth + "px)";
        } else {
            items.style.transform = "translateX(" + 0 + "px)";
        }
    }

    prev.onclick = function() {
        isNext = false;
        move();
    }

    next.onclick = function() {
        isNext = true;
        move();
    }

    // Auto
    setInterval(() => {
        if (!isPause) {
            isNext = true;
            move();
        }
    }, timeAuto);

    items.onmousemove = function() {
        isPause = true;
    }

    items.onmouseleave = function() {
        setTimeout(function() {
            isPause = false;
        }, 2000)
    }

    // Loop
    items.addEventListener('transitionend', () => {
        const slideWidth = items.children[0].clientWidth;
        if (isNext == true) {
            items.appendChild(items.firstElementChild);
            items.replaceChild(items.firstElementChild.cloneNode(true), items.lastElementChild)
        } 
        if (isNext == false) {
            items.prepend(items.lastElementChild);
            items.replaceChild(items.lastElementChild.cloneNode(true), items.firstElementChild)
        }
        items.style.transition = "none";
        items.style.transform = "translateX(" + -slideWidth + "px)";
        setTimeout(() => {
            items.style.transition = transitionText;
        });
    }, false)
}

const carouselCategories = function() {
    const items = document.querySelector('.carousel-items');
    const prev = document.querySelector('.carousel-control .prev');
    const next = document.querySelector('.carousel-control .next');

    carousel(items, next, prev, 3000);
}()

const carouselProduct = function() {
    for (let i=1; i<=3; i++) {
        const nameContainer = ".slide-product.item" + i;
        const items = document.querySelector(nameContainer + ' .carousel-items');
        const prev = document.querySelector(nameContainer + ' .move-control .prev-btn');
        const next = document.querySelector(nameContainer + ' .move-control .next-btn');

        carousel(items, next, prev, 3000);
    }
}()