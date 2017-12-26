var key = "kptzd";

var columns = [ {
		align:'center',
		checkbox : true
	}, {
		title : '序号',
		align:'center',
		formatter : function(value,row,index){ 
			var page = $table.bootstrapTable("getPage");
			var pageSize = page.pageSize,pageNumber = page.pageNumber;
			return page.pageSize*(page.pageNumber-1)+index+1;
		}
	},{
		title : '协议ID',
		align:'center',
		field : 'kptzd',
		visible : false
	},{
		title : '通知单号',
		align:'center',
		field : 'kptzdbm',
		formatter : function(value,row,index){
			return lookInfoFormatter(value,row,index,16);
		}
	}, {
		title : '供货商名称',
		align:'left',
		field : 'seller',
		formatter : function(value,row,index){
			return labelTrimFormatter(value,row,index,16);
		}
	},{
		title : '生成日期',
		align:'center',
		field : 'createTime'
	}, {
		title : '关单号',
		align:'center',
		field : 'bgdh'
	}, {
		title : '任务编号',
		align:'center',
		field : 'rwbh'
	}
];
function GetQueryString(name)
{
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
};

$(function() {
	formGenerator({
		container :  "advSearchBox",
		columns : [
			{
				col : "kptzdbm",
				type : "text",
				label : "通知单号"
			},
			{
				col : "seller",
				type : "text",
				label : "供货商名称"
			},
			{
				col : "bgdh",
				type : "text",
				label : "关单号"
			},
			{
				col : "rwbh",
				type : "text",
				label : "任务编号"
			}
		]
	},"query");
	
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
	$("#thSearchBtn").on("click",function(){
		queryData("../../../../kaipiaotzd/findPage?branch="+GetQueryString("branch"));
	}).trigger("click");
	
	//下载
	$(document).on("click","#export",function(){
		var selectRows = $table.bootstrapTable('getSelections');
		var datalist = [];
		selectRows.forEach(function(i, j) {
			datalist.push(i.kptzd);
		});
		/*selectRows.map(function(item) {
			datalist.push(item.kptzd);
			alert(item.kptzd);
		});*/
		//datalist1 = JSON.stringify(datalist);
		if (datalist.length>0) {
			//location.href = "../../../../kaipiaotzd/download?kptzd="+selectKey;
			location.href = "../../../../kaipiaotzd/download?params="+datalist;
		}else {
			layer.msg("请选择一条数据进行导出!");
		}
		
		
	})

	//预览打印
	$(document).on("click","#dayin",function(){
		var selectRows = $table.bootstrapTable('getSelections');
		var selectKey = selectRows.map(function(item) {
			return item.kptzd;
		});
		if (selectRows.length === 1) {
			window.open("../../../../kaipiaotzd/KPTZDYULAN?kptzd="+selectKey);
		}else {
			layer.msg("请选择一条数据进行打印!");
		}
	})

	//查看详情
	$(document).on("click",".lookInfo", function(){
		/*var title = popupPreHandler(this,3);*/
		openLayer({
			ele:this,
			//id : $(this).attr("key"),
			//area : ['95%','90%'],
			title : '<i class="glyphicon glyphicon-file" style="padding-right:3px;font-size:12px;"></i>开票通知单详情',
			url : "../../../pages/piaoju/tongzhi/detail.html"
		});
	});
	
	//删除
	$("#delete").bind("click", function(){
		var selectRows = $table.bootstrapTable('getSelections');
		layer.confirm('确定要删除吗?', {
			btn : [ "确定" ]
		}, function() {
			var selectRows = $table.bootstrapTable('getSelections');
			selectRows = selectRows.map(function(item) {
				return item.kptzd;
			});
			
			var keys = selectRows.join(",");
		    $.ajax({
		        url:'../../../../kaipiaotzd/delete',
		        type:'post',
		        dataType:'json',
		        data:{
		            "uuids":keys
		        },
		        success:function(result){
		        	
		        	$table.bootstrapTable('remove', {
						field : 'kptzd',
						values : selectRows
					});
					
					layer.msg('删除成功!');
					
		        }
		    })
		    
		});

	});
});