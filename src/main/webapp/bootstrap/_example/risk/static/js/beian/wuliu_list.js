var key = "wlys";

var wlys = "";
var examineStatus = "";
var branch = "";

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
			/*var page = $table.bootstrapTable("getPage");
			var pageSize = page.pageSize,pageNumber = page.pageNumber;
			return page.pageSize*(page.pageNumber-1)+index+1;*/
			
			return index+1;
		}
	},
	{
		title : '协议编号',
		align:'center',
		field : 'agreementCode',
		align : 'left',
		formatter : lookInfoFormatter
	}, 
	{
		title : '协议名称',
		align:'center',
		field : 'agreementName',
		align : 'left',
		formatter : labelTrimFormatter
	}, 
	{
		title : '签订日期',
		align:'center',
		field : 'signTime'
	}, 
	{
		title : '代理方',
		align:'center',
		field : 'agentParty'
	}
];

$(function(){
	//初始化表头表单
	formGenerator({
		container :  "advSearchBox",
		columns : [
			{
				col : "agreementCode",
				type : "text",
				label : "协议编号"
			},
			{
				col : "agreementName",
				type : "text",
				label : "协议名称"
			},
			{
				col : "agentParty",
				label : "代理方",
				type : "select",
				options : getDictsExt("nation")
			},
			{
				col : "signTime",
				label : "签订日期",
				type : "startEndDate",
				dates  : [
					{name : "signDateStart", text : "开始日期"},
					{name : "signDateEnd", text : "结束日期"}
				]
			}
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
		//queryData("../../../../wuLiuYunShu/findPageByCondition");
/*		ajaxHelper("../../../../wuLiuYunShu/findPageByCondition",{branch:'0',pageNo:1,pageSize:1000000},function(result){
			queryData({
				data:{data:{thisPageElements:result.data.thisPageElements}},
				$container:$("#table"),
				columns:columns,
				pageList:[50,100],
				pageSize:100,
				height:344,
				onPostBody:function(data){
					$("#table").bootstrapTable("checkBy",{field:"agreementCode",values:parent.wlyss});
				}
			});
			$("#table").bootstrapTable("checkBy",{field:"agreementCode",values:parent.wlyss});
		});*/
		var branch = "0";
		queryData({
			url:"../../../../wuLiuYunShu/findPageByCondition?branch="+branch,
			$container:$("#table"),
			columns:columns,
			pageList:[50,100],
			pageSize:100,
			height:344,
			onPostBody:function(data){
				$("#table").bootstrapTable("checkBy",{field:"wlys",values:parent.wlyss});
			}
		});
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

	//查看详情
	$(document).on("click", ".lookInfo", function() {
		var title = popupPreHandler(this,3);
		//alert($(this));
		openLayer({
			ele:this,
			//id : $(this).attr("key"),
			title : '<i class="glyphicon glyphicon-file" style="padding-right:3px;font-size:12px;"></i>运输协议详情【协议名称：<font color="red">'+title+'</font>】',
			url : "../../../pages/hetong/wuliu/detail.html"
		});
	});

	

	//添加或修改保存
	$("#saveOrUupdateBtn").on("click",function(e){

		var selectRows = $table.bootstrapTable('getSelections');
		var htmlArray = [];
		var chukouTd = parent.$("#danzhengList tbody tr:eq(2) td:eq(1)");
		if(selectRows.length>0){
		
			var  ids = selectRows.map(function(item,index,arr){
				return item.wlys+"$"+item.agreementCode;
			});
			for(var i=0;i<ids.length;i++){
				var arr = ids[i].split("$");
				htmlArray.push('<a href="javascript:;" style="margin-right:5px;" class="lookWuliuInfo" allname="'+ids[i]+'">'+arr[1]+'</a>');
			}
			chukouTd.html(htmlArray.join(""));
			
		}else{
			chukouTd.html("");
		}
		parent.layer.close(parent.layer.getFrameIndex(window.name));//成功后关闭页面
	});
});