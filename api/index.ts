const express = require('express');
const app = express();
const resend = require('resend');
const Resend = resend.Resend;
require('dotenv').config();

app.use(express.json());

app.get('/', (req, res) => res.send('Express on Vercel!!'));

const rese = new Resend(process.env.RESEND_API_KEY);

app.post('/api/send-email', async (req, res) => {
  const { user_name, user_email, subject, message } = req.body;

  try {
    const data = {
      from: 'no-reply@ramirezsandro.com',
      to: 'ramirezsandro96@gmail.com',
      subject: subject,
      text: `Mensaje de ${user_name}: ${message}`,
    };

    const result = await rese.emails.send(data);

    console.log('Correo enviado con éxito:', result);
    res.status(200).json({ message: 'Email enviado con éxito.' });
  } catch (error) {
    console.error('Error al enviar email:', error);
    res.status(500).json({ message: 'Error al enviar el correo.' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server ready on port ${PORT}.`));

module.exports = app;