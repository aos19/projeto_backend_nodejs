import express from "express";
import routes from "./src/routes/postsRoutes.js";

// Criando um array que guardará os posts, estão em chaves pois são grupos que guardam atributos
const posts = [ 
    {
        id: 1,
        descricao: "Uma foto teste",
        imagem: "https://placecats.com/millie/300/150", // Endereço que serve como teste, para a marcar a presença de uma imagem
    },
    {
        id: 2,
        descricao: "Paisagem de montanhas",
        imagem: "https://placecats.com/millie/300/150", // Imagem genérica de teste com gatos
    },
    {
        id: 3,
        descricao: "Nascer do sol na praia",
        imagem: "https://placecats.com/millie/300/150", // Imagem genérica de teste com ursos
    },
    {
        id: 4,
        descricao: "Uma xícara de café quente",
        imagem: "https://placecats.com/millie/300/150", // Imagem genérica de teste com gatos
    },
    {
        id: 5,
        descricao: "Cachoeira no verão",
        imagem: "https://placecats.com/millie/300/150", // Imagem genérica de teste com ursos
    },
    {
        id: 6,
        descricao: "Um carro clássico na estrada",
        imagem: "https://placecats.com/millie/300/150", // Imagem genérica de teste com gatos
    },
];


// Iniciando o servidor na variável app, que guarda a função express
const app = express();

// Diz ao Express para acessar e servir os arquivos dessa pasta 
app.use(express.static("uploads"));

routes(app);

// 3000 é a porta padrão para SERVIDOR LOCAL, será por onde o servidor será solicitado pela rede 
app.listen(3000, () => {
    console.log("Servidor escutando...");
});

// // Definindo a rota do servidor. req = requisição, res = resposta
// app.get("/posts", async (req, res) => {
//     const posts = await getTodosPosts();

//     // 200 é o "OK", requisição bem-sucedida, código de status HTTP indicando o resultado da solicitação ao servidor
//     res.status(200).json(posts);
// });

// Função que buscará os posts pelo seu index no array que construímos
// function buscarPosts(id)
// {
//     return posts.findIndex((post) => {
//         return post.id === Number(id);
//     });
// }

// // Executando a função de buscar um post
// app.get("/posts/:id", (req, res) => {
//     const index = buscarPosts(req.params.id)
//     res.status(200).json(posts[index]);
// });