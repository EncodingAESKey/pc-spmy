var mainLeft_pai = document.getElementsByClassName("mainLeft_pai")[0];
var listUl = mainLeft_pai.children[1];
var cartNum = document.getElementsByClassName("cartNum")[0];
var body = document.body;
var url = "js/comm.json";
var arrr;
ajax.get(url,function(str){
	var obj = JSON.parse(str);
	arrr = obj.list;
	var l = arrr.length;
	fuck();
	function fuck(){
	for(var i=0;i<l;i++){
		var obj = arrr[i];
		var li = document.createElement("li");
		listUl.appendChild(li);
		var a1 = document.createElement("a");
		li.appendChild(a1);
		a1.href = "show.html?id="+obj.id;
		a1.onclick = function(){
			var obj = this.parentNode.lay;
			setCookie("h"+obj.id,JSON.stringify(obj),10);
		}
		var img = document.createElement("img");
		a1.appendChild(img);
		img.src = obj.img;
		var div = document.createElement("div");
		li.appendChild(div);
		var span = document.createElement("span");
		div.appendChild(span);
		span.innerHTML = obj.huodong;
		var a = document.createElement("a");
		div.appendChild(a);
		a.innerHTML = obj.title;
		a.href = "show.html?id="+obj.id;
		a.onclick = function(){
			var obj = this.parentNode.parentNode.lay;
			setCookie("h"+obj.id,JSON.stringify(obj),10);
		}
		var div1 = document.createElement("div");
		li.appendChild(div1);
		var span1 = document.createElement("span");
		div1.appendChild(span1);
		span1.innerHTML = "￥"+obj.price;
		var s = document.createElement("s");
		div1.appendChild(s);
		s.innerHTML = "￥"+obj.sprice;
		var span2 = document.createElement("span");
		div1.appendChild(span2);
		span2.innerHTML = obj.zhekou;
		var div3 = document.createElement("div");
		li.appendChild(div3);
		var input1 = document.createElement("input");
		div3.appendChild(input1);
		input1.type = "text";
		input1.value = obj.value;
		input1.style.width = "30px";
		input1.style.height = "30px";
		var input2 = document.createElement("input");
		div3.appendChild(input2);
		input2.type = "button";
		input2.value = "+";
		////////////////
		input2.onclick = function(){
			this.previousSibling.value = Number(this.previousSibling.value) + Number(obj.value);
		}
		var input3 = document.createElement("input");
		div3.appendChild(input3);
		input3.type = "button";
		input3.value = "-";
		/////////////////
		input3.onclick = function(){
			if(this.previousSibling.previousSibling.value == 1){
			}else{
				this.previousSibling.previousSibling.value = Number(this.previousSibling.previousSibling.value) - Number(obj.value);
			}
		}
		/////////////////
		var input4 = document.createElement("input");
		li.appendChild(input4);
		input4.id = "input4";
		input4.type = "button";
		var type = obj.type;
		var flag = false;
		if(type==1){
			flag = true;
			input4.value = "加入购物车"
			li.onmouseover = function(){
				this.children[4].style.backgroundColor = "#E5004A";
				this.children[4].style.color = "white";
			}
			li.onmouseout = function(){
				this.children[4].style.backgroundColor = "";
				this.children[4].style.color = "";
			}
		}else{
			flag = false;
			input4.value = "暂时缺货中";
			input4.onclick = function(){};
			input4.style.backgroundColor = "#eaeaea";
			input4.onmouseover = function(){
				this.style.color = "#E5004A";
			}
			input4.onmouseout = function(){
				this.style.color = "";
			}
		}
		var div2 = document.createElement("div");
		li.appendChild(div2);
		div2.innerHTML = "收藏";
		li.lay = obj;
		if(flag == true){
			input4.onclick = function(){
				var lay = this.parentNode.lay;
				var a;
				var str = getCookie("g"+lay.id);
				if(str == ""){
					lay.a = 1;
					lay.sumBig = sumBig;
					setCookie("g"+lay.id,JSON.stringify(lay),10)
				}else{
					var obj = JSON.parse(str);
					obj.a = Number(obj.a)+Number(this.previousSibling.children[0].value);
					setCookie("g"+lay.id,JSON.stringify(obj),10);
				}
				var firstImg = this.parentNode.getElementsByTagName("img")[0];
				var st = document.documentElement.scrollTop || document.body.scrollTop;
				var img = document.createElement("img");
				body.appendChild(img);
				img.style.position = "absolute";
				img.style.left = this.offsetLeft+"px";
				img.style.top = this.offsetTop+200+"px";
				var targetX = cartNum.offsetLeft;
				img.src = firstImg.src;
				img.style.zIndex = "3";
				img.style.width = "60px";
				img.style.height = "60px";
				img.style.borderRadius = "50%";
				startMove(img,{left:targetX,top:0,width:0,height:0},function(){
					body.removeChild(img);
					showCart();
				});
			}
		}
		
	}
}
	sales.onclick=function(){
		createJson.innerHTML="";
		arrr.sort(function(x, y){
			return Number(x.price) < Number(y.price);
		});
		fuck();
	}
	priceSort.onclick=function(){
		createJson.innerHTML="";
		arrr.sort(function(x, y){
			return Number(x.price) < Number(y.price);
		});
		fuck();
	}
	goodSort.onclick=function(){
		createJson.innerHTML="";
		arrr.sort(function(x, y){
			return Number(x.price) < Number(y.price);
		});
		fuck();
	}
	showCart()
	function showCart(){
		var str = document.cookie;
		var arr = str.split("; ")
		var l = arr.length;
		var sum = 0; 	//商品总数；
		for(var i=0;i<l;i++){
			var col = arr[i].split("=");
			if(/^g/.test(col[0])){
				var obj = JSON.parse(decodeURIComponent(col[1]));
				sum = sum + Number(obj.a);
			}
		cartNum.innerHTML = sum;
		sumBig = sum;
		}
	}	
});
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
		location.href = "show.html";
	}
}
