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
	}
	no.onmouseover = function(){
		no.style.display = "block";	
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
var nav_center = document.getElementsByClassName("nav_center")[0];
var navDiv = nav_center.children[0];
var navMenu = document.getElementsByClassName("navMenu")[0];
var navlis = navMenu.children[0].children;
var l = navlis.length;
navDiv.onmouseover = function(){
	navMenu.style.display = "block";
}
navDiv.onmouseout = function(){
	navMenu.style.display = "none";
}
navMenu.onmouseover = function(){
	this.style.display = "block";
}
navMenu.onmouseout = function(){
	this.style.display = "none";
}

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