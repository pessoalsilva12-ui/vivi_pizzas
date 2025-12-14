const express = require("express");
const bodyParser = require("body-parser");
const twilio = require("twilio");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

app.post("/whatsapp", (req, res) => {
  const msg = req.body.Body?.toLowerCase() || "";
  let resposta = "🍕 *VIVI PIZZAS*\n\nDigite *cardápio* para ver os sabores.";

  if (msg.includes("cardapio")) {
    resposta =
      "🍕 *CARDÁPIO VIVI PIZZAS*\n\n" +
      "1️⃣ Calabresa – R$ 35\n" +
      "2️⃣ Mussarela – R$ 32\n" +
      "3️⃣ Frango c/ Catupiry – R$ 38\n\n" +
      "Digite o número da pizza para pedir.";
  }

  const twiml = new twilio.twiml.MessagingResponse();
  twiml.message(resposta);
  res.type("text/xml").send(twiml.toString());
});

app.listen(3000, () => {
  console.log("🍕 VIVI PIZZAS rodando!");
});
