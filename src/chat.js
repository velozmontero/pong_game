import $ from "jquery";
import socket from './socket';

function createChat(){
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
}

export const listeners = function(){

  $('#btn').click(function(e){
    e.preventDefault();

    sendMessase();
  });

  $('#m').keypress(function(e){
    if(e.keyCode === 13){
      sendMessase();
    }
  });

  socket.on('chat message', function(msg){
    $('#messages').append($('<li>').text(msg));
  });

  var scroll = () => $('.messages-container').scrollTop($('.messages-container')[0].scrollHeight);
}

const sendMessase = () => {
  socket.emit('chat message', $('#m').val());
  $('#m').val('');
  scroll();
}

export default createChat;
