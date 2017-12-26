$(function() {
// 任务详情信息
var infos = [ 
	{
		name : "任务编号",
		value : 'rwbh'
	}, 
	{
		name : "出口国别",
		value : 'destinationAreaName',
		type:"nation"
	}, 
	{
		name : "业务类型",
		value : 'serviceType',
		type:"serviceType"
	}, 
	{
		name : "出口口岸",
		value : 'exportPortName',
		type:"exportPortName"
	},
	{
		name : "运输方式",
		value : 'transportMode',
		type:"transportMode"
	},
//	{
//		name : "当前环节",
//		value : 'dqhj'
//	},
	{
		name : "发起人",
		value : 'createName',
		type:"createName"
	},
	{
		name : "发起时间",
		value : 'createTime',
	    type:"createTime"
	}
];
	
// 货物清单数据
var columns = [ 
	{
		title : '物资名称',
		field : 'goodsName'
	}, 
	{
		title : '数量',
		field : 'numbers'
	}, 
	{
		title : '规格型号',
		field : 'itemType'
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
		field : 'supplier'
	}
];



//历史操作数据
var hisColumns = [ 
	{
		title : '发起人',
		field : 'createName'
	}, 
	{
		title : '历史操作',
		field : 'lscz'
	}, 
	{
		title : '发起时间',
		field : 'createTime'
	}, 
	{
		title : '说明',
		field : 'sm'
	}
];
	
//历史操作人	
var chisData = [ 
	{
		"lscz" : "创建任务",
		"czName" : "张三",
		"czTime" : "2017-09-27",
		"sm" : ""
	},
	{
		"lscz" : "预关单审核",
		"czName" : "李四",
		"czTime" : "2017-09-27",
		"sm" : ""
	}, 
	{
		"lscz" : "关单审核",
		"czName" : "王五",
		"czTime" : "2017-09-27",
		"sm" : ""
	}, 
	{
		"lscz" : "开票通知",
		"czName" : "赵六",
		"czTime" : "2017-09-27",
		"sm" : ""
	}, 
	{
		"lscz" : "收票确认",
		"czName" : "田七",
		"czTime" : "2017-09-27",
		"sm" : ""
	}, 
	{
		"lscz" : "发票认证",
		"czName" : "钱八",
		"czTime" : "2017-09-27",
		"sm" : ""
	}
];

	//
	var username = sessionStorage.getItem('name');
	
	switch(username){
		case "张三":
			infos[5]["value"] = "预关单审核";
			infos[6]["value"] = "李四";
			//chisData = chisData.slice(0,1);
			break;
		case "李四":
			infos[5]["value"] = "预关单审核";
			infos[6]["value"] = "李四";
			//chisData = chisData.slice(0,1);
			break;
		case "王五":
			infos[5]["value"] = "关单审核";
			infos[6]["value"] = "王五";
			//chisData = chisData.slice(0,2);
			break;
		case "赵六":
			infos[5]["value"] = "开票通知";
			infos[6]["value"] = "赵六";
			chisData = chisData.slice(0,3);
			break;
		case "田七":
			infos[5]["value"] = "收票确认";
			infos[6]["value"] = "田七";
			//chisData = chisData.slice(0,4);
			break;
		case "钱八":
			infos[5]["value"] = "发票认证";
			infos[6]["value"] = "钱八";
			//chisData = chisData.slice(0,5);
			break;
		default:
			break;
	
	}
	
	//任务详情添加
	initDetailInfo({
		id : "info",
		elems : infos
	});
	
	//$("#uuidd").val(parent.params.rwbh);
	//基本信息
	detail(parent.params.rwbh);
	function detail(uuid){
		// 请求详情
		$.ajax({
			type : "post",
			dataType : "json",
			url : "../../../renwu/selectByPrimaryKey",
	        data:{
	        	"rwbh":uuid,
	        },
			success : function(result){
				$.each(result.data,function(k,v){
					
					var ele = $("#"+k);
					if(ele.attr("type")){
						$('#'+k).html(getDict(ele.attr("type"),v));
					}else{
						$('#'+k).html(v);
					}
				});
			}
		});
	}
	
	//货物清单
	$.ajax({
		url : "../../../renwu/findHuoWuQingDanList",
		data : {"rwbh":parent.params.rwbh},
		type : "post",
		dataType : "json",
		success : function(res){
			queryData({data:{success:true,data:{thisPageElements:res.data}},$container:$("#tableList"),queryParams:{},columns:columns,height:300});
		}
		
	});
	
	// 货物清单
	//queryData({url:'../../../../renwu/selectByPrimaryKey?rwbhUuid='+parent.params.rwbh, $container:$("#tableList"),height:204});

	// 历史记录
	//queryData({data:hisData,columns:hisColumns,$container:$("#historyList"),height:204});

});
