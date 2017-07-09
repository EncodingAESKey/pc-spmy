//////////////////// head 隐藏
var own = document.getElementById("own");
var phone = document.getElementById("phone");
var tel = document.getElementById("tel");
var head_center = document.getElementsByClassName("head_center")[0]; 
var ownLi = head_center.children[1].children[2];
var phoneLi = head_center.children[1].children[3];
var telLi = head_center.children[1].children[5];
function hide( bl,no ){
	bl.onmouseover = function(){
		no.style.display = "block";	
		no.style.zIndex = "3";	
	}
	no.onmouseover = function(){
		no.style.display = "block";	
		no.style.zIndex = "3";	
	}
	bl.onmouseout = function(){
		no.style.display = "none";	
	}
	no.onmouseout = function(){
		no.style.display = "none";	
	}
}
hide(ownLi,own);
hide(phoneLi,phone);
hide(telLi,tel);
///////////////// menu
var navMenu = document.getElementsByClassName("navMenu")[0];
var navlis = navMenu.children[0].children;
var l = navlis.length;
for(var i=0;i<l;i++){
	var li = navlis[i];
	li.onmouseover = function(){
		this.children[0].style.background = "white";
		this.children[0].children[0].style.backgroundPositionX = "-35px";
		this.children[0].children[1].style.color = "#E40149";
		this.children[1].style.display = "block";
	}
	li.onmouseout = function(){
		this.children[0].style.background = "";
		this.children[0].children[0].style.backgroundPositionX = "";
		this.children[0].children[1].style.color = "";
		this.children[1].style.display = "none";
	}
}
/////////////////////banner轮播
var banner = document.getElementsByClassName("banner")[0];
var spanL = banner.children[2].children[1];
var spanR = banner.children[2].children[0];
var ullis = banner.children[0].children;
var ollis = banner.children[1].children;
var l = ullis.length;
var a = 0;
ban();
for(var i=0;i<l;i++){
	var olli = ollis[i];
	olli.index = i;
	olli.onmouseover = function(){
		a = this.index;
		ban();
	}
}
function ban(){
	if(a==l){
		a=0;
	}else if(a==-1){
		a=l-1;
	}
	for(var i=0;i<l;i++){
		ollis[i].style.background = "";
		ollis[i].style.opacity = "0.3";
		startMove(ullis[i],{opacity:0});
		ullis[i].style.zIndex = "0";
	}
	ollis[a].style.background = "#E40149";
	ollis[a].style.opacity = "0.8";
	startMove(ullis[a],{opacity:100});
	ullis[a].style.zIndex = "1";
}
function next(){
	a++;
	ban();
}
spanL.onclick = function(){
	a--;
	ban();
}
spanR.onclick = function(){
	a++;
	ban();
}

var timer = setInterval(next,3000);
banner.onmouseover = function(){
	clearInterval(timer);
}
banner.onmouseout = function(){
	timer = setInterval(next,3000);
}
/////////////////////1F轮播
var firstFloor_luns = document.getElementsByClassName("firstFloor_lun");
var lunLefts = document.getElementsByClassName("firstFloor_lunLeft");
var lunRights = document.getElementsByClassName("firstFloor_lunRight");
var fFUls = document.getElementsByClassName("fFUl");
for(var i=0;i<l;i++){
	var firstFloor_lun = firstFloor_luns[i];
	var lunLeft = lunLefts[i];
	var lunRight = lunRights[i];
	var fUl = fFUls[i];
	var fLis = fUl.children;
	var flisL = fLis.length;
	var num=0;
	floorLun(firstFloor_lun,lunLeft,lunRight,fUl,flisL,num);
}
function floorLun(a,b,c,d,e,f){
	function flisNum(){
		if(f==e){
			f=0;
			startMove(d,{left:(e-1)*-132}, function(){
				d.style.left = "0px";
			});
		}else if(f==-1){
			f=8;
			d.style.left = "-1056px";
			startMove(d,{left:7*-132});
		}else{
			startMove(d,{left:f*-132})
		}
	}
	function flisNum2(){
		f++;
		flisNum();
	}
	b.onclick = function(){
		f--;
		flisNum();
	}
	c.onclick = function(){
		f++;
		flisNum();
	}
	var timer2 = setInterval(flisNum2,2000);
	b.onmouseover = function(){
		clearInterval(timer2);
	}
	c.onmouseover = function(){
		clearInterval(timer2);
	}
	b.onmouseout = function(){
		timer2 = setInterval(flisNum,2000);
	}
	c.onmouseout = function(){
		timer2 = setInterval(flisNum,2000);
	}
	a.onmouseover = function(){
		clearInterval(timer2);
	}
	a.onmouseout = function(){
		timer2 = setInterval(flisNum,2000);
	}
};
//////////////倒计时

