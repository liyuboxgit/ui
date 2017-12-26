var key = 'cght';
var cght = "";
var examineStatus = "";
var url ="";
//表格标题项
var columns = [ 
	{
		//field : 'state',
		align:'center',
		checkbox : true
	},
	{
		title : '合同ID',
		align:'center',
		field : 'cght',
		visible : false
	},
	{
		title : '序号',
		align:'center',
		formatter : function(value,row,index){ 
			/*var page = $table.bootstrapTable("getPage");
			var pageSize = page.pageSize,pageNumber = page.pageNumber;
			return page.pageSize*(page.pageNumber-1)+index+1;*/
			return index+1;
		}
	},
	{
		title : '合同编号',
		align:'center',
		field : 'contractCode',
		align : 'left',
		formatter : lookInfoFormatter
	}, 
	{
		title : '合同名称',
		align:'center',
		field : 'contractName',
		align : 'left',
		formatter : labelTrimFormatter
	}, 
	{
		title : '签订日期',
		align:'center',
		field : 'signTime'
	}, 
	{
		title : '买方',
		align:'center',
		field : 'buyerName',
		align : 'left',
		formatter : labelTrimFormatter
	}, 
	{
		title : '卖方',
		align:'center',
		field : 'sellerName',
		align : 'left',
		formatter : labelTrimFormatter
	}
];

$(function(){
	formGenerator({
		//初始化查询
		container :  "advSearchBox",
		columns : [
			{
				col : "contractCode",
				type : "text",
				label : "合同编号"
			},
			{
				col : "contractName",
				type : "text",
				label : "合同名称"
			},
			{
				col : "signDate",
				label : "签订日期",
				type : "startEndDate",
				dates  : [
					{name : "signTimeStart", text : "开始日期"},
					{name : "signTimeEnd", text : "结束日期"}
				]
			}/*, 
			{
				label : '买方',
				col : 'buyerName',
				type : "text",
			}, 
			{
				label : '卖方',
				col : 'sellerName',
				type : "text",
			}*/
		]
	},"query");
	
	//初始表头按钮
	addTableHeaderOpration({
		container : "optionsBtn",
		btns : [
			{id: "saveOrUupdateBtn", content: "确定",className : "glyphicon glyphicon-saved"}
		]
	});

	//查询
    $("#thSearchBtn").bind("click",function(){
/*		ajaxHelper("../../../../caiGouHeTong/findPageByCondition",{pageNo:1,pageSize:1000000},function(result){
			
			queryData({
				data:{data:{thisPageElements:result.data.thisPageElements}},
				$container:$("#table"),
				columns:columns,
				pageList:[50,100],
				pageSize:100,
				height:344,
				onPostBody:function(data){
					$("#table").bootstrapTable("checkBy",{field:"contractCode",values:parent.cghts});
				}
			});
			$("#table").bootstrapTable("checkBy",{field:"contractCode",values:parent.cghts});
		});*/
		queryData({
			url:"../../../../caiGouHeTong/findPageByCondition",
			$container:$("#table"),
			columns:columns,
			pageList:[50,100],
			pageSize:100,
			height:344,
			onPostBody:function(data){
				$("#table").bootstrapTable("checkBy",{field:"cght",values:parent.cghts});
			}
		});
    }).trigger("click");

	//查看详情
	$(document).on("click", ".lookInfo", function() {
		var title = popupPreHandler(this,3);
		openLayer({
			ele:this,
//			id : $(this).attr("key"),
			title : '<i class="glyphicon glyphicon-file" style="padding-right:3px;font-size:12px;"></i>采购合同详情【合同名称：<font color="red">'+title+'</font>】',
			url : "../../../pages/hetong/caigou/detail.html"
		});
	});

	//保存
	$("#saveOrUupdateBtn").on("click",function(e){
		var selectRows = $table.bootstrapTable('getSelections');
		var htmlArray = [];
		var chukouTd = parent.$("#danzhengList tbody tr:eq(1) td:eq(1)");
		if(selectRows.length>0){
			var  ids = selectRows.map(function(item,index,arr){
				return item.cght+"$"+item.contractCode;
			});
			for(var i=0;i<ids.length;i++){
				var arr = ids[i].split("$");
				htmlArray.push('<a href="javascript:;" style="margin-right:5px;" class="lookCaigouInfo" allname="'+ids[i]+'">'+arr[1]+'</a>');
			}
			chukouTd.html(htmlArray.join(""));
		}else{
			chukouTd.html("");
		}
		parent.layer.close(parent.layer.getFrameIndex(window.name));//成功后关闭页面
	});
});
