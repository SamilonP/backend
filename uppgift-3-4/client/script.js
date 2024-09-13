let startTime, endTime, reactionTime;

function getRandomTime() {
    return Math.random() * 4000 + 1000;
}

function showBox() {
    const box = document.getElementById('box');
    box.style.left = Math.random() * (window.innerWidth - 150) + 'px'
    box.style.top = Math.random() * (window.innerHeight - 150) + 'px'
    box.style.display = 'block';
    startTime = new Date().getTime();
}

function startGame() {
    const box = document.getElementById('box');
    const message = document.getElementById('message');
    document.getElementById('playAgain').style.display = 'none';
    document.getElementById('start').style.display = 'none';
    document.getElementById('message').textContent = '';
    document.getElementById('result').textContent = ``;
    document.getElementById('save').style.display = 'none'
    box.style.display = 'none';
    message.textContent = 'Wait for the ghost to appear...';

    if (document.getElementById("nah") != null) {
      document.getElementById("nah").textContent = ""
    }

    const randomTime = getRandomTime();
    setTimeout(() => {
        message.textContent = 'Click the ghost!';
        showBox();
    }, randomTime);
}

document.getElementById('startButton').addEventListener('click', startGame);
document.getElementById('playAgain').addEventListener('click', startGame);

document.getElementById('box').addEventListener('click', () => {
    endTime = new Date().getTime();
    reactionTime = (endTime - startTime) / 1000;
    document.getElementById('playAgain').style.display = 'flex';
    document.getElementById('save').style.display = 'flex';
    document.getElementById('box').style.display = 'none';
    document.getElementById('message').textContent = 'Great job!';
    document.getElementById('result').textContent = `Your reaction time is ${reactionTime} seconds.`;
});

document.getElementById('save').addEventListener('click', () => {
    document.getElementById('save').style.display = 'none'
    FetchData()
})

function FetchData() {
    fetch("/highscore", {
        method: "post",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      
        body: JSON.stringify({
          name: document.getElementById('name').value,
          score: reactionTime
        })
      })
      .then( (response) => { 
         return response.json()
      }).then (data=>{
        console.log(data)
        if (data.msg != "highscore saved") {
          document.getElementById("nah").textContent = "Current score cannot replace current highscore due to current score being too low. Curret highscore is: " + data.msg + " seconds"
        }
        else if (data.msg == "highscore saved") {
          document.getElementById("nah").textContent = "Highscore saved!"
        }
      })
}