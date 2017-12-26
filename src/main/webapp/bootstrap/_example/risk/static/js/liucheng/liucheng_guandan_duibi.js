$(function() {
	// 报关单详情信息
	var infos = [ {
		name : "预录入编号",
		value : "1236615626273671627"
	}, {
		name : "海关编号",
		value : ""
	}, {
		name : "出口口岸",
		value : "天津新港"
	}, {
		name : "备案号",
		value : ""
	}, {
		name : "经营单位",
		value : "某集团工程有限公司"
	}, {
		name : "运输方式",
		value : "水路运输"
	}, {
		name : "运输工具",
		value : ""
	}, {
		name : "提运单号",
		value : ""
	}, {
		name : "发货单位",
		value : "某集团工程有限公司"
	}, {
		name : "海关编号",
		value : ""
	}, {
		name : "贸易方式",
		value : "一般贸易"
	}, {
		name : "征免性质",
		value : ""
	}, {
		name : "许可证号",
		value : ""
	}, {
		name : "抵运国（地区）",
		value : "委内瑞拉"
	}, {
		name : "指运港",
		value : "拉瓜伊拉"
	}, {
		name : "境内货源地",
		value : "朝阳区"
	}, {
		name : "批准文号",
		value : ""
	}, {
		name : "成交方式",
		value : "FOB"
	}, {
		name : "运费",
		value : "0"
	}, {
		name : "保费",
		value : "0"
	}, {
		name : "杂费",
		value : "0"
	}, {
		name : "合同协议号",
		value : "45244223223"
	}, {
		name : "件数",
		value : "193"
	}, {
		name : "包装种类",
		value : "其他"
	}, {
		name : "毛重（kg）",
		value : "12921,12"
	}, {
		name : "净重(kg)",
		value : "0"
	}, {
		name : "集装箱号",
		value : "Tclu45244223223"
	}, {
		name : "毛重（kg）",
		value : "12921,12"
	}, {
		name : "净重(kg)",
		value : "1626.12"
	}, {
		name : "集装箱号",
		value : "Tclu45244223223"
	}, {
		name : "附赠单据",
		value : "12921,12"
	}, {
		name : "生产厂家",
		value : ""
	}, {
		name : "标记码及备注",
		value : "任务编号：ck12112121"
	}
	];
	// 对比详情信息
	var links = [ {
		name : "预录入编号",
		value : "1236615626273671627"
	}, {
		name : "海关编号",
		value : ""
	}, {
		name : "出口口岸",
		value : "天津新港"
	}, {
		name : "备案号",
		value : ""
	}, {
		name : "经营单位",
		value : "某集团工程有限公司"
	}, {
		name : "运输方式",
		value : "水路运输"
	}, {
		name : "运输工具",
		value : ""
	}, {
		name : "提运单号",
		value : ""
	}, {
		name : "发货单位",
		value : "某集团工程有限公司"
	}, {
		name : "海关编号",
		value : ""
	}, {
		name : "贸易方式",
		value : "一般贸易"
	}, {
		name : "征免性质",
		value : ""
	}, {
		name : "许可证号",
		value : ""
	}, {
		name : "抵运国（地区）",
		value : "委内瑞拉"
	}, {
		name : "指运港",
		value : "拉瓜伊拉"
	}, {
		name : "境内货源地",
		value : "朝阳区"
	}, {
		name : "批准文号",
		value : ""
	}, {
		name : "成交方式",
		value : "FOB"
	}, {
		name : "运费",
		value : "0"
	}, {
		name : "保费",
		value : "0"
	}, {
		name : "杂费",
		value : "0"
	}, {
		name : "合同协议号",
		value : "45244223223"
	}, {
		name : "件数",
		value : "193"
	}, {
		name : "包装种类",
		value : "其他"
	}, {
		name : "毛重（kg）",
		value : "12921,12"
	}, {
		name : "净重(kg)",
		value : "0"
	}, {
		name : "集装箱号",
		value : "Tclu45244223223"
	}, {
		name : "毛重（kg）",
		value : "12921,12"
	}, {
		name : "净重(kg)",
		value : "1626.12"
	}, {
		name : "集装箱号",
		value : "Tclu45244223223"
	}, {
		name : "附赠单据",
		value : "12921,12"
	}, {
		name : "生产厂家",
		value : ""
	}, {
		name : "标记码及备注",
		value : "任务编号：ck12112121"
	}
	];
	//关单详情添加
	initDetailInfo({
		id : "info",
		elems : infos
	});
	
	//对比详情添加
	initDetailLink({
		id : "link",
		elems : links
	});
	//处理详情
	function initDetailInfo(settings){
		if(settings){
			var $row = $("<div class='row'><div>").appendTo($('#' + settings.id));
			for(var i=0;i<settings.elems.length;i++){
				$row.append('<div class="col-sm-12" style="padding-top:20px;"><label class="control-label col-sm-5 text-right">'
					+ settings.elems[i].name + ':</label><div class="col-sm-7">' 
					+ '<input value="'+settings.elems[i].value+'"/></div></div>');
			}
		}
	}
	//对比处理详情
	function initDetailLink(settings){
		if(settings){
			var $row = $("<div class='row'><div>").appendTo($('#' + settings.id));
			for(var i=0;i<settings.elems.length;i++){
				$row.append('<div class="col-sm-12" style="padding-top:20px;"><label class="control-label col-sm-5 text-right">'
					+ settings.elems[i].name + ':</label><div class="col-sm-7">' 
					+ '<input disabled="disabled" value="'+settings.elems[i].value+'"/></div></div>');
			}
		}
	}
	$.ajax({
		url : "../../../../xtbgd/queryForObject",
		dataType : "json",
        data:{
        	"rwbh":parent.uuid,
        },
		success : function(result){
			$.each(result.data,function(k,v){
				$('#'+k).html(v);
			});
		},error:function(e){
			//alert(e)
		}
	});
	//查看商品详情信息
	$(document).on("click","#renwu_kan_detail_bd",function(){
		openLayer({
			ele:this,
			title : '对比商品',
			area : ["98%","96%"],
			url : "../../../pages/liucheng/wangwu/shangpin.html",
		});
	});
	$('#renwu_bidui_hou_btn').on('click',function(){
		layer.msg('关单比对成功!',{time:2000});
/*		layer.close(biduiIndex);*/
	});
});
