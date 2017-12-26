/////////////////////////////////////////////////////////////通用函数开始/////////////////////////////////////////////////////////////
/**
@author 周小建
@time 2010-12-15
@description 拒绝事件冒泡
*/
var processEvent = function(e){
	e = e || window.event;
	//if(typeof event == "undefined" || !event) return;
	if(e && e.stopPropagation)
		// 如果它支持W3C的stopPropagation()方法
		e.stopPropagation();
	else
		// 否则，我们需要使用IE的方式来取消事件冒泡
		window.event.cancelBubble = true;
	// 阻止默认浏览器动作(W3C)
	if(e && e.preventDefault)
		e.preventDefault();
	// IE中阻止函数器默认动作的方式
	else
		window.event.returnValue = false;
};

/**
@author 周小建
@time 2010-12-15
@description 获取Cookie
*/
/*
function getCookie(name){
   var search = name + "="//查询检索的值
   var returnvalue = "";//返回值
   if(document.cookie.length > 0){
     sd = document.cookie.indexOf(search);
     if(sd!= -1){
        sd += search.length;
        end = document.cookie.indexOf(";", sd);
        if(end == -1) end = document.cookie.length;
         //unescape() 函数可对通过 escape() 编码的字符串进行解码。
        returnvalue=unescape(document.cookie.substring(sd,end))
      }
   }
   return returnvalue;
}
*/

/**
@author 周小建
@time 2010-12-15
@description 获取Cookie
*/
function getCookie(name){
	var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
	if(arr=document.cookie.match(reg))
	return unescape(arr[2]);
	else return null;
}

/**
@athor:周小建
@time:2012-12-04 11:30:00
@description:设置Cookie。
			如果需要设定自定义过期时间,那么把上面的setCookie　函数换成下面两个函数就ok;
			这是有设定过期时间的使用示例：
			s20是代表20秒;h是指小时，如12小时则是：h12;d是天数，30天则：d30
			setCookie("name","hayden","s20");
*/
function setCookie(name,value,time){
	if(time==null) time = "d30";
	var strsec = getsec(time);
	var exp = new Date();
	exp.setTime(exp.getTime() + strsec*1);
	document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
}

/**
@athor:周小建
@time:2012-12-04 11:30:00
@description:获取日期数据对应的秒数
*/
function getsec(str){
	var str1=str.substring(1,str.length)*1;
	var str2=str.substring(0,1);
	if(str2=="s") return str1*1000;
	else if(str2=="h") return str1*60*60*1000;
	else if (str2=="d") return str1*24*60*60*1000;
}

/**
@athor:周小建
@time:2012-12-04 11:30:00
@description:删除Cookie
		setCookie("name","hayden");
		alert(getCookie("name"));
*/
function delCookie(name){
	var exp = new Date();
	exp.setTime(exp.getTime() - 1);
	var cval=getCookie(name);
	if(cval!=null)
	document.cookie= name + "="+cval+";expires="+exp.toGMTString();
}

/**
@athor:周小建
@time:2012-12-04 11:30:00
@description:向cookieName的cookie中添加一项
*/
function addCookie(cookieName,text){
	if(!text)return;
	var textArray = text.split(",");
	var cookie = getCookie(cookieName);
	var cookieArray=cookie?cookie.split(","):[],now=new Date().getTime();
	
	for(var i=0;i<textArray.length;i++){
		var itemText = textArray[i];
		var index = -1;
		for(var j=0;j<cookieArray.length;j++){
			var item = cookieArray[j];
			var a = item.split(":");
			var v=a[0];
			if(v==itemText){
				index = j;
				cookieArray[j] = v + ":" + now;
				break;
			}
		}
		if(index==-1) cookieArray.unshift(itemText+":"+now);
	}
	
	cookieArray.sort(function(o1,o2){
		var d1=o1.split(":")[1],d2=o2.split(":")[1];;
		if(d1<d2)return 1;
		if(d1>=d2) return -1;
	});
	cookieArray = cookieArray.slice(0,10);
	setCookie(cookieName,cookieArray.join(","));
}

/**
@athor:周小建
@time:2012-12-04 11:30:00
@description:向cookieName的cookie中移除一项
*/
function removeCookie(cookieName,text){
	var cookie = getCookie(cookieName);
	if(text && cookie){
		var cookieArray = cookie.split(",");
		var index = -1;
		for(var i=0;i<cookieArray.length;i++){
			var item = cookieArray[i];
			var a = item.split(":");
			var v=a[0];
			if(v==text){
				index = i;
				break;
			}
		}
	}
	if(index>-1){
		cookieArray.splice(index,1);
		cookieArray = cookieArray.slice(0,10);
		setCookie(cookieName,cookieArray.join(","));
	}
}

/**
@athor:周小建
@time:2012-12-04 08:30:00
@description:检测浏览器版本
*/
var checkBrowser = function(){
	var cb = "Unknown";
	if(window.ActiveXObject){
		cb = "IE";
	}else if(navigator.userAgent.toLowerCase().indexOf("firefox") != -1){
		cb = "Firefox";
	}else if(navigator.userAgent.toLowerCase().indexOf("chrome") != -1){
		cb= "Chrome";
	}else if((typeof document.implementation != "undefined") && (typeof document.implementation.createDocument != "undefined") && (typeof HTMLDocument != "undefined")) {
		cb = "Mozilla";
	}else if(navigator.userAgent.toLowerCase().indexOf("opera") != -1){
		cb = "Opera";
	} 
	return cb;
}	
var browserValue = checkBrowser();

/**
@athor:周小建
@time:2012-12-04 08:40:00
@description:光标定位在最后
*/
var text_onfocus = function(obj){
	if(browserValue=="IE"){
		var r = obj.createTextRange();
		//方式1
		r.collapse(false);//如果要让光标定位在最后，则此处要设为false，如果定位在开头，要设为true。如果设为true表示开启文本选择功能，还必须确定r.moveStart才能真正确定光标位置，否则就会直接定位在开头。r.select就会只定位光标，obj.select会选中所有文本，当使用obj.select选中所有文本时前面r.collapse的参数为true和false都一样
		//r.moveStart("textedit");
		//或者r.moveStart("character",obj.value.length);
		try{
			r.select();
		}catch(e){}
		//方式2
		//r.collapse(true);r.moveStart("textedit");r.select();
		
		//方式3
		//r.collapse(true);r.moveStart("character",obj.value.length);r.select();
	}else{
		try{
			obj.onfocus();
			obj.select();
		}catch(e){}
	}
}

/**
@athor:周小建
@time:2010-12-04
@description:通过fieldName获取fieldText
*/
function getFieldText(fieldName,config,$insertOrUpdateForm){
	fieldName = $.trim(fieldName);
	var fieldText = null;
	if(parent.allFieldMap && parent.allFieldMap[fieldName]){
		fieldText = parent.allFieldMap[fieldName];
	}else if($.isValidObject(config) && $.isValidArray(config.columns)){
		for(var i=0;i<config.columns.length;i++){
			var column = config.columns[i];
			if($.isValidObject(column) && $.isValidString(column.col) && fieldName==$.trim(column.col) && $.isValidString(column.label)){
				return $.trim(column.label);
			}
		}
	}
	//如果在全局allFieldMap和config中都没有找到对应的label则从form中获取，因为有可能用户提供的并不是配置信息而是直接的form
	if($.isEmptyString(fieldText)){
		if($insertOrUpdateForm==null) $insertOrUpdateForm = me.$insertOrUpdateForm;
		if($insertOrUpdateForm==null) return "";
		var $input = $(name);
		if($input.length==0) $input = $insertOrUpdateForm.find(":input[id='" + fieldName + "']");
		if($input.length==0) $input = $insertOrUpdateForm.find(":input[name='" + fieldName + "']:eq(0)");
		if($input.length==0) return "";
		//fieldText = $input.parents("td:eq(0)").prevAll("td:eq(0)").text().replace("*","");
		fieldText = $input.closest("div").prevAll("label:eq(0)").find("span:eq(0)").text().replace("*","");
	}
	return fieldText;
}

/**
@athor:周小建
@time:2012-12-04 08:50:00
@description:光标定位并选中输入框所有内容
*/
function focusInput(inputObj){
	if(inputObj==null) return;
	var targetNodeName = inputObj.nodeName.toUpperCase();
	if(targetNodeName == "SELECT"){
		inputObj.focus();
		return;
	}
	if(targetNodeName != "INPUT" || (inputObj.type != null && inputObj.type.toUpperCase() == "FILE")) return;
	if(browserValue=="IE"){
		var r = inputObj.createTextRange();
		r.collapse(false);//如果要选中输入框所有内容，则此处的参数true和false都可，而且r.select();不用写，inputObj.focus();也不用写。因为无论光标放在开头和最后，等到inputObj.select的时候都是从一头到另一头选中的
		//r.select();
		inputObj.focus();//要加这条语句，否则如果它为第一个输入框，则它貌似获取焦点，但在按Tab键时，会跑到地址栏上
		try{
		inputObj.select();
		}catch(e){}
		//方式2
		//r.collapse(false);inputObj.select();
		
		//方式3
		//r.collapse(true);r.moveStart("character",obj.value.length);r.select();
	}else{
		try{
			obj.onfocus();
			obj.select();
		}catch(e){}
	}
}

/**
@athor:周小建
@time:2012-12-04 08:50:00
@description:通过key获取dom的jQuery对象
*/
function getEleByKey(key){
	if(!key)return $;
	if(key instanceof jQuery) return key;
	if(typeof key=="object") return $(key);
	if(typeof key=="string" && $.trim(key)){
		key = $.trim(key);
		var $el=null;
		$el = $(key);
		if($el.length==0) $el = $("#"+key);
		if($el.length==0) $el = $("[name='"+key+"']");
		if($el.length==0) $el = $("." + key);
		if($el.length==0) return $;
		return $el.eq(0);
	}
}

/**
@athor:周小建
@time:2012-12-04 08:50:00
@description:通过key获取父窗口或祖先窗口的dom的jQuery对象
*/
function getParentEleByKey(key){
	if(!key)return $;
	var $obj=null,parentObj=parent;
	/*
	//while循环有个弊端，就是如果不存在#main，那么会形成死循环，所以将其改为后面的for循环，以便控制次数避免死循环。
	while($obj==null||$obj.length==0){
		if(key instanceof parentObj.jQuery) $obj = key;
		else if(typeof key=="object") $obj = parentObj.$(key);
		else if(typeof key=="string" && parentObj.$.trim(key)){
			key = parentObj.$.trim(key);
			$obj = parentObj.$(key);
			if($obj==null || $obj.length==0) $obj = parentObj.$("#"+key);
			if($obj==null || $obj.length==0) $obj = parentObj.$("[name='"+key+"']");
			if($obj==null || $obj.length==0) $obj = parentObj.$("." + key);
		}
		if($obj==null || $obj.length==0) parentObj = parentObj.parent;
		else return $obj;
	}
	*/
	
	for(var i=0;i<10;i++){//最多向上找10层parent
		if(key instanceof parentObj.jQuery) $obj = key;
		else if(typeof key=="object") $obj = parentObj.$(key);
		else if(typeof key=="string" && parentObj.$.trim(key)){
			key = parentObj.$.trim(key);
			$obj = parentObj.$(key);
			if($obj==null || $obj.length==0) $obj = parentObj.$("#"+key);
			if($obj==null || $obj.length==0) $obj = parentObj.$("[name='"+key+"']");
			if($obj==null || $obj.length==0) $obj = parentObj.$("." + key);
		}
		if($obj==null || $obj.length==0) parentObj = parentObj.parent;
		else return $obj;
	}
	return parentObj.$;
}

/**
 @author 周小建
 @time 2017-11-01
 @description 删除数组中的某项。
 */
/*
function removeByValue(arr, val) {
  for(var i=0; i<arr.length; i++) {
    if(arr[i] == val) {
      arr.splice(i, 1);
      break;
    }
  }
}
var somearray = ["mon", "tue", "wed", "thur"]
removeByValue(somearray, "tue");//somearray will now have "mon", "wed", "thur"
*/
Array.prototype.removeByValue = function(val) {
  for(var i=0; i<this.length; i++) {
    if(this[i] == val) {
      this.splice(i, 1);
      break;
    }
  }
}
//var somearray = ["mon", "tue", "wed", "thur"]
//somearray.removeByValue("tue");//somearray will now have "mon", "wed", "thur"

/**
@athor:周小建
@time:2012-12-04 09:30:00
@description:工具方法，用于去除字符串的左右空格，但是这个函数是个全局函数，也就是说是属于window的函数
*/
function trim(str){
	return str.replace(/(^\s*)|(\s*$)/ig,"");
}

/**
@athor:周小建
@time:2012-12-04 09:40:00
@description:工具方法，用于去除字符串的左右空格，这个函数是属于String的函数
*/
String.prototype.trim = function(){   
	 return this.replace(/(^\s*)|(\s*$)/ig,"");
}

/**
@athor:周小建
@time:2014-11-19 10:00:00
@description:对String的扩展，去除字符串所有空格
*/
String.prototype.trimAll = function(){
	return this.replaceAll(/\s/g,"");//return this.replaceAll(" ","");return this.replaceAll("\\s","");//三种方式完全相同
}


