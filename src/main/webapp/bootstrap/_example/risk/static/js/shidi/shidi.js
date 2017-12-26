$(document).ready(function(){
	var $table = $('#table');
	var columns = [ 
		{
			field : 'select',
			align:'center',
			checkbox : true
		},
		{
			title : '供货商名称',
			field : 'name',
			align:'center',
			formatter : lookInfoFormatter
		}, 
		{
			title : '纳税人识别号',
			align:'center',
			field : 'nsrsbh'
		}, 
		{
			title : '企业类型',
			align:'center',
			field : 'type'
		}, 
		{
			title : '纳税信用等级',
			align:'center',
			field : 'nsdj'
		}, 
		{
			title : '内部评估等级',
			align:'center',
			field : 'pgdj'
		}, 
		{
			title : '税局信用等级',
			align:'center',
			field : 'xydj'
		}, 
		{
			title : '核查状态',
			field : 'shstate',
			align:'center',
			formatter : examineStatusFormatter
		} 
	];

	var data = [ 
		{
			"name" : "创立信电子厂",
			"nsrsbh" : "913201059901675",
			"type" : "生产",
			"nsdj" : "B",
			"pgdj" : "B",
			"xydj" : "白",
			"shstate" : "1"
		}, 
		{
			"name" : "某集团工程有限公司",
			"nsrsbh" : "913201059901134",
			"type" : "生产",
			"nsdj" : "C",
			"pgdj" : "C",
			"xydj" : "黑",
			"shstate" : "0"
		}, 
		{
			"name" : "北京某某电子厂",
			"nsrsbh" : "913201059901422",
			"type" : "生产",
			"nsdj" : "A",
			"pgdj" : "A",
			"xydj" : "白",
			"shstate" : "1"
		} 
	];

	$table.bootstrapTable('destroy').bootstrapTable({
		classes : 'table table-hover', // 添加样式名称
		striped : true, // 隔行变色
		search : true, // 显示搜索工具条
		searchAlign : 'left',
		toolbar : '.myBtn',
		toolbarAlign : 'right',
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
			title : "核查信息完善",
			area : [ "70%", "65%" ],
			content : "../../pages/gonghuo/shidi/detail.html"
		});
	});
	
/*	//添加
	$(document).on("click", "#add", function() {
		parent.layer.open({
			type : 2,
			skin : 'myLayui', // 样式类名
			title : "添加供货商信息",
			area : [ "70%", "65%" ],
			content : "../../../pages/shidi/add.html"
		});
	});*/
	
	//修改
	$(document).on("click", "#update", function() {
		var selectRows = $table.bootstrapTable('getSelections');
		if(selectRows.length===1){
			parent.layer.open({
				type : 2,
				skin : 'myLayui', // 样式类名
				title : "修改供货商信息",
				area : [ "70%", "65%" ],
				content : "../../pages/ruzhu/add.html",
				success: function (layero, index) {  
	                // layero.find("iframe")        找到iframe的jquery对象  
	                // layero.find("iframe")[0]     将jqeruy对象转化为Dom对象  
	                // contentWindow                获取当前 iframe 的 内容 window对象（Dom对象）  
					var currentFrame = layero.find("iframe")[0].contentWindow.document;
					setFormData('ruzhu_add',currentFrame,selectRows[0]);
	            }
			});
		}else{
			parent.layer.msg("请选择一条数据进行编辑!");
		}
	});
	
	//删除
	$(document).on('click','#delete',function(){
		var selectRows = $table.bootstrapTable('getSelections');
		if (selectRows.length>=1) {
			parent.layer.confirm('确定要删除吗?',{btn:["确定"]},function(){
				selectRows = selectRows.map(function(item){
						return item.nsrsbh;
				});
				$table.bootstrapTable('remove', {field: 'nsrsbh', values: selectRows});
				parent.layer.msg('删除成功!');
			});
		}else{
			parent.layer.msg("请选择一条数据进行编辑!");
		}
	});
	
	//审核
	$(document).on('click','.shenhe',function(){
		parent.layer.open({
			type : 2,
			skin : 'myLayui', // 样式类名
			title : "供货商审核",
			area : [ "70%", "65%" ],
			content : "../../pages/gonghuo/shidi/shenhe.html"
		});
	});
//格式化状态
function examineStatusFormatter(value, row, index) {
	var title = '';
	var className = '';
	if(value==0){
		title = '未审核';
		className = 'fa-times-circle text-danger';
	}else if(value==1){
		title = '已审核';
		className = 'fa-check-circle-o text-success';
	}else{
		title = '正在审核...';
		className = 'fa-question-circle-o text-warning';	
	}
	return '<a style="cursor: pointer;" title="'+title+'" class="fa '+className+' shenhe"></a>';
};	
});
