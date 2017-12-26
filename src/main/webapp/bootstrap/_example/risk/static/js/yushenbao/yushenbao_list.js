$(function() {
	var $table = $('#table');
	/*
	 * 显示行号 { formatter : function(value,row,index){ return index+1; } }
	 */
	var columns = [ {
		field : 'state',
		checkbox : true
	}, {
		title : '申报',
		field : 'sbDate'
	}, {
		title : '申报批次',
		field : 'sbpici',
		formatter : lookInfoFormatter
	}, {
		title : '关联检查',
		field : 'glcheck'
	}, {
		title : '换汇成本',
		field : 'hhcb'
	}, {
		title : '误差比例',
		field : 'wcbl'
	}, {
		title : '申报状态',
		field : 'sbactive'
	}, {
		title : '上传时间',
		field : 'scDate'
	}, {
		title : '审核状态',
		field : 'shactive'
	}, {
		title : '审核结果信息',
		field : 'result',
		formatter : lookInfoFormatter
	}, {
		title : '提交人',
		field : 'tjpeople'
	}, {
		title : '提交时间',
		field : 'tjDate'
	}
	];
	var data = [ {
		"sbDate" : "201709",
		"sbpici" : "05",
		"glcheck" : "未通过",
		"hhcb" : "未通过",
		"wcbl" : "已通过",
		"sbactive" : "待申报",
		"scDate" : "2017-09-12",
		"shactive" : "",
		"result" : "",
		"tjpeople" : "郑九",
		"tjDate" : "2017-09-27"
	}, {
		"sbDate" : "201709",
		"sbpici" : "05",
		"glcheck" : "已通过",
		"hhcb" : "已通过",
		"wcbl" : "已通过",
		"sbactive" : "已预申报",
		"scDate" : "2017-09-12",
		"shactive" : "审核成功",
		"result" : "数据已审核完成",
		"tjpeople" : "郑九",
		"tjDate" : "2017-09-27"
	} ];

	$table.bootstrapTable('destroy').bootstrapTable({
		classes : 'table table-hover table-no-bordered', // 添加样式名称
		striped : true, // 隔行变色
		search : true, // 显示搜索工具条
		searchAlign : 'left',
		toolbar : '.myBtn',
		toolbarAlign : 'right',
		// buttonsAlign : 'left',
		showExport : true,
		exportTypes : [ 'txt', 'csv', 'excel' ],
		pageNumber : 1,
		pageSize : 10,
		pageList : [ 10, 20, 50 ],
		height : $('body').height() - 32,
		pagination : true,
		columns : columns,
		data : data
	});

	// 查看详情
	$(document).on("click", ".lookInfo", function() {
		
		parent.layer.open({
			type : 2,
			skin : 'myLayui', // 样式类名
			title : "申报批次明细",
			area : [ "70%", "65%" ],
			content : "../../pages/tuishui/yushenbao/detail.html"
		});
	});
//import
	$(document).on('click', '#upload', function() {
		parent.layer.open({
			type : 2,
			skin : 'myLayui', // 样式类名
			title : "导入文件",
			area : [ "60%", "60%" ],
			content : "../../pages/include/import.html"
		});

	});

	// 修改
	$(document).on("click","#update",function() {
		var selectRows = $table.bootstrapTable('getSelections');
		if (selectRows.length === 1) {
			parent.layer.open({
				type : 2,
				skin : 'myLayui', // 样式类名
				title : "修改供货商信息",
				area : [ "70%", "65%" ],
				content : "../../pages/hetong/chukou/add.html",
				success : function(layero, index) {
					var currentFrame = layero.find("iframe")[0].contentWindow.document;
					setFormData('addInfoForm',currentFrame, selectRows[0]);
				}
			});
		} else {
			parent.layer.msg("请选择一条数据进行编辑!");
		}
	});

	// 删除
	$(document).on('click', '#delete', function() {
		var selectRows = $table.bootstrapTable('getSelections');
		if (selectRows.length >= 1) {
			parent.layer.confirm('确定要删除吗?', {
				btn : [ "确定" ]
			}, function() {
				var selectRows = $table.bootstrapTable('getSelections');
				selectRows = selectRows.map(function(item) {
					return item.id;
				});
				$table.bootstrapTable('remove', {
					field : 'id',
					values : selectRows
				});
				parent.layer.msg('删除成功!');
			});
		}else{
			parent.layer.msg("请选择一条数据进行编辑!");
		}
	});

	// 查看报关行预关单
	$(document).on('click', '.lookInfos', function() {
		parent.layer.open({
			type : 2,
			skin : 'myLayui', // 样式类名
			title : "疑点反馈详情",
			area : [ "70%", "65%" ],
			content : "../../pages/tuishui/yushenbao/detailyi.html"
		});

	});

});
function lookInfoFormatter(value, row, index) {
	return '<a href="javascript:;" class="text-info lookInfos">' + value + '</a>';
}