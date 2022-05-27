const bcryptjs = require("bcryptjs")

function hash(password) {
  return bcryptjs.hashSync(password, 10)
}

function compare(password, hash) {
  return bcryptjs.compareSync(password, hash)
}

module.exports = { hash, compare }