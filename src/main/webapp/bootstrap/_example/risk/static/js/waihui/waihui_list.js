var key = "bgd";

//表格标题项
var columns = [ {
		checkbox : true
	}, {
		title : '序号',
		align:'center',
		formatter : function(value,row,index){ 
			var page = $table.bootstrapTable("getPage");
			var pageSize = page.pageSize,pageNumber = page.pageNumber;
			return page.pageSize*(page.pageNumber-1)+index+1;
		}
	},
	{
		title : '关单号',
		align:'center',
		field : 'bgd',
		visible:false
	},
	{
		title : '关单号',
		align:'center',
		field : 'bgdh',
		formatter : function(value,row,index){
			return lookInfoFormatter(value,row,index,18);
		}
	}, {
		title : '出口日期',
		align:'center',
		field : 'expTime'
	}, {
		title : '贸易方式',
		align:'left',
		field : 'serviceType',
		formatter:function(el){
			return getDict('maoyifs',el);
		}
	}, {
		title : '出口口岸',
		align:'left',
		field : 'exportPort',
		formatter:function(el){
			return getDict('exportPortName',el);
		}
	}, {
		title : '运抵国',
		align:'left',
		field : 'arrivingCountry',
		formatter:function(el){
			return getDict('nation',el);
		}
	}/*, {
		title : '核销单编号',
		field : ''
	}, {
		title : '核销日期',
		field : 'earningsTime'
	}*/,{
		title : '指运港',
		align:'left',
		field : 'fingerPort'
		/*formatter:function(el){
			return getDict('nation',el);
		}*/
	},{
		title : '收汇状态',
		align:'center',
		field : 'earningsStatus',
		formatter:$thisExamineStatusFormatter
	}
];

function $thisExamineStatusFormatter(value,row,index){//
	var title = "",className = "";
	switch(value){
		case "1":
			title = "已收汇";
			className = "fa-check-circle-o text-success sh";
			break;
		case "2":
			title = "不能收汇";
			className = "fa-times-circle-o text-danger sh";
			break;
		default:
			title = "未收汇";
			className = "fa-question-circle-o text-warning sh";
			break;
	}
	return '<a href="javascript:;"><i title="'+title+'" class="fa '+className+'" key='+row.bgd+'>'+title+'</i></a>';
}

$(function(){
	formGenerator({
		container :  "advSearchBox",
		columns : [
			{
				col : "bgdh",
				type : "text",
				label : "关单号"
			},
			{
				col : "serviceType",
				label : "贸易方式",
				type : "select",
				options : getDictsExt("maoyifs")
			},
			/*{
				col : "arrivingCountry",
				label : "出口国别",
				type : "select",
				options : getDictsExt("nation")
			},*/
			{
				col : "exportPort",
				label : "出口口岸",
				type : "select",
				options : getDictsExt('exportPortName') 
			},
			{
				col : "earningsStatus",
				label : "收汇状态",
				type : "select",
				options  : [
							{text : "请选择", value : ""},
							{text : "已收汇", value : "1"},
							{text : "未收汇", value : "0"},
							{text : "不能收汇", value : "2"}
						]
			},
			{
				col : "expTime",
				label : "出口日期",
				type : "startEndDate",
				dates  : [
					{name : "expTimeStart", text : "开始日期"},
					{name : "expTimeEnd", text : "结束日期"}
				]
			}
		]
	},"query");
	
	//表头搜索框
	setselect2("select[name='serviceType']");
	setselect2("select[name='exportPort']");
	setselect2("select[name='earningsStatus']");
	
	//初始表头按钮
	/*addTableHeaderOpration({
		container : "optionsBtn",
		btns : [
			{id: "export", content: "导出",className : "glyphicon glyphicon-export"},
			{id: "dayin", content: "打印",className : "glyphicon glyphicon-pawn"},
			{id: "delete", content: "删除",className : "glyphicon glyphicon-trash"}
		]
	});*/
	
	//查询
	$("#thSearchBtn").bind("click",function(){
		queryData("../../../bgd/queryForPage");
	}).trigger("click");
	
	//预览打印
	$(document).on("click","#dayin",function(){
		var selectRows = $table.bootstrapTable('getSelections');
		var selectKey = selectRows.map(function(item) {
			return item.bgd;
		});
		if (selectRows.length === 1) {
			window.open("../../../bgd/BGDYULAN?bgd="+selectKey);
		}else {
			layer.msg("请选择一条数据进行打印!");
		}
	})
	
	//下载
	$(document).on("click","#export",function(){
		var selectRows = $table.bootstrapTable('getSelections');
		var selectKey = selectRows.map(function(item) {
			return item.bgd;
		});
		if (selectRows.length === 1) {
			location.href = "../../../bgd/download?bgd="+selectKey;
		}else {
			layer.msg("请选择一条数据进行导出!");
		}
	})
	
	//更多
	$("#other").on('click',function(){
		var searchBox = $(".searchBox");
		if(searchBox.outerHeight() == 80){
			$(".searchBox").animate({height:"40px"},200);
			$(this).html('<i class="glyphicon glyphicon-menu-down"></i>更多');
		}else{
			$(".searchBox").animate({height:"80px"},200);
			$(this).html('<i class="glyphicon glyphicon-menu-up"></i>收起');
		}
	});
	
	//删除
	$("#delete").bind("click", function(){
		var selectRows = $table.bootstrapTable('getSelections');
		layer.confirm('确定要删除吗?', {
			btn : [ "确定" ]
		}, function() {
			var selectRows = $table.bootstrapTable('getSelections');
			selectRows = selectRows.map(function(item) {
				return item.ckht;
			});
			
			var keys = selectRows.join(",");
		    $.ajax({
		        url:'../../../exportContract/delCkht',
		        type:'post',
		        dataType:'json',
		        data:{
		            "uuids":keys
		        },
		        success:function(result){
		        	
		        	$table.bootstrapTable('remove', {
						field : 'ckht',
						values : selectRows
					});
					
					layer.msg('删除成功!');
					
		        }
		    })
		    
		});

	});
	
	//导入
	$("#import").bind("click", function(){
		openLayer({ele:this,title:'<i class="glyphicon glyphicon-import" style="padding-right:3px;font-size:12px;"></i>导入文件',area:[ "60%", "60%" ],url:"../../../pages/include/import.html"});
	});

	//查看详情
	$(document).on("click",".lookInfo", function(){
		openLayer({
			ele:this,
			id : $(this).attr("key"),
			title : '<i class="glyphicon glyphicon-file" style="padding-right:3px;font-size:12px;"></i>报关单详情',
			url : "../../pages/guandan/guandan/xiangqing.html"
		});
	});
	
	//收汇
	$(document).on("click",".sh", function(){
		openLayer({
			ele:this,
			id : $(this).attr("key"),
			title : '<i class="glyphicon glyphicon-file" style="padding-right:3px;font-size:12px;"></i>收汇状态更改',
			url : "../../pages/waihui/detail.html"
		});
	});
});
