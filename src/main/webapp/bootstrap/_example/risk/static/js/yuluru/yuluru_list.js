var key = 'rwbh';
//表格标题项
var columns = [ {
		checkbox : true
	},{
		title : '序号',
		align:'center',
		formatter : function(value,row,index){ 
			var page = $table.bootstrapTable("getPage");
			var pageSize = page.pageSize,pageNumber = page.pageNumber;
			return page.pageSize*(page.pageNumber-1)+index+1;
		}
	},{
		title : '预关单号',
		align:'center',
		field : 'formCode',
		formatter : lookInfoFormatter
	} , {
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
	},{
		title : '目的港',
		align:'left',
		field : 'fingerPort'
		/*formatter:function(el){
			return getDict('nation',el);
		}*/
	}, {
		title : '报关行预关单号',
		field : 'baoGuanHangYuBaoGuanDan',
		//field : 'bghybgd',
		align:'center',
		formatter : function(a,b,c){
			if(a && a.indexOf(",")>-1){
				var arr = a.split(","),ret = [];
				for(var i=0;i<arr.length;i++){
					if(arr[i]){
						ret.push("<a href='javascript:findbghygd(\""+ arr[i] + "\");'class='lookBaoGuanHangGD'  key='"+arr[i]+"'>"+arr[i]+"</a>");
					}
				}
				return ret.join(",");
			}else{
				a = "";
				return '<a href="javascript:void(0);" class="lookBaoGuanHangGD" key="'+a+'">'+a+'</a>';
			}
		}
	},
	{
		title : '任务编号',
		align:'center',
		field : 'rwbh',
		//formatter : lookInfoFormatter
	} 
];


$(function(){
	formGenerator({
		container :  "advSearchBox",
		columns : [
			{
				col : "formCode",
				type : "text",
				label : "预关单号"
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
			{id: "export", content: "导出",className : "glyphicon glyphicon-export"},
			{id: "dayin", content: "打印",className : "glyphicon glyphicon-pawn"},
			//{id: "delete", content: "删除",className : "glyphicon glyphicon-trash"}
		]
	});
	
	//查询
	$("#thSearchBtn").bind("click",function(){
		queryData("../../../../xtbgd/queryForPage");
	}).trigger("click");

	//添加
	$(document).on("click", "#add", function() {
		openLayer({
			ele:this,
			title : '<i class="glyphicon glyphicon-plus" style="padding-right:3px;font-size:12px;"></i>添加出口合同',
			area : ["65%","85%"],
			url : "../../../pages/hetong/chukou/add.html"
		});
	});
	
	//预览打印
	$(document).on("click","#dayin",function(){
		var selectRows = $table.bootstrapTable('getSelections');
		var selectKey = selectRows.map(function(item) {
			return item.rwbh;
		});
		if (selectRows.length === 1) {
			window.open("../../../../xtbgd/XTYBGDYL?rwbh="+selectKey);
		}else {
			layer.msg("请选择一条数据进行打印!");
		}
	})
	
	//下载
	$(document).on("click","#export",function(){
		var selectRows = $table.bootstrapTable('getSelections');
		var selectKey = selectRows.map(function(item) {
			return item.rwbh;
		});
		
		if (selectRows.length === 1) {
			location.href = "../../../../xtbgd/download?rwbh="+selectKey;
		}else {
			layer.msg("请选择一条数据进行导出!");
		}
	})
	
	//删除
	$(document).on('click', '#delete', function() {
		var selectRows = $table.bootstrapTable('getSelections');
		layer.confirm('确定要删除吗?', {
			btn : [ "确定" ]
		}, function() {
			var selectRows = $table.bootstrapTable('getSelections');
			selectRows = selectRows.map(function(item) {
				return item.rwbh;
			});
			
			var keys = selectRows.join(",");
		    $.ajax({
		        url:'../../../../xtbgd/delete',
		        type:'post',
		        dataType:'json',
		        data:{
		            "uuids":keys
		        },
		        success:function(result){
		        	$table.bootstrapTable('remove', {
						field : 'rwbh',
						values : selectRows
					});
		        	
		        	layer.msg('删除成功!');
		        }
		    })
		});
	});

	//导入
	$('#import').bind('click', function() {
		openLayer({ele:this,title:'<i class="glyphicon glyphicon-import" style="padding-right:3px;font-size:12px;"></i>导入文件',area:[ "60%", "60%" ],url:"../../../pages/include/import.html"});
	});

	//查看详情
	$(document).on("click",".lookInfo", function(){
		/*var title = popupPreHandler(this,1)*/;
		window.rwbh = $(this).attr("key");
		openLayer({
			ele:this,
			id : $(this).attr("key"),
			title : '<i class="glyphicon glyphicon-file" style="padding-right:3px;font-size:12px;"></i>系统生成-预关单',
			//url : "../../../pages/guandan/yuluru/detail.html"
			url : "../../../pages/guandan/yuluru/xiangqing.html"
		});
	});
});
function findbghygd(formCode){
	window.formCode=formCode;
	openLayer({
		ele:this,
		title : '<i class="glyphicon glyphicon-file" style="padding-right:3px;font-size:12px;"></i>外部导入-报关行预关单',
		url : "../../../pages/guandan/yuluru/bghygd_xiangqing.html"
	});
}