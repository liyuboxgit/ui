var key = "sbpc";

//表格标题项
var columns = [ 
	{
		align:"center",
		checkbox : true
	},
    {
        title : "申报id",
        align:"center",
        field : "sbpc",
        visible : false
    },
	{
		title : "序号",
		align:"center",
		formatter : function(value,row,index){ 
			var page = $table.bootstrapTable("getPage");
			var pageSize = page.pageSize,pageNumber = page.pageNumber;
			return page.pageSize*(page.pageNumber-1)+index+1;
		}
	}, {
        title : "所属期",
        align:"center",
        field:"ssq"
    },
	{
		title : "申报批次",
		align:"center",
		field : "sbpch",
        formatter : lookInfoFormatter
	},
	{
		title : "起始关联号",
		align:"center",
		field : "qsglh",
		align : "center"
	},
    {
        title : "申报日期",
        align:"center",
        field : "sbrq",
        align : "center"
    },
	{
		title : "业务类型",
		align:"center",
		field : "ywlx",
		align : "center"
	}, 
	{
		title : "创建人",
		align:"center",
		field : "createName"
	}, 
	{
		title : "创建时间",
		align:"center",
		field : "createTime",
		align : "center"
	},
    {
        title : "申报状态",
        align:"center",
        field : "sbzt",
        formatter : examineStatusFormatter
    }
];

