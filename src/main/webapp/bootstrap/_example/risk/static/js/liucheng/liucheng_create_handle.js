lcparams={"rwbh":serchParam.rwbh,"xyybgd":serchParam.xyybgd,"jggwBm":serchParam.jggwBm,"znDm":serchParam.znDm,"dqhj":serchParam.dqhj};
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
		},
		width : 36
	},
	{
		title : '物资名称',
		field : 'goodsName',
		formatter: function(value,row,index){
			return labelTrimFormatter(value,row,index,24);
		}
	}, 
	{
		title : '数量',
		field : 'numbers'
	}, 
	{
		title : '规格型号',
		field : 'itemType',
		formatter: function(value,row,index){
			return labelTrimFormatter(value,row,index,8);
		}
		
	}, 
	{
		title : '计量单位',
		field : 'measurementUnit'
	}, 
	{
		title : '单价',
		field : 'price'
	}, 
	{
		title : '总价',
		field : 'total'
	}, 
	{
		title : '供货方',
		field : 'supplier',
		formatter: function(value,row,index){
			return labelTrimFormatter(value,row,index,16);
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
	
	//添加底部流程步骤
	var liuCheng = {
		container : "liuchengtu",
		type : "lct",
		columns : [
			{name : "创建任务"},
			{name : "预关单审核"},
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
	if(lcparams.dqhj<5){
		liuCheng.columns[lcparams.dqhj].selected = true;
	}
	addRenWuInfo(liuCheng);
	getEleByKey(liuCheng.container).find("i:last-of-type").hide();
	//加载基本信息数据
	// detail(parent.params.rwbh)
    detail(lcparams.rwbh);
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
                if(dqhj!="0"){
                    $("#subBtn").attr("disabled", true);
                    $("#export").attr("disabled", true);
				}
			}
		});
	}
	//货物清单
	var $caigouList = $("#goodsList");
	$.ajax({
		url : "../../../../renwu/findHuoWuQingDanList",
		// data : {"rwbh":parent.params.rwbh},
        data : {"rwbh":lcparams.rwbh},
		type : "post",
		dataType : "json",
		success : function(res){
			queryData({data:{success:true,data:{thisPageElements:res.data}},$container:$("#goodsList"),queryParams:{},columns:columns,height:260});
		}
		
	});
	//queryData({data:data,$container:$caigouList,height:240});
	
	//提交
	$("#subBtnWin").bind("click",function(){
		layer.open({
			type : 2,
			title : "提交",
			
			skin : "myLayui",
			area : ["40%","85%"],
			content : "../../../pages/liucheng/renwu_submit.html"
		});
	});
	
	//开始流程
	$("#subBtn").one("click",function(){
        $("#subBtn").attr("disabled", true);
        $("#export").attr("disabled", true);
		if(lcparams.dqhj!="0"){
            parent.layer.msg("当前任务已提交，不能重复提交!");
            return;
		}

		$.ajax({
			url : '../../../../renwu/startActiviti',
			contenType : 'application/json',
	        type : 'POST',
		    data : {
		    	"rwbh" : lcparams.rwbh,
		    	"fklc_Flg" : lcparams.xyybgd
			},
	        success : function(result){
	        	if(result.success){
                	parent.layer.msg(result.msg);
            		parent.layer.close(parent.layer.getFrameIndex(window.name));//成功后关闭页面
                }else{
                	parent.layer.msg(result.msg);
                }
        		parent.refreshTable(); //刷新页面
				// window.location.reload();

            }
		});
	});
	
	
	//驳回处理
	$("#withdraw").on("click",function(){
		 
	});
	
	//导出
	$(document).on("click","#export",function(){
		location.href = "../../../../renwu/rwYBMXExport?rwbh="+lcparams.rwbh;
	});
	
});