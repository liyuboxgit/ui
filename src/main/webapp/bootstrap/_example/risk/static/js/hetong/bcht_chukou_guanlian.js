$(function(){
    //初始化查询
    formGenerator({
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
    //查询
    $("#thSearchBtn").on("click",function(){
        var htbh = $("input[name='htbh']:eq(0)").val();
        var htmc = $("input[name='htmc']:eq(0)").val();
        var signDateStart = $("input[name='signDateStart']:eq(0)").val();
        var signDateEnd = $("input[name='signDateEnd']:eq(0)").val();
        //查询可关联的出口合同
        $.ajax({
            url : "../../../../buchonght/querybchtWckht",
            data : {
                "bcht":parent.params.bcht,
                "htbh":htbh,
                "htmc":htmc,
                "signDateStart":signDateStart,
                "signDateEnd":signDateEnd
            },
            type : "post",
            dataType : "json",
            success : function(res){
                queryData({data:{success:true,data:{thisPageElements:res}},$container:$ktjChukoutable,queryParams:{},columns:ktj_columns,height:300});
                parent.refreshTable();
            }
        });

        //初始化已关联的出口合同
        $.ajax({
            url : "../../../../buchonght/querybchtYckht",
            data : {"bcht":parent.params.bcht},
            type : "post",
            dataType : "json",
            success : function(res){
                queryData({data:{success:true,data:{thisPageElements:res}},$container:$glchukougouTable,queryParams:{},columns:yy_columns,height:300});
                parent.refreshTable();
            }
        });
    });
    var $ktjChukoutable = $("#ktjChukoutable");
    var $glchukougouTable = $("#glchukougouTable");
    var ktj_columns = [
        {
            checkbox : true
        },
        {
            title : '合同编号',
            field : 'contractCode'
        },
        {
            title : '合同名称',
            field : 'contractName'
        },
        {
            title : '出口合同id',
            field : 'ckht',
            visible : false
        }
    ];
    //已有的出口合同的列
    var yy_columns = [
        {
            checkbox : true
        },
        {
            title : '合同编号',
            field : 'contractCode'
        },
        {
            title : '合同名称',
            field : 'contractName'
        },
        {
            title : '出口合同id',
            field : 'ckht',
            visible : false
        }
    ];
    //查询可关联的出口合同
    $.ajax({
        url : "../../../../buchonght/querybchtWckht",
        data : {"bcht":parent.params.bcht},
        type : "post",
        dataType : "json",
        success : function(res){
            queryData({data:{success:true,data:{thisPageElements:res}},$container:$ktjChukoutable,queryParams:{},columns:ktj_columns,height:300});
        }
    });
    //初始化已关联的出口合同
    $.ajax({
        url : "../../../../buchonght/querybchtYckht",
        data : {"bcht":parent.params.bcht},
        type : "post",
        dataType : "json",
        success : function(res){
            queryData({data:{success:true,data:{thisPageElements:res}},$container:$glchukougouTable,queryParams:{},columns:yy_columns,height:300});
        }
    });
    //关联
    $("#concatOne").on('click',function(){
        handlerCancat($ktjChukoutable, $glchukougouTable);
    });
    //移除关联
    $("#removeConcat").on('click',function(){
        handlerCancat($glchukougouTable,$ktjChukoutable);
    });

    //关联全部
    $("#concatAll").on('click',function(){
        handlerCancat($ktjChukoutable, $glchukougouTable,true);
    });
    //移除全部关联
    $("#removeConcatAll").on('click',function(){
        handlerCancat($glchukougouTable,$ktjChukoutable,true);
    });


    //处理关联
    function handlerCancat(ele,target,isAll){
        if(isAll){
            ele.bootstrapTable('checkAll');
            var allSRows = ele.bootstrapTable('getAllSelections');
            target.bootstrapTable('append', allSRows);
            ele.bootstrapTable('removeAll');
        }else{
            var selectRows =  ele.bootstrapTable('getSelections');
            target.bootstrapTable('append', selectRows);
            selectRows = selectRows.map(function(item) {
                return item.ckht;
            });
            ele.bootstrapTable('remove', {
                field : 'ckht',
                values : selectRows
            });
        }
    }


    //点击确定
    $("#guablianSubBtn").on('click',function(){
        //更新关联状态
        $.ajax({
            url : "../../../../buchonght/saveBuChongHtGX",
            contenType:'application/json',
            type : "POST",
            data : getGlCaiGouIds(),
            success : function (result) {
                if(result.success){
                    layer.msg("更新成功");
                    parent.refreshTable(); //刷新页面
                }else{
                    layer.msg("更新失败");
                }
            },
        });
    });

    //获取右侧关联合同号的编号数组
    function getGlCaiGouIds(){
        return {
            bcht : parent.params.bcht,
            ckhtRows : $glchukougouTable.bootstrapTable('getData').map(function(item){return item.ckht;}).join(",")

        }
    }


});