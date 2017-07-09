////////////////////
var body = document.body;
var listMainTitle = document.getElementsByClassName("listMainTitle")[0];
var listMainShow_img = document.getElementsByClassName("listMainShow_img")[0];
var listMainShow_img2 = document.getElementsByClassName("listMainShow_img2")[0];
var listMainShow_items = document.getElementsByClassName("listMainShow_items")[0];
var listMainShow_kuaidi = document.getElementsByClassName("listMainShow_kuaidi")[0];
var listMainShow_title = document.getElementsByClassName("listMainShow_title")[0];
var listMainShow_price = document.getElementsByClassName("listMainShow_price")[0];
var listMainShow_num = document.getElementsByClassName("listMainShow_num")[0];
var listMainShow_cart = document.getElementsByClassName("listMainShow_cart")[0];
var cartNum = document.getElementsByClassName("cartNum")[0];
var listMainShow_itemsUl = listMainShow_items.children[1].children[0];
var listMainShow_itemsInput1 = listMainShow_items.children[0];
var listMainShow_itemsInput2 = listMainShow_items.children[2];
var listMainTitleA = listMainTitle.children[2];
var id = query("id");
var str = getCookie("h"+id);
/////////////////////商品总数
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

if(str!=""){
	var obj = JSON.parse(str);
	listMainTitleA.innerHTML = obj.title;
	//////////////////放大镜
	img1.src = obj.img;
	img1.style.width = "420px";
	img1.style.height = "420px";
	img2.src = obj.img;
	img2.style.width = "840px";
	img2.style.height = "840px";
	listMainShow_img.onmousemove = function(event){
		event = event || window.event;
		var st = document.documentElement.scrollTop || document.body.scrollTop;
		var x = event.clientX - this.offsetLeft-135;
		var y = event.clientY - this.offsetTop - glass.offsetHeight-135+st;
		if(x < 0)x=0;
		if(x > this.offsetWidth-glass.offsetWidth-2)x=this.offsetWidth-glass.offsetWidth-2;
		if(y < 0)y=0;
		if(y > this.offsetHeight-glass.offsetHeight-2)y = this.offsetHeight-glass.offsetHeight-2;
		glass.style.left=x+"px";
		glass.style.top=y+"px";
		img2.style.left=(x*-2)+"px"
		img2.style.top=(y*-2)+"px"
	}
	listMainShow_img.onmouseover = function(){
		glass.style.display = "block";
		listMainShow_img2.style.display = "block";
	}
	listMainShow_img.onmouseout = function(){
		glass.style.display = "none";
		listMainShow_img2.style.display = "none";
	}
	//////////////////更多图片
	var morePic = obj.imgs;
	var morePicL = morePic.length;
	var num = 0;
	for(var i=0;i<morePicL;i++){
		var li = document.createElement("li");
		listMainShow_itemsUl.appendChild(li);
		var img = document.createElement("img");
		li.appendChild(img);
		img.src = morePic[i];
		img.onmouseover = function(){
			img1.src = img2.src = this.src;
		}
	}
	fn();
	var lis = listMainShow_itemsUl.children;
	var lisL = lis.length;
	function fn(){
		if(num == lisL-5){
			startMove(listMainShow_itemsUl,{left:num*-76})
		}else if(num == -1){
			num=0;
			startMove(listMainShow_itemsUl,{left:0})
		}else if(num < lisL-5){
			startMove(listMainShow_itemsUl,{left:num*-76})
		}
	}
	listMainShow_itemsInput1.onclick = function(){
		num++;
		fn();
	}
	listMainShow_itemsInput2.onclick = function(){
		num--;
		fn();
	}
	//////////////////////kuaidi
	listMainShow_kuaidi.innerHTML = obj.kuaidi;
	/////////////////////huodong,title
	var listMainShow_titleSpan1 = listMainShow_title.children[0];
	var listMainShow_titleSpan2 = listMainShow_title.children[1];
	listMainShow_titleSpan1.innerHTML = obj.huodong;
	listMainShow_titleSpan2.innerHTML = obj.title;
	//////////////////////price
	var listMainShow_priceSpan1 = listMainShow_price.children[0].children[0];
	var listMainShow_priceSpan2 = listMainShow_price.children[1].children[0];
	var listMainShow_priceSpan3 = listMainShow_price.children[2].children[0];
	listMainShow_priceSpan1.innerHTML = "￥"+obj.price;
	var cha = obj.sprice-obj.price;
	listMainShow_priceSpan2.innerHTML = "<s>￥"+obj.sprice+"</s>"+" ( 为您节省 : "+cha+" 元 )";
	listMainShow_priceSpan3.innerHTML = obj.zhekou;
	var listMainShow_numInput1 = listMainShow_num.children[1].children[0];
	var listMainShow_numInput2 = listMainShow_num.children[1].children[1];
	var listMainShow_numInput3 = listMainShow_num.children[1].children[2];
	var listMainShow_numSpan = listMainShow_num.children[2];
	listMainShow_numInput2.value = obj.value;
	var jia = 0;
	listMainShow_numInput1.onclick = function(){
		if(listMainShow_numInput2.value == 1){
		}else{
			listMainShow_numInput2.value = Number(listMainShow_numInput2.value) - Number(obj.value);
			listMainShow_numSpan.innerHTML = "赠送 <b style = 'color:#ff8a00'>"+(obj.jifen*listMainShow_numInput2.value)+"</b> 积分";
		}
	}
	listMainShow_numInput3.onclick = function(){
		listMainShow_numInput2.value = Number(listMainShow_numInput2.value) + Number(obj.value);
		listMainShow_numSpan.innerHTML = "赠送 <b style = 'color:#ff8a00'>"+(obj.jifen*listMainShow_numInput2.value)+"</b> 积分";
	}
	listMainShow_numInput2.onchange = function(){
		listMainShow_numSpan.innerHTML = "赠送 <b style = 'color:#ff8a00'>"+(obj.jifen*this.value)+"</b> 积分";
	}
	listMainShow_numSpan.innerHTML = "赠送 <b style = 'color:#ff8a00'>"+obj.jifen+"</b> 积分";

	/////////////////////cart
	listMainShow_cart.lay = obj;
	var div = document.createElement("div");
	listMainShow_cart.appendChild(div);
	if(obj.type == 1){
		div.innerHTML = "加入购物车";
		div.style.backgroundColor = "#e5004b";
		div.onmouseover = function(){
			div.style.backgroundColor = "#ff8a00";
		}
		div.onmouseout = function(){
			div.style.backgroundColor = "#e5004b";
		}
		div.onclick = function(){
			var obj = this.parentNode.lay
			var a;
			var str = getCookie("g"+id);
			if(str == ""){
				obj.a = 1;
				setCookie("g"+obj.id,JSON.stringify(obj),10)
			}else{
				var obj = JSON.parse(str);
				obj.a = Number(obj.a)+Number(listMainShow_numInput2.value);
				setCookie("g"+obj.id,JSON.stringify(obj),10);
			}
			var firstImg = listMainShow_img.getElementsByTagName("img")[0];
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
	}else{
		div.innerHTML = "暂时缺货中";
		div.style.backgroundColor = "#ccc";
	}
	////////////////////已收藏
	var listMainShow_cartSpan = listMainShow_cart.children[0];
	var listMainShow_cartSpanB = listMainShow_cartSpan.children[0];
	var listMainShow_cartSpanS = listMainShow_cartSpan.children[1];
	var aaa = false;
	listMainShow_cartSpan.onclick = function(){
		if(aaa==false){
			listMainShow_cartSpanB.style.color = "#E5004B";
			listMainShow_cartSpanS.innerHTML = "已收藏";
			listMainShow_cartSpanS.style.color = "#E5004B";
			aaa=true;
		}else{
			listMainShow_cartSpanB.style.color = "#FF8A00";
			listMainShow_cartSpanS.innerHTML = "收藏";
			listMainShow_cartSpanS.style.color = "#FF8A00";
			aaa=false;
		}
	}
}

////////////////////////商品详情选项卡
var goodsDetailsLis = document.getElementsByClassName("goodsDetails")[0].children[0].children;
var goodsDetailsDivs = document.getElementsByClassName("goodsDetails")[0].children[1].children;
var gDLL=goodsDetailsLis.length;
for(var i=0;i<gDLL;i++){
	var li = goodsDetailsLis[i];
	li.index = i;
	li.onclick = function(){
		for(var i=0;i<gDLL;i++){
			goodsDetailsLis[i].style.background = "#eaeaea";
			goodsDetailsLis[i].style.color = "#666";
			goodsDetailsDivs[i].style.display = "none";
			goodsDetailsLis[i].style.fontWeight = "normal";
		}
		this.style.background = "#fff";
		this.style.color = "#e5004b";
		this.style.fontWeight = "bold";
		goodsDetailsDivs[this.index].style.display = "block";
	}
}

////////////////////////
function query(_name){	
	var str = location.href;	// 把当前页面的url取出
	var arr = str.split("?");
	if( arr.length > 1 ){
		// 表示有问号，即有数据
		// arr[1] 表示所有的参数    例如："id=4&p=2&t=3"
		var col = arr[1].split("&");
		var l = col.length;
		for( var i=0; i<l; i++ ){
			// col[i] 表示其中一个数据，例如："id=4"
			var c = col[i].split("=");
			// c 表示其中一个数据的数组，例如：["id", "4"]
			if( c[0] == _name ){
				return c[1];
			}
		}
		return "";
	}else{
		// 表示没有问号，即没有数据
		return "";
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