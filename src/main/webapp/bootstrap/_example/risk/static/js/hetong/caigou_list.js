var key = 'cght';
var cght = "";
var examineStatus = "";
var url ="";
// var flag = "";
var oldContractCode = "";
var fjstr = "";

//表格标题项
var columns = [ 
	{
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
			var page = $table.bootstrapTable("getPage");
			var pageSize = page.pageSize,pageNumber = page.pageNumber;
			return page.pageSize*(page.pageNumber-1)+index+1;
		}
	},
	{
		title : '合同编号',
		align:'left',
		field : 'contractCode',
		formatter : lookInfoFormatter
	}, 
	{
		title : '合同名称',
		align:'left',
		field : 'contractName',
		formatter : labelTrimFormatter
	},
    {
        title : '卖方名称',
        align:'left',
        field : 'sellerName',
        formatter : labelTrimFormatter
    },
    {
        title : '生效日期',
        align:'center',
        field : 'effectiveDate',
    },
    {
		title : '签订日期',
		align:'center',
		field : 'signTime'
	}, 
	/*{
		title : '买方',
		align:'center',
		field : 'buyerName',
		formatter : labelTrimFormatter
	}, */
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
				col : "examineStatus",
				label : "审核状态",
				type : "select",
				options  : [
					{text : "请选择", value : ""},
					{text : "已通过", value : "2"},
					{text : "未通过", value : "1"},
					{text : "未审核", value : "0"}
				]
			},
			{
				col : "associatedState",
				label : "关联状态",
				type : "select",
				options  : [
					{text : "请选择", value : ""},
					{text : "已关联", value : "1"},
					{text : "未关联", value : "0"}
				]
			},
            {
                col : "sellerName",
                type : "text",
                label : "卖方名称"
            },
			{
				col : "signDate",
				label : "签订日期",
				type : "startEndDate",
				dates  : [
					{name : "signTimeStart", text : "开始日期"},
					{name : "signTimeEnd", text : "结束日期"}
				]
			}
		]
	},"query");
	
	//初始表头按钮
	addTableHeaderOpration({
		container : "optionsBtn",
		btns : [
			{id: "import", content: "导入",className : "glyphicon glyphicon-import"},
            /*{id: "download", content: "模板下载",className : "glyphicon glyphicon-download-alt"},*/
			{id: "add", content: "添加",className : "glyphicon glyphicon-plus"},
			{id: "update", content: "修改",className : "glyphicon glyphicon-pencil"}
			/*{id: "delete", content: "删除",className : "glyphicon glyphicon-trash"},
			{id: "shenhe", content: "审核",className : "glyphicon glyphicon-pawn"}*/
		]
	});

	//查询
    $("#thSearchBtn").bind("click",function(){
        queryData("../../../../caiGouHeTong/findPageByCondition");
    }).trigger("click");

    //模板下载
    /*$(document).on("click", "#download", function() {
    	window.location.href="./采购合同模板0004.xlsx";
    });*/

	//添加
	$(document).on("click", "#add", function() {
		// flag = false;
        oldContractCode = "";
		openLayer({
			ele:this,
			title : '<i class="glyphicon glyphicon-plus" style="padding-right:3px;font-size:12px;"></i>添加采购合同',
			url : "../../../pages/hetong/caigou/add.html"
		});
	});

	//修改
	$(document).on("click","#update",function() {
		// flag = true;
		var selectRows = $table.bootstrapTable('getSelections');
		if (selectRows.length === 1) {
			params = selectRows[0];
            selectRows = selectRows.map(function(item) {
                return item.examineStatus;
            });
            if(selectRows.indexOf("2")>=0){
                layer.msg("选中的采购合同审核已通过，不可修改!");
                return;
            }
            var selectRows = $table.bootstrapTable('getSelections');
            oldContractCode = selectRows[0].contractCode;
			layer.open({
				type : 2,
				skin : 'myLayui', // 样式类名
				title : '<i class="glyphicon glyphicon-pencil" style="padding-right:3px;font-size:12px;"></i>修改采购合同信息【合同名称：<font color="red">'+selectRows[0].contractName+'</font>】',
				area : [ "98%", "96%" ],
				content : "../../../pages/hetong/caigou/add.html?editflag=edit&tempTime="+new Date().getTime()
				/*success : function(layero, index) {
				   var currentFrame = layero.find("iframe")[0].contentWindow.document;
				   $.ajax({
				        url:'../../../../caiGouHeTong/selectCghtByPrimaryKey',
				        type:'POST',
				        dataType:'json',
				        contentType:"application/x-www-form-urlencoded; charset=UTF-8",
				        data:{
				            "cghtUuid":selectRows[0].cght
				        },
				        success:function(result){
                            var ids = "";
				        	var arr = result.data.fjids.split("-");
				        	if(arr.length>0){
				        		ids=arr[0]+"-"+arr[1]+"-"+arr[2];
							}
							fjstr = ids;
		                   setFormData('addInfoForm',currentFrame,result.data.cght)
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
        if(selectRows.length<1){
            layer.msg("请选择至少一条数据进行删除!");
		}else {
            selectRows = selectRows.map(function(item) {
                return item.examineStatus;
            });
            if(selectRows.indexOf("2")>=0){
                layer.msg("选中的采购合同存在审核已通过，不可删除!");
                return;
            }
            layer.confirm('确定要删除吗?', {
                btn : [ "确定" ]
            }, function() {
                var selectRows = $table.bootstrapTable('getSelections');
                selectRows = selectRows.map(function(item) {
                    return item.cght;
                });
                var keys = selectRows.join(",");
                $.ajax({
                    url:'../../../../caiGouHeTong/delCght',
                    type:'post',
                    dataType:'json',
                    data:{
                        "uuids":keys
                    },
                    success:function(result){
                        $table.bootstrapTable("refresh",{pageNumber:1});
                        layer.msg('删除成功!');
                    }
                })
            });
		}
	});

	//导入
	$(document).on('click', '#import', function() {
        url="../../../../caiGouHeTong/multifileUpload?type=cght";
		openLayer({ele:this,title:'<i class="glyphicon glyphicon-import" style="padding-right:3px;font-size:12px;"></i>导入文件',area:[ "60%", "60%" ],url:"../../../pages/hetong/caigou/import.html"});
	});

	// 审核
	$(document).on('dblclick', '.shBtn', function() {
			cght =  params.cght
			examineStatus = params.examineStatus;
			openLayer({
				id : params.cght,
				ele:this,
				title : '<i class="glyphicon glyphicon-plus" style="padding-right:3px;font-size:12px;"></i>采购合同审核【合同名称：<font color="red">'+params.contractName+'</font>】',
				area :  [ "60%", "90%" ],
				url : "../../../pages/hetong/caigou/shenhe.html"
			});
	});

	//查看详情
	$(document).on("click", ".lookInfo", function() {
/*		var title = popupPreHandler(this,3);
		openLayer({
			ele:this,
			id : $(this).attr("key"),
			title : '<i class="glyphicon glyphicon-file" style="padding-right:3px;font-size:12px;"></i>采购合同详情【合同名称：<font color="red">'+title+'</font>】',
			url : "../../../pages/hetong/caigou/detail.html"
		});
*/
		layer.open({
			type : 2,
			skin : 'myLayui', // 样式类名
			title : '<i class="glyphicon glyphicon-pencil" style="padding-right:3px;font-size:12px;"></i>查看采购合同【合同名称：<font color="red">'+params.contractName+'</font>】',
			area : [ "98%", "96%" ],
			content : "../../../pages/hetong/caigou/add.html?editflag=detail&tempTime="+new Date().getTime()

		});
	});

	//查看货物清单
	$(document).on('click', '.searchBtn', function() {
        var title = popupPreHandler(this,3);
        openLayer({
            ele:this,
            id : $(this).attr("key"),
            area : [ "98%", "96%" ],
            title : '货物清单【合同名称：<font color="red">'+title+'</font>】',
            url : "../../../pages/hetong/caigou/goods.html"
        });
	});

	//查看关联信息
	$(document).on('click', '.glBtn', function(e){
		var title = popupPreHandler(this,3);
		openLayer({area : [ "98%", "96%" ],ele:this,id: $(this).attr("id"),title:'<i class="glyphicon glyphicon-random" style="padding-right:3px;font-size:12px;"></i>关联信息【合同名称：<font color="red">'+title+'</font>】',url:"../../../pages/hetong/caigou/guanlian.html"});
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
    // return '<i title="'+title+'" class="fa '+className+'"></i>';
    return '<a href="javascript:void(0);" key="'+row[key?key:"id"]+'" class="text-info shBtn"><i title="'+title+'" class="fa '+className+'"></i></a>';

}