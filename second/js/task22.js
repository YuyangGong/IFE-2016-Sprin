(function(){
	var frontArr=[];    //前序遍历的顺序数组
	function frontRoot(root){  	//获得前序遍历的数组;
		frontArr.push(root);
		var arr=root.childNodes;
		for(var i=0;i<arr.length;i++){
			if(arr[i].nodeType===1){
				frontRoot(arr[i]);
			}
		}
	}
	function throughArr(arr,n){  //遍历数组，改变其颜色
		if(n===undefined)n=0;
		if(n===arr.length)arr[n-1].style.backgroundColor="";
		else {
			arr[n].style.backgroundColor="blue";
			if(n!==0)arr[n-1].style.backgroundColor="";
			setTimeout(again,500);
		}
		function again(){   //setTimeout只接受函数名，不接受参数，可以封装一下。
			throughArr(arr,n+1);
		}
	}
	window.onload=function(){
		var root=document.getElementsByClassName("root")[0];
		var radio=document.getElementsByTagName("input");
		var btn=document.getElementById("btn");
		frontRoot(root);
		btn.onclick=function(){
			if(radio[0].checked){
				throughArr(frontArr);
			}
			else if(radio[1].checked){
				throughArr(middleArr);
			}
			else if(radio[2].checked){
				throughArr(behindArr);
			}
		}
		var outer=document.getElementsByClassName("outer");
		var inner=document.getElementsByClassName("inner");
		var middleArr=[inner[0],outer[0],inner[1],inner[2],outer[1],inner[3],root];   //中序遍历的顺序数组
		var behindArr=[inner[0],inner[1],outer[0],inner[2],inner[3],outer[1],root];   //后序遍历的顺序数组
	}
})();