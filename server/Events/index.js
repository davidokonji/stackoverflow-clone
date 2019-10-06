import socket from 'socket.io';
import app from '../../index';

const io = socket(app);

io.on('connection', () => {
  console.log('connection made');
});

export default io;
