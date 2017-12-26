
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
        title : '汇率ID',
        align:'center',
        field : 'exrateId',
        visible : false
    },
    {
        title : '汇率日期',
        align:'center',
        field : 'exrateDate'
    },
    {
        title : '汇率值',
        align:'center',
        field : 'exrateHy'
    },{
        title : '汇率对象',
        align:'center',
        field : 'exrateObject'
    }
];

$(function(){
    //初始化查询
    formGenerator({
        container :  "advSearchBox",
        columns : [
            {
                col : "signTime",
                label : "汇率日期",
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
            {id: "add", content: "添加",className : "glyphicon glyphicon-plus"},
            {id: "update", content: "修改",className : "glyphicon glyphicon-pencil"}
        ]
    });

    //查询
    $("#thSearchBtn").on("click",function(){
        queryData("../../../xthl/findPageByCondition");
    }).trigger("click");


    //添加
    $("#add").on("click", function(){
        openLayer({
            area : [ "40%", "50%" ],
            ele:this,
            title : '<i class="glyphicon glyphicon-plus" style="padding-right:3px;font-size:12px;"></i>新增信息',
            url : "../../pages/XiTongHuiLv/Xthl_add.html"
        });
    });

    //修改
    $("#update").on("click",function(){
        var selectRows = $table.bootstrapTable('getSelections');
        if (selectRows.length === 1) {
            layer.open({
                type : 2,
                skin : 'myLayui', // 样式类名
                title : '<i class="glyphicon glyphicon-pencil" style="padding-right:3px;font-size:12px;"></i>修改信息',
                area : [ "40%", "50%" ],
                content : "../../pages/XiTongHuiLv/Xthl_add.html?tempTime="+new Date().getTime(),
                success : function(layero, index) {
                    var currentFrame = layero.find("iframe")[0].contentWindow.document;
                    $.ajax({
                        url:'../../../xthl/selectByPrimaryKey',
                        type:'POST',
                        dataType:'json',
                        data:{
                            "exrateId":selectRows[0].exrateId
                        },
                        success:function(result){
                            setFormData('addInfoForm',currentFrame,result.data)
                        }
                    })
                }
            });
        } else {
            layer.msg("请选择一条数据进行编辑!");
        }
    });
});
