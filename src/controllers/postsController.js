import {getTodosPosts, criarPost, atualizarPost} from "../models/postsModel.js";
import fs from "fs";
import gerarDescricaoComGemini from "../services/geminiService.js"

export async function listarPosts(req, res)
{
    // Chama a função para buscar todos os posts
    const posts = await getTodosPosts();

    // 200 é o "OK", requisição bem-sucedida, código de status HTTP indicando o resultado da solicitação ao servidor
    res.status(200).json(posts);
};

export async function postarNovoPost(req, res) {
    // Etapa de criação do post, pegando o seu conteúdo
    const novoPost = req.body;
    
    try {
        // Etapa de envio do post
        const postCriado = await criarPost(novoPost)
        res.status(200).json(postCriado);
    } catch(erro) {
        console.error(erro.message);
        // O status 500 é de erro interno no servidor
        res.status(500).json({"Erro":"Falha na requisição"});
    }
}

export async function uploadImagem(req, res) {
    // Criação de um novo post com os dados básicos.
    const novoPost = {
        descricao: "", // Campo para a descrição do post, inicialmente vazio.
        imgUrl: req.file.originalname, // Nome original do arquivo enviado pelo usuário.
        alt: "" // Texto alternativo para a imagem, inicialmente vazio.
    };
    
    try {
        // Insere o novo post no banco de dados e obtém os dados do post criado.
        const postCriado = await criarPost(novoPost);
        // Caminho atualizado para o arquivo no servidor, associando ao ID gerado no banco de dados.
        const imagemAtualizada = `uploads/${postCriado.insertedId}.png`;

        // Renomeia o arquivo na pasta 'uploads' para associá-lo ao ID do post no banco.
        fs.renameSync(req.file.path, imagemAtualizada);

        // Retorna o post criado como resposta com o status 200 (OK).
        res.status(200).json(postCriado);
    } catch (erro) {
        // Loga o erro no console para depuração.
        console.error(erro.message);
        // Retorna uma resposta de erro com status 500 (Erro interno do servidor).
        res.status(500).json({ "Erro": "Falha na requisição" });
    }
}

export async function atualizarNovoPost(req, res) {
    // Obtém o ID do post a ser atualizado a partir dos parâmetros da requisição.
    const id = req.params.id;

    // Define a URL da imagem com base no ID do post.
    const urlImagem = `http://localhost:3000/${id}.png`;
    
    try {
        // Lê o arquivo da imagem associado ao ID do post.
        const imageBuffer = fs.readFileSync(`uploads/${id}.png`);
        // Gera uma descrição para a imagem usando uma API ou função chamada 'gerarDescricaoComGemini'.
        const descricao = await gerarDescricaoComGemini(imageBuffer);
        
        // Cria um objeto representando o post atualizado, incluindo URL, descrição e texto alternativo.
        const post = {
            imgUrl: urlImagem, // URL pública para acessar a imagem.
            descricao: descricao, // Descrição gerada automaticamente para o post.
            alt: req.body.alt // Texto alternativo fornecido pelo usuário.
        };

        // Atualiza o post no banco de dados usando o ID e os novos dados.
        const postCriado = await atualizarPost(id, post);
        // Retorna o post atualizado como resposta com o status 200 (OK).
        res.status(200).json(postCriado);
    } catch (erro) {
        // Loga o erro no console para depuração.
        console.error(erro.message);
        // Retorna uma resposta de erro com status 500 (Erro interno do servidor).
        res.status(500).json({ "Erro": "Falha na requisição" });
    }
}
