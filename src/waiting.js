import $ from "jquery";

function waiting(text) {
  var container = document.createElement("div");
  container.classList.add('waiting');
  container.setAttribute("id", "waiting");
  container.innerHTML = `
    <div class="psoload">
      <div class="straight"></div>
      <div class="curve"></div>
      <div class="center"></div>
      <div class="inner"></div>
    </div>
    <h3>${text || 'WAITING FOR OPONENT'}</h3>
  `;

  document.getElementById('root').prepend(container);
}

export const remove = function (){
  $("#waiting").remove();
}

export default waiting;
