var key = "ckht";

var ckht = "";
var examineStatus = "";
var url="";
var branch="";
//表格标题项
var columns = [ 
	{
		//field : 'state',
		align:'center',
		checkbox : true
	},
	{
		title : '序号',
		align:'center',
		formatter : function(value,row,index){ 
			/*
			var page = $table.bootstrapTable("getPage");
			var pageSize = page.pageSize,pageNumber = page.pageNumber;
			return page.pageSize*(page.pageNumber-1)+index+1;
			*/
			return index + 1;
		}
	},
	{
		title : '合同ID',
		align:'center',
		field : 'ckht',
		visible : false
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
		field : 'signDate'
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
	}, 
	{
		title : '出口国别',
		align:'center',
		field : 'exportCountry',
		formatter : nullFormatter
	}, 
	{
		title : '贸易方式',
		align:'center',
		field : 'serviceType'
	}
];

$(function(){
	//初始化查询
	formGenerator({
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
			},{
				col : "signDate",
				type : "date",
				label : "签订日期",
			}/*, 
			{
				col : "buyerName",
				type : "text",
				label : "买方"
			}, 
			{
				col : "sellerName",
				type : "text",
				label : "卖方"
			}, 
			{
				col : "exportCountry",
				type : "text",
				label : "出口国别"
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
	$("#thSearchBtn").on("click",function(){
/*		ajaxHelper("../../../../chuKouHeTong/findPageByCondition",{branch:'0',pageNo:1,pageSize:1000000},function(result){
			// debugger
			queryData({
				data:{data:{thisPageElements:result.data.thisPageElements}},
				$container:$("#table"),
				columns:columns,
				pageList:[50,100],
				pageSize:100,
				height:344,
				onPostBody:function(data){
					$("#table").bootstrapTable("checkBy",{field:"contractCode",values:parent.ckhts});
				}
			});
			$("#table").bootstrapTable("checkBy",{field:"contractCode",values:parent.ckhts});
		});*/
		
		var branch = "0";
		queryData({
			url:"../../../../chuKouHeTong/findPageByCondition?branch="+branch,
			$container:$("#table"),
			columns:columns,
			pageList:[50,100],
			pageSize:100,
			height:344,
			onPostBody:function(data){
				$("#table").bootstrapTable("checkBy",{field:"ckht",values:parent.ckhts});
			}
		});
	}).trigger("click");
	//查看详情
	$(document).on("click",".lookInfo", function(){
		var title = popupPreHandler(this,3);
		openLayer({
			ele:this,
			//id : $(this).attr("key"),
			title : '<i class="glyphicon glyphicon-file" style="padding-right:3px;font-size:12px;"></i>出口合同详情',
			url : "../../../pages/hetong/chukou/detail.html"
		});
	});
	
	//保存
	$("#saveOrUupdateBtn").on("click",function(e){
		var selectRows = $table.bootstrapTable('getSelections');
		var htmlArray = [];
		var chukouTd = parent.$("#danzhengList tbody tr:eq(0) td:eq(1)");
		if(selectRows.length>0){
			var  ids = selectRows.map(function(item,index,arr){
				return item.ckht+"$"+item.contractCode;
			});
			for(var i=0;i<ids.length;i++){
				var arr = ids[i].split("$");
				htmlArray.push('<a href="javascript:;" style="margin-right:5px;" class="lookChukouInfo" allname="'+ids[i]+'">'+arr[1]+'</a>');
			}
			chukouTd.html(htmlArray.join(""));
		}else{
			chukouTd.html("");
		}
		parent.layer.close(parent.layer.getFrameIndex(window.name));//成功后关闭页面
		
		
	});
});