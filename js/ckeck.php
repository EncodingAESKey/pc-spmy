<?php
//header('Access-Control-Allow-Origin: *');   // 访问 控制 允许 起源

//连接数据库//mysql账户
$servername = "localhost";		//服务器名称
$username = "root";				//数据库账户名称
$password = "";			//数据库账户密码
$dbname = "gzc";				//数据库名称
$conn = new mysqli($servername, $username, $password, $dbname);



// 解决中文乱码问题
//设置连接字符集编码
$sql = "SET CHARACTER SET 'UTF8'";
$conn->query($sql);
//告诉服务器将来从这个客户端传来的信息采用字符集utf8
$sql = "SET NAMES 'UTF8'";
$conn->query($sql);



// 接收参数
$ac = isset($_POST["ac"]) ? $_POST["ac"] : "";
// 获得url传过来的参数
$username = isset($_POST["username"]) ? $_POST["username"] : "";
$password = isset($_POST["password"]) ? $_POST["password"] : "";


if( $username == "" ){
	echo '{"state":"error","text":"请输入用户名"}';
}else{
	switch( $ac ){
		case "0":
			//插入数据
			if( isHasUser() === true ){
				echo '{"state":"error","text":"用户已注册"}';
			}else{							
				$ip = $_SERVER["REMOTE_ADDR"];// 获取ip			
				// sql插入语句
				$sql = "insert into bbs (username, password, ip, addTime) values ('".$username."', '".$password."', '".$ip."', now())";
				
				$conn->query($sql); // 数据进入数据表中
				$userid = mysqli_insert_id($conn);//取出插入的数据的编号	
				echo '{"state":"success","text":"成功"}';	
			}
			
			break;
		case "1":
			//查询
			if( isHas() === true ){//表示用户名存在
				echo '{"state":"success"}';
			}else{
				echo '{"state":"error","text":"用户名或密码错误"}';
			}
			break;	
	}
}

// 查询用户名是否存在，如果存在返回真，否则返回假
function isHasUser(){
	global $conn, $username;//作用域问题，找到全局变量
	
	$sql = "select count(*) as num from bbs where username='".$username."'";
	$result = $conn->query($sql);//得到结果集（二维数组）
	$row = $result->fetch_assoc();//在结果集中，打开第一行	
	
	if( $row["num"] === "0" ){ // 不存在
		return false;
	}else{
		return true;
	}
}
function isHas(){
	global $conn, $username,$password;//作用域问题，找到全局变量
	$sql = "select * from bbs where (username='".$username."') AND (password='".$password."')";
	$result = $conn->query($sql);//得到结果集（二维数组）
	//在结果集中，打开第一行	
	
	if( $result->num_rows > 0 ){ // 存在
		return true;
	}else{
		return false;
	}
}


?>