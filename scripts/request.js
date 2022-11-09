import { recebeLocalStorage } from "./localStorage.js";
import { fecharModal } from "./modal.js";

let urlBase = "https://m2-api-adot-pet.herokuapp.com";
let headers = {
  "Content-Type": "application/json",
};

export async function cadastroUsuario(usuario) {
  try {
    let novoUsuario = await fetch(`${urlBase}/users`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(usuario),
    });

    let novoUsuarioJson = await novoUsuario.json();

    fecharModal(novoUsuario.ok);

    return novoUsuarioJson;
  } catch (err) {
    console.log(err);
  }
}

export async function login(usuario) {
  try {
    let login = await fetch(`${urlBase}/session/login`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(usuario),
    });

    let loginJson = await login.json();
    if (loginJson.token) {
      localStorage.setItem("token", JSON.stringify(loginJson.token));

      window.location.replace("../pages/home/index.html");

      return loginJson;

    } else {
      return loginJson.message
    }

  } catch (err) {
    console.log(err);
  }
}

export async function meuPerfil() {
  try {
    let token = recebeLocalStorage()
    let infoPessoal = await fetch(`${urlBase}/users/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    let infoJson = await infoPessoal.json();

    return infoJson;
  } catch (err) {
    console.log(err);
  }
}

export async function todosPets() {
  try {
    let token = recebeLocalStorage()
    let pets = await fetch(`${urlBase}/pets`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    let petsJson = await pets.json();

    return petsJson;
  } catch (err) {
    console.log(err);
  }
}

export async function meusPets() {
  try {
    let token = recebeLocalStorage()
    let pets = await fetch(`${urlBase}/pets/my_pets`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    let petsJson = await pets.json();
   
    return petsJson;
  } catch (err) {
    console.log(err);
  }
}

export async function adotaPet(body) {
  try {
    let token = recebeLocalStorage()
    let adotar = await fetch(
      "https://m2-api-adot-pet.herokuapp.com/adoptions",
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
        body: JSON.stringify(body),
      }
    );

    await adotar.json();

    window.location.reload();
  } catch (err) {
    console.log(err);
  }
}

export async function meusPetParaAdocao() {
  try {
    let token = recebeLocalStorage()
    let adotar = await fetch('https://m2-api-adot-pet.herokuapp.com/adoptions/myAdoptions', {
      method: "GET",
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    })
        let adotados = await adotar.json()

        return adotados

    } catch (err) {
        console.log(err)
    }
}

export async function atualizarPerfil(body) {
  try {
    let token = recebeLocalStorage();
    let atualiza = await fetch(
      "https://m2-api-adot-pet.herokuapp.com/users/profile",
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      }
    );

    await atualiza.json();

    window.location.reload();
  } catch (err) {
    console.log(err);
  }
}

export async function deletarPerfil() {
  try {
    let token = recebeLocalStorage()
    let deleta = await fetch(
      "https://m2-api-adot-pet.herokuapp.com/users/profile",
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    await deleta.json();

    localStorage.removeItem("token");

    window.location.replace("../../index.html");
  } catch (err) {
    console.log(err);
  }
}

export async function cadastrarPet(body) {
    try {
        let token = recebeLocalStorage()
        let cadastraPet = await fetch('https://m2-api-adot-pet.herokuapp.com/pets', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(body)
        })
        await cadastraPet.json()

        window.location.reload()

  } catch (err) {
    console.log(err)
  }
}

export async function atualizarPet(body, idPet) {
  try {
    let token = recebeLocalStorage() 
    let atualizaPet = await fetch(
      `https://m2-api-adot-pet.herokuapp.com/pets/${idPet}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      }
    );

    let alterado = await atualizaPet.json();

    window.location.reload();

    return alterado
  } catch (err) {
    console.log(err);
  }
}

export async function deletarPet(idPet) {
  try {
    let token = recebeLocalStorage() 
    let deletaPet = await fetch(
      `https://m2-api-adot-pet.herokuapp.com/pets/${idPet}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    await deletaPet.json();

    window.location.reload();
    
  } catch (err) {
    console.log(err);
  }
}
