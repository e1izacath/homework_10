const wsUrl = "wss://echo-ws-service.herokuapp.com";

const infoOutput = document.querySelector(".info_output");
const chatOutput = document.querySelector(".chat_output");
const input = document.querySelector("input");
const sendBtn = document.querySelector(".btn_send");
const sendGeo = document.querySelector(".btn_geo"); 

let socket = new WebSocket(wsUrl);
let mapLink;


function pageLoaded() {     
  
  socket.onopen = () => {
    infoOutput.innerText = "Соединение установлено";
  }   
  
  socket.onmessage = (event) => {
    writeToChat(event.data, "get");
    console.log(event.data);
  }

  socket.onerror = () => {
    infoOutput.innerText = "При передаче данных произошла ошибка";
  }
  
  sendBtn.addEventListener("click", sendMessage);
  
  function sendMessage() {
    const inpMes = input.value;
    if (!input.value) return;
    socket.send(inpMes);
    writeToChat(inpMes, "sent");
    console.log(inpMes);
    input.value === "";
  }
  
  function writeToChat(message, dir) {
    let mess = document.createElement("p");
    if (dir !="geo") {
      mess.innerHTML = message;
    } else {
      mess = message; 
    }   
    mess.className = dir + " mess";
      console.log(message);
      console.log(mess);
      chatOutput.append(mess); 
    }    
  


  sendGeo.addEventListener('click', () => {  
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function(position){
        const { coords } = position;
        console.log(coords.latitude, coords.longitude);       
        mapLink = document.createElement("a");
        mapLink.href = `https://www.openstreetmap.org/#map=18/${coords.latitude}/${coords.longitude}`;
        mapLink.textContent = 'Geolocation';
        writeToChat(mapLink, "geo");
      });
    }       
  });
}


document.addEventListener("DOMContentLoaded", pageLoaded);