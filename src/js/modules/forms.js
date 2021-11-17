import checkNumInputs from "./checkNumInputs";

const forms = (state) => {
    const form = document.querySelectorAll('form'),
            // phoneInputs = document.querySelectorAll('input[name = "user_phone"]'),
            inputs = document.querySelectorAll('input');

    checkNumInputs('input[name = "user_phone"]');

    // phoneInputs.forEach(item=>{
    //     item.addEventListener('input', () => {
    //         item.value = item.value.replace(/\D/, '');
    //     });
    // });

    const message = {
        loading: 'Загрузка...',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
    }

    const postData = async (url, data) => {
        document.querySelector('.status').textContent = message.loading;
        let res = await fetch(url, {
            method: 'POST',
            body: data
        });
        return await res.text();
    }
    // url - куда отправляем, data - что отправляем
    // Почему мы прописываем async? Потому что fetch отправит запрос на сервер и не 
    // известно когда тот ответит, код в свою очередь после fetch сразу будет выполняться
    // и соот. будет underfind, чтобы этого не произошло применяем async 
    const clearInputs = () => {
        inputs.forEach(item => {
            item.value = '';
        });
    };
    
    form.forEach(item=>{
        item.addEventListener('submit', (e)=>{
            e.preventDefault();

            let statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            item.appendChild(statusMessage);

            const formData = new FormData(item);
            // ниже в условие добавляем функционал для 
            // добавления информации в случае отправки пользователем ряда 
            // форм-опросов (материал, размер и тд)
            if (item.getAttribute('data-calc') === "end") {
                for (key in state){
                    formData.append(key, state[key]);
                }
            }
            
            postData('assets/server.php', formData)
                .then(result =>{
                    console.log(result);
                    statusMessage.textContent = message.success;
                })
                .catch(()=> statusMessage.textContent = message.failure)
                .finally(()=>{
                    clearInputs();
                    setTimeout(()=>{
                        statusMessage.remove();
                    }, 5000);
                });
                
        });
    });
};
export default forms;