import express from "express"; 
import multer from "multer";
import { listarPosts, postarNovoPost, uploadImagem, atualizarNovoPost } from "../controllers/postsController.js";
import cors from "cors";

// Objeto de opções para o cors
const corsOptions = {
    origin: "http://localhost:8000",
    optionsSuccessStatus: 200
} 

// Configurações de imagens relativa ao Windows
const storage = multer.diskStorage({
    // Define o diretório onde os arquivos serão salvos
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Salva os arquivos na pasta 'uploads/'
    },
    // Define o nome do arquivo salvo no servidor
    filename: function (req, file, cb) {
        cb(null, file.originalname);  // Usa o nome original do arquivo como nome salvo
    }
})

// Função que vai manejar os arquivos no sistema, criação automática da pasta "/.uploads" 
const upload = multer({dest: "./uploads", storage})
// Configura o destino padrão para './uploads' e utiliza as configurações de 'storage'.


// Se fosse linux ou MAC
// const upload = multer.({dest: "./uploads"});


const routes = (app) => {
    // Middleware que permite o express converter o texto da requisição em json
    app.use(express.json());

    app.use(cors(corsOptions));
    
    // Rota para recuperar uma lista de todos os posts. req = requisição, res = resposta
    app.get("/posts", listarPosts);
    
    // Rota para criar um novo post 
    app.post("/posts", postarNovoPost) // Chamando a função que cria posts

    // Rota de upload de imagens (assumindo uma única imagem chamada "imagem")
    app.post("/upload", upload.single("imagem"), uploadImagem) // Chama a função que vai processar a imagem

    // Terceiro verbo CRUD, atualizar algo
    app.put("/upload/:id", atualizarNovoPost);
}

export default routes;