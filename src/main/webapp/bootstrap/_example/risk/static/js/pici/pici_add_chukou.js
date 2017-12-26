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
				col : "glh",
				label : "关联号",
				type : "text",
				readonly : true
			},
			{
				col : "jldjh",
				label : "进料登记册号",
				type : "text"
			},
			{
				col : "ckfph",
				label : "出口发票号码",
				type : "text",
				readonly : true
			},
			{
				col : "ckrq",
				label : "出口日期",
				type : "text",
				readonly : true
			},
			{
				col : "fob",
				label : "美元离岸价",
				type : "text",
				readonly : true
			},
			{
				col : "ckhl",
				label : "美元汇率",
				type : "text",
				readonly : true
			},
			{
				col : "hxdh",
				label : "核销单号",
				type : "text"
			},
			{
				col : "gdh",
				label : "单据编号",
				type : "text",
				readonly : true
			},
			{
				col : "spxh",
				label : "项号",
				type : "text",
				readonly : true
			},
			{
				col : "spdm",
				label : "商品代码",
				readonly : true
			},
			{
				col : "cksl",
				label : "出口数量",
				type : "text",
				validate : {number:true, max:1.5}
			},
			{
				col : "ywdm",
				label : "业务类型",
				options : getDicts("serviceType"),
				readonly : true
			},
			{
				col : "yqbnshzm",
				label : "远期收汇证明",
				type : "text"
			},
			{
				col : "bz",
				label : "备注",
				type : "textarea"
			},
			{
				col : "wmsbck",
				label : "id",
				type : "text",
				display :false
			}
		]
	};

	// 基本信息添加到页面
	formGenerator(config);
	// 验证表单
	registerValidate("addInfoForm", config);
	/*
	$.ajax({
        url:"../../../../sbpc/findCkDetail",
        type:"GET",
        dataType:"json",
        data:{
        	"uuid":parentTabWindow.params.wmsbck
        },
        success:function(result){
           setFormData("addInfoForm",document,result.data);
           //$("#ckslBak",currentFrame).val(selectRows[0].cksl);
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
        	 alert(XMLHttpRequest.status);
        	 alert(XMLHttpRequest.readyState);
        	 alert(textStatus);
        }
    });
    */
	
	
	// 保存点击事件
	$("#save").on("click", function(e) {
		var data = $("#addInfoForm").serialize();
		$.ajax({
			url : "../../../../sbpc/saveWMCKSB",
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
	
	$("#info :input[name='cksl']").on("blur",function(e){
		if($(this).val()>parentTabWindow.params.cksl){
			layer.msg("出口数量不能大于"+parentTabWindow.params.cksl);
			return;
		}
		var value = ((parentTabWindow.params.fob/parentTabWindow.params.cksl)*$(this).val()).myToFixed(4) || 0;
		$("#info :input[name='fob']").val(value);
		processEvent(e);
	});
});