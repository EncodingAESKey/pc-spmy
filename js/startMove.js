/*
功能：运动函数
参数：
	elem 必填 指被操作的元素
	json 必填 指修改的属性及目标值（object）
	fn	 选填 所有属性都执行到目标值后所运行的函数
返回值：空	
*/
function startMove(elem, json, fn){
	clearInterval(elem.timer);
	// 开启定时器（开始运动）
	elem.timer = setInterval(function(){
		// 假设都执行到终点了
		var flag = true;
		// 循环所有需要操作的属性
		for( var attr in json ){
			//目标点
			target = json[attr];
		
			// 获取当前属性的值
			var v = getStyle(elem, attr);
			
			if( attr == "opacity" ){
				v = v * 100;
				v = Math.round(v);
			}else{
				v = parseInt(v);
			}			
			
			// 求目标点到起点的间距 除以 7 表示速度（即步长）
			var speed = (target - v) / 15;
			
			if( speed>0 ){
				speed = Math.ceil(speed);
			}else{
				speed = Math.floor(speed);
			}
			
			// 更新属性
			if( attr == "opacity" ){
				if(navigator.userAgent.indexOf("ie")>-1){
					elem.style.filter = "alpha(opacity="+(v+speed)+")";
				}else{
					elem.style.opacity = (v+speed)/100;
				}
			}else{
				elem.style[attr] = (v+speed)+"px";
			}
			
			// 坚持是否到了目标点
			if( v != target ){
				flag = false;
			}
		}
		
		// 所有的属性，都到达了目标点后，定时器才停止
		if( flag ){
			clearInterval(elem.timer);	//停止定时器
			// 如果有函数，则执行
			if( fn ){
				fn();
			}
		}
	}, 30);
}


// 获得样式
function getStyle(obj, attr){
	if( window.getComputedStyle ){
		return getComputedStyle(obj, null)[attr];
	}else{
		return obj.currentStyle[attr];
	}
}