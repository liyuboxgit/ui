/*
 taskId ：工作流任务ID
 procInstId ：流程实例ID
 current:时间戳
 bussinessId;业务Id
 jggwBm:机构岗位编码
 znDm:职能代码
 */
lcparams={"rwbh":serchParam.bussinessId,"taskId":serchParam.taskId,"procInstId":serchParam.procInstId,"current":serchParam.current,"jggwBm":serchParam.jggwBm,"znDm":serchParam.znDm,"readonly":serchParam.readonly};
 // lcparams.rwbh = "DL201711250039";
 // lcparams.rwbh = "WM201712040075";

var key = "tzdh";
var formCode = "";
var initList = null;
//货物清单测试数据
var data = {
    "success": true, 
    "msg": null, 
    "data": { 
        "thisPageElements": [
        	{
    			"name": "287823772377237",
    			"number": "天津新港",
    			"guige": "委内瑞拉",
    			"tzdh" : "拉瓜伊拉",
    			"danwei": "FOB",
    			"oneMoney": "一般贸易",
    			"totalMoney": "未审核",
    			"company": "13298323399090",
    			"ctrol": "选择"
    		}
        ]
    }
};

$(function(){
	//任务详情信息
	var renwuDetail = {
		container : "renwuBaseInfo",
		type : "detail",
		columns : [
			// {name: "rwbh", label : "任务编号 ",value:"CK201709220001"},
			// {name: "destinationAreaName", label : "出口国别 ",value:"委内瑞拉"},
			// {name: "serviceType", label : "业务类型 ",value:"一般贸易"},
			// {name: "exportPortName", label : "出口口岸 ",value:"天津新港"},
			// {name: "transportMode", label : "运输方式 ",value:"水路运输"},
			// {name: "lc_operName", label : "发起人",value:"张三"},
			// {name: "lc_operTime", label :发起时间",value:"2017-09-27"}
            {name: "rwbh", label : "任务编号 ",value:""},
            {name: "taskName", label : "任务名称 "},
            {name: "destinationAreaName", label : "出口国别 ",value:""},
            {name: "serviceType", label : "贸易方式",value:""},
            {name: "exportPortName", label : "出口口岸 ",value:""},
            {name: "transportMode", label : "运输方式 ",value:""},
            {name: "createName", label : "发起人",value:""},
            {name: "createTime", label : "发起时间",value:""}
		]
	};
	addRenWuInfo(renwuDetail);
    //加载基本信息数据
    detail(lcparams.rwbh);
    // detail("d529b2d31e67463588d1e7e16481dce9");
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
			 $.each(result.data,function(k,v){
				 $("span[name='"+k+"']").html(v);
			 });
             var dqhj = result.data.dqhj;
             if(dqhj!="2"){
                 $("#subBtn").attr("disabled", true);
                 $("#optionBtn button").attr("disabled",true);
                 // $("#choose").attr("disabled", true).off("click");//导出
                 // $("#contrast").attr("disabled", true).off("click");//比对
                 // $("#sortOut").attr("disabled", true).off("click");//禁用归类
             }
			 }
		 });
    }
	//添加底部流程步骤
	var liuCheng = {
		container : "liuchengtu",
		type : "lct",
		columns : [
			{name : "创建任务"},
			{name : "预关单审核"},
			{name : "报关单审核", selected: true},
			{name : "开票通知"},
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
	
	//添加操作按钮
	addTableHeaderOpration({
		container : "optionBtn",
		btns : [
			{id: "sortOut", content: "归类",className : "glyphicon glyphicon-plus"},
			{id: "contrast", content: "比对",className : "glyphicon glyphicon-pencil"},
			{id: "choose", content: "选择关单",className : "glyphicon fa fa-file-text-o"}
		],
		type : "button"
	});

	//货物清单
	var $gdList = $("#gdList");
	
	// 货物清单表头项
	var columns = [
		/*
		{
			align:'center',
			checkbox : true
		},
		*/
		{
			title : '序号',
			align:'center',
			formatter : function(value,row,index){
				/*
				var pageNumber = $(".pagination .active").text();
				var pageSize = $(".pagination-detail .page-size").text();
				return pageSize * (pageNumber-1) + index + 1;
				 */
				return index + 1;
				/*
				var page = $gdList.bootstrapTable("getPage");
				var pageSize = page.pageSize,pageNumber = page.pageNumber;
				return page.pageSize*(page.pageNumber-1)+index+1;
				*/
			}
		},
		{
			title : '预录入编号',
			field : 'formCode',
			 formatter :function(value,row,index){
              return '<a onclick="lookxtygd(\''+row.formCode+'\');" >'+value+'</a>';
           }
		}, 
		{
			title : '出口口岸',
			field : 'exportPort',
			formatter : function(value,row,index){
				//debugger
				return getDict("exportPortName",value);
			}
		}, 
		{
			title : '运抵国',
			field : 'arrivingCountry',
			formatter : function(value,row,index){
				return getDict("nation",value);
			}
		}, 
		{
			title : '指运港',
			field : 'fingerPort'
		},
		{
			title : '成交方式',
			field : 'dealMode',
			formatter : function(value,row,index){
				return getDict("dealMode",value);
			}
		},
		{
			title : '贸易方式',
			field : 'serviceType',
			formatter : function(value,row,index){
				return getDict("maoyifs",value);
			}
		},
		{
			title : '审核状态',
			field : 'examineStatus',
            formatter : function(value,row,index){
                return '<a href="javascript:void(0);" class="lookCompareResult">查看</a>';
            }
		}, 
		{
			title : '关单号',
			field : 'bghygdbm',
		    formatter : function(value,row,index){
	            if(value){
	            	if(value.indexOf(",")>-1){
		                var arr = value.split(","),ret = [];
		                for(var i=0;i<arr.length;i++){
		                    if(arr[i]){
		                        ret.push('<a href="javascript:;" onclick="hand2lookbgd(\''+arr[i]+'\');"  >'+arr[i]+'</a>');
		                    }
		                }
		                return ret.join(",");
	            	}else{
	            		return '<a href="javascript:;" onclick="hand2lookbgd(\''+value+'\');"  >'+value+'</a>';
	            	}
	            }else{
	                //return '<a onclick="lookbgd(\''+value+'\');" >'+value+'</a>'
	            	return '';
	            }
	        }
		}
	];
	
	// 货物清单表头项
	var bgcolumns = [
		{
			title : '序号',
			align:'center',
			formatter : function(value,row,index){
				return index + 1;
			}
		},
		{
			title : '报关单编号',
			field : 'bgdh',
            formatter :function(value,row,index){
                return '<a onclick="hand2lookbgd(\''+row.bgdh+'\');" >'+value+'</a>';
            }
		},
		{
			title : '出口口岸',
			field : 'exportPort',
			formatter : function(value,row,index){
				return getDict("exportPortName",value);
			}
		}, 
		{
			title : '运抵国',
			field : 'arrivingCountry',
			formatter : function(value,row,index){
				return getDict("nation",value);
			}
		}, 
		{
			title : '指运港',
			field : 'fingerPort'
		},
		{
			title : '成交方式',
			field : 'dealMode',
			formatter : function(value,row,index){
				return getDict("jiehuifs",value);
			}
		},
		{
			title : '贸易方式',
			field : 'serviceType',
			formatter : function(value,row,index){
				return getDict("maoyifs",value);
			}
		}
	];
	
	//查询清单
	// queryData({columns:columns,data:data,$container:$gdList,height:280});
	/*
	 $.ajax({
		 url : "../../../../lcgdsh/getBaoGuanHangYuGuanDanList",
		 type : "post",
		 // data : {"rwbh":parent.params.rwbh},
	     data : {"rwbh":"d529b2d31e67463588d1e7e16481dce9"},
	     dataType : "json",
		 success : function(res){
		 console.log(res.data);
		 queryData({columns:columns,data:{success:true,data:{thisPageElements:res.data}},$container:$gdList,height:270});
		 }
	 });
	 */
	initList = function(){
		 $.ajax({
			 url : "../../../../lcgdsh/getBaoGuanHangYuGuanDanList",
             // url : "../../../../lcygdsh/getXiTongYuGanDanList",
			 type : "post",
			 // data : {"rwbh":parent.params.rwbh},
             // data : {"rwbh":"d529b2d31e67463588d1e7e16481dce9"},
             data : {"rwbh":lcparams.rwbh},
		     dataType : "json",
			 success : function(res){
				 if(res.data){
				 	//数据加载前 判断 res.gdbz 关标志  为1是报关行报关单 2、代表报关单   res.data.dataList获取数据
					 if(res.data.gdbz == "1"){
						 queryData({columns:columns,data:{success:true,data:{thisPageElements:res.data.dataList}},$container:$gdList,height:270});
					 }else{
						 $(document).find("#contrast").hide(); //隐藏归类按钮
						 queryData({columns:bgcolumns,data:{success:true,data:{thisPageElements:res.data.dataList}},$container:$gdList,height:270});
					 }
				 }else{
					 queryData({columns:columns,data:{success:true,data:{thisPageElements:[]}},$container:$gdList,height:270}); 
				 }
			 }
		 });
	}
	initList();
	
	//查看预录入报关单详情
	/*$(document).on("click",".lookInfo", function(){
		//var title = popupPreHandler(this,3);
		var title = $(this).attr("title");
		openLayer({
			ele:this,
			id : $(this).attr("key"),
			
			area : ["80%","98%"],
			title : '<i class="glyphicon glyphicon-file" style="padding-right:3px;font-size:12px;"></i>预录入关单详情【关单号：<font color="red">'+title+'</font>】',
			url : "../../../pages/liucheng/wangwu/yuluru_detail.html"
		});
	});*/
	//报关行预报关单
	$(document).on("click", ".lookInfo",function() {
		openLayer({
			ele:this,
			//id : $(this).attr("key"),
			title : '<i class="glyphicon glyphicon-file" style="padding-right:3px;font-size:12px;"></i>报关行预报关单',
			url : "../../../pages/liucheng/wangwu/xiangqing.html"
		});
	});
	//比对
	$("#contrast").on("click",function(){
		
		$.ajax({
			url : "../../../../lcgdsh/duiBiGuanDan",
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
	              top.layer.close(compareLoadIndex); //关闭比对中
				},
				beforeSend : function(XMLHttpRequest){
					compareLoadIndex = top.layer.load(2);
				}
				
			});
		
//		compareLoadIndex =  top.layer.load(2);
//		setTimeout(function(){
//			closeLoad();
//			openBiDuiResult();
//		},2000);
		
	});

	//查看比对结果
	$(document).on("click",".lookCompareResult",function(){
        // top.params = parent.params;

        $.ajax({
            url : "../../../../lcgdsh/checkGuanDanDuiBi",
            type : "post",
            // data : {"rwbh":"d529b2d31e67463588d1e7e16481dce9"},
            data : {"rwbh":lcparams.rwbh},
            dataType : "json",
            success : function(res){
                if(!res.success){
                    parent.layer.msg(res.msg);
                    return;
                } else {
                    openBiDui();
                }
            }
        });
	});

    //归类
    $("#sortOut").on("click",function(){
        $.ajax({
            url : '../../../../lcgdsh/checkGuanDanGl',
            contenType : 'application/json',
            type : 'POST',
            data : {
                "rwbh" : lcparams.rwbh
            },
            success : function(result){
                if(result.success){
                    layer.open({
                        //title : "归类",
                        type : 2,
                        title : "物资归类",
                        area : ["98%","96%"],
                        skin : "myLayui",
                        content : "../../../pages/liucheng/wangwu/classify.html?tempTime="+new Date().getTime()
                    });
                }else {
                    layer.msg(result.msg);
                }
            }
        })
		/*
		 openLayer({
		 title : false,
		 offset : "b",
		 area : ["96%","98%"],
		 url : "../../pages/liucheng/lisi/classify.html"
		 });
		 */
        /*
        layer.open({
            //title : "归类",
            type : 2,
            title : "物资归类",
            area : ["96%","96%"],
            move : false,
            skin : "myLayui",
            closeBtn : 0,
            content : "../../../pages/liucheng/wangwu/classify.html"
        });
        */
    });


	//选择关单
	$(document).on("click","#choose",function(){
		openLayer({
			ele:this,
			title : '选择关单',
			//area : ["98%","96%"],
			url : "../../../pages/liucheng/wangwu/choose.html",
		});
	});
	
	//审核
	$(document).on("click",".shenhe",function(){
		compareLoadIndex =  top.layer.load(2);
		setTimeout(function(){
			closeLoad();
			openBiDuiResult();
		},2000);
	});
	//提交
//	$("#subBtn").bind("click",function(){
//		openLayer({
//			ele:this,
//			title : '提交',
//			
//			area : ["40%","85%"],
//			url : "../../../pages/liucheng/renwu_submit.html",
//		});
//	});
	
	$("#subBtn").bind("click",function(){
        $("#subBtn").attr("disabled", true);
        //$("#choose").attr("disabled", true).off("click");//导出
        //$("#contrast").attr("disabled", true).off("click");//比对
        //$("#sortOut").attr("disabled", true).off("click");//禁用归类

		$("#optionBtn button").attr("disabled",true);

        $.ajax({
            url : '../../../../lcgdsh/checkSubmit',
            contenType : 'application/json',
            type : 'POST',
            data : {
                "rwbh" : lcparams.rwbh
            },
            success : function(result){
                if(result.success){
                    $.ajax({
                        url : '../../../../renwu/complete',
                        contenType : 'application/json',
                        type : 'POST',
                        data : {
                            "taskId" : lcparams.taskId,
                            "procInstId" : lcparams.procInstId,
                            "comment" : '',
                            "vars" : '',
                            "dqhj" :'3', //当前环节
                            "rwbh" : lcparams.rwbh
                        },
                        success : function(result){
                            if(result.success){
                                parent.layer.msg(result.msg);
                            }else{
                                parent.layer.msg(result.msg);
                                $("#subBtn").attr("disabled", false);
                                //$("#choose").attr("disabled", false).off("click");//导出
                               // $("#contrast").attr("disabled", false).off("click");//比对
                                //$("#sortOut").attr("disabled", false).off("click");//禁用归类
                                $("#optionBtn button").attr("disabled",false);
                            }
                            parent.layer.close(parent.layer.getFrameIndex(window.name));//成功后关闭页面
                            // parent.refreshTable(); //刷新页面

                        }
                    });
                }else{
                    layer.msg(result.msg);
                    $("#subBtn").attr("disabled", false);
                    //$("#choose").attr("disabled", false).off("click");//导出
                    //$("#contrast").attr("disabled", false).off("click");//比对
                    //$("#sortOut").attr("disabled", false).off("click");//禁用归类
                    $("#optionBtn button").attr("disabled",false);
//                  window.location.reload();
                }

            }
        });

	});
	
	//查看报关行关单
	$(document).on("click","a.lookBaoGuanHangGD", function(){
		/*var title = popupPreHandler(this,1)*/;
		openLayer({
			ele:this,
			id : $(this).attr("key"),
			title : '<i class="glyphicon glyphicon-file" style="padding-right:3px;font-size:12px;"></i>报关单',
			url : "../../../pages/guandan/yuluru/xiangqing.html"
		});
	});
	
	//驳回处理
	$("#withdraw").on("click",function(){
		 
	});
	var readonly = lcparams.readonly ? $.trim(lcparams.readonly) : "false";
	if(readonly==="true"){
		//$("#optionBtn").hide();
		$("#optionBtn,#subBtn").hide();
	}
	
})
//表格中格式化code或label
function lookshenheFormatter(value, row, index){
	return '<a href="javascript:void(0);" title="'+value+'" key="'+(row[key?key:"id"])+'" class="text-info shenhe">' + value + '</a>';
}
//表格中格式化code或label
function chooseDetail(value, row, index){
	return '<a href="javascript:void(0);" title="'+value+'" key="'+(row[key?key:"id"])+'" class="text-info choosen">' + value + '</a>';
}


