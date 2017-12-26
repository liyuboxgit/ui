var key = "ckht";

var ckht = "";
var examineStatus = "";
var url="";
var oldContractCode = "";
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
            var page = $table.bootstrapTable("getPage");
            var pageSize = page.pageSize,pageNumber = page.pageNumber;
            return page.pageSize*(page.pageNumber-1)+index+1;
        }
    },
    {
        title : '服务合同ID',
        align:'center',
        field : 'fwht',
        visible : false
    },
    {
        title : '合同编号',
        align:'center',
        field : 'htbh',
        formatter : lookInfoFormatter
    },
    {
        title : '合同名称',
        align:'center',
        field : 'htmc',
        align : 'left',
        formatter : labelTrimFormatter
    },{
        title : '委托方名称',
        align:'center',
        field : 'wtfmc',
        align : 'left',
        formatter : labelTrimFormatter
    },{
        title : '服务开始日期',
        align:'center',
        field : 'startTime'
    },{
        title : '服务截止日期',
        align:'center',
        field : 'endTime'
    },
    {
        title : '签订日期',
        align:'center',
        field : 'signTime'
    },
    {
        title : '审核状态',
        field : 'examineStatus',
        align : 'center',
        formatter : function(value,row,index){
            var title = "",className = "";
            switch(value){
                case "1":
                    title = "审核不通过";
                    className = "fa-times-circle text-danger";
                    break;
                case "2":
                    title = "审核通过";
                    className = "fa-check-circle-o text-success";
                    break;
                default:
                    title = "待审核";
                    className = "fa-question-circle-o text-warning";
                    break;
            }
            return '<a href="javascript:;"><span onclick="fwshenhe(\''+row.fwht+'\',\''+row.examineStatus+'\',\''+row.htmc+'\')"><i title="'+title+'" class="fa '+className+'"></i></span></a>';
        }
    }
];

$(function(){
    //初始化查询
    formGenerator({
        container :  "advSearchBox",
        columns : [
            {
                col : "htbh",
                type : "text",
                label : "合同编号"
            }, {
                col : "htmc",
                type : "text",
                label : "合同名称"
            }, {
                col : "wtfmc",
                type : "text",
                label : "委托方名称"
            },
            {
                col : "signTime",
                label : "签订日期起止",
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
            {id: "import", content: "导入",className : "glyphicon glyphicon-import"},
            {id: "add", content: "添加",className : "glyphicon glyphicon-plus"},
            {id: "update", content: "修改",className : "glyphicon glyphicon-pencil"}
        ]
    });
    //查询
    $("#thSearchBtn").on("click",function(){
        queryData("../../../fuwuhetong/findPageByCondition");
    }).trigger("click");


    //导入
    //导入
    $("#import").on("click", function(){
        url="../../../fuwuhetong/FwhtfileUpload";
        openLayer({ele:this,title:'<i class="glyphicon glyphicon-import" style="padding-right:3px;font-size:12px;"></i>导入文件',area:[ "60%", "60%" ],url:"../../pages/fuwuhetong/fwhtExcel.html"});
    });

    //添加
    $("#add").on("click", function(){
        oldContractCode = "";
        openLayer({
            ele:this,
            title : '<i class="glyphicon glyphicon-plus" style="padding-right:3px;font-size:12px;"></i>添加合同',
            url : "../../pages/fuwuhetong/add.html"
        });
    });

    //修改
    $("#update").on("click",function(){
        var selectRows = $table.bootstrapTable('getSelections');
        var selectRowsd = $table.bootstrapTable('getSelections');
        if (selectRows.length === 1) {
        	params = selectRows[0];
            selectRows = selectRows.map(function(item) {
                return item.examineStatus;
            });
            if(selectRows.indexOf("2")>=0){
                layer.msg("选中的合同审核已通过，不可修改!");
                return;
            }
            var selectRows = $table.bootstrapTable('getSelections');
            oldContractCode = selectRows[0].htbh;
            layer.open({
                type : 2,
                skin : 'myLayui', // 样式类名
                title : '<i class="glyphicon glyphicon-pencil" style="padding-right:3px;font-size:12px;"></i>修改合同【合同名称：<font color="red">'+selectRows[0].htmc+'</font>】',
                area : [ "98%", "96%" ],
                content : "../../pages/fuwuhetong/add.html?editflag=edit&tempTime="+new Date().getTime(),
                /*success : function(layero, index) {
                    var currentFrame = layero.find("iframe")[0].contentWindow.document;
                    $.ajax({
                        url:'../../../fuwuhetong/selectByPrimaryKey',
                        type:'POST',
                        dataType:'json',
                        data:{
                            "fwht":selectRows[0].fwht
                        },
                        success:function(result){
                            //$("#addInfoForm input[name='ckht']",currentFrame).val(selectRows[0].uuid);
                            setFormData('addInfoForm',currentFrame,result.data)
                        }
                    })
                }*/
            });
        } else {
            layer.msg("请选择一条数据进行编辑!");
        }
    });

    //查看详情
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
// 审核
var fwshenhe=function(fwht,examineStatus,htmc){
    openLayer({
        id :fwht,
        ele:this,

        title : '<i class="glyphicon glyphicon-plus" style="padding-right:3px;font-size:12px;"></i>合同审核【合同名称：<font color="red">'+htmc+'</font>】',
        area :  [ "60%", "90%" ],
        url : "../../pages/fuwuhetong/fuwushenhe.html?examineStatus="+examineStatus+"&fwht="+fwht
    });
};