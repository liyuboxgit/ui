$(function() {

	// 报关单详情信息
	var infos = [ {
		name : "预录入编号",
		value : "000000000092371271"
	}, {
		name : "海关编号",
		value : "HT181898891984"
	}, {
		name : "出口口岸",
		value : "天津新港"
	}, {
		name : "备案号",
		value : ""
	}, {
		name : "出口日期",
		value : "2014-10-19"
	}, {
		name : "申报日期",
		value : "2015-01-29"
	}, {
		name : "经营单位:",
		value : "某集团工程有限公司"
	}, {
		name : "运输方式",
		value : "水路运输"
	}, {
		name : "运输工具",
		value : "轮船"
	}, {
		name : "提运单号",
		value : ""
	}, {
		name : "发货单位",
		value : "某集团工程有限公司"
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
		name : "运抵国",
		value : "德国"
	}, {
		name : "指运港",
		value : "波士顿"
	}, {
		name : "境内货源地",
		value : ""
	}, {
		name : "批准文号",
		value : "PZX63D832"
	}, {
		name : "成交方式",
		value : "FOB"
	}, {
		name : "合同协议号",
		value : "4520000254"
	}, {
		name : "件数",
		value : "32"
	}, {
		name : "包装种类",
		value : ""
	}, {
		name : "毛重（kg）",
		value : ""
	}, {
		name : "净重（kg）",
		value : ""
	}, {
		name : "运费",
		value : ""
	}, {
		name : "保费",
		value : ""
	}, { 
		name : "杂费",
		value : ""
	}, {
		name : "集装箱号",
		value : ""
	}, {
		name : "随附单据",
		value : ""
	}, {
		name : "生产厂家",
		value : ""
	}, {
		name : "标记码及备注",
		value : ""
	}
	];



	hisColumns = [ {
		title : '项号',
		field : 'id'
	}, {
		title : '商品编号',
		field : 'goodsid'
	}, {
		title : '商品名称 规格型号',
		field : 'type'
	}, {
		title : '数量及单位',
		field : 'number'
	}, {
		title : '最终目的国（地区）',
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

	// 历史记录
	initBootStrapTable({
		id : "historyList",
		columns : hisColumns,
		data : hisData
	});

});
