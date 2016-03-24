window.onload=function(){
	var btn=document.getElementById("btn");
	var text=document.getElementById("text");
	var warning=document.getElementById("warning");
	btn.onclick=function(){
		if(check(text.value)){
			warning.innerHTML="名称格式正确";
			warning.style.color="#5ab939";
			text.style.borderColor="#5ab939"
		}
		else {
			if(text.value==""){
				warning.innerHTML="姓名不能为空";
			}
			else warning.innerHTML="姓名格式错误";
			warning.style.color="red";
			text.style.borderColor="red";
		}
	}
}
function check(str){
	var count=0;
	for(var i=0;i<str.length;i++){
		if(/[\u4e00-\u9fa5]/.test(str[i]))count+=2;
		else if(/[a-z0-9\!\@\#\$\%\^\&\*\(\)\_\+]/i.test(str[i]))count++;
		else return false;
	}
	return count<=16&&count>=4;
}