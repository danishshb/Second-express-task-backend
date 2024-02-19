const DB_NAME = "expressjs-project-db";
const DB = `mongodb://127.0.0.1:27017/${DB_NAME}`;
const PORT = 8080;
const SECRET_KEY = "mySecretKey1";
MJ_APIKEY_PUBLIC = "4c8ff387b5316f30e2e0f0886385b3ce";
MJ_APIKEY_PRIVATE = "37dc5608cca4fcf9c9672ca8fb7f1961";

module.exports = {
  DB,
  PORT,
  DB_NAME,
  SECRET_KEY,
  MJ_APIKEY_PUBLIC,
  MJ_APIKEY_PRIVATE,
};
