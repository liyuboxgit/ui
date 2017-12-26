var key = "tzdh";

//关单单测试数据
var gdData = {
    "success": true, 
    "msg": null, 
    "data": { 
        "thisPageElements": [
        	/*
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
    		}*/
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
			// {name: "lc_operTime", label : "发起时间",value:"2017-09-27"}
            {name: "rwbh", label : "任务编号 ",value:""},
            {name: "destinationAreaName", label : "出口国别 ",value:""},
            {name: "serviceType", label : "业务类型 ",value:""},
            {name: "exportPortName", label : "出口口岸 ",value:""},
            {name: "transportMode", label : "运输方式 ",value:""},
            {name: "lc_operName", label : "发起人",value:""},
            {name: "lc_operTime", label : "发起时间",value:""}
		]
	};
	addRenWuInfo(renwuDetail);
    //加载基本信息数据
    //detail(parent.params.rwbh);
    detail("d529b2d31e67463588d1e7e16481dce9");
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
			{name : "发票认证"},
			{name : "申报"},
			{name : "备案"}
		]
	};
	addRenWuInfo(liuCheng);
	
	//添加操作按钮
	addTableHeaderOpration({
		container : "optionBtn",
		btns : [
			{id: "sortOut", content: "归类",className : "glyphicon glyphicon-plus"},
			{id: "choose", content: "选择关单",className : "glyphicon fa fa-file-text-o"}
			
		]
	});

	//货物清单
	var $gdList = $("#gdList");
	
	// 货物清单表头项
	var columns = [
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
                return '<a onclick="lookbgd(\''+row.bgdh+'\');" >'+value+'</a>';
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
			title : '贸易性质',
			field : 'serviceType',
			formatter : function(value,row,index){
				return getDict("serviceType",value);
			}
		}
	];
	
	//查询清单
	queryData({columns:columns,data:gdData,$container:$gdList,height:280});
	// 查询任务下的报关单
	 $.ajax({
		 url : "../../../../lcgdsh/getBaoGuanDanListByRwbh",
		 type : "post",
		 // data : {"rwbh":parent.params.rwbh},
	     data : {"rwbh":"d529b2d31e67463588d1e7e16481dce9"},
	     dataType : "json",
		 success : function(res){
		 console.log(res.data);
		 queryData({columns:columns,data:{success:true,data:{thisPageElements:res.data}},$container:$gdList,height:270});
	 }
	 });
	 

	//查看预录入报关单详情
	$(document).on("click",".lookInfo", function(){
		//var title = popupPreHandler(this,3);
		var title = $(this).attr("title");
		openLayer({
			ele:this,
			id : $(this).attr("key"),
			
			//area : ["80%","98%"],
			title : '<i class="glyphicon glyphicon-file" style="padding-right:3px;font-size:12px;"></i>预录入关单详情【关单号：<font color="red">'+title+'</font>】',
			url : "../../../pages/liucheng/wangwu/yuluru_detail.html"
		});
	});
	
	
	//比对
	$("#contrast").on("click",function(){
		
		compareLoadIndex =  top.layer.load(2);
		setTimeout(function(){
			closeLoad();
			openBiDuiResult();
		},2000);
		
	});

	//查看比对结果
	$(document).on("click",".lookCompareResult",function(){
        top.params = parent.params;

        $.ajax({
            url : "../../../../lcgdsh/checkGuanDanDuiBi",
            type : "post",
            data : {"rwbh":"d529b2d31e67463588d1e7e16481dce9"},
            dataType : "json",
            success : function(res){
                if(!res.success){
                    parent.layer.msg(json.msg);
                    return;
                } else {
                    openBiDui();
                }
            }
        });
	});

	//归类
	$("#sortOut").on("click",function(){
		/*
		openLayer({
			title : false,
			
			area : ["96%","98%"],
			url : "../../pages/liucheng/lisi/classify.html"
		});
		*/
		layer.open({
			//title : "归类",
			type : 2,
			title : false,
			area : ["98%","96%"],
			
			closeBtn : 0,
			content : "../../../pages/liucheng/wangwu/classify.html"
		});
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
	$("#subBtn").bind("click",function(){
		openLayer({
			ele:this,
			title : '提交',
			
			area : ["40%","85%"],
			url : "../../../pages/liucheng/renwu_submit.html",
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
	top.layer.open({
		type : 2,
		title : '商品比对<span style="color:red;font-size:10px">【标红为不一致的项】</span>',
		skin : "myLayui",
		area : ["98%","96%"],
		
		//content : "../../../../static/pages/liucheng/lisi/yuguandan_comparison.html"
		content : "../../pages/liucheng/wangwu/guandan_comparison.html"
	});
}
//打开比对结果
function openBiDui(){
	top.layer.open({
		type : 2,
		title : '商品比对<span style="color:red;font-size:10px">【标红为不一致的项】</span>',
		skin : "myLayui",
		area : ["98%","96%"],
		
		//content : "../../../../static/pages/liucheng/lisi/yuguandan_comparison.html"
		content : "../../pages/liucheng/wangwu/guandan_shenhe_comparison.html"
	});
}
//关闭正在比对中...
function closeLoad(){
	top.layer.close(compareLoadIndex);
}
//查看系统预关单预览
function  lookbgd(bgdh) {
    $.ajax({
        url:'../../../../renwu/queryXtyglxx',
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