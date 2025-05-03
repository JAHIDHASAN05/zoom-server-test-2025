// server.js
const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const port = 4000;

app.post("/generate-signature", (req, res) => {
  const { meetingNumber, role } = req.body;

  if (!meetingNumber || role === undefined) {
    return res.status(400).json({ error: "Meeting number and role are required" });
  }

  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + 60 * 60; // Signature valid for 1 hour

  const payload = {
    appKey: 'M2N2dSSGS3maDaYS6dWbRQ',
    mn: meetingNumber,
    role: role,
    iat: iat,
    exp: exp,
    tokenExp: exp,
  };

  const signature = jwt.sign(payload, '0GP8LC59M1VU10dQQj3Q6h8QPyVa8YBH', { algorithm: "HS256" });

  return res.json({ signature });
});

app.listen(port, () => {
  console.log(`Zoom Signature backend running on http://localhost:${port}`);
});
