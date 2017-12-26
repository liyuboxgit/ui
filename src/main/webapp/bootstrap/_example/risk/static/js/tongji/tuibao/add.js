var key = "wlys";

var wlys = "";
var examineStatus = "";

//表格标题项
var columns = [ 
	{
		//field : 'state',
		align:'center',
		checkbox : true
	},
	{
		title : '协议ID',
		align:'center',
		field : 'wlys',
		visible : false
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
		title : '纳税人识别号',
		align:'center',
		field : 'contractCode',
		align : 'left',
		formatter : lookInfoFormatter
	}, 
	{
		title : '生产企业名称',
		align:'center',
		field : 'agreementName',
		align : 'left'
	},
	{
		title : '备案类型',
		align:'center',
		field : 'associatedState',
		formatter:$thisExamineStatusFormatter
	}
];

function $thisExamineStatusFormatter(value,row,index){//
	var title = "",className = "";
	switch(value){
		case "1":
			title = "已备案";
			className = "fa-check-circle-o text-success beia";
			break;
		case "2":
			title = "未备案";
			className = "fa fa-times-circle text-danger beia";
			break;
		default:
			title = "未备案";
			className = "fa fa-times-circle text-danger beia";
			break;
	}
	return '<i title="'+title+'" class="fa '+className+'" key='+row.bgd+'>'+title+'</i>';
}
$(function(){
	//初始化表头表单
	formGenerator({
		container :  "advSearchBox",
		columns : [
			{
				col : "agreementCode",
				type : "text",
				label : "纳税人识别号"
			},
			{
				col : "agreementName",
				type : "text",
				label : "生产企业名称"
			},
			{
				col : "agentParty",
				label : "外综服备案状态",
				type : "select",
				options  : [
					{text : "已备案", value : ""},
					{text : "未备案", value : "1"}
				]
			}
		]
	},"query");
	
	//初始表头按钮
	addTableHeaderOpration({
		container : "optionsBtn",
		btns : [
/*			{id: "export", content: "导出",className : "glyphicon glyphicon-export"},
*/			
			{id: "beiAn", content: "生成备案报表",className : "glyphicon fa fa-file-text-o"}
		]
	});

	//查询
	$("#thSearchBtn").bind("click",function(){
		queryData("../../../../chuKouHeTong/findPageByCondition");
	}).trigger("click");

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
	
	//预览打印
	$(document).on("click","#dayin",function(){
		var selectRows = $table.bootstrapTable('getSelections');
		var selectKey = selectRows.map(function(item) {
			return item.rwbh;
		});
		if (selectRows.length === 1) {
//			window.open("../../../../xtbgd/XTYBGDYL?rwbh="+selectKey);
			openLayer({
				type : 2,
				move :false,
				title : "窗口",
				area : ["98%","96%"],
				url: "../../../pages/tongji/qingkuang/dayin.html"
			});
		}else {
			layer.msg("请选择一条数据进行打印!");
		}
	});

	//查看详情
	$(document).on("click", ".lookInfo", function() {
		var title = popupPreHandler(this,3);
		//alert($(this));
		openLayer({
			ele:this,
			//id : $(this).attr("key"),
			title : '<i class="glyphicon glyphicon-file" style="padding-right:3px;font-size:12px;"></i>备案详情【备案名称：<font color="red">'+title+'</font>】',
			url : "../../../pages/tongji/qingkuang/detail.html"
		});
	});
	//备案
	$(document).on("click",".beia", function(){
		openLayer({
			ele:this,
			id : $(this).attr("key"),
			title : '<i class="glyphicon glyphicon-file" style="padding-right:3px;font-size:12px;"></i>备案状态更改',
			url : "../../../pages/tongji/qingkuang/shenhe.html"
		});
	});
	

	//生成备案
	$(document).on("click","#beiAn",function(){
		var selectRows = $table.bootstrapTable('getSelections');
		var selectKey = selectRows.map(function(item) {
			return item.contractCode;
		});
		alert(selectKey);
		if (selectRows.length>0) {
			$.ajax({
				url:'../../../../shenBaoBeiAn/beiAn',
				type:'POST',
				data:{param:(selectKey||[]).join(",")},
				success:function(ret){
					if(ret.success){
						alert('操作成功！');
						refreshTable();
					}
				},error:function(err){
					alert("e"+err);
				}
			});
		}else {
			layer.msg("请选择数据进行备案!");
		}
	})
	
});