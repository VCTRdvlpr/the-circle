const circleScale = [
  document.querySelector('.circle01'),
  document.querySelector('.circle02'),
  document.querySelector('.circle03'),
  document.querySelector('.circle04'),
  document.querySelector('.circle05'),
  document.querySelector('.circle06')
]; 
const circles = document.querySelectorAll('.align > .circle');
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const shadowBtn = document.getElementById('removeShadow');
const scaleBtn = document.getElementById('scaleChange');
const scaleStopBtn = document.getElementById('scaleStopBtn');
const scaleTransform = document.querySelector('.scaleTransform > div');
let colorIndex = 0;
let intervalId = null;
let scaleId = null;
let boxShadowValue;
let isScaled = false;

window.alert("ATENÇÃO!!!!!!!!!! AO CLICAR NO BOTÃO AS CORES COMEÇARÃO SE ALTERNAR RAPIDAMENTE, SE TIVER EPLEPSIA OU ALGUMA OUTRA CONDIÇÕO SEMELHANTE NÃO CONTINUE ")

function startColorChange() {
  clearInterval(intervalId);
  intervalId = setInterval(changeColors, 50);  
}

function startChangeScale(){
  scaleId = setInterval(changeScale, 150);
  scaleBtn.style.display = 'none';
}

function stopColorChange() {
  clearInterval(intervalId);      
  startBtn.style.display = 'inline';
}

function stopScale(){
  clearInterval(scaleId);
  scaleBtn.style.display = 'inline';  
}

function changeScale() {    

  if (isScaled) {
    isScaled = false;
  } else {
    isScaled = true;
  }
  
  circleScale.forEach((circle, index) => {
    const scale = isScaled ? 1.1 : 1;
    const delay = index * 50;
    setTimeout(() => {
      circle.style.transform = `scale(${scale})`;
    }, delay);
  });
}

function changeColors() {            
  
  startBtn.style.display = 'none';
  
  const colors = ['#00eaff', '#00ffea', '#00ffbb', '#00ff80', '#00ff40', '#15ff00', '#51ff00', '#95ff00', '#84ff00',
  '#c8ff00', '#eaff00','#fff700', '#ffd500', '#ffb300', '#ff9100', '#ff6a00', '#ff3700', '#ff2a00', '#ff1100', '#ff0019', '#ff002f',
   '#ff004c','#ff006f','#ff008c', '#ff00b7', '#ff00dd','#ff00ff', '#e600ff', '#bb00ff', '#9000ff', '#4800ff', '#0800ff', '#000dff', '#0044ff',
    '#006aff', '#00a2ff', '#00d5ff'];
  const baseColor = colors[colorIndex];
  for(let i = 0; i < circles.length; i++) {
    const opacity = 0.7 - (i * 1);
    const color = `rgba(${hexToRgb(baseColor)}, ${opacity})`;
    if (shadowBtn.dataset.removed === "true") {
        boxShadowValue = "none";
      } else {
        const shadowOpacity = 1 - (i * 0.1 );
        const shadowColor = `rgba(${hexToRgb(baseColor)}, ${shadowOpacity})`;
        boxShadowValue = `inset 0px 0px 100px ${shadowColor}`;
      }
      circles[i].style.backgroundColor = color;
      circles[i].style.boxShadow = boxShadowValue;
  }
  colorIndex = (colorIndex + 1) % colors.length;  
}

function removeShadow() {
    shadowBtn.dataset.removed = shadowBtn.dataset.removed === "true" ? "false" : "true";
}

function hexToRgb(hex) {
  const r = parseInt(hex.slice(1,3), 16);
  const g = parseInt(hex.slice(3,5), 16);
  const b = parseInt(hex.slice(5,7), 16);
  return `${r}, ${g}, ${b}`;
}

startBtn.addEventListener('click', startColorChange);
stopBtn.addEventListener('click', stopColorChange);
shadowBtn.addEventListener('click', removeShadow);
scaleBtn.addEventListener('click', startChangeScale);
scaleStopBtn.addEventListener('click', stopScale);