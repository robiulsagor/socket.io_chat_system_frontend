const msgContainer = document.querySelector(".right")
const form = document.querySelector(".msg_form")
const lc = window.location.search.split("&")
const username = lc[0].split("=")[1]
const room = lc[1].split("=")[1]

const usersList = document.querySelector(".users")

const socket = io()

socket.emit("join_room", { username, room })

// on receiving a new message
socket.on("message", msg => {
    console.log(msg);

    const div = document.createElement("div")
    div.classList.add("msg")
    div.classList.add(`${msg.type}`)
    div.innerHTML = `
    <div class="info">
            <span class="user">${msg.username} </span>
            <span class="time">${msg.time} </span>
    </div>
    <p class="body">
       ${msg.message}
    </p>
`
    msgContainer.appendChild(div)

    msgContainer.scrollTop = msgContainer.scrollHeight
})

// get users list from backend
socket.on("users", data => {
    console.log(data);
    usersList.innerHTML = ""

    data.forEach(item => {
        const li = document.createElement("li")
        li.innerHTML = item.username
        usersList.appendChild(li)
    })
})

form.addEventListener("submit", e => {
    e.preventDefault()
    const msg = form.elements[0].value
    if (msg != "") {
        socket.emit("chat_msg", msg)
        form.elements[0].value = ""
    } else {
        alert("Please type something before sending...")
    }
})