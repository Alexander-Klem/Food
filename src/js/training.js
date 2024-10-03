window.addEventListener(`DOMContentLoaded`, () => {

    //Tabs

    const tabs = document.querySelectorAll(`.tabheader__item`),
          tabsParent = document.querySelector(`.tabheader__items`),
          tabsContent = document.querySelectorAll(`.tabcontent`);
    
    function hideTabContent() { 
        tabsContent.forEach(item => { 
            item.classList.add(`hide`),
            item.classList.remove(`show`, `fade`);
        })

        tabs.forEach(item => { 
            item.classList.remove(`tabheader__item_active`)
        })
        
    }

    function showTabContent(item = 0) { 
        tabsContent[item].classList.add(`show`, `fade`);
        tabsContent[item].classList.remove(`hide`);
        tabs[item].classList.add(`tabheader__item_active`);
    }

    hideTabContent();
    showTabContent();


    tabsParent.addEventListener(`click`, (event) => {
       const target = event.target;

        if (target && target.classList.contains(`tabheader__item`)) { 
            tabs.forEach((item, index) => {
                if (item === target) {                 
                hideTabContent();
                showTabContent(index);
                } 
            });
        }
    });


    //Timer

    const deadline = `2024-09-28`;

    function getTimeRemaining(endtime) { 
        let days, hours, minutes, seconds;
        const remains = new Date(endtime) - new Date();
            
        if (remains <= 0) {
            days = 0;
            hours = 0;
            minutes = 0;
            seconds = 0;
        } else { 
            days = Math.floor(remains / (1000 * 60 * 60 * 24)),
            hours = Math.floor((remains / (1000 * 60 * 60)) % 24),
            minutes = Math.floor((remains / (1000 * 60)) % 60),
            seconds = Math.floor((remains / 1000) % 60);
        }
        
        return {
            'totalTime': remains, 
            'days': days, 
            'hours': hours, 
            'minutes': minutes, 
            'seconds': seconds, 
        }

    }

    function getZero(value) { 
        return (value >= 0 && value < 10) ? `0${value}` : value
    }

    function updateClock(selector, endtime) { 
        const timer = document.querySelector(selector),
              days = timer.querySelector(`#days`),
              hours = timer.querySelector(`#hours`),
              minutes = timer.querySelector(`#minutes`),
              seconds = timer.querySelector(`#seconds`),
              timeInterval = setInterval(setClock, 1000);      
        
        setClock();
        
        function setClock() { 
            const localTime = getTimeRemaining(endtime);

            days.innerHTML = getZero(localTime.days);
            hours.innerHTML = getZero(localTime.hours);
            minutes.innerHTML = getZero(localTime.minutes);
            seconds.innerHTML = getZero(localTime.seconds);

            if (localTime <= 0) { 
                clearInterval(timeInterval);
            }
        }
    }

    updateClock(`.timer`, deadline)


    //Tabs

    const modalBtnOpen = document.querySelectorAll(`[data-modal]`),
        modalClose = document.querySelector(`[data-close]`),
        modal = document.querySelector(`.modal`);
    
    function openModal() { 
            modal.classList.add(`show`, `fade`);
            modal.classList.remove(`hide`);
            document.body.style = `overflow: hidden`;
            clearInterval(timeInterval);
            
    }


    modalBtnOpen.forEach(item => { 
        item.addEventListener(`click`, openModal);
    })
    
    function closeModal() { 
        modal.classList.add(`hide`);
        modal.classList.remove(`show`, `fade`);
        document.body.style = `overflow: visible`;
    }

    modalClose.addEventListener(`click`, closeModal)

// const timeInterval = setTimeout(openModal, 5000);

    document.addEventListener(`keydown`, () => {
        if (event.code = `Escape`) { 
            closeModal();
        }
    })
    
    function showModalByScroll() { 
        if (window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight) { 
            openModal();
            window.removeEventListener(`scroll`, showModalByScroll)
        }
    }
    
    window.addEventListener(`scroll`, showModalByScroll);
    

    //Cards

    class MenuCard { 
        constructor(src, alt, title, descr, price, parentSelector, ...classes) { 
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.classes = classes;
            this.defaultClass = "menu__item";
            this.parentSelector = document.querySelector(parentSelector);
            this.price = price;
            this.change = 3.20;
            this.changeToUSD();
        }

        changeToUSD() { 
            this.price = Math.floor(this.price / this.change);
        }

        render() { 
            const element = document.createElement(`div`);

            if (this.classes.length < 1) {
                element.classList.add(this.defaultClass);
            } else { 
                element.classList.add(this.defaultClass);
                this.classes.forEach(item => { 
                    element.classList.add(item)
                })
            }

            element.innerHTML = `
                     <img src="${this.src}" alt="${this.alt}">
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> долларов </div>
                    </div>
            `;
            this.parentSelector.append(element);
        }
    }

    new MenuCard(
        "img/tabs/vegy.jpg",
        "vegy",
        `Меню "Фитнес"`,
        `Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!`,
        200,
        `.menu .container`,

    ).render();

    new MenuCard(
        "img/tabs/elite.jpg",
        "elite",
        `Меню “Премиум”`,
        `В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!`,
        500,
        `.menu .container`,
 
    ).render();

    new MenuCard(
        "img/tabs/post.jpg",
        "post",
        `Меню "Постное"`,
        `Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.`,
        350,
        `.menu .container`,
        `big`,
        `gob`,
    ).render();

});