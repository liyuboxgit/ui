var key = "bgd";

//表格标题项
var columns = [ {
		checkbox : true
	}, 
	{
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
		title : '抵运国',
		align:'left',
		field : 'arrivingCountry',
		formatter:function(el){
			return getDict('nation',el);
		}
	}
	, {
		title : '目的港',
		align:'left',
		field : 'fingerPort'/*,
		formatter:function(el){
			return getDict('nation',el);
		}*/
	}, {
		title : '申报状态',
		field : 'sbzt',
		align:'center',
		formatter:function(value,row,index){
			if(value=='1'){
				return '待申报';
			}else if (value=='2'){
				return '申报中';
			}else if(value=='3'){
				return '已申报';
			}
//			return value=='1'?'已申报':'未申报';
		}
	}, {
		title : '任务编号',
		align:'center',
		field : 'rwbh'
	}
];

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
			},{
				col : "arrivingCountry",
				label : "抵运国",
				type : "select",
				options : getDictsExt('nation') 
			},{
				col : "fingerPort",
				label : "目的港",
				type : "text"
//				options : getDictsExt('nation') 
			},{
				col : "sbzt",
				label : "申报状态",
				type : "select",
				options  : [
                    {text : "请选择", value : ''},
                    {text : "待申报", value : "1"},
                    {text : "申报中", value : "2"},
                    {text : "已申报", value : "3"}
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
	setselect2("select[name='arrivingCountry']");
	
	
	//初始表头按钮
	addTableHeaderOpration({
		container : "optionsBtn",
		btns : [
            {id: "exportSelect", content: "查询导出",className : "glyphicon glyphicon-export"},
            {id: "exportSelectChecked", content: "选中导出",className : "glyphicon glyphicon-export"},
			{id: "export", content: "导出",className : "glyphicon glyphicon-export"},
			{id: "dayin", content: "打印",className : "glyphicon glyphicon-pawn"},
			//{id: "delete", content: "删除",className : "glyphicon glyphicon-trash"}
		]
	});
	
	//查询
	$("#thSearchBtn").bind("click",function(){
		queryData("../../../../bgd/queryForPage");
	}).trigger("click");

	//预览打印
	$(document).on("click","#dayin",function(){
		var selectRows = $table.bootstrapTable('getSelections');
		var selectKey = selectRows.map(function(item) {
			return item.bgd;
		});
		if (selectRows.length === 1) {
			window.open("../../../../bgd/BGDYULAN?bgd="+selectKey);
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
			location.href = "../../../../bgd/download?bgd="+selectKey;
		}else {
			layer.msg("请选择一条数据进行导出!");
		}
	})

	//查询导出
    $("#exportSelect").bind("click",function(){
    	var data = $("#thSearchForm").serialize();
    	window.location.href = "../../../../bgd/selectDownload?data="+data;
    });

    //选中导出
    $(document).on("click","#exportSelectChecked",function(){
        var selectRows = $table.bootstrapTable('getSelections');
        if(selectRows.length === 0){
            layer.msg("请至少选择一条数据进行导出!");
		}else{
            var selectKey = selectRows.map(function(item) {
                return item.bgd;
            });
            location.href = "../../../../bgd/selectDownload?bgdList="+selectKey;
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
				return item.bgd;
			});
			
			var keys = selectRows.join(",");
		    $.ajax({
		        url:'../../../../bgd/delete',
		        type:'post',
		        dataType:'json',
		        data:{
		            "uuids":keys
		        },
		        success:function(result){
		        	
		        	$table.bootstrapTable('remove', {
						field : 'bgd',
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
			url : "../../../pages/guandan/guandan/xiangqing.html"
		});
	});
	
});
