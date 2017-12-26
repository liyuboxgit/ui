$(function() {

	// 任务详情信息
	var infos = [ {
		name : "合同编号",
		value : "contractCode"
	}, {
		name : "合同名称",
		value : "contractName"
	}, {
		name : "签约日期",
		value : "signDate"
	}, {
		name : "生效日期",
		value : "beginDate"
	}, {
        name : "有效标志",
        value : "state"
    }

    ];
	// 联系方式详情
	var links = [
		{
			name : "委托方名称",
			value : "buyerName"
		}, {
			name : "被委托方名称",
			value : "sellerName"
		}, {
			name : "委托方签约人",
			value : "buyerSignName"
		}, {
			name : "被委托方签约人",
			value : "sellerSignName"
		}, {
			name : "委托方联系电话",
			value : "buyerTelephone"
		}, {
			name : "被委托方联系电话",
			value : "sellerTelephone"
		}, {
			name : "委托方地址",
			value : "buyerAddress"
		}, {
			name : "被委托方地址",
			value : "sellerAddress"
		}
	];
	// 附件信息
	var files = [ {
		name : "合同源文件",
		value : "<a href='合同源文件.zip'>合同源文件.zip</a>"
	}, {
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
	detail(parent.params.bcht,parent.params.beian);

	//处理详情请求
	function detail(uid,beian){
		// 请求详情
		$.ajax({
			type : "post",
			dataType : "json",
			url : "../../../../buchonght/selectByPrimaryKey",
	        data:{
	        	"bchtUuid":uid,
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