$(function(){
	//初始化查询
	formGenerator({
		container :  "advSearchBox",
		columns : [
			{
				col : "ssq",
				label : "所属期",
				type : "monthday"
			},
			{
				col : "sbpch",
				type : "text",
				label : "申报批次"
			},
			{
				col : "sbzt",
				label : "申报状态",
				type : "select",
                options  : [
                    {text : "请选择", value : ""},
                    {text : "待申报", value : "0"},
                    {text : "申报中", value : "2"},
                    {text : "已申报", value : "1"}
                ]
			}
		]
	},"query");
	
	
	setselect2("select[name='sbzt']");
	//初始表头按钮
	addTableHeaderOpration({
		container : "optionsBtn",
		btns : [
			{id: "add", content: "新建批次",className : "glyphicon glyphicon-export"},
			{id: "delete", content: "删除批次",className : "glyphicon fa fa-file-text-o"},
			{id: "tjshenbao", content: "提交申报",className : "glyphicon fa fa-file-text-o"},
			{id: "wcshenbao", content: "完成申报",className : "glyphicon fa fa-file-text-o"}
		]
	});
	
	//查询
	$("#thSearchBtn").on("click",function(e){
		queryData("../../../../sbpc/findPage");
		processEvent(e);
	}).trigger("click");

    /**
     * 提交申报
     */
    var layerIndex = null;
	$("#tjshenbao").on("click",function (e) {
        var selectRows = $table.bootstrapTable("getSelections");
        if (selectRows.length === 1) {
            var sbpc = selectRows[0].sbpc;
            var sbzt = selectRows[0].sbzt;
            if (sbzt == 2) {
                layer.msg("此批次已经申报");
                return;
            }
            if(sbzt == 1){
                layer.msg("此批次已经完成申报");
                return;
			}
            if(sbzt == "0"){
                sbzt = "2";
            }
            /*layerIndex = layer.open({
                type: 1,
                title : "提交申报",
                area: ["40%", "20%"], //宽高
                content: $("#shenbao_date"),
                success : function () {
                    $("#sbsbpc").val(selectRows[0].sbpc);
                    $("#sbsbzt").val(selectRows[0].sbzt);
                }
            });*/
            layer.confirm("确定要提交吗?", {
        	  btn: ["确定"] //按钮
        	}, function(layerIndex){
        		/*
        		$.ajax({
                    url : "../../../../sbpc/submitSBPC",
                    method : "post",
                    data : {
                        "sbpc":sbpc,
                        "sbzt":sbzt
                    },
                    dataType : "json",
                    success : function (result) {
                        if(result.success){
                            $table.bootstrapTable("refresh",{pageNumber:1});
                            layer.msg("更新成功!");
                            layer.close(layerIndex);
                        }else{
                            layer.msg("更新失败!")
                        }
                    }
                });
                */
        		ajaxHelper(
        			"../../../../sbpc/submitSBPC",
        			{
                        "sbpc":sbpc,
                        "sbzt":sbzt
                    },
                    function (result) {
                        if(result.success){
                            $table.bootstrapTable("refresh",{pageNumber:1});
                            layer.msg("提交成功!");
                            layer.close(layerIndex);
                        }else{
                            layer.msg("提交失败!")
                        }
                    }
        		);
                
        	});
        }else{
            layer.msg("请选择一条数据进行申报!");
		}
		processEvent(e);
    });

    /**
     * 完成申报
     */
    var layerIndex = null;
    $("#wcshenbao").on("click",function (e) {
        var selectRows = $table.bootstrapTable("getSelections");
        if (selectRows.length === 1) {
        	var sbpc = selectRows[0].sbpc;
            var sbzt = selectRows[0].sbzt;
            if (sbzt == 0) {
                layer.msg("此批次未进行申报，请先申报");
                return;
            }
            if(sbzt == 1){
                layer.msg("此批次已经完成申报");
                return;
            }
           /* 
           layerIndex = layer.open({
                type: 1,
                title : "完成申报",
                area: ["40%", "20%"], //宽高
                content: $("#shenbao_date"),
                success : function () {
                    $("#sbsbpc").val(selectRows[0].sbpc);
                    $("#sbsbzt").val(selectRows[0].sbzt);
                }

            });
            */
            if(sbzt == "2"){
                sbzt = "1";
            }
            /*
            $.ajax({
                url : "../../../../sbpc/submitSBPC",
                method : "post",
                data : {
                    "sbpc":sbpc,
                    "sbzt":sbzt
                },
                dataType : "json",
                success : function (result) {
                    if(result.success){
                        $table.bootstrapTable("refresh",{pageNumber:1});
                        layer.msg("更新成功!");
                        //layer.close(layerIndex);
                    }else{
                        layer.msg("更新失败!")
                    }
                }

            });
            */
            ajaxHelper(
            	"../../../../sbpc/submitSBPC",
            	{
                    "sbpc":sbpc,
                    "sbzt":sbzt
                },
                function (result) {
                    if(result.success){
                        $table.bootstrapTable("refresh",{pageNumber:1});
                        layer.msg("更新成功!");
                        //layer.close(layerIndex);
                    }else{
                        layer.msg("更新失败!")
                    }
                }
            );
        }else{
            layer.msg("请选择一条数据进行完成申报!");
        }
		processEvent(e);
    });
	
	//添加
	$("#add").on("click", function(e){
		/*
		openLayer({
			ele:this,
			title : '<i class="glyphicon glyphicon-plus" style="padding-right:3px;font-size:12px;"></i>生成批次',
			area : ["98%","96%"],
			url : "../../../pages/tuishui/pici/add.html"
		});
		*/
		openTab("生成批次","tuishui/pici/add.html");
		processEvent(e);
	});

    //添加
    $("#delete").on("click", function(e){
        var selectRows = $table.bootstrapTable("getSelections");
        if (selectRows.length === 1) {
            var sbzt = selectRows[0].sbzt;
            if (sbzt == 2) {
                layer.msg("此批次正在申报中，不可删除");
                return;
            }
            if (sbzt == 1) {
                layer.msg("此批次已完成申报，不可删除");
                return;
            }
            if(sbzt == 0){
                layer.confirm("确定要删除选中的批次吗？", {
                    btn: ["确定","取消"] //按钮
                }, function(layerIndex){
                	/*
                    $.ajax({
                        url : "../../../../sbpc/deleteSbPc",
                        type : "post",
                        data : {"sbpc":selectRows[0].sbpc},
                        success : function (result) {
                            if(result.success){
                                $table.bootstrapTable("refresh",{pageNumber:1});
                                layer.msg("删除成功");
                            }else{
                                layer.msg("删除失败");
                            }
                            layer.close(layerIndex);
                        }
                    });
                    */
                	ajaxHelper(
                		"../../../../sbpc/deleteSbPc",
                		{"sbpc":selectRows[0].sbpc},
                		function (result) {
                            if(result.success){
                                $table.bootstrapTable("refresh",{pageNumber:1});
                                layer.msg("删除成功");
                            }else{
                                layer.msg("删除失败");
                            }
                            layer.close(layerIndex);
                        }
                	);
                }, function(){

                });
            }else{
                layer.msg("申报状态错误！");
            }

        }else{
            layer.msg("请选择一条批次进行删除");
        }
		processEvent(e);
    });

	//查看详情
	$(document).on("click",".lookInfo", function(e){
		var title = popupPreHandler(this,3);
		/*
		openLayer({
			ele:this,
			//id : $(this).attr("key"),
			title : '<i class="glyphicon glyphicon-file" style="padding-right:3px;font-size:12px;"></i>申报批次<span style="color:red">【'+params.sbpch+'】</span>',
			url : "../../../pages/tuishui/pici/detail.html"
		});
		*/
		openTab('申报批次【<font color="red">'+params.sbpch.substring(0,8)+(params.sbpch.length>8?'...':'')+'</font>】',"tuishui/pici/detail.html?tempId="+params.sbpc);
		processEvent(e);
	});
	//选择
	$(document).on("click",".choose", function(e){
		var title = popupPreHandler(this,3);
		openLayer({
			ele:this,
			//id : $(this).attr("key"),
			//area : ["100%","100%"],
			title : '<i class="glyphicon glyphicon-file" style="padding-right:3px;font-size:12px;"></i>选择关单',
			url : "../../../pages/tuishui/pici/choose.html"
		});
		processEvent(e);
	});

    $("#submitsbbtn").on("click",function (e) {
        var sbpc = $("#sbsbpc").val();
        var sbzt = $("#sbsbzt").val();
        var sbrq = null;
        if(sbzt == "1"){
            sbzt = "2";
        }else if(sbzt == "2"){
            sbzt = "3";
            sbrq = $("#sbrq").val();
        }
        $.ajax({
            url : "../../../../sbpc/submitSBPC",
            method : "post",
            data : {
                "sbpc":sbpc,
                "sbzt":sbzt,
                "sbrq":sbrq
            },
            dataType : "json",
            success : function (result) {
                if(result.success){
                    $table.bootstrapTable("refresh",{pageNumber:1});
                    layer.msg("更新成功!");
                    layer.close(layerIndex);
                }else{
                    layer.msg("更新失败!")
                }
            }

        });
        processEvent(e);
    });
});

//表格中格式化code或label
function chooseFormatter(value, row, index){
	return '<a href="javascript:void(0);" title="'+value+'" key="'+(row[key?key:"id"])+'" class="text-info choose">' + value + '</a>';
}

//审核状态格式化
function examineStatusFormatter(value,row,index){
    var title = "",className = "";
    switch(value){
        case "1":
            title = "申报完成";
            className = "fa-check-circle-o text-success";
            break;
        case "2":
            title = "申报中";
            className = "fa-question-circle-o text-warning";
            break;
        default:
            title = "待申报";
            className = "fa-times-circle text-danger";
            break;
    }
    return '<i title="'+title+'" class="fa '+className+'"></i>';
}
