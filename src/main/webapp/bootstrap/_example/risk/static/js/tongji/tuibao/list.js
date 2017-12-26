var key = "wzba";

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
		title : '备案编码',
		align:'center',
		field : 'contractCode',
		align : 'left'
	}, 
	{
		title : '备案日期',
		align:'center',
		field : 'agreementName',
		align : 'left'
	}, 
	{
		title : '备案状态',
		align:'center',
		field : 'associatedState',
		formatter : $thisExamineStatusFormatter
	},
	{
		title : '备案企业数量',
		field : 'checkoutMode',
		align : 'center',
		formatter : lookInfoFormatter
	},
	{
		title : '查看',
		field : 'projects',
		align : 'center',
		formatter: viewDetail
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
			title = "备案中";
			className = "fa fa-question-circle-o text-warning beia";
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
				label : "备案日期范围"
			},
			{
				col : "agreementName",
				label : "备案状态",
				type : "select",
				options  : [
					{text : "已备案", value : ""},
					{text : "未备案", value : "1"},
					{text : "待备案", value : "0"}
				]
			}
		]
	},"query");
	
	//初始表头按钮
	addTableHeaderOpration({
		container : "optionsBtn",
		btns : [
			{id: "add", content: "新建备案",className : "glyphicon glyphicon-export"},
			{id: "delete", content: "删除备案",className : "glyphicon fa fa-file-text-o"},
			{id: "tjbeian", content: "提交备案",className : "glyphicon fa fa-file-text-o"},
			{id: "wcbeian", content: "完成备案",className : "glyphicon fa fa-file-text-o"}
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

	//看备案表
	$(document).on("click",".searchBtn", function(){
		var title = popupPreHandler(this,3);
		openLayer({
			ele:this,
			//id : $(this).attr("key"),
			area : ["98%","96%"],
			title : '货物清单【合同名称：<font color="red">'+title+'</font>】',
			url : "../../../pages/tongji/tuibao/dayin.html"
		});
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
				url: "../../../pages/tongji/tuibao/dayin.html"
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
			area : ["98%","96%"],
			title : '<i class="glyphicon glyphicon-file" style="padding-right:3px;font-size:12px;"></i>备案详情【备案名称：<font color="red">'+title+'</font>】',
			url : "../../../pages/tongji/tuibao/detail.html"
		});
	});

	//新建备案
	$(document).on("click","#add", function(){
		openLayer({
			ele:this,
			id : $(this).attr("key"),
			title : '<i class="glyphicon glyphicon-file" style="padding-right:3px;font-size:12px;"></i>新建备案',
			url : "../../../pages/tongji/tuibao/add.html"
		});
	});
	
    //删除
    $("#delete").on("click", function(){
        var selectRows = $table.bootstrapTable('getSelections');
        if (selectRows.length === 1) {
            var associatedState = selectRows[0].associatedState;
            if (associatedState == 2) {
                layer.msg("此批次正在备案中，不可删除");
                return;
            }
            if (associatedState == 3) {
                layer.msg("此批次已完成备案，不可删除");
                return;
            }
            if(associatedState == 1){
                layer.confirm('确定要删除选中的备案吗？', {
                    btn: ['确定','取消'] //按钮
                }, function(){
                    $.ajax({
                        url : '../../../../wzba/deletewzba',
                        type : 'post',
                        data : {'wzba':selectRows[0].wzba},
                        success : function (result) {
                            if(result.success){
                                $table.bootstrapTable("refresh",{pageNumber:1});
                                layer.msg('删除成功');
                            }else{
                                layer.msg('删除失败');
                            }
                        }
                    })
                }, function(){

                });
            }else{
                layer.msg("备案状态错误！");
            }

        }else{
            layer.msg("请选择一条备案进行删除");
        }

    });
	

    /**
     * 提交备案
     */
    var layerIndex = null;
	$("#tjbeian").on("click",function () {
        var selectRows = $table.bootstrapTable('getSelections');
        console.log(selectRows[0].associatedState);
       
        if (selectRows.length === 1) {
            var associatedState = selectRows[0].associatedState;
            if (associatedState == '') {
                layer.msg("已经备案");
                return;
            }
            if(associatedState == ''){
                layer.msg("已经完成备案");
                return;
			}
            layerIndex = layer.open({
                type: 1,
                title : '提交备案',
                area: ['40%', '20%'], //宽高
                content: $('#beian_date'),
                success : function () {
                    $("#sbwzba").val(selectRows[0].wzba);
                    $("#sbassociatedState").val(selectRows[0].associatedState);
                }
            });

        }else{
            layer.msg("请选择一条数据进行备案!");
		}

    });
	
	
	 /**
     * 完成备案
     */
    var layerIndex = null;
    $("#wcbeian").on("click",function () {
        var selectRows = $table.bootstrapTable('getSelections');
        if (selectRows.length === 1) {
            var associatedState = selectRows[0].associatedState;
            if (associatedState == 1) {
                layer.msg("此批次未进行备案，请先备案");
                return;
            }
            if(associatedState == 3){
                layer.msg("此批次已经完成备案");
                return;
            }
            layerIndex = layer.open({
                type: 1,
                title : '完成备案',
                area: ['40%', '20%'], //宽高
                content: $('#shenbao_date'),
                success : function () {
                    $("#sbwzba").val(selectRows[0].wzba);
                    $("#sbassociatedState").val(selectRows[0].associatedState);
                }

            });
        }else{
            layer.msg("请选择一条数据进行完成备案!");
        }

    });
});