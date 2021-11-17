const modals = () => {
    function bindModal(triggerSelector, modalSelector, closeSelector, closeClickOverlay = true){
        // trigger - кнопка открывающая окно (класс кода)
        // modal - само окно (класс кода)
        // close - класс содержащий крестик закрытия
        // используя querySelectorAll мы вешаем обработчик на все элементы, имеющие соот.характеристики
        const trigger = document.querySelectorAll(triggerSelector),
                modal = document.querySelector(modalSelector),
                close = document.querySelector(closeSelector),
                windows = document.querySelectorAll('[data-modal]'),
                scroll = calcScroll();
        // windows - будет использоваться для закрытия всех открытых модальных окон
        // предварительно в index во всех блоках popup разместили атрибут data-modal

        // функция ниже была trigger.addEventListener, но так как выше у нас
        // uerySelectorAll, массив нужно перебрать
        trigger.forEach(item => {
            item.addEventListener('click', (e)=>{
                if(e.target) {
                    // устанавливаем, чтобы не перегружалась страница при клике на href
                    e.preventDefault();
                }
                
                windows.forEach(item=>{
                    item.style.display = 'none';
                });
                modal.style.display = "block";
                // указывается, чтобы скролл был только внутри модального окна
                document.body.style.overflow = "hidden"; 
                // вместо верхнего варианта(работающего с нашими классами)подключаем
                // с настройками css из используемой в коде библиотеки bootstarp
                // document.body.classList.add('modal-open');

                // ниже условие для того чтобы scrollне скакал
                document.body.style.marginRight = `${scroll}px`;
            });
        })
        close.addEventListener('click', ()=>{
            windows.forEach(item=>{
                item.style.display = 'none';
            });
            modal.style.display = "none";
            document.body.style.overflow = "";
            // document.body.classList.remove('modal-open');
            document.body.style.marginRight = '0px';
        })
        modal.addEventListener('click', (e)=>{
            if(e.target === modal && closeClickOverlay){
                windows.forEach(item=>{
                    item.style.display = 'none';
                });

                modal.style.display = "none";
                document.body.style.overflow = "";
                // document.body.classList.remove('modal-open');
                document.body.style.marginRight = '0px';
            }
            // это действие предназначено для закрытия всплывающего окна при нажатии за его
            // пределами.
            // Как делается: смотрим страницу через инструмент разработчика и кликаем по 
            // строкам кода, тот, что выделаят всю рабочу область за пределами "всплытого окна"
            // и помещаем сюда. Здесь это тот же самый класс, что и самого "вс.окна" - парадокс,
            // но факт, особенность верстки...
        })
    }
    // ниже функция для выполнения п.10 тз - появление модального окна через 60 сек
    function showModalByTime(selector, time){
        setTimeout(function(){
            document.querySelector(selector).style.display = 'block';
            document.body.style.overflow = 'hidden';
        }, time);
    }

    // функция по вычислению размера прокрутки справа
    function calcScroll(){
        let div = document.createElement('div');

        // шаг 1 сами создаем скролл
        
        div.style.width = '50px';
        div.style.height = '50px';
        div.style.overflowY = 'scroll';
        div.style.visibility = 'hidden';

        // шаг2 помещаем его на страницу и вычитаем его отсупы
        // их return, так как они и нужны для margin-right
        document.body.appendChild(div);
        let scrollWidth = div.offsetWidth - div.clientWidth;
        div.remove();

        return scrollWidth;

    }
    // const callEngineerBtn = document.querySelector('.popup_engineer_btn'),
    //     modalEngineer = document.querySelector('.popup_engineer'),
    //     modalEngineerClose = document.querySelector('.popup_engineer .popup_close');
        // суть примерна такая: что нажимается -> что открывается -> чем закрывается
    bindModal('.popup_engineer_btn', '.popup_engineer', '.popup_engineer .popup_close');
    bindModal('.phone_link', '.popup', '.popup .popup_close');
    bindModal('.popup_calc_btn', '.popup_calc', '.popup_calc_close');
    bindModal('.popup_calc_button', '.popup_calc_profile', '.popup_calc_profile_close', false);
    bindModal('.popup_calc_profile_button', '.popup_calc_end', '.popup_calc_end_close', false);
    // showModalByTime('.popup', 60000);
};
export default modals;