import io from 'socket.io-client/dist/socket.io';

const socket = io('http://localhost:9000', {jsonp: false});

socket.on('connected', function(data) {
  console.log(data);
});

export default socket;
