if("/quick-quiz/game.html"===window.location.pathname){const e=document.getElementById("question"),t=Array.from(document.getElementsByClassName("choice-text")),n=document.getElementById("progressText"),o=document.getElementById("score"),s=document.getElementById("progressBarFull"),c=document.getElementById("counter"),r=document.getElementById("loader"),a=document.getElementById("game");let i={},l=!1,m=0,d=0,g=[],u=[];fetch("//opentdb.com/api.php?amount=50&category=9&difficulty=easy&type=multiple").then(e=>e.json()).then(e=>{u=e.results.map(e=>{const t={question:e.question},n=[...e.incorrect_answers];return t.answer=Math.floor(4*Math.random())+1,n.splice(t.answer-1,0,e.correct_answer),n.forEach((e,n)=>{t["choice"+(n+1)]=e}),t}),setInterval(set,1e3),startGame()}).catch(e=>{console.error(e)});const h=10,p=5;let y=15;function set(){y--,c.innerHTML=y,0===y&&getNewQuestion()}startGame=()=>{d=0,m=0,g=[...u],getNewQuestion(),a.classList.remove("hidden"),r.classList.add("hidden")},getNewQuestion=()=>{if(y=15,0===g.length||d>=p)return localStorage.setItem("mostRecentScore",m),window.location.assign("/end.html");d++,n.innerHTML=`Question ${d}/${p}`,s.style.width=d/p*100+"%";const o=Math.floor(Math.random()*g.length);i=g[o],e.innerHTML=i.question,t.forEach(e=>{const t=e.dataset.number;e.innerHTML=i["choice"+t]}),g.splice(o,1),l=!0},t.forEach(e=>{e.addEventListener("click",e=>{if(!l)return;l=!1;const t=e.target,n=t.dataset.number==i.answer?"correct":"incorrect";"correct"===n&&incrementScore(h),t.parentElement.classList.add(n),setTimeout(()=>{t.parentElement.classList.remove(n),getNewQuestion()},1e3)})}),incrementScore=e=>{m+=e,o.innerHTML=m}}if("/end.html"===window.location.pathname){const e=document.getElementById("username"),t=document.getElementById("saveScoreBtn"),n=document.getElementById("finalScore"),o=localStorage.getItem("mostRecentScore"),s=JSON.parse(localStorage.getItem("highScores"))||[],c=document.getElementById("clap");n&&(n.innerHTML="Score:"+o),console.log(o),o>=40&&(c.innerHTML='<img src="../assets/images/clap.gif"/>'),e.addEventListener("keydown",()=>{t.disabled=!1}),saveHighScore=t=>{t.preventDefault();const n={score:o,name:e.value};s.push(n),s.sort((e,t)=>t.score-e.score),s.splice(5),localStorage.setItem("highScores",JSON.stringify(s)),window.location.assign("/")}}if("/highscores.html"===window.location.pathname){const e=document.getElementById("highScoresList"),t=(JSON.parse(localStorage.getItem("highScores"))||[]).map(e=>`<li class="high-score">${e.name} - ${e.score}</li>`).join("");e.innerHTML=t}const results={category:"General Knowledge",type:"multiple",difficulty:"easy",question:"cuanto es 2 mas 2",correct_answer:"4",incorrect_answers:["1","2","3"]};