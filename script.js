// ===== Floating Background Elements: Numbers, Robots, Formulas =====
const floatingBg = document.querySelector('.floating-background');
const elements = [
  '1','2','3','4','5','6','7','8','9','0',
  'π','√','Σ','∑','∞','x²','y²','🤖','🧮','➗','✖'
];

// Generate 50 floating elements
for(let i=0;i<50;i++){
  const span=document.createElement('span');
  span.textContent=elements[Math.floor(Math.random()*elements.length)];
  span.style.left=Math.random()*100+'vw';
  span.style.fontSize=(Math.random()*25+15)+'px';
  span.style.animationDuration=(Math.random()*15+8)+'s';
  span.style.opacity=Math.random();
  floatingBg.appendChild(span);
}

// ===== Game Logic =====
function showGame(){
  document.getElementById("instructions").style.display="none";
  document.getElementById("gameScreen").style.display="block";
}

let N,D,magic;
let prediction=0;
let count=0;
let actualSum=0;
let firstInput=true;

function startGame(){
  N=parseInt(document.getElementById("total").value);
  D=parseInt(document.getElementById("digits").value);
  if(N<=0||D<=0){alert("Please enter valid numbers."); return;}
  magic=Math.pow(10,D)-1;
  count=0; actualSum=0; firstInput=true;
  document.getElementById("numbersHistory").innerHTML="";
  document.getElementById("flipCardInner").classList.remove('flipped');
  document.getElementById("prediction").innerText="0";
  document.getElementById("game").style.display="block";
}

function submitNum(){
  if(count>=N) return;
  let user=parseInt(document.getElementById("userNum").value);
  if(isNaN(user)) return;
  if(user.toString().length>D){alert(`Number cannot exceed ${D} digits.`); return;}

  if(firstInput){
    actualSum+=user; count++; firstInput=false;
    prediction=N%2===0?user+(N/2)*magic:user+((N-1)/2)*magic;
    addNumberCard(`You: ${user}`);
  }else{
    let comp=magic-user;
    actualSum+=user+comp; count+=2;
    addNumberCard(`You: ${user} → Computer: ${comp}`);
  }
  document.getElementById("count").innerText=count;
  document.getElementById("userNum").value="";
  if(count>=N) addNumberCard(`🎉 Final Sum: ${actualSum}`);
}

function addNumberCard(text){
  const card=document.createElement('div');
  card.className='number-card';
  card.innerText=text;
  document.getElementById('numbersHistory').appendChild(card);
}

function revealPrediction(){
  document.getElementById('prediction').innerText=prediction;
  document.getElementById('flipCardInner').classList.toggle('flipped');
}
