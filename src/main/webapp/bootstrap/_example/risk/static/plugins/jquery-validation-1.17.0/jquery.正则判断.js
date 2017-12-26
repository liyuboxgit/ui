function MyJQueryValidateExtend(window){
	var $ = jQuery = window.$;
	var document = window.document;

//////////////////////////////////////////////////////////基本格式验证开始//////////////////////////////////////////////////////////
/*
基础问题项:
特殊问题项:qq,telephone
比较验证问题项:
 */

/*
@athor:周小建
@time:2007-10-15
@description:只能是合法字符（字母数字下划线美元符井号）
@description:可包含字母数字下划线，但不可含美元符井号
*/
jQuery.validator.addMethod("characterNum",function(value,element){
	return this.optional(element) || (/^(\w+)$/.test(value));
},"只能是合法字符");

/*
@athor:周小建
@time:2007-10-15
@description:只能是字母
@description:只能是字母大小写
*/
jQuery.validator.addMethod("character",function(value,element){
	return this.optional(element) || (/^([a-zA-Z]+)$/.test(value));
},"只能是字母");

/*
@athor:周小建
@time:2007-10-15
@description:只能大写字母
@description:只能大写字母
*/
jQuery.validator.addMethod("upperCharacter",function(value,element){
	return this.optional(element) || (/^([A-Z]*)$/.test(value));
},"只能大写字母");

/*
@athor:周小建
@time:2007-10-15
@description:只能是小写字母
@description:只能是小写字母或数字
*/
jQuery.validator.addMethod("lowerCharacterOrNum",function(value,element){
	return this.optional(element) || (/^([a-z]*)$/.test(value));
},"只能小写字母");

/*
@athor:周小建
@time:2007-10-15
@description:只能是字母和数字
@description:只能是大小写字母或数字
*/
jQuery.validator.addMethod("characterOrNum",function(value,element){
	return this.optional(element) || (/^([a-zA-Z0-9]*)$/.test(value));
},"只能是字母和数字");

/*
@athor:周小建
@time:2007-10-15
@description:只能大写字母或数字
@description:只能大写字母或数字
*/
jQuery.validator.addMethod("upperCharacterOrNum",function(value,element){
	return this.optional(element) || (/^([A-Z0-9]*)$/.test(value));
},"只能大写字母或数字");

/*
@athor:周小建
@time:2007-10-15
@description:只能是小写字母或数字
@description:只能是小写字母或数字
*/
jQuery.validator.addMethod("lowerCharacterOrNum",function(value,element){
	return this.optional(element) || (/^([a-z0-9]*)$/.test(value));
},"只能是小写字母或数字");

/*
@athor:周小建
@time:2007-10-15
@description:只能是合法正数，可以有正号，但不能含有负号、小数点、千分位分隔符
@description:只能是合法正数，可以有正号，但不能含有负号、小数点、千分位分隔符
*/
jQuery.validator.addMethod("roughPositiveDigits",function(value,element){
	return this.optional(element) || (/^\+?\d+$/.test(value));
},"只能是合法整数");

/*
@athor:周小建
@time:2007-10-15
@description:只能是合法整数，可以有负号，但不能含有正号、小数点、千分位分隔符
@description:只能是合法整数，可以有负号、但不能含有正号、小数点、千分位分隔符
*/
jQuery.validator.addMethod("roughNegativeDigits",function(value,element){
	return this.optional(element) || (/^-?\d+$/.test(value));
},"只能是合法整数");

/*
@athor:周小建
@time:2007-10-15
@description:只能是合法整数，可以有正负号，但不能含有小数点、千分位分隔符
@description:只能是合法整数，可以有正负号，但不能含有小数点、千分位分隔符
*/
jQuery.validator.addMethod("roughDigits",function(value,element){
	return this.optional(element) || (/^((-?)|(\+?))\d+$/.test(value));
},"只能是合法整数");

/*
@athor:周小建
@time:2007-10-15
@description:只能是合法整数，不能有任何正负号、小数点、千分位分隔符
@description:只能是合法整数，不能有任何正负号、小数点、千分位分隔符
*/
jQuery.validator.addMethod("strictDigits",function(value,element){
	return this.optional(element) || (/^\d+$/.test(value));
},"只能是合法整数");

/*
@athor:周小建
@time:2007-10-15
@description:只能是粗略数字，可以包含正号、小数点，但没限制小数点的个数和位置，而且不能包含负号
@description:只能是粗略数字，可以包含正号、小数点，但没限制小数点的个数和位置，而且不能包含负号
*/
jQuery.validator.addMethod("roughPositiveNum",function(value,element){
	return this.optional(element) || (/^(\+?[\d.]+)$/.test(value));
},"只能是合法数字");

/*
@athor:周小建
@time:2007-10-15
@description:只能是粗略数字，可以包含负号、小数点，但没限制小数点的个数和位置，而且不能包含正号
@description:只能是粗略数字，可以包含负号、小数点，但没限制小数点的个数和位置，而且不能包含正号
*/
jQuery.validator.addMethod("roughNegativeNum",function(value,element){
	return this.optional(element) || (/^(-?[\d.]+)$/.test(value));
},"只能是合法数字");

/*
@athor:周小建
@time:2007-10-15
@description:只能是粗略数字，可以包含正负号、小数点，但没限制小数点的个数和位置
@description:只能是粗略数字，可以包含正负号、小数点，但没限制小数点的个数和位置
*/
jQuery.validator.addMethod("roughNum",function(value,element){
	return this.optional(element) || (/^(((-?)|(\+?))[\d.]+)$/.test(value));
},"只能是合法数字");

/*
@athor:周小建
@time:2007-10-15
@description:只能是粗略数字，可以包含小数点，但没限制小数点的个数和位置，而且不能包含正负号
@description:只能是粗略数字，可以包含小数点，但没限制小数点的个数和位置，而且不能包含正负号
*/
jQuery.validator.addMethod("strongRoughNum",function(value,element){
	return this.optional(element) || (/^([\d.]+)$/.test(value));
},"只能是合法数字");

/*
@athor:周小建
@time:2007-10-15
@description:只能是严格数字，可以有正号、小数点，但限制了小数点的个数只能为1位置只能为中间
@description:只能是严格数字，可以有正号、小数点，但限制了小数点的个数只能为1位置只能为中间
*/
jQuery.validator.addMethod("strictPositiveNum",function(value,element){
	return this.optional(element) || (/^(\+?\d+(\.\d+)?)$/.test(value));
},"只能是合法正数数字");

/*
@athor:周小建
@time:2007-10-15
@description:只能是严格数字，可以有负号、小数点，但限制了小数点的个数只能为1位置只能为中间
@description:只能是严格数字，可以有负号、小数点，但限制了小数点的个数只能为1位置只能为中间
*/
jQuery.validator.addMethod("strictNegativeNum",function(value,element){
	return this.optional(element) || (/^(-?\d+(\.\d+)?)$/.test(value));
},"只能是合法数字");

/*
@athor:周小建
@time:2007-10-15
@description:只能是严格数字，可以有正负号、小数点，但限制了小数点的个数只能为1位置只能为中间
@description:只能是严格数字，可以有正负号、小数点，但限制了小数点的个数只能为1位置只能为中间
*/
jQuery.validator.addMethod("strictNum",function(value,element){
	return this.optional(element) || (/^(((-?)|(\+?))\d+(\.\d+)?)$/.test(value));
},"只能是合法数字");

/*
@athor:周小建
@time:2007-10-15
@description:只能是严格数字，可以小数点，但限制了小数点的个数只能为1位置只能为中间，而且不能有正负号
@description:只能是严格数字，可以小数点，但限制了小数点的个数只能为1位置只能为中间，而且不能有正负号
*/
jQuery.validator.addMethod("strongStrictNum",function(value,element){
	return this.optional(element) || (/^(\d+(\.\d+)?)$/.test(value));
},"只能是合法数字");




/*
@athor:周小建
@time:2007-10-15
@description:只能是特殊字符（粗略模式），键盘上的所有英文符号，但不包括下划线美元符号井号，它们三个被认为是普通字符
@description:只能是特殊字符（粗略模式），键盘上的所有英文符号，但不包括下划线美元符号井号，它们三个被认为是普通字符
*/
jQuery.validator.addMethod("roughSpecChar",function(value,element){
	//return this.optional(element) ||(/^[^'\"<>]{1}[^'\"<>]{0,}$/.test(value));
	return this.optional(element) || (/^[`~!@%^&*\(\)\-+=|\{\}':;",\[\]\\.<>\/\?]{0,}$/.test(value));
},"必须全部特殊字符");

/*
@athor:周小建
@time:2007-10-15
@description:只能是特殊字符（严格模式），键盘上的所有英文符号，包括下划线美元符井号
@description:只能是特殊字符（严格模式），键盘上的所有英文符号，包括下划线美元符井号
*/
jQuery.validator.addMethod("strictSpecChar",function(value,element){
	//return this.optional(element) ||(/^[^'\"<>]{1}[^'\"<>]{0,}$/.test(value));
	return this.optional(element) || (/^[`~!@#$%^&*\(\)\-+=_|\{\}':;",\[\]\\.<>\/\?]{0,}$/.test(value));
},"必须全部特殊字符");

/*
@athor:周小建
@time:2007-10-15
@description:不能存在非法字符（粗略模式），包括特殊字符，不包括下划线、中文符号
@description:不能存在非法字符（粗略模式），包括特殊字符，不包括下划线、中文符号
*/
jQuery.validator.addMethod("notRoughSpecChar",function(value,element){
	//return this.optional(element) ||(/^[^'\"<>]{1}[^'\"<>]{0,}$/.test(value));
	return this.optional(element) || !(/[`~!@%^&*\(\)\-+=|\{\}':;",\[\]\\.<>\/\?]/g.test(value));
},"不能存在非法字符");

/*
@athor:周小建
@time:2007-10-15
@description:不能存在非法字符（严格模式），包括特殊字符、下划线、中文符号在内都不被允许，这是比较好的实现方式。这是包含的逻辑，而不是从头到尾全是或全部是的逻辑
@description:不能存在非法字符（严格模式），包括特殊字符、下划线、中文符号在内都不被允许，这是比较好的实现方式。这是包含的逻辑，而不是从头到尾全是或全部是的逻辑
*/
jQuery.validator.addMethod("notStrictSpecChar",function(value,element){
	//var reg = /[\(\)\{\}\[\]\?\-<>~!@#$%^&*'"\/\\.;,:|]/g;
	var reg =  /[`~!@#$%^&*\(\)\-+=_|\{\}':;",\[\]\\.<>\/\?~·！@#￥%……&*（）——+|{}【】‘；：”“’。，、？]/g;
	//return !(this.optional(element) ||(/^[^'\"<>%]{1}[^'\"<>%]{0,}$/.test(value)));
	//return jQuery.trim(value)==""||!(this.optional(element) ||(reg.test(value)));
	return this.optional(element) || !reg.test(value);
},"不能存在非法字符");

/*
@athor:周小建
@time:2007-10-15
@description:只能全部是中文
@description:只能全部是中文
*/
jQuery.validator.addMethod("chineseChar",function(value,element){
	//return this.optional(element) || /^[\u4e00-\u9fa5]+$/.test(value) || /^[\x00-\xff]+$/.test(value);
	return this.optional(element) || /^[\u4e00-\u9fa5~·！@#￥%……&*（）——+|{}【】‘；：”“’。，、？]+$/.test(value);
},"只能全部是中文");

/*
@athor:周小建
@time:2007-10-15
@description:必须包含中文
@description:可包含任意字符
*/
jQuery.validator.addMethod("hasChineseChar",function(value,element){
	return this.optional(element) || /[\u4e00-\u9fa5]/g.test(value) || /[\x00-\xff]+/g.test(value);
},"必须包含中文");

/*
@athor:周小建
@time:2007-10-15
@description:不能含有中文
@description:不能含有中文
*/
jQuery.validator.addMethod("notChineseChar",function(value,element){
	var flag=true;
	for(var i = 0;i<value.length;i++){ 
		if(value.charCodeAt(i) > 255){ 
			flag=false;
			break;
		}
	} 
	return this.optional(element) || flag;
},"不能含有中文");

/*
@athor:周小建
@time:2007-10-15
@description:只能中文、英文、数字和下划线，不包括除此之外的任何符号
@description:只能中文、英文、数字和下划线，可出现中文符号，不包括除此之外的任何符号
*/
jQuery.validator.addMethod("commonChar",function(value,element){
	return this.optional(element) || /^[\u0391-\uFFE5\w]+$/.test(value);
},"用户名只能包括中文字、英文字母、数字和下划线");
//////////////////////////////////////////////////////////基本格式验证结束//////////////////////////////////////////////////////////










//////////////////////////////////////////////////////////特殊格式验证开始//////////////////////////////////////////////////////////
/*
@athor:周小建
@time:2007-10-15
@description:粗略yyyy-mm-dd日期格式
*/
jQuery.validator.addMethod("roughDate",function(value,element){
		return this.optional(element) || (function(theDate){
		var reg = /^\d{4}-((0{0,1}[1-9]{1})|(1[0-2]{1}))-((0{0,1}[1-9]{1})|([1-2]{1}[0-9]{1})|(3[0-1]{1}))$/;
		if(theDate.length != 10){
			return false;
		}
		var result=true;
		if(!reg.test(theDate))
			result = false;
		else{
			var arr_hd=theDate.split("-");
			var dateTmp;
			dateTmp= new Date(arr_hd[0],parseFloat(arr_hd[1])-1,parseFloat(arr_hd[2]));
			if(dateTmp.getFullYear()!=parseFloat(arr_hd[0])
					|| dateTmp.getMonth()!=parseFloat(arr_hd[1]) -1
					|| dateTmp.getDate()!=parseFloat(arr_hd[2])){
				result = false
			}
		}
		return result;
	})(value); 
},"只能是合法日期格式[yyyy-mm-dd]" );

/*
@athor:周小建
@time:2007-10-15
@description:精确yyyy-mm-dd日期格式
*/
jQuery.validator.addMethod("strictDate",function(value,element){
	return this.optional(element) || (/((^((1[8-9]\d{2})|([2-9]\d{3}))(-)(10|12|0?[13578])(-)(3[01]|[12][0-9]|0?[1-9])$)|(^((1[8-9]\d{2})|([2-9]\d{3}))(-)(11|0?[469])(-)(30|[12][0-9]|0?[1-9])$)|(^((1[8-9]\d{2})|([2-9]\d{3}))(-)(0?2)(-)(2[0-8]|1[0-9]|0?[1-9])$)|(^([2468][048]00)(-)(0?2)(-)(29)$)|(^([3579][26]00)(-)(0?2)(-)(29)$)|(^([1][89][0][48])(-)(0?2)(-)(29)$)|(^([2-9][0-9][0][48])(-)(0?2)(-)(29)$)|(^([1][89][2468][048])(-)(0?2)(-)(29)$)|(^([2-9][0-9][2468][048])(-)(0?2)(-)(29)$)|(^([1][89][13579][26])(-)(0?2)(-)(29)$)|(^([2-9][0-9][13579][26])(-)(0?2)(-)(29)$))/.test(value)); 
},"只能是合法日期格式[yyyy-mm-dd]" );

/*
@athor:周小建
@time:2007-10-15
@description:粗略yyyy-mm日期格式验证
*/
jQuery.validator.addMethod("yearAndMonth",function(value,element){
	return this.optional(element) || (/^\d{4}(-)((0{0,1}[1-9]{1})|(1[0-2]{1}))$/.test(value));
},"只能是合法日期格式[yyyy-mm]");

/*
@athor:周小建
@time:2007-10-15
@description:粗略yyyymmdd日期格式验证
*/
jQuery.validator.addMethod("roughDate0",function(value,element){
	return this.optional(element) || (function checkDateFmt(theDate){
		var reg = /^\d{4}((0{0,1}[1-9]{1})|(1[0-2]{1}))((0{0,1}[1-9]{1})|([1-2]{1}[0-9]{1})|(3[0-1]{1}))$/;
		if(theDate.length != 8){
			return false;
		}
		var result=true;
		if(!reg.test(theDate))
			result = false;
		else{
			var dateTmp;
			dateTmp= new Date(theDate.substr(0,4),parseFloat(theDate.substr(4,2))-1,parseFloat(theDate.substr(6,2)));
			if(dateTmp.getFullYear()!=parseFloat(theDate.substr(0,4))
					|| dateTmp.getMonth()!=parseFloat(theDate.substr(4,2)) -1
					|| dateTmp.getDate()!=parseFloat(theDate.substr(6,2))){
				result = false
			}
		}
		return result;
	})(value);
},"只能是合法日期格式[yyyymmdd]");

/*
@athor:周小建
@time:2007-10-15
@description:精确yyyymmdd日期格式
*/
jQuery.validator.addMethod("strictDate0",function(value,element){
	return this.optional(element) || (/((^((1[8-9]\d{2})|([2-9]\d{3}))(10|12|0?[13578])(3[01]|[12][0-9]|0?[1-9])$)|(^((1[8-9]\d{2})|([2-9]\d{3}))(-)(11|0?[469])(-)(30|[12][0-9]|0?[1-9])$)|(^((1[8-9]\d{2})|([2-9]\d{3}))(-)(0?2)(-)(2[0-8]|1[0-9]|0?[1-9])$)|(^([2468][048]00)(-)(0?2)(-)(29)$)|(^([3579][26]00)(-)(0?2)(-)(29)$)|(^([1][89][0][48])(-)(0?2)(-)(29)$)|(^([2-9][0-9][0][48])(-)(0?2)(-)(29)$)|(^([1][89][2468][048])(-)(0?2)(-)(29)$)|(^([2-9][0-9][2468][048])(-)(0?2)(-)(29)$)|(^([1][89][13579][26])(-)(0?2)(-)(29)$)|(^([2-9][0-9][13579][26])(-)(0?2)(-)(29)$))/.test(value)); 
},"只能是合法日期格式[yyyymmdd]" );

/*
@athor:周小建
@time:2007-10-15
@description:粗略yyyymm日期格式验证
*/
jQuery.validator.addMethod("yearAndMonth0",function(value,element){
	return this.optional(element) || (/^\d{4}((0{0,1}[1-9]{1})|(1[0-2]{1}))$/.test(value));
},"只能是合法日期格式[yyyymm]");

/*
@athor:周小建
@time:2007-10-15
@description:粗略yyyy日期格式验证
*/
jQuery.validator.addMethod("year",function(value,element){
	return this.optional(element) || (/^\d{4}$/.test(value));
},"只能是合法日期格式[yyyy]");

/*
@athor:周小建
@time:2007-10-15 09:10:00
@description:年龄检验方法，只能是一到两位正整数，并且不能以0开头
*/
jQuery.validator.addMethod("age",function(value,element){
	return this.optional(element) || (/^[1-9][0-9]?$/.test(value));
},"只能是合法年龄");
		
/*
@athor:周小建
@time:2007-10-15 09:20:00
@description:验证码检验方法，只能是4个数字
*/
jQuery.validator.addMethod("verificationCode",function(value,element){
	return this.optional(element) || (/^\d{4,4}$/.test(value));
},"只能是合法验证码");

/*
@athor:周小建
@time:2007-10-15 08:20:00
@description:手机检验方法
*/
jQuery.validator.addMethod("mobile",function(value,element){
	return this.optional(element) || (/^0?(13|15|18)[0-9]{9}$/.test(value));
},"只能是合法手机");

/*
@athor:周小建
@time:2007-10-15 08:30:00
@description:电话检验方法
*/
jQuery.validator.addMethod("telephone",function(value,element){
	return this.optional(element) || (/^[+]{0,1}(\d){1,4}[ ]?([-]?((\d)|[ ]){1,12})+$/.test(value));
},"只能是合法电话");

/*
@athor:周小建
@time:2007-10-15 08:40:00
@description:IP检验方法
*/
jQuery.validator.addMethod("ip",function(value,element){
	return this.optional(element) || (/^(\d+)\.(\d+)\.(\d+)\.(\d+)$/.test(value) && (RegExp.$1 < 256 && RegExp.$2 < 256 && RegExp.$3 < 256 && RegExp.$4 < 256));
},"只能是合法IP地址");
		
/*
@athor:周小建
@time:2007-10-15 08:50:00
@description:QQ检验方法（腾讯QQ号从10000开始）
*/
jQuery.validator.addMethod("qq",function(value,element){
	return this.optional(element) || (/^[1-9][0-9]{4,}$/.test(value));
},"只能是合法QQ");
		
/*
@athor:周小建
@time:2007-10-15 09:00:00
@description:邮政编码检验方法
*/
jQuery.validator.addMethod("postalCode",function(value,element){
	//return this.optional(element) || (/^[a-zA-Z0-9]{3,12}$/.test(value));
	return this.optional(element) || (/^\d{6,6}$/.test(value));
},"只能是合法邮政编码");

/*
@athor:周小建
@time:2007-10-15
@description:有效选择项不能为空
*/
jQuery.validator.addMethod("validSelect",function(value,element){
	return value != "" && value != 0;
},$.validator.format("不能为空"));
//////////////////////////////////////////////////////////特殊格式验证结束//////////////////////////////////////////////////////////








//////////////////////////////////////////////////////////比较验证开始//////////////////////////////////////////////////////////
/*
@athor:周小建
@time:2007-10-15
@description:等于某值
*/
jQuery.validator.addMethod("strEQVal",function(value,element,param){
	return value == param;
},$.validator.format("应等于{0}"));

/*
@athor:周小建
@time:2007-10-15
@description:不等于某值
*/
jQuery.validator.addMethod("strNEVal",function(value,element,param){
	return value != param;
},$.validator.format("应不等于{0}"));

/*
@athor:周小建
@time:2007-10-15
@description:大于某值
*/
jQuery.validator.addMethod("strGTVal",function(value,element,param){
	return value > param;
},$.validator.format("应大于{0}"));

/*
@athor:周小建
@time:2007-10-15
@description:大于等于某值
*/
jQuery.validator.addMethod("strGEVal",function(value,element,param){
	return value >= param;
},$.validator.format("应大于等于{0}"));


/*
@athor:周小建
@time:2007-10-15
@description:小于某值
*/
jQuery.validator.addMethod("strLTVal",function(value,element,param){
	return value < param;
},$.validator.format("应小于{0}"));

/*
@athor:周小建
@time:2007-10-15
@description:小于等于某值
*/
jQuery.validator.addMethod("strLEVal",function(value,element,param){
	return value <= param;
},$.validator.format("应小于等于{0}"));

/*
@athor:周小建
@time:2007-10-15
@description:通过名称获取输入框
*/
function getElByName(name){
	if($.trim(name)=="")return null;
	name = $.trim(name);
	var $anotherDataInput = $(name);
	if($anotherDataInput.length<=0) $(":input[name='"+name+"']");
	if($anotherDataInput.length<=0) $anotherDataInput = $("#" + name);
	if($anotherDataInput.length<=0) $anotherDataInput = $("."+name);
	if($anotherDataInput.length>0) return $anotherDataInput.eq(0);
	return null;
}

/*
@athor:周小建
@time:2007-10-15
@description:通过名称获取输入框的值
*/
function getElValueByName(name){
	var $input = getElByName(name);
	if($input!=null && getElByName.length>0) return $input.val();
	return "";
}

function addDate(date,days){ 
	var d=new Date(date); 
	d.setDate(d.getDate()+(days-0)); 
	var month=d.getMonth()+1; 
	if(month<10) month = "0"+month; 
	var day = d.getDate(); 
	if(day<10) day = "0"+day; 
	var val = d.getFullYear()+""+month+""+day; 
	return val; 
}

/*
@athor:周小建
@time:2007-10-15
@description:与另一输入框比较的通用处理
*/
function commonCompare(value,element,param,method){
	var result=this.optional(element);
	if(result || param==null || (typeof param=="array"&&param.length==0))return result;
	method = $.trim(method);
	var kindArray=["str","len","date","num"],kind="",opt="";
	for(var i=0;i<kindArray.length;i++){
		if(method.indexOf(kindArray[i])==0){
			kind = kindArray[i];
			method = method.replace("^"+kindArray[i],"");
			break;
		}
		if(i==kindArray.length-1)return;
	}
	
	var isVal = method.indexOf("Val")>=0;
	if(!isVal){//输入框
		//return value == $(param).val();
		var anotherName=null,anotherDataVal=null;
		var isMulti = typeof param=="array" && param.length>1;
		if(isMulti){
			anotherName = param[0];
			param = param[1];
		}else{
			if(typeof param=="array" && param.length==1) param = param[0];
			anotherName=param;
			//var $anotherDataInput = $("#" + param);
			//var anotherDataVal = $anotherDataInput.val();
			//return this.optional(element) || ($.trim(value)==$.trim(anotherDataVal));
		}
		anotherDataVal = getElValueByName(anotherName);
	}
	
	if(kind=="num"){//数字
		opt = method.substr(3,2);
		if(typeof value=="string" && $.trim(value)=="")value = 0;else value=value-0;
		if(typeof param=="string" && $.trim(param)=="")param = 0;else param=param-0;
		if(typeof anotherDataVal=="string" && $.trim(anotherDataVal)=="")anotherDataVal=0;else anotherDataVal=anotherDataVal-0;
		switch(opt){
			case "EQ"://等于
				//result = value==param;
				if(isVal)result = value==param;
				else if(isMulti) result = value==anotherDataVal+param;
				else result = value==anotherDataVal;
				break;
			case "NE"://不等于
				//result = value!=param;
				if(isVal)result = value!=param;
				else if(isMulti) result = value!=anotherDataVal+param;
				else result = value!=anotherDataVal;
				break;
			case "GT"://大于
				//result = value > param;
				if(isVal)result = value>param;
				else if(isMulti) result = value>anotherDataVal+param;
				else result = result = value>anotherDataVal;
				break;
			case "GE"://大于等于
				//result = value >= param;
				if(isVal)result = value>=param;
				else if(isMulti) result = value>=anotherDataVal+param;
				else result = result = value>=anotherDataVal;
				break;
			case "LT"://小于
				//result = value < param;
				if(isVal)result = value<param;
				else if(isMulti) result = value<anotherDataVal+param;
				else result = result = value<anotherDataVal;
				break;
			case "LE"://小于等于
				//result = value <= param;
				if(isVal)result = value<=param;
				else if(isMulti) result = value<=anotherDataVal+param;
				else result = result = value<=anotherDataVal;
				break;
			default:
				break;
		}
	}else{//字符串
		opt = method.substr(kind=="date"?4:3,2);
		value = $.trim(value);
		anotherDataVal = $.trim(anotherDataVal);
		if(kind=="len"){//长度
			if(!param)param = 0;
			param = param-0;//类型转换
			var anotherDataLength = anotherDataVal.length;
			switch(opt){
				case "EQ"://等于
					//result = value.length==param;
					if(isVal)result = value.length==param;
					else if(isMulti) result = value.length==anotherDataLength+param;
					else result = value.length==anotherDataLength;
					break;
				case "NE"://不等于
					//result = value.length!=param;
					if(isVal)result = value.length!=param;
					else if(isMulti) result = value.length!=anotherDataLength+param;
					else result = value.length!=anotherDataLength;
					break;
				case "GT"://大于
					//result = value.length > param;
					if(isVal)result = value.length>param;
					else if(isMulti) result = value.length>anotherDataLength+param;
					else result = result = value.length>anotherDataLength;
					break;
				case "GE"://大于等于
					//result = value >= param;
					if(isVal)result = value.length>=param;
					else if(isMulti) result = value.length>=anotherDataLength+param;
					else result = result = value.length>=anotherDataLength;
					break;
				case "LT"://小于
					//result = value < param;
					if(isVal)result = value.length<param;
					else if(isMulti) result = value.length<anotherDataLength+param;
					else result = result = value.length<anotherDataLength;
					break;
				case "LE"://小于等于
					//result = value <= param;
					if(isVal)result = value.length<=param;
					else if(isMulti) result = value.length<=anotherDataLength+param;
					else result = result = value.length<=anotherDataLength;
					break;
				default:
					break;
			}
		}else{//str、date
			switch(opt){
				case "EQ"://等于
					//result = value==param;
					if(isVal)result = value==param;
					else if(isMulti){ 
						if(kind=="date") result = value==addDate(anotherDataVal,param);
						else result = value.indexOf(anotherDataVal)>=0 && value.replace(anotherDataVal,"")==param;
					}else result = value==anotherDataVal;
					break;
				case "NE"://不等于
					//result = value!=param;
					if(isVal)result = value!=param;
					else if(isMulti){ 
						if(kind=="date") result = value!=addDate(anotherDataVal,param);
						else result = value.indexOf(anotherDataVal)<0 || value.replace(anotherDataVal,"")!=param;
					}else result = value!=anotherDataVal;
					break;
				case "GT"://大于
					//result = value > param;
					if(isVal)result = value>param;
					else if(isMulti && kind=="date") result = value>addDate(anotherDataVal,param);//非date多个参数比较的情况没有意义
					else result = value>anotherDataVal;
					break;
				case "GE"://大于等于
					//result = value >= param;
					if(isVal)result = value>=param;
					else if(isMulti && kind=="date") result = value>=addDate(anotherDataVal,param);
					else result = value>=anotherDataVal;
					break;
				case "LT"://小于
					//result = value < param;
					if(isVal)result = value<param;
					else if(isMulti && kind=="date") result = value<addDate(anotherDataVal,param);
					else result = value<anotherDataVal;
					break;
				case "LE"://小于等于
					//result = value <= param;
					if(isVal)result = value<=param;
					else if(isMulti && kind=="date") result = value<=addDate(anotherDataVal,param);
					else result = value<=anotherDataVal;
					break;
				case "GM"://包含但不等
					if(isVal)result = value!=param && value.indexOf(param)>=0;
					else if(isMulti && kind!="date") value!=anotherDataVal && value.indexOf(anotherDataVal)>=0 && vlaue.replace(anotherDataVal,"").indexOf(param)>=0;
					else result = value!=anotherDataVal && value.indexOf(anotherDataVal)>=0;
					break;
				case "GH"://包含且可等
					if(isVal)result =  value.indexOf(param)>=0;
					else if(isMulti && kind!="date") value.indexOf(anotherDataVal)>=0 && vlaue.replace(anotherDataVal,"").indexOf(param)>=0;
					else result = value.indexOf(anotherDataVal)>=0;
					break;
				case "LM"://被包含但不等
					if(isVal)result = value!=param && param.indexOf(value)>=0;
					else if(isMulti && kind!="date") value!=anotherDataVal && anotherDataVal.indexOf(value)>=0 && anotherDataVal.replace(vlaue,"").indexOf(param)>=0;
					else result = value!=anotherDataVal && anotherDataVal.indexOf(value)>=0;
					break;
				case "LH"://被包含且可等
					if(isVal)result = param.indexOf(value)>=0;
					else if(isMulti && kind!="date") anotherDataVal.indexOf(value)>=0 && anotherDataVal.replace(vlaue,"").indexOf(param)>=0;
					else result = anotherDataVal.indexOf(value)>=0;
					break;
				default:
					break;
			}
		}
	}
}

/*
@athor:周小建
@time:2007-10-15
@description:等于另一输入框
*/
jQuery.validator.addMethod("strEQInput",function(value,element,param){
	/*
	//return value == $(param).val();
	if(!(typeof param == "string" && $.trim(param))) return false;
	if(!(typeof value == "string" && $.trim(value))) return false;
	//var $anotherDataInput = $("#" + param);
	//var anotherDataVal = $anotherDataInput.val();
	var anotherDataVal = getElValueByName(param);
	return this.optional(element) || ($.trim(value)==$.trim(anotherDataVal));
	*/
	return commonCompare(value,element,param,"strEQInput");
},$.validator.format("应等于{0}加{1}"));

/*
@athor:周小建
@time:2007-10-15
@description:不等于另一输入框
*/
jQuery.validator.addMethod("strNEInput",function(value,element,param){
	/*
	//return value == $(param).val();
	if(!(typeof param == "string" && $.trim(param))) return false;
	if(!(typeof value == "string" && $.trim(value))) return false;
	//var $anotherDataInput = $("#" + param);
	//var anotherDataVal = $anotherDataInput.val();
	var anotherDataVal = getElValueByName(param);
	return this.optional(element) || ($.trim(value)!=$.trim(anotherDataVal));
	*/
	return commonCompare(value,element,param,"strNEInput");
},$.validator.format("应不等于{0}加{1}"));

/*
@athor:周小建
@time:2007-10-15
@description:大于另一输入框
*/
jQuery.validator.addMethod("strGTInput",function(value,element,param){
	/*
	//return value > $(param).val();
	if(!(typeof param == "string" && $.trim(param))) return false;
	if(!(typeof value == "string" && $.trim(value))) return false;
	//var $anotherDataInput = $("#" + param);
	//var anotherDataVal = $anotherDataInput.val();
	var anotherDataVal = getElValueByName(param);
	return this.optional(element) || ($.trim(value)>$.trim(anotherDataVal));
	*/
	return commonCompare(value,element,param,"strGTInput");
},$.validator.format("应大于{0}加{1}"));

/*
@athor:周小建
@time:2007-10-15
@description:大于等于另一输入框
*/
jQuery.validator.addMethod("strGEInput",function(value,element,param){
	/*
	//return value >= $(param).val();
	if(!(typeof param == "string" && $.trim(param))) return false;
	if(!(typeof value == "string" && $.trim(value))) return false;
	//var $anotherDataInput = $("#" + param);
	//var anotherDataVal = $anotherDataInput.val();
	var anotherDataVal = getElValueByName(param);
	return this.optional(element) || ($.trim(value)>=$.trim(anotherDataVal));
	*/
	return commonCompare(value,element,param,"strGEInput");
},$.validator.format("应大于等于{0}加{1}"));

/*
@athor:周小建
@time:2007-10-15
@description:小于另一输入框
*/
jQuery.validator.addMethod("strLTInput",function(value,element,param){
	/*
	//return value < $(param).val();
	if(!(typeof param == "string" && $.trim(param))) return false;
	if(!(typeof value == "string" && $.trim(value))) return false;
	//var $anotherDataInput = $("#" + param);
	//var anotherDataVal = $anotherDataInput.val();
	var anotherDataVal = getElValueByName(param);
	return this.optional(element) || ($.trim(value)<$.trim(anotherDataVal));
	*/
	return commonCompare(value,element,param,"strLTInput");
},$.validator.format("应小于{0}加{1}"));

/*
@athor:周小建
@time:2007-10-15
@description:小于等于另一输入框
*/
jQuery.validator.addMethod("strLEInput",function(value,element,param){
	/*
	//return value < $(param).val();
	if(!(typeof param == "string" && $.trim(param))) return false;
	if(!(typeof value == "string" && $.trim(value))) return false;
	//var $anotherDataInput = $("#" + param);
	//var anotherDataVal = $anotherDataInput.val();
	var anotherDataVal = getElValueByName(param);
	return this.optional(element) || ($.trim(value)<$.trim(anotherDataVal));
	*/
	return commonCompare(value,element,param,"strLEInput");
},$.validator.format("应小于等于{0}加{1}"));

/*
@athor:周小建
@time:2007-10-15
@description:包含但不等另一输入框
*/
jQuery.validator.addMethod("strGMInput",function(value,element,param){
	return commonCompare(value,element,param,"strGMInput");
},$.validator.format("应包含但不等{0}加{1}"));

/*
@athor:周小建
@time:2007-10-15
@description:包含另一输入框且可等
*/
jQuery.validator.addMethod("strGHInput",function(value,element,param){
	return commonCompare(value,element,param,"strGHInput");
},$.validator.format("应包含且可等{0}加{1}"));

/*
@athor:周小建
@time:2007-10-15
@description:被另一输入框包含但不等
*/
jQuery.validator.addMethod("strLMInput",function(value,element,param){
	return commonCompare(value,element,param,"strLMInput");
},$.validator.format("应被{0}加{1}包含但不等"));

/*
@athor:周小建
@time:2007-10-15
@description:被另一输入框包含且可等
*/
jQuery.validator.addMethod("strLHInput",function(value,element,param){
	return commonCompare(value,element,param,"strLHInput");
},$.validator.format("应被{0}加{1}包含且可等"));

/*
@athor:周小建
@time:2007-10-15
@description:长度等于某值
*/
jQuery.validator.addMethod("lenEQVal",function(value,element,param){
	//return value.length==param;
	return commonCompare(value,element,param,"lenEQVal");
},jQuery.validator.format("长度应等于{0}加{1}"));

/*
@athor:周小建
@time:2007-10-15
@description:长度不等于某值
*/
jQuery.validator.addMethod("lenNEVal",function(value,element,param){
	//return value.length!=param;
	return commonCompare(value,element,param,"lenNEVal");
},jQuery.validator.format("长度应不等于{0}加{1}"));

/*
@athor:周小建
@time:2007-10-15
@description:长度大于某值
*/
jQuery.validator.addMethod("lenGTVal",function(value,element,param){
	//return value.length>param;
	return commonCompare(value,element,param,"lenGTVal");
},jQuery.validator.format("长度应大于{0}加{1}"));

/*
@athor:周小建
@time:2007-10-15
@description:长度大于等于某值
*/
jQuery.validator.addMethod("lenGEVal",function(value,element,param){
	//return value.length>=param;
	return commonCompare(value,element,param,"lenGEVal");
},jQuery.validator.format("长度应大于等于{0}加{1}"));

/*
@athor:周小建
@time:2007-10-15
@description:长度小于某值
*/
jQuery.validator.addMethod("lenLTVal",function(value,element,param){
	//return value.length<param;
	return commonCompare(value,element,param,"lenLTVal");
},jQuery.validator.format("长度应小于{0}加{1}"));

/*
@athor:周小建
@time:2007-10-15
@description:长度小于等于某值
*/
jQuery.validator.addMethod("lenLEVal",function(value,element,param){
	//return value.length>=param;
	return commonCompare(value,element,param,"lenLEVal");
},jQuery.validator.format("长度应小于等于{0}加{1}"));

/*
@athor:周小建
@time:2007-10-15
@description:长度等于另一输入框
*/
jQuery.validator.addMethod("lenEQInput",function(value,element,param){
	//return value.length == $(param).val();
	return commonCompare(value,element,param,"lenEQInput");
},$.validator.format("长度应等于{0}加{1}"));

/*
@athor:周小建
@time:2007-10-15
@description:长度不等于另一输入框
*/
jQuery.validator.addMethod("lenNEInput",function(value,element,param){
	//return value.length == $(param).val();
	return commonCompare(value,element,param,"lenNEInput");
},$.validator.format("长度应不等于{0}加{1}"));

/*
@athor:周小建
@time:2007-10-15
@description:长度大于另一输入框
*/
jQuery.validator.addMethod("lenGTInput",function(value,element,param){
	//return value.length > $(param).val();
	return commonCompare(value,element,param,"lenGTInput");
},$.validator.format("长度应大于{0}加{1}"));

/*
@athor:周小建
@time:2007-10-15
@description:长度大于等于另一输入框
*/
jQuery.validator.addMethod("lenGEInput",function(value,element,param){
	//return value.length >= $(param).val();
	return commonCompare(value,element,param,"lenGEInput");
},$.validator.format("长度应大于等于{0}加{1}"));


/*
@athor:周小建
@time:2007-10-15
@description:长度小于另一输入框
*/
jQuery.validator.addMethod("lenLTInput",function(value,element,param){
	//return value.length < $(param).val();
	return commonCompare(value,element,param,"lenLTInput");
},$.validator.format("长度应小于{0}加{1}"));

/*
@athor:周小建
@time:2007-10-15
@description:长度小于等于另一输入框
*/
jQuery.validator.addMethod("lenLEInput",function(value,element,param){
	//return value.length <= $(param).val();
	return commonCompare(value,element,param,"lenLEInput");
},$.validator.format("长度应小于等于{0}加{1}"));

/*
@athor:周小建
@time:2007-10-15
@description:数字等于某值
*/
jQuery.validator.addMethod("numEQVal",function(value,element,param){
	/*
	//return value > $(param).val();
	if(isNaN(value)) return value == param;
	//return parseInt(value,10) > parseInt(param,10);
	return parseFloat(value,10) == parseFloat(param,10);
	*/
	return commonCompare(value,element,param,"numEQVal");
},jQuery.validator.format("应等于{0}加{1}"));

/*
@athor:周小建
@time:2007-10-15
@description:数字等于某值
*/
jQuery.validator.addMethod("numNEVal",function(value,element,param){
	/*
	//return value > $(param).val();
	if(isNaN(value)) return value != param;
	//return parseInt(value,10) > parseInt(param,10);
	return parseFloat(value,10) != parseFloat(param,10);
	*/
	return commonCompare(value,element,param,"numNEVal");
},jQuery.validator.format("应不等于{0}加{1}"));

/*
@athor:周小建
@time:2007-10-15
@description:数字大于某值
*/
jQuery.validator.addMethod("numGTVal",function(value,element,param){
	/*
	//return value > $(param).val();
	if(isNaN(value)) return value > param;
	//return parseInt(value,10) > parseInt(param,10);
	return parseFloat(value,10) > parseFloat(param,10);
	*/
	return commonCompare(value,element,param,"numGTVal");
},jQuery.validator.format("应大于{0}加{1}"));

/*
@athor:周小建
@time:2007-10-15
@description:数字大于等于某值
*/
jQuery.validator.addMethod("numGEVal",function(value,element,param){
	/*
	//return value >= $(param).val();
	if(isNaN(value)) return value >= param;
	//return parseInt(value,10) >= parseInt(param,10);
	return parseFloat(value,10) >= parseFloat(param,10);
	*/
	return commonCompare(value,element,param,"numGEVal");
},jQuery.validator.format("应大于等于{0}加{1}"));

/*
@athor:周小建
@time:2007-10-15
@description:数字小于某值
*/
jQuery.validator.addMethod("numLTVal",function(value,element,param){
	/*
	//return value < $(param).val();
	if(isNaN(value)) return value < param;
	//return parseInt(value,10) < parseInt(param,10);
	return parseFloat(value,10) < parseFloat(param,10);
	*/
	return commonCompare(value,element,param,"numLTVal");
},jQuery.validator.format("应小于{0}加{1}"));

/*
@athor:周小建
@time:2007-10-15
@description:数字小于等于某值
*/
jQuery.validator.addMethod("numLEVal",function(value,element,param){
	/*
	//return value <= $(param).val();
	if(isNaN(value)) return value <= param;
	//return parseInt(value,10) <= parseInt(param,10);
	return parseFloat(value,10) <= parseFloat(param,10);
	*/
	return commonCompare(value,element,param,"numLEVal");
},jQuery.validator.format("应小于等于{0}加{1}"));

/*
@athor:周小建
@time:2007-10-15
@description:数字等于另一输入框
*/
jQuery.validator.addMethod("numEQInput",function(value,element,param){
	/*
	if(!(typeof param == "string" && $.trim(param))) return false;
	if(!(typeof value == "string" && $.trim(value))) return false;
	//var $anotherDataInput = $("#" + param);
	//var anotherDataVal = $anotherDataInput.val();
	var anotherDataVal = getElValueByName(param);
	if(!$.isNumeric($.trim(value)) || !$.isNumeric($.trim(anotherDataVal))) return false;
	return this.optional(element) || (parseFloat($.trim(value),10)==parseFloat($.trim(anotherDataVal),10));
	*/
	return commonCompare(value,element,param,"numEQInput");
},jQuery.validator.format("应等于{0}加{1}"));

/*
@athor:周小建
@time:2007-10-15
@description:数字不等于另一输入框
*/
jQuery.validator.addMethod("numNEInput",function(value,element,param){
	/*
	if(!(typeof param == "string" && $.trim(param))) return false;
	if(!(typeof value == "string" && $.trim(value))) return false;
	//var $anotherDataInput = $("#" + param);
	//var anotherDataVal = $anotherDataInput.val();
	var anotherDataVal = getElValueByName(param);
	if(!$.isNumeric($.trim(value)) || !$.isNumeric($.trim(anotherDataVal))) return false;
	return this.optional(element) || (parseFloat($.trim(value),10)!=parseFloat($.trim(anotherDataVal),10));
	*/
	return commonCompare(value,element,param,"numNEInput");
},jQuery.validator.format("应不等于{0}加{1}"));

/*
@athor:周小建
@time:2007-10-15
@description:数字大于另一输入框
*/
jQuery.validator.addMethod("numGTInput",function(value,element,param){
	/*
	if(!(typeof param == "string" && $.trim(param))) return false;
	if(!(typeof value == "string" && $.trim(value))) return false;
	//var $anotherDataInput = $("#" + param);
	//var anotherDataVal = $anotherDataInput.val();
	var anotherDataVal = getElValueByName(param);
	if(!$.isNumeric($.trim(value)) || !$.isNumeric($.trim(anotherDataVal))) return false;
	return this.optional(element) || (parseFloat($.trim(value),10)>parseFloat($.trim(anotherDataVal),10));
	*/
	return commonCompare(value,element,param,"numGTInput");
},jQuery.validator.format("应大于{0}加{1}"));

/*
@athor:周小建
@time:2007-10-15
@description:数字大于等于另一输入框
*/
jQuery.validator.addMethod("numGEInput",function(value,element,param){
	/*
	if(!(typeof param == "string" && $.trim(param))) return false;
	if(!(typeof value == "string" && $.trim(value))) return false;
	//var $anotherDataInput = $("#" + param);
	//var anotherDataVal = $anotherDataInput.val();
	var anotherDataVal = getElValueByName(param);
	if(!$.isNumeric($.trim(value)) || !$.isNumeric($.trim(anotherDataVal))) return false;
	return this.optional(element) || (parseFloat($.trim(value),10)>=parseFloat($.trim(anotherDataVal),10));
	*/
	return commonCompare(value,element,param,"numGEInput");
},jQuery.validator.format("应大于等于{0}加{1}"));

/*
@athor:周小建
@time:2007-10-15
@description:数字小于另一输入框
*/
jQuery.validator.addMethod("numLTInput",function(value,element,param){
	/*
	if(!(typeof param == "string" && $.trim(param))) return false;
	if(!(typeof value == "string" && $.trim(value))) return false;
	//var $anotherDataInput = $("#" + param);
	//var anotherDataVal = $anotherDataInput.val();
	var anotherDataVal = getElValueByName(param);
	if(!$.isNumeric($.trim(value)) || !$.isNumeric($.trim(anotherDataVal))) return false;
	return this.optional(element) || (parseFloat($.trim(value),10)<parseFloat($.trim(anotherDataVal),10));
	*/
	return commonCompare(value,element,param,"numLTInput");
},jQuery.validator.format("应小于{0}加{1}"));

/*
@athor:周小建
@time:2007-10-15
@description:数字小于等于另一输入框
*/
jQuery.validator.addMethod("numLEInput",function(value,element,param){
	/*
	if(!(typeof param == "string" && $.trim(param))) return false;
	if(!(typeof value == "string" && $.trim(value))) return false;
	//var $anotherDataInput = $("#" + param);
	//var anotherDataVal = $anotherDataInput.val();
	var anotherDataVal = getElValueByName(param);
	if(!$.isNumeric($.trim(value)) || !$.isNumeric($.trim(anotherDataVal))) return false;
	return this.optional(element) || (parseFloat($.trim(value),10)<=parseFloat($.trim(anotherDataVal),10));
	*/
	return commonCompare(value,element,param,"numLEInput");
},jQuery.validator.format("应小于等于{0}加{1}"));

/*
@athor:周小建
@time:2007-10-15
@description:日期等于某值
*/
jQuery.validator.addMethod("dateEQVal",function(value,element,param){
	/*
	if(!(typeof param == "string" && $.trim(param))) return false;
	if(!(typeof value == "string" && $.trim(value))) return false;
	return this.optional(element) || ($.trim(value)==$.trim(value));
	*/
	return commonCompare(value,element,param,"dateEQVal");
},jQuery.validator.format("应等于{0}加{1}"));

/*
@athor:周小建
@time:2007-10-15
@description:日期不等于某值
*/
jQuery.validator.addMethod("dateNEVal",function(value,element,param){
	/*
	if(!(typeof param == "string" && $.trim(param))) return false;
	if(!(typeof value == "string" && $.trim(value))) return false;
	return this.optional(element) || ($.trim(value)!=$.trim(value));
	*/
	return commonCompare(value,element,param,"dateNEVal");
},jQuery.validator.format("应不等于{0}加{1}"));

/*
@athor:周小建
@time:2007-10-15
@description:日期大于某值
*/
jQuery.validator.addMethod("dateGTVal",function(value,element,param){
	/*
	if(!(typeof param == "string" && $.trim(param))) return false;
	if(!(typeof value == "string" && $.trim(value))) return false;
	return this.optional(element) || ($.trim(value)>$.trim(value));
	*/
	return commonCompare(value,element,param,"dateGTVal");
},jQuery.validator.format("应大于{0}加{1}"));

/*
@athor:周小建
@time:2007-10-15
@description:日期大于等于某值
*/
jQuery.validator.addMethod("dateGEVal",function(value,element,param){
	/*
	if(!(typeof param == "string" && $.trim(param))) return false;
	if(!(typeof value == "string" && $.trim(value))) return false;
	return this.optional(element) || ($.trim(value)>=$.trim(value));
	*/
	return commonCompare(value,element,param,"dateGEVal");
},jQuery.validator.format("应大于等于{0}加{1}"));

/*
@athor:周小建
@time:2007-10-15
@description:日期小于某值
*/
jQuery.validator.addMethod("dateLTVal",function(value,element,param){
	/*
	if(!(typeof param == "string" && $.trim(param))) return false;
	if(!(typeof value == "string" && $.trim(value))) return false;
	return this.optional(element) || ($.trim(value)<$.trim(value));
	*/
	return commonCompare(value,element,param,"dateLTVal");
},jQuery.validator.format("应小于{0}加{1}"));

/*
@athor:周小建
@time:2007-10-15
@description:日期小于等于某值
*/
jQuery.validator.addMethod("dateLEVal",function(value,element,param){
	/*
	if(!(typeof param == "string" && $.trim(param))) return false;
	if(!(typeof value == "string" && $.trim(value))) return false;
	return this.optional(element) || ($.trim(value)<=$.trim(value));
	*/
	return commonCompare(value,element,param,"dateLEVal");
},jQuery.validator.format("应小于等于{0}加{1}"));

/*
@athor:周小建
@time:2007-10-15
@description:日期值等于另一输入框
*/
jQuery.validator.addMethod("dateEQInput",function(value,element,param){
	/*
	if(!(typeof param == "string" && $.trim(param))) return false;
	if(!(typeof value == "string" && $.trim(value))) return false;
	//var $anotherDataInput = $("#" + param);
	//var anotherDataVal = $anotherDataInput.val();
	var anotherDataVal = getElValueByName(param);
	return this.optional(element) || ($.trim(value)==anotherDataVal);
	*/
	return commonCompare(value,element,param,"dateEQInput");
},jQuery.validator.format("应等于{0}加{1}"));

/*
@athor:周小建
@time:2007-10-15
@description:日期值不等于另一输入框
*/
jQuery.validator.addMethod("dateNEInput",function(value,element,param){
	/*
	if(!(typeof param == "string" && $.trim(param))) return false;
	if(!(typeof value == "string" && $.trim(value))) return false;
	//var $anotherDataInput = $("#" + param);
	//var anotherDataVal = $anotherDataInput.val();
	var anotherDataVal = getElValueByName(param);
	return this.optional(element) || ($.trim(value)!=anotherDataVal);
	*/
	return commonCompare(value,element,param,"dateNEInput");
},jQuery.validator.format("不等于{0}加{1}"));

/*
@athor:周小建
@time:2007-10-15
@description:日期值大于另一输入框
*/
jQuery.validator.addMethod("dateGTInput",function(value,element,param){
	/*
	if(!(typeof param == "string" && $.trim(param))) return false;
	if(!(typeof value == "string" && $.trim(value))) return false;
	//var $anotherDataInput = $("#" + param);
	//var anotherDataVal = $anotherDataInput.val();
	var anotherDataVal = getElValueByName(param);
	return this.optional(element) || ($.trim(value)>anotherDataVal);
	*/
	return commonCompare(value,element,param,"dateGTInput");
},jQuery.validator.format("应大于等于{0}加{1}"));

/*
@athor:周小建
@time:2007-10-15
@description:日期值大于等于另一输入框
*/
jQuery.validator.addMethod("dateGEInput",function(value,element,param){
	/*
	if(!(typeof param == "string" && $.trim(param))) return false;
	if(!(typeof value == "string" && $.trim(value))) return false;
	//var $anotherDataInput = $("#" + param);
	//var anotherDataVal = $anotherDataInput.val();
	var anotherDataVal = getElValueByName(param);
	return this.optional(element) || ($.trim(value)>=anotherDataVal);
	*/
	return commonCompare(value,element,param,"dateGEInput");
},jQuery.validator.format("应大于等于{0}加{1}"));

/*
@athor:周小建
@time:2007-10-15
@description:日期值小于另一输入框
*/
jQuery.validator.addMethod("dateLTInput",function(value,element,param){
	/*
	if(!(typeof param == "string" && $.trim(param))) return false;
	if(!(typeof value == "string" && $.trim(value))) return false;
	//var $anotherDataInput = $("#" + param);
	//var anotherDataVal = $anotherDataInput.val();
	var anotherDataVal = getElValueByName(param);
	return this.optional(element) || ($.trim(value)<anotherDataVal);
	*/
	return commonCompare(value,element,param,"dateLTInput");
},jQuery.validator.format("应小于{0}加{1}"));

/*
@athor:周小建
@time:2007-10-15
@description:日期值小于等于另一输入框
*/
jQuery.validator.addMethod("dateLEInput",function(value,element,param){
	/*
	if(!(typeof param == "string" && $.trim(param))) return false;
	if(!(typeof value == "string" && $.trim(value))) return false;
	//var $anotherDataInput = $("#" + param);
	//var anotherDataVal = $anotherDataInput.val();
	var anotherDataVal = getElValueByName(param);
	return this.optional(element) || ($.trim(value)<=anotherDataVal);
	*/
	return commonCompare(value,element,param,"dateLEInput");
},jQuery.validator.format("应小于等于{0}加{1}"));
//////////////////////////////////////////////////////////比较验证结束//////////////////////////////////////////////////////////

/*
@athor:周小建
@time:2007-10-15
@description:jQuery 验证默认的错误提示
*/
jQuery.extend(jQuery.validator.messages,{
	required : "不可为空",
	remote : "修正该字段",
	email : "电子邮件格式错误",
	url : "网址格式错误",
	date : "日期格式错误",
	dateISO : "日期 (ISO)格式错误",
	number : "必须是数字",
	digits : "必须是整数",
	creditcard : "非法凭证号",
	equalTo : jQuery.validator.format("必须与{0}相等"),
	accept : "非法后缀名",
	maxlength : jQuery.validator.format("长度最长{0}个字符"),
	minlength : jQuery.validator.format("长度最短{0}个字符"),
	rangelength : jQuery.validator.format("长度应在{0}和{1}之间"),
	range : jQuery.validator.format("应在{0}和{1}之间"),
	max : jQuery.validator.format("应最大为 {0}"),
	min : jQuery.validator.format("应最小为 {0}")
});
}
MyJQueryValidateExtend(window);