/* Сбрасывает модальное окно при задании значений
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

const timeInterval = setTimeout(openModal, 5000);

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

    const forms = document.querySelectorAll(`form`);
    const message = {
        loading: `Загрузка...`,
        success: `Спасибо! Скоро мы с вами свяжемся`,
        error: `Упс! Что-то пошло не так...`
    }

    forms.forEach(item => { 
        postData(item);
    })

    function postData(form) { 
        form.addEventListener(`submit`, (event) => { 
            event.preventDefault();
        })
    }

});*/

window.addEventListener('DOMContentLoaded', function() {

    // Tabs
    
	let tabs = document.querySelectorAll('.tabheader__item'),
		tabsContent = document.querySelectorAll('.tabcontent'),
		tabsParent = document.querySelector('.tabheader__items');

	function hideTabContent() {
        
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
	}

	function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }
    
    hideTabContent();
    showTabContent();

	tabsParent.addEventListener('click', function(event) {
		const target = event.target;
		if(target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
		}
    });
    
    // Timer

    const deadline = '2022-06-11';

    function getTimeRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()),
            days = Math.floor( (t/(1000*60*60*24)) ),
            seconds = Math.floor( (t/1000) % 60 ),
            minutes = Math.floor( (t/1000/60) % 60 ),
            hours = Math.floor( (t/(1000*60*60) % 24) );

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function getZero(num){
        if (num >= 0 && num < 10) { 
            return '0' + num;
        } else {
            return num;
        }
    }

    function setClock(selector, endtime) {

        const timer = document.querySelector(selector),
            days = timer.querySelector("#days"),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
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

    setClock('.timer', deadline);

    // Modal

    const modalTrigger = document.querySelectorAll('[data-modal]'),
        modal = document.querySelector('.modal');

    modalTrigger.forEach(btn => {
        btn.addEventListener('click', openModal);
    });

    function closeModal() {
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }

    function openModal() {
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimerId);
    }
    

    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute(`data-close`) === '') {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && modal.classList.contains('show')) { 
            closeModal();
        }
    });

    const modalTimerId = setTimeout(openModal, 300000);
    // Изменил значение, чтобы не отвлекало

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }
    window.addEventListener('scroll', showModalByScroll);

    // Используем классы для создание карточек меню

    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 27;
            this.changeToUAH(); 
        }

        changeToUAH() {
            this.price = this.price * this.transfer; 
        }

        render() {
            const element = document.createElement('div');

            if (this.classes.length === 0) {
                this.classes = "menu__item";
                element.classList.add(this.classes);
            } else {
                this.classes.forEach(className => element.classList.add(className));
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
    };

    const getResourses = async (url) => {
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could't fetch ${url}, status: ${res.status}`);
        }

        return await res.json();
    };

    /*1-й вариант создания карточек*/
//     getResourses(`http://localhost:3000/menu`)
//         .then(data => {
//             data.forEach(({img, altimg, title, descr, price}) => {
// new MenuCard(img, altimg, title, descr, price, `.menu .container`).render();
//             });
//         })
    
/*2-й вариант создания карточек (если один раз будут использоваться)
    getResourses(`http://localhost:3000/menu`)
        .then(data => createCard(data));
    function createCard(data) { 
        data.forEach(({ img, altimg, title, descr, price }) => {
            const element = document.createElement(`div`);

            element.classList.add(`menu__item`);

            element.innerHTML = `
            <img src=${img} alt=${altimg}>
                <h3 class="menu__item-subtitle">${title}</h3>
                <div class="menu__item-descr">${descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${price}</span> грн/день</div>
                </div>
            `

            document.querySelector(`.menu .container`).append(element);
        });
    }*/

    
    // Forms
    
    /*1-ый вариант с использованием JSON (без использования formData) и с включенным свойтвом в php
    const forms = document.querySelectorAll(`form`);

    const message = { 
        loading: `Идет загрузка...`,
        success: `Запрос выполнен успешно!`,
        error: `Извините, что-то пошло не так...`
    }

    forms.forEach(item => { 
        postData(item);
    })

    function postData(form) { 
        form.addEventListener(`submit`, (event) => { 
            event.preventDefault();

            
            let statusMessage = document.createElement(`div`);
            statusMessage.textContent = message.loading;
            form.append(statusMessage);

            const request = new XMLHttpRequest();
            request.open(`POST`, `server.php`);
            request.setRequestHeader(`Content-type`, `application/json; charset=utf-8`);
            const formData = new FormData(form);

            const object = {};
            formData.forEach((item, index) => { 
                object[index] = item;
            })

            const json = JSON.stringify(object);

            request.send(json);


            request.addEventListener(`load`, () => { 
                if (request.status === 200) {
                    console.log(request.response);
                    statusMessage.textContent = message.success;
                    form.reset();
                    setTimeout(() => { 
                        statusMessage.remove();
                    }, 2000)
                } else { 
                    statusMessage.textContent = message.error;
                }
            })
        })
    }*/


//  2-ой вариант с использованием formData(без JSON) и отключенным свойством в php
    const forms = document.querySelectorAll(`form`);

    const message = {
        loading: `img/form/spinner.svg`,
        success: `Спасибо! Мы с вами свяжемся`,
        error: `Упс! Произошла ошибка...`
    }

    forms.forEach(item => { 
        bindPostData(item);
    })

    const postData = async (url, data) => { 
        const res = await fetch(url, {
            method: `POST`,
            headers: {
                'Content-type': 'apllication/json'
            },
            body: data
        });

        return await res.json();
    }

    function bindPostData(form) { 
        form.addEventListener(`submit`, (event) => {
            event.preventDefault();

            let statusMesage = document.createElement(`img`);
            statusMesage.src = message.loading;
            statusMesage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            form.insertAdjacentElement(`afterend`, statusMesage);

            const formData = new FormData(form);

const json = JSON.stringify(Object.fromEntries(formData.entries()));

            
           
    postData('http://localhost:3000/requests', json)
            .then(data => { 
            console.log(data);
            showThanksModal(message.success);
            statusMesage.remove();
            }).catch(() => { 
                showThanksModal(message.error);
            }).finally(() => { 
                form.reset();
            })

            
        });
    }

    function showThanksModal(message) { 
        const prevModalDialog = document.querySelector(`.modal__dialog`);

        prevModalDialog.classList.add(`hide`);
        openModal();

        const thanksModal = document.createElement(`div`);
        thanksModal.classList.add(`modal__dialog`);
        thanksModal.innerHTML = `
            <div class = 'modal__content'>
                <div class = 'modal__close' data-close>×</div>
                <div class = 'modal__title'> ${message}</div>
            </div>
        `;

        document.querySelector(`.modal`).append(thanksModal);
        setTimeout(() => { 
            thanksModal.remove();
            prevModalDialog.classList.add(`show`);
            prevModalDialog.classList.remove(`hide`);
            closeModal();
        },4000)
    }

    
    
});