$(function() {
    //console.log(parent.params);
    // 基本信息
    var valueumns = [ {
        value : "sbny",
        name : "申报年月",
        type : "text",
        readonly : true
    }, {
        value : "sbpch",
        name : "申报批次",
        type : "text",
        readonly : true
    }, {
        value : "xh",
        name : "关联号",
        type : "text",
        readonly : true
    }, {
        value : "wtnsrsbh",
        name : "委托纳税人识别号",
        type : "text"
    }, {
        value : "gdh",
        name : "出口报关单号",
        type : "text",
        readonly : true
    }, {
        value : "ckrq",
        name : "美元离岸价",
        type : "date"
    }, {
        value : "spdm",
        name : "出口商品代码",
        type : "text"
    }, {
        value : "cksl",
        name : "出口数量",
        type : "text"
    }, {
        value : "mylzj",
        name : "美元离岸价",
        type : "text"
    }, {
        value : "fpzyhm",
        name : "专用发票号码",
        type : "text"
    }, {
        value : "kprq",
        name : "开票日期",
        type : "date"
    }, {
        value : "jdje",
        name : "计税金额",
        type : "text"
    }, {
        value : "ywlxdm",
        name : "业务类型代码",
        type : "text"
    }, {
        value : "beizhu",
        name : "备注"
    }
    ]

    // 基本信息添加到页面
    initDetailInfo({
        id: "info",
        elems:valueumns
    });
    $.ajax({
        url:'../../../../sbpcdl/findDldgDataDetail',
        type:'GET',
        dataType:'json',
        data:{
            "uuid":parent.params.dldgsj,
        },
        success : function(result){
            $.each(result.data,function(k,v){
                $('#'+k).html(v);
            });
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert(XMLHttpRequest.status);
            alert(XMLHttpRequest.readyState);
            alert(textStatus);
        }
    })
});
