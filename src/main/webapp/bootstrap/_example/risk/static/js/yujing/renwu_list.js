$(function() {
	var columns = [ {
		field : 'state',
		checkbox : true
	}, {
		title : '任务编号',
		field : 'rwbh'/*,
		formatter : lookInfoFormatter*/
	}, {
		title : '当前环节',
		field : 'rwhjmc'
	}, {
		title : '操作人',
		field : 'zxrid'
	}, {
		title : '操作时间',
		field : 'createTime'
	}, {
		title : '剩余时间',
		field : 'sysz'
	}, {
		title : '剩余时间',
		field : 'syszdw'
	}, {
		title : '说明',
		field : 'sign'
	}];
	
	formGenerator({
		container :  "advSearchBox",
		columns : [
			{
				col : "ssq",
				label : "任务编号",
				type : "monthday",
			},
			{
				col : "sbpch",
				type : "text",
				label : "当前环节"
			},
			{
				col : "sbzt",
				label : "操作人",
				type : "text"
			}
		]
	},"query");
	
	$("#thSearchBtn").on("click",function(){
		queryData({url:"../../../../yujing/findRWYJpage",$container:$("#table"),columns:columns})
	}).trigger("click");

});