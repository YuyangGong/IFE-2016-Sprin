"use strict";

window.onload = function () {
	var cityList = {}; //存储数据
	var addBtn = document.getElementById("add-btn");
	var table = document.getElementById("aqi-table");
	function updateList() {
		//更新表格内容
		var cityStr = "";
		for (var city in cityList) {
			cityStr += "<tr><td>" + city + "</td><td>" + cityList[city] + "</td><td><button>删除</button></td></tr>";
		}
		table.innerHTML = cityStr;
	}
	function addDeleteBtn() {
		//删除按钮监听事件
		var deleteBtn = table.getElementsByTagName("button");
		var deleteText = table.getElementsByTagName("tr");
		for (var i = 0; i < deleteBtn.length; i++) {
			deleteBtn[i].onclick = function (i) {
				return function () {
					var str = deleteText[i].innerHTML.match(/\<td\>([a-z]+|[\u4e00-\u9fa5]+)/)[1];
					delete cityList[str];
					updateList();
					addDeleteBtn();
				};
			}(i);
		}
	}
	addEvent(addBtn, "click", function () {
		//增加城市按钮监听事件
		var cityText = document.getElementById("aqi-city-input").value.trim();
		var valueText = document.getElementById("aqi-value-input").value.trim();
		if (/^([a-z]+|[\u4e00-\u9fa5]+)$/i.test(cityText) && /^\d+$/.test(valueText)) {
			cityList[cityText] = valueText;
			updateList();
			addDeleteBtn();
		} else alert("您输入的城市或污染指数格式错误!");
	});
};
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