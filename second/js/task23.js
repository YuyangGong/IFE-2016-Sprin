(function(){
	var frontArr=[];    //前序遍历的顺序数组
	var searchNode;     //用来放搜索到的节点，当重新搜索时方便去除标记颜色。
	var isGoing=false;  //用来判断是否已经在进行搜索了
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
		if(n===arr.length){
			arr[n-1].style.backgroundColor="";
			isGoing=false;
		}
		else {
			arr[n].style.backgroundColor="blue";
			if(n!==0)arr[n-1].style.backgroundColor="";
			setTimeout(again,500);
		}
		function again(){   //setTimeout只接受函数名，不接受参数，可以封装一下。
			throughArr(arr,n+1);
		}
	}
	function searchArr(arr,n,name){  //搜索数组
		if(n===undefined)n=0;
		if(n===arr.length){
			arr[n-1].style.backgroundColor="";
			warn.innerHTML="抱歉，没有搜索的内容呀"
			isGoing=false;
		}
		else {
			if(arr[n].id===name.toLowerCase()){
				searchNode=arr[n];
				arr[n].style.backgroundColor="#de0011";
				arr[n-1].style.backgroundColor="";
				isGoing=false;
				return true;
			}
			arr[n].style.backgroundColor="blue";
			if(n!==0)arr[n-1].style.backgroundColor="";
			setTimeout(again,500);
		}
		function again(){   //setTimeout只接受函数名，不接受参数，可以封装一下。
			searchArr(arr,n+1,name);
		}
	}
	window.onload=function(){
		var warn=document.getElementById("warn");
		var startBtn=document.getElementById("btn");
		var searchBtn=document.getElementById("search-btn");
		var root=document.getElementById("super"); 
		frontRoot(root);
		startBtn.onclick=function(){
			if(isGoing){alert("已经在进行遍历或搜索啦！");return false;}
			isGoing=true;
			warn.innerHTML="";
			if(searchNode)searchNode.style.backgroundColor="";
			throughArr(frontArr);
		}
		searchBtn.onclick=function(){
			if(isGoing){alert("已经在进行遍历或搜索啦！");return false;}
			isGoing=true;
			warn.innerHTML="";
			if(searchNode)searchNode.style.backgroundColor="";
			var textNode=document.getElementById("search-text");
			var text=textNode.value;
			textNode.value="";
			searchArr(frontArr,0,text)
		}
	}
})();