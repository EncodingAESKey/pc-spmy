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
/////////////////////////////结算
var main_center = document.getElementsByClassName("main_center")[0];
var main_centerUl = main_center.getElementsByTagName("ul")[0];
var flag= false;
showCart();
function showCart(){
	var str = document.cookie;
	var arr = str.split("; ")
	var l = arr.length;
	main_centerUl.style.padding = "10px";
	main_centerUl.style.background = "white";
	var sum = 0; 	//商品总数；
	var zJ = 0;
	var sP = 0;
	for(var i=0;i<l;i++){
		var col = arr[i].split("=");
		if(/^g/.test(col[0])){
			flag = true;
			var obj = JSON.parse(decodeURIComponent(col[1]));
			var li = document.createElement("li");
			main_centerUl.appendChild(li);
			var input1 = document.createElement("input");
			li.appendChild(input1);
			input1.type = "checkbox";
			zj.innerHTML = "￥"+zJ;
			sp.innerHTML = sP;
			input1.onclick = function(){
				if(this.checked){
					zJ += Number(this.parentNode.children[3].children[1].children[1].value*this.parentNode.children[3].children[0].innerHTML.replace("￥",""));
					zj.innerHTML = "￥"+zJ;
					sP += Number(this.parentNode.children[3].children[1].children[1].value);
					sp.innerHTML = sP;
				}else{
					zJ -= Number(this.parentNode.children[3].children[1].children[1].value*this.parentNode.children[3].children[0].innerHTML.replace("￥",""));
					zj.innerHTML = "￥"+zJ;
					sP -= Number(this.parentNode.children[3].children[1].children[1].value);
					sp.innerHTML = sP;
				}
			}
			var img = document.createElement("img");
			img.src = obj.img;
			li.appendChild(img);
			var a = document.createElement("a");
			li.appendChild(a);
			a.innerHTML = obj.title;
			var div1 = document.createElement("div")
			li.appendChild(div1);
			var span1 = document.createElement("span");
			div1.appendChild(span1);
			span1.innerHTML = "￥"+obj.price;
			var div = document.createElement("div");
			div1.appendChild(div);
			var input2 = document.createElement("input");
			div.appendChild(input2);
			input2.type = "button";
			input2.value = "-";
			var input3 = document.createElement("input");
			div.appendChild(input3);
			input3.type = "text";
			input3.value = obj.a;
			var input4 = document.createElement("input");
			div.appendChild(input4);
			input4.type = "button";
			input4.value = "+";
			///////////////数量加减
			li.lay = obj;
			input2.onclick = function(){
				if(this.nextSibling.value == 1){
				}else{
					this.nextSibling.value = Number(this.nextSibling.value) - 1;
					var obj = this.parentNode.parentNode.parentNode.lay;
					obj.a = this.nextSibling.value;
					setCookie("g"+obj.id,JSON.stringify(obj),10);
					this.parentNode.nextSibling.innerHTML =  "￥"+Number(this.nextSibling.value*this.parentNode.previousSibling.innerHTML.replace("￥","")).toFixed(1);
					if(this.parentNode.parentNode.parentNode.children[0].checked){
						zJ -= Number(this.parentNode.previousSibling.innerHTML.replace("￥","")).toFixed(1);
						zj.innerHTML = "￥"+zJ;
						sP = sP-1;
						sp.innerHTML = sP;
					}
				}
			}
			input3.onchange = function(){
				this.value = Number(this.value) + 1;
				var obj = this.parentNode.parentNode.parentNode.lay;
				obj.a = this.value;
				setCookie("g"+obj.id,JSON.stringify(obj),10);
				this.parentNode.nextSibling.innerHTML = "￥"+Number(this.value*this.parentNode.previousSibling.innerHTML.replace("￥","")).toFixed(1);
//				if(this.parentNode.parentNode.parentNode.children[0].checked){
//						zJ = Number(this.value*this.parentNode.previousSibling.innerHTML.replace("￥","")).toFixed(1);
//						zj.innerHTML = "￥"+zJ;
//						sP = Number(this.value);
//						sp.innerHTML = sP;
//				}
			}
			input4.onclick = function(){
				this.previousSibling.value = Number(this.previousSibling.value) + 1;
				var obj = this.parentNode.parentNode.parentNode.lay;
				obj.a = this.previousSibling.value;
				setCookie("g"+obj.id,JSON.stringify(obj),10);
				this.parentNode.nextSibling.innerHTML = "￥"+Number(this.previousSibling.value*this.parentNode.previousSibling.innerHTML.replace("￥","")).toFixed(1);
				if(this.parentNode.parentNode.parentNode.children[0].checked){
						zJ = (Number(zJ)+Number(this.parentNode.previousSibling.innerHTML.replace("￥",""))).toFixed(1);
						zj.innerHTML = "￥"+zJ;
						sP = Number(sP+1);
						sp.innerHTML = sP;
				}
			}
			var span2 = document.createElement("span");
			div1.appendChild(span2);
			span2.innerHTML = "￥"+Number(input3.value*obj.price).toFixed(1);
			var span3 = document.createElement("span");
			div1.appendChild(span3);
			span3.innerHTML = "删除";
			///////////////移除
			span3.onclick = function(){
				var obj = this.parentNode.parentNode.lay;
				main_centerUl.removeChild(this.parentNode.parentNode);
				setCookie("g"+obj.id,"",-1);
				var lis = main_centerUl.children;
				var lisL = lis.length;
				if(lisL == 0){						
					main_center.style.height="540px";
					main_center.innerHTML = "";
					main_center.style.textAlign = "center";
					var div = document.createElement("div");
					main_center.appendChild(div);
					div.style.width = "400px";
					div.style.display = "inline-block";
					div.style.marginTop = "150px";
					var i = document.createElement("i");
					div.appendChild(i);
					i.style.background = "url(img/index.png)";
					i.style.backgroundPosition = "-100px -923px";
					i.style.width = "48px";
					i.style.height = "48px";
					i.style.float = "left";
					i.style.marginRight = "20px";
					var span = document.createElement("span");
					span.innerHTML = "您的购物车是空的，去挑选喜欢的商品吧!";
					div.appendChild(span);
					span.style.float = "left";
					span.style.marginBottom = "15px";
					var a = document.createElement("a");
					a.innerHTML = "继续购物>";
					a.style.color = "#e5004b";
					a.style.fontSize = "14px";
					a.style.float = "left";
					a.style.cursor = "pointer";
					a.href = "index.html"; 
					div.appendChild(a);
				}
			}

		}
	}
	 if(flag == false){
		main_center.style.height="540px";
		main_center.innerHTML = "";
		main_center.style.textAlign = "center";
		var div = document.createElement("div");
		main_center.appendChild(div);
		div.style.width = "400px";
		div.style.display = "inline-block";
		div.style.marginTop = "150px";
		var i = document.createElement("i");
		div.appendChild(i);
		i.style.background = "url(img/index.png)";
		i.style.backgroundPosition = "-100px -923px";
		i.style.width = "48px";
		i.style.height = "48px";
		i.style.float = "left";
		i.style.marginRight = "20px";
		var span = document.createElement("span");
		span.innerHTML = "您的购物车是空的，去挑选喜欢的商品吧!";
		div.appendChild(span);
		span.style.float = "left";
		span.style.marginBottom = "15px";
		var a = document.createElement("a");
		a.innerHTML = "继续购物>";
		a.style.color = "#e5004b";
		a.style.fontSize = "14px";
		a.style.float = "left";
		a.style.cursor = "pointer";
		a.href = "index.html"; 
		div.appendChild(a);
	}
	all.children[0].onclick = function (){		///////全选
		var lis = main_centerUl.children;
		var lisL = lis.length;
		var b = this.checked;
		for(var i=0;i<lisL;i++){
			var li = lis[i];
			li.children[0].checked=b;
//			if(li.children[0].checked == true){
//				checkDel.onclick = function(){
//					main_centerUl.removeChild(li);
//				}
//			}
			if(b==true){
				zJ +=parseInt(li.children[3].children[2].innerHTML.replace("￥",""));
				sP +=parseInt(li.children[3].children[1].children[1].value);	
			}else{
				zJ -=parseInt(li.children[3].children[2].innerHTML.replace("￥",""));
				sP -=parseInt(li.children[3].children[1].children[1].value);
			}
		}
		if(b==true){
			b = false;
		}
		zj.innerHTML = "￥"+zJ;
		sp.innerHTML = sP;
	}
		
//	clearAll.onclick = function(){
//		var lis = main_centerUl.children;
//		var lisL = lis.length;
//			if(confirm("是否确定清空购物车？")){
//				for(var i=0;i<lisL;i++){
//				var li = lis[i];
//				main_centerUl.removeChild(li);
//			}
//		}
//	}
}
//////////////////////////////////登录、注册
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