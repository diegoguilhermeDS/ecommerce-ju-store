import data from "./database.js";

let carrinho = [];

let divCar = document.querySelector(".div-carrinho");

// função para atualizar o carrinho de compras
function atualizaCarrinho(list) {
  if (list.length === 0) {
    let tagSection = document.createElement("section");

    tagSection.classList.add("carrinho_vazio");

    tagSection.innerHTML = `
            <h3>Carrinho vázio</h3>
            <small>Adicione itens</small>
        `;

    divCar.appendChild(tagSection);
    if (divCar.children[1].className == "secao_carrinho") {
      divCar.children[1].remove();
    }
  } else if (list.length > 0) {
    divCar.children[1].remove();

    let somaTotal = 0;
    let quantidadeProdutos = 0;

    for (let i = 0; i < list.length; i++) {
      somaTotal += list[i].value * list[i].quant;
      quantidadeProdutos += list[i].quant;
    }

    let tagSection = document.createElement("section");

    tagSection.classList.add("secao_carrinho");

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
                    <span>R$ ${somaTotal.toFixed(2).replace(".", ",")}</span>
                </div>
            </div>
        `;
    for (let i = 0; i < list.length; i++) {
      let produto = list[i];

      let carProduto = document.createElement("li");

      carProduto.classList.add("produto_carrinho");
      carProduto.id = produto.id;

      carProduto.innerHTML = `
                <img src="${produto.img}" alt="${produto.nameItem}">
                <div class="infor_produto_carrinho">
                    <h3>${produto.nameItem}</h3>
                    <p>R$ ${produto.value.toFixed(2).replace(".", ",")}</p>
                    <button class="removeProduto" id="${
                      produto.id
                    }">Remover produto</button>
                </div>
                <div class="quantidade">
                    <p>Quant:</p>
                    <P>${produto.quant}</P>
                </div>
            `;
      carProduto.children[1].children[2].addEventListener(
        "click",
        removeProdutoCarinho
      );

      tagSection.children[0].appendChild(carProduto);
    }

    divCar.appendChild(tagSection);
  }
}

atualizaCarrinho(carrinho);

// função para adicionar ao carrinho
function addCarrinho(event) {
  let id = parseInt(event.target.id);

  const findProduct = data.find((product) => product.id === id);
  const validateCart = carrinho.find((product) => product.id === id);
  if (!validateCart) {
    carrinho.push(findProduct);
  } else {
    carrinho = carrinho.map((product) => {
      if (product.id === id) {
        product.quant += 1;
      }

      return product;
    });
  }

  atualizaCarrinho(carrinho);
}

// função para remover produto do carinho
function removeProdutoCarinho(event) {
  let id = +event.target.id;

  const findProduct = carrinho.find((product) => product.id === id);

  if (findProduct.quant <= 1) {
    const index = carrinho.findIndex((product) => product.id === id)
    carrinho.splice(index, 1)

  } else {
    carrinho = carrinho.map((product) => {
      if (product.id === id) {
        product.quant -= 1;
      }

      return product;
    });
  }
  /* for (let c = 0; c < carrinho.length; c++) {
        if (parseInt(quant.id) === carrinho[c].id) {
            if (carrinho[c].quant > 1) {
                carrinho[c].quant--
                carrinho[c].total -= carrinho[c].value

                return atualizaCarrinho(carrinho)
            } else {
                carrinho.splice(c, 1)
            }
        }
    } */

  atualizaCarrinho(carrinho);
}

export { addCarrinho };
