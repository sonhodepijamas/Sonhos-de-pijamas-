// ==============================
// LISTA DE PRODUTOS
// ==============================

let produtos = JSON.parse(localStorage.getItem("produtos")) || [];

// ==============================
// CARREGAR TABELA
// ==============================

function carregarTabela(){

    const tabela = document.getElementById("listaProdutos");

    tabela.innerHTML = "";

    produtos.forEach((produto,index)=>{

        tabela.innerHTML += `

        <tr>

            <td>
                <img src="${produto.imagem}" width="70">
            </td>

            <td>${produto.nome}</td>

            <td>R$ ${produto.preco.toFixed(2)}</td>

            <td>${produto.categoria}</td>

            <td>

                <button
                onclick="editarProduto(${index})">

                Editar

                </button>

                <button
                onclick="excluirProduto(${index})">

                Excluir

                </button>

            </td>

        </tr>

        `;

    });

}

// ==============================
// SALVAR
// ==============================

function salvarProdutos(){

    localStorage.setItem(

        "produtos",

        JSON.stringify(produtos)

    );

}

// ==============================
// CADASTRAR PRODUTO
// ==============================

function cadastrarProduto(){

    const nome =
    document.getElementById("nome").value;

    const preco =
    parseFloat(document.getElementById("preco").value);

    const categoria =
    document.getElementById("categoria").value;

    const imagem =
    document.getElementById("imagem").value;

    if(

        nome==="" ||

        isNaN(preco)

    ){

        alert("Preencha todos os campos.");

        return;

    }

    produtos.push({

        nome,

        preco,

        categoria,

        imagem

    });

    salvarProdutos();

    carregarTabela();

    limparFormulario();

}
// ==============================
// EDITAR PRODUTO
// ==============================

function editarProduto(index){

    const produto = produtos[index];

    document.getElementById("nome").value = produto.nome;
    document.getElementById("preco").value = produto.preco;
    document.getElementById("categoria").value = produto.categoria;
    document.getElementById("imagem").value = produto.imagem;

    produtos.splice(index,1);

    salvarProdutos();

    carregarTabela();

}

// ==============================
// EXCLUIR PRODUTO
// ==============================

function excluirProduto(index){

    const confirmar = confirm(
        "Deseja realmente excluir este produto?"
    );

    if(!confirmar){

        return;

    }

    produtos.splice(index,1);

    salvarProdutos();

    carregarTabela();

}

// ==============================
// LIMPAR FORMULÁRIO
// ==============================

function limparFormulario(){

    document.getElementById("nome").value = "";
    document.getElementById("preco").value = "";
    document.getElementById("categoria").value = "";
    document.getElementById("imagem").value = "";

}

// ==============================
// INICIALIZAÇÃO
// ==============================

window.onload = function(){

    carregarTabela();

}