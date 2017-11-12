import $ from "jquery";
import socket from './socket';

function createChat(name){
  var chat = document.createElement("div");
  chat.classList.add('chat');

  chat.innerHTML = `
  <div class="messages-container">
    <ul id="messages"></ul>
  </div>

  <div class="input-container">
    <div style="flex-grow: 1; display: flex;">
      <input id="m" autocomplete="off" />
      <button id="btn">Send</button>
    </div>
  </div>`;

  document.body.appendChild(chat);

  return listeners(name);
}

function listeners(name){

  $('#btn').click(function(e){
    e.preventDefault();

    sendMessase(name);
  });

  $('#m').keypress(function(e){
    if(e.keyCode === 13){
      sendMessase(name);
    }
  });

  socket.on('CHAT MESSAGE', function(data){
    $('#messages').append($('<li>').text(data.name+': '+data.text));
  });

  var scroll = () => $('.messages-container').scrollTop($('.messages-container')[0].scrollHeight);
}

const sendMessase = (name) => {
  socket.emit('CHAT MESSAGE', { name: name, text: $('#m').val()});
  $('#m').val('');
  scroll();
}

export default createChat;
