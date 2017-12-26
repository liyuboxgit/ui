$(function() {

	// 任务详情信息
	var infos = [ {
		name : "供货商名称",
		value : "创立信电子厂"
	}, {
		name : "纳税人识别号",
		value : "2017923099"
	}, {
		name : "企业类型",
		value : "生产"
	}, {
		name : "纳税信用等级",
		value : "C"
	}, {
		name : "内部信用等级",
		value : "C"
	}, {
		name : "税局信用等级",
		value : "黑"
	} ],
	
	// 历史操作数据
	hisColumns = [ {
		title : '供货商名称',
		field : 'name'
	}, {
		title : '纳税人识别号',
		field : 'id'
	}, {
		title : '企业类型',
		field : 'type'
	}, {
		title : '纳税信用等级',
		field : 'nslevel'
	}, {
		title : '内部评估等级',
		field : 'nblevel'
	}, {
		title : '税局信用等级',
		field : 'cjlevel'
	} ],
	
	
	hisData = [ 
		{
			"name" : "创立信电子厂",
			"id" : "201738237823",
			"type" : "生产",
			"nslevel" : "C",
			"nblevel" : "C",
			"cjlevel" : "黑"
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
