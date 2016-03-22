function addEvent(elem,type,func){ //兼容浏览器差异
	if(elem.addEventListener){
		elem.addEventListener(type,func);
	}
	else if(elem.attachEvent){
		elem.attachEvent("on"+type,func);
	}
	else {
		elem["on"+type]=func;
	}
}
window.onload=function(){
	var arr=[];   //初始放60个数字
	for(var num=90;num>30;num--){
		arr.push(num);
	}
	var list={   //留个接口
		queue:arr, //队列
		push:function(num){ //左侧入 
			if(btnClick){
				alert("正在排序呢！");
				return false;
			}
		 	if(this.queue.length>=60){
		 		alert("太多了，不能再加了");
		 		return false;
		 	}
			this.queue.push(num);
			this.paint();
		},
		unshift:function(num){ //右侧入
			if(btnClick){
				alert("正在排序呢！");
				return false;
			}
			if(this.queue.length>=60){
		 		alert("太多了，不能再加了");
		 		return false;
		 	} 
			this.queue.unshift(num);
			this.paint();
		},
		pop:function(){ //左侧出
			if(btnClick){
				alert("正在排序呢！");
				return false;
			}
			//本来内置函数想用this的，可是绑定上事件之后其this指向的对象就变了，指向按钮.
			//如果想直接用this,而不是list的话，可以在绑定的时候放进一个匿名函数里调用，避免this的指向改变。
			//list.shift方法用的以上原理，所以其可以直接用this;
			if(list.queue.length===0){
				alert("队列没有数字拉！亲");
				return false;
			}
			alert(list.queue.pop());
			list.paint();
		},
		shift:function(){  //右侧出
			if(btnClick){
				alert("正在排序呢！");
				return false;
			}
			//这个this的指向就没有改变。详细看最后俩个函数的绑定异同。
			if(list.queue.length===0){
				alert("队列没有数字拉！亲");
				return false;
			}
			alert(list.queue.shift());
			list.paint();
		},
		del:function(num){  //删除指定的序号
			if(btnClick){
				alert("正在排序呢！");
				return false;
			}
			this.queue.splice(num,1);
			this.paint();
		},
		paint:function(){   //重绘
			var str=list.queue.reduce(function(s,v){return s+"<div style='height:"+v+"px'></div>"},"");
			container.innerHTML=str;
			addDivEvent();
		}
	}
	var container=document.getElementById("container");
	function addDivEvent(){  //重新绑定数字div的事件
		var btn=container.getElementsByTagName("div");
		for(var i=0;i<btn.length;i++){
			btn[i].onclick=function(i){  //这里不做个闭包的话，i值无法传入。
				return function(){       //因为变量的活动对象是“静态”的，只能为最后一个固定的值。如var i=1;i=2;最后i的值毫无疑问是2；
					return list.del(i);  //解决的方法，就是闭包，在内形成另一个作用域，并引用内作用域的i而不是外作用域的i
				}
			}(i)
		}
	}
	var botton=document.querySelectorAll("input");//获取上面的按钮，不过第一个是文本框排除掉
	//以下为左右侧入，侧出按钮绑定事件。
	botton[2].onclick=function(){
		var num=botton[0].value;
		if(/^([1-9][0-9]|100)$/.test(num)){
			list.push(num);
		}
		else alert("请输入范围在10-100的整数!");
	}
	botton[1].onclick=function(){
		var num=botton[0].value;
		if(/^([1-9][0-9]|100)$/.test(num)){
			list.unshift(num);
		}
		else alert("请输入范围在10-100的整数！");
	}
	botton[3].onclick=list.shift;
	botton[4].onclick=function(){list.pop();};
	botton[5].onclick=function(){
		try {
			timing()();
		}
		catch(e){
			alert("正在排序呢！")
		}
	}
	var btnClick=false;
	function timing(){
		if(btnClick)return false;
		btnClick=true;
		var i=0,j=1,delay=false;;
		return function listTime(){
			if(list.queue[j]<list.queue[j-1]){
					list.queue[j]=list.queue[j]^list.queue[j-1];//异或交换，当然也可以用个中间数或者加减交换。
					list.queue[j-1]=list.queue[j]^list.queue[j-1];
					list.queue[j]=list.queue[j]^list.queue[j-1];
					list.paint();
				    delay=true;
				}
			j++;
			if(j===list.queue.length-i){
				i+=1;
				j=1;
				if(i===list.queue.length-1){
					btnClick=false;
					return false;
				}
			}
			if(delay){
				delay=false;
				setTimeout(listTime,20);
			}
			else listTime();
		}		
	}
	list.paint();
	addDivEvent();
}