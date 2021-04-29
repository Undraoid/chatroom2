const date = new Date();
const profile = [
  "https://www.w3schools.com/w3images/avatar2.png",
  "https://www.w3schools.com/w3images/avatar4.png",
  "https://www.w3schools.com/w3images/avatar3.png",
  "https://www.w3schools.com/w3images/avatar5.png",
  "https://www.w3schools.com/w3images/avatar6.png"
];
const username = prompt("Enter a Username");

document.querySelector("body").innerHTML += `
<p>${username} joined the chat</p>
<sub id="new">${date.getHours() + ":" + date.getMinutes()}</sub>
<br>
`

function clicked() {
  let comment = document.getElementById("text").value;
  if (comment !== "") {
    document.querySelector("body").innerHTML += `
 <img src="${profile[Math.floor(Math.random() * profile.length)]}" width="40px">
 <sub>${username}</sub> 
 <sup>${date.getHours() + ":" + date.getMinutes()}</sup>
  <h3>${comment}</h3>
  `;
  }
  comment = "";
  document.querySelector("input").addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
      clicked();
    }
  });
}

document.getElementById("app").innerHTML = ` 
<div class="wrapper">
<div class="input-data">
<input type="text" id="text" placeholder="Type Comment" size="50">
</div>
</div>`;

document.querySelector("input").addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
      clicked();
    }
  });