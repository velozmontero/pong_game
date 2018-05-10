import io from 'socket.io-client/dist/socket.io';

// const socket = io('http://localhost:9000', {jsonp: false}); 

const socket = io('http://10.1.1.108:9000', { jsonp: false }); // School

// const socket = io('http://10.1.10.244:9000', { jsonp: false }); // Work

socket.on('connected', function(data) {
  console.log(data);
});

export default socket;