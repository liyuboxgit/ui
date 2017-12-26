$(function() {
	// 基本信息
	var config = {
		container : "info",
		columns : [ 
			{
				col : "sbny",
				label : "申报年月",
				type : "text",
				readonly : true
			},
			{
				col : "sbpch",
				label : "申报批次",
				type : "text",
				readonly : true
			},
			{
				col : "sz",
				label : "税种",
				readonly : true
			},
			{
				col : "glh",
				label : "关联号",
				type : "text",
				readonly : true
			},
			{
				col : "jhpzh",
				label : "进货凭证号",
				type : "text",
				readonly : true
			},
			{
				col : "xfnsrsbh",
				label : "供货方纳税号",
				type : "text",
				readonly : true
			},
			{
				col : "kprq",
				label : "发票开票日期",
				type : "text",
				readonly : true
			},
			{
				col : "spdm",
				label : "商品代码",
				type : "text",
				readonly : true
			},
			{
				col : "jsje",
				label : "计税金额",
				type : "text",
				readonly : true
			},
			{
				col : "zyfp",
				label : "专用税票号",
				type : "text",
				readonly : true
			},
			{
				col : "ywdm",
				label : "业务类型",
				readonly : true
			},
			{
				col : "bz",
				label : "备注",
				type : "textarea"
			},
			{
				col : "wmsbjh",
				label : "id",
				type : "text",
				display : false
			}
		]
	};
	formGenerator(config);//基本信息添加到页面
	registerValidate("addInfoForm", config);//验证表单
	
	$.ajax({
        url:"../../../../sbpc/findJhDetail",
        type:"GET",
        dataType:"json",
        data:{
        	"uuid":parentTabWindow.params.wmsbjh
        },
        success:function(result){
           setFormData("addInfoForm",document,result.data)
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
        	 alert(XMLHttpRequest.status);
        	 alert(XMLHttpRequest.readyState);
        	 alert(textStatus);
        }
    });

	// 保存点击事件
	$("#save").on("click", function(e) {
		var data = $("#addInfoForm").serialize();
		$.ajax({
			url : "../../../../sbpc/saveWMjHSB",
			type : "post",
			data : data,
			// contentType: "application/json",
			dataType : "json",
			success : function(res) {
				if (res.success) {
					layer.msg("保存成功!");
				} else {
					layer.msg(res.msg);
				}
				//parentTabWindow.layer.close(parentTabWindow.layer.getFrameIndex(window.name));
				finishCallback();
			}
		});
		processEvent(e);
	});
});
