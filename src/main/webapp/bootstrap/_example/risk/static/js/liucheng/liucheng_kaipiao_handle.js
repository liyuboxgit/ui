/*
 taskId ：工作流任务ID
 procInstId ：流程实例ID
 current:时间戳
 bussinessId;业务Id
 jggwBm:机构岗位编码
 znDm:职能代码
 */
// lcparams={"rwbh":serchParam.rwbh,"taskId":serchParam.taskId,"procInstId":serchParam.procInstId,"current":serchParam.current,"jggwBm":serchParam.jggwBm,"znDm":serchParam.znDm};
lcparams={"rwbh":serchParam.bussinessId,"taskId":serchParam.taskId,"procInstId":serchParam.procInstId,"current":serchParam.current,"jggwBm":serchParam.jggwBm,"znDm":serchParam.znDm,"readonly":serchParam.readonly};
// lcparams.rwbh="WM201712040073"
var key = "tzdh";
var initGdList = null; //初始化列表
var updateRowIndex = ""; //选择海关要更新的行
$(function(){
	//任务详情信息
	var renwuDetail = {
		container : "renwuBaseInfo",
		type : "detail",
		columns : [
			{name: "rwbh", label : "任务编号 "},
            {name: "taskName", label : "任务名称 "},
			{name: "destinationAreaName", label : "出口国别 "},
			{name: "serviceType", label : "贸易方式"},
			{name: "exportPortName", label : "出口口岸 "},
			{name: "transportMode", label : "运输方式 "},
			{name: "createName", label : "发起人"},
			{name: "createTime", label : "发起时间"}
		]
	};
	addRenWuInfo(renwuDetail);
    detail(lcparams.rwbh);
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
	                    $("span[name='"+k+"']").html(v);
	                });
                    var dqhj = result.data.dqhj;
                    if(dqhj!="3"){
                        $("#subBtn").attr("disabled", true);
                        $("#optionsBtn button").attr("disabled",true);

                        // $("#choose").attr("changeQuota", true).off("click");//修改限额生成开票通知单
                        // $("#contrast").attr("export", true).off("click");//导出
                    }
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
			{name : "报关单审核"},
			{name : "开票通知", selected: true},
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
	//添加修改限额操作按钮
	addTableHeaderOpration({
		container : "optionsBtn",
		btns : [
			{id: "changeQuota", content: "修改限额生成开票通知单",className : "glyphicon glyphicon-edit"},
			{id: "export", content: "导出", className : "glyphicon glyphicon-export"}
		],
        type : "button"
    });
	
	//货物清单
	var $gdList = $("#gdList");
	
	//下载
	$(document).on("click","#export",function(){
	    var allTableData = $gdList.bootstrapTable('getData');//获取表格的所有内容行 
		var datalist = [];
		allTableData.forEach(function(i, j) {
			datalist.push(i.kptzd);
		});
//		allTableData.map(function(item){
//			return item.kptzd;
//		});
		
//		alert(datalist)
		/*
		selectRows.forEach(function(i, j) {
			datalist.push(i.kptzd);
		});
		*/
		/*selectRows.map(function(item) {
			datalist.push(item.kptzd);
			alert(item.kptzd);
		});*/
		if (datalist.length>0) {
			//location.href = "../../../../kaipiaotzd/download?kptzd="+selectKey;
			location.href = "../../../../kaipiaotzd/download?params="+datalist;
		}else {
			layer.msg("请选择一条数据进行导出!");
		}
		
		
	})
	
	
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
			title : '任务编码',
			field : 'rwbh',
			//formatter : labelTrimFormatter
			formatter : function(value,row,index){
				var title = value;
				if(value){
					if(value.length>18){
						value = value.substr(0,18) + "...";
					}
				}
				return '<span title="'+title+'">'+value+'</span>';
			}
		},
		{
			title : '关单号',
			field : 'bgdh'
		}, 
		{
			title : '纳税人识别号',
			field : 'sellerTaxpayerIdentity'
		},
		{
			title : '供货商',
			field : 'seller'
		}, 
		{
			title : '通知单号',
			field : 'kptzdbm',
			formatter: lookInfoFormatter
		},
		{
			title : '通知单',
			field : 'kptzd',
			visible : false
		}
