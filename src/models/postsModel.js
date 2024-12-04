// Garantindo que o módulo dotenv npm será usado
import 'dotenv/config';

import { ObjectId } from "mongodb";
import conectarAoBanco from "../config/dbConfig.js";

// Conecta ao banco de dados utilizando a string de conexão fornecida como variável de ambiente
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

export async function getTodosPosts()
{
    // Seleciona o banco de dados "Imersão-InstaBytes"
    const db = conexao.db("Imersão-InstaBytes");

    // Seleciona a coleção "posts" dentro do banco de dados
    const colecao = db.collection("posts");

    // Retorna um array com todos os documentos da coleção 
    return colecao.find().toArray();
}

export async function criarPost(novoPost) {
    const db = conexao.db("Imersão-InstaBytes");
    const colecao = db.collection("posts");
    return colecao.insertOne(novoPost)
} 

export async function atualizarPost(id, novoPost) {
    const db = conexao.db("Imersão-InstaBytes");
    const colecao = db.collection("posts");
    
    // Guardamos nesse objeto o id que queremos atualizar que o Mongo impôs (seguindo documentação)
    const objID = ObjectId.createFromHexString(id); 

    return colecao.updateOne({_id: new ObjectId(objID)}, {$set:novoPost});
} 