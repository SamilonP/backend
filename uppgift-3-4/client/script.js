let cookieValue = document.getElementById("username")

function SubmitScore() {
    document.cookie = "name=" + cookieValue.value
}