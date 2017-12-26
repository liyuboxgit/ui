$(function(){
	hisColumns = [ {
		title : '项号',
		field : 'id'
	}, {
		title : '商品编码',
		field : 'goodsid'
	}, {
		title : '商品名称 规格型号',
		field : 'type'
	}, {
		title : '数量',
		field : 'number'
	}, {
		title : '单位',
		field : 'danwei'
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
			"number" : "50",
			"danwei" : "个",
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
			"number" : "0.8",
			"danwei" : "千米",
			"lastcountry" : "美国",
			"price" : "1012.42",
			"allprice" : "10731.69",
			"value" : "美元",
			"sign" : ""
		}
	];
	Columns = [ {
		title : '项号',
		field : 'id'
	}, {
		title : '商品编码',
		field : 'goodsid'
	}, {
		title : '商品名称 规格型号',
		field : 'type'
	}, {
		title : '数量',
		field : 'number'
	}, {
		title : '单位',
		field : 'danwei'
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
	
	Data = [ 
		{
			"id" : "1",
			"goodsid" : "4019991010",
			"type" : "钻井防滑板|无品牌|无型号",
			"number" : "50",
			"danwei" : "个",
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
			"number" : "0.8",
			"danwei" : "千米",
			"lastcountry" : "美国",
			"price" : "1012.42",
			"allprice" : "10731.69",
			"value" : "美元",
			"sign" : ""
		}
	];
	initBootStrapTable({
		id : "historyList",
		columns : hisColumns,
		data : hisData
	});
	initBootStrapTable({
		id : "guandanList",
		columns : Columns,
		data : Data
	});
	
})
