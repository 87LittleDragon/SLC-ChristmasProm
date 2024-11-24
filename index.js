const express = require("express");
const { google } = require("googleapis");
const { each } = require("jquery");
const path = require('path');
const fs = require('fs')

let ticketNumber = 0;
let reapeated = false

const app = express();
app.set("view engine", "ejs");
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.sendFile(__dirname +'/public/info.html');
});

app.post("/ticket.html", async (req, res) => {
  const { firstName, lastName, Class, email } = req.body;

  const auth = new google.auth.GoogleAuth({
    keyFile: "credentials.json",
    scopes: "https://www.googleapis.com/auth/spreadsheets",
  });

  // Create client instance for auth
  const client = await auth.getClient();

  // Instance of Google Sheets API
  const googleSheets = google.sheets({ version: "v4", auth: client });

  const spreadsheetId = "1HAALgffcFwv0f-3yrGn7_yw4u-3Fj7iUBJRY4IRQoAs";

  // Get metadata about spreadsheet
  const metaData = await googleSheets.spreadsheets.get({
    auth,
    spreadsheetId,
  });

  // Read rows from spreadsheet
  const getRows = await googleSheets.spreadsheets.values.get({
    auth,
    spreadsheetId,
    range: "Sheet1!A:E",
  });
  // console.log(getRows.data.values);
  reapeated = false
  getRows.data.values.forEach((item) => {
    if (item[3] === email){
      reapeated = true
      // console.log(email)
      // console.log('repeat')
      }
    // console.log(item[3])
  })
  let values = [firstName, lastName, Class, email, 'FALSE']
  
  if(!reapeated){
    // Write row(s) to spreadsheet
    await googleSheets.spreadsheets.values.append({
      auth,
      spreadsheetId,
      range: "Sheet1!A:B",
      valueInputOption: "USER_ENTERED",
      resource: {
        values: [values],
      },
    });

    ticketNumber = getRows.data.values.length
    // console.log(values)
    // console.log(ticketNumber)
  }
  // console.log(reapeated)
  res.sendFile(__dirname+"/public/submitted.html");
});

app.get('/ticketNumber',(req,res)=>{
  res.send(('000' + ticketNumber).substr(-3))
})
app.get('/successq',(req,res)=>{
  res.send(reapeated)
})


// const https = require('https')

// const sslServer = https.createServer({
//   key: fs.readFileSync(__dirname + "/keys/domain.key"),
//   cert: fs.readFileSync(__dirname + "/keys/chained.pem")
// },app)

// sslServer.listen(443, () => console.log('Secure server on port 443'))
app.listen(80,() => console.log('server on port 80'))
