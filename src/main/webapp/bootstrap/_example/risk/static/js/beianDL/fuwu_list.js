var key = 'fwht';
var fwht = "";
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
		field : 'fwht',
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
		title : '服务开始日期',
		align:'center',
		field : 'signDateStart'
	}, 
	{
		title : '服务截止日期',
		align:'center',
		field : 'signDateEnd'
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
				label : '委托方名称',
				col : 'buyerName',
				type : "text",
			}, 
			{
				col : "signDate",
				label : "服务日期",
				type : "startEndDate",
				dates  : [
					{name : "signTimeStart", text : "服务开始日期"},
					{name : "signTimeEnd", text : "服务结束日期"}
				]
			}, 

			{
				label : '签订日期',
				col : 'signTime',
				type : "date",
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
		ajaxHelper("../../../../fuwuhetong/findPageByCondition",{pageNo:1,pageSize:1000000},function(result){
			queryData({
				data:{data:{thisPageElements:result.data.thisPageElements}},
				$container:$("#table"),
				columns:columns,
				pageList:[50,100],
				pageSize:100,
				height:344,
				onPostBody:function(data){
					$("#table").bootstrapTable("checkBy",{field:"fwht",values:parent.fwhts});
				}
			});
		});
    }).trigger("click");

	//查看详情
	$(document).on("click", ".lookInfo", function() {
        $(document).on("click",".lookInfo", function(){
            layer.open({
                type : 2,
                skin : 'myLayui', // 样式类名
                title : '<i class="glyphicon glyphicon-pencil" style="padding-right:3px;font-size:12px;"></i>修改合同【合同名称：<font color="red">'+params.htmc+'</font>】',
                area : [ "98%", "96%" ],
                content : "../../pages/fuwuhetong/add.html?editflag=detail",
            });
        });
	});

	//添加或修改保存
	$("#saveOrUupdateBtn").on("click",function(e){
		var selectRows = $table.bootstrapTable('getSelections');
		var htmlArray = [];
		var chukouTd = parent.$("#danzhengList tbody tr:eq(1) td:eq(1)");
		if(selectRows.length>0){
			var  ids = selectRows.map(function(item,index,arr){
				return item.fwht+"$"+item.htbh;
			});
			for(var i=0;i<ids.length;i++){
				var arr = ids[i].split("$");
				htmlArray.push('<a href="javascript:;" style="margin-right:5px;" class="lookFuwuInfo" allname="'+ids[i]+'">'+arr[1]+'</a>');
			}
			chukouTd.html(htmlArray.join(""));
		}else{
			chukouTd.html("");
		}
		parent.layer.close(parent.layer.getFrameIndex(window.name));//成功后关闭页面
	});
});
