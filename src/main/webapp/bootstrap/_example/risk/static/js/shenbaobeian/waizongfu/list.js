var key = "zfba";
var layerIndex;
var zfba;
//表格标题项
var columns = [ 
	{
		align:'center',
		checkbox : true
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
		field : 'zfba',
	},
	{
		title : '底稿日期',
		align:'center',
		field : 'createTime',
	},
	{
		title : '备案状态',
		align:'center',
		field : 'bazt',
		formatter : $thisExamineStatusFormatter
	},
	{
		title : '备案企业数量',
		field : 'sl',
		align : 'center',
        formatter:lookInfoFormatter
	},
	{
		title : '查看',
		field : 'view',
		align : 'center',
		formatter: viewDetail
	}
];

function $thisExamineStatusFormatter(value,row,index){
	var title = "",className = "";
	switch(value){
		case "1":
			title = "备案中";
			className = "fa-question-circle-o text-warning beia";
			break;
		case "2":
			title = "已备案";
			className = "fa-check-circle-o text-success beia";
			break;
		default:
			title = "待备案";
			className = "fa-times-circle text-danger beia";
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
                col : "barq",
                label : "外综服备案日期范围",
                type : "startEndDate",
                dates  : [
                    {name : "zfbaTimeStart", text : "开始日期"},
                    {name : "zfbaTimeEnd", text : "结束日期"}
                ]
            },
			{
				col : "bazt",
				label : "备案状态",
				type : "select",
				options  : [
                    {text : "请选择", value : ""},
					{text : "待备案", value : "0"},
					{text : "备案中", value : "1"},
					{text : "已备案", value : "2"}
				]
			}
		]
	},"query");
	
	setselect2("select[name='bazt']");
	
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
		queryData("../../../../shenBaoBeiAn/findZfPageByCondition");
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
        var selectRows = $table.bootstrapTable('getSelections');
        console.info(selectRows);
        var selectKey = selectRows.map(function(item) {
            return item.zfba;
        });
        if (selectRows.length === 1) {
            window.open("../../../../shenBaoBeiAn/zfbeianbiao?zfba="+selectKey+"&balx=wzf");
        }else {
            layer.msg("请选择一条数据进行预览!");
        }
	});

	//新建备案
	$(document).on("click","#add", function(){
		openLayer({
			ele:this,
			id : $(this).attr("key"),
			area : ["95%","95%"],
			title : '<i class="glyphicon glyphicon-file" style="padding-right:3px;font-size:12px;"></i>新建备案',
			url : "../../../pages/shenbaobeian/waizongfu/add.html"
		});
	});
	
    //删除
    $("#delete").on("click", function(){
        var selectRows = $table.bootstrapTable('getSelections');
        if (selectRows.length === 1) {
            var bazt = selectRows[0].bazt;
            if (bazt != "0") {
                layer.msg("此批次正在备案中或者已完成备案，不可删除");
                return;
            }
            if(bazt == "0"){
                layer.confirm('确定要删除选中的备案吗？', {
                    btn: ['确定','取消'] //按钮
                }, function(){
                    $.ajax({
                        url : '../../../../shenBaoBeiAn/deleteZfba',
                        type : 'post',
                        data : {'zfba':selectRows[0].zfba},
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
            }
        }else{
            layer.msg("请选择一条备案进行删除");
        }
    });
	

     //提交备案
	$("#tjbeian").on("click",function () {
        var selectRows = $table.bootstrapTable('getSelections');
        if (selectRows.length === 1) {
            var bazt = selectRows[0].bazt;
            if (bazt == '1') {
                layer.msg("已经备案");
                return;
            }
            if(bazt == '2'){
                layer.msg("已经完成备案");
                return;
			}
            layer.confirm('确定要提交吗？', {
                btn: ['确定','取消'] //按钮
            }, function(){
                $.ajax({
                    url : '../../../../shenBaoBeiAn/commitZfba',
                    type : 'post',
                    data : {'zfba':selectRows[0].zfba},
                    success : function (result) {
                        if(result.success){
                            $table.bootstrapTable("refresh",{pageNumber:1});
                            layer.msg('提交成功');
                        }else{
                            layer.msg('提交失败');
                        }
                    }
                })
            }, function(){
            });
        }else{
            layer.msg("请选择一条数据进行提交!");
		}
    });
	
     //完成备案
    $("#wcbeian").on("click",function () {
        var selectRows = $table.bootstrapTable('getSelections');
        if (selectRows.length === 1) {
            var bazt = selectRows[0].bazt;
            zfba = selectRows[0].zfba;
            if (bazt == "0") {
                layer.msg("此批次未提交备案，请先备案");
                return;
            }
            if(bazt == "2"){
                layer.msg("此批次已经完成备案");
                return;
            }
            layerIndex = layer.open({
                type: 1,
                title: '完成备案',
                area: ['40%', '20%'], //宽高
                content: $('#beian_date'),
                success: function () {

                }
            })
            /*layer.confirm('确定要完成该备案吗？', {
                btn: ['确定','取消'] //按钮
            }, function(){
                $.ajax({
                    url : '../../../../shenBaoBeiAn/finishZfba',
                    type : 'post',
                    data : {'zfba':selectRows[0].zfba},
                    success : function (result) {
                        if(result.success){
                            $table.bootstrapTable("refresh",{pageNumber:1});
                            layer.msg('操作成功');
                        }else{
                            layer.msg('操作失败');
                        }
                    }
                })
            }, function(){
            });*/
        }else{
            layer.msg("请选择一条数据进行操作!");
        }
    });

    //查看明细
    $(document).on("click", ".lookInfo", function() {
        openLayer({
            ele:this,
            id : $(this).attr("key"),
            title : '<i class="glyphicon glyphicon-file" style="padding-right:3px;font-size:12px;"></i>备案历史明细【备案编码：<font color="red">'+params.zfba+'</font>】',
            url : "../../../pages/shenbaobeian/waizongfu/zfbamx_list.html"
        });
    });


    $("#submitbabtn").click(function (e) {
        var barq = $("#barq").val();
        console.log(barq);

        $.ajax({
            url : '../../../../shenBaoBeiAn/finishZfba',
            type : 'post',
            data : {
                'zfba':zfba,
                'barq':barq,
            },
            success : function (result) {
                debugger;
                if(result.success){
                    layer.close(layerIndex);
                    $table.bootstrapTable("refresh",{pageNumber:1});
                    layer.msg('操作成功');
                }else{
                    layer.msg('操作失败');
                }
            }
        })
    })
});