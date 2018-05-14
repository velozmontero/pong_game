import $ from "jquery";
import socket from './socket';

function Chat(name){
  if ($("#chat").length) {
    return;
  }

  // $('#chat').remove();
  // socket.removeListener('CHAT MESSAGE', chatMessage);

  var container = document.createElement("div");
  container.classList.add("chat", "chat-hide");
  container.setAttribute("id", "chat");
  
  container.innerHTML = `
  <div id="chat-header" class="chat-header">
    <i id="chat-close" class="icon ion-close-round"></i>
  </div>
  
  <div class="messages-container">
    <ul id="messages"></ul>
  </div>

  <div class="input-container">
    <div style="flex-grow: 1; display: flex;">
      <input type="text" id="message-input" autocomplete="off" />
      <button id="btn">Send</button>
    </div>
  </div>`;

  document.getElementById('root').appendChild(container);

  return listeners(name);
}

function listeners(name) {

  $('#btn').click(function(e){
    e.preventDefault();

    sendMessage(name);
  });

  $('#chat-close').click(function (e) {
    e.stopPropagation();

    console.log('hide');

    $('#chat').addClass('chat-hide');
  });

  $('#chat-header').click(function (e) {
    console.log('show');

    $('#chat').removeClass('chat-hide');
  });

  $('#message-input').keypress(function(e){
    if(e.keyCode === 13){
      sendMessage(name);
    }
  });

  socket.on('CHAT MESSAGE', chatMessage);

}

const chatMessage = data => {
  $('#messages').append($('<li>').text(data.name + ': ' + data.text));
  scroll();
}

const scroll = () => $('.messages-container').scrollTop($('.messages-container')[0].scrollHeight);

const sendMessage = (name) => {
  if ($('#message-input').val()) {
    socket.emit('CHAT MESSAGE', { 
      name: name, 
      text: $('#message-input').val() 
    });

    $('#message-input').val('');

    scroll();
  }
}

export default Chat;
