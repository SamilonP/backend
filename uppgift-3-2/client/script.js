let cookieValue = document.querySelector("#cookieValue")
let cookieName = document.querySelector("#cookieName")

function ClickSubmit() {
    document.cookie = cookieName.value + "=" + cookieValue.value
    console.log(document.cookie)
}