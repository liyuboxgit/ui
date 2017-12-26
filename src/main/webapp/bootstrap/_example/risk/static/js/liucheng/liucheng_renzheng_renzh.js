//认证历史
/*var hisColumns = [
	{
		title : '序号',
		align:'center',
		formatter : function(value,row,index){ 
			return index+1;
		}
	},
	{
		title : '操作人',
		field : 'createName'
	}, 
	{
		title : '历史操作',
		field : 'examineStatus',
		formatter : lookInfoFormatter
	}, 
	{
		title : '操作时间',
		field : 'createTime'
	}, 
	{
		title : '说明',
		field : 'remarks'
	}
];*/
$(function(){
	//保存认证状态
	$(".renzhSave").on("click",function(){
		//获取用户选择的通过值
		var shStatusVal = $("input[name='shStatus']:checked").val();
		var ycfp = $(".renZhengForm textarea").val(); 
		if(shStatusVal==2){
			if(!ycfp){
				layer.msg("请在备注栏中填写认证不通过的备注信息!");
				return;
			}
		}

		var billingDate = $(":input[name='billingDate']").val();
		if(!billingDate){
			layer.msg("请填写开票日期!");
			return;
		}
        var certificationDate = $(":input[name='certificationDate']").val();
        if(!certificationDate){
            layer.msg("请填写认证日期!");
            return;
        }
        
        if(billingDate > certificationDate){
        	layer.msg("开票日期不能大于认证日期！");
        	return;
        }
        
		//layer.msg("修改失败！");
		var shStatus = $("input[name='shStatus']:checked").val();
	    $.ajax({
	        url : "../../../../renwu/updateRzztAndAbnormal",
	        contenType:'application/json',
	        type : "POST",
	        data : {
	            "uuid" : parent.params.fp,
	            "shStatus" : shStatus,
	            "billingDate" : billingDate,
	            "certificationDate" : certificationDate,
	            "ycfp":ycfp,
				"rwbh":parent.lcparams.rwbh
	        },
	        success : function (result) {
	        	//debugger;
	            if(result.success){
	            	parent.layer.close(parent.layer.getFrameIndex(window.name));
	            	parent.initList();
	            }
	            else{
	            	layer.msg(result.msg);
	            }
	        }
	    });
	})
})
//页面初始化数据
$(function(){
	$("#rzzt").val(serchParam.rzzt);
	$("#abnormal").val(serchParam.abnormal);
	var rzzt = serchParam.rzzt;
	var abnormal = serchParam.abnormal;
	var state = "";
	if(rzzt=="2"||abnormal=="1"){
		state="2";
	}else if(rzzt=="1"&&abnormal=="0"){
		state="1";
	}else{
		state="3";
	}
	$(":radio[value="+state+"]").attr("checked","checked");
	if(state=="1" || state == "3"){
		$(".renZhengForm textarea").closest(".form-group").hide();
	}
	
	$("input[name='shStatus']").on("change",function(){
		var value = $(this).val();
		if(value==2){
			//layer.msg("如果认证不通过,请填写备注信息!");
			$(".renZhengForm textarea").closest(".form-group").fadeIn();
		}else{
			$(".renZhengForm textarea").closest(".form-group").fadeOut();
		}
	});
	
	//queryData({url:"../../../../chuKouHeTong/findShPageByCondition?invoiceCode="+$("#invoiceCode").val(),columns:hisColumns,$container:$("#renzhList"),height:240,pagenation:false});
});

//格式化历史操作
/*function lookInfoFormatter(value, row, index){
	var title = "";
	switch(value){
		case "1":
			title = "认证通过！";
			break;
		default:
			title = "认证未通过！";
			break;
	}
	return title;
}*/
