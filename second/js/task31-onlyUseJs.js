(function(){
	var schoolArr=[["北京大学","清华大学","北京邮电大学","北京林业大学"],["上海大学","上海交通大学","复旦大学","同济大学"],["南昌大学","江西财经大学","东华理工大学","九江学院"],["艾欧尼亚","战争学院","黑色玫瑰","裁决之地"]];
	window.onload=function(){	
		var city=document.getElementById("city");
		var school=document.getElementById("school");
		var form=document.getElementsByTagName("form")[0];
		var inSchool=document.getElementById("student");
		var outSchool=document.getElementById("notStudent");
		var span=document.getElementsByTagName("span");
		function checkRadio(ev){
		    var ev = ev || window.event;
		    var target = ev.target || ev.srcElement;
		    if(target.name&&target.name == "sizeChoose"){
		    	if(target.id==="student"){
		    		span[0].style.display="block";
		    		span[1].style.display="none"
		    	}
		    	else if(target.id="notStudent") {
		    		span[1].style.display="block";
		    		span[0].style.display="none"
		    	}
  			}
		}
		function paint(){  //更新表单
			var str="";
			var arr=schoolArr[this.selectedIndex];
			for(var i=0;i<arr.length;i++){
				str+="<option>"+arr[i]+"<\/option>";
			}
			school.innerHTML=str;
		}
		form.onclick=checkRadio;
		city.onclick=paint;
	}
})();