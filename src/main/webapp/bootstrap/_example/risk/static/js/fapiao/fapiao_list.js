var key = "fp";

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
	}, {
		title : '发票ID',
		align:'center',
		field : 'fp',
		visible: false
	}, {
		title : '发票代码',
		align:'center',
		field : 'invoiceCode',
		formatter : lookInfoFormatter
	}, {
		title : '发票号码',
		align:'center',
		field : 'invoiceNumber'
	}, {
		title : '销方名称',
		align:'left',
		field : 'seller'
	}, {
		title : '销方识别号',
		align:'center',
		field : 'sellerTaxpayerIdentity'
	}, {
		title : '金额（元）',
		align:'right',
		field : 'invoiceValue'
	}, {
		title : '税额',
		align:'right',
		field :'se',
		formatter : function seFormatter(value,row,index){
			return (row.jshjje-row.invoiceValue).toFixed(2);
		}
	}, {
		title : '价税合计',
		align:'right',
		field : 'jshjje'
	}, {
		title : '开票日期',
		align:'center',
		field : 'billingDate'
	}, {
		title : '认证日期',
		align:'center',
		field : 'certificationDate'
	}
];
function GetQueryString(name)
{
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
};
$(function() {
	var $table = $('#table');
	//初始化查询
	formGenerator({
		container :  "advSearchBox",
		columns : [
			{
				col : "invoiceCode",
				type : "text",
				label : "发票代码"
			},
			{
				col : "invoiceNumber",
				type : "text",
				label : "发票号码"
			},
			{
				col : "seller",
				type : "text",
				label : "销方名称"
			},
			{
				col : "sellerTaxpayerIdentity",
				type : "text",
				label : "销方识别号"
			}, 
			{
				col : "billingDate",
				label : "开票日期",
				type : "startEndDate",
				dates  : [
					{name : "billingDateStart", text : "开始日期"},
					{name : "billingDateEnd", text : "结束日期"}
				]
			}
		]
	},"query");
	//初始表头按钮
	addTableHeaderOpration({
		container : "optionsBtn",
		btns : [
			//{id: "export", content: "导出",className : "glyphicon glyphicon-export"},
			{id: "dayin", content: "打印",className : "glyphicon glyphicon-pawn"},
			//{id: "delete", content: "删除",className : "glyphicon glyphicon-trash"}
		]
	});
	//查询
	$("#thSearchBtn").on("click",function(){
		queryData("../../../../fapiao/findPage?branch="+GetQueryString("branch"));
	}).trigger("click");
	
	//下载
	$(document).on("click","#export",function(){
		var selectRows = $table.bootstrapTable('getSelections');
		var selectKey = selectRows.map(function(item) {
			return item.fp;
		});
		if (selectRows.length === 1) {
			location.href = "../../../../fapiao/download?fp="+selectKey;
		}else {
			layer.msg("请选择一条数据进行导出!");
		}
	})

	//预览打印
	$(document).on("click","#dayin",function(){
		var selectRows = $table.bootstrapTable('getSelections');
		var selectKey = selectRows.map(function(item) {
			return item.fp;
		});
		if (selectRows.length === 1) {
			window.open("../../../../fapiao/FPYULAN?fp="+selectKey);
		}else {
			layer.msg("请选择一条数据进行打印!");
		}
	})


	//查看详情
	$(document).on("click",".lookInfo", function(){
		/*var title = popupPreHandler(this,3);*/
		openLayer({
			ele:this,
			id : $(this).attr("key"),
			area : ['90%','90%'],
			title : '<i class="glyphicon glyphicon-file" style="padding-right:3px;font-size:12px;"></i>发票详情',
			url : "../../../pages/piaoju/fapiao/detail.html"
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
				return item.fp;
			});
			
			var keys = selectRows.join(",");
		    $.ajax({
		        url:'../../../../fapiao/delete',
		        type:'post',
		        dataType:'json',
		        data:{
		            "uuids":keys
		        },
		        success:function(result){
		        	
		        	$table.bootstrapTable('remove', {
						field : 'fp',
						values : selectRows
					});
					
					layer.msg('删除成功!');
					
		        }
		    })
		    
		});

	});
});
