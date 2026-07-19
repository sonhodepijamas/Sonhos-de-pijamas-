const TELEFONE_WHATSAPP = "5585987425849";

let carrinho = [];
let produtos = [];
let categoriaAtual = "todos";

async function carregarProdutos() {
    try{

        const resposta = await fetch("produtos.json");

        produtos = await resposta.json();

        mostrarProdutos(produtos);

    }catch(erro){

        console.error("Erro ao carregar produtos.",erro);

    }

}

function mostrarProdutos(lista){

    const grid = document.getElementById("lista-produtos");

    grid.innerHTML = "";

    lista.forEach(produto=>{

        grid.innerHTML += `

        <div class="card" data-category="${produto.categoria}">

            <img src="${produto.imagem}" alt="${produto.nome}">

            <div class="info">

                <h3>${produto.nome}</h3>

                <div class="preco">
                    R$ ${produto.preco.toFixed(2).replace(".",",")}
                </div>

                <button class="add-bag"
                onclick="adicionarAoCarrinho('${produto.nome}',${produto.preco})">

                Adicionar à Sacola

                </button>

            </div>

        </div>

        `;

    });

}

function filtrarPijamas(){

    const texto = document
    .getElementById("campo-busca")
    .value
    .toLowerCase();

    const lista = produtos.filter(produto=>{

        const nome = produto.nome.toLowerCase();

        const categoriaOk = categoriaAtual==="todos"
        || produto.categoria===categoriaAtual;

        return nome.includes(texto) && categoriaOk;

    });

    mostrarProdutos(lista);

}

function filtrarCategoria(categoria,botao){

    categoriaAtual = categoria;

    document
    .querySelectorAll(".filtro")
    .forEach(item=>item.classList.remove("ativo"));

    botao.classList.add("ativo");

    filtrarPijamas();

}

function adicionarAoCarrinho(nome,preco){

    const item = carrinho.find(p=>p.nome===nome);

    if(item){

        item.quantidade++;

    }else{

        carrinho.push({

            nome:nome,
            preco:preco,
            quantidade:1

        });

    }

    atualizarSacola();

}

function atualizarSacola(){

    const sacola = document.getElementById("sacola");

    if(carrinho.length===0){

        sacola.classList.remove("active");

        return;

    }

    let quantidade = 0;
    let total = 0;

    carrinho.forEach(item=>{

        quantidade += item.quantidade;

        total += item.quantidade*item.preco;

    });

    document.getElementById("itens-qtd").innerHTML =
    `Sacola: ${quantidade} item(s)`;

    document.getElementById("total-preco").innerHTML =
    `R$ ${total.toFixed(2).replace(".",",")}`;

    sacola.classList.add("active");

}

function limparCarrinho(){

    carrinho=[];

    atualizarSacola();

}

function enviarPedidoWhatsApp(){

    if(carrinho.length===0){

        alert("Sua sacola está vazia.");

        return;

    }

    let mensagem =
`Olá! Gostaria de fazer um pedido.

`;

    let total = 0;

    carrinho.forEach(item=>{

        mensagem +=

`${item.quantidade}x ${item.nome}
R$ ${item.preco.toFixed(2).replace(".",",")}

`;

        total += item.preco*item.quantidade;

    });

    mensagem +=

`Total: R$ ${total.toFixed(2).replace(".",",")}`;

    const url =

`https://wa.me/${TELEFONE_WHATSAPP}?text=${encodeURIComponent(mensagem)}`;

    window.open(url,"_blank");

}

carregarProdutos();