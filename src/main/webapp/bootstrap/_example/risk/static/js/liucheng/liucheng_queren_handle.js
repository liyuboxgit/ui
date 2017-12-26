/*
 taskId ：工作流任务ID
 procInstId ：流程实例ID
 current:时间戳
 bussinessId;业务Id
 jggwBm:机构岗位编码
 znDm:职能代码
 */
lcparams={"rwbh":serchParam.bussinessId,"taskId":serchParam.taskId,"procInstId":serchParam.procInstId,"current":serchParam.current,"jggwBm":serchParam.jggwBm,"znDm":serchParam.znDm,"readonly":serchParam.readonly};
// lcparams.rwbh="WM201712070020";
var initGdList = null;
var key = "tzdh";
var kptzd="";
var dqhj="";
// 货物清单表头项
var columns = [
	/*
	{
		align:'center',
		checkbox : true
	},
	*/
	{
		title : '协议ID',
		align:'center',
		field : 'kptzd',
		visible : false
	},
	{
		title : '序号',
		align:'center',
		formatter : function(value,row,index){
			return index + 1;
		}
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
	/*{
		title : '名称',
		field : 'goodsName'
	}, 
	{
		title : '单位',
		field : 'unit'
	}, 
	{
		title : '数量',
		field : 'num'
	}, 
	{
		title : '单价',
		field : 'unitPrice'
	}, 
	{
		title : '金额',
		field : 'amount'
	}, 
	{
		title : '税额',
		field : 'tax'
	}, 
	{
		title : '征税率',
		field : 'taxRate'
	}, 
	{
		title : '退税率',
		field : 'taxRebateRate'
	}, 
	{
		title : '发票凭证号',
		field : 'pznumber'
	}, */
	{
		title : '收票状态',
		field : 'invoiceNumber',
		formatter : function(value,row,index){
			if(value !== null && value !== '')
				return "已收票";
			else
				return "未收票";
		}
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
	// $("#uuid").val(parent.params.rwbh);
    $("#uuid").val(lcparams.rwbh);
	//加载基本信息数据
	//detail(parent.params.rwbh)
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
				if(result.success && result.data){
					$.each(result.data,function(k,v){
						var el = $("span[name='"+k+"']");
						if(el.attr('type'))
							$("span[name='"+k+"']").html(getDict(el.attr('type'),v));
						else
							$("span[name='"+k+"']").html(v);
					});
					dqhj = result.data.dqhj;
                    if(dqhj!="4"){
                        $("#subBtn").attr("disabled", true);
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
			{name : "开票通知",},
			{name : "收票确认",selected: true},
			{name : "发票认证"}
			/*
			{name : "申报"},
			{name : "备案"}
			*/
		]
	};
	addRenWuInfo(liuCheng);
	getEleByKey(liuCheng.container).find("i:last-of-type").hide();
	//货物清单
	var $caigouList = $("#goodsList");
	
	initGdList = function(){
		$.ajax({
			url : "../../../../kptzd/queryKptzdForList",
			data : {"rwbh":lcparams.rwbh},
			// data : {"rwbh":parent.params.rwbh},
			type : "post",
			dataType : "json",
			success : function(res){
				queryData({data:{success:true,data:{thisPageElements:res.data}},$container:$("#goodsList"),queryParams:{},columns:columns,height:260});
			}
			
		});
	}
	
	initGdList();
	//queryData({data:data,$container:$caigouList,height:240});

	//查看通知单详情
	$(document).on("click",".lookInfo", function(){
		//var title = popupPreHandler(this,3);
		var title = $(this).attr("title");
		var qrtz = openLayer({
			ele:this,
			//id : $(this).attr("key"),
			
			//area : ["90%","98%"],
			title : '<i class="glyphicon glyphicon-file" style="padding-right:3px;font-size:12px;"></i>通知单详情【通知单号：<font color="red">'+title+'</font>】',
			url : "../../../pages/liucheng/tianqi/tongZhiDanDetail.html?dqhj="+dqhj
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
			url : '../../../../kptzd/checkBeforeCommit',
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
                    $("#subBtn").attr("disabled", false);
                }
	        }
		});
		
	});
	// 提交流程
	function processCommit() {

		$.ajax({
			url : '../../../../renwu/complete',
			contenType : 'application/json',
	        type : 'POST',
		    data : {
		    	"taskId" : lcparams.taskId,
		    	"procInstId" : lcparams.procInstId,
				"comment" : '',
				"vars" : '',
                "dqhj" :'5', //当前环节
                "rwbh" : lcparams.rwbh
			},
	        success : function(result){
	        	if(result.success){
                	parent.layer.msg(result.msg);

                }else{
                    $("#subBtn").attr("disabled", false);
                	parent.layer.msg(result.msg);
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