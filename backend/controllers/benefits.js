var { forEach } = require('../../app/js/constants/benefits/back')

var data = []
forEach((b, id) => {
  data.push(Object.assign({id}, b))
})

exports.list = function(req, res) {
  res.send(data)
}
