const express = require("express");
const api = express();
const bodyParser = require("body-parser");
const res = require("express/lib/response");

api.use(bodyParser.urlencoded({extended:false}));
api.use(bodyParser.json());

let DB = {
    games: [
        {
            id : 1,
            title : "Forza",
            year : 2014,
            price : 250

        },
        {
            id : 2,
            title : "Valorant",
            year : 2020,
            price : 0

        },
        {
            id : 3,
            title : "Minecraft",
            year : 2005,
            price : 80

        }
    ]
}
// LISTAGEM DE TODOS OS GAMES
api.get("/games",(req,res)=>{
    res.statusCode = 200;
    res.json(DB.games);

});
// ENCONTRAR GAME PELO ID 
api.get("/game/:id",(req,res)=>{
    if(isNaN(req.params.id)){
        res.sendStatus(400);
    }else{
        let id = parseInt(req.params.id);
        let game = DB.games.find(g => g.id == id);

        if(game != undefined){
            res.statusCode = 200;
            res.json(game);
        }else{
            res.sendStatus(404);
        }
    }

})
//CRIAR NOVO JOGO -> CADSTRO
api.post("/game",(req,res)=>{
    let {title ,price, year} = req.body;
// NA VIDA REAL CRIAR IF´S PARA VALIDAÇÃO DE DADOS E RETORNAR STATUS CODE.

    DB.games.push({
        id : 4,
        title,
        price,
        year 
    });

    res.sendStatus(200);

})
// DELETAR UM JOGO 
api.delete("/game/:id",(req,res)=>{
    if(isNaN(req.params.id)){
        res.sendStatus(400);
    }else{
        let id = parseInt(req.params.id);
        let index = DB.games.findIndex(g => g.id == id);

        if(index == -1){
            res.sendStatus(404);
        }else{
            DB.games.splice(index,1);
            res.sendStatus(200);
        }
    }

});

//EDITAR UM JOGO
api.put("/game/:id",(req,res)=>{
    if(isNaN(req.params.id)){
        res.sendStatus(400);
    }else{
        let id = parseInt(req.params.id);
        let game = DB.games.find(g => g.id == id);

        if(game != undefined){
           let { title, price , year} = req.body;

           if(title != undefined){
                game.title = title;

                // AQUI DENTRO DA PARA POR AS VALIDAÇÕES E TALS
           }
           if(price != undefined){
               game.price = price;
           }
           if(year != undefined){
               game.year = year;
           }

           res.sendStatus(200);

        }else{
            res.sendStatus(404);
        }
    }


});




api.listen(200,()=>{
    console.log("Api On");
})