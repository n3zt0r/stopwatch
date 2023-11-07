const stopwatch = document.getElementById('stopwatch');
const flags = document.getElementById('flags');
const playButton = document.getElementById('play-button');
const flagButton = document.getElementById('flag-button');
playButton.innerHTML = playIcon;

let intervalID, time, timeStart;
let flagID = timeElapsed = timeEnd = 0;

function play() {
  intervalID = setInterval(playTime, 10);
  
  playButton.setAttribute('onclick', 'pause()');
  playButton.innerHTML = pauseIcon;
  
  flagButton.setAttribute('onclick', 'flag()');
  flagButton.innerHTML = flagIcon;
  flagButton.removeAttribute('hidden');
};

function pause() {
  clearInterval(intervalID);
  
  playButton.setAttribute('onclick', 'play()');
  playButton.innerHTML = playIcon;
  
  flagButton.setAttribute('onclick', 'stop()');
  flagButton.innerHTML = stopIcon;
};

function flag() {
  timeStart = timeEnd;
  timeEnd = timeElapsed;
  const timeResult = createTime(timeEnd - timeStart);
  
  const node = document.createElement('p');
  node.innerHTML = `<span class='gray'
  >${(++flagID).toString().padStart(2, '0')}</span> <span class='gray'>+ ${timeResult}</span> <span>${time}</span>`;
  flags.prepend(node);
  
  stopwatch.setAttribute('class', 'flaged');
};

function stop() {
  flagID = timeElapsed = timeEnd = 0;
  stopwatch.innerText = '00:00:00';
  flags.innerHTML = '';
  flagButton.setAttribute('hidden', 'hidden');
  
  stopwatch.removeAttribute('class');
};

function playTime() {
  timeElapsed++;
  
  time = createTime(timeElapsed);
  stopwatch.innerText = time;
};

function createTime(timeElapsed) {
  const timeSet = Math.floor(timeElapsed / 100);
  const milliseconds = timeElapsed % 100;
  const seconds = timeSet < 60 ? timeSet : timeSet % 60;
  const minutes = Math.floor(timeSet / 60);
  
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`;
}