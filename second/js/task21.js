window.onload=function(){
  (function(){
	function GetListObj(divContainer){   //做个构造函数，让代码可以复用，即tag和爱好都可以用做个函数new的实例。
		this.queue=[]; //各个实例的私有方法和属性放在构造函数内。
		this.paint=function(){  //这个也是私有方法，因为div的容器不一样
			var str=this.queue.reduce(function(s,v){return s+"<div>"+v+"</div>"},"");
			divContainer.innerHTML=str;
			addDivEvent(divContainer,this);
		}
	}
	//共有方法和属性就放原型链上面。避免每个实例都要创造新的方法和属性。好朋友们公用一个就OK~
	GetListObj.prototype.del=function(str){
		this.queue.splice(str,1);
		this.paint();
	}
	GetListObj.prototype.push=function(str){
		this.queue.push(str);
	}
	GetListObj.prototype.unshift=function(str){
		this.queue.unshift(str);
	}
	GetListObj.prototype.pop=function(){
		this.queue.pop();
	}
	GetListObj.prototype.shift=function(){
		this.queue.shift();
	}
	var container=document.getElementById("tagContainer");
	var hobbyContainer=document.getElementById("hobbyContainer");
	var list=new GetListObj(container);//这个实例属于小朋友tag的
	var hobbyList=new GetListObj(hobbyContainer);//这个实例属于小朋友hobby的
	//下面绑定事件咯
	var tagInput=document.getElementById("tagInput");
	tagInput.onkeyup=updateTag;
	var hobbyInput=document.getElementById("hobbyInput");
	var hobbyBtn=document.getElementById("hobbyBtn");
	hobbyBtn.onclick=updateHobby;
	function addDivEvent(divContainer,list){  //重新绑定div的事件
		var btn=divContainer.getElementsByTagName("div");
		for(var i=0;i<btn.length;i++){
			btn[i].onclick=function(i){  //这里不做个闭包的话，i值无法传入。
				return function(){       //因为变量的活动对象是“静态”的，只能为最后一个固定的值。如var i=1;i=2;最后i的值毫无疑问是2；
					return list.del(i);  //解决的方法，就是闭包，在内形成另一个作用域，并引用内作用域的i而不是外作用域的i
				}
			}(i)
		}
	}
	//每次点击确认兴趣爱好的事件
	function updateHobby(){
 		var arr=hobbyInput.value
 				  .split(/,|，|`|、| |　|\t|\r|\n/)
		   		  .filter(function(a){return a})
		   		  .forEach(function(value){
		   		  	if(hobbyList.queue.indexOf(value)===-1){
		   		  		hobbyList.push(value);
		   		  		if(hobbyList.queue.length>10)hobbyList.shift();
		   		  	}
		   		  });
		hobbyInput.value="";
		hobbyList.paint();
	}
	//每次tag按逗号空格回车的时候的事件
	//用keyup的理由是内容已经输入文本框了，可以获取最后一个字符。
	function updateTag(e){  //在每次遇到空格，回车，逗号时，更新Tag列表
		var str=this.value;
		if(/(,| |\，)$/.test(str)||e.keyCode===13){
			var newTag=str.match(/(^[^,\， ]*)/)[0]
			if(list.queue.indexOf(newTag)===-1&&newTag!==""){
				list.push(newTag);
				if(list.queue.length>10){
					list.shift();
				}
				list.paint();
			}
			this.value="";
		}
	}
  })();	
}