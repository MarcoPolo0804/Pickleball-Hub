require('dotenv').config();
const express = require('express');
const { Resend } = require('resend');
const resend = new Resend(process.env.RESEND_API_KEY);
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname)));

app.post('/submit-form', async (req, res) => {
  const { name, phone, email, message } = req.body;

  if (!name || !phone || !email || !message) {
    return res.status(400).send('Please fill in all fields.');
  }

  try {
    const response = await resend.emails.send({
      from: "Pickleball Hub <onboarding@resend.dev>",
      to: "delicanamarc@gmail.com",
      subject: "New Pickleball Court Reservation Request",
      html: `
        <h2>🏓 New Reservation Request</h2>

        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Reservation Details:</strong></p>
        <p>${message}</p>
      `
    });

    console.log("Resend response:", response);

    res.redirect('/thank-you.html');

  } catch (error) {
    console.error("Resend Error:", error);
    res.status(500).send('Failed to send email.');
  }
});


  try {
    await transporter.sendMail(mailOptions);
    res.redirect('/thank-you.html');
  } catch (error) {
    console.error(error);
    res.status(500).send('Failed to send email.');
  }

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
