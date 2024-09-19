var intervalId; // Variable to store the interval ID

function playRandomDuration() {
    var minTime = parseInt(document.getElementById('minTimeInput').value, 10);
    var maxTime = parseInt(document.getElementById('maxTimeInput').value, 10);
    var timeLeftInput = document.getElementById('timeLeft');
    var loop = document.getElementById('loop');
    var button = document.getElementById('toggleButton');
    var audio = document.getElementById('song');

    var randomTime = Math.floor(Math.random() * (maxTime - minTime + 1)) + minTime;
    timeLeftInput.value = randomTime;

    // Clear any existing interval
    if (intervalId) {
        clearInterval(intervalId);
    }

    // Start the counter
    intervalId = setInterval(function() {
        if (button.textContent === 'Start') {
            clearInterval(intervalId);
            timeLeftInput.value = 0;
            return;
        }
        if (randomTime > 0) {
            randomTime--;
            timeLeftInput.value = randomTime;
        } else {
            clearInterval(intervalId);
            audio.play();
            if (loop.checked && button.textContent === 'Pause') {
                playRandomDuration();
            }
            else {
                button.textContent = 'Start';
            }
        }
    }, 1000); // Update every second
}

document.getElementById('toggleButton').addEventListener('click', function() {
    var button = document.getElementById('toggleButton');
    var loop = document.getElementById('loop');
    var audio = document.getElementById('song');

    if (button.textContent === 'Start' && loop.checked) {
        button.textContent = 'Pause';
        playRandomDuration();
    }else if (button.textContent === 'Start') { 
        button.textContent = 'Pause';
        audio.play();
    }else {
        button.textContent = 'Start';
        timeLeftInput.value = 0;
        audio.pause();
        clearInterval(intervalId);
    }
});

document.getElementById('song').addEventListener('ended', function() {
    var button = document.getElementById('toggleButton');
    var loop = document.getElementById('loop');
    if (!loop.checked) {
        button.textContent = 'Start';
    }
});