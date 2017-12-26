$(function() {

	// 任务详情信息
	var infos = [ {
		name : "协议名称",
		value : "agreementName"
	}, {
		name : "协议编号",
		value : "agreementCode"
	}, {
		name : "签约日期",
		value : "signTime"
	}, {
		name : "生效日期",
		value : "beginDate"
	}, {
		name : "截止日期",
		value : "endTime"
	},{
		name : "币制",
		value : "currency"
	}, {
		name : "金额:",
		value : "contractAmount"
	}, {
		name : "结汇方式",
		value : "checkoutMode"
	}, {
		name : "运输方式",
		value : "transportMode"
	} , {
		name : "发运地",
		value : "dispatchPlace"
	} , {
		name : "目的地",
		value : "destination"
	}  , {
		name : "付款日期",
		value : "paymentTime"
	} , {
		name : "保费",
		value : "premium"
	}
	
	];
	// 联系方式详情
	var links = [
		{
			name : "委托方名称",
			value : "entrustingParty"
		}, {
			name : "代理方名称",
			value : "agentParty"
		}, {
			name : "委托方签约人",
			value : "entrustingSignName"
		}, {
			name : "代理方签约人",
			value : "agentSignName"
		}, {
			name : "委托方联系电话",
			value : "entrustingTelephone"
		}, {
			name : "代理方联系电话",
			value : "agentTelephone"
		}, {
			name : "委托方开户行",
			value : "entrustingOpenBank"
		}, {
			name : "代理方开户行",
			value : "agentOpenBank"
		}, {
			name : "委托方账号",
			value : "entrustingBankAccount"
		}, {
			name : "代理方账号",
			value : "agentBankAccount"
		}, {
			name : "委托方地址",
			value : "entrustingAddress"
		}, {
			name : "代理方地址",
			value : "agentAddress"
		}
	]
	// 附件信息
	var files = [ {
		name : "上传协议",
		value : "<a href='上传协议.zip'>上传协议.zip</a>"
	},{
		name : "上传提单",
		value : "<a href='上传提单.zip'>上传提单.zip</a>"
	},{
		name : "上传形式发票",
		value : "<a href='上传形式发票.zip'>上传形式发票.zip</a>"
	},{
		name : "上传运输单据",
		value : "<a href='上传运输单据.zip'>上传运输单据.zip</a>"
	},{
		name : "上传发票",
		value : "<a href='上传发票.zip'>上传发票.zip</a>"
	},{
		name : "上传装箱单",
		value : "<a href='上传装箱单.zip'>上传装箱单.zip</a>"
	},{
		name : "其他",
		value : "<a href='其他.zip'>其他.zip</a>"
	}];
	
	//详情添加
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
	detail(parent.params.wlys,parent.params.beian);

	//处理详情请求
	function detail(uuid,beian){
		// 请求详情
		$.ajax({
			type : "post",
			dataType : "json",
			url : "../../../../wuLiuYunShu/selectByPrimaryKey",
	        data:{
	        	"wlysUuid":uuid,
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
