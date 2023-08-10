const LoginForm = document.getElementById("login--form");
const emailInput = document.getElementById("email");
const passInput = document.getElementById("password");
const errorMessage = document.getElementById("form__error");


const users = JSON.parse(localStorage.getItem("users")) ; // continuar con repo del profe

const saveToSessionStorage = (user) => {
    sessionStorage.setItem("activateUser", JSON.stringify(user));
}

const isEmpty = (input) => {
    return !input.value.trim().lenght;
};

const isExistingEmail = (input) => {
    return users.some((user) => user.mail === input.value.trim());
};

const isMatchingPass = (input) => {
    const user = users.find((user) => user.email === emailInput.value.trim());
    return user.password === input.value.trim();
}

//
// funcion para mostrar error al validar un input
//
const showError = (message) => {
    errorMessage.textContent = message;
}

const isValidAccount = () => {
    let valid = false;
    if (isEmpty(emailInput)) {
        showError("Por Favor, complete los campos requeridos");
        return;
    }
    if (!isExistingEmail(emailInput)) {
        showError("El Email ingresado es invalido");
        return;
    };
    if (isEmpty (passInput)) {
        showError("Por Favor, completa los campos requeridos");
        return;
    };
    if (!isMatchingPass(passInput)) {
        showError("Los datos ingresados son incorrectos");
        LoginForm.reset();
        return;
    }
    // en este punto el usuario paso todas las validaciones
    alert("Bienvenido nuevamente, ya estas en linea");
    valid = true;
    errorMessage.textContent = "";
    LoginForm.reset;
    return valid;

}

const login = (e) => {
    e.preventDefault();
    if (isValidAccount()) {
        const user = users.find((user) => user.email === emailInput.value.trim());
        saveToSessionStorage(user);
        window.location.href = "./home.html"
    }
}

// Funcion inicializadora para agregar los escuchadores de los elementos del DOM
const init = () => {
    LoginForm.addEventListener("submit", login)
};
init ();