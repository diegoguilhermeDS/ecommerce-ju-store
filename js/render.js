import { addCarrinho } from "./cart.js"
import data from "./database.js"

// função para criar os produtos da vitrine
function criandoProduto(list) {
    let referenciaLista = document.querySelector('#lista_produtos')
    referenciaLista.innerHTML = ''

    for (let i = 0; i < list.length; i++) {
        
        let produto = list[i]

        // criando template
        let tagLi       = document.createElement("li")

        // adicionando Classe e ID aos templates
        tagLi.classList.add('Produto')
        tagLi.id = `Pro_${produto.id}`

        // atribuindo propriedades
        tagLi.innerHTML = `
        <img src="${produto.img}" alt="${produto.nameItem}">
        <div class="info_produto">
            <span class="especificacao">${produto.tag}</span>
            <h2>${produto.nameItem}</h2>
            <small>${produto.description}</small>
            <span class="preco">R$ ${produto.value.toFixed(2).replace('.',',')}</span>
            <button class="addCart" id="${produto.id}">${produto.addCart}</button>
        </div>
        `

        tagLi.children[1].children[4].addEventListener('click', addCarrinho)

        referenciaLista.appendChild(tagLi)

        referenciaLista.classList.remove('lista_produtos_vazia')
        referenciaLista.classList.add('lista_produtos')
    }

    if (list.length === 0) {
        let tagH3Vazio = document.createElement('li')

        tagH3Vazio.innerHTML = `
            <h3>Item não encontrado!</h3>
        `

        referenciaLista.appendChild(tagH3Vazio)

        referenciaLista.classList.remove('lista_produtos')
        referenciaLista.classList.add('lista_produtos_vazia')
    }
}

function renderizaCategoria(event) {
    let caminho = event.target.id
    
    let categoria = caminho === "Todos" ? data : data.filter((produto) => produto.tag.includes(caminho))
    criandoProduto(categoria)
    /* 
    if (divCar.children[1].className === 'carrinho_vazio') {
        divCar.children[1].remove()
    }

    let buttonAdd = document.getElementsByClassName('addCart')

    for (let b = 0; b < buttonAdd.length; b++) {
        buttonAdd[b].addEventListener('click', addCarrinho)
    }
    
    atualizaCarrinho(carrinho)

    let tagNavegacao = document.querySelectorAll('a')
    
    for (let t = 0; t < tagNavegacao.length; t++) {
        if (tagNavegacao[t].id === caminho.id) {
            caminho.classList.remove('nao_selecionado')
            caminho.classList.add('selecionado')
        } else {
            tagNavegacao[t].classList.remove('selecionado')
            tagNavegacao[t].classList.add('nao_selecionado')
        }
    } */
    
}
 
 export {
    criandoProduto,
    renderizaCategoria
 }