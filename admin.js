const SUPABASE_URL = "https://enzcxrxvllzybdildypc.supabase.co";
const SUPABASE_KEY = "sb_publishable_BNCor3Ox8vbZstcZQ4Y-Fw_JVKfsSIa";

const { createClient } = supabase;
const client = createClient(SUPABASE_URL, SUPABASE_KEY);

let Produtos = [];

async function carregarTabela() {

    const tabela = document.getElementById("listaProdutos");
    tabela.innerHTML = `<tr><td colspan="5" style="text-align:center;">Carregando...</td></tr>`;

    const { data, error } = await client
        .from("Produtos")
        .select("*")
        .order("nome", { ascending: true });

    if (error) {
        console.error(error);
        return;
    }

    Produtos = data || [];

    tabela.innerHTML = "";

    Produtos.forEach((Produto, index) => {

        tabela.innerHTML += `
        <tr>
            <td>
                <img src="${Produto.imagem || 'https://placehold.co/70x70?text=Sem+Foto'}"width="70"
                onerror="this.src='https://placehold.co/70x70?text=Sem+Foto'">
            </td>

            <td>${Produto.nome}</td>

            <td>R$ ${Number(Produto.preco).toFixed(2)}</td>

            <td>${Produto.categoria}</td>

            <td>
                <button onclick="editarProduto('${Produto.id}', ${index})">
                    Editar
                </button>

                <button onclick="excluirProduto('${Produto.id}')">
                    Excluir
                </button>
            </td>
        </tr>`;

    });

}

async function cadastrarProduto() {

    const nome = document.getElementById("nome").value.trim();
    const preco = document.getElementById("preco").value;
    const categoria = document.getElementById("categoria").value;
    const arquivoInput = document.getElementById("arquivoimagem");
    const arquivo = arquivoInput.files[0];

    if (!nome || !preco || !categoria || !arquivo) {

        alert("Preencha todos os campos.");
        return;

    }

    const nomeArquivo = `${Date.now()}_${arquivo.name}`
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/\s+/g, "_")
        .replace(/[^a-zA-Z0-9._-]/g, "");

    const { data: uploadData, error: uploadError } =
        await client.storage
            .from("pijamas")
            .upload(nomeArquivo, arquivo);

    if (uploadError) {

        alert("Erro no upload: " + uploadError.message);
        return;

    }

    const { data: urlData } = client.storage
        .from("pijamas")
        .getPublicUrl(uploadData.path);

    const publicUrl = urlData.publicUrl;

    const { error: insertError } = await client
        .from("Produtos")
        .insert([{
            nome: nome,
            preco: Number(preco),
            categoria: categoria,
            imagem: publicUrl,
            estoque: 0,
            ativo: true
        }]);

    if (insertError) {

        alert("Erro ao salvar: " + insertError.message);
        return;

    }

    alert("Produto cadastrado com sucesso!");

    document.getElementById("nome").value = "";
    document.getElementById("preco").value = "";
    document.getElementById("categoria").value = "";
    arquivoInput.value = "";

    carregarTabela();

}

async function excluirProduto(id) {

    if (!confirm("Deseja excluir este produto?")) return;

    await client
        .from("Produtos")
        .delete()
        .eq("id", id);

    carregarTabela();

}

function editarProduto(id, index) {

    const p = Produtos[index];

    document.getElementById("nome").value = p.nome;
    document.getElementById("preco").value = p.preco;
    document.getElementById("categoria").value = p.categoria;

    alert("Função de atualização ainda não implementada.");

}

window.onload = carregarTabela;