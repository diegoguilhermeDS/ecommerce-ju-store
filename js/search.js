import data from "./database.js";
import { criandoProduto } from "./render.js";

function procurarProduto(event) {
  event.preventDefault();

  const input = document.querySelector("#inputSearch")
  let value = input.value

  let produtoFiltrado = data.filter((produto) => produto.nameItem.toLowerCase().includes(value.toLowerCase()))

  criandoProduto(produtoFiltrado);

}

export { procurarProduto };
