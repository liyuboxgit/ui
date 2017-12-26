var key = "sbpc";

//表格标题项
var columns = [
    {
        align:'center',
        checkbox : true
    },
    {
        title : '申报id',
        align:'center',
        field : 'sbpcdl',
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
    }, {
        title : '所属期',
        align:'center',
        field:'ssq'
    },
    {
        title : '申报批次',
        align:'center',
        field : 'sbpch',
        formatter : lookInfoFormatter
    },
    {
        title : '起始关联号',
        align:'center',
        field : 'qsglh',
        align : 'center',
    },
    {
        title : '申报日期',
        align:'center',
        field : 'sbrq',
        align : 'center',
    },
    {
        title : '业务类型',
        align:'center',
        field : 'ywlx',
        align : 'center',
    },
    {
        title : '创建人',
        align:'center',
        field : 'createName'
    },
    {
        title : '创建时间',
        align:'center',
        field : 'createTime',
        align : 'center',
    },
    {
        title : '申报状态',
        align:'center',
        field : 'sbzt',
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
                type : "monthday",
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
                    {text : "请选择", value : ''},
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
    $("#thSearchBtn").on("click",function(){
        queryData("../../../../sbpcdl/findPage");
    }).trigger("click");

    /**
     * 提交申报
     */
    var layerIndex = null;
    $("#tjshenbao").on("click",function () {
        var selectRows = $table.bootstrapTable('getSelections');
        if (selectRows.length === 1) {
            var sbpcdl = selectRows[0].sbpcdl;
            var sbzt = selectRows[0].sbzt;
            if (sbzt == 2) {
                layer.msg("此批次已经申报");
                return;
            }
            if(sbzt == 1){
                layer.msg("此批次已经完成申报");
                return;
            }
            if(sbzt == '0'){
                sbzt = '2';
            }
            layer.confirm('确定要提交吗?', {
                btn: ['确定'] //按钮
            }, function(){
                $.ajax({
                    url : '../../../../sbpcdl/submitSBPC',
                    method : "post",
                    data : {
                        "sbpcdl":sbpcdl,
                        "sbzt":sbzt,
                    },
                    dataType : "json",
                    success : function (result) {
                        if(result.success){
                            $table.bootstrapTable("refresh",{pageNumber:1});
                            layer.msg('更新成功!');
                            layer.close(layerIndex);
                        }else{
                            layer.msg('更新失败!')
                        }
                    }

                });
            });
        }else{
            layer.msg("请选择一条数据进行申报!");
        }

    });

    /**
     * 完成申报
     */
    var layerIndex = null;
    $("#wcshenbao").on("click",function () {
        var selectRows = $table.bootstrapTable('getSelections');
        if (selectRows.length === 1) {
            var sbzt = selectRows[0].sbzt;
            var sbpcdl = selectRows[0].sbpcdl;
            if (sbzt == 0) {
                layer.msg("此批次未进行申报，请先申报");
                return;
            }
            if(sbzt == 1){
                layer.msg("此批次已经完成申报");
                return;
            }
           layerIndex = layer.open({
             type: 1,
             title : '完成申报',
             area: ['40%', '20%'], //宽高
             content: $('#shenbao_date')
             });
        }else{
            layer.msg("请选择一条数据进行完成申报!");
        }
    });
    $("#submitsbbtn").on("click",function () {
        debugger
        if($("#wcsbrq").val()==""||$("#wcsbrq").val()==null){
            layer.msg("请选择完成申报日期!");
            return;
        }
        debugger
        var wcsbrq= $("#wcsbrq").val();
        var selectRows = $table.bootstrapTable('getSelections');
            var sbpcdl = selectRows[0].sbpcdl;
            var sbzt ='1';
            $.ajax({
                url : '../../../../sbpcdl/submitSBPC',
                method : "post",
                data : {
                    "sbpcdl":sbpcdl,
                    "sbzt":sbzt,
                    "sbrq":wcsbrq
                },
                dataType : "json",
                success : function (result) {
                    if(result.success){
                        $table.bootstrapTable("refresh",{pageNumber:1});
                        layer.msg('更新成功!');
                        layer.close(layerIndex);
                    }else{
                        layer.msg('更新失败!')
                    }
                }
            })
    });

    //添加
    $("#add").on("click", function(){
        openLayer({
            ele:this,
            title : '<i class="glyphicon glyphicon-plus" style="padding-right:3px;font-size:12px;"></i>生成批次',
            area : ["98%","96%"],
            url : "../../../pages/tuishui/picidl2/dl_add.html"
        });
    });

    //删除批次
    $("#delete").on("click", function(){
        var selectRows = $table.bootstrapTable('getSelections');
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
                layer.confirm('确定要删除选中的批次吗？', {
                    btn: ['确定','取消'] //按钮
                }, function(){
                    $.ajax({
                        url : '../../../../sbpcdl/deleteSbPc',
                        type : 'post',
                        data : {'sbpcdl':selectRows[0].sbpcdl},
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
                layer.msg("申报状态错误！");
            }

        }else{
            layer.msg("请选择一条批次进行删除");
        }

    });

    //查看详情
    $(document).on("click",".lookInfo", function(){
        var title = popupPreHandler(this,3);
        openLayer({
            ele:this,
            //id : $(this).attr("key"),
            area : ['100%','100%'],
            title : '<i class="glyphicon glyphicon-file" style="padding-right:3px;font-size:12px;"></i>',
            url : "../../../pages/tuishui/picidl2/dlpc_detail.html"
        });
    });
});
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




