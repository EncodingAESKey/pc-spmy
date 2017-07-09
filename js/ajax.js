var ajax = {
	get : function (url, fn){
		var xhr;
		if( window.XMLHttpRequest ){
			xhr = new XMLHttpRequest();
		}else{
			xhr = new ActiveXObject("Msxml2.XMLHTTP");
		}		
		xhr.open("get", url, true);					
		xhr.send();
		xhr.onreadystatechange = function(){
			if(xhr.readyState == 4 && xhr.status == 200){				
				if( fn ){ // 只有当传递fn参数时，才执行该函数
					fn( xhr.responseText ); //回调函数
				}
			}
		}
	},
	post : function (url, arg, fn){
		var xhr;
		if( window.XMLHttpRequest ){
			xhr = new XMLHttpRequest();
		}else{
			xhr = new ActiveXObject("Msxml2.XMLHTTP");
		}		
		xhr.open("post", url, true);	
		xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');		
		xhr.send(arg);
		xhr.onreadystatechange = function(){
			if(xhr.readyState == 4 && xhr.status == 200){				
				if( fn ){ // 只有当传递fn参数时，才执行该函数
					fn( xhr.responseText ); //回调函数
				}
			}
		}
	}
}

/*
var ajax = {
	get : get,
	post : post
}

function get(url, fn){
	var xhr;
	if( window.XMLHttpRequest ){
		xhr = new XMLHttpRequest();
	}else{
		xhr = new ActiveXObject("Msxml2.XMLHTTP");
	}	
	xhr.open("get", url, true);				
	xhr.send();
	xhr.onreadystatechange = function(){
		if(xhr.readyState == 4 && xhr.status == 200){			
			if( fn ){ // 只有当传递fn参数时，才执行该函数
				fn( xhr.responseText ); //回调函数
			}
		}
	}
}

function post(url, arg, fn){
	var xhr;
	if( window.XMLHttpRequest ){
		xhr = new XMLHttpRequest();
	}else{
		xhr = new ActiveXObject("Msxml2.XMLHTTP");
	}		
	xhr.open("post", url, true);	
	xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');		
	xhr.send(arg);
	xhr.onreadystatechange = function(){
		if(xhr.readyState == 4 && xhr.status == 200){				
			if( fn ){ // 只有当传递fn参数时，才执行该函数
				fn( xhr.responseText ); //回调函数
			}
		}
	}
}
*/	