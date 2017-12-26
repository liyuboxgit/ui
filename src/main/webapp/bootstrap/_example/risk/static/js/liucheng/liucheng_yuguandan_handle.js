// 货物清单表头项
//预关单号	出口口岸	贸易方式	成交方式	出口国家	生成时间	审核状态	报关行详情
// top.params={"rwbh":serchParam.rwbh};
// top.params={"taskId":serchParam.taskId};
// $('#procInstId').val(parent.serchParam.procInstId)
// $('#taskId').val(parent.serchParam.taskId)
// $('#bussinessId').val(parent.serchParam.bussinessId)
// $('#current').val(parent.serchParam.current)
/*
 taskId ：工作流任务ID
 procInstId ：流程实例ID
 current:时间戳
 bussinessId;业务Id
 jggwBm:机构岗位编码
 znDm:职能代码
 */
lcparams={"rwbh":serchParam.bussinessId,"taskId":serchParam.taskId,"procInstId":serchParam.procInstId,"current":serchParam.current,"jggwBm":serchParam.jggwBm,"znDm":serchParam.znDm,"readonly":serchParam.readonly};
// lcparams.rwbh = "WM201712020064";
var key = "";
var formCode = "";
var initList = null;
var columns = [
	{
		title : "序号",
		align:"center",
		formatter : function(value,row,index){
			/*
			var pageNumber = $(".pagination .active").text();
			var pageSize = $(".pagination-detail .page-size").text();
			return pageSize * (pageNumber-1) + index + 1;
			 */
			return index + 1;
			/*
			var page = $table.bootstrapTable("getPage");
			var pageSize = page.pageSize,pageNumber = page.pageNumber;
			return page.pageSize*(page.pageNumber-1)+index+1;
			*/
		}
	},
	{
		title : "预关单号",
		field : "formCode",
		formatter :function(value,row,index){
             return '<a href="javascript:;" onclick="lookxtygd(\''+row.formCode+'\');" >'+value+'</a>';
        }
	}, 
	{
		title : "出口口岸",
		field : "exportPort",
		formatter:function(value,row,index){
			// return getDict('nation',el);
            return getDict('exportPortName',value);
		}
	}, 
	{
		title : "贸易方式",
		field : "serviceType",
//		formatter: labelTrimFormatter
		formatter:function(el){
			return getDict('maoyifs',el);
		}
	}, 
	{
		title : "成交方式",
		field : "dealMode",
		formatter : function(value,row,index){
            return getDict('dealMode',value);
		}
	}, 
	{
		title : "出口国别",
		align:"center",
		field : "arrivingCountry",
		formatter:function(el){
			return getDict('nation',el);
		}
	}, 
	{
		title : "生成时间",
		align:"center",
		field : "createTime"
	}, 
	{
		title : "审核状态",
//		field : "examineStatus",
//		value : "查看比对结果",
		align : "center",
		//formatter : examineStatusFormatter
		formatter : function(value,row,index){
//			if(!value){ 
//				return "";
//			}else{
				return '<a href="javascript:void(0);" class="lookCompareResult">查看</a>';
//			}
			
		}
	},
	{
		title : "报关行详情",
		field : "bghygdbm",
		align : "center",
		formatter : function(value,row,index){
            if(value){
            	if(value.indexOf(",")>-1){
	                var arr = value.split(","),ret = [];
	                for(var i=0;i<arr.length;i++){
	                    if(arr[i]){
	                        ret.push('<a href="javascript:;" onclick="lookybgdhq(\''+arr[i]+'\');"  >'+arr[i]+'</a>');
	                    }
	                }
	                return ret.join(",");
            	}else{
            		return '<a href="javascript:;" onclick="lookybgdhq(\''+value+'\');" >'+value+'</a>';
            	}
            }else{
                //return '<a onclick="lookybgdhq(\''+value+'\');" >'+value+'</a>';
            	return "";
            }
        }
	
	}
	
];

