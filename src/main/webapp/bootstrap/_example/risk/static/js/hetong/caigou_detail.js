$(function() {

	// 任务详情信息
	var infos = [ {
		name : "合同名称",
		value : "contractName"
	}, {
		name : "合同编号",
		value : "contractCode"
	}, {
		name : "签约日期",
		value : "signTime"
	}, {
		name : "生效日期",
		value : "effectiveDate"
	}, {
		name : "币制",
		value : "currency"
	}, {
		name : "合同金额:",
		value : "contractAmount"
	}, {
		name : "结汇方式",
		value : "checkoutMode"
	}
	];

	// 联系方式详情
	var links = [
		{
			name : "买方名称",
			value : "buyerName"
		}, {
			name : "卖方名称",
			value : "sellerName"
		}, {
			name : "买方签约人",
			value : "buyerSignName"
		}, {
			name : "卖方签约人",
			value : "sellerSignName"
		}, {
			name : "买方联系电话",
			value : "buyerTelephone"
		}, {
			name : "卖方联系电话",
			value : "sellerTelephone"
		}, {
			name : "买方地址",
			value : "buyerAddress"
		}, {
			name : "卖方地址",
			value : "sellerAddress"
		}
	]

	// 附件信息
	var files = [ {
		name : "合同源文件",
		value : "<a href='合同源文件.zip'>合同源文件.zip</a>"
	},{
		name : "其他",
		value : "<a href='其他.zip'>其他.zip</a>"
	}];
	
	//任务详情添加
	initDetailInfo({
		id : "info",
		elems : infos
	});

	//联系方式添加
	initUserInfo({
		id : "link",
		elems : links
	});

	// 附件
	initDetailInfo({
		id : "fujian",
		elems : files
	});
	
	//处理详情
	function initDetailInfo(settings){
		if(settings){
			var $row = $("<div class='row'><div>").appendTo($('#' + settings.id));
			for(var i=0;i<settings.elems.length;i++){
				$row.append('<div class="col-sm-4"><label class="col-sm-5 text-right">'
					+ settings.elems[i].name + ':</label><div class="col-sm-7">' 
					+ '<p id="'+settings.elems[i].value+'"></p></div></div>');
			}
		}
	}

	//查询详情信息
	detail(parent.params.cght,parent.params.beian);
	
	//处理详情请求
	function detail(cght,beian){
		// 请求详情
		$.ajax({
			type : "post",
			dataType : "json",
			url : "../../../../caiGouHeTong/selectByPrimaryKey",
	        data:{
	        	"cghtUuid":cght,
	        	"beian":beian,
	        },
			success : function(result){
				$.each(result.data,function(k,v){
					$('#'+k).html(v);
				});
			}
		});
	}
});
