import {
  abrirModal,
  modalAtualizarPerfil,
  modalDeletarPerfil,
} from "../../scripts/modal.js";
import { meuPerfil, meusPetParaAdocao, meusPets } from "../../scripts/request.js";
import { recebeLocalStorage } from "../../scripts/localStorage.js";

const token = JSON.parse(localStorage.getItem("token"));
const dadosPessoais = document.querySelector(".dados");
const imagemPerfil = document.querySelector(".cabecalho img");

async function criarPerfil() {
  let perfil = await meuPerfil(token);
  let listaMeusPets = await meusPets(token);
  dadosPessoais.insertAdjacentHTML(
    "afterbegin",
    `
    <h2><span>Nome:</span> ${perfil.name}</h2>
    <h2><span>E-mail:</span> ${perfil.email}</h2>
    `
  );
  if (listaMeusPets.length == 0) {
    dadosPessoais.insertAdjacentHTML(
      "beforeend",
      `
            <h2>Você ainda não adotou nenhum pet</h2>
            `
    );
  } else if (listaMeusPets.length == 1) {
    dadosPessoais.insertAdjacentHTML(
      "beforeend",
      `
            <h2><span>Você adotou:</span> ${listaMeusPets.length} pet</h2>
            `
    );
  } else {
    dadosPessoais.insertAdjacentHTML(
      "beforeend",
      `
            <h2><span>Você adotou:</span> ${listaMeusPets.length} pets</h2>
            `
    );
  }
  imagemPerfil.src = perfil.avatar_url;
}

function botaoHomeEvent() {
  const botaoHome = document.querySelector("#botaoHome");

  botaoHome.addEventListener("click", () => {
    window.location.replace("../home/index.html");
  });
}

function botaoLogoutEvent() {
  const botaoLogout = document.querySelector("#botaoLogout");

  botaoLogout.addEventListener("click", () => {
    localStorage.removeItem("token");
    window.location.replace("../../index.html");
  });
}

async function atualizarPerfilEvent() {
  const botaoAttPerfil = document.querySelector("#atualizarInformacoes");

  const token = JSON.parse(localStorage.getItem("token"));
  const perfilInfo = await meuPerfil(token);

  botaoAttPerfil.addEventListener("click", () =>
    abrirModal(modalAtualizarPerfil(perfilInfo))
  );
}

function criaCardPetProfile(pet) {

    const card = document.createElement("li");
    const figure = document.createElement("div");
    const fotoPet = document.createElement("img");
    const divCorpoCard = document.createElement("div");
    const nome = document.createElement("h3");
    const especie = document.createElement("h3");
    const adotavel = document.createElement("h3");
    const botaoAtualizar = document.createElement("button");
    const botaoDeletar = document.createElement("button");

    card.classList.add('cardPet2')
    figure.classList.add('caixaImagem')
    fotoPet.classList.add('bgImg')
    divCorpoCard.classList.add('corpoCard')
    botaoAtualizar.classList.add('buttonBrand1')
    botaoDeletar.classList.add('buttonBrand1')

    botaoAtualizar.id = "btn-atualizar";
    botaoDeletar.id = "btn-deletar";

    nome.innerText = `Nome: ${pet.name}`;
    especie.innerText = `Espécie: ${pet.species}`;

    if (pet.available_for_adoption) {
        adotavel.innerText = 'Adotável: Sim'
    } else {
        adotavel.innerText = 'Adotável: Não'
    }

    fotoPet.src = pet.avatar_url;
    fotoPet.alt = `Foto do ${pet.name} (${pet.species})`;

    botaoAtualizar.innerText = 'Atualziar'

    botaoDeletar.innerText = 'Deletar'

    figure.appendChild(fotoPet)
    divCorpoCard.append(nome, especie, adotavel, botaoAtualizar, botaoDeletar)
    card.append(figure, divCorpoCard)

    return card
}

async function renderizaCardPetProfile() {
    const ul = document.querySelector('.listaDePets')

    let localS = JSON.parse(localStorage.getItem('token'))

    let testpet = await meusPetParaAdocao(localS)


    if (testpet !== undefined){
        testpet.forEach(element => {
            ul.append(criaCardPetProfile(element))
    })}
    else{
        let textoVazio = document.createElement('h2')
        textoVazio.innerText = 'Sem Pets para adoção'
        ul.appendChild(textoVazio)
    }

}

async function deletarPerfil() {
  const botaoDeletarPerfil = document.querySelector("#deletarConta");
  
  botaoDeletarPerfil.addEventListener("click", () => {
    abrirModal(modalDeletarPerfil());
  });
}

botaoHomeEvent();
botaoLogoutEvent();
atualizarPerfilEvent();
adotarPet()
criarPerfil();
deletarPerfil();
renderizaCardPetProfile()