var compareLoadIndex = null; //
//打开比对
function openBiDuiResult(){
	layer.open({
		type : 2,
		title : '商品比对<span style="color:red;font-size:10px">【标红为不一致的项】</span>',
		skin : "myLayui",
		area : ["98%","96%"],
		
		//content : "../../../../static/pages/liucheng/lisi/yuguandan_comparison.html"
		content : "../../../pages/liucheng/wangwu/guandan_comparison.html?tempTime="+new Date().getTime()
	});
}
//打开比对结果
function openBiDui(){
	layer.open({
		type : 2,
		title : '商品比对<span style="color:red;font-size:10px">【标红为不一致的项】</span>',
		skin : "myLayui",
		area : ["98%","96%"],
		
		//content : "../../../../static/pages/liucheng/lisi/yuguandan_comparison.html"
		content : "../../../pages/liucheng/wangwu/guandan_shenhe_comparison.html?tempTime="+new Date().getTime()
	});
}
//关闭正在比对中...
function closeLoad(){
	top.layer.close(compareLoadIndex);
}

//刷新数据
function refreshTable(){
	if(!$table)$table = $("#gdList");
	$table.bootstrapTable("refresh");
}
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
//查看报关单信息
function lookbgd(bgd) {
    openLayer({
        ele:this,
		id:bgd,
        title : '<i class="glyphicon glyphicon-file" style="padding-right:3px;font-size:12px;"></i>报关单详情',
        url : "../../../pages/guandan/guandan/xiangqing.html"
    });
};
//查看报关单信息
function  hand2lookbgd(bgdh) {
    $.ajax({
        url:'../../../../renwu/querybgdxx',
        type:'POST',
        dataType:'json',
        data:{
            "bgdh":bgdh,
        },
        success:function(result){
            if(result.success){
                openLayer({
                    ele:this,
                    id:result.data.bgd,
                    title : '<i class="glyphicon glyphicon-file" style="padding-right:3px;font-size:12px;"></i>报关单详情',
                    url : "../../../pages/guandan/guandan/xiangqing.html"
                });
            }else{
                layer.msg(result.msg);
            }
        }
    })

};