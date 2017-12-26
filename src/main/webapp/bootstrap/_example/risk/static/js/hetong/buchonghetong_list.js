var key = 'bcht';
var cght = "";
var examineStatus = "";
var url ="";
var oldContractCode = "";
//表格标题项
var columns = [
    {
        align:'center',
        checkbox : true
    },
    {
        title : '补充合同ID',
        align:'center',
        field : 'bcht',
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
        field : 'htbh',
        formatter : lookInfoFormatter
    },
    {
        title : '合同名称',
        align:'left',
        field : 'htmc',
        formatter : labelTrimFormatter
    },
    {
        title : '委托方名称',
        align:'left',
        field : 'wtfmc',
        formatter : labelTrimFormatter
    },
    {
        title : '生效日期',
        align:'center',
        field : 'startTime',
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
        formatter :function (value,row,index){
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
            return '<a href="javascript:;"><span onclick="bchtshenhe(\''+row.bcht+'\',\''+row.htmc+'\',\''+row.examineStatus+'\')"><i title="'+title+'" class="fa '+className+'"></i></span></a>';
        }
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
                col : "htbh",
                type : "text",
                label : "合同编号"
            },
            {
                col : "htmc",
                type : "text",
                label : "合同名称"
            },
            {
                col : "wtfmc",
                type : "text",
                label : "委托方名称"
            },
            {
                col : "signDate",
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
            {id: "import", content: "导入",className : "glyphicon glyphicon-import"},
            {id: "add", content: "添加",className : "glyphicon glyphicon-plus"},
            {id: "update", content: "修改",className : "glyphicon glyphicon-pencil"}
        ]
    });

    //查询
    $("#thSearchBtn").bind("click",function(){
        //debugger
        queryData("../../../../buchonght/findPageByCondition");
    }).trigger("click");

    //添加
    $(document).on("click", "#add", function() {
        oldContractCode = "";
        flag = false;
        openLayer({
            ele:this,
            title : '<i class="glyphicon glyphicon-plus" style="padding-right:3px;font-size:12px;"></i>添加补充合同',
            url : "../../../pages/hetong/buchonghetong/bchtadd.html"
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
            oldContractCode = selectRows[0].htbh;
            layer.open({
                type : 2,
                skin : 'myLayui', // 样式类名
                title : '<i class="glyphicon glyphicon-pencil" style="padding-right:3px;font-size:12px;"></i>修改补充合同信息【合同名称：<font color="red">'+selectRows[0].htmc+'</font>】',
                area : [ "98%", "96%" ],
                content : "../../../pages/hetong/buchonghetong/bchtadd.html?editflag=edit&tempTime="+new Date().getTime(),
                /*success : function(layero, index) {
                    var currentFrame = layero.find("iframe")[0].contentWindow.document;
                    $.ajax({
                        url:'../../../../buchonght/selectByPrimaryKey',
                        type:'POST',
                        dataType:'json',
                        contentType:"application/x-www-form-urlencoded; charset=UTF-8",
                        data:{
                            "bcht":selectRows[0].bcht
                        },
                        success:function(result){
                            //$("#addInfoForm input[name='cght']",currentFrame).val(selectRows[0].uuid);
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
            title : '<i class="glyphicon glyphicon-pencil" style="padding-right:3px;font-size:12px;"></i>修改补充合同信息【合同名称：<font color="red">'+params.htmc+'</font>】',
            area : [ "98%", "96%" ],
            content : "../../../pages/hetong/buchonghetong/bchtadd.html?editflag=detail&tempTime="+new Date().getTime(),
            /*success : function(layero, index) {
                var currentFrame = layero.find("iframe")[0].contentWindow.document;
                $.ajax({
                    url:'../../../../buchonght/selectByPrimaryKey',
                    type:'POST',
                    dataType:'json',
                    contentType:"application/x-www-form-urlencoded; charset=UTF-8",
                    data:{
                        "bcht":params.bcht
                    },
                    success:function(result){
                        //$("#addInfoForm input[name='cght']",currentFrame).val(selectRows[0].uuid);
                        setFormData('addInfoForm',currentFrame,result.data)
                    }
                })
            }*/
        });
    });

    //导入
    $(document).on('click', '#import', function() {
        url="../../../../buchonght/bchtfileUpload";
        openLayer({ele:this,title:'<i class="glyphicon glyphicon-import" style="padding-right:3px;font-size:12px;"></i>导入文件',area:[ "60%", "60%" ],url:"../../../pages/hetong/buchonghetong/import.html"});
    });
    //查看货物清单
    $(document).on('click', '.searchBtn', function() {
        var title = popupPreHandler(this,3);
        openLayer({
            ele:this,
            id : $(this).attr("key"),
            title : '货物清单【合同名称：<font color="red">'+title+'</font>】',
            url : "../../hetong/buchonghetong/bchtgoods.html"
        });
    });
    //查看关联信息
    $(document).on('click', '.glBtn', function(e){
        var title = popupPreHandler(this,3);
        openLayer({ele:this,id: $(this).attr("key"), area : [ "98%", "96%" ],title:'<i class="glyphicon glyphicon-random" style="padding-right:3px;font-size:12px;"></i>关联信息【补充合同名称：<font color="red">'+title+'</font>】',url:"../../../pages/hetong/buchonghetong/bcht_guanlian.html"});
    });
});
// 审核
var bchtshenhe=function (bcht,htmc,examineStatus){
    openLayer({
        id : bcht,
        ele:this,

        title : '<i class="glyphicon glyphicon-plus" style="padding-right:3px;font-size:12px;"></i>补充合同审核【合同名称：<font color="red">'+htmc+'</font>】',
        area :  [ "60%", "90%" ],
        url : "../../../pages/hetong/buchonghetong/bchtshenhe.html?examineStatus="+examineStatus+"&bcht="+bcht
    });
}
