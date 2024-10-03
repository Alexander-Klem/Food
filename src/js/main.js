/*window.addEventListener(`DOMContentLoaded`, () => {

    const tabs = document.querySelectorAll(`.tabheader__item `),
          tabsContent = document.querySelectorAll(`.tabcontent`),
          tabsParent = document.querySelector(`.tabheader__items`); 
    
    function hideTabContent() { 
        tabsContent.forEach(item => {
            item.classList.add(`hide`);
            item.classList.remove(`show`, `fade`);
        });

        tabs.forEach(item => {
            item.classList.remove(`tabheader__item_active`);
        });
    }

    function showTabContent(i = 0) { 
        tabsContent[i].classList.add(`show`, `fade`);
        tabsContent[i].classList.remove(`hide`);
        tabs[i].classList.add(`tabheader__item_active`);
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener(`click`, (event) => {
        const target = event.target;

        if (target && target.classList.contains(`tabheader__item`)) { 
            tabs.forEach((item, index) => {
                if (target === item) { 
                    hideTabContent();
                    showTabContent(index);
                }
            })
        }
    });
});

До добавления классов из css
window.addEventListener(`DOMContentLoaded`, () => {

    const tabs = document.querySelectorAll(`.tabheader__item`),
          tabsContent = document.querySelectorAll(`.tabcontent`),
          tabsParent = document.querySelector(`.tabheader__items`);

    function hideTabContent() { 
        tabsContent.forEach(item => {
            item.style.display = `none`;
        });

        tabs.forEach(item => {
            item.classList.remove(`tabheader__item_active`);
        });
    }

    function showTabContent(item = 0) { 
        tabsContent[item].style.display = `block`;
        tabs[item].classList.add(`tabheader__item_active`);
    }

    hideTabContent();
    showTabContent();
  

    tabsParent.addEventListener(`click`, (event) => {
        const target = event.target;

        if (target && target.classList.contains(`tabheader__item`)) { 
            tabs.forEach((item, index) => {
                if (target === item) { 
                    hideTabContent();
                    showTabContent(index);
                }
            });
        }

    });
});

После добавления классов из css
window.addEventListener(`DOMContentLoaded`, () => {

    const tabs = document.querySelectorAll(`.tabheader__item`),
          tabsContent = document.querySelectorAll(`.tabcontent`),
          tabsParent = document.querySelector(`.tabheader__items`);

    function hideTabContent() { 
        tabsContent.forEach(item => {
            item.classList.add(`hide`);
            item.classList.remove(`show`, `fade`)
        });

        tabs.forEach(item => {
            item.classList.remove(`tabheader__item_active`);
        });
    }

    function showTabContent(item = 0) { 
        tabsContent[item].classList.add(`show`, `fade`);
        tabsContent[item].classList.remove(`hide`)
        tabs[item].classList.add(`tabheader__item_active`);
    }

    hideTabContent();
    showTabContent();
  

    tabsParent.addEventListener(`click`, (event) => {
        const target = event.target;

        if (target && target.classList.contains(`tabheader__item`)) { 
            tabs.forEach((item, index) => {
                if (target === item) { 
                    hideTabContent();
                    showTabContent(index);
                }
            });
        }
        
    });
});*/

