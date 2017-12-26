$(function() {
	// 基本信息
	var valueumns = [ 
		{
			value : "sbny",
			name : "申报年月",
			type : "text",
			readonly : true
		},
		{
			value : "sbpch",
			name : "申报批次",
			type : "text",
			readonly : true
		},
		{
			value : "sz",
			name : "税种",
			type : "select"
		},
		{
			value : "glh",
			name : "关联号",
			type : "text",
			readonly : true
		},
		{
			value : "jhpzh",
			name : "进货凭证号",
			type : "text",
			readonly : true
		},
		{
			value : "xfnsrsbh",
			name : "供货方纳税号",
			type : "text",
			readonly : true
		},
		{
			value : "kprq",
			name : "发票开票日期",
			type : "text",
			readonly : true
		},
		{
			value : "spdm",
			name : "商品代码",
			type : "text",
			readonly : true
		},
		{
			value : "jsje",
			name : "计税金额",
			type : "text",
			readonly : true
		},
		{
			value : "zyfp",
			name : "专用税票号",
			type : "text"
		},
		{
			value : "ywdm",
			name : "业务类型",
			type : "select"
			//options : getDicts("serviceType")
		},
		{
			value : "bz",
			name : "备注",
			type : "textarea"
		}
	];

	// 基本信息添加到页面
	initDetailInfo({
		id: "info",
		elems:valueumns
	});
	$.ajax({
		url:"../../../../sbpc/findJhDetail",
		type:"GET",
		dataType:"json",
		data:{
		    "uuid":serchParam.wmsbjh
		},
		success : function(result){
		   if(result.success && result.data){
		       $.each(result.data,function(k,v){
				  if(k=="ywdm"){
					  if(v.indexOf(","!=-1)){
						  var varr = v.split(",");
						  var vhtmlArr = [];
						  for(var i=0;i<varr.length;i++){
							 vhtmlArr.push(getDict("serviceType",varr[i]));
						  }
						  $("#"+k).html(vhtmlArr.join(","));
					  }else{
						  $("#"+k).html(v); 
					  }
				  }else{
					  $("#"+k).html(v);
		 			  }
		 		  });
			}
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
		    alert(XMLHttpRequest.status);
		    alert(XMLHttpRequest.readyState);
		    alert(textStatus);
		}
    });
});
