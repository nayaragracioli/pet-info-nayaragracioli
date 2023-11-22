// Desenvolva as funcionalidades de cadastro aqui

import { registerRequest, red } from "./requests.js";
import { toast } from "./toast.js";

const handleRegister = () => {
    const inputs = document.querySelectorAll(".login__input");
    const button = document.querySelector("#register__submit");

    button.addEventListener("click", (event) => {
        event.preventDefault();
        let count = 0;

        const inputName = document.querySelector("#user").value;
        const inputEmail = document.querySelector("#Email").value;
        const inputPhoto = document.querySelector("#picture").value;
        const inputPassword = document.querySelector("#Senha").value;

        const loginBody = {
            username: inputName,
            email: inputEmail,
            avatar: inputPhoto,
            password: inputPassword
        };
        console.log(loginBody);
        inputs.forEach(input => {
            if (input.value.trim() === "") {
                count++
            }

        })
        if (count !== 0) {
            return toast("Por favor, preencha todos os campos necessários", red)
        } else {
            registerRequest(loginBody)
        }
    })
}

const btnLogin = () => {
    const button = document.querySelector("#redirect__button");

    button.addEventListener("click", (event) => {
        event.preventDefault();
        location.replace("../..")
    })
}

handleRegister();
btnLogin();