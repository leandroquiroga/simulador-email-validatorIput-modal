const selector = (select) => document.querySelector(select);
const selectorAll = (select) => document.querySelectorAll(select);
const createElement = (element) => document.createElement(element);
const arrobaEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/


const divButton = (div) =>{
    let btnReset = createElement('button');
    let btnSend = createElement('button');
    
    function createIcon(i,name){ 
        i.classList.add('material-icons');
        i.textContent = name;
    }
    
    function createButtonForms(button, id ,classBtn, classFormBtn, contenText){
        let icon = createElement('i');

        if(id == 'sendEmail'){
            button.id = 'sendEmail';
            button.disabled = true
            button.classList.add(classBtn, classFormBtn);
            button.textContent = contenText;
            button.type = 'submit';
            createIcon(icon,'mail');
        }else if(id == 'resetEmail'){
            button.id = 'resetEmail';
            button.classList.add(classBtn, classFormBtn);
            button.textContent = contenText;
            button.type = 'submit';
            createIcon(icon,'refresh');

        }

        button.appendChild(icon);

        return button;
    }

    createButtonForms(btnSend,'sendEmail','btn', 'boton-form','Send Forms');
    createButtonForms(btnReset,'resetEmail','btn', 'boton-form', 'Reset Forms');

    div.classList.add('content-button');
    
    div.appendChild(btnSend);
    div.appendChild(btnReset);
} 

const forms = (form) => {
    let inputEmail = createElement('input');
    let inputAsunto = createElement('input');
    let inputMensagge = createElement('textarea');
    let div = createElement('div');

    function formEmail(inputEmail){
        inputEmail.id = 'email';
        inputEmail.type = 'email';
        inputEmail.placeholder = 'Ingrese su Email';

        return inputEmail;
    }

    function formAsunto(inputAsunto){
        inputAsunto.id = 'text';
        inputAsunto.type = 'text';
        inputAsunto.placeholder = 'Asunto'
        return inputAsunto;
    }

    function formMsg(inputMensagge){
        inputMensagge.id = 'textarea1';
        inputMensagge.classList.add('materialize-textarea')
        inputMensagge.cols = '120';
        inputMensagge.maxLength = '150';
        inputMensagge.minLength = '1'
        inputMensagge.placeholder = 'Ingrese un mensaje'
        
        return inputMensagge;
    }


    form.method = 'GET';
    form.classList.add('formulario'); 
    
    formEmail(inputEmail);
    formAsunto(inputAsunto);
    formMsg(inputMensagge);
    divButton(div); 
    
    form.insertBefore(inputEmail, form.childNodes[0]);
    form.insertBefore(inputAsunto, form.childNodes[1]);
    form.insertBefore(inputMensagge, form.childNodes[2]);
    form.insertBefore(div, form.childNodes[3]);


    return form;
}

const title = (title, text, clase) =>{
    title.textContent =  text;
    title.classList.add(clase);
    return title
}

const createWindows = (form,h1, contentModal) => {
    title(h1, 'Enviar Email', 'title');
    forms(form);

    contentModal.insertBefore(h1, contentModal.childNodes[0]);
    contentModal.insertBefore(form, contentModal.childNodes[1]);    

    // return contentModal;
}
const validateForm = (form) => {
    /* let idInput = selector(formulario).childNodes[0]; */
    let email = selector('#email')
    let asunto = selector('#text');
    let textArea = selector('#textarea1');
    let reset = selector('#resetEmail');
    let send = selector('#sendEmail');


    email.addEventListener('blur', validacion);
    asunto.addEventListener('blur', validacion);
    textArea.addEventListener('blur', validacion);
    send.addEventListener('click', pressButtonForm);
    reset.addEventListener('click', () =>{
        form.reset();
    })
    
    function validacion(e){
        let longitudInput = e.target.value.length;
        let styleInput = e.target.style;
        let type = e.target.type;
        let error = selector('.error');
        let activarBtn = form.childNodes[3].childNodes[0];

        // verifica que los input no estan vacios
        if(longitudInput > 0 ){
            styleInput.border = '1px solid #26a69a'
            if(error) error.remove();
        } else{
            styleInput.border = '1px solid #e31111'
            mostrarMensajeErr('Por favor complete  todos campos');
        }

        // verifica el mail
        if(type == 'email'){ 
            if(arrobaEx.test(e.target.value)){
                styleInput.border = '1px solid #26a69a'
                if(error) error.remove();
            }else{
                styleInput.border = '1px solid #e31111'
                mostrarMensajeErr('El email no es valido');
            }
        }

        // activa el boton una vez que se completo el formulario
        if(arrobaEx.test(email.value) && asunto.value !== '' & textArea.value !== ''){
            activarBtn.disabled = false;
        }else{
            activarBtn.disabled = true;
        }
    };

    function mostrarMensajeErr(mensajeErr){
        let div = createElement('div');
        div.classList.add('error');
        div.textContent = mensajeErr; ;
        let error = selectorAll('.error');
        
        // chequea si todos no existen clases de tipo .error 
        if(error.length === 0){
            form.appendChild(div);
        }
    }

    function pressButtonForm(e){
        e.preventDefault();
        let h2 = createElement('h2');
        let div = createElement('div');

        
        div.classList.add('spiner')
        div.innerHTML = `
                            <div class="preloader-wrapper active">
                                <div class="spinner-layer spinner-green-only">
                                    <div class="circle-clipper left">
                                        <div class="circle"></div>
                                    </div><div class="gap-patch">
                                        <div class="circle"></div>
                                    </div><div class="circle-clipper right">
                                        <div class="circle"></div>
                                    </div>
                                </div>
                            </div>
        
                        `
        form.insertBefore(div, form.childNodes[3]);

        // Elmina el spinner y el mensaje en un determinado tiempo
        setTimeout(() => {
            div.removeChild(div.childNodes[1]);
            title(h2, 'Mensaje enviado', 'successMail');
            form.insertBefore(h2, form.childNodes[0]);

            setTimeout(() =>{
                form.removeChild(form.childNodes[0])
                form.reset();
            }, 1500)
        }, 3000);
        
    }
} 

const createForms = () =>{
    let contentModal = selector('.modal-content');
    let form = createElement('form');
    let h1 = createElement('h1');

    createWindows(form,h1,contentModal);
    validateForm(form);
}

const init = () => {
    document.addEventListener('DOMContentLoaded', () => {
        let modal = selector('.modal')
        let intances = M.Modal.init(modal);
        let btn = selector('.btn-large');

        btn.addEventListener('click', () => {
            intances.open();
            createForms();

        })
        intances.destroy();
    })
}

init();