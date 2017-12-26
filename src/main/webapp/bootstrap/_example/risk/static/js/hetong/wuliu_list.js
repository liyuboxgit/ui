var key = "wlys";

var wlys = "";
var examineStatus = "";
var branch = '0';
//表格标题项
var oldContractCode = "";
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
		title : '发运地',
		align:'center',
		field : 'dispatchPlace',
        align : 'left',
        formatter : function(value,row,index){
        	return labelTrimFormatter(value,row,index,12);
        }
	},
    {
        title : '目的地',
        align:'center',
        field : 'destination',
        align : 'left',
        formatter : function(value,row,index){
        	return labelTrimFormatter(value,row,index,10);
        }
    },
    {
        title : '委托方名称',
        align:'center',
        field : 'entrustingParty',
        align : 'left',
        class : "hide"
    },
    {
		title : '代理方名称',
		align:'center',
		field : 'agentParty',
        align : 'left',
        formatter : function(value,row,index){
        	return labelTrimFormatter(value,row,index,16);
        }
	},
    {
        title : '签订日期',
        align:'center',
        field : 'signTime'
    },
	{
		title : '货物清单',
		field : 'projects',
		align : 'center',
		formatter: viewDetail
	},
	{
		title : '审核状态',
		field : 'examineStatus',
		align : 'center',
		formatter : examineStatusFormatter
	}, 
	{
		title : '关联状态',
		field : 'associatedState',
		align: 'center',
		formatter : formatterGlStatus
	}
];

