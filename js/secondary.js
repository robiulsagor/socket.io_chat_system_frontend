const form = document.querySelector(".form_1")
const join_btn = document.querySelector(".join_chat")
join_btn.disabled = true

form.elements[0].addEventListener("keyup", () => {
    checkValid()
})
form.elements[1].addEventListener("change", () => {
    checkValid()
})

const checkValid = () => {
    const input = form.elements[0].value
    const room = form.elements[1].value
    if (input !== "" && room !== "") {
        join_btn.disabled = false
    }

}
