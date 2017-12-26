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
			value : "glh",
			name : "关联号",
			type : "text",
			readonly : true
		},
		{
			value : "jldjh",
			name : "进料登记册号",
			type : "text",
			readonly : true
		},
		{
			value : "ckfph",
			name : "出口发票号码",
			type : "text",
			readonly : true
		},
		{
			value : "ckrq",
			name : "出口日期",
			type : "text",
			readonly : true
		},
		{
			value : "fob",
			name : "美元离岸价",
			type : "text"
		},
		{
			value : "ckhl",
			name : "美元汇率",
			type : "text",
			validate : {
				required : true
			}
		},
		{
			value : "hxdh",
			name : "核销单号",
			type : "text"
		},
		{
			value : "gdh",
			name : "单据编号",
			type : "text"
		},
		{
			value : "spxh",
			name : "项号",
			type : "text"
		},
		{
			value : "spdm",
			name : "商品代码",
			type : "select"
		},
		{
			value : "cksl",
			name : "出口数量",
			type : "text"
		},
		{
			value : "ywdm",
			name : "业务类型",
			type : "select"
			//options : getDicts("serviceType")
		},
		{
			value : "yqbnshzm",
			name : "远期收汇证明",
			type : "text"
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
	    url:"../../../../sbpc/findCkDetail",
	    type:"GET",
	    dataType:"json",
	    data:{
	        "uuid":serchParam.wmsbck
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