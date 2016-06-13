/********************************************************
 ************************ 公共代码 **********************
 ********************************************************/

/*
 * add by yzChen  2016-5-30 13:07:37  desc: 复制文本
 */
function _copy(str) {
    document.oncopy = function(event) {
        event.clipboardData.setData("Text", str);
        event.preventDefault();
    };
    document.execCommand("Copy");
}


/********************************************************
 ************************ 右键菜单 **********************
 ********************************************************/

/* add by yzChen  2016-5-29 09:41:48  desc: 初始化时先清空菜单，避免用户刷新页面时，重复创建菜单 */
chrome.contextMenus.removeAll(function(){});

/*  -- demno --
 // 点击事件
function genericOnClick(info, tab) {
  var content = JSON.stringify(info);
  var pageBasic = JSON.stringify(tab);
  console.log("网页基本信息: " + pageBasic);
  console.log("操作内容: " + content);
  // 文本
  if(null != info.selectionText) {
    console.log("选中内容：" + info.selectionText);
  }
}

// 遍历所有类型，并创建右键菜单
var contexts = ["page","selection","link","editable","image","video","audio"];
var contextsClickType = ["page","selectionText","link","editable","image","video","audio"];
var titles = ["页面","选择内容","链接","editable","图片","video","audio"];
for (var i = 0; i < contexts.length; i++) {
  var context = contexts[i];
  var title = titles[i];
  var id = chrome.contextMenus.create({"title":title, "contexts":[context], "onclick": genericOnClick});
  console.log("类型：'" + context + "', ID: " + id);
}
*/

/**************************************************************
 ************************ 来一个身份证号 **********************
 **************************************************************/
 function to18(str17){ 
	var num = 0;
	var wei;
	var xis;
	var jmod = 0;
	for (var i=1;i<=17;i++){
		wei = Number(strsub(str17,i));
		xis = Math.pow(2,18-i) % 11;
		num = num + (wei*xis)
	}
	jmod = num % 11;
	switch (jmod){
		case 0:	restr = '1'; break;
		case 1: restr = '0'; break;
		case 2: restr = 'X'; break;
		case 3: restr = '9'; break;
		case 4: restr = '8'; break;
		case 5: restr = '7'; break;
		case 6: restr = '6'; break;
		case 7: restr = '5'; break;
		case 8: restr = '4'; break;
		case 9: restr = '3'; break;
		case 10: restr = '2'; break;
	}
	return str17 + restr;
}
function getRandom(m,n){
	return Math.round((Math.random()*(n-m)+m))
}
function padLeft(str, lenght) {
	if(str.constructor == String) {
		if (str.length < lenght)
			return padLeft("0" + str, lenght);
		else
			return str;
	} else if(str.constructor == Number) {
		if(str < Math.pow(10, lenght - 1)) {
			return padLeft("0" + str, lenght);
		}
		return str;
	} else {
		return str;
	}
}
function strsub(str,i){
	return str.substr(i-1,1)
}

function writeIdcard(info, tab) {
    // 北京市东城区 - 随机生日 - 随机4位数
	__id17 = '110101'+'19';
	__id17 += getRandom(45,90);
	__id17 += padLeft(getRandom(1,12),2);
	__id17 += padLeft(getRandom(1,28),2);
	__id17 += getRandom(100,999);
    _idcard = to18(__id17);
	
    // 加入到剪贴板
    // _copy(_idcard);
	
	// 直接输出到文本框中
	chrome.windows.getCurrent(function(win){
		chrome.tabs.getSelected(function(tab){
			chrome.tabs.sendRequest(tab.id, {idcard: _idcard}, function(response) {
				//
			});
		});
	});

}
chrome.contextMenus.create({"title": "自动生成一个符合正则表达式的身份号到此文本框", "contexts":["editable"], "onclick": writeIdcard});
 