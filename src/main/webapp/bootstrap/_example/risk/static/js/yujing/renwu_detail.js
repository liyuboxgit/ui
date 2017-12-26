$(function() {

	// 任务详情信息
	var infos = [ {
		name : "任务编号",
		value : "CK201709220001"
	}, {
		name : "出口国别",
		value : "英国"
	}, {
		name : "业务类型",
		value : "一般贸易"
	}, {
		name : "出口口岸",
		value : "天津新港"
	}, {
		name : "运输方式",
		value : "水路运输"
	}, {
		name : "当前环节",
		value : "创建任务"
	}, {
		name : "创建人",
		value : "张三"
	}, {
		name : "创建时间",
		value : "2017-09-27"
	}, {
		name : "说明",
		value : ""
	} ],
	
	// 历史操作数据
	hisColumns = [ {
		title : '任务编号',
		field : 'id'
	}, {
		title : '创建人',
		field : 'czname'
	}, {
		title : '创建时间',
		field : 'czTime'
	}, {
		title : '当前环节',
		field : 'hj'
	}, {
		title : '操作人',
		field : 'ctrl'
	}, {
		title : '操作时间',
		field : 'ctrlTime'
	} ],
	
	
	hisData = [ 
		{
			"id" : "CK201709220002",
			"czname" : "张三",
			"czTime" : "2017-05-11",
			"hj" : "预关单审核",
			"ctrl" : "王五",
			"ctrlTime" : "2017-05-13"
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
