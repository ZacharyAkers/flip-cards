const crypto = require("crypto");

function hashPassword(passwordinput){
  let config = {
    salt: function(length){
      return crypto.randomBytes(Math.ceil(32 * 3 / 4)).toString('base64').slice(0, length);
    },
    iterations: 20000,
    keylen: 512,
    digest: 'sha512'
  };

  let salt = config.salt(32);
  let hash = crypto.pbkdf2Sync(passwordinput, salt, config.iterations, config.keylen, config.digest).toString('base64');

  return {salt: salt, hash: hash, iterations: config.iterations};
}

function compare(savedPass, passwordAttempt) {
  let config = {
    keylen:512,
    digest:"sha512"
  };

  let attemptHash = crypto.pbkdf2Sync(passwordAttempt, savedPass.salt, savedPass.iterations, config.keylen, config.digest).toString("base64");

  return savedPass.hash === attemptHash;
}

module.exports = {
  hash: hashPassword,
  compare: compare
};