//货物清单测试数据
//
//var data = {
//    "success": true, 
//    "msg": null, 
//    "data": {
//        "pageSize": 10, 
//        "pageNo": 1, 
//        "totalCount": 0, 
//        "lastPageNo": 3, 
//        "nextPageNo": 2, 
//        "firstPage": false, 
//        "lastPage": false, 
//        "thisPageElements": [
//        	
//        	{
//        		"check":true,	
//    			"yuguandanid": "122345678908",
//    			"number": 1,
//    			"guige": "X-000 ",
//    			"danwei": "套",
//    			"oneMoney": 9662.39,
//    			"totalMoney": 9662.39,
//    			"company": "南京某自动化系统工程有限公司"
//    		},
//    		{
//    			"name": "电视监控系统配件 控制器内变压器 ",
//    			"number": 2,
//    			"guige": "ZJYP-4-2 220VAC/15VAC*⑴",
//    			"danwei": "套",
//    			"oneMoney": 146.16,
//    			"totalMoney": 292.32,
//    			"company": "南京某自动化系统工程有限公司"
//    		},
//    		{
//    			"name": "40钻机橡胶配件 ZJ40 钻井平台防滑板 ",
//    			"number": 50,
//    			"guige": "510*510*30 天然橡胶",
//    			"danwei": "件",
//    			"oneMoney": 1074.23,
//    			"totalMoney": 53711.54,
//    			"company": "宝鸡某石油机械厂"
//    		},
//    		{
//    			"name": "铜芯塑料绝缘电力电缆 VVR ",
//    			"number": 0.6,
//    			"guige": "3*6+1*4mm2 1kV GB/T 127*⑴",
//    			"danwei": "km",
//    			"oneMoney": 13569.23,
//    			"totalMoney": 8141.54,
//    			"company": "扬州某点电缆股份有限公司"
//    		},
//    		{
//    			"name": "铜芯塑料绝缘电力电缆 VVR ",
//    			"number": 0.2,
//    			"guige": "3*2.5+1*1.5 0.6/1kV GB/*⑴",
//    			"danwei": "km",
//    			"oneMoney": 7634.85,
//    			"totalMoney": 1526.97,
//    			"company": "扬州某点电缆股份有限公司"
//    		}
//    		
//        ], 
//        "thisPageLastElementNumber": 20, 
//        "previousPageNo": 0, 
//        "thisPageFirstElementNumber": 11
//    }
//};


