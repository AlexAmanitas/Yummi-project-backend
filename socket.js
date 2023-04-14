const jwt = require('jsonwebtoken');
const { SECRET_KEY } = process.env;
const User = require('./models/user');

// масив активних встановлених з'єднань [{ userId, socket }]
const userConnections = [];

// ****************************************************************************
// * мідлваре, що перевіряє токен
// *
const validateToken = async (socket, next) => {
  try {
    const token = socket.handshake.auth.token;
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);
    if (!user || !user.token) {
      return;
    }
    socket.user = user;
    next();
  } catch (error) {}
};

// ****************************************************************************
// * обробка нового підключення
// *
const handleConnection = socket => {
  userConnections.push({ userId: String(socket.user._id), socket });

  // видалення з'єднання з масиву при відключенні
  socket.on('disconnect', () => {
    const foundIndex = userConnections.findIndex(
      connection => connection.socket.id === socket.id
    );
    userConnections.splice(foundIndex, 1);
  });
};

// ****************************************************************************
// * функція для відправки повідомлення користувачу
// * (визивати у відповідних контролерах)
// *
const sendMotivation = (userId, payload, timeout = 0) => {
  const id = String(userId);

  setTimeout(() => {
    userConnections.forEach(connection => {
      if (connection.userId === id) {
        connection.socket.emit('motivation', payload);
      }
    });
  }, timeout);
};

module.exports = { handleConnection, sendMotivation, validateToken };
