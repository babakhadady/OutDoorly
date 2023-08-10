const { google } = require("googleapis");
const { decodeJWT } = require("./jwt");
require("dotenv").config();

let GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
let GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

// // Initialize Google OAuth Client with required params
// const oauth2Client = new google.auth.OAuth2(
//   GOOGLE_CLIENT_ID,
//   GOOGLE_CLIENT_SECRET,
//   "http://localhost:3000/callback/"
// );

// Initialize Google OAuth Client with required params
const oauth2Client = new google.auth.OAuth2(
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  process.env.CALLBACK
);

// Generates a URL that asks permission to use/access user's email and profile
function getGoogleAuthURL() {
  const scopes = [
    "https://www.googleapis.com/auth/userinfo.profile",
    "https://www.googleapis.com/auth/userinfo.email",
  ];

  const instance = oauth2Client.generateAuthUrl({
    access_type: "offline",
    prompt: "consent",
    scope: scopes,
  });

  return instance
}

// Authentication Middleware - Takes JWT Token in Header and authenticates
const authenticate = async (req, res, next) => {
  const bearer = req.headers.authorization;
  const token = decodeJWT(bearer.split(" ")[1]);
  req.user = {};
  req.user.id = token.email;
  next();
};
module.exports = {
  getGoogleAuthURL: getGoogleAuthURL,
  oauth2Client: oauth2Client,
  authenticate: authenticate,
};
