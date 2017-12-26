var xfsFlag = "";
var creategoodsList = null;
$(function() {
    $("#snqyf").html(parentTabWindow.params.ssq);
    $("#snqpc").html(parentTabWindow.params.sbpch);
    $("#sbpc").val(parentTabWindow.params.sbpc);
    var sbpc = $("#sbpc").val();
	chuColumns = [ 
	{
		align:"center",
		checkbox : true
	},{
        title : "出口明细id",
        align:"center",
        field : "wmsbck",
        visible : false
    },{
		title : "关联号",
		field : "glh"
	}, {
		title : "报关单号",
		field : "gdh"
	}, {
		title : "出口发票号",
		field : "ckfph"
	}, {
		title : "出口日期",
		field : "ckrq"
	}, {
		title : "商品代码",
		field : "spdm"
	}, /*{
		title : "商品名称",
		field : "spmc"
	}, {
		title : "单位",
		field : "dw"
	},*/ {
		title : "出口数量",
		field : "cksl"
	}, {
        title : "美元离岸价",
        field : "fob"
    } , {
		title : "操作",
		field : "",
		formatter : examineStatuFormatter
	}],
	goodsColumns = [ 
	{
		align:"center",
		checkbox : true
	},{
        title : "进货明细id",
        align:"center",
        field : "wmsbjh",
        visible : false
    },{
        title : "数据序号",
        field : "sjxh"
    },{
		title : "关联号",
		field : "glh"
	},{
		title : "进货凭证号",
		field : "jhpzh"
	}, {
		title : "发票开票日期",
		field : "kprq"
	}, {
		title : "商品代码",
		field : "spdm"
	}, {
		title : "税种",
		field : "sz"
	},/*{
		title : "商品名称",
		field : "spmc"
	}, {
		title : "单位",
		field : "dw"
	},*/ {
		title : "数量",
		field : "sl"
	}, /*{
		title : "计税金额",
		field : "jsje"
	}, {
		title : "税额",
		field : "se"
	}, {
		title : "退税率",
		field : "tsl"
	}, {
		title : "可退税额",
		field : "ktse"
	},*/ {
		title : "操作",
		field : "cunzaixfs",
		formatter : examineStatusFormatter
	}];
	/*
    $.ajax({
        url:"../../../../sbpc/findCkData",
        type : "post",
        data : {"sbpc":parentTabWindow.params.sbpc},
        dataType:"json",
        success: function(data){
            queryData({
                $container : $("#table"),
                columns : chuColumns,
                data : {data:{thisPageElements:data.data}},
                height:420
			});
        }
    });
    */
	//查询出口明细数据
	ajaxHelper(
		"../../../../sbpc/findCkData",
		{"sbpc":parentTabWindow.params.sbpc},
		function(data){
            queryData({
                $container : $("#table"),
                columns : chuColumns,
                data : {data:{thisPageElements:data.data}},
                height:420
			});
        }
	);
    //查询进货明细数据
    creategoodsList = function(){
    	/*
	    $.ajax({
	        url:"../../../../sbpc/findJhData",
	        type : "post",
	        data : {"sbpc":parentTabWindow.params.sbpc},
	        dataType:"json",
	        success: function(data){
	        	isIncludeXfs(data); //是否含消费税标志
	        }
	    });
	    */
    	ajaxHelper(
    		"../../../../sbpc/findJhData",
    		{"sbpc":parentTabWindow.params.sbpc},
    		function(data){
	        	isIncludeXfs(data); //是否含消费税标志
	        }
    	);
    }
    creategoodsList();
	$("#ckBtn").on("click",function(e){
		var selectRows = $("#table").bootstrapTable("getSelections");
		if(selectRows.length===1){
			params = selectRows[0];
			/*
			layer.open({
				type : 2,
				skin : "myLayui", // 样式类名
				title : '<i class="glyphicon glyphicon-plus" style="padding-right:3px;font-size:12px;"></i>编辑',
				area : ["98%","96%"],
				content : "../../../pages/tuishui/pici/add_chukou.html?tempTime="+new Date().getTime(),
				success : function(layero, index) {
				   var currentFrame = layero.find("iframe")[0].contentWindow.document;
				   $.ajax({
				        url:"../../../../sbpc/findCkDetail",
				        type:"GET",
				        dataType:"json",
				        data:{
				        	"uuid":selectRows[0].wmsbck
				        },
				        success:function(result){
		                   setFormData("addInfoForm",currentFrame,result.data);
		                   //$("#ckslBak",currentFrame).val(selectRows[0].cksl);
				        },
				        error: function(XMLHttpRequest, textStatus, errorThrown) {
				        	 alert(XMLHttpRequest.status);
				        	 alert(XMLHttpRequest.readyState);
				        	 alert(textStatus);
				        }
				    })
				}
			});
			*/
			openTab('出口明细编辑【批次号:<font color="red">'+parentTabWindow.params.sbpch.substring(0,8)+(parentTabWindow.params.sbpch.length>8?'...':'')+'</font>】',"tuishui/pici/add_chukou.html?tempId="+params.wmsbck);
		}else{
			layer.msg("请选择一条数据进行编辑!");
		}
		processEvent(e);
	})
	
	$("#jhBtn").on("click",function(e){
		var selectRows = $("#goodsList").bootstrapTable("getSelections");
		if(selectRows.length===1){
			params = selectRows[0];
			/*
			layer.open({
				type : 2,
				skin : "myLayui", // 样式类名
				title : '<i class="glyphicon glyphicon-plus" style="padding-right:3px;font-size:12px;"></i>编辑',
				area : ["98%","96%"],
				content : "../../../pages/tuishui/pici/add_jinhuo.html?tempTime="+new Date().getTime(),
				success : function(layero, index) {
				   var currentFrame = layero.find("iframe")[0].contentWindow.document;
				   $.ajax({
				        url:"../../../../sbpc/findJhDetail",
				        type:"GET",
				        dataType:"json",
				        data:{
				        	"uuid":selectRows[0].wmsbjh
				        },
				        success:function(result){
		                   setFormData("addInfoForm",currentFrame,result.data)
				        },
				        error: function(XMLHttpRequest, textStatus, errorThrown) {
				        	 alert(XMLHttpRequest.status);
				        	 alert(XMLHttpRequest.readyState);
				        	 alert(textStatus);
				        }
				    })
				}
			});
			*/
			openTab('进货明细编辑【批次号:<font color="red">'+parentTabWindow.params.sbpch.substring(0,8)+(parentTabWindow.params.sbpch.length>8?'...':'')+'</font>】',"tuishui/pici/add_jinhuo.html?tempId="+params.wmsbck);
		}else{
			layer.msg("请选择一条数据进行编辑!");
		}
		processEvent(e);
	})
	function examineStatusFormatter(value,row,index){
		var oprHtml = "";
		if(xfsFlag=="C" && value==1){
			oprHtml = '<a href="javascript:;" class="jinhuo" onclick="jinhuo(\''+row.wmsbjh+'\');">录入消费税</a>|<a href="javascript:;" class="chakan" onclick="lookInfo(\''+row.wmsbjh+'\')">查看</a>';
		}else if(row.sz=="C"){
			oprHtml = '<a href="javascript:;" class="chakan" onclick="deleteXfs(\''+row.wmsbjh+'\')">删除</a>|<a href="javascript:;" class="chakan" onclick="lookInfo(\''+row.wmsbjh+'\')">查看</a>';
		}else{
			oprHtml = '<a href="javascript:;" class="chakan" onclick="lookInfo(\''+row.wmsbjh+'\')">查看</a>';
		}
		return oprHtml;
	}
	function examineStatuFormatter(value,row,index){
	    return '<a class="chakan" href="javascript:void(0);" onclick="lookchuk(\''+row.wmsbck+'\')">查看</a>';
	}
	$("#xhrep").on("click",function(e){
		/*
		$.ajax({
			url:"../../../../sbpc/setSjxhReP",
			data:{
	        	"ssq":parentTabWindow.params.ssq,
	        	"pc":parentTabWindow.params.sbpch
	        },
	        success:function(result){
               if(result.success){
            	   creategoodsList();
            	   //parentTabWindow.layer.msg(result.msg);
               }else{
               		layer.msg("重排失败!");
               }
       			//parentTabWindow.layer.close(parentTabWindow.layer.getFrameIndex(window.name));//成功后关闭页面
       			//parentTabWindow.refreshTable(); //刷新页面
	        }
		});
		*/
		ajaxHelper(
			"../../../../sbpc/setSjxhReP",
			{
	        	"ssq":parentTabWindow.params.ssq,
	        	"pc":parentTabWindow.params.sbpch
	        },
	        function(result){
               if(result.success){
            	   creategoodsList();
               }else{
               		layer.msg("重排失败!");
               }
	        }
		);
		processEvent(e);
	});
	
	function isIncludeXfs(tablList){
		ajaxHelper("../../../../sbpc/findXfszt",{"sbpc":parentTabWindow.params.sbpc},function(result){
			if(result.success && result.data){
				xfsFlag = result.data.xfsbz;
				queryData({
	                $container : $("#goodsList"),
	                columns : goodsColumns,
	                data : {data:{thisPageElements:tablList.data}},
	                height : 294
					/*
	                onPostBody : function(){
	                	$("#xhrep").trigger("click");
	                }
	                */
	            });
			}
		});
	}
	
});
function jinhuo(wmsbjh) {
	
	openLayer({
		ele:this,
		title : '<i class="glyphicon glyphicon-plus" style="padding-right:3px;font-size:12px;"></i>消费税录入',
		area : ["98%","96%"],
		url : "../../../pages/tuishui/pici/jinhuo.html"
	});
	
	//openTab("消费税录入","tuishui/pici/jinhuo.html?tempId="+wmsbjh);
};
function lookInfo(wmsbjh) {
	/*
    openLayer({
        ele:this,
        title : '<i class="glyphicon glyphicon-plus" style="padding-right:3px;font-size:12px;"></i>进货明细详情',
        area : ["95%","95%"],
        url : "../../../pages/tuishui/pici/detail_jinhuo.html?wmsbjh="+wmsbjh
    });
    */
	openTab("进货明细详情","tuishui/pici/detail_jinhuo.html?wmsbjh="+wmsbjh);
}
function deleteXfs(wmsbjh) {
	ajaxHelper("../../../../sbpc/deleteXfs",{"wmsbjh":wmsbjh},function(result){
		if(result.success){
			layer.msg("删除成功！");
		}else{
			layer.msg("删除失败！");
		}
		//creategoodsList();
		$("#xhrep").trigger("click");
	});
}
function lookchuk(wmsbck) {
	/*
	openLayer({
		ele:this,
		title : '<i class="glyphicon glyphicon-plus" style="padding-right:3px;font-size:12px;"></i>出口明细详情',
		area : ["95%","95%"],
		url : "../../../pages/tuishui/pici/detail_chukou.html?wmsbck="+wmsbck
	});
	*/
	openTab("出口明细详情","tuishui/pici/detail_chukou.html?wmsbck="+wmsbck);
}