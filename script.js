const circles = document.querySelectorAll('.align > div');
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const shadowBtn = document.getElementById('removeShadow')
const removeTitle = document.getElementById('title-align');
let colorIndex = 0;
let intervalId = null;
let boxShadowValue;

window.alert("ATENÇÃO!!!!!!!!!! AO CLICAR NO BOTÃO AS CORES COMEÇARÃO SE ALTERNAR RAPIDAMENTE, SE TIVER EPLEPSIA OU ALGUMA OUTRA CONDIÇÕO SEMELHANTE NÃO CONTINUE ")

function startColorChange() {
  clearInterval(intervalId);
  intervalId = setInterval(changeColors, 50);
}

function stopColorChange() {
  clearInterval(intervalId);
}

function changeColors() {

    removeTitle.style.display="none";
    shadowBtn.style.display="inline"
    

  const colors = ['#00eaff', '#00ffea', '#00ffbb', '#00ff80', '#00ff40', '#51ff00', '#c8ff00', '#eaff00', 
  '#fff700', '#ffd500', '#ffb300', '#ff9100', '#ff6a00', '#ff3700', '#ff1100', '#ff004c', '#ff006f',
   '#ff008c', '#ff00b7', '#ff00dd','#ff00ff', '#e600ff', '#bb00ff', '#9000ff', '#4800ff', '#000dff', '#0044ff',
    '#006aff',];
  const baseColor = colors[colorIndex];
  for(let i = 0; i < circles.length; i++) {
    const opacity = 1 - (i * 0.7);
    const color = `rgba(${hexToRgb(baseColor)}, ${opacity})`;
    if (shadowBtn.dataset.removed === "true") {
        boxShadowValue = "none";
      } else {
        const shadowOpacity = 1 - i * 0.1 * 0.2;
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