$(function() {
	// 报关单详情信息
	var infos = [ {
		name : "关单号",
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



	links =[ {
		title : '项号',
		field : 'id'
	}, {
		title : '商品编号',
		field : 'goodsid'
	}, {
		title : '商品名称、规格型号',
		field : 'type'
	}, {
		title : '数量及单位',
		field : 'number'
	}, {
		title : '最终目的地',
		field : 'lastcountry'
	}, {
		title : '单价',
		field : 'price'
	}, {
		title : '总价',
		field : 'allprice'
	}, {
		title : '币值',
		field : 'value'
	}, {
		title : '征免',
		field : 'sign'
	} ],
	linkData = [ 
		{
			"id" : "1",
			"goodsid" : "4019991010",
			"type" : "钻井防滑板|无品牌|无型号",
			"number" : "50 个",
			"lastcountry" : "美国",
			"price" : "193.36",
			"allprice" : "9668.08",
			"value" : "美元",
			"sign" : ""
		},
		{
			"id" : "2",
			"goodsid" : "3544492100",
			"type" : "电缆|传输电力|无型号|400伏",
			"number" : "0.8  千米",
			"lastcountry" : "美国",
			"price" : "1012.42",
			"allprice" : "10731.69",
			"value" : "美元",
			"sign" : ""
		}
	];

	hisColumns = [ {
		title : '项号',
		field : 'noOrderNumber'
	}, {
		title : '发起人',
		field : 'goodsCode'
	}, {
		title : '历史操作',
		field : 'number'
	}, {
		title : '发起时间',
		field : 'goodsName'
	}, {
		title : '说明',
		field : 'sign'
	} ],
	hisData = [ 
		{
			"id" : "1",
			"goodsid" : "4019991010",
			"type" : "钻井防滑板|无品牌|无型号",
			"number" : "50  个",
			"lastcountry" : "美国",
			"price" : "193.36",
			"allprice" : "9668.08",
			"value" : "美元",
			"sign" : ""
		},
		{
			"id" : "2",
			"goodsid" : "3544492100",
			"type" : "电缆|传输电力|无型号|400伏",
			"number" : "0.8  千米",
			"lastcountry" : "美国",
			"price" : "1012.42",
			"allprice" : "10731.69",
			"value" : "美元",
			"sign" : ""
		}
	];
	//任务详情添加
	initDetailInfo({
		id : "info",
		elems : infos
	});

	// 货物清单 
//	var mx = function(linkData){		
		initBootStrapTable({
			id : "historyList",
			columns : links,
			data : linkData
		});
//	}
		//处理详情
		function initDetailInfo(settings){
			if(settings){
				var $row = $("<div class='row'><div>").appendTo($('#' + settings.id));
				for(var i=0;i<settings.elems.length;i++){
					$row.append('<div class="col-sm-4"><label class="control-label col-sm-6 text-right">'
						+ settings.elems[i].name + ':</label><div class="col-sm-6">' 
						+ '<p id="'+settings.elems[i].value+'"></p></div></div>');
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
/*	$.ajax({
		url : "../../../../xtbgd/queryMingXiForList",
		dataType : "json",
        data:{
        	"rwbh":parent.uuid,
        },
		success : function(result){
			mx(result.data);
		},error:function(e){
			//alert(e)
		}
	});*/

});