$(function(){
	//初始化表头表单
	if(typeof(serchParam.branch) != "undefined"){
		branch = serchParam.branch;
	}
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
				type : "text",
			},
			{
				col : "dispatchPlace",
				label : "发运地",
				type : "text",
			},
			{
				col : "destination",
				label : "目的地",
				type : "text",
			},
			{
				col : "examineStatus",
				label : "签订日期",
				type : "startEndDate",
				dates  : [
					{name : "cxksrq", text : "开始日期"},
					{name : "cxjsrq", text : "结束日期"}
				]
			}
		]
	},"query");
	
	//初始表头按钮
	addTableHeaderOpration({
		container : "optionsBtn",
		btns : [
			{id: "import", content: "导入",className : "glyphicon glyphicon-import"},
			{id: "add", content: "添加",className : "glyphicon glyphicon-plus"},
			{id: "update", content: "修改",className : "glyphicon glyphicon-pencil"},
			// {id: "delete", content: "删除",className : "glyphicon glyphicon-trash"},
			// {id: "shenhe", content: "审核",className : "glyphicon glyphicon-pawn"}
		]
	});

	//查询
	$("#thSearchBtn").bind("click",function(){
		queryData("../../../../wuLiuYunShu/findPageByCondition?branch="+branch);
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

	//添加
	$(document).on("click", "#add", function() {
        oldContractCode = "";
		openLayer({
			ele:this,
			title : '<i class="glyphicon glyphicon-plus" style="padding-right:3px;font-size:12px;"></i>添加运输协议',
			url : "../../../pages/hetong/wuliu/add.html?branch="+branch
		});
	});

	//修改
	$(document).on("click","#update",function() {
		var selectRows = $table.bootstrapTable('getSelections');
		if (selectRows.length === 1) {
			params = selectRows[0];
			var examineStatus = selectRows[0].examineStatus;
			var associatedState = selectRows[0].associatedState;
			if(examineStatus==2){
				layer.msg("此物流运输协议已审核通过，不可修改，需要修改请先将审核状态修改为不通过!");
				return;
			}
			if(associatedState==1){
				layer.msg("此物流运输协议已关联出口合同，不可修改，需要修改请先将关联撤销!");
				return;
			}
            oldContractCode = selectRows[0].agreementCode;
			layer.open({
				type : 2,
				skin : 'myLayui', // 样式类名
				title : '<i class="glyphicon glyphicon-pencil" style="padding-right:3px;font-size:12px;"></i>修改运输协议信息【协议名称：<font color="red">'+selectRows[0].agreementName+'</font>】',
				area : [ "98%", "96%" ],
				content : "../../../pages/hetong/wuliu/add.html?editflag=edit&branch="+branch+"&tempTime="+new Date().getTime(),
				/*success : function(layero, index) {
				   var currentFrame = layero.find("iframe")[0].contentWindow.document;
				   $.ajax({
				        url:'../../../../wuLiuYunShu/selectByPrimaryKey',
				        type:'GET',
				        dataType:'json',
				        data:{
				            "wlysUuid":selectRows[0].wlys,
							"type":"update"
				        },
				        success:function(result){
				           //$("#addInfoForm input[name='wlys']",currentFrame).val(selectRows[0].wlys);
		                   setFormData('addInfoForm',currentFrame,result.data)
				        }
				    })
				}*/
			});
		} else {
			layer.msg("请选择一条数据进行编辑!");
		}
	});

	//删除
	$(document).on('click', '#delete', function() {
		var selectRows = $table.bootstrapTable('getSelections');
		selectRows = selectRows.map(function(item) {
			return item.examineStatus;
		});
		if(selectRows.indexOf("2")>=0){
			layer.msg("选中的物流运输协议包含已审核通过，不可删除，需要删除请先将审核状态修改为不通过!");
			return;
		}
		var selectRowsd = $table.bootstrapTable('getSelections');
		selectRowsd = selectRowsd.map(function(item){
			return item.associatedState;
		});
		if(selectRowsd.indexOf("1")>=0){
			layer.msg("选中的物流运输协议已经关联采购合同，不可删除，需要修改请先将关联撤销!");
			return;
		}
		layer.confirm('确定要删除吗?', {
			btn : [ "确定" ]
		}, function() {
			var selectRows = $table.bootstrapTable('getSelections');
			selectRows = selectRows.map(function(item) {
				return item.wlys;
			});
			var keys = selectRows.join(",");
		    $.ajax({
		        url:'../../../../wuLiuYunShu/delete',
		        type:'post',
		        dataType:'json',
		        data:{
		            "uuids":keys
		        },
		        success:function(result){
		        	/*$table.bootstrapTable('remove', {
						field : 'wlys',
						values : selectRows
					});
					layer.msg('删除成功!');*/
		        	$table.bootstrapTable("refresh",{pageNumber:1});
					layer.msg('删除成功!');
		        }
		    })
		});
	});

	//导入
	$(document).on('click', '#import', function() {
		openLayer({ele:this,title:'<i class="glyphicon glyphicon-import" style="padding-right:3px;font-size:12px;"></i>导入文件',area:[ "60%", "60%" ],url:"../../../pages/hetong/wuliu/import.html?branch="+branch+"&type=wlys"});
	});

	// 审核
	$(document).on('click', '#shenhe', function() {
		// 单条审核  暂时不支持多条审核
		var selectRows = $table.bootstrapTable('getSelections');
		wlys = selectRows[0].wlys;
		examineStatus = selectRows[0].examineStatus;
		/*selectRows = selectRows.map(function(item) {
			return item.wlys;
		});
		var keys = selectRows.join(",");*/
		if (selectRows.length == 1) {
			openLayer({
				id : selectRows[0].wlys,
				ele:this,
				
				title : '<i class="glyphicon glyphicon-plus" style="padding-right:3px;font-size:12px;"></i>运输协议审核【协议名称：<font color="red">'+selectRows[0].agreementName+'</font>】',
				area :  [ "60%", "90%" ],
				url : "../../../pages/hetong/wuliu/shenhe.html"
			});
		} else {
			layer.msg("请选择一条数据进行审核!");
		}
	});

	//查看详情
	$(document).on("click", ".lookInfo", function() {
		/*var title = popupPreHandler(this,3);
		openLayer({
			ele:this,
			//id : $(this).attr("key"),
			title : '<i class="glyphicon glyphicon-file" style="padding-right:3px;font-size:12px;"></i>运输协议详情【协议名称：<font color="red">'+title+'</font>】',
			url : "../../../pages/hetong/wuliu/detail.html"
		});*/
		layer.open({
			type : 2,
			skin : 'myLayui', // 样式类名
			title : '<i class="glyphicon glyphicon-pencil" style="padding-right:3px;font-size:12px;"></i>查看运输协议信息【协议名称：<font color="red">'+params.agreementName+'</font>】',
			area : [ "98%", "96%" ],
			content : "../../../pages/hetong/wuliu/add.html?editflag=detail&branch="+branch+"&tempTime="+new Date().getTime(),
		});
	});
	
	//查看货物清单
	$(document).on("click",".searchBtn", function(){
		var title = popupPreHandler(this,3);
		openLayer({
			ele:this,
			//id : $(this).attr("key"),
			area : [ "98%", "96%" ],
			title : '货物清单【合同名称：<font color="red">'+title+'</font>】',
			url : "../../hetong/wuliu/goods.html"
		});
	});
	
	//查看关联信息
	$(document).on('click', '.glBtn', function(e){
		var title = popupPreHandler(this,3);
		openLayer({
			ele:this,
			id: $(this).attr("id"),
			area : [ "98%", "96%" ],
			title:'<i class="glyphicon glyphicon-random" style="padding-right:3px;font-size:12px;"></i>关联信息【协议名称：<font color="red">'+title+'</font>】',
			url:"../../../pages/hetong/wuliu/guanlian.html"});
	});
});

function examineStatusFormatter(value,row,index){
    var title = "",className = "";
    switch(value){
        case "1":
            title = "审核未通过";
            className = "fa-times-circle text-danger";
            break;
        case "2":
            title = "审核已通过";
            className = "fa-check-circle-o text-success";
            break;
        default:
            title = "未审核";
            className = "fa-question-circle-o text-warning";
            break;
    }
    return '<a href="javascript:;"><span onclick="shenhe(\''+row.wlys+'\',\''+row.agreementName+'\',\''+row.examineStatus+'\')"><i title="'+title+'" class="fa '+className+'"></i></span></a>';
}

function shenhe(wlys,agreementName,examineStatus){
    openLayer({
        id : wlys,
        ele:this,
        
        title : '<i class="glyphicon glyphicon-plus" style="padding-right:3px;font-size:12px;"></i>物流运输协议审核【合同名称：<font color="red">'+agreementName+'</font>】',
        area :  [ "60%", "90%" ],
        url : "../../../pages/hetong/wuliu/shenhe.html?examineStatus="+examineStatus+"&wlys="+wlys,
    });
}