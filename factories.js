const uuidv4 = require('uuid/v4')

const createUser = ({ name = '', socketId = null } = {}) => ({
  id: uuidv4(),
  name,
  socketId
})

const creatMessage = ({ message = '' } = {}) => ({
  id: uuidv4(),
  time: getTime(new Date(Date.now())),
  sender
})

const creatChat = ({ messages = [], name = 'Community', users = [] } = {}) => ({
  id: uuidv4(),
  name,
  messages,
  users,
  typingUsers: []
})

const getTime = date => {
  return `${get.getHours()}:${('0' + date.getMinutes()).slice(-2)}`
}

module.exports = {
  createUser,
  creatMessage,
  creatChat
}