window.addEventListener(`DOMContentLoaded`, () => {
    // Лекция - 63 (Создаем табы в новом проекте)
    //Tabs
    const tabs = document.querySelectorAll(`.tabheader__item`),
        tabsParent = document.querySelector(`.tabheader__items`),
        tabsContent = document.querySelectorAll(`.tabcontent`);

    
    function hideTabContent() {
        tabsContent.forEach(item => {
            item.classList.add(`hide`);
            item.classList.remove(`show`, `fade`);

            tabs.forEach(item => {
                item.classList.remove(`tabheader__item_active`);
            });
        });
    };

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
                if (target === item) {
                    hideTabContent();
                    showTabContent(index);
                }
            })
        }
    });

    /*Создаем таймер обратного отсчета (Лекция - 68, 69)*/
    //Timer

    const deadline = `2024-09-31`;

    function getTimeRemaining(endtime) {
        let days, minutes, seconds;
        const t = Date.parse(endtime) - Date.parse(new Date()); // - разница в миллисекундах

        if (t <= 0) {
            days = 0;
            hours = 0;
            minutes = 0;
            seconds = 0;
        } else { 

            days = Math.floor(t / (1000 * 60 * 60 * 24)),
 
            hours = Math.floor((t / (1000 * 60 * 60) % 24)),

            minutes = Math.floor((t / 1000 / 60) % 60),
            seconds = Math.floor((t / 1000) % 60);
        }
           
        
        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
    };
    }
    
    function getZero(num) { 
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else { 
            return num;
        }
    }
    
    // Установка таймера на странице
    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
            days = timer.querySelector(`#days`),
            hours = timer.querySelector(`#hours`),
            minutes = timer.querySelector(`#minutes`),
            seconds = timer.querySelector(`#seconds`),
            timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock() {
            const t = getTimeRemaining(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    setClock(`.timer`, deadline);


    /*Создаем модальное окно и модифицируем (Лекция - 71, Лекция - 72)*/
    //Tabs
    
    const modalOpenBtn = document.querySelectorAll(`[data-modal]`),
          modal = document.querySelector(`.modal`),
          modalCloseBtn = document.querySelector(`[data-close]`);
    
    // Вариант без использования toggle
    modalOpenBtn.forEach(btn => {
        btn.addEventListener(`click`, openModal);
    });

    function openModal() { 
        modal.classList.add(`show`, `fade`);
        modal.classList.remove(`hide`);
        document.body.style.overflow = `hidden`;
        clearInterval(modalTimerId);
    }

    modalCloseBtn.addEventListener(`click`, closeModal);

    function closeModal() { 
        modal.classList.add(`hide`);
        modal.classList.remove(`show`);
        document.body.style.overflow = `visible`;
    }

    modal.addEventListener(`click`, (event) => { 
        const target = event.target;
        if (target && target === modal) {
            closeModal();
        } 
    });

    document.addEventListener(`keydown`, (event) => {
        if (event.code === `Escape` && modal.classList.contains(`show`)) { 
            closeModal();
        }
    });

    // const modalTimerId = setTimeout(openModal, 5000);

    // pageYOffset - это свойство отслеживает сколько px сверху у нас отлистал пользователь по оси Y (window.pageYOffset – то же самое, что и window.scrollY.)
    // Чтобы удалить какой-то обработчик события, мы должны делать ссылку именно функцию, которая исполнялась как этот обработчик - removeEventListener();
    
    function showModalByScroll() { 
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight -1) { 
            openModal();
            window.removeEventListener(`scroll`, showModalByScroll);
        }
    }

    window.addEventListener(`scroll`, showModalByScroll);

    // Вариант с использованием toggle
    // modalOpenBtn.addEventListener(`click`, () => {
    //     modal.classList.toggle(`show`);
    //     document.body.style.overflow = `hidden`;
    // });

    // modalCloseBtn.addEventListener(`click`, () => {
    //     modal.classList.toggle(`show`);
    //     document.body.style.overflow = `visible`;
    // });


    //Используем класс для карточек (Лекция - 78)

    class MenuCard { 
        constructor(src, alt, title, descr, price, parentSelector, ...clasess) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.clasess = clasess;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 27;
            this.changeToUAH(); 
        }

        changeToUAH() {
            this.price = this.price * this.transfer; 
        }

        render() {
            const element = document.createElement('div');
            // const neweElement = 0; //Я понял это так))
            if (this.clasess.length === 0) {
                // this.neweElement = `menu__item`;
                // element.classList.add(this.neweElement);
                this.element = `menu__item`;
                element.classList.add(this.element);
            } else { 
                this.clasess.forEach(className => element.classList.add(className)); 
            }
            
            
            element.innerHTML = `
                
                    <img src=${this.src} alt=${this.alt}>
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                    </div>
                
            `;
            this.parent.append(element);
        }
    }

    // 1-ый вариант (мы кладем объект в переменную (в данном случае div))
    // const div = new MenuCard();
    // div.render();

    // 2-ой вариант (объект может существовать без переменной (вызвать можно только один раз))
    new MenuCard(
        "img/tabs/vegy.jpg",
        "vegy",
        `Меню "Фитнес"`,
        `Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!`,
        9,
        `.menu .container`,
        
    ).render(); // метод вызвался, отработал и он исчезнет т.к на него больше не будет ссылок, мы нигде не сохраняем этот объект.()

    new MenuCard(
        "img/tabs/elite.jpg",
        "elite",
        `Меню “Премиум”`,
        `В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!`,
        14,
        `.menu .container`,
        `menu__item`,
        
    ).render();

    new MenuCard(
        "img/tabs/post.jpg",
        "post",
        `Меню "Постное"`,
        `Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.`,
        21,
        `.menu .container`,
        `menu__item`,
        
    ).render();

    // Чтобы script не слетал, можно удалить(закомментировать) часть кода которая ответсвенна за карточки.
    
    // Объект может существовать без переменной - делается это тогда, когда этот объект используется только на месте т.е если мы его сейчас в переменную никакую не положим, то потом он просто потеряется т.е создаться и удалиться т.к на него не будет потом просто никаких ссылок.

    //Forms 

    const forms = document.querySelectorAll(`form`); 

    const message = {
        loading: `Загрузка`, 
        succes: `Спасибо! Скоро мы с вами свяжемся`,
        failure: `Что-то пошло не так...`
    };

    forms.forEach(item => { 
        postData(item);
    })

    function postData(form) { 
        form.addEventListener(`submit`, (event) => { 
            event.preventDefault();

            let statusMessage = document.createElement(`div`);
            statusMessage.classList.add(`status`);
            statusMessage.textContent = message.loading;
            form.append(statusMessage);

            const request = new XMLHttpRequest();
            request.open(`POST`, `server.php`);

            // Как сделать так, чтобы все данные которые заполнил пользователь в форме, мы получили в JS и смогли отправить на сервер.Самый простой способ - это использовать объект FormData (нам не всегда нужно передавать в формате JSON. Завивисит от того с какой технологией с который мы работаем на Backend).;

            // FormData(откуда берем данные) - это специальный объект, который позволяет с определенной формы быстро сформировать данные которые заполнил пользователь(ключ, значение). 
            
            // !Самое главное это указывать атрибут name, иначе FormData не сможет найти этот input и не сможет найти ему нужные данные.
            
            // request.setRequestHeader(`Content-type`, `multipart/form-data`);
            // !Когда мы используем связку XMLHttpRequest + FormData, то нам заголовок устанавливать не нужно т . к он устанавливается автоматически
            const formData = new FormData(form);

            request.send(formData);

            request.addEventListener(`load`, () => {
                if (request.status === 200) {
                    console.log(request.response)
                    statusMessage.textContent = message.succes;
                } else { 
                    status.massage.textContent = message.failure;
                }
                // Когда мы работаем с локальным сервером, то мы каждый раз после каких-то изменений должны сбрасывать кэш. Делается для того, чтобы новые изменения применились. (Shift + F5)
            })
        })
    }

}); 





