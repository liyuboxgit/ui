$(function() {
    //console.log(parent.params);
    // 基本信息
    var config = {
        container : "info",
        columns : [ {
            col : "dldgsj",
            label : "uuid",
            type : "text",
            display : false
        }, {
            col : "sbny",
            label : "申报年月",
            type : "text",
            readonly : true
        }, {
            col : "sbpch",
            label : "申报批次",
            type : "text",
            readonly : true
        }, {
            col : "xh",
            label : "序号",
            type : "text",
            readonly : true
        }, {
            col : "wtnsrsbh",
            label : "委托纳税人识别号",
            type : "text"
        }, {
            col : "gdh",
            label : "出口报关单号",
            type : "text",
            readonly : true
        }, {
            col : "ckrq",
            label : "出口日期",
            type : "date"
        }, {
            col : "spdm",
            label : "出口商品代码",
            type : "text",
            validate : {
                required : true
            }
        }, {
            col : "cksl",
            label : "出口数量",
            type : "text"
        }, {
            col : "mylzj",
            label : "美元离岸价",
            validate : {
                required : true
            }
        }, {
            col : "fpzyhm",
            label : "专用发票号码",
            validate : {
                required : true
            }
        }, {
            col : "kprq",
            label : "开票日期",
            type : "date"
        }, {
            col : "jdje",
            label : "计税金额",
            type : "text",
            readonly : true
        }, {
            col : "ywlxdm",
            label : "业务类型代码",
            type : "text",
            options : getDicts("serviceType")
        }, {
            col : "beizhu",
            label : "备注"
        }]
    };

    // 基本信息添加到页面
    formGenerator(config);

    // 验证表单
    registerValidate("addInfoForm", config);

    // 保存点击事件
    $("#save").on("click", function() {
        var data = $("#addInfoForm").serialize();
        $.ajax({
            url : "../../../../sbpcdl/saveDldgData",
            type : "post",
            data : data,
            // contentType: 'application/json',
            dataType : "json",
            success : function(res) {
                if (res.success) {
                    layer.msg("保存成功!");
                } else {
                    layer.msg(res.msg);
                }
            }
        });
    });
});
