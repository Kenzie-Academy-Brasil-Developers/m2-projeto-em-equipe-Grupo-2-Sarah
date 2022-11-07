import { fecharModal } from "./modal.js"

let urlBase = "https://m2-api-adot-pet.herokuapp.com"
let headers = {
    "Content-Type": "application/json"
}

export async function cadastroUsuario(usuario) {
    try {
        let novoUsuario = await fetch(`${urlBase}/users`, {
                method: "POST",
                headers: headers, 
                body: JSON.stringify(usuario)
        })

        let novoUsuarioJson = await novoUsuario.json()

        fecharModal(novoUsuario.ok)

        return novoUsuarioJson

    } catch (err) {
        console.log(err)
    }
}

export async function login(usuario) {
    try {
        let login = await fetch(`${urlBase}/session/login`, {
                method: "POST",
                headers: headers, 
                body: JSON.stringify(usuario)
        })

        let loginJson = await login.json()
        
        return loginJson

    } catch (err) {
        console.log(err)
    }
}