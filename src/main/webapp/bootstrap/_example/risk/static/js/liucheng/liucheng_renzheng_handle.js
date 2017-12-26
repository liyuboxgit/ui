/*
 taskId ：工作流任务ID
 procInstId ：流程实例ID
 current:时间戳
 bussinessId;业务Id
 jggwBm:机构岗位编码
 znDm:职能代码
 */
lcparams={"rwbh":serchParam.bussinessId,"taskId":serchParam.taskId,"procInstId":serchParam.procInstId,"current":serchParam.current,"jggwBm":serchParam.jggwBm,"znDm":serchParam.znDm,"readonly":serchParam.readonly};
// lcparams.rwbh = 'WM201712020064'
var key = "tzdh";
var initList = null;
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
			var page = $table.bootstrapTable("getPage");
			var pageSize = page.pageSize,pageNumber = page.pageNumber;
			return page.pageSize*(page.pageNumber-1)+index+1;
			*/
		}
	},{
		title : 'uuid',
		field : 'fp',
		visible : false
	},
	{
		title : '供货商',
		field : 'seller',
//		formatter: lookInfoFormatter
		formatter : function(value,row,index){
			return labelTrimFormatter(value,row,index,10);
		}	
	}, 
//	{
//		title : '通知单号',
//		field : 'kptzdbm'
//	}, 
	{
		title : '发票代码',
		field : 'invoiceCode'
	}, 
	{
		title : '发票号码',
		field : 'invoiceNumber'
	}, 
	{
		title : '销方纳税人识别号',
		field : 'sellerTaxpayerIdentity'
	}, 
	{
		title : '购方纳税人识别号',
		field : 'buyerTaxpayerIdentity'
	}, 
	{
		title : '金额',
		field : 'invoiceValue'
	}, 
	{
		title : '开票日期',
		field : 'billingDate'
	}, 
	{
		title : '认证状态',
		field : 'rzzt',
		align : 'center',
		formatter: examineStatusFormatter
	},{
		title : '是否异常发票',
		field : 'abnormal',
		align : 'center',
		visible : false
	},
	{
		title : '发票状态',
		field : 'ycfp',
		align : 'center'
//		visible : false
	},
	{
		title : '认证日期',
		field : 'certificationDate'
	},
	{
        title : '发票核实',
        field : 'fphs',
        align : 'center',
        formatter: fphsStatusFormatter
    }
];

