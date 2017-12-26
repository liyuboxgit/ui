var key = 'bcht';
var bcht = "";
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
		field : 'bcht',
		visible : false
	},
	{
		title : '序号',
		align:'center',
		formatter : function(value,row,index){ 
			return index+1;
		}
	},
	{
		title : '合同编号',
		align:'center',
		field : 'htbh',
		align : 'left'
//		formatter : lookInfoFormatter
	}, 
	{
		title : '合同名称',
		align:'center',
		field : 'htmc',
		align : 'left',
		formatter : labelTrimFormatter
	}, 
	{
		title : '委托方名称',
		align:'center',
		field : 'wtfmc',
		align : 'left',
		formatter : labelTrimFormatter
	},
	{
		title : '生效日期',
		align:'center',
		field : 'startTime'
	}, 
	{
		title : '签订日期',
		align:'center',
		field : 'signTime'
	}
];

$(function(){
	formGenerator({
		//初始化查询
		container :  "advSearchBox",
		columns : [
			{
				col : "bcht",
				type : "text",
				label : "合同编号"
			},
			{
				col : "htmc",
				type : "text",
				label : "合同名称"
			},
			{
				label : '委托方名称',
				col : 'wtfmc',
				type : "text",
			}, 
			{
				col : "signDate",
				label : "签订日期",
				type : "startEndDate",
				dates  : [
					{name : "signTimeStart", text : "服务开始日期"},
					{name : "signTimeEnd", text : "服务结束日期"}
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
		queryData({
			url:"../../../../buchonght/findPageByCondition",
			$container:$("#table"),
			columns:columns,
			pageList:[50,100],
			pageSize:100,
			height:344,
			onPostBody:function(data){
				$("#table").bootstrapTable("checkBy",{field:"bcht",values:parent.bchts});
			}
		});
		
    }).trigger("click");

	//查看详情
	$(document).on("click", ".lookInfo", function() {
		var title = popupPreHandler(this,3);
		openLayer({
			ele:this,
			id : $(this).attr("key"),
			title : '<i class="glyphicon glyphicon-file" style="padding-right:3px;font-size:12px;"></i>采购合同详情【合同名称：<font color="red">'+title+'</font>】',
			url : "../../../pages/hetong/buchonghetong/bcht_detail.html"
		});
	});

	//添加或修改保存
	$("#saveOrUupdateBtn").on("click",function(e){
		var selectRows = $table.bootstrapTable('getSelections');
		var htmlArray = [];
		var chukouTd = parent.$("#danzhengList tbody tr:eq(1) td:eq(1)");
		if(selectRows.length>0){
			var  ids = selectRows.map(function(item,index,arr){
				return item.bcht+"$"+item.htbh;
			});
			debugger
			for(var i=0;i<ids.length;i++){
				var arr = ids[i].split("$");
				htmlArray.push('<a href="javascript:;" style="margin-right:5px;" class="lookBuchongInfo" allname="'+ids[i]+'">'+arr[1]+'</a>');
			}
			chukouTd.html(htmlArray.join(""));
		}else{
			chukouTd.html("");
		}
		parent.layer.close(parent.layer.getFrameIndex(window.name));//成功后关闭页面
	});
});
