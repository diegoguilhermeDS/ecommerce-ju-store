
let carrinho = []

let divCar = document.querySelector('.div-carrinho')


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
            <button class="addCart">${produto.addCart}</button>
        </div>
        `
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

criandoProduto(data)



// função para adicionar ao carrinho
function addCarrinho(event) {
    let caminho = parseInt(event.path[2].id.substring(4))

    for (let i = 0; i < data.length; i++) {
        if (caminho === data[i].id) {

            if (carrinho.length > 0) {
                for (let c = 0; c < carrinho.length; c++) {
                    if (carrinho[c].id === data[i].id) {
                        carrinho[c].quant++ 
                        carrinho[c].total += data[i].value

                        return atualizaCarrinho(carrinho)
                    } 
                }
            }
            
            let objCar = {
                id: data[i].id,
                img: `${data[i].img}`,
                nameItem: `${data[i].nameItem}`,
                value: data[i].value,
                quant: 1,
                total: data[i].value
            }

            carrinho.push(objCar)
        }
    }
    atualizaCarrinho(carrinho)
}


// pegando e adicionando um escutador para os butões de add carrinho
let buttonAdd = document.getElementsByClassName('addCart')

for (let b = 0; b < buttonAdd.length; b++) {
    buttonAdd[b].addEventListener('click', addCarrinho)
}

// função para atualizar o carrinho de compras
function atualizaCarrinho(list) {
    if (list.length === 0) {
        let tagSection = document.createElement("section")

        tagSection.classList.add('carrinho_vazio')

        tagSection.innerHTML = `
            <h3>Carrinho vázio</h3>
            <small>Adicione itens</small>
        `

        divCar.appendChild(tagSection)
        if (divCar.children[1].className == 'secao_carrinho') {
            divCar.children[1].remove()
        } 

    } else if (list.length > 0) {
        divCar.children[1].remove()

        let somaTotal = 0
        let quantidadeProdutos = 0

        for (let i = 0; i < list.length; i++) {
            somaTotal += list[i].total
            quantidadeProdutos += list[i].quant
        }

        let tagSection = document.createElement("section")

        tagSection.classList.add('secao_carrinho')

        tagSection.innerHTML = `
            <ul class="lista_carrinho">
            
            </ul>
            <div class="total_carrinho">
                <div class="total">
                    <span>Quantidade:</span>
                    <span>${quantidadeProdutos}</span>
                </div>
                <div class="total">
                    <span>Total:</span>
                    <span>R$ ${somaTotal.toFixed(2).replace('.',',')}</span>
                </div>
            </div>
        `
        for (let i = 0; i < list.length; i++) {
            let produto = list[i]

            let carProduto = document.createElement("li")    

            carProduto.classList.add('produto_carrinho')
            carProduto.id = produto.id

            carProduto.innerHTML = `
                <img src="${produto.img}" alt="${produto.nameItem}">
                <div class="infor_produto_carrinho">
                    <h3>${produto.nameItem}</h3>
                    <p>R$ ${produto.value.toFixed(2).replace('.',',')}</p>
                    <button class="removeProduto">Remover produto</button>
                </div>
                <div class="quantidade">
                    <p>Quant:</p>
                    <P>${produto.quant}</P>
                </div>
            `
            carProduto.children[1].children[2].addEventListener('click', removeProdutoCarinho)

            tagSection.children[0].appendChild(carProduto)
        }

        divCar.appendChild(tagSection)
    }
}

atualizaCarrinho(carrinho)

// função para remover produto do carinho
function removeProdutoCarinho(event) {
    let quant = event.path[2]

    for (let c = 0; c < carrinho.length; c++) {
        if (parseInt(quant.id) === carrinho[c].id) {
            if (carrinho[c].quant > 1) {
                carrinho[c].quant--
                carrinho[c].total -= carrinho[c].value

                return atualizaCarrinho(carrinho)
            } else {
                carrinho.splice(c, 1)
            }
        }
    }

    atualizaCarrinho(carrinho)
}


let tagAcessorio = document.getElementById('Acessórios')
let tagCalcados  = document.getElementById('Calçados')
let tagCamisetas = document.getElementById('Camisetas')
let tagTodos     = document.getElementById('Todos')


tagAcessorio.addEventListener('click', renderizaCategoria)
tagCalcados.addEventListener('click', renderizaCategoria)
tagCamisetas.addEventListener('click', renderizaCategoria)
tagTodos.addEventListener('click', renderizaCategoria)


function renderizaCategoria(event) {
    
    let caminho = ''

    if (typeof(event.path) === 'undefined') {
        caminho = event
    } else {
        caminho = event.path[0]
    }

    
    
    let categoria = []

    for (let i = 0; i < data.length; i++) {
        if (caminho.id === data[i].tag[0]) {
            categoria.push(data[i])
        } else if (caminho.id === 'Todos') {
            categoria.push(data[i])
        }
    }

    criandoProduto(categoria)
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
    }
    
}


function procurarProduto(event) {
    event.preventDefault()
    let produto = event.path[1].children[0].value
    produto = produto.toUpperCase()
    
    let produtoFiltrado = []

    let tagUlNav = document.getElementsByTagName('ul')[0]
    console.log(tagUlNav.children)

    for (let i = 0; i < data.length; i++) {
        let produtoAtualCar = data[i].nameItem.toUpperCase().split(' ')

        for (let p = 0; p < produtoAtualCar.length; p++) {
            if (produto === produtoAtualCar[p]) {
                for (let l = 0; l < tagUlNav.children.length; l++) {
                    let navAtual = tagUlNav.children[l].children[0].className

                    if (navAtual === 'selecionado') {
                        let idNav = tagUlNav.children[l].children[0].id

                        if (idNav === 'Todos') {
                            produtoFiltrado.push(data[i])
                        } else if (idNav == data[i].tag) {
                            produtoFiltrado.push(data[i])
                        }
                    }
                }
                
            } 
        }
    }

    criandoProduto(produtoFiltrado)

    if (produto === '') {
        for (let l = 0; l < tagUlNav.children.length; l++) {
            let navAtual = tagUlNav.children[l].children[0].className

            if (navAtual === 'selecionado') {
                renderizaCategoria(tagUlNav.children[l].children[0]) 
            }
        }
    }

    let buttonAdd = document.getElementsByClassName('addCart')

    for (let b = 0; b < buttonAdd.length; b++) {
        buttonAdd[b].addEventListener('click', addCarrinho)
    }
}

let butaoPesquisa = document.querySelector('.butao_pesquisa')

butaoPesquisa.addEventListener('click', procurarProduto)