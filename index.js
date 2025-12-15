const express = require("express");
const bodyParser = require("body-parser");
const twilio = require("twilio");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

const PORT = process.env.PORT || 3000;

// Webhook do WhatsApp
app.post("/whatsapp", (req, res) => {
  const msg = req.body.Body?.toLowerCase() || "";
  const twiml = new twilio.twiml.MessagingResponse();

  if (msg.includes("oi") || msg.includes("olá")) {
    twiml.message(
      "🍕 Olá! Seja bem-vindo à *VIVI PIZZAS* 😍\n\n" +
      "Digite:\n" +
      "1️⃣ Cardápio\n" +
      "2️⃣ Fazer pedido\n" +
      "3️⃣ Horário de funcionamento\n" +
      "4️⃣ Formas de pagamento"
    );
  } 
  else if (msg === "1") {
    twiml.message(
      "📋 *Cardápio VIVI PIZZAS*\n\n" +
      "🍕 Calabresa – R$ 35\n" +
      "🍕 Mussarela – R$ 32\n" +
      "🍕 Frango c/ Catupiry – R$ 38\n" +
      "🍕 Portuguesa – R$ 40"
    );
  } 
  else if (msg === "3") {
    twiml.message(
      "🕒 Funcionamos todos os dias\n" +
      "Das 18h às 23h"
    );
  } 
  else if (msg === "4") {
    twiml.message(
      "💳 Formas de pagamento:\n" +
      "Pix\nCartão\nDinheiro"
    );
  } 
  else {
    twiml.message(
      "Não entendi 😅\nDigite *oi* para ver o menu."
    );
  }

  res.type("text/xml");
  res.send(twiml.toString());
});

app.get("/", (req, res) => {
  res.send("🍕 VIVI PIZZAS BOT ONLINE 🍕");
});

app.listen(PORT, () => {
  console.log("Servidor rodando na porta", PORT);
});
