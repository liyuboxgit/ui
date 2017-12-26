$(function() {
    $("#snqyf").html(parent.params.ssq);
    $("#snqpc").html(parent.params.sbpch);
    $("#sbpcdl").val(parent.params.sbpcdl);
    var sbpc = $("#sbpc").val();
    chuColumns = [
        {
            align:'center',
            checkbox : true
        },{
            title : '代理底稿数据ID',
            align:'center',
            field : 'dldgsj',
            visible : false
        },{
            title : '委托纳税人识别号',
            field : 'wtnsrsbh'
        }, {
            title : '报关单号',
            field : 'gdh'
        }, {
            title : '出口商品代码',
            field : 'spdm'
        }, {
            title : '出口商品名称',
            field : 'spmc',
            visible : false
        }, {
            title : '计量单位',
            field : 'jldw',
            visible : false
        }, {
            title : '美元离岸价',
            field : 'mylzj'
        }, {
            title : '发票号码',
            field : 'fpzyhm'
        }, {
            title : '开票日期',
            field : 'kprq'
        },  {
            title : '操作',
            field : '',
            formatter : examineStatuFormatter
        }],

    $.ajax({
        url:"../../../../sbpcdl/findDldgDataList",
        type : "post",
        data : {"sbpc":parent.params.sbpcdl},
        dataType:'json',
        success: function(data){
            queryData({
                $container : $("#table"),
                columns : chuColumns,
                data : {data:{thisPageElements:data.data}}
            });
        }
    });
    $("#ckBtn").on("click",function(){
        var selectRows = $("#table").bootstrapTable('getSelections');
        if(selectRows.length===1){
            layer.open({
                type : 2,
                skin : 'myLayui', // 样式类名
                title : '<i class="glyphicon glyphicon-plus" style="padding-right:3px;font-size:12px;"></i>编辑',
                area : ["98%","96%"],
                content : "../../../pages/tuishui/picidl/edit.html?tempTime="+new Date().getTime(),
                success : function(layero, index) {
                    var currentFrame = layero.find("iframe")[0].contentWindow.document;
                    $.ajax({
                        url:'../../../../sbpcdl/findDldgDataDetail',
                        type:'GET',
                        dataType:'json',
                        data:{
                            "uuid":selectRows[0].dldgsj,
                        },
                        success:function(result){
                            setFormData('addInfoForm',currentFrame,result.data)
                        },
                        error: function(XMLHttpRequest, textStatus, errorThrown) {
                            alert(XMLHttpRequest.status);
                            alert(XMLHttpRequest.readyState);
                            alert(textStatus);
                        }
                    })
                }
            });
        }else{
            layer.msg("请选择一条数据进行编辑!");
        }
    })
    function examineStatuFormatter(value,row,index){
        return '<a class="chakan" onclick="lookchuk(\''+row.wmsbck+'\')">查看</a>';
    }
});

function lookchuk(wmsbck) {
    openLayer({
        ele:this,
        title : '<i class="glyphicon glyphicon-plus" style="padding-right:3px;font-size:12px;"></i>出口明细详情',
        area : ["95%","95%"],
        url : "../../../pages/tuishui/picidl2/dlsj_detail.html"
    });
}