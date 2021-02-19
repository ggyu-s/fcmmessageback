const express = require("express");
const admin = require("firebase-admin");
const google = require("googleapis");

const app = express();

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: "https:/fcmtest-88df1.firebaseio.com",
});

app.get("/", (req, res) => {
  const scope = [
    "https://www.googleapis.com/auth/cloud-platform",
    "https://www.googleapis.com/auth/cloud-platform.read-only",
    "https://www.googleapis.com/auth/firebase",
    "https://www.googleapis.com/auth/firebase.readonly",
    "https://www.googleapis.com/auth/cloud-platform",
  ];
  function getAccessToken() {
    return new Promise(function (resolve, reject) {
      const key = require("./fcmtest-88df1-firebase-adminsdk-sg0ay-6513ee335e.json");
      const jwtClient = new google.Auth.JWT(
        key.client_email,
        null,
        key.private_key,
        scope,
        null
      );
      jwtClient.authorize(function (err, tokens) {
        if (err) {
          reject(err);
          return;
        }
        resolve(tokens.access_token);
        console.log(tokens.access_token);
      });
    });
  }
  getAccessToken();

  return res.send("success");
});
app.listen(4003, () => {
  console.log("server start");
});