$(function(){
	// $('#procInstId').val(parent.serchParam.a);
	// $('#taskId').val(parent.serchParam.name)
	//任务详情信息
	var renwuDetail = {
		container : "renwuBaseInfo",
		type : "detail",
		columns : [
			{name: "rwbh", label : "任务编号 "},
            {name: "taskName", label : "任务名称 "},
            {name: "destinationAreaName", label : "出口国别 "},
			{name: "serviceType", label : "贸易方式 "},
			{name: "exportPortName", label : "出口口岸 "},
			{name: "transportMode", label : "运输方式 "},
			{name: "createName", label : "发起人"},
			{name: "createTime", label : "发起时间"}
		]
	};
	addRenWuInfo(renwuDetail);
	//加载基本信息数据
//	detail(renwuData.rwbh)
	// 取值方式统一修改
	// detail("d529b2d31e67463588d1e7e16481dce9")
    detail(lcparams.rwbh)
    function detail(uuid){
		// 请求详情
		$.ajax({
			type : "post",
			dataType : "json",
			url : "../../../../lcygdsh/getTask",
	        data:{
	        	"rwbh":uuid,
	        },
			success : function(result){
				if(result.success && result.data){
					$.each(result.data,function(k,v){
						if(v){
							$("span[name='"+k+"']").html(v);
						}
					});
				}
                var dqhj = result.data.dqhj;
                if(dqhj!="1"){
                    $("#subBtn").attr("disabled", true);
                    $("#optionsBtn button").attr("disabled",true);

                    // $("#export").attr("disabled", true).off("click");//导出
                    // $("#import").attr("disabled", true).off("click");//导入
                    // $("#contrast").attr("disabled", true).off("click");//比对
                    // $("#sortOut").attr("disabled", true).off("click");//禁用归类
                }
			}
		});
	}
//	
//	//任务详情信息
//	var renwuDetail = {
//		container : "renwuBaseInfo",
//		type : "detail",
//		columns : [
//			{name: "", label : "任务编号 ",value: renwuData.rwbh},
//			{name: "", label : "出口国别 ",value:"委内瑞拉"},
//			{name: "", label : "业务类型 ",value:"一般贸易"},
//			{name: "", label : "出口口岸 ",value:"天津新港"},
//			{name: "", label : "运输方式 ",value:"水路运输"},
//			{name: "", label : "发起人",value:"张三"},
//			{name: "", label : "发起时间",value:"2017-09-27"}
//		]
//	};
//	addRenWuInfo(renwuDetail);
	
	//添加底部流程步骤
	var liuCheng = {
		container : "liuchengtu",
		type : "lct",
		columns : [
			{name : "创建任务"},
			{name : "预关单审核",selected: true},
			{name : "报关单审核"},
			{name : "开票通知",},
			{name : "收票确认"},
			{name : "发票认证"}
			/*
			{name : "申报"},
			{name : "备案"}
			*/
		]
	};
	addRenWuInfo(liuCheng);
	getEleByKey(liuCheng.container).find("i:last-of-type").hide();
	
	//初始操作按钮
	addTableHeaderOpration({
		container : "optionsBtn",
		btns : [
			{id: "sortOut", content: "归类",className : "glyphicon glyphicon-plus"},
			{id: "export", content: "导出",className : "glyphicon glyphicon-export"},
			{id: "import", content: "导入",className : "glyphicon glyphicon-import"},
			{id: "contrast", content: "比对",className : "glyphicon glyphicon-pencil"}
		],
        type : "button"
	});
	
	//预关单清单
	var $yuguandanList = $("#yuguandanList");
	//queryData({columns:columns,url:"../../../../lcygdsh/getXiTongYuGanDanList",$container:$yuguandanList,height:270});
    initList = function() {
        $.ajax({
            url: "../../../../lcygdsh/getXiTongYuGanDanList",
            type: "post",
            // data : {"rwbh":"d529b2d31e67463588d1e7e16481dce9"},
            data: {"rwbh": lcparams.rwbh},
            dataType: "json",
            success: function (res) {
                //console.log(res.data);
                queryData({
                    columns: columns,
                    data: {success: true, data: {thisPageElements: res.data}},
                    $container: $yuguandanList,
                    height: 270
                });
            }
        });
    }
    initList();
	//归类
	$("#sortOut").on("click",function(){
		/*
		openLayer({
			title : false,
			
			area : ["96%","98%"],
			url : "../../pages/liucheng/lisi/classify.html"
		});
		*/
		// top.params = parent.params;
		layer.open({
			//title : "归类",
			type : 2,
			title : "归类信息",
			area : ["98%","96%"],
			
			skin : "myLayui",
			//closeBtn : 0,
			content : "../../../pages/liucheng/lisi/classify.html?tempTime="+new Date().getTime()
		});
	});
	
	//导入
	$("#import").on("click",function(){
        // parent.layer.open({
        layer.open({
            type : 2,
            skin : 'myLayui', // 样式类名
            title : "导入文件",
            area : [ "60%", "70%" ],
            content : "../../../pages/liucheng/YGDimport.html"
        });
	});
	
	//比对
	$("#contrast").on("click",function(){
		
		// top.params = parent.params;
		/*
		top.layer.open({
			type : 2,
			title : '商品比对<span style="color:red;font-size:10px">【标红为不一致的项】</span>',
			skin : "myLayui",
			area : ["96%","94%"],
			
			//content : "../../../../static/pages/liucheng/lisi/yuguandan_comparison.html"
			content : "../../pages/liucheng/lisi/yuguandan_comparison.html"
		});
		*/
		
		$.ajax({
			url : "../../../../lcygdsh/duiBiGuanDan",
			type : "post",
			// data : {"rwbh":"d529b2d31e67463588d1e7e16481dce9"},
            data : {"rwbh":lcparams.rwbh},
			dataType : "json",
			success : 	function(json){
				
	              if(json.success){
	                	parent.layer.msg("比对完成，请查看比对结果！");
	                }else{
	                	parent.layer.msg(json.msg);
	                }
	              layer.close(compareLoadIndex); //关闭比对中
				},
				beforeSend : function(XMLHttpRequest){
					compareLoadIndex = layer.load(2);
				}
				
			});
		
//		setTimeout(function(){
//			closeLoad();
//			openBiDuiResult();
//		},2000);
		
	});
	
	//导出 fyq
	$("#export").on("click",function(){
        $.ajax({
            url : "../../../../renwu/selectByPrimaryKey",
            type : "post",
            data : {"rwbh":lcparams.rwbh},
            dataType:'json',
            success: function(data){
                if(data.success){
                	if(data.data==null){
                        layer.msg("任务下没有系统报关单");
                        return false;
					}else{
                        window.open("../../../../renwu/rwYBBExport?rwbh="+lcparams.rwbh);
                        window.open("../../../../renwu/rwYBMXExport?rwbh="+lcparams.rwbh);
                        window.open("../../../../xtbgd/exportXtygd?rwbh="+lcparams.rwbh);
//                        window.rwbh =lcparams.rwbh;
//                        openLayer({
//                            ele:this,
//                            title : '<i class="glyphicon glyphicon-file" style="padding-right:3px;font-size:12px;"></i>系统报关单详情',
//                            url : "../../../pages/guandan/yuluru/xiangqing.html"
//                        });
					}
                }else{
                    layer.msg(data.msg);
                    return false;
                }
            }
        });
       // window.open("../../../../renwu/rwYBBExport?rwbh=d529b2d31e67463588d1e7e16481dce9");
       // window.open("../../../../renwu/rwYBMXExport?rwbh=d529b2d31e67463588d1e7e16481dce9");
       // window.open("../../../../xtbgd/XTYBGDYL?rwbh=d529b2d31e67463588d1e7e16481dce9");

    });
	
	//查看预关单详情
	/*$(document).on("click", ".lookInfo",function() {
		openLayer({
			ele:this,
			area : ["80%","990%"],
			title : '<i class="glyphicon glyphicon-file" style="padding-right:3px;font-size:12px;"></i>预关单详情【预关单号：<font color="red">'+params.yuguandanid+'</font>】',
			url : "../../../pages/liucheng/lisi/yuguandan_detail.html"
		});
	});*/

	$(document).on("click", ".lookInfo",function() {
		openLayer({
			ele:this,
			id : $(this).attr("key"),
			title : '<i class="glyphicon glyphicon-file" style="padding-right:3px;font-size:12px;"></i>系统生成预关单',
			url : "../../../pages/guandan/yuluru/xiangqing.html"
		});
	});
	
	//提交
/*	$("#subBtn").bind("click",function(){
		openLayer({
			ele:this,
			title : "提交",
			
			area : ["40%","85%"],
			url : "../../../pages/liucheng/renwu_submit.html",
		});
	});*/
	
	
	$("#subBtn").bind("click",function(){
        $("#subBtn").attr("disabled", true);
        $("#optionsBtn button").attr("disabled",true);
        //首先走提交前的check,
        $.ajax({
            url : '../../../../lcygdsh/checkSubmit',
            contenType : 'application/json',
            type : 'POST',
            data : {
				rwbh:lcparams.rwbh
            },
            success : function(result){
                if(result.success){
                	if(result.msg=="true"){
                        submit();
					}else {
                        layer.confirm(result.msg, {
                            btn: ['确定', '取消']
                        }, function (index) {
                            submit();
                            layer.close(index);
                        }, function (index) {
                            $("#subBtn").attr("disabled", false);
                            $("#optionsBtn button").attr("disabled",false);
                            layer.close(index);
                        });
					}
                }else{
                    parent.layer.msg(result.msg);
                }

            }
        });



	});
	function submit(){
        $.ajax({
            url : '../../../../renwu/complete',
            contenType : 'application/json',
            type : 'POST',
            data : {
                "taskId" : lcparams.taskId,
                "procInstId" : lcparams.procInstId,
                "comment" : '',
                "vars" : '',
                "dqhj" :'2', //当前环节
                "rwbh" : lcparams.rwbh
            },
            success : function(result){
                if(result.success){
                    parent.layer.msg(result.msg);
                }else{
                    $("#subBtn").attr("disabled", false);
                    $("#optionsBtn button").attr("disabled",false);
                    parent.layer.msg(result.msg);
                }
                parent.layer.close(parent.layer.getFrameIndex(window.name));//成功后关闭页面
                // parent.refreshTable(); //刷新页面
                // window.location.reload();
            }
        });
	}
	//查看比对结果
	$(document).on("click",".lookCompareResult",function(){
		// top.params = parent.params;
		
		$.ajax({
			url : "../../../../lcygdsh/checkGuanDanDuiBi",
			type : "post",
			// data : {"rwbh":"d529b2d31e67463588d1e7e16481dce9"},
            data : {"rwbh": lcparams.rwbh},
			dataType : "json",
			success : function(res){
				if(!res.success){ 
					parent.layer.msg(res.msg);
					return;
				} else {
					openBiDuiResult();
				}
			}
		});
		
	});
	
	//驳回处理
	$("#withdraw").on("click",function(){
		 
	});
	
	var readonly = lcparams.readonly ? $.trim(lcparams.readonly) : "false";
	if(readonly==="true"){
		//$("#optionsBtn").hide();
		$("#optionsBtn,#subBtn").hide();
	}
	

});

