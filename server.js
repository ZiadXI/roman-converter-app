import express from 'express';
const app = express();
import { fileURLToPath } from 'url';
app.use(express.json());

import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.urlencoded({ extended: true })); 
app.use(express.static(path.join(__dirname, 'public')));
function romanToInt(s) {
  const mp = {
    "I": 1,
    "V": 5,
    "X": 10,
    "L": 50,
    "C": 100,
    "D": 500,
    "M": 1000
  };

  let ans = 0;

  for (let i = 0; i < s.length; i++) {
    const curr = mp[s[i]];
    const next = mp[s[i + 1]];

    if (curr >= next || i === s.length - 1) {
      ans += curr;
    } else {
      ans -= curr;
    }
  }

  return ans;
}
let conversionHistory = [];

app.post('/convert', (req, res) => {
  const roman = req.body.number.toUpperCase();
  const result = romanToInt(roman);
  conversionHistory.push({ input: roman, output: result });
  res.send(`<h1>Result: ${result}</h1>`);
});




app.get('/conversations', (req, res) => {
  let html = '<h1>Conversion History</h1>';
  conversionHistory.forEach((entry, i) => {
    html += `<p><strong>${i + 1})</strong> ${entry.input} → ${entry.output}</p>`;
  });
  html += '<br><a href="/">Back to form</a>';
  res.send(html);
});



app.listen(1000,()=>console.log('Server is running on port 1000'));