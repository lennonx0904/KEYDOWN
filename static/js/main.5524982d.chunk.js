(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{100:function(e,t,a){},185:function(e,t,a){},186:function(e,t,a){},187:function(e,t,a){},188:function(e,t,a){},189:function(e,t,a){},190:function(e,t,a){},191:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),o=a(52),c=a.n(o),i=a(8),l=a(26),s=a(87),u=(a(100),a(2)),m=a(3),d=a(5),h=a(4),p=a(6),f=a(20),g=a(27),b=function(){return r.a.createElement("div",{className:"logo"},r.a.createElement(f.b,{to:"/"},"KEYDOWN"))},E=function(e){return{type:"SHOW_LOGIN_FORM",payload:e}},v=function(e){return{type:"SHOW_SIGNUP_FORM",payload:e}},y=function(e){return{type:"SHOW_MOBILE_BUTTONS",payload:e}},S=a(68),O=a.n(S);a(85),a(180);O.a.initializeApp({apiKey:"AIzaSyBpuiUbM6r9pKhzKP6xHSSaANIEe_rwPrc",authDomain:"keyboard-game-64e45.firebaseapp.com",databaseURL:"https://keyboard-game-64e45.firebaseio.com",projectId:"keyboard-game-64e45",storageBucket:"keyboard-game-64e45.appspot.com",messagingSenderId:"697558300831"});var w=O.a,A=w.firestore(),N=function(){return function(e){w.auth().signOut().then(function(){e({type:"LOGOUT_SUCCESS"})})}},k=function(e){function t(){var e,a;Object(u.a)(this,t);for(var n=arguments.length,o=new Array(n),c=0;c<n;c++)o[c]=arguments[c];return(a=Object(d.a)(this,(e=Object(h.a)(t)).call.apply(e,[this].concat(o)))).renderLogInAndSignUpBtn=function(){var e=a.props,t=e.showing,n=e.showLoginForm,o=e.showSignUpForm;return r.a.createElement(r.a.Fragment,null,r.a.createElement("button",{className:"log-in nav-button",onClick:function(){n(!0)},disabled:t.signUpForm},"Log In"),r.a.createElement("button",{className:"sigh-in nav-button",onClick:function(){o(!0)},disabled:t.loginForm},"Sign Up"))},a.renderLogOutBtn=function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement("button",{className:"log-out nav-button",onClick:a.props.logOut},"Log Out"))},a}return Object(p.a)(t,e),Object(m.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:"buttons"},this.props.auth.uid?this.renderLogOutBtn():this.renderLogInAndSignUpBtn())}}]),t}(r.a.Component),j=Object(i.b)(function(e){return{auth:e.auth,showing:e.showing}},{showLoginForm:E,showSignUpForm:v,logOut:N})(k),C=function(e){function t(){var e,a;Object(u.a)(this,t);for(var n=arguments.length,o=new Array(n),c=0;c<n;c++)o[c]=arguments[c];return(a=Object(d.a)(this,(e=Object(h.a)(t)).call.apply(e,[this].concat(o)))).renderLogInAndSignUpBtn=function(){var e=a.props,t=e.showLoginForm,n=e.showSignUpForm,o=e.showMobileButtons;return r.a.createElement("div",{className:"mobile-btn-wrap"},r.a.createElement("button",{className:"mobile-btn",onClick:function(){o(!1),t(!0)}},"Log In"),r.a.createElement("button",{className:"mobile-btn",onClick:function(){o(!1),n(!0)}},"Sign Up"))},a.renderLogOutBtn=function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement("button",{className:"mobile-btn",onClick:a.props.logOut},"Log Out"))},a}return Object(p.a)(t,e),Object(m.a)(t,[{key:"render",value:function(){var e=this.props.auth;return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"mobile-buttons"},e.uid?this.renderLogOutBtn():this.renderLogInAndSignUpBtn()))}}]),t}(r.a.Component),I=Object(i.b)(function(e){return{auth:e.auth,showing:e.showing}},{showLoginForm:E,showSignUpForm:v,logOut:N,showMobileButtons:y})(C),L=a(89),R=a.n(L),F=(a(185),function(e){function t(){return Object(u.a)(this,t),Object(d.a)(this,Object(h.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(m.a)(t,[{key:"componentDidMount",value:function(){this.props.checkAuthState()}},{key:"render",value:function(){var e=this.props,t=e.showing,a=e.showMobileButtons,n=e.auth;return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"nav-bar"},r.a.createElement(b,null),n.name?r.a.createElement("div",{className:"greeting"},"Hi ! ",n.name):null,r.a.createElement("button",{className:"menu-button",disabled:t.loginForm||t.signUpForm,onClick:function(){var e=t.mobileButtons;a(!e)}},r.a.createElement("img",{src:R.a,alt:""})),r.a.createElement(j,null)),t.mobileButtons?r.a.createElement(I,null):null)}}]),t}(r.a.Component)),T=Object(i.b)(function(e){return{auth:e.auth,showing:e.showing}},{checkAuthState:function(){return function(e){w.auth().onAuthStateChanged(function(t){t?(e({type:"FETCH_USER_UID",payload:t.uid}),A.collection("users").doc(t.uid).get().then(function(t){t&&e({type:"FETCH_USER_NAME",payload:t.data().userName})})):e({type:"FETCH_USER_UID",payload:null})})}},showMobileButtons:y})(F),_=a(30),U=function(e){function t(){var e,a;Object(u.a)(this,t);for(var n=arguments.length,o=new Array(n),c=0;c<n;c++)o[c]=arguments[c];return(a=Object(d.a)(this,(e=Object(h.a)(t)).call.apply(e,[this].concat(o)))).state={userName:"",email:"",password:"",comfirmPassword:""},a.changeInputState=function(e){a.setState(Object(_.a)({},e.target.name,e.target.value))},a.submitHandler=function(e){e.preventDefault(),a.props.signUp(a.state)},a.renderSignUpForm=function(){return r.a.createElement("div",{className:"auth-view"},r.a.createElement("div",{className:"auth-wrap"},r.a.createElement("form",{className:"signup-form",onSubmit:a.submitHandler},r.a.createElement("i",{className:"fas fa-times exit-btn",onClick:function(){a.props.showSignUpForm(!1)}}),r.a.createElement("div",null,r.a.createElement("label",null,"Name"),r.a.createElement("br",null),r.a.createElement("input",{type:"text",name:"userName",value:a.state.userName,onChange:a.changeInputState})),r.a.createElement("div",null,r.a.createElement("label",null,"E-mail"),r.a.createElement("br",null),r.a.createElement("input",{type:"text",name:"email",value:a.state.email,onChange:a.changeInputState})),r.a.createElement("div",null,r.a.createElement("label",null,"Password"),r.a.createElement("br",null),r.a.createElement("input",{type:"password",name:"password",value:a.state.password,onChange:a.changeInputState})),r.a.createElement("div",null,r.a.createElement("label",null,"Comfirm Your Password"),r.a.createElement("br",null),r.a.createElement("input",{type:"password",name:"comfirmPassword",value:a.state.comfirmPassword,onChange:a.changeInputState})),r.a.createElement("button",{className:"submit-btn"},"Sigh Up"),r.a.createElement("div",null,a.props.auth.authError?r.a.createElement("p",null,a.props.auth.authError):null))))},a}return Object(p.a)(t,e),Object(m.a)(t,[{key:"render",value:function(){return r.a.createElement(r.a.Fragment,null,this.props.auth.uid?null:this.renderSignUpForm())}}]),t}(r.a.Component),x=Object(i.b)(function(e){return{signUpForm:e.signUpForm,auth:e.auth}},{showSignUpForm:v,signUp:function(e){return function(t){var a=e.userName,n=e.email,r=e.password,o=e.comfirmPassword;""!==a?r===o?w.auth().createUserWithEmailAndPassword(n,r).then(function(e){var r=e.user.uid;t({type:"STORE_USER_UID",payload:r}),A.collection("users").doc(r).set({userName:a,email:n})}).then(function(){t({type:"SIGH_UP_SUCCESS"})}).catch(function(e){t({type:"SIGH_UP_ERROR",payload:e.message})}):t({type:"SIGH_UP_ERROR",payload:"Please comfirm your password"}):t({type:"SIGH_UP_ERROR",payload:"Please enter your name"})}}})(U),D=function(e){function t(){var e,a;Object(u.a)(this,t);for(var n=arguments.length,o=new Array(n),c=0;c<n;c++)o[c]=arguments[c];return(a=Object(d.a)(this,(e=Object(h.a)(t)).call.apply(e,[this].concat(o)))).state={email:"",password:""},a.changeInputState=function(e){a.setState(Object(_.a)({},e.target.name,e.target.value))},a.submitHandler=function(e){e.preventDefault(),a.props.logIn(a.state)},a.renderLogInForm=function(){return r.a.createElement("div",{className:"auth-view"},r.a.createElement("div",{className:"auth-wrap"},r.a.createElement("form",{className:"login-form",onSubmit:a.submitHandler},r.a.createElement("i",{className:"fas fa-times exit-btn",onClick:function(){a.props.showLoginForm(!1)}}),r.a.createElement("div",null,r.a.createElement("label",null,"E-mail"),r.a.createElement("br",null),r.a.createElement("input",{type:"text",name:"email",onChange:a.changeInputState})),r.a.createElement("div",null,r.a.createElement("label",null,"Password"),r.a.createElement("br",null),r.a.createElement("input",{type:"password",name:"password",onChange:a.changeInputState})),r.a.createElement("button",{className:"submit-btn"},"Login"),r.a.createElement("div",null,a.props.auth.authError?r.a.createElement("p",null,a.props.auth.authError):null))))},a}return Object(p.a)(t,e),Object(m.a)(t,[{key:"render",value:function(){return r.a.createElement(r.a.Fragment,null,this.props.auth.uid?null:this.renderLogInForm())}}]),t}(r.a.Component),M=Object(i.b)(function(e){return{auth:e.auth}},{showLoginForm:E,logIn:function(e){return function(t){w.auth().signInWithEmailAndPassword(e.email,e.password).then(function(){w.auth().onAuthStateChanged(function(e){t({type:"LOGIN_SUCCESS"})})}).catch(function(e){t({type:"LOGIN_ERROR",payload:e})})}}})(D),G=(a(186),function(e){function t(){return Object(u.a)(this,t),Object(d.a)(this,Object(h.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(m.a)(t,[{key:"render",value:function(){var e=this.props.showing,t=e.signUpForm,a=e.loginForm;return r.a.createElement(r.a.Fragment,null,t&&r.a.createElement(x,null),a&&r.a.createElement(M,null))}}]),t}(r.a.Component)),P=Object(i.b)(function(e){return{showing:e.showing}})(G),H=(a(187),function(e){function t(){return Object(u.a)(this,t),Object(d.a)(this,Object(h.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(m.a)(t,[{key:"render",value:function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"banner"},r.a.createElement("div",{className:"enter-wrap"},r.a.createElement("div",{className:"enter-btn"},r.a.createElement(f.b,{to:"/select"},"Enter Game")))))}}]),t}(r.a.Component)),B=a(90),W=w.firestore(),Y=(a(188),function(e){function t(){return Object(u.a)(this,t),Object(d.a)(this,Object(h.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(m.a)(t,[{key:"componentDidMount",value:function(){this.props.fetchSongList()}},{key:"renderSongList",value:function(){return this.props.songList.map(function(e){return r.a.createElement("div",{key:e.id,className:"song"},r.a.createElement("div",{className:"song-details"},r.a.createElement("div",{className:"song-title"},e.data.title),r.a.createElement("div",{className:"song-auth"},e.data.auth)),r.a.createElement("div",{className:"difficulty-wrap"},r.a.createElement(f.b,{to:"/game/".concat(e.id,"?easy")},r.a.createElement("button",{className:"difficulty"},"EASY")),r.a.createElement(f.b,{to:"/game/".concat(e.id,"?normal")},r.a.createElement("button",{className:"difficulty"},"NORMAL")),r.a.createElement(f.b,{to:"/game/".concat(e.id,"?hard")},r.a.createElement("button",{className:"difficulty"},"HARD"))))})}},{key:"render",value:function(){return r.a.createElement("div",{className:"song-list-wrap"},r.a.createElement("div",{className:"song-list"},this.renderSongList()))}}]),t}(r.a.Component)),Q=Object(i.b)(function(e){return{songList:e.songList,playingSongData:e.playingSongData}},{fetchSongList:function(){return function(e){var t=[];W.collection("songList").orderBy("id").get().then(function(a){return a.forEach(function(a){t=[].concat(Object(B.a)(t),[{id:a.id,data:a.data()}]),e({type:"FETCH_SONG_LIST",payload:t})})})}}})(Y),Z=function(e){function t(){return Object(u.a)(this,t),Object(d.a)(this,Object(h.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(m.a)(t,[{key:"shouldComponentUpdate",value:function(){return!1}},{key:"render",value:function(){return r.a.createElement("canvas",{id:"game-canvas",width:this.props.width,height:this.props.height})}}]),t}(r.a.Component),J=function(e){function t(){return Object(u.a)(this,t),Object(d.a)(this,Object(h.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(m.a)(t,[{key:"shouldComponentUpdate",value:function(){return!1}},{key:"render",value:function(){return r.a.createElement("canvas",{ref:this.props.getCanvas,id:"player-canvas",width:this.props.width,height:this.props.height})}}]),t}(r.a.Component),q=function(e){return r.a.createElement("div",{className:"battle-board"},"Best Record",e.record.slice(0,1).map(function(e){return r.a.createElement("div",{className:"score-in-board",key:e.id},e.data.score)}))},K=function(){return r.a.createElement("div",{className:"battle-board"},"Socre",r.a.createElement("div",{className:"score-in-board current-socre"},"0"))},V=w.firestore(),z=w.firestore(),X=function(e,t){return function(a){var n=[];z.collection("songList").doc(e).collection(t).orderBy("score","desc").limit(10).get().then(function(e){e.forEach(function(e){n.push({id:e.id,data:e.data()}),a({type:"FETCH_RANKING_RECORD",payload:n})})})}},$=function(e,t){var a=JSON.parse(localStorage.rankingData);a[e]=t,localStorage.rankingData=JSON.stringify(a)},ee=function(e,t,a){var n=document.querySelector("#player-canvas").getContext("2d"),r=18*a,o=13*a;n.beginPath(),n.moveTo(e*a,0),n.lineTo((e+1)*a,0),n.lineTo(r*t/4,o),n.lineTo(r*(t-1)/4,o),n.closePath(),n.fillStyle="rgba(255,255,255,0.1)",n.fill()},te=function(e){document.querySelector("#player-canvas").getContext("2d").clearRect(0,0,18*e,13*e)},ae=function(e,t,a,n){var r=document.querySelector("#player-canvas").getContext("2d"),o=18*t,c=13*t;r.clearRect(0,0,o,c),r.save(),r.beginPath(),r.translate(o*e/4-o/8,12*t-12),r.textAlign="center","MISS"===a?(r.fillStyle="rgba(255,255,255,0.6)",r.font="".concat(.7*t,"px Courier New")):(r.fillStyle="#fff",r.font="".concat(t,"px Courier New")),r.fillText(a,0,0),r.restore(),n>1&&(r.save(),r.beginPath(),r.translate(o/2,c/2),r.fillStyle="#fff",r.textAlign="center",r.font="".concat(t,"px Courier New"),r.fillText("COMBO ".concat(n),0,0),r.restore()),setTimeout(function(){r.clearRect(0,0,o,c)},300)},ne=function(e,t){var a=document.querySelector("#game-canvas").getContext("2d"),n=18*e,r=13*e;a.clearRect(0,0,n,r);var o=0;t/1e3>1&&(o=t-t%1e3);var c=setInterval(function(){0===t?o=0:o++,a.clearRect(0,0,n,r),a.rect(0,0,n,r),a.fillStyle="#1d1d1d",a.fill(),a.save(),a.beginPath(),a.translate(n/2,r/4),a.textAlign="center",a.font="".concat(e,"px Courier New"),a.fillStyle="#fff",a.fillText("You got ".concat(o," points!"),0,0),a.translate(0,r/4),a.fillText("Click to Ranking Page",0,0),a.restore(),o>=t&&clearInterval(c)},1)},re=function(){if(localStorage.rankingData){var e=JSON.parse(localStorage.rankingData),t=e.name,a=e.total,n=e.hit,r=e.miss,o=e.combo,c=e.score,i=Math.round(n/a*100);return{name:t,total:a,hit:n,miss:r,combo:o,score:c,accurate:i,rank:i>=90?"A":i>=80?"B":i>=70?"C":i>=60?"D":"E"}}},oe=function(e,t,a,n,r,o){var c=document.querySelector(".btn-d"),i=document.querySelector(".btn-f"),l=document.querySelector(".btn-k"),s=document.querySelector(".btn-l"),u=document.querySelector(".current-socre"),m=0,d=function(e,t){return function(){if(e[0]){var a=e[0].centerPos.y,n=re().combo,o=re().score;a>11*r&&a<13*r&&(m++,n++,e.splice(0,1),ae(t,r,"HIT",n),$("hit",m),$("combo",n),o+=function(){if(localStorage.rankingData){var e=JSON.parse(localStorage.rankingData).combo;return e<2?100:e>20?100*(100+Math.pow(20,2))/100:100*(100+Math.pow(e,2))/100}}(),$("score",o),u.textContent=re().score)}}},h=d(e,1),p=d(t,2),f=d(a,3),g=d(n,4),b=function(e){switch(e.keyCode){case 68:c.classList.add("btn-d-active"),ee(7,1,r),h();break;case 70:i.classList.add("btn-f-active"),ee(8,2,r),p();break;case 75:l.classList.add("btn-k-active"),ee(9,3,r),f();break;case 76:s.classList.add("btn-l-active"),ee(10,4,r),g()}},E=function(e){switch(te(r),e.keyCode){case 68:c.classList.remove("btn-d-active");break;case 70:i.classList.remove("btn-f-active");break;case 75:l.classList.remove("btn-k-active");break;case 76:s.classList.remove("btn-l-active")}};window.addEventListener("keydown",b,!1),window.addEventListener("keyup",E,!1),o.addEventListener("ended",function(){window.removeEventListener("keydown",b,!1),window.removeEventListener("keyup",E,!1)}),c.addEventListener("touchstart",function(){ee(7,1,r),h()}),i.addEventListener("touchstart",function(){ee(8,2,r),p()}),l.addEventListener("touchstart",function(){ee(9,3,r),f()}),s.addEventListener("touchstart",function(){ee(10,4,r),g()}),c.addEventListener("touchend",function(){te(r)}),i.addEventListener("touchend",function(){te(r)}),l.addEventListener("touchend",function(){te(r)}),s.addEventListener("touchend",function(){te(r)})},ce=function(e,t,a,n,r){a.play();var o=e/5,c=100,i=0,l=[],s=[],d=[],h=[],p=0,f=0,g=n;"easy"===r&&(c/=2),"hard"===r&&(c*=2);var b=document.querySelector("#game-canvas").getContext("2d"),E=18*e,v=13*e,y=Math.atan2(v,E/2-2*e),S=Math.atan2(E/2*Math.tan(y),E/2/2),O=2*e*Math.tan(y);b.line=function(e,t,a,n,r){b.beginPath(),b.moveTo(e.x,e.y),b.lineTo(t.x,t.y),b.strokeStyle=a,b.shadowBlur=10,b.shadowColor=n,b.lineWidth=r,b.stroke()};var w=function e(t,a){Object(u.a)(this,e),this.x=t||0,this.y=a||0},A=function(){function t(a){Object(u.a)(this,t);var n={centerPos:new w(E/2,0),pos1:new w(-2*e,0),pos2:new w(-e,0),color:"#75d0f5",shadowColor:"#599eba",height:e/5,speed:o};Object.assign(n,a),Object.assign(this,n)}return Object(m.a)(t,[{key:"render",value:function(){b.save(),b.beginPath(),b.translate(this.centerPos.x,this.centerPos.y),b.line(this.pos1,this.pos2,this.color,this.shadowColor,this.height),b.restore()}},{key:"update",value:function(){this.centerPos.y+=this.speed,0!==this.pos1.x&&0!==this.pos2.x?(this.pos1.x=(this.centerPos.y+O)/Math.tan(y)*(this.pos1.x/Math.abs(this.pos1.x)),this.pos2.x=(this.centerPos.y+O)/Math.tan(S)*(this.pos2.x/Math.abs(this.pos2.x))):(this.pos1.x=(this.centerPos.y+O)/Math.tan(S)*(this.pos1.x/Math.abs(this.pos1.x)),this.pos2.x=0)}}]),t}(),N=function(){b.clearRect(0,0,18*e,13*e),k(),l.forEach(function(e){return e.render()}),s.forEach(function(e){return e.render()}),d.forEach(function(e){return e.render()}),h.forEach(function(e){return e.render()})},k=function(){for(var t=0;t<5;t++)b.line({x:(t+7)*e,y:0},{x:18*e/4*t,y:13*e},"#000",null,1);b.beginPath(),b.moveTo(7*e,0),b.lineTo(11*e,0),b.lineTo(18*e,13*e),b.lineTo(0,13*e),b.closePath(),b.fillStyle="rgba(0,0,0,.8)",b.fill(),b.line({x:.5*e,y:12*e},{x:17.5*e,y:12*e},"rgba(142, 226, 163, 0.8)",null,2)},j=function(e){return parseFloat(e.toFixed(1))},C=function(t,a){t.forEach(function(n,r){n.centerPos.y>v&&(f++,t.splice(r,1),ae(a,e,"MISS"),$("combo",0))})},I=setInterval(function(){!function(){var n=j(a.currentTime),r=j(60/c);if(j(n-g)===r){g+=r,p+=t[++i].filter(function(e){return 1===e}).length;for(var o=0;o<4;o++)if(1===t[i][o])switch(o){case 0:l.push(new A);break;case 1:s.push(new A({pos1:new w(-e,0),pos2:new w,color:"#ff0000",shadowColor:"#ff5a5a"}));break;case 2:d.push(new A({pos1:new w(e,0),pos2:new w,color:"#83ff2b",shadowColor:"#6fd328"}));break;case 3:h.push(new A({pos1:new w(e,0),pos2:new w(2*e,0),color:"#ffff00",shadowColor:"#fcfc68"}));break;default:return}}l.forEach(function(e){return e.update()}),s.forEach(function(e){return e.update()}),d.forEach(function(e){return e.update()}),h.forEach(function(e){return e.update()}),C(l,1),C(s,2),C(d,3),C(h,4),$("total",p),$("miss",f),N()}()},10);return oe(l,s,d,h,e,a),function(){clearInterval(I),a.pause(),a.currentTime=0}},ie=(a(189),function(e){function t(){var e,a;Object(u.a)(this,t);for(var n=arguments.length,o=new Array(n),c=0;c<n;c++)o[c]=arguments[c];return(a=Object(d.a)(this,(e=Object(h.a)(t)).call.apply(e,[this].concat(o)))).state={unit:0},a.getCanvas=r.a.createRef(),a.setCanvasSize=function(){var e;e=window.innerWidth>1024?Math.round(.022*window.innerWidth):window.innerWidth>720?Math.round(.033*window.innerWidth):Math.round(.04*window.innerWidth),a.setState({unit:e})},a.storeRecord=function(e,t){if(localStorage.rankingData&&re().name){var n=function(e){return e<10?"0".concat(e):e},r=new Date,o="".concat(r.getFullYear(),"/").concat(n(r.getMonth()+1),"/").concat(n(r.getDate())," ").concat(n(r.getHours()),":").concat(n(r.getMinutes())),c={name:re().name,rank:re().rank,score:re().score,time:o};a.props.storeRecordToDB(e,t,c)}},a}return Object(p.a)(t,e),Object(m.a)(t,[{key:"componentWillMount",value:function(){this.setCanvasSize()}},{key:"componentDidMount",value:function(){var e=this,t=this.props,a=t.match,n=t.location,r=t.fetchPlayingSongData,o=t.setInGameState,c=t.fetchRankingRecord,i=a.params.id,l=n.search.slice(1);r(i,l),c(i,l),function(e){var t=document.querySelector("#game-canvas").getContext("2d"),a=18*e,n=13*e;t.line=function(e,a,n,r,o){t.beginPath(),t.moveTo(e.x,e.y),t.lineTo(a.x,a.y),t.strokeStyle=n,t.shadowBlur=60,t.shadowColor=r,t.lineWidth=o,t.stroke()};for(var r=0;r<5;r++)t.line({x:(r+7)*e,y:0},{x:18*e/4*r,y:13*e},"#000",null,1);t.beginPath(),t.moveTo(7*e,0),t.lineTo(11*e,0),t.lineTo(18*e,13*e),t.lineTo(0,13*e),t.closePath(),t.fillStyle="rgba(0,0,0,.8)",t.fill(),t.line({x:.5*e,y:12*e},{x:17.5*e,y:12*e},"rgba(142, 226, 163, 0.8)",null,2),t.save(),t.beginPath(),t.translate(a/2,n/2),t.textAlign="center",t.font="".concat(e,"px Courier New"),t.fillStyle="#fff",t.fillText("Click to Start",0,0),t.restore()}(this.state.unit);this.getCanvas.current.addEventListener("click",function t(){return o(!0),e.getCanvas.current.removeEventListener("click",t),!1})}},{key:"componentDidUpdate",value:function(){var e=this,t=this.props,a=t.game,n=t.match,r=t.location,o=t.setGameFinishState,c=t.auth,i=n.params.id,l=r.search.slice(1);if("error"===a.playingSongData&&function(e){var t=document.querySelector("#game-canvas").getContext("2d");t.clearRect(0,0,18*e,13*e),t.rect(0,0,18*e,13*e),t.fillStyle="#1d1d1d",t.fill();var a=18*e,n=13*e;t.save(),t.beginPath(),t.translate(a/2,n/2),t.textAlign="center",t.font="".concat(e,"px Courier New"),t.fillStyle="#fff",t.fillText("Coming Soon...",0,0),t.restore()}(this.state.unit),a.inGame&&a.playingSongData.audio&&!a.gameFinish){var s={name:c.name,total:0,hit:0,miss:0,combo:0,score:0};localStorage.setItem("rankingData",JSON.stringify(s)),this.stopGame=ce(this.state.unit,a.playingSongData.beatData,a.playingSongData.audio,a.playingSongData.offset,l),a.playingSongData.audio.addEventListener("ended",function(){var t=re().score;e.stopGame(),o(!0),ne(e.state.unit,t),e.storeRecord(i,l),e.getCanvas.current.addEventListener("click",function(){window.location.hash="#/ranking/".concat(n.params.id).concat(r.search)})})}}},{key:"componentWillUnmount",value:function(){var e=this.props,t=e.setInGameState,a=e.setGameFinishState,n=e.game;t(!1),a(!1),n.inGame&&"error"!==n.playingSongData&&this.stopGame()}},{key:"render",value:function(){var e=this.state.unit,t={margin:"".concat(13*e+31,"px 0 0 0"),width:"".concat(18*e+1,"px")},a=this.props.ranking;return r.a.createElement("div",{className:"game-view"},r.a.createElement("div",{className:"game-wrap"},r.a.createElement("div",{className:"battle"},r.a.createElement(q,{record:a.record}),r.a.createElement(K,null)),r.a.createElement("div",{className:"canvas-wrap"},r.a.createElement(Z,{width:18*e,height:13*e}),r.a.createElement(J,{width:18*e,height:13*e,getCanvas:this.getCanvas})),r.a.createElement("div",{className:"game-buttons",style:t},r.a.createElement("div",{className:"game-btn btn-d"},"D"),r.a.createElement("div",{className:"game-btn btn-f"},"F"),r.a.createElement("div",{className:"game-btn btn-k"},"K"),r.a.createElement("div",{className:"game-btn btn-l"},"L"))))}}]),t}(r.a.Component)),le=Object(i.b)(function(e){return{game:e.game,auth:e.auth,ranking:e.ranking}},{setInGameState:function(e){return{type:"SET_IN_GAME_STATE",payload:e}},fetchPlayingSongData:function(e,t){return function(a){var n={};V.collection("songList").doc(e).collection("gameData").get().then(function(e){e.forEach(function(e){n=Object.assign({audio:new Audio(e.data().url),beatData:JSON.parse(e.data()[t]),offset:e.data().offset}),a({type:"FETCH_PLAYING_SONG_DATA",payload:n})})}).catch(function(e){console.log("Error getting documents: ",e),a({type:"FETCH_PLAYING_SONG_DATA",payload:"error"})})}},setGameFinishState:function(e){return{type:"SET_GAME_FINISH_STATE",payload:e}},storeRecordToDB:function(e,t,a){return function(n){V.collection("songList").doc(e).collection(t).add(a).then(function(){n({type:"STORE_RECORD"})}).catch(function(e){console.log(e.message)})}},fetchRankingRecord:X})(ie),se=function(e){return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"current-ranking"},r.a.createElement("div",{className:"current-ranking-row"},r.a.createElement("div",null,"TotalNotes"),r.a.createElement("div",null," ",re().total)),r.a.createElement("div",{className:"current-ranking-row"},r.a.createElement("div",null,"HIT"),r.a.createElement("div",null," ",re().hit)),r.a.createElement("div",{className:"current-ranking-row"},r.a.createElement("div",null,"MISS"),r.a.createElement("div",null," ",re().miss)),r.a.createElement("div",{className:"current-ranking-row"},r.a.createElement("div",null,"SCORE"),r.a.createElement("div",null," ",re().score)),r.a.createElement("div",{className:"current-ranking-row"},r.a.createElement("div",null,"ACCURATE"),r.a.createElement("div",null," ",re().accurate," %")),r.a.createElement("div",{className:"current-ranking-row"},r.a.createElement("div",null,"RANK"),r.a.createElement("div",null," ",re().rank))))},ue=function(e){function t(){return Object(u.a)(this,t),Object(d.a)(this,Object(h.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(m.a)(t,[{key:"render",value:function(){return r.a.createElement(r.a.Fragment,null,this.props.rankingRecord.map(function(e){return r.a.createElement("div",{className:"record-board",key:e.id},r.a.createElement("div",{className:"record-item"}," ",e.data.name),r.a.createElement("div",{className:"record-item"}," ",e.data.score),r.a.createElement("div",{className:"record-item"}," ",e.data.rank),r.a.createElement("div",{className:"record-item"}," ",e.data.time))}))}}]),t}(r.a.Component),me=(a(190),function(e){function t(){return Object(u.a)(this,t),Object(d.a)(this,Object(h.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(m.a)(t,[{key:"componentDidMount",value:function(){localStorage.rankingData||(window.location.hash="#/");var e=this.props,t=e.match,a=e.location,n=e.fetchRankingRecord,r=a.search.slice(1);""!==r&&n(t.params.id,r)}},{key:"componentWillUnmount",value:function(){localStorage.removeItem("rankingData")}},{key:"render",value:function(){return r.a.createElement("div",{className:"ranking-view"},r.a.createElement("div",{className:"ranking-wrap"},localStorage.rankingData?r.a.createElement(se,null):null,r.a.createElement("div",{className:"record"},r.a.createElement("div",{className:"record-board title"},r.a.createElement("div",{className:"record-item"}," Name"),r.a.createElement("div",{className:"record-item"}," Score"),r.a.createElement("div",{className:"record-item"}," Rank"),r.a.createElement("div",{className:"record-item"}," Date")),r.a.createElement(ue,{rankingRecord:this.props.ranking.record}))))}}]),t}(r.a.Component)),de=Object(i.b)(function(e){return{rankingData:e.rankingData,auth:e.auth,ranking:e.ranking}},{fetchRankingRecord:X})(me),he=function(e){function t(){return Object(u.a)(this,t),Object(d.a)(this,Object(h.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(m.a)(t,[{key:"render",value:function(){return r.a.createElement(f.a,null,r.a.createElement(T,null),r.a.createElement(P,null),r.a.createElement("div",null,r.a.createElement(g.a,{path:"/",exact:!0,component:H}),r.a.createElement(g.a,{path:"/select",component:Q}),r.a.createElement(g.a,{path:"/game/:id",component:le}),r.a.createElement(g.a,{path:"/ranking/:id",component:de})))}}]),t}(n.Component),pe=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"FETCH_SONG_LIST":return t.payload;default:return e}},fe=a(7),ge={loginForm:!1,signUpForm:!1,mobileButtons:!1},be=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:ge,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SHOW_LOGIN_FORM":return Object(fe.a)({},e,{loginForm:t.payload});case"SHOW_SIGNUP_FORM":return Object(fe.a)({},e,{signUpForm:t.payload});case"SHOW_MOBILE_BUTTONS":return Object(fe.a)({},e,{mobileButtons:t.payload});case"LOGIN_SUCCESS":return Object(fe.a)({},e,{loginForm:!1});case"SIGH_UP_SUCCESS":return Object(fe.a)({},e,{signUpForm:!1});default:return e}},Ee={authError:null,uid:null,name:null},ve=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Ee,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"LOGIN_ERROR":return Object(fe.a)({},e,{authError:"Login Failed"});case"LOGIN_SUCCESS":return e;case"SIGH_UP_SUCCESS":return Object(fe.a)({},e,{authError:null});case"SIGH_UP_ERROR":return Object(fe.a)({},e,{authError:t.payload});case"LOGOUT_SUCCESS":return Object(fe.a)({},e,{name:null});case"FETCH_USER_UID":return Object(fe.a)({},e,{uid:t.payload});case"FETCH_USER_NAME":return Object(fe.a)({},e,{name:t.payload});case"SHOW_LOGIN_FORM":case"SHOW_SIGNUP_FORM":return Object(fe.a)({},e,{authError:null});default:return e}},ye={record:[]},Se=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:ye,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"FETCH_RANKING_RECORD":return Object(fe.a)({},e,{record:t.payload});default:return e}},Oe={inGame:!1,playingSongData:null,gameFinish:!1},we=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Oe,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SET_IN_GAME_STATE":return Object(fe.a)({},e,{inGame:t.payload});case"FETCH_PLAYING_SONG_DATA":return Object(fe.a)({},e,{playingSongData:t.payload});case"SET_GAME_FINISH_STATE":return Object(fe.a)({},e,{gameFinish:t.payload});default:return e}},Ae=Object(l.c)({auth:ve,showing:be,songList:pe,game:we,ranking:Se}),Ne=Object(l.d)(Ae,Object(l.a)(s.a));c.a.render(r.a.createElement(i.a,{store:Ne},r.a.createElement(he,null)),document.getElementById("root"))},89:function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAQAAAAAYLlVAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAKqNIzIAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAAHdElNRQfjBQEOGipNUDWeAAAAzElEQVRo3u3YPQ5BURCG4fegQbTYALUrsQIhEdthA9bjLwoKomcBJCo01FfQkKuwiO8W33MWMDNnppgMmJmJBSBHnbwg9psTH2hyJRG9C1FgT0vYgV0gpiRMIM6wFYaHLVSYEEsmIGZMWVq+mZlZKgSgT5uiIPaTDUsYyjbChIRB4EZV2IF7hkQYHr5ZAl1hAqMA9OiIhnDNSli8mZlZalSZ8ZCsYw+mVGAh3QnnKTjTHaUDcICIi6wBZxr/Y3WNgqD6Fye+0v83MwP4AccbjaeK1AN/AAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE5LTA1LTAxVDEyOjI2OjQyKzAyOjAwVQ1LxwAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxOS0wNS0wMVQxMjoyNjo0MiswMjowMCRQ83sAAAAZdEVYdFNvZnR3YXJlAHd3dy5pbmtzY2FwZS5vcmeb7jwaAAAAAElFTkSuQmCC"},91:function(e,t,a){e.exports=a(191)}},[[91,1,2]]]);
//# sourceMappingURL=main.5524982d.chunk.js.map