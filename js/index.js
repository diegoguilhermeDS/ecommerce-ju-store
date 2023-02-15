import {criandoProduto, renderizaCategoria} from "./render.js"
import data from "./database.js"
import { addCarrinho } from "./cart.js"
import { procurarProduto } from "./search.js"

criandoProduto(data)

let tagAcessorio = document.getElementById('Acessórios')
let tagCalcados  = document.getElementById('Calçados')
let tagCamisetas = document.getElementById('Camisetas')
let tagTodos     = document.getElementById('Todos')


tagAcessorio.addEventListener('click', renderizaCategoria)
tagCalcados.addEventListener('click', renderizaCategoria)
tagCamisetas.addEventListener('click', renderizaCategoria)
tagTodos.addEventListener('click', renderizaCategoria)


let butaoPesquisa = document.querySelector('.butao_pesquisa')

butaoPesquisa.addEventListener('click', procurarProduto)