//		{
//			title : '单位',
//			field : 'danwei'
//		},
//		{
//			title : '数量',
//			field : 'danwei'
//		},
//		{
//			title : '单价',
//			field : 'oneMoney'
//		}, 
//		{
//			title : '金额',
//			field : 'totalMoney'
//		}, 
//		{
//			title : '征税率',
//			field : 'totalMoney'
//		}, 
//		{
//			title : '税额',
//			field : 'totalMoney'
//		}, 
//		{
//			title : '退税率',
//			field : 'totalMoney'
//		}
	];
	
	//查询清单
	// queryData({columns:columns,url:"../../../../kptzd/queryKptzdForList",$container:$gdList,height:280});
	
	
	initGdList = function(){
	    $.ajax({
	        url : "../../../../kptzd/queryKptzdForList",
	        type : "post",
	        // data : {"rwbh":"d529b2d31e67463588d1e7e16481dce9"},
	        data : {"rwbh":lcparams.rwbh},
	        dataType : "json",
	        success : function(res){
	            //console.log(res.data);
	            queryData({columns:columns,data:{success:true,data:{thisPageElements:res.data}},$container:$gdList,height:415});
	        }
	    });
	}
	
	initGdList();
	
    //查看通知单详情
	$(document).on("click",".lookInfo", function(){
		//var title = popupPreHandler(this,3);
		var title = $(this).attr("title");
		openLayer({
			ele:this,
			id : $(this).attr("key"),
			
			//area : ["90%","98%"],
			title : '<i class="glyphicon glyphicon-file" style="padding-right:3px;font-size:12px;"></i>通知单详情【通知单号：<font color="red">'+title+'</font>】',
			url : "../../../pages/liucheng/zhaoliu/tongZhiDanDetail.html"
		});
	});
	
	//修改限额
	$(document).on("click","#changeQuota",function(){
		// params = parent.params;
		layer.open({
			type : 2,	
			title : false,
			
			closeBtn : 0,
			area : ["98%","96%"],
			content : "../../../pages/liucheng/zhaoliu/changeQuota.html?tempTime="+new Date().getTime()
		});
	});
	
	/*$(document).on("click","#changeQuota",function(){
		layer.open({
			type : 1,
			title : false,
			closeBtn : 0,
			
			area : ["60%","60%"],
			content : $("#chageQuotaBox")
		});
	});*/
	
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
        $("#optionsBtn button").attr("disabled",true);

        // $("#choose").attr("changeQuota", true).off("click");//修改限额生成开票通知单
        // $("#contrast").attr("export", true).off("click");//导出
		$.ajax({
			url : '../../../../renwu/complete',
			contenType : 'application/json',
	        type : 'POST',
		    data : {
		    	"taskId" : lcparams.taskId,
		    	"procInstId" : lcparams.procInstId,
				"comment" : '',
				"vars" : '',
                "dqhj" :'4', //当前环节
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
	});
	
	//驳回处理
	$("#withdraw").on("click",function(){
		 
	});
	
	
	//////////////////////////////////////////////////报关单明细项开始//////////////////////////////////////////////////
	var $classifyedTable = $("#classifyedTable");
	var goodsCode="";
	var expTime="";
	var classifyedColumns = [
		{
			title : "序号",
			align : "center",
			formatter : function(value,row,index){
				return index +1;
			}
		},
		{
			title : "商品编码",
			field : "goodsCode"
		},
		{
			title : "商品名称、规格型号",
			//field:"goodsName",
			formatter : function(value,row,index){
				value = row.goodsName + "," + row.specificationModel;
				var title = value;
				var text = value;
				if(text && text.length>40){
					text = text.substring(0,40)+"...";
				}
				return '<span title="'+title+'">'+text+'</span>';
			}
		},
		{
			title : "数量",
			field : "legalNum"
		},
		{
			title : "单位",
			field : "legalUnit"
		},
		{
			title : "单价",
			field : "unitPrice"
		},
		{
			title : "总价",
			field : "totalPrice"
		},
		{
			title : "币制",
			field : "currency",
			formatter:function(value,row,index){
				return getDict("currency",value);
			}
		},
		{
			title : "征免",
			field : "exempt"
		},
		{
			title : "出口日期",
			field : "expTime"
		},
		{
			title : "选择",
			formatter : function(value,row,index){
				//return '<p class="text-center" style="margin-bottom:0"><a href="javascript:void(0);" class="text-info rowUpdate" key="'+row.goodsCode+'">修改</a><a style="margin-left:5px;"  href="javascript:void(0);" class="text-info rowDelete" key="'+row.goodsCode+'">删除</a></p>';
				//return '<p class="text-center" style="margin-bottom:0"><a  href="javascript:void(0);" class="text-info rowDelete" key="'+row.goodsCode+'" ckhws="'+row.ckhw+'" onclick="deleteClassify(this);">删除</a></p>';
				return '<p class="text-center" style="margin-bottom:0"><a  href="javascript:void(0);" data-index="'+index+'" class="text-info chooseHg">选择</a></p>';
			}
		}
	];
	
	//queryData({$container:$classifyedTable,columns:classifyedColumns,data:{data:{thisPageElements:result.data}},height:186,pagination:false,uniqueId:"goodsCode"});
	/*$.getJSON("../../../data/classify.json",function(result){
		//queryData({$container:$classifyedTable,columns:classifyedColumns,data:{data:{thisPageElements:[]}},height:186,pagination:false,uniqueId:"goodsCode"});
		queryData({$container:$classifyedTable,columns:classifyedColumns,data:result,height:232,pagination:false,uniqueId:"goodsCode"});
	});*/
	
	//查询是否存在多条海关代码库
	checkMultiterm = function(){
	    $.ajax({
	        url : "../../../../kptzd/findBaoGuanDanMingxi",
	        type : "post",
	        data : {"rwbh":lcparams.rwbh},
	        dataType : "json",
	        success : function(res){
	        	if($.isArray(res.data) && res.data.length>0){
	        		queryData({columns:classifyedColumns,data:{success:true,data:{thisPageElements:res.data}},$container:$classifyedTable,height:232,pagination:false,uniqueId:"goodsCode"});
	        	}
	        }
	    });
	}
	// 含扩展码人工干预的处理不需要，因为前续环节已经可以控制商品编码在海关代码库是唯一的
	//只有代理才走这个方法。
//	if("WM"==lcparams.rwbh.substring(0,2)){
//        checkMultiterm();
//	}

	//选择海关
	$(document).on("click",".chooseHg",function(){
		updateRowIndex = parseInt($(this).attr("data-index"));
		//alert(index);
		layer.open({
			type : 2,	
			title : false,
			
			closeBtn : 0,
			area : ["98%","96%"],
			content : "../../../pages/liucheng/zhaoliu/kaipiao_spdmk.html?tempTime="+new Date().getTime()
		});
	});
	
	//是否全部匹配事件
	$("#chooseBtn").on("click",function(e){
		var flag = true;
		var td = $("#classifyedTable").find("tbody tr td");
		for(var i=0; i<td.length; i++){
			if(!$(td[i]).hasClass("bg-danger")){
				flag = false;
				break;
			}
		}
		if(flag){
			//全部匹配
		}else{
			//没有全部匹配
		}
		
	});
	//////////////////////////////////////////////////报关单明细项结束//////////////////////////////////////////////////
	//刷新按钮
	$(document).on("click",".pagination-detail button[name='refresh']",function(){
		initGdList();
	});
	
	var readonly = lcparams.readonly ? $.trim(lcparams.readonly) : "false";
	if(readonly==="true"){
		//$("#optionsBtn").hide();
		$("#optionsBtn,#subBtn").hide();
	}
})