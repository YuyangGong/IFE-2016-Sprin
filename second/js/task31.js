(function(){
	var schoolArr=[["北京大学","清华大学","北京邮电大学","北京林业大学"],["上海大学","上海交通大学","复旦大学","同济大学"],["南昌大学","江西财经大学","东华理工大学","九江学院"],["艾欧尼亚","战争学院","黑色玫瑰","裁决之地"]];
	window.onload=function(){	
		var city=document.getElementById("city");
		var school=document.getElementById("school");
		function paint(){  //更新表单
			var str="";
			var arr=schoolArr[this.selectedIndex];
			for(var i=0;i<arr.length;i++){
				str+="<option>"+arr[i]+"<\/option>";
			}
			school.innerHTML=str;
		}
		city.onclick=paint;
	}
})();