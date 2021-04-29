let socket = io.connect("http://77.68.112.113/");
const date = new Date();
const profile = [
  "https://www.w3schools.com/w3images/avatar2.png",
  "https://www.w3schools.com/w3images/avatar4.png",
  "https://www.w3schools.com/w3images/avatar3.png",
  "https://www.w3schools.com/w3images/avatar5.png",
  "https://www.w3schools.com/w3images/avatar6.png"
];
const profilePick = profile[Math.floor(Math.random() * profile.length)];
const username = prompt("Enter a Username");

/*document.querySelector("body").innerHTML += `
<p>${username} joined the chat</p>
<sub id="new">${new Date().getHours() + ":" + new Date().getMinutes()}</sub>
<br>
`*/

document.getElementById("app").innerHTML = ` 
<div class="wrapper">
<div class="input-data">
<input type="text" id="text" placeholder="Type Comment" size="50">
<button class="send-btn"><img src="https://static.thenounproject.com/png/1054386-200.png" alt="send-btn"></button>
</div>
</div>`;

document.querySelector("input").addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
        console.log("enter");
      socket.emit('chat', {
          message: document.getElementById("text").value,
          handle: username
      })
      document.getElementById("text").value = "";
    }
  });

  document.querySelector(".send-btn").addEventListener("click", () => {
    socket.emit('chat', {
      message: document.getElementById("text").value,
      handle: username
  })
  document.getElementById("text").value = "";
  })

  if(username){
    socket.emit("add_user", {
      name: username
    })

    socket.emit("unsubscribe", {
      nickName: username
    })
  }

  socket.on("unsubscribe",person => {
    console.log("user leaving");
    var tag = document.createElement("p");
  var secondTag = document.createElement("sub")
  secondTag.id = "new"
  var secondText = document.createTextNode(`${new Date().getHours() + ":" + new Date().getMinutes()}`)
  secondTag.appendChild(secondText)
  document.querySelector("body").appendChild(secondTag);
  var text = document.createTextNode(`${person.nickName} has left the chat`);
   tag.appendChild(text);
   document.querySelector("body").appendChild(tag);
  })

 socket.on("add_user",user => {
  var tag = document.createElement("p");
  var secondTag = document.createElement("sub")
  secondTag.id = "new"
  var secondText = document.createTextNode(`${new Date().getHours() + ":" + new Date().getMinutes()}`)
  secondTag.appendChild(secondText)
  document.querySelector("body").appendChild(secondTag);
  var text = document.createTextNode(`${user.name} has joined the chat`);
   tag.appendChild(text);
   document.querySelector("body").appendChild(tag);
  /*document.querySelector("body").innerHTML += `
  <p>${user.name} joined the chat</p>
  <sub id="new">${new Date().getHours() + ":" + new Date().getMinutes()}</sub>
  <br>
  `*/
 })

  socket.on('chat', (data) => {
    console.log("something")

    if (data.message !== "") {
      const container = document.createElement("div");
      container.className = "container";
      const profileDisplay = document.createElement("img")
      profileDisplay.id = "profilepic";
      profileDisplay.src = `${profilePick}`;
      const nameDisplay = document.createElement("p");
      nameDisplay.style = "color:teal;"
      nameDisplay.innerText = `${data.handle}`;
      const messageDisplay = document.createElement("p");
      messageDisplay.innerText = `${data.message}`;
      const timeDisplay = document.createElement("span");
      timeDisplay.className = "time-right";
      timeDisplay.innerText = `${new Date().getHours() + ":" + new Date().getMinutes()}`;
       document.querySelector("body").appendChild(container);
       container.appendChild(profileDisplay);
       container.appendChild(nameDisplay);
       container.appendChild(messageDisplay);
       container.appendChild(timeDisplay);
       window.scrollTo(0,document.body.scrollHeight);
      }
  })