/**
@athor:周小建
@time:2012-12-04 09:50:00
@description:将s1中所有出现的s2都转换为s3，但是这个函数是个全局函数，也就是说是属于window的函数
*/
function replaceAll(s1,s2,s3){
	var r = new RegExp(s2.replace(/([\(\)\[\]\{\}\^\$\+\-\*\?\.\"\'\|\/\\])/g,"\\$1"),"ig");
	return s1.replace(r,s3);
}

/**
@athor:周小建
@time:2012-12-04 10:00:00
@description:将s1中所有出现的s2都转换为s3，这个函数是属于String的函数
*/
String.prototype.replaceAll = function(s1,s2){   
	var r = new RegExp(s1.replace(/([\(\)\[\]\{\}\^\$\+\-\*\?\.\"\'\|\/\\])/g,"\\$1"),"ig");
	return this.replace(r,s2);
}

/**
@athor:周小建
@time:2014-11-19 10:20:00
@description:对String的扩展，全部替换字符串的子字符串或表达式s1为字符串s2，s1可以是普通字符串、正则表达式字符串或正则表达式，但如果是正则表达式时可以只是字符串；s2只能是字符串。
			  这是replaceAll的简便用法，但用的不多，应尽可能由replaceAll来代替。
*/
String.prototype.replaceAllStr = function(s1,s2){
	if(!s1) return this;
	if(typeof s1=="string") return this.replace(new RegExp(s1.replace(/([\(\)\[\]\{\}\^\$\+\-\*\?\.\"\'\|\/\\])/g,"\\$1"),"ig"),s2);
	return this.replace(s1,s2);
}

/**
@athor:周小建
@time:2014-11-19 10:30:00
@description: 用于对数字进行四舍五入和保留特定小数的Number扩展函数
*/
Number.prototype.myToFixed = function(precision){
    //return (Math.round(this * Math.pow(10,precision||0)) / Math.pow(10,precision||0)).toFixed(precision);
    
	/*
	var num = (Math.round(this * Math.pow(10,precision||0)) / Math.pow(10,precision||0));
	var fixNum = new Number(num+1).toFixed(precision||0);//四舍五入之前加1  
	var fixedNum = new Number(fixNum - 1).toFixed(precision||0);//四舍五入之后减1，再四舍五入一下
	return fixedNum;
	*/
	
	
	precision = precision || 0;
	precision = parseInt(precision,10);
	//var str=this+"",p=str.indexOf(".");
	var pre = this<0?"-":"";
	var str=(this<0?(0-this):this)+"",p=str.indexOf(".");
	var d = null;
	if(precision>0){
		var tempArray = [];
		if(p<0){
			str += ".";
			for(var i=0;i<precision;i++) tempArray.push("0");
			str += tempArray.join("");
		}else{
			var tempStr = str.substring(p+1);
			var len = tempStr.length;
			if(len<precision){
				for(var j=len;j<precision;j++)tempArray.push("0");
				str += tempArray.join("");
			}else if(len>precision){
				d = str.substring(0,p+1) + tempStr.substring(0,precision);
				var c = tempStr.substring(precision,precision+1);
				var n = parseInt(c,10);	
				if(n>4){
					//d = parseFloat(str);
					//d = parseFloat(d) + (1/Math.pow(10,precision));
					//d = d - 0 + (1/Math.pow(10,precision));
					d = parseFloat(d).add(1/Math.pow(10,precision));
					d = d.toFixed(precision);
				}
			}
		}
	}else if(p>0){
		d = parseInt(str,10);
		var tempStr = str.substring(p+1);
		if(tempStr!==""){
			var c = tempStr.substring(0,1);
			var n = parseInt(c,10);
			if(n>4){
				d = d + 1;
			}
		}
	}
	if(d===null) d = str;
	//return d;
	return pre+d;
}

/**
@athor:周小建
@time:2014-11-19 10:30:00
@description:加法函数
*/
function accAdd(arg1,arg2){  
	/*
	var r1,r2,m;  
	try{  
		r1 = arg1.toString().split(".")[1].length;  
	}catch(e){  
		r1 = 0;
	}  
	try{
		r2 = arg2.toString().split(".")[1].length;  
	}catch (e){
		r2 = 0;  
	}
	*/
	var s1=arg1.toString(),r1=s1.indexOf(".")==-1?0:s1.split(".")[1].length,s2=arg2.toString(),r2=s2.indexOf(".")==-1?0:s2.split(".")[1].length,m=Math.pow(10,Math.max(r1,r2));  
	return (arg1 * m + arg2 * m) / m;  
}

/**
@athor:周小建
@time:2014-11-19 10:30:00
@description:给Number类型增加一个add方法，使用时直接用.add即可完成计算。
*/
Number.prototype.add = function(arg){  
	return accAdd(arg,this);
}

/**
@athor:周小建
@time:2014-11-19 10:30:00
@description:减法函数
*/
function accSub(arg1,arg2){  
	/*
	var r1, r2, m, n;
	try{
		r1 = arg1.toString().split(".")[1].length;
	}catch(e){
		r1 = 0;
	}  
	try{
		r2 = arg2.toString().split(".")[1].length;
	}catch(e){
		r2 = 0;
	}
	*/
	var s1=arg1.toString(),r1=s1.indexOf(".")==-1?0:s1.split(".")[1].length,s2=arg2.toString(),r2=s2.indexOf(".")==-1?0:s2.split(".")[1].length;
	var m = Math.pow(10,Math.max(r1,r2));//动态控制精度长度
	var n = (r1 >= r2) ? r1 : r2;
	//return parseFloat(((arg1 * m - arg2 * m) / m).myToFixed(n));
	return (arg1 * m - arg2 * m) / m;
}

/**
@athor:周小建
@time:2014-11-19 10:30:00
@description:给Number类型增加一个sub方法，使用时直接用.sub即可完成计算。
*/
Number.prototype.sub = function(arg){
	return accSub(this,arg);
}

/**
@athor:周小建
@time:2014-11-19 10:30:00
@description:乘法函数
*/
function accMul(arg1,arg2){
	/*
	var m=0,s1=arg1.toString(),s2=arg2.toString();
	try{
		m += s1.split(".")[1].length;
	}catch(e){
	}
	try{
		m += s2.split(".")[1].length;
	}catch(e){
	}
	*/
	var s1=arg1.toString(),r1=s1.indexOf(".")==-1?0:s1.split(".")[1].length,s2=arg2.toString(),r2=s2.indexOf(".")==-1?0:s2.split(".")[1].length,m=r1+r2;
	return Number(s1.replace(".","")) * Number(s2.replace(".","")) / Math.pow(10,m);
}

/**
@athor:周小建
@time:2014-11-19 10:30:00
@description:给Number类型增加一个mul方法，使用时直接用.mul即可完成计算。
*/
Number.prototype.mul = function(arg){
	return accMul(arg,this);
}

/**
@athor:周小建
@time:2014-11-19 10:30:00
@description:除法函数
*/
function accDiv(arg1,arg2){
	/*
	var t1 = 0, t2 = 0, r1, r2;
	try{
		t1 = arg1.toString().split(".")[1].length;
	}catch(e){
	}
	try{
		t2 = arg2.toString().split(".")[1].length;
	}catch(e){
	}
	with(Math){
		r1 = Number(arg1.toString().replace(".",""));
		r2 = Number(arg2.toString().replace(".",""));
		return (r1 / r2) * pow(10, t2 - t1);  
	}
	*/
	var s1=arg1.toString(),r1=s1.indexOf(".")==-1?0:s1.split(".")[1].length,s2=arg2.toString(),r2=s2.indexOf(".")==-1?0:s2.split(".")[1].length;
	return (Number(s1.replace(".","")) / Number(s2.replace(".",""))) * Math.pow(10,r2-r1);
}

/**
@athor:周小建
@time:2014-11-19 10:30:00
@description:给Number类型增加一个div方法，使用时直接用.div即可完成计算。
*/
Number.prototype.div = function(arg){
	if(arg==0){
		//alert('除数不能为0！');
		throw new Error("0");
	}
	return accDiv(this,arg);
}

/**
@athor:周小建
@time:2014-11-19 10:30:00
@description:jQuery全局对象的若干扩展。
*/
if(typeof $.isEmptyString=="undefined")
$.extend({
	isEmptyString : function(str){
		if(typeof str!="string" || $.trim(str)=="") return true;
		return false;
	},
	isValidString : function(str){
		if(typeof str=="string" && $.trim(str)!="") return true;
		return false;
	},
	isEmptyArray : function(arr){
		if(!$.isArray(arr) || arr.length==0) return true;
		return false;
	},
	isValidArray : function(arr){
		if($.isArray(arr) && arr.length>0) return true;
		return false;
	},
	isValidObject:function(obj){
		return !$.isEmptyObject(obj);
	}
});

/**
 @author 周小建
 @time 2017-11-01
 @description 扩展JSON序列化。
 */
//(function($){  
    $.fn.serializeJSON=function(){  
        var serializeObj={};  
        var array=this.serializeArray();  
        //var str=this.serialize();  
        $(array).each(function(){  
            if(serializeObj[this.name]){  
                if($.isArray(serializeObj[this.name])){  
                    serializeObj[this.name].push(this.value);  
                }else{  
                    serializeObj[this.name]=[serializeObj[this.name],this.value];  
                }  
            }else{  
                serializeObj[this.name]=this.value;   
            }  
        });  
        return serializeObj;  
    };  
//})(jQuery);   

function getErrorUrl(){
	//thisUrl = "http://localhost:8080/riskManageWeb/static/pages/hetong/chukou/add.html?editflag=detail&branch=0&tempId=ckh88888891";
	var thisUrl = window.location.href;
	var tempIndex = thisUrl.indexOf("?");
	if(tempIndex>-1){
		thisUrl = thisUrl.substring(0,tempIndex);
	}
	var str = "static/pages/";
	tempIndex = thisUrl.indexOf(str);
	var tempUrl = thisUrl.substring(tempIndex+str.length);
	var tempArray = tempUrl.split("/");
	var tempLen = tempArray.length;
	var errorUrl = "";
	for(var i=0;i<tempLen+1;i++){
		errorUrl+="../";
	}
	errorUrl+=str+"example/error.html?thisTimeStrap="+new Date().getTime();
	return errorUrl;
}
//getErrorUrl();

var errorInfo = null;

function errorHandler(responseJSON){
	//errorInfo = xhr.responseJSON;
	errorInfo = responseJSON;
	var datas = [(errorInfo.data["@type"]?(errorInfo.data["@type"]+":"):"")+errorInfo.data.message];
	var stackTraceArray = errorInfo.data.stackTrace;
	for(var i=0;stackTraceArray!=null && i<stackTraceArray.length;i++){
		var item = stackTraceArray[i];
		datas.push("at " + item.className + "." + item.methodName + "(" + item.fileName + ":" +  item.lineNumber + ")");
	}
	errorInfo.data = datas.join("\r\n");
	openLayer({
        //ele:this,
        title : '<i class="text-info fa fa-search" style="padding-right:3px;font-size:12px;"></i>错误',
        //area : ["98%","96%"],
        url : getErrorUrl()
   	});
}

/**
 @author 周小建
 @time 2017-11-01
 @description Ajax助手，方便ajax调用。
 */
var ajaxHelper = function(postUrl,postData,successCallback,errorCallback,noLoading,sync){
	if($.isArray(postUrl)){
		portData = postUrl[1];
		successCallback = postUrl[2];
		errorCallback = postUrl[3];
		postUrl = postUrl[0];
	}
	if(postUrl==null || $.trim(postUrl)==""){
		//$.messager.alert("系统提示","路径为空");
		layer.msg("路径为空");
		return;
	}
	var loadingIndex="";
	postUrl = postUrl + (postUrl.indexOf("?")>-1?"&":"?") + "thisTimeStrap="+new Date().getTime();
	
	$.ajax({
		type: "POST",
		url: postUrl,
		data: postData,
		dataType:"json",
		async:sync!=true,
		cache:false,
		beforeSend:function(){
			if(!noLoading) loadingIndex = showLoading();
		},
		success:function(result,textStatus,xhr){
			if(!noLoading) closeLoading(loadingIndex);
			var success = result.success;
			if(success==false){
				errorHandler(xhr.responseJSON);
			}else{
				//errorInfo = null;
				/*
				if(typeof successCallback!="undefined" && successCallback!=null){
					//successCallback.call(result.msg);
					//successCallback(result).call();
					successCallback(result);
				}
				*/
				if($.isFunction(successCallback)){
					//successCallback.call(result.msg);
					//successCallback(result).call();
					successCallback(result);
				}
			}
		},
		error:function(xhr,textStatus,errorThrown){
			if(!noLoading) errorLoading(loadingIndex);
			errorHandler(xhr.responseJSON);
			/*
			//$.messager.progress("close");
			if(errorCallback!="undefined" && errorCallback!=null){
				//errorCallback.call();
				errorCallback();
			}
			*/
			if($.isFunction(errorCallback)){
				//errorCallback.call();
				errorCallback();
			}
		}
	});
}

/**
 @author 周小建
 @time 2017-11-01
 @description 处理递归Ajax调用。这是一个非常重要而又非常深奥的函数。
 */
var recurrenceAjaxHelper = function(array){
	/*
	function getSuccessCallback(pre,suf){
		if(!$.isFunction(pre)) return function(){};
		if(!$.isFunction(suf)) return pre;
		return function(){
			pre();
			suf();
		}
	}
	for(var i=0;i<array.length;i++){
		var item = array[i];
		if(i<array.length-1){
			item[2] = getSuccessCallback(item[2],array[i+1][2]);
		}
	}
	*/
	
	function getSuccessCallback(params){
		return function(){
			ajaxHelper(params);
		}
	}
	
	function appendFunction(func,otherFunc,i){
		var tempFunc = func;
		func = function(){
			tempFunc();
			if(array[i][4]!==false){				
				otherFunc();
			}
		}
		return func;
	}
	
	for(var i=array.length-1;i>=0;i--){
		var item = array[i];
		var tempHandler = getSuccessCallback(item);
		if(i==0) tempHandler();
		else array[i-1][2] = appendFunction(array[i-1][2],tempHandler,i-1);
	}
}
/*
//调用示例
var params = [
	[
		"/riskManageWeb/dictionary/getAllOptions",
		"",
		function(){
			alert("111");
			params[0][4] = "ok";
		}
		,null
	],
	[
		"/riskManageWeb/exportContract/queryForList",
		"",
		function(){
			alert("222");
			params[1][4] = "no";
		},
		null
	]
]
recurrenceAjaxHelper(params);
*/
/////////////////////////////////////////////////////////////通用函数结束/////////////////////////////////////////////////////////////


/////////////////////////////////////////////////////////////弹出窗口开始/////////////////////////////////////////////////////////////
//打开新窗口
var uuid = null;
var params = {};

/**
 @author 周小建
 @time 2017-11-01
 @description 打开弹出窗口。
 */
function openLayer(config){
	uuid = config.id ? config.id : "";
	var url = config.url ? config.url : "";
	if(url){
		if(url.indexOf("?")>-1){
			url += "&tempTime=";
		}else{
			url += "?tempTime=";
		}
		url += new Date().getTime();
	}
	var index = layer.open({
		type : config.type ? config.type : 2,
		//move : config.move ? config.move : false,
		skin : config.skin ? config.skin : "myLayui", // 样式类名
		title : config.title ? config.title : "窗口",
		area : config.area ? config.area : ["98%","96%"],
		content : url,
		//offset : config.offset ? config.offset : "t",
		success : function(layero,index){
			/*
			//console.log(config.id);
			if(config.id){
				var currentFrame = layero.find("iframe")[0].contentWindow.document;
				$("#uuid",currentFrame).val(config.id);
			}
			*/
		}
	});
	return index;
}
/////////////////////////////////////////////////////////////弹出窗口结束/////////////////////////////////////////////////////////////


/////////////////////////////////////////////////////////////Tab开始/////////////////////////////////////////////////////////////
/*
//当左侧菜单点击的时候右侧tab的操作
function openTab(title,href){
	//标记,右侧是否已经存在
	var flag = false; 
	var $main = parent.$("#main");
	var $tabs = parent.$("#fkTabs ul");
	var $tabsLi = $tabs.find("li");
	$.each($tabsLi,function(i,e){
		var newhref = $.trim($(e).find("a").attr("data-href"));
		if(newhref === href){
			//去掉右侧所有li标签的当前样式
			$tabsLi.removeClass("active");
			$(e).addClass("active");
			//右侧比较内容显示
			var index = $(e).index();
			//var $mainCon = parent.$("#main .con");
			var $mainCon = $main.find(".con");
			$mainCon.eq(index).addClass("active").siblings().removeClass("active");
			flag = true;
		}
	});
	
	//如果不存在
	if(!flag){
		//去掉右侧所有li标签的当前样式
		$tabsLi.removeClass("active");
		//创建元素
		var $li = $("<li></li>");
		$li.attr("class","active");
		var $a = $("<a></a>");
		$a.attr("href","javascript:;");
		$a.attr("data-href",href);
		$a.text(title);
		var $i = $("<i></i>");
		$i.attr("class","fa fa-close");
		$li.append($a);
		$li.append($i);
		//向右侧tab添加元素
		$tabs.append($li);
		//右侧内容区加载页面
		//var $main = parent.$("#main");
		$main.find(".con").removeClass("active");
		var $con = $("<div></div>");
		$con.attr("class","con active");
		$con.html('<iframe src="../'+href+'" frameborder="0" scrolling="yes" width="100%" height="100%"></iframe>');
		$main.append($con);
	}
}
*/

/**
 @author 周小建
 @time 2017-11-01
 @description 打开tab。
 */
function openTab(title,href,isFromMenu){
	var $main=getParentEleByKey("#main").find(".con").removeClass("active").end(),$tabs=getParentEleByKey("#fkTabs ul"),$tabsLi=$tabs.find("li");
	var $thisLi = $tabsLi.filter(".active");
	var index = $thisLi.index();
	$thisLi.removeClass("active");
	var exists = false;
	var $href = href;
	if($href instanceof jQuery){
		href = href.attr("data-href");
		isIframe = false;
	}
	
	$tabsLi.each(function(i,li){
		if($.trim($(this).find("a").attr("data-href"))===href){
			$(this).addClass("active");
			$main.find(".con").eq($(this).index()).addClass("active");
			exists = true;
			return false;
		}
	});
	if(!exists){
		//var now = new Date().getTime();
		var now = href instanceof jQuery ? href.attr("data-href") : href;
		
		var $li = $('<li class="active"><a key="'+now+'" href="javascript:void();" data-href="'+href+'">'+title+'</a><i class="fa fa-close"></i></li>');
		var $div = $('<div key="'+now+'" class="con active"></div>');
		if(isFromMenu){
			$li.appendTo($tabs);
			$div.appendTo($main);
		}else{
			$li.insertAfter($tabs.find("li").eq(index));
			$div.insertAfter($main.find("div.con").eq(index));
		}
		
		//var $iframe = $div.find("iframe");
		var targetWindow=null,targetObj=null;
		if($href instanceof jQuery){
			targetObj = $href.appendTo($div).css("display","block");
			targetWindow = top;
		}else{
			targetObj = $('<iframe src="../'+href+'" frameborder="0" scrolling="yes" width="100%" height="100%"></iframe>').appendTo($div);
			targetWindow = targetObj[0].contentWindow;
			
		}
		
		var $a = $li.find("a");
		if(top.tabInfo==null)top.tabInfo={};
		var thisKey = "";
		if(!isFromMenu && $thisLi.length>0){
			var $thisA = $thisLi.find("a");
			thisKey = $thisA.attr("key");
			var children = top.tabInfo[thisKey].children;
			if(children==null) top.tabInfo[thisKey].children=children=[];
			if($.inArray(now,children)<0)children.push(now);
		}
		//top.tabInfo[now] = {target:$a,parent:thisKey,children:[]};
		//top.tabInfo[now] = {target:$a,targetWindow:$iframe[0].contentWindow,parent:thisKey,children:[]};
		top.tabInfo[now] = {target:$a,targetWindow:targetWindow,parent:thisKey,children:[]};
	}
}

/**
 @author 周小建
 @time 2017-11-01
 @description 点击菜单修改左侧标签页盒子宽度。
 */
function changeRightTabWidth(boxId){
	var $box=getEleByKey(boxId),boxWidth=$box.width();
	var allLi=$box.find("ul li"),allLiWidth=20;
	$.each(allLi,function(i,e){
		allLiWidth += $(e).outerWidth();
	});
	if(allLiWidth > boxWidth){
		$.each(allLi, function(i,e){
			$(e).outerWidth(parseInt($(e).outerWidth() / (allLiWidth - 20) * (boxWidth - 20),10));
		});
	}else allLi.outerWidth("auto");
}

/**
 @author 周小建
 @time 2017-11-01
 @description 从父Tab页面中获取数据。
 */
function getVariableFromParentTab(name){
	var $thisLi = top.$("#fkTabs ul li.active");
	var parentTargetWindow = top;
	if($thisLi.length>0){
		var $thisA = $thisLi.find("a");
		var thisAKey = $thisA.attr("key");
		//alert(thisAKey);
		if(thisAKey && top.tabInfo!=null){
			var thisTabInfoObj = top.tabInfo[thisAKey];
			if(thisTabInfoObj!=null){
				var thisParent = thisTabInfoObj.parent;
				if(thisParent){
					//alert(thisParent);
					var parentTabInfoObj = top.tabInfo[thisParent];
					if(parentTabInfoObj!=null && parentTabInfoObj.targetWindow!=null){
						parentTargetWindow = parentTabInfoObj.targetWindow;
						//alert(parentTargetWindow.branch);
						//alert(parentTargetWindow.key);
					}
				}
			}
		}
	}
	if(name) return parentTargetWindow[name];
	return parentTargetWindow;
}

var parentTabWindow = getVariableFromParentTab();

/**
 @author 周小建
 @time 2017-11-01
 @description 关闭自己并刷新父Tab。
 */
function finishCallback(table){
	var parentTabWindow = getVariableFromParentTab();
	//var $table = table ? parentTabWindow.getEleByKey(table) : parentTabWindow.$table;
	//parentTabWindow.refreshTable($table);
	parentTabWindow.refreshTable(table);
	
	top.$("#fkTabs ul li.active").find("i").trigger("click");
}

$(function(){
	$.ajaxSetup({cache:false}); //关闭缓存
	
	//加载头部信息
	$("#fkHeader").load("../include/header.html");
	
	//加载左侧信息
	$("#fkLeft").load("../include/left.html");
	
	/**
	 @author 周小建
	 @time 2017-11-01
	 @description 右侧页签触发点击切换。
	 */
	$("#fkTabs ul").on("click", "li", function(e){
		if(!$(this).hasClass("active")){
			$(this).addClass("active").siblings().removeClass("active");
			$("#main .con").eq($(this).index()).addClass("active").siblings().removeClass("active");
		}
		processEvent(e);
	});
	
	/**
	 @author 周小建
	 @time 2017-11-01
	 @description 右侧页签触发点击关闭。
	 */
	$("#fkTabs ul").on("click","li i",function(e){
		var $li = $(this).parent();
		var index = $li.index();
		var key = $(this).siblings("a").attr("key");
		
		/**
		 @author 周小建
		 @time 2017-11-01
		 @description 这种实现方式只处理它的父级、子级、自己，而没有处理它的隔代祖先和隔代后代，还不够精确、通用和完美，所以将其注释，改为后面的匿名函数实现。
		 */
		/*
		if(top.tabInfo[key]!=null){
			//这种方式只处理了父级，没有处理隔代祖先
			var parent = top.tabInfo[key].parent;
			if(parent && top.tabInfo[parent]!=null){
				var tempChildren = top.tabInfo[parent].children;
				if(tempChildren!=null && tempChildren.length>0){
					var tempIndex = $.inArray(key,tempChildren);
					if(tempIndex>-1) tempChildren.splice(tempIndex,1);
				}
			}
			//这种方式只处理了子级，没有递归处理隔代后代
			var children = top.tabInfo[key].children;
			if(children!=null&&children.length>0){
				for(var i=0;i<children.length;i++){
					var item = children[i];
					delete top.tabInfo[item];
					$("#fkTabs ul").find("a[key='"+item+"']").parent().remove();
					$("#main").find("div.con[key='"+item+"']").remove();
				}
			}
			//处理自己
			delete top.tabInfo[key];
			$li.remove();
			$("#main .con").eq(index).remove();
		}
		*/
		
		
		/**
		 @author 周小建
		 @time 2017-11-01
		 @description 
		 			  以前实现版本的注释：
		 			  递归处理它的所有祖先，任何一代中，如果存在移除某子后，它的children为空，那么自己也要在它的父级的children中移除。
		 			  这是比较精细化的处理，也正好体现出递归方法的妙用，是属于从父级开始逐级上溯的单体（每一次递归体中只有一项）遍历，所以可以将其由递归改为while循环。
		 			  稍微深奥但也非常重要。
		 			  
		 			  现在实现版本的注释：
		 			  将它从父级的children中删除，由于它的父级并不删除，所以不再继续上溯它的隔代祖先，将原来的if(tempChildren.length==0) arguments.callee(parent);注释掉。
		 */
		(function deleteForefathers(key){//递归删除祖先Tab的tabInfo记录
			if(top.tabInfo[key]!=null){
				var parent = top.tabInfo[key].parent;
				//delete top.tabInfo[key];
				if(parent && top.tabInfo[parent]!=null){
					var tempChildren = top.tabInfo[parent].children;
					if(tempChildren!=null && tempChildren.length>0){
						var tempIndex = $.inArray(key,tempChildren);
						if(tempIndex>-1){ 
							tempChildren.splice(tempIndex,1);
							//if(tempChildren.length==0) arguments.callee(parent);
						}
					}
				}
			}
		})(key);
		
		/**
		 @author 周小建
		 @time 2017-11-01
		 @description 递归处理它及其它所有后代（包括自己、子级和隔代后代），任何一代中，先处理它的children对应的子级。
		 			  这是比较精细化的处理，也正好体现出递归方法的妙用，稍微深奥但也非常重要。
		 */
		(function deleteDescendants(key){//递归删除后代Tab及自己的tabInfo记录和dom对象
			if(top.tabInfo[key]!=null){
				var children = top.tabInfo[key].children;
				if(children!=null && children.length>0){
					for(var i=0;i<children.length;i++){
						var item = children[i];
						arguments.callee(item);
						//delete top.tabInfo(item);
						//$("#fkTabs ul").find("a[key='"+item+"']").parent().remove();
						//$("#main").find("div.con[key='"+item+"']").remove();
					}
				}
				delete top.tabInfo[key];
			}
			$("#fkTabs ul").find("a[key='"+key+"']").parent().remove();
			$("#main").find("div.con[key='"+key+"']").remove();
		})(key);
		
		if($("#fkTabs ul").find("li.active").length==0){
			$("#fkTabs ul").find("li").eq(index-1).addClass("active");
			$("#main .con").eq(index-1).addClass("active");
		}
		changeRightTabWidth("fkTabs");
		layer.closeAll();
		
		processEvent(e);
	});
});
/////////////////////////////////////////////////////////////Tab结束/////////////////////////////////////////////////////////////


/////////////////////////////////////////////////////////////处理query开始/////////////////////////////////////////////////////////////
/**
 @author 周小建
 @time 2017-11-01
 @description 弹出窗口的前置处理器。
 */
function popupPreHandler(obj,index){
	var $table = $(obj).closest("table");
	$table.bootstrapTable("uncheckAll");
	var $tr = $(obj).closest("tr");
	var row = $tr.find("td:eq(1)").text();
	var page = $table.bootstrapTable("getPage");
	var pageSize = page.pageSize;
	row = (row - 1) % pageSize;
	$table.bootstrapTable("check",row);
	var title = $tr.find("td:eq("+index+")").find("span").attr("title");
	return title;
}

/**
 @author 周小建
 @time 2017-11-01
 @description 更多按钮展开和收起操作。
 */
function queryEC(isExpand){
	var $advSearchBox = $("#advSearchBox");
	if($advSearchBox.length==0)return;
	var minHeight=parseInt($advSearchBox.attr("min-height"),10),maxHeight=parseInt($advSearchBox.attr("max-height"),10);
	var thisHeight = $advSearchBox.height();
	if(isExpand==null) isExpand = thisHeight==minHeight;
	var targetHeight=parseInt($advSearchBox.attr(isExpand?"max-height":"min-height"),10);
	$advSearchBox.animate({height:targetHeight},"fast");
	//$(this).find("i").removeClass("glyphicon-menu-down").addClass("glyphicon-menu-up").text("收起");
	$("#other").html('<i class="glyphicon glyphicon-menu-'+(isExpand?'up':'down')+'"></i>'+(isExpand?'收起':'更多'));
	$advSearchBox.nextAll("p.searchLine")[isExpand?"show":"hide"]();//这行代码是为了控制p标签，把分隔线p放在$advSearchBox内部或外部都可以运行，只是放在内部时没有意义而已。
	
	/*
	//改变表格的高度
	var $fixedTableContainer = $advSearchBox.closest("form").nextAll("div.tableBox:eq(0)").find("div.fixed-table-container:eq(0)");
	var originalHeight = $fixedTableContainer.attr("originalHeight");
	if(originalHeight==null) $fixedTableContainer.attr("originalHeight",$fixedTableContainer.height());
	if(isExpand){
		//$fixedTableContainer.height(210);
		$fixedTableContainer.height(originalHeight-maxHeight+minHeight);
	}else{
		$fixedTableContainer.height($fixedTableContainer.attr("originalHeight"));
	}
	$fixedTableContainer.find(".myTable").bootstrapTable("resetWidth");
	*/
	var $fixedTableContainer = $advSearchBox.closest("form").nextAll("div.tableBox:eq(0)").find("div.fixed-table-container:eq(0)");
	$fixedTableContainer.height(isExpand?($fixedTableContainer.height()-(maxHeight-minHeight)):($fixedTableContainer.height()+(maxHeight-minHeight))).find(".myTable").bootstrapTable("resetWidth");
}

/**
 @author 周小建
 @time 2017-11-01
 @description document初始化事件处理器。
 */
$(function(){
	//更多按钮的单击事件处理函数
	/**
	 @author 周小建
	 @time 2017-11-01
	 @description 更多按钮的鼠标单击事件处理函数，由于它的实现方式不太优雅和通用，所以将其废弃。
	 */
	/*
	$("#other").on("click",function(e){
		var searchBox = $(".searchBox");
		if(searchBox.outerHeight() == 80){
			$(".searchBox").animate({height:"40px"},200);
			$(this).html('<i class="glyphicon glyphicon-menu-down"></i>更多');
		}else{
			$(".searchBox").animate({height:"80px"},200);
			$(this).html('<i class="glyphicon glyphicon-menu-up"></i>收起');
		}
		processEvent(e);
	});
	*/
	
	/**
	 @author 周小建
	 @time 2017-11-01
	 @description 更多按钮的鼠标单击事件处理函数，是直接实现的版本，还不够优雅和通用，所以也将其废弃，改为后面的实现方式，抽取出一个通用处理函数。
	 */
	/*
	$("#other").click(function(e){
		var $advSearchBox = $("#advSearchBox");
		var minHeight = parseInt($advSearchBox.attr("min-height"),10),maxHeight = parseInt($advSearchBox.attr("max-height"),10);
		var thisHeight = $advSearchBox.height();
		if(thisHeight==minHeight){
			$advSearchBox.animate({height:maxHeight},"fast");
			//$(this).find("i").removeClass("glyphicon-menu-down").addClass("glyphicon-menu-up").text("收起");
			$(this).html('<i class="glyphicon glyphicon-menu-up"></i>收起');
		}else{
			$advSearchBox.animate({height:minHeight},"fast");
			//$(this).find("i").removeClass("glyphicon-menu-up").addClass("glyphicon-menu-down").text("更多");
			$(this).html('<i class="glyphicon glyphicon-menu-down"></i>更多');
		}
		processEvent(e);
	});
	*/
	
	/**
	 @author 周小建
	 @time 2017-11-01
	 @description 更多按钮的鼠标单击事件处理函数。
	 */
	$("#other").click(function(e){
		queryEC();
		processEvent(e);
	});
	
	/*
	//页签切换
	$("ul.nav-tabs").find("li a").off("click").on("click",function(e){
		$("ul.nav-tabs").find("li").removeClass("active");
		$(this).closest("li").addClass("active");
		var href = $(this).attr("href");
		$("div.tab-pane").removeClass("active");
		$(href).addClass("active");
		processEvent(e);
	});
	*/
	
	//单击页签时把验证失败弹出的气泡移除
	$(document).on("click","a[data-toggle='tab']",function(e){
		//$("div.tip-yellowsimple").hide();
		toggleDisplayTabPoshytip();
		processEvent(e);
	});
})
/////////////////////////////////////////////////////////////处理query结束/////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////加载数据///////////////////////////////////////////////////////////////////
/**
 @author 周小建
 @time 2017-11-01
 @description 显示进度条。
 */
function showLoading(){
	return layer.load(1, {shade: [0.1,'#000']});
}

/**
 @author 周小建
 @time 2017-11-01
 @description 关闭进度条。
 */
function closeLoading(index){
	layer.close(index);
}

/**
 @author 周小建
 @time 2017-11-01
 @description 出现错误，关闭进度条。
 */
function errorLoading(index){
	closeLoading(index);
	layer.msg("服务器出错,请联系管理员!");
}
////////////////////////////////////////////////////////////加载数据///////////////////////////////////////////////////////////////////


/////////////////////////////////////////////////////////////处理table开始/////////////////////////////////////////////////////////////
var $table = null;

/**
 @author 周小建
 @time 2017-11-01
 @description 添加表格附带的操作按钮。
 */
function addTableHeaderOpration(config){
	//<a id="import" href="javascript:void(0);" class="btn btn-ckts btn-xs"> <i class="glyphicon glyphicon-import"></i>导入</a>
	if(!$.isEmptyObject(config)){
		var $ele = getEleByKey(config.container),array=[];
		for(var i=0; i<config.btns.length; i++){
			var type = config.type || "";
			if(type=="button"){
                array.push('<button style="margin-left:10px" id="'+config.btns[i].id+'" type="button" title="'+config.btns[i].content+'" class="btn btn-ckts btn-xs"><i class="'+config.btns[i].className+'"></i>'+config.btns[i].content+'</button>');
            }else{
                array.push('<a id="'+config.btns[i].id+'" href="javascript:void(0);" title="'+config.btns[i].content+'" class="btn btn-ckts btn-xs"><i class="'+config.btns[i].className+'"></i>'+config.btns[i].content+'</a>');
            }
			//array.push('<a id="'+config.btns[i].id+'" href="javascript:void(0);" title="'+config.btns[i].content+'" class="btn btn-ckts btn-xs"><i class="'+config.btns[i].className+'"></i>'+config.btns[i].content+'</a>');
		}
		$ele.append(array.join(""));
	}
}

/**
 @author 周小建
 @time 2017-11-01
 @description 表格初始化。
 */
function queryData(config){
	//各种不同使用场景的参数处理，目的是为了保证多种使用情况的通用和兼容。
	if(!$table) $table = $("#table");
	var urlOrData=null,$container=null,columns=null;
	if(typeof config=="string" || (!$.isEmptyObject(config) && config.hasOwnProperty("success"))){//直接提供url或直接提供数据，如果是后者则格式为{data:{thisPageElements:[]}}
		urlOrData = config;
		$container = $table;
		config = {};
		columns = window.columns;
	}else if(!$.isEmptyObject(config)){//提供一个对象，里面可能包含url也可能直接提供数据，必须格式为{data:{thisPageElements:[]}}
		$container = config.$container;
		delete config.$container;
		if(!$container) $container = $table;
		urlOrData=config.urlOrData || config.url || config.data;
		delete config.urlOrData;
		delete config.url;
		delete config.data;
		columns = config.columns;
		if(!columns) columns = window.columns;
		delete config.columns;
	}else return $container;
	
	var defaultConfig = {
		classes : "table table-hover", // 添加样式名称
		striped : true, // 隔行变色
		toolbar : "#optionsBtn",
		toolbarAlign : "right",
		columns : columns,
		method: "post",
		clickToSelect : "true",
		contentType:"application/x-www-form-urlencoded; charset=UTF-8",
		buttonsClass : "ckts",
		/*
		//url : url,
		//sidePagination : "server",
		responseHandler : function(res){
			return {
				"total" : res.data.totalCount,
				"rows" : res.data.thisPageElements
			}
		},
		//totalField : "totalCount",
		//dataField : "thisPageElements",
		*/
		queryParamsType : "",
		queryParams : function(params){
			params = {
				pageSize : params.pageSize,
				pageNo : params.pageNumber,
				sortName : params.sortName,
				sortOrder : params.sortOrder 
			};
			//alert($("#thSearchForm").find(":input[name]").length);
			var $form = $container.closest("div.tableBox").prevAll("form:eq(0)");
			$.each($form.find(":input[name]"),function(i,e){
				var type = $(e).attr("type");
				if((type=="checkbox"||type=="radio")&& !$(e).attr("checked")){
					return true;
				}
				var value = $.trim($(e).val());
				if(value){
					if(!$(this).hasClass("myCombo") || $.trim($(this).siblings(".SearchInput").val()))
					params[$(e).attr("name")] = value;
				}
			});
			
			var $activeDD = $form.find("dd.active");
			if($activeDD.length==1){
				var $a = $activeDD.find("a.cur");
				if($a.length>0) params[$activeDD.attr("name")] = $a.attr("data-code");
			}else{
				$.each($form.find("dd"),function(i,e){
					var $a = $(this).find("a.cur");
					if($a.length>0){
						var value = $a.attr("data-code");
						if(value && value!="all") params[$(this).attr("name")] = value;
					}
				});
			}
			
			return params;
		},
		pagination : true,
		pageList : [10,20,50],
		//height : 412,
		pageSize : 10,
		height : 445,
		paginationLoop : false,
		paginationHAlign : "left",
		paginationDetailHAlign : "left",
		onCheck:function(row, $element){
			//$element.closest("tr").find("td").css("backgroundColor","#e1dddd");
			$element.closest("tr").find("td").css("backgroundColor","#e1dddd");
		},
		onCheckAll:function(rows){
			//$table.find("tbody").find("*").css("backgroundColor","#e1dddd");
			//$container.find("table:eq(0)").find("tbody").find("td").css("backgroundColor","#e1dddd");
			//$container.find("tbody").find("td").css("backgroundColor","#e1dddd");
			$container.find("tbody").find("td").css("backgroundColor","#e1dddd");
		},
		onUncheck:function(row,$element){
			$element.closest("tr").find("td").css("backgroundColor","");
		},
		onUncheckAll:function(rows){
			//$table.find("tbody").find("*").css("backgroundColor","");
			//$container.find("table:eq(0)").find("tbody").find("td").css("backgroundColor","");
			$container.find("tbody").find("td").css("backgroundColor","");
		},
		onClickRow : function(row,$element,field){
			params = row;
		},
		onPreBody : function(){
			var loadingIndex = showLoading();
			$container.attr("loadingIndex",loadingIndex);
		},
		onPostBody : function(){
			closeLoading($container.attr("loadingIndex"));
		},
		onLoadError : function(a,b){
			//errorLoading(loadingIndex);
			errorLoading($container.attr("loadingIndex"));
			errorHandler({success:false,data:{message:"加载错误"}});
		}
	};
	if(typeof urlOrData=="string"){
		$.extend(defaultConfig,{url:urlOrData,sidePagination:"server",responseHandler : function(res){return {"total":res&&res.data&&res.data.totalCount?res.data.totalCount:0,"rows" : res&&res.data&&res.data.thisPageElements?res.data.thisPageElements:[]}}},config);
	}else{
		$.extend(defaultConfig,{data:urlOrData.data.thisPageElements,sidePagination:"client"},config);
	}
	$container.bootstrapTable("destroy").bootstrapTable(defaultConfig);
	//if(config.mainTable)$container.closest("div.fixed-table-body").css("overflowY","scroll");
	if($container.closest("div.tableBox").prevAll("form.searchBox:eq(0)").find("i.glyphicon-menu-down").length>0){
		$container.closest("div.fixed-table-body").css("overflowY","scroll");		
	}
	queryEC(false);
	return $container;
}

/**
 @author 周小建
 @time 2017-11-01
 @description 刷新表格。
 */
function refreshTable($table){
	$table = $table?getEleByKey($table):window.$table;
	if(!$table||$table.length==0)$table = $("#table");
	$table.bootstrapTable("refresh");
}

/**
 @author 周小建
 @time 2017-11-01
 @description 格式化空的数据。
 */
function nullFormatter(value, row, index){
	return !value ? "" : value;
}

var key = "";
/**
 @author 周小建
 @time 2017-11-01
 @description 表格中格式化code或label。
 */
function lookInfoFormatter(value, row, index,len){
	if(!len){ len = 15; }
	if(value){
		var title = value;
		if(value.length>len){
			value = value.substr(0,len)+"..."
		}
		return '<a href="javascript:void(0);" title="'+title+'" key="'+(row[key?key:"id"])+'" class="text-info lookInfo">' + value + '</a>';
	}else{
		return "";
	}
}

/**
 @author 周小建
 @time 2017-11-01
 @description 格式化查看明细列。
 */
function viewDetail(value, row, index) {
	return '<a href="javascript:void(0);" key="'+(row[key?key:"id"])+'" class="text-info searchBtn"><i class="text-info fa fa-search"></i></a>';
}

/**
 @author 周小建
 @time 2017-11-01
 @description 初始化详情。
 */
function initDetailInfo(config){
	//console.log(config);
	if(config){
		var $row = $("<div class='row'><div>").appendTo($('#' + config.id));
		for(var i=0;i<config.elems.length;i++){
			$row.append('<div class="col-sm-4">'
				+ '<label class="col-sm-5 text-right">'
				+ config.elems[i].name + ':</label>'
				+ '<div class="col-sm-7">' + '<p id="'+config.elems[i].value+'" type="'+(config.elems[i].type ? config.elems[i].type : "")+'">'
				+ '</p></div></div>');
		}
	}
}

/**
 @author 周小建
 @time 2017-11-01
 @description 审核状态格式化。
 */
function examineStatusFormatter(value,row,index){
	var title = "",className = "";
	switch(value){
		case "2":
			title = "审核未通过";
			className = "fa-times-circle text-danger";
			break;
		case "1":
			title = "审核已通过";
			className = "fa-check-circle-o text-success";
			break;
		default:
			title = "未审核";
			className = "fa-question-circle-o text-warning";
			break;
	}
	return '<i title="'+title+'" class="fa '+className+'"></i>';
}

/**
 @author 周小建
 @time 2017-11-01
 @description 格式化关联状态。
 */
function formatterGlStatus(value, row, index){
	var title = "";
	var className = "";
	if(value=="0"){
		title = "未关联";
		className = "fa-times-circle text-danger";
	}else{
		title = "已关联";
		className = "fa-check-circle-o text-success";
	}
	return '<a href="javascript:void(0);" key="'+row[key?key:"id"]+'" class="text-info glBtn"><i title="'+title+'" class="fa '+className+'"></i></a>';
}

/**
 @author 周小建
 @time 2017-11-01
 @description 格式化标题(超过 len 个字符后就截取 len 个字符，后面使用“...”取代)。
 */
function labelTrimFormatter(value,row,index,len){
	if(!len){ len = 10; }
	var title = "";
	if(value){
		title = value;
		if(value.length>len){
			value = value.substring(0,len)+"...";
		}
	}else{
		value = ""; //这行代码会导致显示空值，所以注掉
	}
	return '<span title="'+title+'">'+value+'</span>';
}

/**
 @author 周小建
 @time 2017-11-01
 @description 查看货物清单。
 */
function viewGoods(value, row, index) {
	return '<a href="javascript:void(0);" title="查看货物清单" key="'+row[key?key:"id"]+'" class="text-info searchBtn"><i class="text-info fa fa-search"></i></a>';
}

//流程操作
function operationFormatter(value,row,index){
	if(!value) return "";
	return '<a href="javascript:void(0);" title="'+value+'" key="'+row[key?key:"id"]+'" class="text-info handleBtn">'+value+'</a>';
}
//初始化表格信息
function initBootStrapTable(config){
	$("#" + config.id).bootstrapTable("destroy").bootstrapTable({
		classes : "table table-hover table-no-bordered", // 添加样式名称
		striped : true, // 隔行变色
		pageNumber : 1,
		pageSize : 10,
		pageList : [ 10, 20, 50 ],
		height : 200,
		pagination : true,
		columns : config.columns,
		data : config.data
	});
}

/**
@author 周小建
@time 2017-11-01
@description 通用删除按钮事件处理函数。
*/
function deleteHandler(btn,key,$t,callback){
	if(!$t)$t=$table;
	if(key && $t) getEleByKey(btn).on("click",function(e){
    	var selectRows = $t.bootstrapTable("getSelections").map(function(item){return item[key];});
    	if(selectRows.length>0){
    		layer.confirm("确定要删除吗?",{btn:["确定"]},function(){
    			$t.bootstrapTable("remove",{field:key,values:selectRows})
    			layer.msg("删除成功!");
    			if(callback) callback($t.bootstrapTable("getData"));
        	});
		}else{
			layer.msg("没有要删除的数据!");
		}
		processEvent(e);
    });
	
}
/////////////////////////////////////////////////////////////处理table结束/////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////处理form开始/////////////////////////////////////////////////////////////
/**
 @author 周小建
 @time 2017-11-01
 @description 表单生成器。
 */
function formGenerator(obj,mode){
	if(obj && !$.isEmptyObject(obj) && obj.container){
		//var $container = typeof obj.container == "string" ?  $("#"+obj.container) : obj.container;
		var $container = getEleByKey(obj.container);
		//$container.addClass("tab-pane clearfix active");
		//var arr = [];
		$container.attr("min-height",$container.height());
		$container.parent().removeClass("row");
		if(obj.columns && obj.columns.length>0){
			var p = "";
			for(var i=0;i<obj.columns.length; i++){
				var column = obj.columns[i];
				if(column){
					//if(mode == "query") arr.push(getInputByType(column,mode)); else $container.append(getInputByType(column,mode));
					//$container.append(getInputByType(column,mode));
					var $input = getInputByType(column,mode,$container);
					if(mode!="query"){
						var key=column.col,pk=column.pk,bk=column.bk,type=$.trim(column.type)||"text",checkExistsUrl=column.checkExistsUrl;
						if(!p && pk) p = key; 
						if(type=="text" && bk!=null){
							if(bk==true) bk = 0;
							var keys = [];
							for(var j=0;j<obj.columns.length;j++){
								var c = obj.columns[j];
								var k = c.col,b=c.bk;
								if(b==true)b=0;
								if(b==bk){
									if(k==key)keys.unshift(k);else keys.push(k);
								}
							}
							keys.unshift(p);
							
							(function($input,keys,column){
								$input.on("blur",function(e){
									checkInputValueExists(keys,column.checkExistsUrl,column.extParams);
									processEvent(e);
								});
							})($input,keys,column);
						}
					}
				}
			}
		}
		$container.attr("max-height",$container.height());
		$container.parent().addClass("row");
		//if(mode=="query") $container.prepend(arr.join(""));
		return $container;
	}
}



/**
 @author 周小建
 @time 2017-11-01
 @description 特殊下拉列表
 			  这是一个全能的自定义下拉列表组件，是在复杂的自定义下拉列表组件基础上增加了页签和分组功能
 */
function ComboHandler(column,$div){
	var multi = column.multi==true;
	if(column.value) column.value = $.trim(column.value);
	var values = column.value?column.value.split(","):[];
	
	var inputStr = '<div class="ComboSearchArea" style="width:100%;">'+
				'<div class="SearchBOX" style="'+(column.width?('width:'+column.width+'px;'):"")+'">'+
					//'<div class="ui-input-ph-label"></div>'+
					'<input kind="'+column.col+'_Combo" class="SearchInput form-control input-sm" style="width:100%;height:100%;"/>'+
					'<input name="'+column.col+'" class="myCombo" style="display:none"/>'+
					'<span class="dropDownIcon glyphicon glyphicon-menu-down"></span>'+
				'</div>'+
			'</div>';
	$div.append(inputStr);
	var $inputs = $div.find("input");
	var $SearchInput=$inputs.eq(0),$valueInput=$inputs.eq(1);
	
	/**
	@athor:周小建
	@time:2012-12-04 11:30:00
	@description:下拉列表鼠标、键盘事件处理函数
	*/
	function keyupHandler($SearchInput,isRefresh){
		//var $third_conA = $(".third_tabchange_con .third_conA");
		//var $third_conB = $(".third_tabchange_con .third_conB");
		if(options.length==0){
			//$(".InfoPropmpt").hide();
			//$(".ui_select01").hide();
			$combostd.hide();
			$InfoPropmpt.hide();
			$currentDiv = $InfoPropmpt;
			return;
		}
		//$combostd.show();
		var value = $.trim($SearchInput.val());
		if(value && !isRefresh){
			var valueArray = value.split(",");
			var array = [];
			for(var i=0;i<valueArray.length;i++){
				itemValue = valueArray[i];
				if(itemValue){
					for(var j=0;j<options.length;j++){
						if(column.type=="AlmightySelect"){
							var innerOptions = options[j].data;
							for(var k=0;k<innerOptions.length;k++){
								var option = innerOptions[k];
								var text = option.text;
								var index = text.toUpperCase().indexOf(itemValue.toUpperCase());
								if(index>-1) array.push(option);
							}
						}else if(column.type=="SimpleSelect" || column.type=="PopularSelect" || column.type=="ComplexSelect"){
							var option = options[j];
							var index = option.text.toUpperCase().indexOf(itemValue.toUpperCase());
							if(index>-1) array.push(option);
						}
					}
				}
			}

			if(array.length>0){
				//$third_conB.find(".ui-pagenav .navbtns").attr("pageIndex",1);
				pagination(array,1);
				$InfoPropmpt.hide();
				//$ui_select01.slideDown();
				$combostd.slideDown();
				$third_conA.hide();
				$third_conB.show();
				$currentDiv = $combostd;
			}else{
				//$ui_select01.hide();
				$combostd.hide();
				$InfoPropmpt.html('提示：找不到【<font color="red">'+value+'</font>】').css({left:$SearchInput.offset().left,top:$SearchInput.offset().top + $SearchInput.closest(".SearchBOX").height()}).slideDown();
				$currentDiv = $InfoPropmpt;
			}
		}else{
			if(!value) {
				$valueInput.val("");
				$combostd.hide();
			}else{
				$InfoPropmpt.hide();
				//$ui_select01.slideDown();
				$combostd.slideDown();
			}
			if(column.type=="ComplexSelect"||column.type=="AlmightySelect"){
				$third_conA.show();
				$third_conB.hide();
			}else{
				$third_conA.hide();
				$third_conB.show();
				pagination(column.options,1,false,isRefresh);
			}
			$currentDiv = $combostd;
		}
	}
	
	/**
	@athor:周小建
	@time:2012-12-04 11:30:00
	@description:下拉列表鼠标、键盘事件处理函数
	*/
	$SearchInput
	/*
	.on("focus",function(e){
		$(this).siblings("span").fadeOut();
		$(this).siblings(".options").fadeIn();
		processEvent(e);
	})
	.on("blur",function(e){
		$(this).siblings("span").fadeIn();
		processEvent(e);
	})
	*/
	.on("click",function(e){
		$div.find(".dropDownIcon").click();
		processEvent(e);
	}).on("input propertychange",function(e){
		e = e || window.event || arguments.callee.caller.arguments[0];
		var keyCode = e.keyCode;
		if(true || (keyCode>=48 && keyCode<=57) || (keyCode>=65 && keyCode<=90) || (keyCode>=96 && keyCode<=111) || (keyCode>=186 && keyCode<=222) || keyCode==8 || keyCode==13 || keyCode==32 || keyCode==46 || keyCode==189){//这个if暂时恒true
			setTimeout(function(){keyupHandler($SearchInput);},10);
		}
		processEvent(e);
	});
	
	
	var $combostd = $('<div class="combostd x-selectcode x-selcode-combolist ui-wborder ui-layer-frame x-combolist-searchboxa">').appendTo(document.body);
	var $currentDiv= $combostd;
	$combostd.attr("kind",column.col);
	$SearchInput.data("$combostd",$combostd);
	$combostd.data("SearchInput",$SearchInput);
	//var $InfoPropmpt = $('<div class="InfoPropmpt"></div>').appendTo($combostd);
	var $InfoPropmpt = $('<div class="InfoPropmpt"></div>').appendTo(document.body);
	var $ui_select01 = $('<div class="ui_select01"></div>').appendTo($combostd);
	if(column.comboWidth) $ui_select01.width(column.comboWidth);
	if(column.comboHeight) $ui_select01.width(column.comboHeight);
	var $select = $('<div class="select">').appendTo($ui_select01);
	var $bottom_btn_box = $('<div class="bottom_btn_box" style="display: none">'+
						'<button class="ui_btn "><span class="add">新增记录</span></button>'+
					'</div>').appendTo($ui_select01);
	var $select_head = $('<div class="select_head"></div>').appendTo($select);
	var $select_body = $('<div></div>').appendTo($select);
	var $third_tabchange = $('<div class="third_tabchange banner tabchange">'+
			'<div style="float: left">'+
				'<i class="tabchange_icon glyphicon glyphicon-info-sign"></i>'+
				'<span class="tips_text">可录入 英文/拼音/中文</span>'+
			'</div>'+
			'<div style="float: left">&nbsp;</div>'+
			'<div class="btn-warp">'+
				(multi ? '<a href="javascript:void(0);" class="okBtn">确定</a>':'')+
				'<a href="javascript:void(0);" class="clearBtn">清空</a>'+
				//(column.type=="ComplexSelect"||column.type=="AlmightySelect"?'<a style="margin-right:5px;" href="javascript:void(0);" class="refreshBtn">刷新</a>':'')+
				'<a style="margin-right:5px;" href="javascript:void(0);" class="refreshBtn">刷新</a>'+
				'<a href="javascript:void(0);" class="closeBtn">关闭</a>'+
			'</div>'+
		'</div>').appendTo($select_body);
	if(column.comboTitle==false){
		$third_tabchange.find("div:eq(0)").hide();
	}else if(column.comboTitle=="simple"){
		$third_tabchange.find("span.tips_text").text("可录入搜索");
	}else if(typeof column.comboTitle=="string"){
		$third_tabchange.find("span.tips_text").text(column.comboTitle);
	}
		
	var $third_tabchange_con = $('<div class="third_tabchange_con"></div>').appendTo($select_body);
	var $third_conA = $("</div>");
	if(column.type=="ComplexSelect"||column.type=="AlmightySelect"){
		$third_conA = $('<div class="third_conA" style="display:block;"></div>').appendTo($third_tabchange_con);
		var $second_tabchange = $('<div class="second_tabchange banner tabchange"></div>').appendTo($third_conA);
		var $clearfix = $('<ul class="clearfix"></ul>').appendTo($second_tabchange);
		var $hirtory = $('<li name="CODEGRP_history" class="act" code="history"><span>历史使用</span></li>').appendTo($clearfix);
		var $second_tabchange_con = $('<div class="second_tabchange_con"></div>').appendTo($third_conA);
		var $second_conA = $('<div class="second_conA custom-scrollable0" style="display: block; height: 200px;"></div>').appendTo($second_tabchange_con);
		var $CODEGRP_history = $('<div class="addr_con addr_third" name="CODEGRP_history"></div>').appendTo($second_conA);
	}
	
	var $third_conB = $('<div class="third_conB" style="display: none;">'+
						'<div class="addr_con">'+
							'<div class="filter_box">'+
								'<table class="tb_con">'+
									'<tbody>'+
									'</tbody>'+
								'</table>'+
							'</div>'+
						'</div>'+
					'</div>').appendTo($third_tabchange_con);
	//分页列表
	var $filter_box = $third_conB.find(".filter_box");
	var $pagenav = $('<div class="ui-pagenav">'+
		'<span class="navpageinfo">总记录数:235,页次:1/24</span>'+
		'<div class="navbtns"></div>'+
		'</div>').appendTo($filter_box);
	
	var pageSize=column.pageSize||10,pageGroup=column.pageGroup||10;	
	
	//动态处理ABCD、EFGH等页签和内容
	var options = [];
	if(column.options!=null){
		var groupArray = [];
		var texts = [];
		var unit=4;
		var $groupDiv = null;
		options = column.options;
		for(var i=0;i<options.length;i++){
			var option = options[i];
			if(column.type=="AlmightySelect"){
				var kind = option.kind;
				var itemGroupArray = null;
				if(i%unit==0){
					itemGroupArray = [];
					groupArray.push(itemGroupArray);
				}else{
					itemGroupArray = groupArray[groupArray.length-1];
				}
				itemGroupArray.push(kind);
				if((i+1)%unit==0 || i==options.length-1){
					var str = itemGroupArray.join("");
					$('<li name="CODEGRP_'+str+'" class="nact"><span>'+str+'</span></li>').appendTo($clearfix);
					$groupDiv.attr("name","CODEGRP_"+str);
				}
				if(i%unit==0){
					$groupDiv = $('<div class="addr_con addr_third"></div>').appendTo($second_conA);
				}
				var dataArray = option.data;
				if(dataArray!=null && dataArray.length>0){
					$('<h3 class="head">'+
							'<span>'+kind+'</span>'+
							'<div class="line"></div>'+
						'</h3>').appendTo($groupDiv);
					var $itemGroupDiv = $('<div class="addr_con_row w33"></div>').appendTo($groupDiv);
					for(var j=0;j<dataArray.length;j++){
						var data = dataArray[j];
						var $a = $('<a href="javascript:void(0);" code="'+data.value+'">'+data.text+'</a>').appendTo($itemGroupDiv);
						if(values.length>0 && $.inArray(data.value,values)>-1){
							$a.addClass("active");
							texts.push(data.text);
						}
					}
				}
			}else if(column.type=="ComplexSelect"){
				if(i==0){
					$('<li name="CODEGRP_content" class="nact"><span>内容</span></li>').appendTo($clearfix);
					$groupDiv = $('<div class="addr_con addr_third"></div>').appendTo($second_conA).attr("name","CODEGRP_content");
					var $itemGroupDiv = $('<div class="addr_con_row w33"></div>').appendTo($groupDiv);
				}
				var $a = $('<a href="javascript:void(0);" code="'+option.value+'">'+option.text+'</a>').appendTo($itemGroupDiv);
				if(values.length>0 && $.inArray(option.value,values)>-1){
					$a.addClass("active");
					texts.push(option.text);
				}
			}else if(values.length>0 && $.inArray(option.value,values)>-1){
				texts.push(option.text);
			}
		}
		var oldText=$SearchInput.val(),oldCode=$valueInput.val();
		var text = texts.join(",");
		if(texts.length>0)$SearchInput.val(text).attr("text",text);
		if(column.value){ 
			$valueInput.val(column.value).attr("code",column.value);
			if($.isFunction(column.changeHandler)) column.changeHandler($valueInput,column.value,oldCode,$SearchInput,text,oldText);
		}
		
		if(column.type=="SimpleSelect" || column.type=="PopularSelect"){
			$third_conB.show();
			$combostd.hide();
			//pagination(options,1);
			//$SearchInput.attr("refresh","1").trigger("keyup");
			keyupHandler($SearchInput,true);
		}
	}
	
	/**
	@athor:周小建
	@time:2012-12-04 11:30:00
	@description:页面空白部分的鼠标单击处理函数
				第一种实现方式会导致执行多次，所以将其注释，改为后面第二种的直接的传统的事件处理函数方式。
	*/
	/*
	$(document).on("click",function(e){
		//if($(".InfoPropmpt").css("display")!="none" || $(".combostd").css("display")!="none"){
		if($(".InfoPropmpt:visible").length>0 || $(".combostd:visible").length>0){
			$(".InfoPropmpt").hide();
			//$(".ui_select01").hide();
			$(".combostd").hide();
			processEvent(e);
		}
	});
	*/
	document.onclick=function(e){
		//if($(".InfoPropmpt").css("display")!="none" || $(".combostd").css("display")!="none"){
		if($(".InfoPropmpt:visible").length>0 || $(".combostd:visible").length>0){
			$(".InfoPropmpt").hide();
			//$(".ui_select01").hide();
			$(".combostd").hide();
			processEvent(e);
		}
	};
	
	$ui_select01.on("click",function(e){
		processEvent(e);
	});
	
	
	
	/**
	@athor:周小建
	@time:2012-12-04 11:30:00
	@description:下拉列表小三角的鼠标单击事件处理函数（弹出下拉列表）
	*/
	$div.find(".dropDownIcon").on("click",function(e){
		/*
		//$(this).fadeOut().siblings("input").focus();
		$(this).siblings("input").focus();
		//$(".ui_select01").slideDown();
		$(this).closest(".col-xs-7").find(".combostd").slideDown();
		*/
		
		//$ui_select01.slideDown();
		//$ui_select01.show();
		
		//$combostd.css({left:$SearchInput.closest(".col-xs-7").css("paddingLeft"),top:$SearchInput.closest(".SearchBOX").height()+(parseInt($SearchInput.css("borderWidth"),10)||0)*2}).slideDown();
		var left = parseInt($SearchInput.offset().left,10);
		var allWidth = $(document.body).width();
		var combostdWidth = $combostd.width();
		if(left + combostdWidth>=allWidth) left = allWidth - combostdWidth - 20;
		$(".combostd").filter(function(i){return $(this).attr("kind")!=column.col;}).hide();
		$combostd.css({left:left,top:$SearchInput.offset().top + $SearchInput.closest(".SearchBOX").height()});
		$currentDiv.slideDown();
		processEvent(e);
	});
	
	/**
	@athor:周小建
	@time:2012-12-04 11:30:00
	@description:下拉列表页签鼠标单击事件处理函数（切换）
	*/
	var $lis = $third_tabchange_con.find(".third_conA .second_tabchange ul li");
	$lis.on("click",function(e){
		$lis.removeClass("act").addClass("nact");
		$(this).removeClass("nact").addClass("act");
		var name = $(this).attr("name");
		$third_tabchange_con.find(".third_conB").hide();
		$third_tabchange_con.find(".third_conA").show().find(".addr_con").hide().filter(function(){
			if(name==$(this).attr("name")) return true;
			return false;
		}).show();
		//$(".second_tabchange_con").niceScroll({cursorwidth: "10px"});
		setTimeout(function(){
			$second_tabchange_con.css("overflow","auto").css("overflow","hidden").niceScroll({cursorwidth: "10px"});
		},1);
		//setTimeout(function(){$(".second_tabchange_con").css("overflow","hidden");},2);
		processEvent(e);
	});
	
	
	/**
	@athor:周小建
	@time:2012-12-04 11:30:00
	@description:下拉列表初始化后定义滚动条
	*/
	if(column.type=="ComplexSelect"||column.type=="AlmightySelect") $second_tabchange_con.niceScroll({cursorcolor:"rgb(204,204,204)",cursorwidth:"10px"});
	
	/**
	@athor:周小建
	@time:2012-12-04 11:30:00
	@description:获取下拉列表数据
	*/
	/*
	var options = [];
	$second_tabchange_con.find(".addr_con .addr_con_row a").each(function(i){
		options.push($(this).text());
	});
	*/
	
	var cookieName = "riskManage_"+column.col;
	var codeTextSeparater = "&&&&&&&&&&";
	
	/**
	@athor:周小建
	@time:2012-12-04 11:30:00
	@description:创建历史使用
	*/
	function buildHistory(){
		var valueIntputValues = $.trim($valueInput.val()).split(",");
		var $history = $combostd.find(".addr_third.addr_con:first").empty();
		var cookie = getCookie(cookieName);
		if($history.length>0 && cookie){
			var cookieArray = cookie.split(",");
			//var filterArray = [];
			for(var i=0;i<cookieArray.length;i++){
				var item = cookieArray[i];
				if(item){
					var text = item.split(":")[0];
					var array = text.split(codeTextSeparater);
					var code = array[0];
					//if($.inArray(code,filterArray)==-1){
						//filterArray.push(code);
						text = array[1];
						var $a = $('<div class="line_div">'+
							'<a href="javascript:void(0);" code="'+code+'">'+
								'<span>'+text+'</span>'+
							'</a>'+
							'<i class="glyphicon glyphicon-remove"></i>'+
						'</div>'
						).appendTo($history).find("a");
						if(valueIntputValues.length>0 && $.inArray(code,valueIntputValues)>-1){
							$a.addClass("active");
						}
					//}
				}
			}
		}
	}
	buildHistory();

	/**
	@athor:周小建
	@time:2012-12-04 11:30:00
	@description:下拉列表数据分页
	*/
	function pagination(options,pageIndex,isNavigation,isRefresh){
		//if(options==null || options.length<=0) return [[],0,0,0,0,0];
		if(options==null || options.length==0)return;
		//var $navbtns = $(".ui-pagenav .navbtns");
		var $navbtns = $pagenav.find(".navbtns");
		if(isNavigation&&$navbtns.attr("pageIndex")==pageIndex)return;
		$navbtns.empty();
		var $tbody = $third_conB.find("tbody").empty();
		var valueInputValueArray = $.trim($valueInput.val()).split(",");;
		var SearchInputValueArray = $.trim($SearchInput.val()).split(",");
		
		var recordCount = options.length;
		var pageCount = parseInt(recordCount/pageSize,10);
		if(recordCount%pageSize!=0)pageCount+=1;
		if(pageIndex<=0) pageIndex = 1;
		if(pageIndex>pageCount)pageIndex = pageCount;
		var thisOptions = pageSize<0?options:options.slice((pageIndex-1)*pageSize,pageIndex*pageSize);
		if(thisOptions==null || thisOptions.length==0)return;
		var beginPage=0,endPage=0;
		if(pageCount>1){
			var pageGroupHalf = pageGroup/2;
			if(pageIndex<=pageGroupHalf){
				beginPage = 1;
				endPage = pageGroup<pageCount?pageGroup:pageCount;
			}else if(pageCount-pageIndex<=pageGroupHalf){
				endPage = pageCount;
				beginPage = pageCount-pageGroup+1;
				if(beginPage<1)beginPage = 1;
			}else{
				beginPage = pageIndex-pageGroupHalf+1;
				endPage = pageIndex + pageGroupHalf;
			}
		}
		//return [thisOptions,options.length,pageCount,pageIndex,beginPage,endPage];
		
		for(var i=0;i<thisOptions.length;i++){
			var option = thisOptions[i];
			var value = option.value;
			var text = option.text;
			for(var j=0;j<SearchInputValueArray.length;j++){
				var SearchInputValue = $.trim(SearchInputValueArray[j]);
				if(isRefresh || (!SearchInputValue && (column.type=="SimpleSelect" || column.type=="PopularSelect")) || (SearchInputValue && text.toUpperCase().indexOf(SearchInputValue.toUpperCase())>-1)){
					/*
					$tbody.append(
						'<tr>'+
							'<td nowrap="">'+
								'<a href="javascript:void(0);">'+
									'<span>'+ option.substring(0,index)+'</span>'+
									'<span class="bold" style="color:red;">'+option.substring(index,value.length)+'</span>'+
									'<span>'+option.substring(index+value.length)+'</span>'+
								'</a>'+
							'</td>'+
						'</tr>'
					);
					*/
					if(SearchInputValue && !isRefresh)text = text.replace(new RegExp(SearchInputValue.replace(/\[/g,"\\[").replace(/\]/g,"\\]"),"ig"),function(word){
						return '<font color="red">'+word+'</font>';
					});
					//$('<tr><td nowrap><a href="javascript:void(0);">'+text+'</a></td></tr>').appendTo($tbody).attr("realText",option);
					var $a = $('<tr><td nowrap><a href="javascript:void(0);" code="'+value+'">'+text+'</a></td></tr>').appendTo($tbody).find("a");
					
					var valueInputValue = valueInputValueArray[j];
					if(valueInputValue==value){
						$a.addClass("active");
					}
					break;
				}
			}
		}
		$pagenav.find(".navpageinfo").text("总记录数:"+options.length+",页次:"+pageIndex+"/"+pageCount);
		$navbtns.attr("pageIndex",pageIndex);
		if(beginPage!=0 && endPage!=0){
			$navbtns.append('<span class="firstpage ui-nagbtn ui-navbtn0 ui-btndisable" pageIndex="1">首页</span>');
			$navbtns.append('<span class="prevpage ui-nagbtn ui-navbtn0 ui-btndisable" pageIndex="'+(pageIndex-1<=0?1:(pageIndex-1))+'">上页</span>');
			for(var i=beginPage;i<=endPage;i++){
				$navbtns.append('<span class="pgindex'+i+' ui-nagbtn ui-'+(i==pageIndex?'btncurrpg':'btnenable')+'" pageIndex="'+i+'">'+i+'</span>');
			}
			$navbtns.append('<span class="nextpage ui-nagbtn ui-navbtn0 ui-btndisable" pageIndex="'+(pageIndex+1>=pageCount?pageCount:(pageIndex+1))+'">下页</span>');
			$navbtns.append('<span class="lastpage ui-nagbtn ui-navbtn0 ui-btndisable" pageIndex="'+pageCount+'">末页</span>');
			$navbtns.find("span").on("click",function(e){
				var thisPageIndex = $(this).attr("pageIndex");
				if(thisPageIndex && !$(this).hasClass("ui-btncurrpg")) pagination(options,thisPageIndex-0,true,isRefresh);
				processEvent(e);
			});
		}
		if(column.simplePagenav){
			$pagenav.find(".navpageinfo").hide();
			/*
			var $spans = $navbtns.find("span");
			$spans.slice(1,2).hide();
			$spans.slice(-2,-1).hide();
			*/
		}
		if(column.type=="SimpleSelect")
		$third_tabchange_con.height(300).css("overflow","auto").css("overflow","hidden").niceScroll({cursorcolor:"rgb(204,204,204)",cursorwidth:"10px"});
	}
	
	/**
	@athor:周小建
	@time:2012-12-04 11:30:00
	@description:确定按钮鼠标单击事件处理函数
	*/
	$third_tabchange.find(".btn-warp a.okBtn").on("click",function(e){
		var codeArray=[],textArray=[],valueArray=[];
		$(".addr_con",$combostd).find("a.active").each(function(i){
			var itemCode=$(this).attr("code"),itemText=$(this).text();
			if($.inArray(itemCode,codeArray)<0){
				codeArray.push(itemCode);
				textArray.push(itemText);
				valueArray.push(itemCode+codeTextSeparater+itemText);
			}
		});
		
		var oldText=$SearchInput.val(),text = textArray.join(",");
		$SearchInput.val(text).attr("text",text);
		var oldCode=$valueInput.val(),code=codeArray.join();
		$valueInput.val(code).attr("code",code);
		if($.isFunction(column.changeHandler)) column.changeHandler($valueInput,code,oldCode,$SearchInput,text,oldText);
		addCookie(cookieName,valueArray.join(","));
		//buildHistory();
		$third_tabchange.find(".btn-warp a.refreshBtn").trigger("click");
		$combostd.hide();
		processEvent(e);
	});
	
	/**
	@athor:周小建
	@time:2012-12-04 11:30:00
	@description:清空按钮鼠标单击事件处理函数
	*/
	$third_tabchange.find(".btn-warp a.clearBtn").on("click",function(e){
		$(".addr_con",$combostd).find("a").removeClass("active");
		var oldText=$SearchInput.val(),oldCode=$valueInput.val();
		$valueInput.val("").attr("code","");
		$SearchInput.val("").attr("text","");
		if($.isFunction(column.changeHandler)) column.changeHandler($valueInput,"",oldCode,$SearchInput,"",oldText);
		processEvent(e);
	});
	
	/**
	@athor:周小建
	@time:2012-12-04 11:30:00
	@description:刷新按钮鼠标单击事件处理函数
	*/
	$third_tabchange.find(".btn-warp a.refreshBtn").on("click",function(e){
		var oldText=$SearchInput.val(),oldCode=$valueInput.val();
		var code = $valueInput.attr("code")||"",text=$SearchInput.attr("text")||"";
		var codeArray = code.split(",");
		$valueInput.val(code);
		$SearchInput.val(text);
		if($.isFunction(column.changeHandler)) column.changeHandler($valueInput,code,oldCode,$SearchInput,text,oldText);
		
		if(column.type=="SimpleSelect"||column.type=="PopularSelect"){ 
			//$SearchInput.attr("refresh","1").trigger("keyup");
			keyupHandler($SearchInput,true);
		}
		
		if($second_tabchange)$second_tabchange.find("li:first").trigger("click");
		$combostd.find(".addr_third.addr_con:first").find("div.line_div").show();
		buildHistory();
		$(".addr_con a",$combostd).each(function(i){
			var $a = $(this);
			var itemCode = $a.attr("code");
			if($.inArray(itemCode,codeArray)>-1) $a.addClass("active");
			else $a.removeClass("active");
		});
		processEvent(e);
	});

	/**
	@athor:周小建
	@time:2012-12-04 11:30:00
	@description:关闭按钮鼠标单击事件处理函数
	*/
	$third_tabchange.find(".btn-warp a.closeBtn").on("click",function(e){
		//$ui_select01.hide();
		$combostd.hide();
		processEvent(e);
	});

	/**
	@athor:周小建
	@time:2012-12-04 11:30:00
	@description:下拉列表历史使用数据条目的鼠标单击事件处理函数（移除操作）
	*/
	$(".second_conA .addr_con",$combostd).on("click",".glyphicon-remove",function(e){
		$(this).closest("div.line_div").hide();
		//$(this).closest("div.line_div").remove();
		var $a = $(this).siblings("a:eq(0)");
		var code = $a.attr("code");
		var text = $.trim($a.text());
		removeCookie(cookieName,code+codeTextSeparater+text);
		processEvent(e);
	});

	/**
	@athor:周小建
	@time:2012-12-04 11:30:00
	@description:下拉列表数据条目鼠标单击事件处理函数（选中条目）
	*/
	//$(".addr_con a",document).on("click",backhaul);
	$("div.addr_con",$combostd).on("click","a",function(e){
		var code = $(this).attr("code");
		var $font = $(this).find("span,font");
		var text = "";
		if(false && $font.length>0){//这个if暂不执行
			var array = [];
			$font.each(function(){
				array.push($.trim($(this).text()));
			});
			text = array.join("");
		}else{
			text = $.trim($(this).text());
		}
		if(multi){
			$(this).toggleClass("active");
		}else{
			//$(".addr_con",$combostd).removeClass("active");
			//$(this).toggleClass("active");
			$(".addr_con a",$combostd).each(function(i){
				$(this)[($(this).attr("code")==code?"add":"remove")+"Class"]("active");
			});
			
			var oldText=$SearchInput.val(),oldCode=$valueInput.val();
			$SearchInput.val(text).attr("text",text);
			$valueInput.val(code).attr("code",code);
			if($.isFunction(column.changeHandler)) column.changeHandler($valueInput,code,oldCode,$SearchInput,text,oldText);
			
			//$ui_select01.hide();
			$combostd.hide();
			//delCookie(cookieName);return;
			addCookie(cookieName,code+codeTextSeparater+text);
			//buildHistory();
			if(column.type=="ComplexSelect"||column.type=="AlmightySelect")$third_tabchange.find(".btn-warp a.refreshBtn").trigger("click");
		}
		processEvent(e);
	});
}

var fjMap = {};

/**
 @author 周小建
 @time 2017-11-01
 @description 文件上传组件
 			  这是一个通用、全能的文件上传组件，支持文件后缀过滤、多文件上传、进度条、上传回显、下载、删除等功能，比较强大，也比较复杂。
 */
function FileHandler(column,$div){
	//input = '<input type="file" name="'+column.file+'" multiple class="file inputBtn"/>';
	//if($div) $input=$(input).appendTo($div);
	var $input=$('<input data_type="'+column.col+'" type="file" name="'+(column.name||'file')+'" class="file inputBtn"/>').appendTo($div);
	$input.fileinput({
		language : "zh",
		uploadUrl : column.uploadUrl,
		uploadExtraData : ($.isFunction(column.uploadExtraData)?column.uploadExtraData($input):column.uploadExtraData),
		showCaption : true,
		//captionClass : "input-sm block",
		//allowedFileTypes:(column.fileStyle?[column.fileStyle]:[]),
		//allowedFileExtensions : (column.fileStyle?[column.fileStyle]:[]),
		browseClass : "btn btn-default btn-sm",
		uploadClass : "btn btn-default btn-sm",
		removeClass : "btn btn-default btn-sm",
		dropZoneEnabled : false,
		showPreview : false,
		showUpload : false,
		showRemove : false,
		//msgUploadEnd:"完成",
		msgUploadError:"上传失败请检查！",
		msgProgress:"上传文件{index} of {files} - {name} - {percent}%已完成",
		progressClass:"hidden"
	}).on("change",function(e,file){//上传文件发生变化的回调函数
		//$("#input-id").fileinput("refresh",{uploadExtraData :{id: $("#addInfoForm input[name='ckht']").val()}});
		//console.log($(this).attr("data_type"));
		//console.log(this.getAttribute("data_type"));
		processEvent(e);
	}).on("filebatchselected",function(e,files){//上传文件选择对话框打开文件的回调函数
		var fileStyle = $.trim(column.fileStyle);
		if(files.length==0 || (fileStyle&&!new RegExp(fileStyle+"$").test(files[0].name))){
	        //parentTabWindow.layer.msg("文件格式错误！请上传zip压缩文件");
	        togglePoshytip($(this).closest("div.input-group").find("input:eq(0)"),"文件格式错误！请上传"+fileStyle+"文件",null,false);
	        $(this).fileinput("clear");
	        return false;
		}
        $(this).fileinput("upload");
		processEvent(e);
	}).on("fileuploaded",function(e,data,previewId,index){//上传成功的回调函数
		if(column.type=="upload"){
			var fj = data.response.data.fj;
			var type = $(this).attr("data_type");
			//if(type == "htywj") $("#fj1").val(fj+"-"+type);else if(type == "tbwj") $("#fj2").val(fj+"-"+type);else if(type == "zbwj") $("#fj3").val(fj+"-"+type);else if(type == "qt") $("#fj4").val(fj+"-"+type);else return;
			//layer.msg("上传成功");
			//if($(this).attr("data_type")=="htywj")
			togglePoshytip($(this).closest("div.input-group").find("input:eq(0)"),"上传成功",null,true);
			
			if(column.downloadUrl){
				//上传成功后显示开始
				$('<p class="xiazaiFile" style="margin-top:10px;margin-bottom:0"><a title="下载" href="'+column.downloadUrl+(column.downloadUrl.indexOf('?')==-1?'?':"&")+'attachmentId='+fj+'">'+data.files[0].name+'</a><a style="margin-left:10px;" href="javascript:;" class="deleteFile"><i class="glyphicon glyphicon-remove"></i></a></p>')
				.appendTo($(this).closest(".file-input").find(".xiazaiFile").remove().end()).find("a.deleteFile").off("click").on("click",function(e){
					var kind = $(this).closest("div.form-group").find(":file").attr("data_type");
					//delete fjMap[kind];
			        //fjMap[fj+"-"+kind]= "0";
			        //fjMap[kind] ={fj:fj,flag:"0"};
					if(!fjMap) fjMap = {};
			        var array = fjMap[kind];
			        if(array==null){
			            fjMap[kind]=array=[];
			       	}else{
			            for(var i = 0; i < array.length; i++) array[i].flag = "0";
			            //array[array.length-1].flag = "0";
			       	}
			       	//array.push({fj:fj,flag:"0"});
			       	$(this).closest("p").remove();
			       	processEvent(e);
				});
			}
		
			/*
			for(var key in fjMap){
			    if(key.indexOf(type)>-1){
			        delete fjMap[key];
			        break;
		       }
		   	}
		    //fjMap[type] = fj;
		    fjMap[fj+"-"+type] = "1";
		    */
		
			//重新上传的数据，设置标志为1，后台用于更新。之前的数据，设置标志为0，后台用于删除
		    var array = fjMap[type];
		    if(array==null){
		        fjMap[type]=array=[];
		   	}else{
		        for(var i = 0; i < array.length; i++) array[i].flag = "0";
		        //array[array.length-1].flag = "0";
		   	}
			array.push({fj:fj,flag:"1"});
			//setTimeout(function(){$("div.progress").hide()},1000);
			//上传成功后显示结束
		}else if(column.type=="import"){
			/*
			var result = data.response;
			if(result.success){
				if(result.msg) parent.layer.msg(result.msg);//提示
				if(review==1 && result.data!=null && result.data.length>0){
					for(var i=0;i<result.data.length;i++){ 
						result.data[i].seq = i;
						result.data[i].fpNumbers = result.data[i].numbers;
					}
					parent.dataCache.allCkhw = result.data;
					parent.isReview = true;
					var $container = parent.$("#ckhwTable");
					//parent.loadData($container,ckhwColumns,result.datas);
					$container.bootstrapTable("destroy").bootstrapTable({
						data:result.data,
						sidePagination:"client",
						classes : "table table-hover", // 添加样式名称
						striped : true, // 隔行变色
						//toolbar : "#optionsBtn",
						//toolbarAlign : "right",
						columns : parent.ckhwColumns,
						method: "post",
						clickToSelect : "true",
						contentType:"application/x-www-form-urlencoded; charset=UTF-8",
						buttonsClass : "info",
						pagination:false,
						onCheck:function(row, $element){
							$element.closest("tr").find("td").css("backgroundColor","#e1dddd");
						},
						onCheckAll:function(rows){
							//$table.find("tbody").find("*").css("backgroundColor","#e1dddd");
							$container.find("table:eq(0)").find("tbody").find("td").css("backgroundColor","#e1dddd");
						},
						onUncheck:function(row,$element){
							$element.closest("tr").find("td").css("backgroundColor","");
						},
						onUncheckAll:function(rows){
							//$table.find("tbody").find("*").css("backgroundColor","");
							$container.find("table:eq(0)").find("tbody").find("td").css("backgroundColor","");
						},
						onClickRow : function(row,$element,field){
							params = row;
						}
					});
				}
				//上传成功后
				//parent.layer.close(parent.layer.getFrameIndex(window.name));//成功后关闭页面 
	            parent.refreshTable(); //刷新页面
                $(".kv-upload-progress").show();
			}else{
				//parent.layer.msg("上传失败");//提示
                $(".kv-upload-progress").hide();
			}
			var message = '';
			var data = result.data;
			$.each(data,function (index,item) {
				message += item+'<br/>'
            });
			console.log(message);
			$("#message").html(message);
			*/
		}
		if($.isFunction(column.fileuploadedHandler))column.fileuploadedHandler(data);
		processEvent(e);
	}).on("fileerror",function(e,data,msg){//上传文件出错的回调函数
	    //layer.msg("上传失败!");
		togglePoshytip($(this).closest("div.input-group").find("input:eq(0)"),"上传失败!",null,false);
		errorHandler({success:false,data:data,msg:msg});
	    processEvent(e);
	});
}

/**
 @author 周小建
 @time 2017-11-01
 @description 根据类型获取input。
 */
function getInputByType(column,mode,$container){
	var required = column.required;
	if(required==null && $.isValidObject(column.validate)) required = column.validate.required;
	var display = column.display===false||column.type=="hidden"?' style="display:none;"':"";
	if(column.type=="hidden")column.type = "text";
	var type = $.trim(column.type) || "text";
	var label = column.label || "";
	var value = column.value || "";
	var search = column.search===true||column.text=="text"?' style="display:none;"':"";
	var readonly = column.readonly===true?'readonly="readonly"':'';
	var multiple = column.multiple===true?'multiple':'';
	
	var input="",prefix='<div'+display+' class="form-group ',suffix='';
	if(mode==null || mode=="form"){
		column.sm = 4;
		column.xs = 5;
		prefix += 'col-sm-'+(column.sm||12)+'"><label class="col-xs-'+(column.xs||0)+' control-label">'+(required?'<span class="text-danger req">*&nbsp;</span>':'')+ label + ':</label><div class="col-xs-'+(12-(column.xs||0))+'">';
		suffix='</div></div>';
	}else if(mode=="single"){
		column.sm = column.sm || 5;
		prefix += '"><label class="col-sm-'+(column.sm||12)+' control-label">' +(required?'<span class="text-danger req">*&nbsp;</span>':'')+label+':</label><div class="col-xs-'+(10-(column.sm||0))+'">';
		suffix='</div></div>';
	}else if(mode=="query"){
		//prefix += '"><label class="control-label">'+ column.label + ':&nbsp;</label>';
		//suffix='</div>';
		column.sm = 4;
		column.xs = column.xs || 5;
		prefix += '"><label class="pull-left control-label">'+(required?'<span class="text-danger req">*&nbsp;</span>':'')+ label + ':</label><div class="col-xs-'+(12-(column.xs||0))+'">';
		suffix='</div></div>';
	}
	
	var $div=null,$input=null;
	if($container && type!="tile"){ 
		$div = $(prefix+suffix).appendTo($container);
		//if(mode!="query")$div=$div.find("div[class^='col-xs']");
		$div=$div.find("div[class^='col-xs']");
		if(mode=="query") $div.css({"paddingLeft":10,"paddingRight":0});
	}
	
	switch(type){
		case "text":
			//input = '<input type="text"' + readonly + ' name="'+column.col+'" class="form-control input-sm" '+(column.readonly?'style0="cursor:pointer;background:#f8f6f6;"':'')+(column.readonly?' onfocus="this.blur();"':'')+ ' value="'+value+'"/>' +(search?'<a href="javascript:void(0);" key="" class="text-info searchBtn" style0="width:50px;height:20px;"><i class="fa fa-search" style0="width:30px;height:20px;position: absolute;right:-8px;top: 0px;padding:5px;"></i></a>':'');
			input = '<input type="text"' + readonly + ' name="'+column.col+'" class="form-control input-sm"'+(column.readonly?' onfocus="this.blur();"':'')+ ' value="'+value+'"/>' +(search?'<a href="javascript:void(0);" key="" class="text-info searchBtn"><i class="fa fa-search"></i></a>':'');
			if($div) $input=$(input).appendTo($div);
			break;
		case "select":
			var array = ['<select name="'+column.col+'" class="form-control input-sm" ' + multiple + '>'];
			/*
			var options = column.options;
			if(options.indexOf("ajax:")){
				options = options.substring(5);
				$.ajax({
					url:'/riskManageWeb/exportContract/selectOption?group='+group,
					async: true, 
					success:function(ret){
						cache[group] = ret;
					}
				});
			}
			*/
			
			if(column.options && column.options.length>0){
				for(var i=0;i<column.options.length;i++) array.push('<option value="'+column.options[i].value+'"'+(column.options[i].selected || (value!=""&&column.options[i].value==value)? ' selected' : '')+'>'+column.options[i].text+'</option>');
			}
			input = array.join('') + '</select>';
			if($div) $input=$(input).appendTo($div);
			break;
		case "MultiSelect":
			var array = ['<select name="'+column.col+'" class="form-control input-sm" ' + multiple + '>'];
			if(column.options && column.options.length>0){
				for(var i=0;i<column.options.length;i++) array.push('<option value="'+column.options[i].value+'"'+(column.options[i].selected || (value!=""&&column.options[i].value==value)? ' selected' : '')+'>'+column.options[i].text+'</option>');
			}
			input = array.join('') + '</select>';
			if($div){ 
				$input=$(input).appendTo($div);
				setselect2($input);
			}
			break;
		case "SimpleSelect":
			column.pageSize = -1;
			column.simplePagenav = true;
			ComboHandler(column,$div);
			break;
		case "PopularSelect":			
			ComboHandler(column,$div);
			break;
		case "ComplexSelect":
			ComboHandler(column,$div);
			break;
		case "AlmightySelect":
			/*
			input = '<input type="text" name="nation" class="form-control input-sm dropDownInput"/>'+
			'<span class="dropDownIcon glyphicon glyphicon-menu-down"></span>' + 
			'<div class="options">'+
				'<p><i class="glyphicon glyphicon-info-sign"></i>可录入 英文/拼音/中文<button type="button" class="btn btn-xs btn-default pull-right">刷新</button></p>'+
			'</div>';
			*/
			ComboHandler(column,$div);
			//if(mode==null || mode=="form") $div.find(".dropDownIcon");
			//if($div) $input=$(input).appendTo($div);
			break;
		case "tile":
			//将分隔线p放在$advSearchBox内部，如果要放在外部则将这段代码注释掉。周小建
			/*
			var $p = $container.find("p.searchLine");
			if($p.length==0){
				$p = $('<p class="searchLine" style="width:1000px;"></p>').appendTo($container);
				$p.width($(document.body).width()-parseInt($p.css("marginLeft")||0,10)-parseInt($p.css("marginRight")||0,10));
			}
			*/
			$div = $('<dl class="search_nav">'+
					'<dt>'+column.label+'：</dt>'+
					'<dd class="tab" name="'+column.col+'">'+
						/*	
						'<a data-itemame="status" data-code="all" class="cur">全部<i></i></a>'+
						'<a data-itemame="status" data-code="10">草拟<i></i></a>'+
						'<a data-itemame="status" data-code="11">修改<i></i></a>'+
						'<a data-itemame="status" data-code="15">驳回<i></i></a>'+
						'<a data-itemame="status" data-code="20">确认<i></i></a>'+
						'<a data-itemame="status" data-code="30">部门经理<i></i></a>'+
						'<a data-itemame="status" data-code="70">生效<i></i></a>'+
						*/
					'</dd>'+
					'</dl>').appendTo($container);
			var $dd = $div.find("dd");
			
			//把分隔线p放在$advSearchBox外部，如果要放在内部则可以将这段代码注释掉。周小建
			var $p = $container.parent().find("p.searchLine");
			if($p.length==0){
				$p = $('<p class="searchLine" style="width:1000px;"></p>').appendTo($container.parent());
				$p.width($($container.parent()).width()-parseInt($p.css("marginLeft")||0,10)-parseInt($p.css("marginRight")||0,10));
				//$p.css({position:"absolute",top:$dd.offset().top});
				$p.offset({top:$dd.offset().top}).css({left:15});
				//$dd.offset({top:$dd.offset().top+20});
				$('<div style="height:12px;">&nbsp;</div>').insertBefore($div);
			}
			
			if(column.options && column.options.length>0){
				var exists = false;
				for(var i=0;i<column.options.length;i++){
					var option = column.options[i];
					var itemValue = option.value;
					var itemText = option.text;
					if(itemText=="请选择")itemText="全部";
					var itemSelected = option.selected || (value!=""&&itemValue==value);
					if(itemSelected) exists = true;
					var $a = $('<a data-itemame="status" data-code="'+itemValue+'"'+(itemSelected?' class="cur"':'')+'>'+itemText+'<i></i></a>').appendTo($dd).on("click",function(e){
						var $thisDD = $(this).closest("dd");
						$thisDD.find("a").removeClass("cur");
						$(this).addClass("cur");
						$container.find("dd.tab").removeClass("active");
						$thisDD.addClass("active");
						$(this).closest("form").find("button.search:eq(0)").trigger("click");
						$thisDD.removeClass("active");
						processEvent(e);
					});
				}
				if(!exists && column.noValue!=true) $dd.find("a:eq(0)").addClass("cur");
			}
			break;
		case "radio":
			//var array = [];
			if(column.options && column.options.length>0){
				for(var i=0;i<column.options.length;i++){
					//array.push(column.options[i].text + '<input type="radio" name="'+column.col+'" class="form-control input-sm" value="'+column.options[i].value+'"' + (column.options[i].value==value?' checked="checked"':'') + '/>');
					$div.append('<span style="position:relative;top:-8px;padding-left:20px;padding-right:5px">' + column.options[i].text + '</span><input type="radio" name="'+column.col+'" class="form-control0 input-sm" value="'+column.options[i].value+'"' + (column.options[i].value==value?' checked="checked"':'') + '/>');
				}
				//read:    $.find(":radio[name='aaa']:checked").val("");		write:   $(":radio[name='aaa'][value='1']").attr("checked","checked");
				//$(":input[name='aaa']").val()
				//$("#aaa").val()
				
				//input = array.join("");
				//if($div) $input=$(input).appendTo($div);
				$input = $div.find(":radio");
				if($input.filter(":checked").length==0) $input.eq(0).attr("checked",true);
			}
			break;
		case "checkbox":
			input = '<input type="checkbox" name="'+column.col+'" class="form-control input-sm" value="1" checked="'+(value==1?"checked":"")+'"/>';
			if($div) $input=$(input).appendTo($div);
			break;
		case "date":
			input = '<input type="text" name="'+column.col+'" class="form-control input-sm" onclick="WdatePicker();" value="'+value+'"/><i class="fk_calendar glyphicon glyphicon-calendar"></i>';
			if($div) $input=$(input).appendTo($div);
			break;
		case "number":
			input = '<input type="number"' + readonly + ' name="'+column.col+'" class="form-control input-sm" '+(column.readonly?'style="cursor:pointer;background:#f8f6f6;"':'')+(column.readonly?' onfocus="this.blur();"':'')+ ' value="'+value+'"/>' +(search?'<a href="javascript:void(0);" key="" class="text-info searchBtn" style="width:50px;height:20px;"><i class="text-info fa fa-search text-center" style="width:30px;height:20px;position: absolute;right:-28px;top: 0px;padding:5px;"></i></a>':'');
			if($div) $input=$(input).appendTo($div);
			break;
		case "startEndDate":
			//<input id="d5221" type="text" name="signDateStart" class="form-control input-sm" onclick="var d5222=$dp.$('d5222');WdatePicker({onpicked:function(){d5222.click();},maxDate:'#F{$dp.$D(\'d5222\')}'})"/>
			//<i class="glyphicon glyphicon-minus" style="positon:relative; top:3px;color:#666;"></i>&nbsp;
			//<input id="d5222" type="text" name="signDateEnd" class="form-control input-sm" onclick="WdatePicker({minDate:'#F{$dp.$D(\'d5221\')}'})"/>
			var array = [];
			var now = new Date().getTime(),startId="d"+now,endId = "d"+(now+1);
			array.push('<input id="'+startId+'" type="text" name="'+column.dates[0].name+'" class="form-control input-sm" onclick="var '+endId+'=$dp.$(\''+endId+'\');WdatePicker({onpicked:function(){'+endId+'.click();},maxDate:\'#F{$dp.$D(\\\''+endId+'\\\')}\'})"/>');
			array.push('<i class="glyphicon glyphicon-calendar" style="position:relative;right:20px;top:3px;color:#999"></i>');
			array.push('<i class="glyphicon glyphicon-minus" style="positon:relative; top:3px;color:#ccc;left:-18px"></i>');
			array.push('<input id="'+endId+'" style="left:-18px" type="text" name="'+column.dates[1].name+'" class="form-control input-sm" onclick="WdatePicker({minDate:\'#F{$dp.$D(\\\''+startId+'\\\')}\'})"/>');
			array.push('<i class="glyphicon glyphicon-calendar" style="position:relative;right:35px;top:3px;color:#999"></i>');
			/*
			for(var i=0; i<column.dates.length; i++){
				array.push('<input type="text" name="'+column.dates[0].name+'" class="form-control input-sm" onclick="WdatePicker({minDate:\'#F{$dp.$D(\\\'d5221\\\')}\'})"/>');
				if(i==0){
					array.push('<i class="glyphicon glyphicon-minus" style="positon:relative; top:3px;color:#666;"></i>&nbsp;');
				}
			}*/
			input = array.join('');
			if($div) $input=$(input).appendTo($div.width(300));
			break;
		case "startEndMonth":
			var array = [];
			for(var i=0; i<column.dates.length; i++){
				array.push('<input type="text" name="'+column.dates[i].name+'" class="form-control input-sm" onclick="WdatePicker({dateFmt:\'yyyyMM\'});" />');
				if(i==0){
					array.push('<i class="glyphicon glyphicon-minus" style="positon:relative; top:3px;color:#666;"></i>&nbsp;');
				}
			}
			input = array.join('');
			if($div) $input=$(input).appendTo($div);
			break;
		case "textarea":
			var height = column.height ? "height:"+column.height+"px" : "";
			input = '<textarea style="'+height+'" class="form-control input-sm"  rows="'+(column.rowNum ? column.rowNum : 1)+'" name="'+column.col+'"></textarea>';
			if($div) $input=$(input).appendTo($div);
			break;
		case "monthday":
			input = '<input type="text" name="'+column.col+'" class="form-control input-sm" onclick="WdatePicker({dateFmt:\'yyyyMM\'});" value="'+value+'"/>';
			if($div) $input=$(input).appendTo($div);
			break;
		case "year":
			input = '<input type="text" name="'+column.col+'" class="form-control input-sm" onclick="WdatePicker({dateFmt:\'yyyy\'});" value="'+value+'"/>';
			if($div) $input=$(input).appendTo($div);
			break;
		case "creatpici":
			input = '<input type="text" name="'+column.col+'" class="form-control input-sm" readonly="readonly" value="'+value+'" style="background:#f8f6f6;"/>-<input type="text" name="'+column.col+'" class="input-sm" value="'+value+'"/>';
			if($div) $input=$(input).appendTo($div);
			break;
		case "startEndMoney":
			var array = [];
			for(var i=0; i<column.dates.length; i++){
				array.push('<input type="text" name="'+column.dates[i].name+'" class="form-control input-sm"/>');
				if(i==0){
					array.push('<i class="glyphicon glyphicon-minus" style="positon:relative; top:3px;color:#666;"></i>&nbsp;');
				}
			}
			input = array.join('');
			if($div) $input=$(input).appendTo($div);
			break;
		case "upload":
			FileHandler(column,$div);
			break;
		case "import":
			FileHandler(column,$div);
			break;
		default:
			//不处理
			break;
	}
	//return prefix + input + suffix;
	return $input?$input:(prefix+input+suffix);
}

/*
//获取下拉选项
var selectoption = {
	cache:{},
	get:function(group){
		var this_ = this;
		if(this.cache[group]){
			return this.cache[group];
		}else{
			$.ajax({
				url:"/riskManageWeb/exportContract/selectOption?group="+group,
				async: false, 
				success:function(ret){
					this_.cache[group] = ret;
				}
			});
			return this_.cache[group];
		}
	}
}
*/

/**
 @author 周小建
 @time 2017-11-01
 @description 获取某类型包括的所有字典数据，格式为[{text:"text1",value:"value1"},{text:"text1",value:"value1"}]，适合表单元素下拉选项。
 */
function getDicts(lxbm){
    //因为嵌套到门户中取，从top.dictionaryDetailMap完全获取不到所以先注释掉。
	return top.dictionaryGroupMap[lxbm] || [];
    //return lxbm
}

/**
 @author 周小建
 @time 2017-11-01
 @description 获取某类型包括的所有字典数据，格式为[{text:"text1",value:"value1"},{text:"text1",value:"value1"}]，适合查询框下拉选项，因为有“请选择”。
 */
function getDictsExt(lxbm){
	var dicts = getDicts(lxbm);
	var array = [{text : "请选择", value : ""}];
	$.merge(array,dicts);
	return array;
}

/**
 @author 周小建
 @time 2017-11-01
 @description 获取某类型包括的所有字典数据，格式为[{text:"text1",value:"value1"},{text:"text1",value:"value1"}]，适合表单元素下拉选项。
 */
function getSpecialDicts(lxbm){
    //因为嵌套到门户中取，从top.dictionaryDetailMap完全获取不到所以先注释掉。
	return top.specialDictionaryGroupMap[lxbm] || [];
    //return lxbm
}

/**
 @author 周小建
 @time 2017-11-01
 @description 获取某类型某代码对应的字典名称，通过类型和编码获取名称，适合表格中的code转name等情况。
 */
function getDict(lxbm,code){
	//因为嵌套到门户中取，从top.dictionaryDetailMap完全获取不打 所以先注释掉。
	 return (top.dictionaryDetailMap[lxbm]||{})[code];
	//return code;
}

/**
 @author 周小建
 @time 2017-11-01
 @description 获取某类型包括的所有字典数据，格式为[{text:"text1",value:"value1"},{text:"text1",value:"value1"}]，适合表单元素下拉选项。
 */
/*
function getDicts2(lxbm){
    //因为嵌套到门户中取，从top.dictionaryDetailMap完全获取不打 所以先注释掉。
	return top.dictionaryGroupMap2[lxbm] || [];
    //return lxbm
}
*/

/**
 @author 周小建
 @time 2017-11-01
 @description 获取某类型包括的所有字典数据，格式为[{text:"text1",value:"value1"},{text:"text1",value:"value1"}]，适合查询框下拉选项，因为有“请选择”。
 */
/*
function getDictsExt2(lxbm){
	var dicts = getDicts2(lxbm);
	var array = [{text : "请选择", value : ""}];
	$.merge(array,dicts);
	return array;
}
*/

/**
 @author 周小建
 @time 2017-11-01
 @description 获取某类型某代码对应的字典名称，通过类型和名称获取编码，适合表格中的name转code等情况。
 */
function getDict2(lxbm,name){
	//因为嵌套到门户中取，从top.dictionaryDetailMap完全获取不打 所以先注释掉。
	return (top.dictionaryDetailMap2[lxbm]||{})[name];
	//return code;
}

//联系方式
function initUserInfo(config){
	//console.log(config);
	if(config){
		var $row = $('<div class="row"></div>').appendTo($('#' + config.id));
		for(var i=0;i<config.elems.length;i++){
			$row.append('<div class="col-sm-6" style="margin-top:10px;border: 1px soild #000">'
				+ '<label class="col-sm-6 text-right">'
				+ config.elems[i].name + ':</label>'
				+ '<div class="col-sm-6">' + '<p id="'+config.elems[i].value+'">'
				+ '</p></div></div>');
		}
	}
}

/**
 @author 周小建
 @time 2017-11-01
 @description 设置表单数据。
 */
function setFormData(id,curr,rowData,config){
	if(!rowData) return;
	if(curr==null) curr = document;
	var $obj = null;
	if(id instanceof jQuery) $obj = id;
	else{
		$obj = $(id,curr);
		if($obj.length==0) $obj = $("#"+id,curr);
		if($obj.length==0) $obj = $("[name='"+id+"']",curr);
		if($obj.length==0) $obj = $("."+id,curr);
	}
	if($obj==null || $obj.length==0) return;
	$(":input",$obj).each(function(index,e){
		var name = $.trim($(e).attr("name"));
		if(name){ 
			var value = rowData[name];
			if($(e).is(":radio")){
				$(':radio[name="'+name+'"][value="'+value+'"]').attr("checked",true);
			}else if($(e).is(":checkbox")){
				$(':checkbox[name="'+name+'"][value="'+value+'"]').attr("checked",value!=null&&value!=false&&value!=""&&value!="0"&&value!="-1");
			}else{
				$(e).val(value);
			}
			if($(e).hasClass("myCombo")){
				//var $searchInput = $(e).siblings("input:eq(0)");
				var $searchInput = $(e).closest("div.SearchBOX").find("input[kind='"+name+"_Combo']:eq(0)");
				if(config==null) config = window.config;
				if($searchInput.length==1 && typeof config!="undefined" && !$.isEmptyObject(config)){
					var values = value.split(",");
					var columns = config.columns;
					for(var i=0;i<columns.length;i++){
						var column = columns[i];
						var col = $.trim(column.col);
						if(name==col){
							var type = column.type;
							var options = column.options;
							var texts = [];
							if(type=="AlmightySelect"){
								for(var j=0;j<options.length;j++){
									var option = options[j];
									var data = option.data;
									if(data!=null&&data.length>0){
										for(var k=0;k<data.length;k++){
											var itemOption = data[k];
											var itemText=itemOption.text,itemValue=itemOption.value;
											if($.inArray(itemValue,values)>-1){
												texts.push(itemText);
											}
										}
									}
								}
							}else{
								for(var j=0;j<options.length;j++){
									var option = options[j];
									var itemText=option.text,itemValue=option.value;
									if($.inArray(itemValue,values)>-1){
										texts.push(itemText);
									}
								}
							}
							$searchInput.val(texts.join(","));
							$("div.combostd[kind='"+name+"']").find("div.addr_con a").removeClass("active").filter(function(i){
								return $.inArray($(this).attr("code"),values)>-1;
							}).addClass("active");
							break;
						}
					}
				}
			}
		}
	});
}

/**
 @author 周小建
 @time 2017-11-01
 @description 单击“取消”按钮时关闭弹出窗口。
 */
$(document).on("click",".cancel",function(e){
	parent.layer.close(parent.layer.getFrameIndex(window.name));//获取窗口索引
	processEvent(e);
});

//处理合同关联
function handlerCancat(source,target,all){
	if(all){
		source.bootstrapTable("checkAll");
		var allSRows = source.bootstrapTable("getAllSelections");
		target.bootstrapTable("append", allSRows);
		source.bootstrapTable("removeAll");
	}else{
		var selectRows =  source.bootstrapTable("getSelections");
		target.bootstrapTable("append", selectRows);
		selectRows = selectRows.map(function(item){
			return item.id;
		});
		source.bootstrapTable("remove",{
			field : "id",
			values : selectRows
		});
	}
}
/////////////////////////////////////////////////////////////处理form结束/////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////JQuery提示开始/////////////////////////////////////////////////////////////
/**
@athor:周小建
@time:2012-12-04 10:30:00
@description:定义一个jquery验证中有关消息的poshytip的选项集合，专门为了验证消息的配置使用
*/
//首先定义一个选项集合
var poshytipBasicConfig = {
	//content: text,
	className: "tip-yellowsimple",
	showOn: "none",
	alignTo: "target",
	//alignX: "right",
	alignX: "center",
	//offsetX: inputId == "yzm" ? 125 : 5,
	//offsetX: 5,
	offsetY: 0,
	//alignY: "center"
	alignY: "top"
};

/**
@athor:周小建
@time:2012-12-04 11:00:00
@description:将两个选项集合进行合并，专门为了每个具体输入框的验证消息配置，这个方法需要在每个输入框中都调用一次，一般用在循环体中
*/
function getPoshytipConfig(idOrName,text){
	var empty = {};
	var poshytipXConfig = typeof getPoshytipXConfig == "function" ? getPoshytipXConfig(idOrName) : {};
	var poshytipYConfig = typeof getPoshytipYConfig == "function" ? getPoshytipYConfig(idOrName) : {};
	return $.extend(empty,poshytipBasicConfig,{content:text},poshytipXConfig,poshytipYConfig);
}

/**
@athor:周小建
@time:2012-12-04 11:30:00
@description:显示提示信息
*/
function togglePoshytip(idOrName,message,timeout,flag){
	function togglePoshytipTool(){
		/*
		if(messageArray){
			for(var i in messageArray){
				$(".tip-yellowsimple:contains('" + messageArray[i] + "')").remove();
			}
		}else{
			$(".tip-yellowsimple").remove();
		}
		*/
		if(idOrName != null && message != null){
			//var $obj = $("#" + idOrName);
			//if($obj.length <= 0) $obj = $(":input[name='" + idOrName + "']").eq(0);
			var $obj = getEleByKey(idOrName);
			var name = $obj.attr("data_type") || $obj.attr("name")||"";
			if(name && $obj.css("display")=="none") $obj = $obj.siblings("input[kind='"+name+"_Combo"+"']");
			
			var $thisTab = $obj.closest("div.tab-pane");
			var isActive = false;
			if($thisTab.length>0){
				var thisId = $thisTab.attr("id");
				var $lis = $("ul.nav-tabs").find("li");
				var $thisLi = $lis.find("a[href='#"+thisId+"']").closest("li");
				var $currLi = $lis.filter(".active");
				if($thisLi.is(".active")) isActive = true;
				else $thisLi.find("a").trigger("click");
			}
			
			/*
			if(flag==true) validateExtendConfig.success("",$obj);
			else if(flag==false) validateExtendConfig.errorPlacement($("div.tip-yellowsimple[name='"+($obj.attr("name")||"")+"']"),$obj);
			$obj.poshytip("destory");
			$obj.poshytip(getPoshytipConfig(idOrName,message));
			$obj.poshytip("show");
			//focusInput($obj.get(0));
			*/
			
			var $targetDiv = $obj.closest("div.input-group");
			if($targetDiv.length==0) $targetDiv = $obj.closest("div");
			if(flag==true){ 
				validateExtendConfig.success("",$obj);
				$targetDiv.removeClass("has-error").addClass("has-success");
			}else if(flag==false){
				$targetDiv.removeClass("has-success").addClass("has-error");
				$obj.poshytip("destroy");
				$obj.poshytip(getPoshytipConfig(name,message));
				$obj.poshytip("show");
				//$obj.nextAll("em,span.glyphicon-ok").remove();
				var $parent = $obj.hasClass("file-caption-name") ? $obj.parent().parent() : $obj.parent();
				$parent.find("span").filter(function(i){return $(this).hasClass("glyphicon-ok")&&$(this).hasClass("form-control-feedback");}).remove();
				validateExtendConfig.errorPlacement(null,$obj);
			}
			if(flag==true||flag==null){
				$obj.poshytip("destory");
				$obj.poshytip(getPoshytipConfig(name,message));
				$obj.poshytip("show");
			}
			
			//if($currLi!=null && !isActive) $currLi.find("a").trigger("click");
			
			//focusInput($obj.get(0));
		}
	}
	if(timeout) setTimeout(togglePoshytipTool,timeout); else togglePoshytipTool();
}

/**
@athor:周小建
@time:2012-12-04 11:30:00
@description:隐藏其它Tab中的提示信息
*/
function toggleDisplayTabPoshytip(){
	/*
	var $tabPanes = $("div.tab-pane");
	$tabPanes.filter(".active").each(function(i,div){
		var poshtipTargets = $(this).data("poshtipTargets");
		if(poshtipTargets!=null){
			$.each(poshtipTargets,function(j,item){
				item.show();
			});
		}
	});
	$tabPanes.not(".active").each(function(i,div){
		var poshtipTargets = $(this).data("poshtipTargets");
		if(poshtipTargets!=null){
			$.each(poshtipTargets,function(j,item){
				item.hide();
			});
		}
	});
	*/
	$("div.tab-pane").each(function(i,div){
		var isActive = $(this).is(".active");
		var poshtipTargets = $(this).data("poshtipTargets");
		if(poshtipTargets!=null){
			$.each(poshtipTargets,function(j,item){
				item[isActive?"show":"hide"]();
			});
		}
	});
}
/////////////////////////////////////////////////////////////JQuery提示结束/////////////////////////////////////////////////////////////



/////////////////////////////////////////////////////////////JQuery验证配置开始/////////////////////////////////////////////////////////////
/**
@athor:周小建
@time:2012-12-04 11:30:00
@description:全局验证消息
*/
var globalValidateMessageConfig={
	required:"不可为空",
	num:"必须是合法数字",
	validcharnum:"须是字母数字下划线组合",
	min:"最小{0}",
	max:"最大{0}",
	minlength:"最短{0}个字符",
	maxlength:"最长{0}个字符",
	equalTo:"必须与{0}相等",
	dateformat:"格式非法",
	range_other:"应是{0}",
	range:"应在{0}和{1}之间",
	rangelength_other:"长度应是{0}",
	rangelength:"长度应在{0}和{1}之间",
	age:"只能是合法数值",
	invalid:"非法",
	le:"不能大于{0}",
	ge:"不能小于{0}",
	tel:"非法",
	mobile:"非法",
	ip:"非法",
	qq:"非法",
	email:"非法",
	invalid:"非法"
};

/**
@athor:周小建
@time:2012-12-04 11:10:00
@description:定义默认的输入框验证消息的配置
*/
//之所以没有将这段代码放入公共包中，是因为涉及到具体气泡地方需要自定义
if(typeof $.validator!="undefined")
$.validator.setDefaults({
	showErrors: function(errorMap, errorList){
		$(".tip-yellowsimple").remove();
		this.defaultShowErrors();
		var $firstLi = null;
		for(var i = 0;this.errorList[i];i++){
			var error = this.errorList[i];
			var $element = $(error.element);
			var name = $element.attr("name");
			if(name && $element.css("display")=="none") $element = $element.siblings("input[kind='"+name+"_Combo"+"']");
			$element.poshytip("destroy");
			var $target = $(error.element);
			if($target.is(":hidden")) $target = $target.prevAll("input").eq(0);
			
			//如果当前Tab并不是活动的，那么让它自动触发一下单击，以便让其所有子元素可见从而确定气泡提示信息的精确位置，这相当于是一种切面编程中的前置处理。
			//主操作处理完毕之后，再进行一次反向处理，让原来活动的Tab仍然保持活动，这相当于是一种切面编程中的后置处理。
			//这是非常重要的处理技巧，值得认真研究和参考。
			//周小建	2017-12-18
			var $thisTab = $element.closest("div.tab-pane");
			var isActive = false;
			if($thisTab.length>0){
				var thisId = $thisTab.attr("id");
				var $lis = $("ul.nav-tabs").find("li");
				var $thisLi = $lis.find("a[href='#"+thisId+"']").closest("li");
				if($firstLi==null) $firstLi = $thisLi;
				var $currLi = $lis.filter(".active");
				if($thisLi.is(".active")) isActive = true;
				else $thisLi.find("a").trigger("click");
			}
			
			//$element.poshytip($.extend(options,{content:error.message,offsetX:error.element.id=="yzm"?125:5}));
			//$element.poshytip($.extend(options,{content:error.message,offsetX:getX(error.element.id)}));
			//$target.poshytip(getPoshytipConfig(error.element.id||error.element.name,error.message));//如果有了dom对象或其jQuery对象则最好直接使用而不用id或name
			$element.poshytip(getPoshytipConfig(error.element.name,error.message));
			$element.poshytip("show");
			$element.nextAll("em,span.glyphicon-ok").remove();
			
			if($currLi!=null && !isActive) $currLi.find("a").trigger("click");
		}
		if($firstLi!=null)$firstLi.find("a").trigger("click");
		
		
		for(var i = 0;this.successList[i];i++){
			var success = this.successList[i];
			var $element = $(success.element);
			var name = $element.attr("name");
			if(name && $element.css("display")=="none") $element = $element.siblings("input[kind='"+name+"_Combo"+"']");
			$element.poshytip("destroy");
			//$element.nextAll("span.glyphicon-remove").remove();
			//$element.nextAll("em.error").remove();
		}
	}
});

/**
@athor:周小建
@time:2012-12-04 10:10:00
@description:定义JQuery验证提示信息的扩展配置，主要用在JQuery验证的全局配置选项中
*/
var validateExtendConfig = {
	errorClass : "invalidField",
	errorElement: "em",
	/*
	errorPlacement : function(error,element){
		var $siblings = element.nextAll("font");
		var $lastSiblings = $siblings.eq($siblings.length - 1);
		$lastSiblings.text(error.text());//替换原来的提示信息
	},
	*/
	errorPlacement: function(error,element){
		if(error!=null&&error.length>0){
			//Add the `help-block` class to the error element
			error.addClass("help-block");
			//Add `has-feedback` class to the parent div.form-group
			//in order to add icons to inputs
			//element.parents(".col-sm-5").addClass("has-feedback");
			if(element.prop("type") === "checkbox"){
				error.insertAfter(element.parent("label"));
			}else{
				error.insertAfter(element);
			}
		}
		element.closest("div").addClass("has-feedback");
		//Add the span element,if doesn't exists,and apply the icon classes to it.
		//if(!element.nextAll("span")[0]) $("<span class='glyphicon glyphicon-remove form-control-feedback'></span>").insertAfter(element);
		//if(!element.nextAll("span.glyphicon-remove")[0]) $('<span class="glyphicon glyphicon-remove form-control-feedback"></span>').insertAfter(element);
		//if(!element.nextAll("span").filter(function(i){return $(this).hasClass("glyphicon-remove")&&$(this).hasClass("form-control-feedback");})[0]) $('<span class="glyphicon glyphicon-remove form-control-feedback"></span>').insertAfter(element);
		
		//if(!element.nextAll("span").filter(function(i){return $(this).hasClass("glyphicon-remove")&&$(this).hasClass("form-control-feedback");})[0]) $('<span class="glyphicon glyphicon-remove form-control-feedback"></span>').appendTo($(element).parent());
		var $parent = element.hasClass("file-caption-name") ? element.parent().parent() : element.parent();
		if(!$parent.find("span").filter(function(i){return $(this).hasClass("glyphicon-remove")&&$(this).hasClass("form-control-feedback");})[0]) $('<span class="glyphicon glyphicon-remove form-control-feedback"></span>').appendTo($parent);
	},
	success: function(label,element){
		//Add the span element,if doesn't exists,and apply the icon classes to it.
		
		var $parent = $(element).hasClass("file-caption-name") ? $(element).parent().parent() : $(element).parent();
		//$(element).nextAll("span.glyphicon-remove").remove();
		//$(element).nextAll("span").filter(function(i){return $(this).hasClass("glyphicon-remove")&&$(this).hasClass("form-control-feedback");}).remove();
		$parent.find("span").filter(function(i){return $(this).hasClass("glyphicon-remove")&&$(this).hasClass("form-control-feedback");}).remove();
		
		//if(!$(element).nextAll("span")[0]) $("<span class='glyphicon glyphicon-ok form-control-feedback'></span>").insertAfter($(element));
		
		/*
		if(!$(element).nextAll("span.glyphicon-ok")[0]){
			//$('<span class="glyphicon glyphicon-ok form-control-feedback"></span>').insertAfter($(element));
			$('<span class="glyphicon glyphicon-ok form-control-feedback"></span>').appendTo($(element).parent());
		}
		*/
		if(!$parent.find("span").filter(function(i){return $(this).hasClass("glyphicon-ok")&&$(this).hasClass("form-control-feedback");})[0])
		$('<span class="glyphicon glyphicon-ok form-control-feedback"></span>').appendTo($parent);
		
		$(element).nextAll("em").remove();
		$(element).poshytip("destroy");
	},
	highlight: function(element, errorClass){
		/*
		if(isFormSubmit){//如果是表单提交时触发的验证，则执行输入框闪动效果，如果是其它状况下的触发，则不执行
			if(!firstInvalidObj){//因为这个方法有可能会执行多次（只要发现一次错误就会执行一次），所以只将第一个错误项记录下来，并等待form验证失败后执行获取焦点操作
				firstInvalidObj = element;
			}
			$(element).fadeOut(function(){
				$(element).fadeIn()
			})
		}else{
			setTimeout(function(){
			//focusInput(element);
			text_onfocus(element);
			},1);
		}
		*/
		//$(element).parents(".col-sm-5").addClass("has-error").removeClass("has-success");
		var $targetDiv = $(element).closest("div.input-group");
		if($targetDiv.length==0)$targetDiv = $(element).closest("div");
		$targetDiv.addClass("has-error").removeClass("has-success");
		//$(element).nextAll("span:last").addClass("glyphicon-remove").removeClass("glyphicon-ok");
		var $parent = $(element).hasClass("file-caption-name") ? $(element).parent().parent() : $(element).parent();
		//$parent.find("span").filter(function(i){return $(this).hasClass("glyphicon-remove")&&$(this).hasClass("form-control-feedback");}).addClass("glyphicon-remove").removeClass("glyphicon-ok");
		$parent.find("span:last").addClass("glyphicon-remove").removeClass("glyphicon-ok");
		setTimeout(function(){
			//focusInput(element);
			text_onfocus(element);
		},1);
	},
	unhighlight: function(element,errorClass,validClass){
		var $targetDiv = $(element).closest("div.input-group");
		if($targetDiv.length==0)$targetDiv = $(element).closest("div");
		//$(element).parents(".col-sm-5").addClass("has-success").removeClass("has-error");
		$targetDiv.addClass("has-success").removeClass("has-error");
		//$(element).nextAll("span:last").addClass("glyphicon-ok").removeClass("glyphicon-remove");
		var $parent = $(element).hasClass("file-caption-name") ? $(element).parent().parent() : $(element).parent();
		//$parent.find("span").filter(function(i){return $(this).hasClass("glyphicon-remove")&&$(this).hasClass("form-control-feedback");}).addClass("glyphicon-ok").removeClass("glyphicon-remove");
		$parent.find("span:last").addClass("glyphicon-ok").removeClass("glyphicon-remove");
	}
}

var validateStandardConfig = {rules:{},messages:{}};

/**
@athor:周小建
@time:2010-12-04
@description:   这些处理是为了兼容多种情况，是非常重要的程序处理过程，里面包含了典型的数据结构转换和明确的程序思维逻辑，很值的看到这些代码的朋友进行查看和研究。
				不论用户有没有自定义基本选项集合，也不论定义中是否包含rules和messages，也不管字段的键是不是beanName.fieldName格式，都可以正常使用。
				如果用户自定义基本选项集合已经是标准集合，则将用户已经配置好的各个选项信息直接赋值过来进行使用，
				如果用户自定义基本选项集合中仅仅是短字段名格式，则直接将其改写为长字段名格式。
				如果用户自定义基本选项集合中没有rules或messages，则根据已有配置信息进行动态构建。
				也就是说，允许用户进行最简化、标准化、短字段名、长字段名、有message、无messages各种情况的随意的配置，这段程序都可以对其进行兼容方式的处理。
				也正因此，就加大了这段兼容程序的难度，必须考虑好多种因素，必须兼顾各种可能，而且代码尽可能的通用化、简洁化、标准化，既要正确、完善，还要高效、优雅、灵活、巧妙，
				一段程序逻辑的实现不但是一种技术，同时也是一种艺术。
				由于时间和精力的关系，这段实现代码只能达到尽可能的高效和优雅，必然还会有一些细微方面的缺陷和不足，我会在以后时间和精力允许情况下进行精化、细化、美化。
				参数示例：
				validateBasicConfig : {
					"userCode" :{
						required : true,//非空
						characterNum:true,//非法字符
						maxlength:40
					},
					"loginName":{
						required:true,
						//notStrictSpecChar:true,
						maxlength:40
					},
					"userName":{
						required:true,
						//characterNum:true,
						maxlength:60
					},
					"password":{
						required : true,
						characterNum:true,
						maxlength:10
					},
					"password2":{
						required : true,
						characterNum:true,
						maxlength:10,
						strEQInput:"password"
					},
					"birthday":{
						required : true,
						strictDate:true
					},
					"email":{
						email:true,
						maxlength:32
					},
					"cellphone":{
						mobile:true,
						maxlength:255
					},
					"address":{
						required:true,
						maxlength:600
					}
				}
*/
function getRealValidateStandardConfig(config,$insertOrUpdateForm){
	var validateBasicConfig = {};
	//先从config.columns的每个column中抽取其validate项，再覆盖合并到config.validateBasicConfig中，从而完成临时变量validateBasicConfig。
	if($.isValidArray(config.columns)){
		for(var i=0;i<config.columns.length;i++){
			var column = config.columns[i];
			var validate = column.validate;
			if(validate==null)validate = {};
			if(column.required)validate.required = true;
			if($.isValidObject(column) && $.isValidString(column.col) && $.isValidObject(validate)){
				var fieldName = $.trim(column.col);
				var originalValidate = validateBasicConfig[fieldName];
				if(originalValidate==null) validateBasicConfig[fieldName] = originalValidate = {};
				$.extend(true,originalValidate,validate);
				originalValidate["fieldText"] = $.trim(column.label);
			}
		}
	}
	if($.isValidObject(config.validateBasicConfig)) validateBasicConfig = $.extend(true,{},config.validateBasicConfig,validateBasicConfig);
	
	if($.isValidObject(validateBasicConfig)){
		for(var itemKey in validateBasicConfig){//itemKey为字段名
			var itemValue = validateBasicConfig[itemKey];
			if($.isValidString(itemValue)){//如果为username: "required"这样的直接配置则将字符串值转变为对象方便后续统一处理
				var obj = {};
				obj[itemValue] = true;
				itemValue = obj;
			}
			itemKey = $.trim(itemKey);
			var newItemKey = itemKey;
			var fieldName = itemKey;
			
			var fieldText = null;
			var tempFieldText = validateBasicConfig[fieldName]["fieldText"];//有可能用户提供的集中验证配置中内置了label
			if($.isValidString(tempFieldText)){
				fieldText = $.trim(tempFieldText);
				delete validateBasicConfig[fieldName]["fieldText"];
			}else{
				fieldText = getFieldText(fieldName,config,$insertOrUpdateForm);
			}
			
			if(!$.isEmptyObject(validateStandardConfig.rules[fieldName])){
				$.extend(true,validateStandardConfig.rules[newItemKey],validateStandardConfig.rules[fieldName]);
				delete validateStandardConfig.rules[fieldName];
			}else if($.isEmptyObject(validateStandardConfig.rules[newItemKey])){
				validateStandardConfig.rules[newItemKey] = itemValue;
			}
			
			for(var itemChildKey in itemValue){
				var itemChildValue = itemValue[itemChildKey];
				if(itemChildKey=="rangelength" && !$.isArray(itemChildValue)){
					itemValue[itemChildKey] = [itemChildValue,itemChildValue];
					break;
				}
			}
			
			validateStandardConfig.messages[newItemKey] = {};
			//var valueParamSpecialKeys = ["min","max","lt","le","gt","ge","minlength","maxlength"];
			var valueParamSpecialKeys = ["min","max",
			"strEQVal","strNEVal","strGTVal","strGEVal","strLTVal","strLEVal","strGMVal","strGHVal","strLMVal","strLHVal",
			"lenEQVal","strNEVal","lenGTVal","lenGEVal","lenLTVal","lenLEVal",
			"numEQVal","numNEVal","numGTVal","numGEVal","numLTVal","numLEVal",
			"dateEQVal","dateNEVal","dateGTVal","dateGEVal","dateLTVal","dateLEVal",
			"length"];
			var inputParamSpecialKeys = ["equalTo",
			"strEQInput","strNEInput","strGTInput","strGEInput","strLTInput","strLEInput","strGMInput","strGHInput","strLMInput","strLHInput",
			"lenEQInput","lenNEInput","lenGTInput","lenGEInput","lenLTInput","lenLEInput",
			"numEQInput","numNEInput","numGTInput","numGEInput","numLTInput","numLEInput",
			"dateEQInput","dateNEInput","dateGTInput","dateGEInput","dateLTInput","dateLEInput"];
			function existsInArray(source,array){
				if(source==null || typeof source!="string" || $.trim(source).length==0 || !$.isArray(array) && array.length==0) return false;
				source = $.trim(source);
				for(var i=0;i<array.length;i++){
					var item = array[i];
					if(item==null || typeof item!="string" || $.trim(item).length==0)continue;
					if(source==$.trim(item)) return true;
				}
				return false;
			}
			for(var itemChildKey in itemValue){
				var itemChildValue = itemValue[itemChildKey];
				itemChildKey = $.trim(itemChildKey);
				var tempValidateMessage = jQuery.validator.messages[itemChildKey];
				if(existsInArray(itemChildKey,valueParamSpecialKeys)){
					if($.isValidString(itemChildValue))tempValidateMessage = tempValidateMessage.replace("{0}",itemChildValue);
					else if($.isValidArray(itemChildValue)){
						$.each(itemChildValue,function(i,n){
							tempValidateMessage = tempValidateMessage.replace(new RegExp("\\{" + i + "\\}", "g"),function(){
								return n;
							});
						});
						var regexpStr = "\\{\\d+?\\}";
						if(new RegExp(regexpStr,"g").test(tempValidateMessage)){
							tempValidateMessage = tempValidateMessage.replace(new RegExp(regexpStr,"g"),"").replace("加","");
						}
					}
				}else{
					if(itemChildKey=="range" || itemChildKey=="rangelength"){//最特殊情况
						var tempFirstVal = $.isArray(itemChildValue) ? $.trim(itemChildValue[0]) : itemChildValue;
						var tempSecondVal = $.isArray(itemChildValue) ? $.trim(itemChildValue[1]) : null;
						if(isNaN(tempFirstVal) || (tempSecondVal && isNaN($.trim(tempSecondVal)))){
							//$.messager.alert("系统提示",itemKey + "的" + itemChildKey + "验证配置的参数必须为数字");
							layer.msg("系统提示",itemKey + "的" + itemChildKey + "验证配置的参数必须为数字");
							return false;
						}
						if(!tempSecondVal || tempFirstVal==tempSecondVal){
							tempValidateMessage = tempValidateMessage.substring(0,tempValidateMessage.indexOf("{0}")+3).replace("在","为");
							tempValidateMessage = tempValidateMessage.replace("{0}",tempFirstVal);
						}else{
							tempValidateMessage = tempValidateMessage.replace("{0}",tempFirstVal<=tempSecondVal?tempFirstVal:tempSecondVal);
							tempValidateMessage = tempValidateMessage.replace("{1}",tempFirstVal<=tempSecondVal?tempSecondVal:tempFirstVal);
						}
					}else if(existsInArray(itemChildKey,inputParamSpecialKeys)){
						var tempValue = $.isValidString(itemChildValue)? itemChildValue : itemChildValue[0];
						tempValidateMessage = tempValidateMessage.replace("{0}","【<font color='red'>" + getFieldText(tempValue.replace(/^[^\w]*/ig,""),config,$insertOrUpdateForm).replace(/[:：\s]*$/,"") + "</font>】");
					}
				}
				tempValidateMessage = "【<font color='red'>" + fieldText + "</font>】" + tempValidateMessage;
				validateStandardConfig.messages[newItemKey][itemChildKey] = tempValidateMessage;
			}
		}
	}
	return validateStandardConfig;
}

/**
@athor:周小建
@time:2010-12-04
@description:为表单注册验证配置，这是外部调用时的最外层接口。
*/
function registerValidate($insertOrUpdateForm,config){
	if($insertOrUpdateForm!=null && !$.isEmptyObject(config)){
		if($.isValidString($insertOrUpdateForm)){
			$insertOrUpdateForm = $.trim($insertOrUpdateForm);
			var $form = $("#"+$insertOrUpdateForm);
			if($form.length==0){
				$form = $("form[name='" + $insertOrUpdateForm + "']");
				if($form.length==0) return;
			}
			$insertOrUpdateForm = $form.eq(0);
		}else if($insertOrUpdateForm instanceof jQuery){
			if($insertOrUpdateForm.length==0)return;
			$insertOrUpdateForm = $insertOrUpdateForm.eq(0);
		}else if(typeof $insertOrUpdateForm == "object"){
			$insertOrUpdateForm = $($insertOrUpdateForm);
			if($insertOrUpdateForm.length==0) return;
			$insertOrUpdateForm = $insertOrUpdateForm.eq(0);
		}
		$insertOrUpdateForm.validate($.extend(true,getRealValidateStandardConfig(config,$insertOrUpdateForm),validateExtendConfig));
	}
}
/////////////////////////////////////////////////////////////JQuery验证配置结束/////////////////////////////////////////////////////////////


/////////////////////////////////////////////////////////////输入框通过ajax进行唯一验证开始/////////////////////////////////////////////////////////////
/**
@athor:周小建
@time:2012-12-04 11:35:00
@description:定义输入框检测的历史记录集合
*/
var cacheDataMap = {};


/**
@athor:周小建
@time:2012-12-04 11:50:00
@description:得到新的某值是否存在、使用次数数据信息后加入历史记录中。
			 这个函数只针对于：先查询历史记录发现没有对应项，于是查询数据库，从数据库得到到底是否存在的结论，然后将这些数据追加到历史记录集合中
*/
var insertHistoryArray = function(historyKey,thisValue,exists){
	var historyArray = cacheDataMap[historyKey];//获取某个输入框的历史记录，它应该是个包含多个数值Map信息的数组
	var tempMap = {};
	tempMap["data"] = thisValue;
	tempMap["exists"] = exists;
	if(historyArray && historyArray.length > 0){
		var i = 0;
		for(;i < historyArray.length;i++){
			var sortItem = historyArray[i];
			if(!sortItem["count"] || sortItem["count"] <= 0){
				historyArray.splice(i,0,tempMap);//将刚刚查询定位的那个数组元素itemMap添加到恰当的位置（所有不存在count或者count为0的元素之前）
				//historyArray.splice(i,0,{historyKey : thisValue,"exists" : exists});//将刚刚查询定位的那个数组元素item添加到恰当的位置
				//usernameArray.splice(key + 1,1);//然后删除掉刚刚查询定位的那个数组元素item
				break;
				/*
				@athor:周小建
				@time:2012-12-04 12:00:00
				@description:从数组集合的开头进行处理，比较其使用次数，这相当于实现了最近最少用策略，
							 另外，判断条件中是<=  如果存在次数相同的情况，则找到第一个符合的数组元素，就在那个位置插入新的数组元素，等于是实现了先进先出策略。
							 即先实现最近最少用，再在使用次数相同的情况下实现先进先出。
				*/
				
			}
		}
		if(i != 0 && i >= historyArray.length){
			//如果在历史记录中查询，发现没有对应项，则直接进行push
			//其实这个i不可能为0，因为外层的if已经限定了historyArray必然非空，现在的i必然不为0，而加上它也没错，程序更严格。
			historyArray.push(tempMap);
		}
	}else{
		historyArray = [];
		historyArray.push(tempMap);
	}
	if(historyArray.length >= 10){
		historyArray.pop();
	}
	cacheDataMap[historyKey] = historyArray;
}

/**
@athor:周小建
@time:2012-12-04 12:10:00
@description:从输入框检测的历史记录集合中检索某个历史记录值，如果发现存在对应项，则对其进行查询次数加1，将其进行移位到合适的位置，并且取出它的exists值返回
			 如果没有发现对应项，则返回-1
			 这个函数只对已经存在的数据项进行各种更新，如果当前查询的不在历史记录中，则不会添加它，
			 至于添加它，要等到查询数据库得到确定的是否存在结论时才去调用insertHistoryArray来添加它
			 或者在更新模式下，如果用户没有改变当前值（即当前值与备份值保持相等），则直接将两者的值添加到历史记录中
			 【
			 这种情况下不用查询数据库来获得结论，因为备份值在数据库中必然已存在。
			 虽然历史记录中将备份值直接加入历史记录并设置为已存在，但不会发生这种情况：当前值正好相等与备份值时返回已存在从而导致更新操作模式产生逻辑错误。
			 这是因为查询数据库前都要先做一些前提判断，先判断是否是更新模式并且当前值恰好就是备份值，如果是则直接得出结果，而不去通过历史记录，更不通过查询数据库，具体逻辑是：
			 if(!thisValue){return false;}
			 if(thisValue == thatValue){return true;}
			 thisValue是必然非空的，如果thisValue与thatValue正好相等，可以得出结论，现在是更新模式，并且恰好是用户没做更改，此时应该给用户返回1，即不存在
			 】
*/
var locateHistoryArray = function(historyKey,thisValue){
	var flag = -1;//默认不存在这个元素
	var historyArray = cacheDataMap[historyKey];//每个输入框代表cacheDataMap中的一项
	if(historyArray!=null){
		for(var i=0;i<historyArray.length;i++){
			var itemMap = historyArray[i];
			if($.trim(thisValue)==$.trim(itemMap["data"])){//存在这个对应元素，那么它的exists只能是1或0
				//var time = item["time"] = new Date().getTime();//重新修改对应元素的时间和次数
				var count = itemMap["count"] = itemMap["count"] ? itemMap["count"]+1 : 1;
				flag = itemMap["exists"];
				for(var j=0;j<historyArray.length;j++){
					var sortItem = historyArray[j];
					if(!sortItem["count"] || sortItem["count"] <= count){
						//usernameArray.splice(j,0,item);//将刚刚查询定位的那个数组元素item添加到恰当的位置
						//usernameArray.splice(key + 1,1);//然后删除掉刚刚查询定位的那个数组元素item
						var tempItem = historyArray.splice(j,1)[0];//被删除（被处理）的部分本身就是一个数组，这个被删除（被处理）的数组的长度就是第二个参数，所以要加[0]
						historyArray.splice(j,0,tempItem);//这是一个添加操作。这条和上条语句其实是一个剪切操作。
						break;
						/*
						@athor:周小建
						@time:2012-12-04 12:20:00
						@description://从数组集合的开头进行处理，比较其使用次数，这相当于实现了最近最少用策略，
						//另外，判断条件中是<=  如果存在次数相同的情况，则找到第一个符合的数组元素，就在那个位置插入新的数组元素，等于是实现了先进先出策略。
						//即先实现最近最少用，再在使用次数相同的情况下实现先进先出。
						 */
					}
				}
				break;
			}
		}
	}
	//alert(usernameArray.length)
	return flag;//还没有这个元素
}

/*
@athor:周小建
@time:2010-02-04
@description:用于某输入框失去焦点时进行ajax验证是否存在
			  这是一种简便的实现和使用方式，是最优实现
			  本函数中keys参数["pk","bk3","bk4","bk5"]数组，开头是主键，后面是业务主键。
*/
this.checkInputValueExists = function(keys,checkExistsUrl,extParams,handleFunction,messages,sync){
	if(!$.isArray(keys) || keys.length<2) return false;
	
	//var datas = [];
	var datas = {};
	
	/*
	var pkKey = $.trim(keys[0]);
	if(!$.isValidString(pkKey)) return false;
	var $pk = getEleByKey(pkKey);
	if($pk.length==0) return false;
	//datas.push({key:pkKey,value:$.trim($pk.val())});
	datas[pkKey] = $.trim($pk.val());
	*/
	var pkKey = $.trim(keys[0]);
	if($.isValidString(pkKey)){
		var $pk = getEleByKey(pkKey);
		if($pk.length==0) return false;
		//datas.push({key:pkKey,value:$.trim($pk.val())});
		datas[pkKey] = $.trim($pk.val());
	}
	
	var mainBkKey = $.trim(keys[1]);
	if(!$.isValidString(mainBkKey)) return false;
	var $mainBk = getEleByKey(mainBkKey);
	if($mainBk.length==0) return false;
	
	/*
	//var mainBkValue = $.trim($mainBk.val());//这种取值方式比较粗糙，因为它一概按照普通输入框方式进行取值，而没有考虑下拉列表等特殊情况，所以将其注释掉
	var mainBkValue = null;
	if($mainBk.hasClass("combo-f")){ 
		mainBkValue = $.trim($mainBk.combobox("getValue"));
		if(!$.isValidString(mainBkValue) || mainBkValue==0) return false;
	}else mainBkValue = $.trim($mainBk.val());
	*/
	//var mainBkValue = me.getInputValue($mainBk);
	var mainBkValue = $.trim($mainBk.val());
	
	if(!$.isValidString(mainBkValue))return false;
	if(!$mainBk.valid())return false;
	//datas.push({key:mainBkKey,value:mainBkValue});
	datas[mainBkKey] = mainBkValue;
	
	var bkKeys = [];//定义这个数组变量并且后面push和sort，都是为了historyKey。但是在后续datas.push的for循环中，
	for(var i=1;i<keys.length;i++){//对所有业务主键都进行判断，并且加入bkKeys中
		var itemKey = $.trim(keys[i]);
		if(!$.isValidString(itemKey)) return false;
		bkKeys.push(itemKey);
	}
	bkKeys.sort();
	
	var separateStr = "#####";
	var historyKey = bkKeys.join(separateStr);
	var historyValueArray = [];
	for(var j=0;j<bkKeys.length;j++){
		var itemBkKey = $.trim(bkKeys[j]);
		var $itemBk = getEleByKey(itemBkKey);
		if(itemBkKey!=mainBkKey && $itemBk.length==0) return false;//如果itemBkKey==mainBkKey则必然后者是成立的，因为前面已经进行了处理，所以这里有了前者条件
		
		/*
		//var itemBkValue = $.trim($itemBk.val());//这种取值方式比较粗糙，因为它一概按照普通输入框方式进行取值，而没有考虑下拉列表等特殊情况，所以将其注释掉
		var itemBkValue = null;
		if($itemBk.hasClass("combo-f")){ 
			itemBkValue = $.trim($itemBk.combobox("getValue"));
			if(!$.isValidString(itemBkValue) || itemBkValue==0) return false;
		}else itemBkValue = $.trim($itemBk.val());
		*/
		//var itemBkValue = me.getInputValue($itemBk);
		var itemBkValue = $.trim($itemBk.val());
		
		if(itemBkKey!=mainBkKey && (!$.isValidString(itemBkValue) || !$itemBk.valid()))return false;
		historyValueArray.push(itemBkValue);//这个push是无条件的，因为要与history对应，而后面的datas.push要加上判断，因为前面已经对mainBkKey进行了push
		//if(itemBkKey!=mainBkKey) datas.push({key:itemBkKey,value:itemBkValue});
		if(itemBkKey!=mainBkKey) datas[itemBkKey]=itemBkValue;
	}
	var historyValue = historyValueArray.join(separateStr);
	
	//var checkExistsUrl = $.isValidString(checkExistsUrl) ? $.trim(checkExistsUrl) : me.config.url.check;
	//if(checkExistsUrl.indexOf(baseUrl)!=0) checkExistsUrl = baseUrl + checkExistsUrl;
	
	if(!messages || $.isArray(messages)) messages = [];
	if(!messages[0]) messages[0] = "数据可用";
	if(!messages[1]) messages[1] = "数据已存在";
	
	var existsFlag = locateHistoryArray(historyKey,historyValue);
	//existsFlag = -1;//由于缓存会导致有时不能保证每次唯一性校验都成功，设置为-1使其每次都走后台
	if(existsFlag > -1){//存在这个值的历史记录项，则直接从历史记录集中获取结果，而不用ajax	
		if(existsFlag == 0){//从历史记录中已经获知当前值还没在数据库中存在，即当前值可以再被添加，是有效的
			togglePoshytip($mainBk,messages[0],null,true);
			if(handleFunction && typeof handleFunction=="function") handleFunction();
		}else if(existsFlag == 1){//从历史记录中已经获知当前值已经在数据库中存在，即当前值不能再被添加，是无效的
			togglePoshytip($mainBk,messages[1],null,false);
			//me.resetInsertOrUpdateFormEnabled();//从历史记录中得到已存在的结果，则终止后续操作（当然更不执行提交了），所以要将遮罩去掉并使提交按钮有效。
		}
	}else{
		if($.isFunction(extParams)) extParams = extParams($mainBk);
		if($.isEmptyObject(extParams)) extParams = {};
		ajaxHelper(
			checkExistsUrl,
			//{datas:JSON.stringify(datas)},
			$.extend({},datas,extParams),
			function(returnValue){
				if(!$.isEmptyObject(returnValue)){
					//returnValue = returnValue.data.thisPageElements;
					var success=returnValue.success,msg=returnValue.msg;
					//var exists = parseInt(returnValue,10);
					var exists = success ? 0 : 1;
					if(isNaN(exists)){
						togglePoshytip($mainBk,"发生异常",null,false);
						//me.focusInput($mainBk.get(0));
						focusInput($mainBk.get(0));
						//me.resetInsertOrUpdateFormEnabled();//如果验证时发生错误，则终止后续操作（当然更不执行提交了），所以要将遮罩去掉并使提交按钮有效。
						return;
					}
					insertHistoryArray(historyKey,historyValue,exists);
					togglePoshytip($mainBk,messages[exists], null,exists==0);
					existsFlag = exists==0||exists==-1?0:1;
					/*
					@athor:周小建
					@time:2010-02-04
					@description:其实这里进行设置existsFlag并没有真实效果，因为当前函数是个回调函数，它在执行时，整个checkInputValidate已经将返回值进行了返回，
								 也就是说，这里的设置产生了滞后，从而造成了逻辑上的残缺，或者严格来说，是逻辑上的错误，
						          它只能被用在执行内部动作处理，而不关心具体返回值到底多少的相关业务逻辑中
						          因此这个checkInputValidate不能被当做一个判断输入值是否有效，从而根据结果进行后续操作的标准，原因就在这里的回调函数产生的动作滞后而使整个existsFlag不准确
						          所以用户使用的时候，只能分步骤进行判断，或者再内部根据中间变量的判断结果，分别去进行相关的处理，而不能完全依赖它的返回值，
						          至少不能马上就需要结果去进行处理，至少也要有个程序执行的延迟或中断，才能避免这种情况的发生。
						          这是非常重要的知识点，应该认真对待，更应该明白其中的原由和相互关系，取之之长弃之之短。
					*/
					if(exists==0 && handleFunction && typeof handleFunction=="function"){
						setTimeout(function(){
							handleFunction();//可能没有验证后的回调，也可能里面涉及提交操作
						},100);
					}
					//else me.resetInsertOrUpdateFormEnabled();//如果验证时已存在，则终止后续操作（当然更不执行提交了），所以要将遮罩去掉并使提交按钮有效。
				}
			},
			null,
			true,
			sync
		);
	}
	return existsFlag != 1;
}
/////////////////////////////////////////////////////////////输入框通过ajax进行唯一验证结束/////////////////////////////////////////////////////////////





/////////////////////////////////////////////////////////////流程任务处理/////////////////////////////////////////////////////////////

//当前环节
function getHuanJie(){
	return [
		{text:"请选择",value:""},
		{text:"创建任务",value:"1"},
		{text:"预关单审核",value:"2"},
		{text:"报关单审核",value:"3"},
		{text:"开票通知",value:"4"},
		{text:"收票确认",value:"5"},
		{text:"发票认证",value:"6"},
		{text:"申报",value:"7"},
		{text:"备案",value:"8"}
	];
}

//构建处理页面的信息
function addRenWuInfo(config){
	if(!$.isEmptyObject(config)){
		var $container = getEleByKey(config.container);
		var array = [];
		$.each(config.columns,function(i,e){
			switch(config.type){
				case "detail": //任务详情
					if(e.type)
						array.push('<div class="col-xs-3"><p><span>'+e.label+' : </span><span name="'+e.name+'" type="'+e.type+'">'+(e.value ? e.value : "")+'</span></p></div>');
					else
						array.push('<div class="col-xs-3"><p><span>'+e.label+' : </span><span name="'+e.name+'">'+(e.value ? e.value : "")+'</span></p></div>');
					break;
				case "lct": //流程图
					array.push('<button class="btn  btn-sm '+(e.selected ? "btn-warning" : "")+'">'+(i+1)+'.'+e.name+'</button><i class="glyphicon glyphicon-triangle-right"></i>');
					break;
				case "tzd": //通知单
					array.push('<p>'+e.label+' : <span data-name="'+e.name+'">'+(e.value ? e.value : "")+'</span></p>');
					break;
				case "user": //用户
					array.push('<div class="col-xs-4"><div class="checkbox"><label><input type="checkbox" name="'+e.name+'" value="'+e.value+'" '+(e.checked ? "checked":"")+' />'+e.label+'</label></div></div>');
					break;
				default:
					break;
			}
		});
		$container.append(array.join(""));
	}
}
/////////////////////////////////////////////////////////////流程任务处理/////////////////////////////////////////////////////////////
/**
 * 获取url查询参数
 * */
var serchParam = (function UrlSearch() {
	var params = {};
	var name, value;
	var str = location.href;
	//var str = document.baseURI;
	var num = str.indexOf("?")
	str = str.substr(num + 1);

	var arr = str.split("&");
	for (var i = 0; i < arr.length; i++) {
		num = arr[i].indexOf("=");
		if (num > 0) {
			name = arr[i].substring(0, num);
			value = arr[i].substr(num + 1);
			params[name] = value;
		}
	}
	return params;
	
})();

function setselect2(key){
	var $contaier = getEleByKey(key);
	$contaier.select2({
		language: "zh-CN", //设置 提示语言
		width: "100px", //设置下拉框的宽度
		placeholder: "请选择",
		allowClear: true
	});
}

/*
 * 全局设置jquery ajax请求参数
 */

$.ajaxSetup({
	error:function(xhr,textStatus,errorThrown){
		layer.msg("服务器出错,请联系管理员！！！");
	}
});
