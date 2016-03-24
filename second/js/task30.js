function addEvent(elem, type, func) {
	//兼容浏览器差异
	if (elem.addEventListener) {
		elem.addEventListener(type, func);
	} else if (elem.attachEvent) {
		elem.attachEvent("on" + type, func);
	} else {
		elem["on" + type] = func;
	}
}
var check=(function(){
	var nameArr=["名称不能为空","名称不能包含除中文、英文及数字以外的字符","名称长度过短","名称长度过长","名称可用"]
	var passwordArr=["密码不能为空","密码不能包含除英文及数字以外的字符","密码长度过短","密码长度过长","密码可用"]
	var againArr=["俩次密码不相同","请正确输入第一次密码","密码正确"];
	var emailArr=["名称不能为空","邮箱格式错误","邮箱格式正确"];
	var phoneArr=["手机号码不能为空","手机号码格式错误","手机号码格式正确"]
	var nowPassword="";
	var passwordRight=false;
	return {
		checkName:function (str){
			var count=0;
			if(str==="")return nameArr[0];
			else if(/[^0-9a-z]/i.test(str))return nameArr[1];
			else {
				for(var i=0;i<str.length;i++){
					if(/[a-z0-9\u4e00-\u9fa5]/i.test(str[i]))count++;
					else count+=2;
				}
				if(count<4)return nameArr[2];
				if(count>18)return nameArr[3];
			}
			return nameArr[4];
		},
		checkPassword:function(str){
			var count=0;
			passwordRight=false;
			if(str==="")return passwordArr[0];
			else if(/[^0-9a-z]/gi.test(str))return passwordArr[1];
			else {
				if(str.length<9)return passwordArr[2];
				else if(str.length>24)return passwordArr[3];
				else {
					passwordRight=true;
					nowPassword=str;
					return passwordArr[4];
				}
			}
		},
		checkAgain:function(str){
			if(passwordRight){
				if(nowPassword===str)return againArr[2];
				else return againArr[0];
			}
			else return againArr[1];
		},
		checkEmail:function(str){
			if(str==="")return emailArr[0];
			else if(/^[\w]+@([a-z0-9]+\.)+[a-z0-9]{2,4}$/i.test(str))return emailArr[2];
			else return emailArr[1];
		},
		checkPhone:function(str){
			if(str==="")return phoneArr[0];
			else if(/^\d{11}$/.test(str))return phoneArr[2];
			else return phoneArr[1];
		}
	}
})();
window.onload=function(){
	(function(){
		var names=document.getElementById("names");
		var nameWarn=document.getElementById("nameWarn");
		var password=document.getElementById("password");
		var passwordWarn=document.getElementById("passwordWarn");
		var passwordAgain=document.getElementById("password-again")
		var againWarn=document.getElementById("againWarn");
		var email=document.getElementById("email");
		var emailWarn=document.getElementById("emailWarn");
		var phone=document.getElementById("phone");
		var phoneWarn=document.getElementById("phoneWarn");
		var submit=document.getElementById("submit");
		function focusIn(input,text){
			text.style.color="#aaa";
			input.style.borderColor="#ccc";
		}
		addEvent(names,"focus",function(){
			nameWarn.innerHTML="必填，长度为4~18个字符，只允许输入中文、英文字母和数字,中文占2字符";
			focusIn(names,nameWarn);
		});
		addEvent(names,"blur",function(){
			nameWarn.innerHTML=check.checkName(names.value);
			if(nameWarn.innerHTML=="名称可用"){
				names.style.borderColor="#5fb844";
				nameWarn.style.color="#5fb844";
			}
			else {
				names.style.borderColor="#de0011";
				nameWarn.style.color="#de0011";
			}
		});
		addEvent(password,"focus",function(){
			passwordWarn.innerHTML="必填，长度为9~24个字符，只允许输入英文字母和数字"
			focusIn(password,passwordWarn);
		});
		addEvent(password,"blur",function(){
			passwordWarn.innerHTML=check.checkPassword(password.value);
			if(passwordWarn.innerHTML=="密码可用"){
				password.style.borderColor="#5fb844";
				passwordWarn.style.color="#5fb844";
			}
			else {
				password.style.borderColor="#de0011";
				passwordWarn.style.color="#de0011";
			}
		});
		addEvent(passwordAgain,"focus",function(){
			againWarn.innerHTML="请再次输入密码";
			focusIn(passwordAgain,passwordWarn);
		});
		addEvent(passwordAgain,"blur",function(){
			againWarn.innerHTML=check.checkAgain(passwordAgain.value);
			if(againWarn.innerHTML=="密码正确"){
				passwordAgain.style.borderColor="#5fb844";
				againWarn.style.color="#5fb844";
			}
			else {
				passwordAgain.style.borderColor="#de0011";
				againWarn.style.color="#de0011";
			}
		});
		addEvent(email,"focus",function(){
			emailWarn.innerHTML="必填，请输入正确的邮箱地址";
			focusIn(email,emailWarn);
		});
		addEvent(email,"blur",function(){
			emailWarn.innerHTML=check.checkEmail(email.value);
			if(emailWarn.innerHTML=="邮箱格式正确"){
				email.style.borderColor="#5fb844";
				emailWarn.style.color="#5fb844";
			}
			else {
				email.style.borderColor="#de0011";
				emailWarn.style.color="#de0011";
			}
		});
		addEvent(phone,"focus",function(){
			phoneWarn.innerHTML="必填，请输入正确的手机号码";
			focusIn(phone,phoneWarn);
		});
		addEvent(phone,"blur",function(){
			phoneWarn.innerHTML=check.checkPhone(phone.value);
			if(phoneWarn.innerHTML=="手机号码格式正确"){
				phone.style.borderColor="#5fb844";
				phoneWarn.style.color="#5fb844";
			}
			else {
				phone.style.borderColor="#de0011";
				phoneWarn.style.color="#de0011";
			}
		});
		addEvent(submit,"click",function(){
			console.log(names.style.borderColor)
			if(names.style.borderColor=="rgb(95, 184, 68)"&&password.style.borderColor=="rgb(95, 184, 68)"&&passwordAgain.style.borderColor=="rgb(95, 184, 68)"&&email.style.borderColor=="rgb(95, 184, 68)"&&phone.style.borderColor=="rgb(95, 184, 68)"){
				alert("提交成功");
			}
			else alert("输入有误");
		})
	})();
}