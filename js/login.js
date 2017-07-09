
var loginBox_titleA = document.getElementsByClassName("loginBox_title")[0].children[1];
var registerBox_titleA = document.getElementsByClassName("registerBox_title")[0].children[1];
var loginBox = loginBox_titleA.parentNode.parentNode;
var registerBox = registerBox_titleA.parentNode.parentNode;
var head_centerH = document.getElementsByClassName("head_center")[0].children[1];
loginBox_titleA.onclick = function(){
	startMove(registerBox,{opacity:100,right:40});
	startMove(loginBox,{opacity:0,right:-500});
	head_centerH.innerHTML = "欢迎注册";
	document.title = "欢迎注册";
}
registerBox_titleA.onclick = function(){
	startMove(registerBox,{opacity:0,right:390});
	startMove(loginBox,{opacity:100,right:40});
	head_centerH.innerHTML = "欢迎登录";
	document.title = "欢迎登录";
}
var indexRegister = getCookie("register");
if(indexRegister == ""){	
}else{
	startMove(registerBox,{opacity:100,right:40});
	startMove(loginBox,{opacity:0,right:-500});
	head_centerH.innerHTML = "欢迎注册";
	document.title = "欢迎注册";
}
///////////////////////////托块
var loginMove = document.getElementsByClassName("move")[0];
var loginBoxmove = loginMove.parentNode;
var yanZhen = false;
loginMove.onmousedown = function(event){
	event = event || window.event;
	var x = event.clientX - this.offsetLeft;
	document.onmousemove = function(event){
		var _x = event.clientX - x;
		if(_x < 3) _x = 3;
		if(_x > (loginBoxmove.offsetWidth-loginMove.offsetWidth-3))_x = (loginBoxmove.offsetWidth-loginMove.offsetWidth-3);
		loginMove.style.left = _x+"px";
		if(_x == (loginBoxmove.offsetWidth-loginMove.offsetWidth-3)){
			loginBoxmove.style.background = "rgb(166, 230, 154)";
			loginBoxmove.innerHTML = "验证通过"
			yanZhen = true;
		}
	}
	document.onmouseup = function(){
		document.onmousemove = null;
		document.onmouseup = null;
	}
}
///////////////////////////注册php反馈
var registerBox_showI1 = document.getElementsByClassName("registerBox_show")[0].children[0];
var registerBox_showI2 = document.getElementsByClassName("registerBox_show")[0].children[1];
var registerBox_showI3 = document.getElementsByClassName("registerBox_show")[0].children[2];
var registerBox_showI4 = document.getElementsByClassName("registerBox_show")[0].children[3];
var registerBox_showSpan1 = document.getElementsByClassName("registerBox_show")[0].children[4];
var registerBox_showSpan2 = document.getElementsByClassName("registerBox_show")[0].children[5];
var registerBox_showSpan3 = document.getElementsByClassName("registerBox_show")[0].children[6];
var registerBox_showSpan4 = document.getElementsByClassName("registerBox_show")[0].children[7];
var registerBox_btn = document.getElementsByClassName("registerBox_btn")[0];
var registerBox_chkInput2 = document.getElementsByClassName("registerBox_chk")[0].children[2];
var one = false;
var two = false;
var three = false;
var four = false;
registerBox_btn.onclick = function(){
	var arr = [phoneCode,picCode,pass,username];
	var l = arr.length;
	for(var i=0;i<l;i++){
		var a = arr[i];
		if(a.value == ""){
			a.focus();
			a.style.border = "1px solid #e5004b";
		}else{
			a.style.border = "1px solid #F9F9F9";
		}
	}
	check(1);
	if(one == true && two == true && three == true && four ==true){
		var aa = username.value;
		var bb = pass.value;
		var url = "js/ckeck.php";
		$.post(url,{"ac":0,"username":aa,"password":bb},function(str){
			var obj = JSON.parse(str);
			if(obj.state == "error"){
				registerBox_showSpan4.innerHTML = obj.text;
				registerBox_showI4.style.display = "block";
			}else{
				registerBox_showSpan4.innerHTML = "";
				registerBox_showI4.style.display = "none";
				location.href = "login.html";
				setCookie("register","",-1);
			}
		})
		
		
	}
} 
registerBox_chkInput2.onclick = function(){
	if(one == true && two == true && three == true){
		this.value = (parseInt(Math.random()*9000)+1000);
		this.style.background = "#333";
	}else{
		check(0);
	}
};	
function check(e){
		if(e == 1){
			if(username.value =="" || pass.value =="" || picCode.value ==""){
			}else{
				if( /^1\d{10}$/.test(username.value) || /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(username.value)){
					registerBox_showI4.style.display = "none";
					registerBox_showSpan4.innerHTML = "";
					registerBox_showSpan4.style.background = "";
					username.style.border = "1px solid #F9F9F9";
					one = true;
				}else{
					registerBox_showI4.style.display = "block";
					registerBox_showSpan4.innerHTML = "您输入的用户格式不正确";
					registerBox_showSpan4.style.background = "#fff";
					username.style.border = "1px solid #e5004b";
					one = false;
				}
				if( /^[a-z0-9_-]{6,16}$/.test(pass.value)){
					registerBox_showI3.style.display = "none";
					registerBox_showSpan3.innerHTML = "";
					registerBox_showSpan3.style.background = "";
					pass.style.border = "1px solid #F9F9F9";
					two = true;
				}else{
					registerBox_showI3.style.display = "block";
					registerBox_showSpan3.innerHTML = "请输入6-16位字符，必须包含英文字母和数字";
					registerBox_showSpan3.style.background = "#fff";
					pass.style.border = "1px solid #e5004b";
					two = false;
				}
				if(picCode.value == "jaej" || picCode.value == "JAEJ"){
					registerBox_showI2.style.display = "none";
					registerBox_showSpan2.innerHTML = "";
					registerBox_showSpan2.style.background = "";
					picCode.style.border = "1px solid #F9F9F9";
					three = true;
				}else{
					registerBox_showI2.style.display = "block";
					registerBox_showSpan2.innerHTML = "验证码有误";
					registerBox_showSpan2.style.background = "#fff";
					picCode.style.border = "1px solid #e5004b";
					three = false;
				}
				if(phoneCode.value == registerBox_chkInput2.value){
					registerBox_showI1.style.display = "none";
					registerBox_showSpan1.innerHTML = "";
					registerBox_showSpan1.style.background = "";
					phoneCode.style.border = "1px solid #F9F9F9";
					four = true;
				}else{
					registerBox_showI1.style.display = "block";
					registerBox_showSpan1.innerHTML = "验证码有误";
					registerBox_showSpan1.style.background = "#fff";
					phoneCode.style.border = "1px solid #e5004b";
					four = false;
				}
			}
		}else{
			if(username.value =="" || pass.value =="" || picCode.value ==""){
			}else{
				if( /^1\d{10}$/.test(username.value) || /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(username.value)){
					registerBox_showI4.style.display = "none";
					registerBox_showSpan4.innerHTML = "";
					registerBox_showSpan4.style.background = "";
					username.style.border = "1px solid #F9F9F9";
					one = true;
				}else{
					registerBox_showI4.style.display = "block";
					registerBox_showSpan4.innerHTML = "您输入的用户格式不正确";
					registerBox_showSpan4.style.background = "#fff";
					username.style.border = "1px solid #e5004b";
					one = false;
				}
				if( /^[a-z0-9_-]{6,16}$/.test(pass.value)){
					registerBox_showI3.style.display = "none";
					registerBox_showSpan3.innerHTML = "";
					registerBox_showSpan3.style.background = "";
					pass.style.border = "1px solid #F9F9F9";
					two = true;
				}else{
					registerBox_showI3.style.display = "block";
					registerBox_showSpan3.innerHTML = "请输入6-16位字符，必须包含英文字母和数字";
					registerBox_showSpan3.style.background = "#fff";
					pass.style.border = "1px solid #e5004b";
					two = false;
				}
				if(picCode.value == "jaej" || picCode.value == "JAEJ"){
					registerBox_showI2.style.display = "none";
					registerBox_showSpan2.innerHTML = "";
					registerBox_showSpan2.style.background = "";
					picCode.style.border = "1px solid #F9F9F9";
					three = true;
				}else{
					registerBox_showI2.style.display = "block";
					registerBox_showSpan2.innerHTML = "验证码有误";
					registerBox_showSpan2.style.background = "#fff";
					picCode.style.border = "1px solid #e5004b";
					three = false;
				}
			}
	}
}	
//////////////////登录反馈
var loginBox_btn = document.getElementsByClassName("loginBox_btn")[0];
var loginBox_showSpan = document.getElementsByClassName("loginBox_show")[0].children[1];
var loginBox_showI = document.getElementsByClassName("loginBox_show")[0].children[0];
loginBox_btn.onclick = function(){
	if(loginPass.value == "" || loginUser.value == ""){
		if(loginPass.value == ""){
			loginPass.focus();
			loginPass.style.border = "1px solid #e5004b";
		}else{
			loginPass.style.border = "1px solid #f9f9f9";
		}
		if(loginUser.value == ""){
			loginUser.focus();
			loginUser.style.border = "1px solid #e5004b";
		}else{
			loginUser.style.border = "1px solid #f9f9f9";
		}
	}else{
		if(yanZhen == false){
			loginBox_showSpan.innerHTML = "请将滑块拖到右边，解锁登录。"
			loginBox_showI.style.display = "block";
		}else{
			loginBox_showSpan.innerHTML = ""
			loginBox_showI.style.display = "none";
		}	
	}
	if(loginPass.value != "" && loginUser.value != "" && yanZhen == true){
		var loginU = loginUser.value;
		var loginP = loginPass.value;
		var url1 = "js/ckeck.php";
		$.post(url1,{"ac":1,"username":loginU,"password":loginP},function(str){
			var obj = JSON.parse(str);
			if(obj.state == "success"){
				location.href = "index.html";
				loginBox_showSpan.innerHTML = ""
				loginBox_showI.style.display = "none";
				loginPass.style.border = "1px solid #f9f9f9";
				loginUser.style.border = "1px solid #f9f9f9";
				setCookie("success",loginU,1);
			}else{
				loginBox_showSpan.innerHTML = "用户名或密码错误"
				loginBox_showI.style.display = "block";
				loginPass.style.border = "1px solid #e5004b";
				loginUser.style.border = "1px solid #e5004b";
			}
		});
	}
}