var compareLoadIndex = null; //
//打开比对结果
function openBiDuiResult(){
	layer.open({
		type : 2,
		title : '商品比对<span style="color:red;font-size:10px">【标红为不一致的项】</span>',
		skin : "myLayui",
		area : ["98%","96%"],
		
		//content : "../../../../static/pages/liucheng/lisi/yuguandan_comparison.html"
		content : "../../../pages/liucheng/lisi/yuguandan_comparison.html"
	});
}
/*
//关闭正在比对中...
function closeLoad(){
	top.layer.close(compareLoadIndex);
}
*/
//查看系统预关单预览
function  lookxtygd(formCode) {
    $.ajax({
        url:'../../../../renwu/queryXtyglxx',
        type:'POST',
        dataType:'json',
        data:{
            "formCode":formCode,
        },
        success:function(result){
        	if(result.success){
                window.rwbh =result.data.rwbh;
                openLayer({
                    ele:this,
                    title : '<i class="glyphicon glyphicon-file" style="padding-right:3px;font-size:12px;"></i>系统报关单详情',
                    url : "../../../pages/guandan/yuluru/xiangqing.html"
                });
			}else{
                layer.msg(result.msg);
			}
        }
    })
};
//查看报关行关单
function lookybgdhq(bghybgd) {
    window.formCode =bghybgd;
    openLayer({
        ele:this,
        title : '<i class="glyphicon glyphicon-file" style="padding-right:3px;font-size:12px;"></i>报关行预关单',
        url : "../../../pages/guandan/yuluru/bghygd_xiangqing.html"
    });
};



