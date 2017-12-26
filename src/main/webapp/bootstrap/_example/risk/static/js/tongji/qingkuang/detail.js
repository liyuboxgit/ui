$(function(){
	// 供货商信息
	var infos = [ {
		name : "供货商名称",
		value : "supplierName"
	}, {
		name : "企业海关代码",
		value : "customsCode"
	}, {
		name : "纳税人识别号",
		value : "nsrsbh"
	}, {
		name : "企业类型",
		value : "supplierType"
	}, {
		name : "社会信用代码",
		value : "socialCreditCode"
	}, {
		name : "成立日期",
		value : "clrq"
	}, {
		name : "等级机关",
		value : "registrationAuthority"
	}, {
		name : "法人代表",
		value : "corporateRepresentative"
	}, {
		name : "内部评估等级",
		value : "insideCreditRating"
	}, {
		name : "纳税信用等级",
		value : "payTaxesCreditRating"
	}, {
		name : "注册资本",
		value : "registeredCapital"
	}, {
		name : "邮编",
		value : "zipCode"
	}, {
		name : "截止期限",
		value : "deadline"
	} ];
	
	//联系方式
	var links = [ {
		name : "联系人",
		value : "contacts"
	}, {
		name : "固定电话",
		value : "telephone"
	}, {
		name : "手机",
		value : "phone"
	}, {
		name : "注册地址",
		value : "registeredAddress"
	}, {
		name : "开户行",
		value : "openBank"
	}, {
		name : "账户",
		value : "bankAccount"
	}, {
		name : "经营范围",
		value : "jyfw"
	}, {
		name : "备注",
		value : "remarks"
	}];
	
	// 附件信息
	var files = [ {
		name : "营业执照",
		value : "<a href='营业执照.zip'>营业执照.zip</a>"
	},{
		name : "税务等级证",
		value : "<a href='税务等级证.zip'>税务等级证.zip</a>"
	},{
		name : "组织代码证",
		value : "<a href='组织代码证.zip'>组织代码证.zip</a>"
	},{
		name : "其他",
		value : "<a href='其他.zip'>其他.zip</a>"
	}];

	// 供货商详情
	initDetailInfo({
		id : "info",
		elems : infos
	});
	
	// 联系方式 
	initDetailInfo({
		id : "link",
		elems : links
	});
	
	// 附件
	initDetailInfo({
		id : "fujian",
		elems : files
	});
	
	//修改后处理详情
	/*function initDetailInfo(settings){

		if(settings){

			var $row = $("<div class='row'><div>").appendTo($('#' + settings.id));

			for(var i=0;i<settings.elems.length;i++){

				$row.append('<div class="col-sm-4"><label class="col-sm-5 text-right">'

					+ settings.elems[i].name + ':</label><div class="col-sm-7">' 

					+ '<p id="'+settings.elems[i].value+'"></p></div></div>');

			}

		}

	}*/
	
	//详情信息
	detail(parent.uuid);

	//修改后处理详情
	function detail(uid){
		
		// 请求详情
		$.ajax({

			type : "post",

			dataType : "json",

			url : "../../../../ghs/queryGhsForObject",

	        data:{
	        	"ghsUuid":uid,
				"type":"detail",
	        },
			
			success : function(result){

				$.each(result.data,function(k,v){

					$('#'+k).html(v);

				});
			}

		});

	}

})