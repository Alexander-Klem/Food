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

// const { create } = require("browser-sync");

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
        modal = document.querySelector(`.modal`);
    // modalCloseBtn = document.querySelector(`[data-close]`);
    
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

    // modalCloseBtn.addEventListener(`click`, closeModal);

    function closeModal() {
        modal.classList.add(`hide`);
        modal.classList.remove(`show`);
        document.body.style.overflow = `visible`;
    }

    modal.addEventListener(`click`, (event) => {
        const target = event.target;
        if (target && target === modal || event.target.getAttribute(`data-close`) === '') {
            closeModal();
        }
    });

    document.addEventListener(`keydown`, (event) => {
        if (event.code === `Escape` && modal.classList.contains(`show`)) {
            closeModal();
        }
    });

    const modalTimerId = setTimeout(openModal, 50000);

    // pageYOffset - это свойство отслеживает сколько px сверху у нас отлистал пользователь по оси Y (window.pageYOffset – то же самое, что и window.scrollY.)
    // Чтобы удалить какой-то обработчик события, мы должны делать ссылку именно функцию, которая исполнялась как этот обработчик - removeEventListener();
    
    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
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

    const getResourses = async (url) => {
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`); //- выкидываем ошибку в ручном режиме
        }

        return await res.json();
    };

    /*1-ый вариант*/
    // getResourses(`http://localhost:3000/menu`)
    //     .then(data => {
    //         data.forEach(({img, altimg, title, descr, price}) => { // используем деструктуризацию объекта, чтобы вытащить из объекта свойства в качестве отдельной переменной
    //             new MenuCard(img, altimg, title, descr, price, `.menu .container`).render(); // (Обращаемся к class MenuCard) - этот конструктор будет у меня создаваться столько раз, сколько будет объектов внутри массива внутри сервера(db.json) 
    //         });
    //     });
    
    /* 2-ой вариант создания определенных элементов динимачески на странице (Отличие в том, что он не будет использовать классы, а будет сразу формировать верстку на лету). ЕСЛИ НАМ НЕОБХОДИМО ЧТО-ТО ОДИН РАЗ ТОЛЬКО ПОСТРОИТЬ, ТО МОЖНО ПРИМЕНЯТЬ ЭТОТ МЕТОД

    getResourses(`http://localhost:3000/menu`)
        .then(data => createCard(data));
    
    function createCard(data) { 
        data.forEach(({ img, altimg, title, descr, price }) => { 
            const element = document.createElement(`div`);
            price = Math.floor(price * 3.30);
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
                
            `;

            document.querySelector(`.menu .container`).append(element);
        })
    }*/

    // Объект может существовать без переменной - делается это тогда, когда этот объект используется только на месте т.е если мы его сейчас в переменную никакую не положим, то потом он просто потеряется т.е создаться и удалиться т.к на него не будет потом просто никаких ссылок.

    // Лекция - 90
    axios.get(`http://localhost:3000/menu`)
        .then(data => {
            data.data.forEach(({ img, altimg, title, descr, price }) => {
                new MenuCard(img, altimg, title, descr, price, `.menu .container`).render();
            })
            
            // data.data(обращаемся к данным, которые мы получили от сервера)

            /*Forms (Недоделанная попытка)
        
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
            }*/

    
            //Forms 

            /*Первый пример без использования JSON
             const forms = document.querySelectorAll(`form`);
         
             // По сути это небольшое хранилище сообщений, которых мы хотим показать пользователю
             const message = {
                 loading: `Загрузка`,
                 success: `Спасибо! Скоро мы с вами свяжемся`,
                 failure: `Что-то пошло не так...`
             };
         
             forms.forEach(item => { 
                 postData(item);
             })
         
             function postData(form) { 
                 form.addEventListener(`submit`, (event) => {    
                     event.preventDefault();
         
                     //(message) Чтобы поместить message, мы динимачески создадим новый блок на странице и выводим сообщение(картинку, текс и т.д), чаще всего он добавляется к форме.
         
                     const statusMesage = document.createElement(`div`);
                     statusMesage.classList.add(`status`);
                     statusMesage.textContent = message.loading;
                     form.append(statusMesage);
         
         
                     const request = new XMLHttpRequest();
                     request.open(`POST`, `server.php`);
                     
                     // Как сделать так, чтобы все данные которые заполнил пользователь в форме, мы получили в JS и смогли отправить на сервер. Конечно мы в ручную могли бы взять эту форму, взять все input и их value, перебрать, сформировать объект. Но это запарное занятие и у нас есть готовый механизм для этого всего. Самый простой способ - это использовать объект FormData (нам не всегда нужно передавать в формате JSON. Завивисит от того с какой технологией с который мы работаем на Backend).;
         
                     // FormData(откуда берем данные) - это специальный объект, который позволяет с определенной формы быстро сформировать данные которые заполнил пользователь(ключ, значение). 
                     
                     // !Важный момент, на котором можно запнуться - это зависит от добросовестности верстальщика и касается того, как сверстаны формы и как прописаны input. Самое главное, что когда мы подрузумеваем, что эти данные будут идти на сервер, мы должны АБСОЛЮТНО ВСЕГДА! указывать атрибут name (name = `неважно какой текст(name)`). Иначе FormData не сможет найти этот input и не сможет найти ему нужные данные.
                     
                     // request.setRequestHeader(`Content-type`, `multipart/form-data`);
                      // !Когда мы используем связку XMLHttpRequest + FormData, то нам заголовок устанавливать не нужно т . к он устанавливается автоматически(именно из-за этой проблемы, мы не получили данные на сервере). Значит request.setRequestHeader устанавливать не нужно!!
         
                     
                     // `multipart/form-data` - чтобы работать с formData, нам нужно установить такой заголовок.
         
                     const formData = new FormData(form);
         
                     request.send(formData);
         
                     request.addEventListener('load', () => {
                         if (request.status === 200) {
                             console.log(request.response);
                             statusMesage.textContent = message.success;
                             form.reset();
                             setTimeout(() => {
                                 statusMesage.remove();
                             }, 2000);
                         } else {
                             statusMesage.textContent = message.failure;
                         }
                     });
                 })
             }
         
             // !Важный момент. Когда мы работаем на локальном сервере, то придется каждый раз после каких-то изменений сбрасывать кэш. Делается для того, чтобы все изменения применились на странице, потому что сейчас сервер запонимает старые изменения, чтобы их каждый раз не подгружать и это называется - кэш. (Комбинация для очистки: Shift + F5)*/

            // 2) Но если мы хотим, чтобы наш сервер принимал данные не в обычном формате, а в JSON.Значит нужны данные в формате JSON.
    
            // const forms = document.querySelectorAll('form');
            // const message = {
            //     loading: 'Загрузка...',
            //     success: 'Спасибо! Скоро мы с вами свяжемся',
            //     failure: 'Что-то пошло не так...'
            // };

            // forms.forEach(item => {
            //     postData(item);
            // });

            // function postData(form) {
            //     form.addEventListener('submit', (e) => {
            //         e.preventDefault();

            //         let statusMessage = document.createElement('div');
            //         statusMessage.classList.add('status');
            //         statusMessage.textContent = message.loading;
            //         form.appendChild(statusMessage);
        
            //         const request = new XMLHttpRequest();
            //         request.open('POST', 'server.php');
            //         request.setRequestHeader('Content-type', 'application/json; charset=utf-8');

            //         const formData = new FormData(form);

            //         // У нас есть formData, который необходимо превратить в формат JSON(formData специфический объект и мы не можем просто так его прогнать в другой формат). Используем следующий прием

            //         const object = {};
            //         formData.forEach(function (value, key) {
            //             object[key] = value;
            //         });
            //         const json = JSON.stringify(object);

            //         request.send(json);

            //         // Есть небольшой нюанс с Backend разработкой. PHP не умеет работать с форматами данных JSON, чаще всего будем отправлять данные на сервера с использованием nodeJS. Но все равно с таким типо данных можно поработать (смотри server.php)

            //         request.addEventListener('load', () => {
            //             if (request.status === 200) {
            //                 console.log(request.response);
            //                 statusMessage.textContent = message.success;
            //                 form.reset();
            //                 setTimeout(() => {
            //                     statusMessage.remove();
            //                 }, 2000);
            //             } else {
            //                 statusMessage.textContent = message.failure;
            //             }
            //         });
            //     });
            // }
    
            const forms = document.querySelectorAll('form');
            const message = {
                loading: `img/form/spinner.svg`,
                success: 'Спасибо! Скоро мы с вами свяжемся',
                failure: 'Что-то пошло не так...'
            };

            forms.forEach(item => {
                bindPostData(item);
            });

            const postData = async (url, data) => {
                const res = await fetch(url, {
                    method: `POST`,
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: data
                });

                return await res.json();
            };

            function bindPostData(form) {
                form.addEventListener('submit', (e) => {
                    e.preventDefault();


                    const statusMessage = document.createElement(`img`);
                    statusMessage.src = message.loading;
                    // statusMessage.src - Мы образаемся напрямую к какому-то нашему DOM узлу и сразу же обращаемся к атрибуту(Точно также мы можем использовать setAttribute и в принципе разницы никакой не будет) 
                    statusMessage.style.cssText = `
                    display:block;
                    margin: 0 auto;
                    `; //(Или можно просто все добавить в css и просто добавить класс т.к так даже будет правильнее)))

                    // cssText - Можем записать css стили которые применятся в формате inline к элементу

                    // form.append(statusMessage);
                    form.insertAdjacentElement(`afterend`, statusMessage);
                    // elem.insertAdjacentHTML(where, html).

                    // "beforebegin" – вставить html непосредственно перед elem,
                    // "afterbegin" – вставить html в начало elem,
                    // "beforeend" – вставить html в конец elem,
                    // "afterend" – вставить html непосредственно после elem.

                    // insertAdjacentElement(position, element) - Более гибкий метод, который позволяет нам помещать наши элементы в разные места нашей верстки(добавляет переданный элемент в DOM-дерево относительно элемента, вызвавшего метод.)
        

                    const formData = new FormData(form);

                    // 2) Отправка JSON формат
                    const json = JSON.stringify(Object.fromEntries(formData.entries()));
           
                    postData(`http://localhost:3000/requests`, json)
                        .then(data => {
                            console.log(data);
                            showThanksModal(message.success);
                            statusMessage.remove();
                        }).catch(() => {
                            showThanksModal(message.failure);
                        }).finally(() => {
                            form.reset(); // Восстанавливает значения по умолчанию элемента формы.
                        })
                });
            }

            // Дополнение к Forms(Лекция - 84)
    
            function showThanksModal(message) {
                const prevModalDialog = document.querySelector(`.modal__dialog`);

                prevModalDialog.classList.add('hide');
                openModal();

                const thanksModal = document.createElement(`div`);
                thanksModal.classList.add(`modal__dialog`);
                thanksModal.innerHTML = `
                <div class = "modal__content">
                    <div class = "modal__close" data-close>×</div>
                    <div class = "modal__title">${message}</div>
                </div>
                `;

                document.querySelector(`.modal`).append(thanksModal);
                setTimeout(() => {
                    thanksModal.remove();
                    prevModalDialog.classList.add(`show`, `fade`);
                    prevModalDialog.classList.remove(`hide`);
                    closeModal();
                }, 4000)
            }
            // Итог Лекции - 84: Когда мы работаем с запросами на сервер(во время обработки и после того как наш запрос завершился), мы можем делать абсолютно все что угодно со страницей(добавлять элементы, картинки, модифицировать классы и др.). Самое главное поставить четкую задачу и следовать по алгоритму действий что за чем вы хотите выполнить.

        });
    
    /*Лекция - 91 (1-й вариант, более простой) (Создаем слайдер на сайте)

    const slides = document.querySelectorAll('.offer__slide'),
          prev = document.querySelector(`.offer__slider-prev`),
          next = document.querySelector(`.offer__slider-next`),
          total = document.querySelector('#total'),
          current = document.querySelector(`#current`);
          
    let slideIndex = 1;

    showSlides(slideIndex); // - инициализируем(чтобы он изначально в ту структуру, в которую мы должны увидеть). Эта функция будет вызываться каждый раз, как мы будем нажимать на стрелку на странице(prev, next)

    if (slides.length < 5) {
        total.textContent = `0${slides.length}`
    } else { 
        total.textContent = slides.length;
    }

    function showSlides(n) { 
        if (n > slides.length) { 
            slideIndex = 1;
        }

        if (n < 1) { 
            slideIndex = slides.length;
        }

        slides.forEach(item => { 
            item.style.display = `none`;
        })

        slides[slideIndex - 1].style.display = `block`;

        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`
        } else { 
            current.textContent = slideIndex;
        }
    }

    function plusSlides(n) { 
        showSlides(slideIndex += n)
    }

    prev.addEventListener(`click`, () => {
        plusSlides(-1);
    });
    
    next.addEventListener(`click`, () => {
        plusSlides(1);
    });*/

    /*Лекция - 92 (2-й вариант, более сложный) (Создаем слайдер на сайте)*/

    // Тип работы - карусель(слайды размещены в ряд и мы их передвигаем)

    const slides = document.querySelectorAll('.offer__slide'),
        slider = document.querySelector(`.offer__slider`), // Лекция - 93
        prev = document.querySelector(`.offer__slider-prev`),
        next = document.querySelector(`.offer__slider-next`),
        total = document.querySelector('#total'),
        current = document.querySelector(`#current`),
        slidesWrapper = document.querySelector(`.offer__slider-wrapper`),
        slidesField = document.querySelector(`.offer__slider-inner`),
        width = window.getComputedStyle(slidesWrapper).width;   

        // window.getComputedStyle(element [, pseudoElt]); - возвращает объект, содержащий значения всех CSS-свойств элемента, полученных после применения всех активных таблиц стилей, и завершения базовых вычислений значений, которые они могут содержать.

    let slideIndex = 1;
    let offset = 0;

    if (slides.length < 5) {
        total.textContent = `0${slides.length}`;
        current.textContent = `0${slideIndex}`;
    } else { 
        total.textContent = slides.length;
        current.textContent = slideIndex;
    }

    slidesField.style.width = 100 * slides.length + `%`;
    slidesField.style.display = `flex`;
    slidesField.style.transition = `0.5s all`;

    slidesWrapper.style.overflow = `hidden`;

    slides.forEach(slide => {
        slide.style.width = width;
    });

    slider.style.position = 'relative';

    const indicators = document.createElement(`ol`),
          dots = [];

    indicators.classList.add(`carousel-indicators`);
    indicators.style.cssText = `
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 15;
    display: flex;
    justify-content: center;
    margin-right: 15%;
    margin-left: 15%;
    list-style: none;
    `;

    slider.append(indicators);

    for (let i = 0; i < slides.length; i++) { 
        const dot = document.createElement(`li`);
        dot.setAttribute(`data-slide-to`, i + 1); 
        dot.style.cssText = `
        box-sizing: content-box;
    flex: 0 1 auto;
    width: 30px;
    height: 6px;
    margin-right: 3px;
    margin-left: 3px;
    cursor: pointer;
    background-color: #fff;
    background-clip: padding-box;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    opacity: .5;
    transition: opacity .6s ease;
        `;
        if (i == 0) { 
            dot.style.opacity = 1;
        }
        indicators.append(dot);
        dots.push(dot);
    }

    function deleteNotDigits(str) { 
        return +str.replace(/\D/g, ``);
    }

    function DotsOpacity05(dots) { 
        return dots.forEach(dot => dot.style.opacity = `.5`);
    }

    function DotsOpacity1(dots) { 
        return dots[slideIndex - 1].style.opacity = 1;
    }

    next.addEventListener(`click`, () => {
        if (offset === deleteNotDigits(width) * (slides.length - 1)) { //`500px`
            offset = 0;
        } else {
            offset += deleteNotDigits(width);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex === slides.length) {
            slideIndex = 1;
        } else { 
            slideIndex++;
        }

        if (slides.length < 5) {
            current.textContent = `0${slideIndex}`
        } else { 
            current.textContent = slideIndex;
        }

        DotsOpacity05(dots);
        DotsOpacity1(dots);
    });

    prev.addEventListener(`click`, () => { 
        if (offset == 0) {
        offset = deleteNotDigits(width) * (slides.length - 1);
        } else { 
            offset -= deleteNotDigits(width);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == 1) {
            slideIndex = slides.length;
        } else { 
            slideIndex--;
        }

        if (slides.length < 5) {
            current.textContent = `0${slideIndex}`
        } else { 
            current.textContent = slideIndex;
        }

        DotsOpacity05(dots);
        DotsOpacity1(dots);
    })

    dots.forEach(dot => { 
        dot.addEventListener(`click`, (event) => { 
            const slideTo = event.target.getAttribute(`data-slide-to`);

            slideIndex = slideTo;
            offset = deleteNotDigits(width) * (slideTo - 1);

            slidesField.style.transform = `translateX(-${offset}px)`;

            if (slides.length < 5) {
                current.textContent = `0${slideIndex}`
            } else { 
                current.textContent = slideIndex;
            }

            DotsOpacity05(dots);
            DotsOpacity1(dots);
        })
    })

    /*Лекция - 93 (Создаем навигацию для слайдов)

    Принцип работы:
    1) Получить весь слайдер
    2) position relative(т.к точки будут абсолютно спозиционированы и будут всегда прикреплены к низу слайдера)
    3) Создать обертку для точек
    4) С помощью цикла создаем кол - во точек, которые будет равно кол - во слайдов
    5) При клике на каждую из точек, будем перемещаться между слайдами*/


    /*Лекция - 96. Создаем калькулятор на сайте (Часть - 1) 
      Лекция - 97. Создаем калькулятор на сайте (Часть - 2)

    (Лекция - 96) Алгоритм:
    1) Собираем данные с сайта
    2) Подставляем в формулу которую будем использовать
    
    (Лекция - 97) 
    1) Работа с регулярными выражениями
    2) Работа с localStorage
    */

    const result = document.querySelector(`.calculating__result span`);

    let sex = `female`,
        height, weight, age,
        ratio = 1.375;

    function calcTotal() { 
        if (!sex || !height || !weight || !age || !ratio) { 
            result.textContent = `_`;
            return;
        }

        if (sex === `female`) {
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        } else { 
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        }
    }

    calcTotal();

    function getStaticInfo(parentSelector, activeClass) {
        const elements = document.querySelectorAll(`${parentSelector} div`);

        elements.forEach(element => {
            element.addEventListener(`click`, (event) => {
                if (event.target.getAttribute(`data-ratio`)) {
                    ratio = +event.target.getAttribute(`data-ratio`);
                } else {
                    sex = event.target.getAttribute(`id`);
                }
    
                elements.forEach(elem => {
                    elem.classList.remove(activeClass);
                });
    
                event.target.classList.add(activeClass);
    
                calcTotal();
            });
        });

    }

    getStaticInfo('#gender', 'calculating__choose-item_active');
    getStaticInfo('.calculating__choose_big', 'calculating__choose-item_active');

    function getDynamicInfo(selector) { 
        const input = document.querySelector(selector);

        input.addEventListener(`input`, () => {

            switch (input.getAttribute(`id`)) { 
                case 'height':
                    height = +input.value;
                    break;
                case 'weight':
                    weight = +input.value;
                    break;
                case 'age':
                    age = +input.value;
                    break;
            }
            calcTotal();
        })

    }

    getDynamicInfo(`#height`);
    getDynamicInfo(`#weight`);
    getDynamicInfo(`#age`);
});