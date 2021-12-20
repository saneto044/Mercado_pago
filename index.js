const express = require('express');
const MercadoPago = require('mercadopago');
const app = express();

MercadoPago.configure({
    sandbox:true,
    access_token:'TEST-4495770139557126-121919-7f27dd6e9353299e89681c812d0bd160-162145585'
})

app.get('/' , (req,res) => {
    res.send("Olá mundo")
})

app.get('/pagar',async (req,res) => {

    var id = '' + Date.now();
    var emailDoPagador = "victor@gmail.com"

    var dados ={
        items:[
            item ={
                id:id,
                description:"2x video games; 3x camisas",
                quantity:1,
                currency_id:'BRL',
                unit_price:parseFloat(150)
            }
        ],
        payer:{
            email:emailDoPagador
        },
        external_reference:id
    }

    try {
        var pagamento = await MercadoPago.preferences.create(dados)
        console.log(pagamento);
        //Banco.SalvarPagamento({id:id , pagador :emailDoPagador})
        return res.redirect(pagamento.body.init_point);
    }catch(err){
        return res.send(err.message)    
    }
 
})


app.listen(3000,(req,res) => {
    console.log("Servidor esta ok !!!!!")
})