// var time1 = "2017/5/30 00:00:00";
// var ps = document.getElementsByClassName("ps");
// var psL = ps.length;
// setInterval(function(){
	// for(var i=0;i<psL;i++){
	// var p = ps[i];
		// p.innerHTML = "距结束 : "+dateDiff(new Date(),new Date(time1));
	// }
// },1000)
// function dateDiff(d1, d2){
	// var ms = d2.getTime() - d1.getTime();
	// return Format(ms);
// }
// function Format(ms){
	// var obj = {
		// "天" : 24*60*60*1000,
		// "时" : 60*60*1000,
		// "分" : 60*1000,
		// "秒" : 1000
	// };
	// var tmp = ms;
	// var str = "";
	// for( var i in obj ){
		// var s = Math.floor(tmp / obj[i]);
		// tmp = tmp % obj[i];
		// str += s+i;
	// }
	// return str;
// }	
////////////今日特购
var todayTime = document.getElementsByClassName("todayTime")[0];
var todaySpan1 = todayTime.children[0];
var todaySpan2 = todayTime.children[1];
var todaySpan3 = todayTime.children[2];
var time2 =  "2017/5/30 0:0:00";
setInterval(function(){
	var aa = dateDiff(new Date(),new Date(time2));
	var a1 = aa.replace(/\D/g,",");
	var arr = a1.split(",");
	if(arr[1].length == 1){
		todaySpan1.innerHTML = "0"+arr[1];
	}else{
		todaySpan1.innerHTML = arr[1];
	}
	if(arr[2].length == 1){
		todaySpan2.innerHTML = "0"+arr[2];
	}else{
		todaySpan2.innerHTML = arr[2];
	}
	if(arr[3].length == 1){
		todaySpan3.innerHTML = "0"+arr[3];
	}else{
		todaySpan3.innerHTML = arr[3];
	}
},1000)
////////////////////商品总数
var cartNum = document.getElementsByClassName("cartNum")[0];

showCart()
function showCart(){
	var arrStr = document.cookie.split("; ");
	var l = arrStr.length;
	var sum = 0; 	//商品总数；
	for(var i=0;i<l;i++){
		var col = arrStr[i].split("=");
		if(/^g/.test(col[0])){
			var obj = JSON.parse(decodeURIComponent(col[1]));
			sum = sum + Number(obj.a);
		}
		cartNum.innerHTML = sum;
	}
}
////////////////////////////////登录、注册
registerA.onclick = function(){
	setCookie("register","1",1);
}
loginA.onclick = function(){
	setCookie("register","",-1);
}
////////////////////////////////切换头部
var head_centerUlli1 = head_center.children[0].children[0];
var head_centerUlli2 = head_center.children[0].children[1];
var head_centerUlli3 = head_center.children[0].children[2];
var loginCookie = getCookie("success");
if(loginCookie == ""){
}else{
	head_centerUlli1.innerHTML = "Hi <a href='#'>"+loginCookie+" </a>欢迎来到速普商城！";
	head_centerUlli2.innerHTML = "[ <a href='#'> 退出 </a>]";
	head_centerUlli3.innerHTML = "";
	head_centerUlli2.children[0].onclick = function(){
		setCookie("success","",-1);
		location.href = "index.html";
	}
}
//////////////////////////////////