$(function(){
	
	//任务详情信息
	var renwuDetail = {
		container : "renwuBaseInfo",
		type : "detail",
		columns : [
			{name: "rwbh", label : "任务编号 "},
            {name: "taskName", label : "任务名称 "},
			{name: "destinationAreaName", label : "出口国别 ", type:"nation"},
			{name: "serviceType", label : "贸易方式 ", type:"maoyifs"},
			{name: "exportPortName", label : "出口口岸 ", type:"exportPortName"},
			{name: "transportMode", label : "运输方式 ", type:"transportMode"},
			{name: "createName", label : "发起人"},
			{name: "createTime", label : "发起时间"}
		]
	};
	addRenWuInfo(renwuDetail);
	
	//添加底部流程步骤
	var liuCheng = {
		container : "liuchengtu",
		type : "lct",
		columns : [
			{name : "创建任务"},
			{name : "预关单认证"},
			{name : "报关单认证"},
			{name : "开票通知",},
			{name : "收票确认"},
			{name : "发票认证", selected: true}
			/*
			{name : "申报"},
			{name : "备案"}
			*/
		]
	};
	addRenWuInfo(liuCheng);
	getEleByKey(liuCheng.container).find("i:last-of-type").hide();
	detail(lcparams.rwbh)
	function detail(uuid){
		// 请求详情
		$.ajax({
			type : "post",
			dataType : "json",
			url : "../../../../renwu/selectByPrimaryKey",
	        data:{
	        	"rwbh":uuid,
	        },
			success : function(result){
				$.each(result.data,function(k,v){
					var el = $("span[name='"+k+"']");
					if(el.attr('type'))
						$("span[name='"+k+"']").html(getDict(el.attr('type'),v));
					else
						$("span[name='"+k+"']").html(v);
				});
                var dqhj = result.data.dqhj;
                if(dqhj!="5"){
                    $("#subBtn").attr("disabled", true);
                }
			}
		});
	}
	
	//货物清单
	var $table = $("#table");
	
	initList = function(){
		$.ajax({
			url : "../../../../renwu/queryRenZhengFaPiao",
			data : {"rwbh":lcparams.rwbh},
			// data : {"rwbh":parent.params.rwbh},
			type : "post",
			dataType : "json",
			success : function(res){
				queryData({data:{success:true,data:{thisPageElements:res.data}},$container:$table,queryParams:{},columns:columns,height:260,pageSize:5,pageList:[5,10]});
			}
			
		});
	}
	
	initList();
	//queryData({data:data,$container:$caigouList,height:240});

	//查看通知单详情
	$(document).on("click",".lookInfo", function(){
		//var title = popupPreHandler(this,3);
		var title = $(this).attr("title");
		openLayer({
			ele:this,
			id : $(this).attr("key"),
			
			//area : ["80%","98%"],
			title : '<i class="glyphicon glyphicon-file" style="padding-right:3px;font-size:12px;"></i>通知单详情【通知单号：<font color="red">'+title+'</font>】',
			url : "../../../pages/liucheng/zhaoliu/tongZhiDanDetail.html"
		});
	});
	//提交
	/*$("#subBtn").bind("click",function(){
		openLayer({
			ele:this,
			title : '提交',
			
			area : ["40%","85%"],
			url : "../../../pages/liucheng/renwu_submit.html",
		});
	});*/

	
	//开始流程
	$("#subBtn").bind("click",function(){
        $("#subBtn").attr("disabled", true);
        $.ajax({
			url : '../../../../kptzd/checkBeforeRzCommit',
			contenType : 'application/json',
	        type : 'POST',
		    data : {
                "rwbh" : lcparams.rwbh
			},
	        success : function(result){
	        	if(result.success){
	        		processCommit();
                }else{
                	parent.layer.msg(result.msg);
                    // window.location.reload();
                    $("#subBtn").attr("disabled", false);

                }
//        		parent.layer.close(parent.layer.getFrameIndex(window.name));//成功后关闭页面
//        		parent.refreshTable(); //刷新页面
	        }
		});
	});
	
	function processCommit(){

		$.ajax({
			url : '../../../../renwu/complete',
			contenType : 'application/json',
	        type : 'POST',
		    data : {
		    	"taskId" : lcparams.taskId,
		    	"procInstId" : lcparams.procInstId,
				"comment" : '',
				"vars" : '',
                "dqhj" :'6', //当前环节
                "rwbh" : lcparams.rwbh
			},
	        success : function(result){
	        	if(result.success){
                	parent.layer.msg(result.msg);
                }else{
                	parent.layer.msg(result.msg);
                    $("#subBtn").attr("disabled", false);
                }
        		parent.layer.close(parent.layer.getFrameIndex(window.name));//成功后关闭页面
        		// parent.refreshTable(); //刷新页面
                // window.location.reload();
	        }
		});
		
	}
	
	//驳回处理
	$("#withdraw").on("click",function(){
		 
	});
	
	var readonly = lcparams.readonly ? $.trim(lcparams.readonly) : "false";
	if(readonly==="true"){
		//$("#optionsBtn").hide();
		$("#subBtn").hide();
	}

});
	function examineStatusFormatter(value,row,index){
		var abnormal = row.abnormal;
		var title = "",className = "";
		if(value=="2"||abnormal=="1"){
			title = "认证未通过";
			className = "fa-times-circle text-danger";
		}else if(value=="1"&&abnormal=="0"){
			title = "认证已通过";
			className = "fa-check-circle-o text-success";
		}else{
			title = "未认证";
			className = "fa-question-circle-o text-warning";
		}
		return '<a href="javascript:;"><span onclick="renzheng(\''+value+'\',\''+abnormal+'\')"><i title="'+title+'" class="fa '+className+'"></i></span></a>';
	}

	function renzheng(rzzt,abnormal){
	    openLayer({
	        ele:this,
	        title : '<i class="glyphicon glyphicon-plus" style="padding-right:3px;font-size:12px;"></i>认证',
	        area :  [ "40%", "70%" ],
	        url : "../../../pages/liucheng/qianba/renzheng.html?rzzt="+rzzt+"&abnormal="+abnormal,
	    });
	}
	function fphsStatusFormatter(value,row,index){
		if(value=="1"){
            title = "发票核实一致";
            className = "fa-check-circle-o text-success";
            return '<a href="javascript:;"><span><i title="'+title+'" class="fa '+className+'"></i></span></a>';

        }
        // // else if(value=="0"){
        else {
            title = "发票核实不一致";
            className = "fa-times-circle text-danger";
            return '<a href="javascript:;"><span onclick="fphs(\''+value+'\')"><i title="'+title+'" class="fa '+className+'"></i></span></a>';
        }

    }
    function fphs(fphszt){
        openLayer({
            ele:this,
            title : '<i class="glyphicon glyphicon-plus" style="padding-right:3px;font-size:12px;"></i>认证',
            url : "../../../pages/liucheng/qianba/tongZhiDanDetail.html?rzzt="+fphszt,
        });
	}