(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{12:function(e,n,t){e.exports=t(19)},19:function(e,n,t){"use strict";t.r(n);var o=t(1),r=t(0),a=t.n(r),c=t(8),i=t.n(c),l=t(2),d=t(5);const s=(e,n,t)=>n*t+e,u=(e,n)=>({x:e%n,y:Math.floor(e/n)}),p=(e,n,t)=>e.map(e=>n[e]).join(""),x=(e,n)=>{if(e.length<2)return!1;const t=e.map(e=>u(e,n)),o=t[1].x-t[0].x,r=t[1].y-t[0].y,a=Math.max(Math.abs(o),Math.abs(r)),c=o/a,i=r/a;for(let l=2;l<t.length;l++){const e=t[l].x-t[l-1].x,n=t[l].y-t[l-1].y,o=Math.max(Math.abs(e),Math.abs(n));if(e/o!==c||n/o!==i)return!1}return!0};var m,h,g;const f=l.b.div(m||(m=Object(o.a)(["\n  position: relative;\n  display: grid;\n  grid-template-columns: repeat(",", 1fr);\n  gap: 2px;\n  padding: 10px;\n  background: white;\n  border-radius: 8px;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\n  width: 100%;\n  max-width: 100%; /* Allow full width for smaller grids */\n  margin: 0 auto;\n  touch-action: none; /* Only prevent default touch actions on the grid */\n\n  @media (max-width: 768px) {\n    padding: 5px;\n    gap: 1px;\n    max-width: 95vw;\n  }\n"])),e=>e.size),b=l.b.div(h||(h=Object(o.a)(["\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  pointer-events: none;\n  z-index: 1;\n"]))),y=l.b.div(g||(g=Object(o.a)(["\n  position: relative;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  aspect-ratio: 1;\n  font-size: 1.2em;\n  font-weight: bold;\n  cursor: pointer;\n  user-select: none;\n  color: #333;\n\n  @media (max-width: 768px) {\n    font-size: 0.9em;\n  }\n"])));var w,v=e=>{let{size:n,letters:t,onWordFound:o,foundWords:c=[]}=e;const[i,l]=Object(r.useState)([]),[m,h]=Object(r.useState)(!1),[g,w]=Object(r.useState)(new Set),v=Object(r.useRef)(null),E=["#FF9AA2","#FFB7B2","#FFDAC1","#E2F0CB","#B5EAD7","#C7CEEA","#9DD6FF"],O=()=>{if(i.length<2||!v.current)return null;const e=v.current.getBoundingClientRect(),t=n-1,o=(e.width-20-2*t)/n,r=o+2,a=i[0],c=i[i.length-1],l=u(a,n),d=u(c,n),s=(d.x,l.x,d.y,l.y,10+l.x*r+o/2),p=10+l.y*r+o/2,x=10+d.x*r+o/2,m=10+d.y*r+o/2,h=Math.floor(Math.random()*E.length);return{x1:"".concat(s,"px"),y1:"".concat(p,"px"),x2:"".concat(x,"px"),y2:"".concat(m,"px"),stroke:E[h],strokeWidth:o}};Object(r.useEffect)(()=>{O()},[i]),Object(r.useEffect)(()=>{const e=new Set;for(let o=0;o<t.length;o++)for(const r of c){const a=[{dx:1,dy:0},{dx:-1,dy:0},{dx:0,dy:1},{dx:0,dy:-1},{dx:1,dy:1},{dx:-1,dy:-1},{dx:1,dy:-1},{dx:-1,dy:1}];for(const{dx:c,dy:i}of a){let a=[],l="",d=o;for(let e=0;e<r.length;e++){const{x:o,y:r}=u(d,n),p=o+c*e,x=r+i*e;if(p<0||p>=n||x<0||x>=n)break;const m=s(p,x,n);l+=t[m],a.push(m)}l!==r&&l!==r.split("").reverse().join("")||a.forEach(n=>e.add(n))}}w(e)},[c,t,n]),Object(r.useEffect)(()=>{l([])},[n]);const j=()=>{if(h(!1),i.length>=2){const e=p(i,t);o(e)}l([])};return a.a.createElement(f,{ref:v,size:n,onMouseLeave:()=>{h(!1),l([])},onTouchStart:e=>e.preventDefault(),onTouchMove:e=>{if(e.preventDefault(),!m||!v.current)return;const t=e.touches[0],o=v.current.getBoundingClientRect(),r=o.width/n,a=o.height/n,c=t.clientX-o.left,d=t.clientY-o.top,s=Math.floor(c/r),u=Math.floor(d/a);if(s>=0&&s<n&&u>=0&&u<n){const e=u*n+s,t=[...i];e!==t[t.length-1]&&(t.push(e),x(t,n)&&l(t))}},onTouchEnd:()=>{if(i.length>=2){const e=p(i,t);o(e)}h(!1),l([])}},a.a.createElement(b,null,(()=>{const e=[],o=O();return o&&e.push(Object(d.a)(Object(d.a)({},o),{},{opacity:.3,key:"selection"})),c.forEach((o,r)=>{for(let a=0;a<t.length;a++){const c=[{dx:1,dy:0},{dx:-1,dy:0},{dx:0,dy:1},{dx:0,dy:-1},{dx:1,dy:1},{dx:-1,dy:-1},{dx:1,dy:-1},{dx:-1,dy:1}];for(const{dx:i,dy:l}of c){let c,d,p,x,m="";const{x:h,y:g}=u(a,n),f=v.current.getBoundingClientRect(),b=2,y=10,w=n-1,O=(f.width-2*y-w*b)/n,j=O+b;for(let e=0;e<o.length;e++){const r=h+i*e,a=g+l*e;if(r<0||r>=n||a<0||a>=n)break;const u=s(r,a,n);m+=t[u],0===e?(c=y+r*j+O/2,d=y+a*j+O/2):e===o.length-1&&(p=y+r*j+O/2,x=y+a*j+O/2)}if(m===o||m===o.split("").reverse().join("")){e.push({x1:"".concat(c,"px"),y1:"".concat(d,"px"),x2:"".concat(p,"px"),y2:"".concat(x,"px"),stroke:E[r%E.length],strokeWidth:O,opacity:.3,key:"found-".concat(r,"-").concat(a,"-").concat(i,"-").concat(l)});break}}}}),a.a.createElement("svg",{style:{position:"absolute",top:0,left:0,width:"100%",height:"100%",pointerEvents:"none"}},e.map(e=>a.a.createElement("line",{key:e.key,x1:e.x1,y1:e.y1,x2:e.x2,y2:e.y2,stroke:e.stroke,strokeWidth:e.strokeWidth,strokeLinecap:"round",opacity:e.opacity})))})()),t.map((e,t)=>a.a.createElement(y,{key:t,onMouseDown:()=>(e=>{h(!0),l([e])})(t),onMouseEnter:()=>(e=>{if(m){const t=[...i,e];x(t,n)&&l(t)}})(t),onMouseUp:j,onTouchStart:e=>((e,n)=>{n.preventDefault(),h(!0),l([e])})(t,e)},e)))};const E=l.b.div(w||(w=Object(o.a)(["\n  padding: 8px 15px;\n  background-color: ",";\n  color: ",";\n  border-radius: 20px;\n  font-weight: bold;\n  box-shadow: 0 2px 4px rgba(0,0,0,0.1);\n  transition: all 0.3s ease;\n  \n  @media (max-width: 768px) {\n    padding: 6px 12px;\n    font-size: 0.9em;\n  }\n"])),e=>e.found?"#4CAF50":"white",e=>e.found?"white":"black");var O=e=>{let{word:n,found:t}=e;return a.a.createElement(E,{found:t},n)};var j;const S=l.b.div(j||(j=Object(o.a)(["\n  font-size: 1.5rem;\n  font-weight: bold;\n  color: ",";\n"])),e=>e.time<10?"red":"black");var k,M=e=>{let{initialTime:n,onTimeUp:t}=e;const[o,c]=Object(r.useState)(n);return Object(r.useEffect)(()=>{c(n)},[n]),Object(r.useEffect)(()=>{if(o<=0)return void t();const e=setInterval(()=>{c(e=>e-1)},1e3);return()=>clearInterval(e)},[o,t]),a.a.createElement(S,null,"Time: ",Math.floor(o/60),":",(o%60).toString().padStart(2,"0"))};const C=l.b.div(k||(k=Object(o.a)(["\n  font-size: 1.5rem;\n  font-weight: bold;\n  color: #4CAF50;\n  padding: 10px 20px;\n  background-color: #f5f5f5;\n  border-radius: 10px;\n  box-shadow: 0 2px 4px rgba(0,0,0,0.1);\n"])));var A=e=>{let{score:n}=e;return a.a.createElement(C,null,"Score: ",n)};const F=[{x:1,y:0},{x:0,y:1},{x:1,y:1},{x:-1,y:0},{x:0,y:-1},{x:-1,y:-1},{x:1,y:-1},{x:-1,y:1}],T=(e,n,t,o,r)=>{const{x:a,y:c}=o,i=n.length;for(let l=0;l<i;l++){const o=t.x+a*l,i=t.y+c*l;if(o<0||o>=r||i<0||i>=r)return!1;const d=e[i][o];if(""!==d&&d!==n[l])return!1}return!0},z=(e,n,t,o)=>{const{x:r,y:a}=o;for(let c=0;c<n.length;c++){const o=t.x+r*c;e[t.y+a*c][o]=n[c]}},L=e=>{try{return localStorage.setItem("wordSearchGame",JSON.stringify(e)),!0}catch(n){return console.error("Error saving game progress:",n),!1}},D=()=>{try{const n=localStorage.getItem("wordSearchGame");return n?JSON.parse(n):null}catch(e){return console.error("Error loading game progress:",e),null}},B=()=>{try{return localStorage.removeItem("wordSearchGame"),!0}catch(e){return console.error("Error clearing game progress:",e),!1}};var I,W,U,J,R,N;const P=l.b.div(I||(I=Object(o.a)(["\n  padding: 20px;\n  max-width: 800px;\n  margin: 0 auto;\n\n  @media (max-width: 768px) {\n    padding: 10px;\n  }\n"]))),K=l.b.div(W||(W=Object(o.a)(["\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 20px;\n  flex-wrap: wrap;\n\n  @media (max-width: 768px) {\n    margin-bottom: 10px;\n    gap: 5px;\n\n    h2 {\n      font-size: 1.5rem;\n    }\n  }\n"]))),G=l.b.div(U||(U=Object(o.a)(["\n  display: flex;\n  flex-wrap: wrap;\n  gap: 10px;\n  margin-bottom: 20px;\n  justify-content: center;\n\n  @media (max-width: 768px) {\n    gap: 5px;\n    margin-bottom: 10px;\n  }\n"])));l.b.div(J||(J=Object(o.a)(["\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background-color: rgba(0, 0, 0, 0.5);\n  display: flex;\n  justify-content: center;\n  align-items: center;\n"]))),l.b.div(R||(R=Object(o.a)(["\n  background-color: #fff;\n  padding: 20px;\n  border-radius: 10px;\n  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);\n"]))),l.b.button(N||(N=Object(o.a)(["\n  background-color: #4CAF50;\n  color: #fff;\n  padding: 10px 20px;\n  border: none;\n  border-radius: 5px;\n  cursor: pointer;\n"])));var Y=e=>{let{levelData:n,onLevelComplete:t,onTimeout:o}=e;const[c,i]=Object(r.useState)([]),[l,d]=Object(r.useState)(0),[s,u]=Object(r.useState)(n.timeLimit),[p,x]=Object(r.useState)([]),[m,h]=Object(r.useState)(!1),[g,f]=Object(r.useState)(""),[b,y]=Object(r.useState)(!1);Object(r.useEffect)(()=>{(()=>{i([]),d(0);const{grid:e}=((e,n)=>{const t=Array(e).fill().map(()=>Array(e).fill("")),o=[];[...n].sort((e,n)=>n.length-e.length).forEach(n=>{let r=!1,a=0;const c=e*e;for(;!r&&a<c;){const c={x:Math.floor(Math.random()*e),y:Math.floor(Math.random()*e)},i=F[Math.floor(Math.random()*F.length)];T(t,n,c,i,e)&&(z(t,n,c,i),o.push(n),r=!0),a++}});const r="ABCDEFGHIJKLMNOPQRSTUVWXYZ";for(let a=0;a<e;a++)for(let n=0;n<e;n++)""===t[a][n]&&(t[a][n]=r[Math.floor(Math.random()*r.length)]);return{grid:t,placedWords:o}})(n.gridSize,n.words);x(Array.isArray(e)?e.flat():[])})()},[n]);return p.length?a.a.createElement(P,null,a.a.createElement(K,null,a.a.createElement("h2",null,"Level ",n.id),a.a.createElement(A,{score:l}),a.a.createElement(M,{key:"timer-".concat(n.id),initialTime:n.timeLimit,onTimeUp:o})),a.a.createElement(G,null,n.words.map((e,n)=>a.a.createElement(O,{key:n,word:e,found:c.includes(e)}))),a.a.createElement(v,{size:n.gridSize,letters:p,onWordFound:e=>{if(!e)return;const o=e.split("").reverse().join(""),r=n.words.find(n=>n.toUpperCase()===e.toUpperCase()||n.toUpperCase()===o.toUpperCase());if(r&&!c.includes(r)){const e=[...c,r],o=((e,n)=>10*e+Math.floor(n/10))(r.length,s),a=l+o;i(e),d(a),L({level:n.id,score:a,foundWords:e}),((e,n)=>e.length===n.length&&n.every(n=>e.includes(n)))(e,n.words)&&(((e,n)=>{try{const o=JSON.parse(localStorage.getItem("wordSearchHighScores")||"{}");(!o[e]||n>o[e])&&(o[e]=n,localStorage.setItem("wordSearchHighScores",JSON.stringify(o)))}catch(t){return console.error("Error saving high score:",t),!1}})(n.id,a),t(a))}},foundWords:c})):null};const H=[{id:1,gridSize:10,words:["SHABU","PEKPEK","BURAT","KIFFY"],timeLimit:120,difficulty:"easy"},{id:2,gridSize:10,words:["TONI","FOWLER","JIAFEI","POSAY"],timeLimit:120,difficulty:"easy"},{id:3,gridSize:10,words:["VLAT","POKPOK","BETLOG","MODTA"],timeLimit:120,difficulty:"easy"}];var V,X,Q,Z,q,$,_;const ee=l.b.div(V||(V=Object(o.a)(["\n  min-height: 100vh;\n  background-color: #f0f2f5;\n  padding: 20px;\n  \n  @media (max-width: 768px) {\n    padding: 10px;\n  }\n"]))),ne=l.b.div(X||(X=Object(o.a)(["\n  text-align: center;\n  margin-bottom: 30px;\n  \n  @media (max-width: 768px) {\n    margin-bottom: 15px;\n  }\n"]))),te=l.b.h1(Q||(Q=Object(o.a)(["\n  color: #2c3e50;\n  font-size: 2.5rem;\n  margin-bottom: 10px;\n  \n  @media (max-width: 768px) {\n    font-size: 2rem;\n    margin-bottom: 5px;\n  }\n"]))),oe=l.b.div(Z||(Z=Object(o.a)(["\n  max-width: 600px;\n  margin: 0 auto;\n  padding: 20px;\n  background-color: white;\n  border-radius: 10px;\n  box-shadow: 0 2px 10px rgba(0,0,0,0.1);\n  \n  @media (max-width: 768px) {\n    max-width: 95%;\n    padding: 15px;\n  }\n"]))),re=l.b.button(q||(q=Object(o.a)(["\n  padding: 10px 20px;\n  margin: 10px;\n  font-size: 1.1rem;\n  border: none;\n  border-radius: 5px;\n  background-color: #4CAF50;\n  color: white;\n  cursor: pointer;\n  transition: all 0.3s ease;\n  touch-action: manipulation;\n  -webkit-tap-highlight-color: transparent;\n  user-select: none; // Add this\n\n  &:hover {\n    background-color: #45a049;\n  }\n\n  &:active {\n    background-color: #3d8b40;\n    transform: scale(0.98);\n  }\n\n  &:disabled {\n    background-color: #cccccc;\n    cursor: not-allowed;\n  }\n  \n  @media (max-width: 768px) {\n    padding: 15px 30px; // Increased padding for better touch target\n    margin: 8px;\n    font-size: 1.2rem; // Slightly larger font for mobile\n  }\n"]))),ae=l.b.div($||($=Object(o.a)(["\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background-color: rgba(0, 0, 0, 0.5);\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  z-index: 1000;\n"]))),ce=l.b.div(_||(_=Object(o.a)(["\n  position: relative;\n  background-color: white;\n  padding: 30px;\n  border-radius: 10px;\n  box-shadow: 0 0 20px rgba(0,0,0,0.2);\n  text-align: center;\n  z-index: 1001;\n"])));var ie,le=function(){const[e,n]=Object(r.useState)(0),[t,o]=Object(r.useState)(0),[c,i]=Object(r.useState)(1),[l,d]=Object(r.useState)(!1),[s,u]=Object(r.useState)(""),[p,x]=Object(r.useState)(!1);Object(r.useEffect)(()=>{const e=D();e&&(i(e.level),o(e.score))},[]);const m=n=>{const r=t+n;if(o(r),e===c){const e=c+1;i(e),L({level:e,score:r})}u("Level Complete!\nScore: ".concat(n,"\nTotal Score: ").concat(r)),d(!0),x(!1)},h=()=>{x(!0),u("You ran out of time!"),d(!0)},g=e=>{x(!1),n(e),d(!1),u("")},f=()=>{B(),n(0),o(0),i(1)};return a.a.createElement(ee,null,a.a.createElement(ne,null,a.a.createElement(te,null,"word search")),0===e?a.a.createElement(oe,null,a.a.createElement("h2",null,"Select Level"),H.map((e,n)=>a.a.createElement(re,{key:e.id,onClick:e=>{e.preventDefault(),g(n+1)},onTouchEnd:e=>{e.preventDefault(),g(n+1)},disabled:n+1>c},"Level ",e.id)),a.a.createElement(re,{onClick:e=>{e.preventDefault(),f()},onTouchEnd:e=>{e.preventDefault(),f()}},"Reset Progress"),a.a.createElement("h3",null,"Total Score: ",t)):(()=>{const t=H[e-1];return t?a.a.createElement(a.a.Fragment,null,a.a.createElement(re,{onClick:()=>n(0),style:{position:"absolute",top:"20px",left:"20px"}},"Back to Menu"),a.a.createElement(Y,{key:"level-".concat(e,"-").concat(Date.now()),levelData:t,onLevelComplete:m,onTimeout:h})):(n(0),null)})(),l&&a.a.createElement(ae,null,a.a.createElement(ce,null,p?a.a.createElement(a.a.Fragment,null,a.a.createElement("h2",null,"Time's Up!"),a.a.createElement("p",null,s),a.a.createElement(re,{onClick:()=>{d(!1),x(!1),g(e)}},"Try Again"),a.a.createElement(re,{onClick:()=>{d(!1),x(!1),n(0)}},"Back to Menu")):a.a.createElement(a.a.Fragment,null,a.a.createElement("h2",null,"Congratulations!"),a.a.createElement("p",{style:{whiteSpace:"pre-line"}},s),a.a.createElement(re,{onClick:()=>{d(!1),n(e+1)}},"Next Level")))))};const de=Object(l.a)(ie||(ie=Object(o.a)(["\n  * {\n    -webkit-tap-highlight-color: transparent;\n    -webkit-touch-callout: none;\n    -webkit-user-select: none;\n    user-select: none;\n  }\n\n  body {\n    overscroll-behavior: none;\n    position: fixed;\n    width: 100%;\n    height: 100%;\n    overflow: hidden;\n  }\n\n  #root {\n    overflow-y: auto;\n    height: 100%;\n    -webkit-overflow-scrolling: touch;\n  }\n"]))),se=document.getElementById("root");i.a.render(a.a.createElement(a.a.StrictMode,null,a.a.createElement(de,null),a.a.createElement(le,null)),se)}},[[12,1,2]]]);
//# sourceMappingURL=main.2c4c7da9.chunk.js.map