$(document).ready(function(){
	//查询表单
	formGenerator({
		container :  "advSearchBox",
		columns : [
			{
				col : "bgdh",
				type : "text",
				label : "关单号"
			},
			{
				col : "serviceType",
				label : "贸易方式",
				type : "select",
				options : getDictsExt("maoyifs")
			},
			{
				col : "exportPort",
				label : "出口口岸",
				type : "select",
				options : getDictsExt("exportPortName") 
			},{
				col : "arrivingCountry",
				label : "抵运国",
				type : "select",
				options : getDictsExt("nation") 
			},{
				col : "fingerPort",
				label : "指运港",
				type : "text"
			},{
				col : "earningsStatus",
				label : "收汇状态",
				type : "select",
				options  : [
                    {text : "请选择", value : ""},
                    {text : "未收汇", value : "0"},
                    {text : "已收汇", value : "1"}
                ]
			},
			{
				col : "expTime",
				label : "出口日期",
				type : "startEndDate",
				dates  : [
					{name : "expTimeStart", text : "开始日期"},
					{name : "expTimeEnd", text : "结束日期"}
				]
			}
		]
	},"query");
	
	//搜索下拉模糊匹配
	setselect2("select[name='serviceType']");
	setselect2("select[name='exportPort']");
	setselect2("select[name='arrivingCountry']");
	
	var $table = $("#table");
	
	var columns = [
		{
			checkbox : true
		},
		{
			title : "序号",
			align:"center",
			formatter : function(value,row,index){ 
				var page = $table.bootstrapTable("getPage");
				var pageSize = page.pageSize,pageNumber = page.pageNumber;
				return page.pageSize*(page.pageNumber-1)+index+1;
			}
		},
		{
			title : "关单id",
			align:"center",
			field : "bgd",
			class : "hide"
		}, 
		{
			title : "关单号",
			align:"center",
			field : "bgdh",
			formatter : function(value,row,index){
				return lookInfoFormatter(value,row,index,20);
			}
		}, 
		{
			title : "出口日期",
			align:"center",
			field : "expTime"
		}, 
		{
			title : "贸易方式",
			align:"left",
			field : "serviceType",
			formatter:function(el){
				return getDict("maoyifs",el);
			}
		}, 
		{
			title : "出口口岸",
			align:"left",
			field : "exportPort",
			formatter:function(el){
				return getDict("exportPortName",el);
			}
		}, 
		{
			title : "抵运国",
			align:"left",
			field : "arrivingCountry",
			formatter:function(el){
				return getDict("nation",el);
			}
		}, 
		{
			title : "指运港",
			align:"left",
			field : "fingerPort"
		},
		/*
		{
			title : "申报状态",
			field : "sbzt",
			align:"center",
			formatter:function(value,row,index){
				if(value=="1"){
					return "待申报";
				}else if (value=="2"){
					return "申报中";
				}else if(value=="3"){
					return "已申报";
				}
			}
		},
		*/
		{
			title : "收汇状态",
			field : "earningsStatus",
			align:"center",
			formatter:function(value,row,index){
				if(value==0) return "未收汇";
				if(value==1) return "已收汇";
				return "";
			}
		},
		/*
		{
			title : "任务编号",
			align:"center",
			field : "rwbh"
		},
		*/
		{
			title : "预警时间",
			align : "center",
			field : "yjsj"
		},
		{
			title : "期限时间",
			align : "center",
			field : "qxsj"
		},
		{
			title : "剩余天数",
			align : "center",
			field : "syts",
			class : "hide"
		},
		
		{
			title : "批次",
			align:"center",
			field : "pc",
			class : "hide"
		},
		
		{
			title : "执行人",
			align:"center",
			field : "zxrid",
			class:"hide"
		},
		{
			title : "执行人名称",
			align:"center",
			field : "zxrname",
			class : "hide"
		},
		{
			title : "创建时间",
			align:"center",
			field : "creatTime",
			class : "hide"
		},
		/*
		{
			title : "是否有效",
			align:"center",
			field : "inactive",
			formatter : function(value,row,index){
				if(value==0)return "无效";
				if(value==1)return "有效";
				return ""
			}
		},
		*/
		{
			title : "状态",
			field:"inactive",
			formatter : function(value,row,index){
				//return ["已","未"][value]+"忽略";
				return '<font color="'+(value=="0"?"red":"green")+'">'+(value=="0"?"已忽略":"未忽略")+'</font>'
			}
		}
	];
	
	/*
	//测试数据
	var data = [ 
		{
			"bgd" : "8f081c751f8145dab6afd2999a6c2897",
			"bgdh" : "021720170000145031",
			"expTime" : "2017-11-29",
			"expTime" : "2017-11-29",
			"serviceType" : "0110",
			"exportPort" : "0124",
			"arrivingCountry" : "502",
			"fingerPort" : "珍珠港",
			"sbzt" : "1",
			"rwbh" : "WM2017112025",
			"earningsStatus" : "0"
		}
	];
	*/
	
	//查询
	$("#thSearchBtn").on("click",function(){
		//queryData({data:{success:true,data:{thisPageElements:data}},$container:$table,columns:columns});
		queryData({url:"../../../../shouHuiYj/findPageByCondition?inactive="+(serchParam.inactive||""),$container:$table,columns:columns});
	}).trigger("click");
	
	//“忽略”按钮事件
	$("#ignore").on("click",function(){
		var selectRows = $table.bootstrapTable("getSelections");
		if(selectRows.length>0){
			ignoreOrrecovery(selectRows,0);
		}else{
			layer.msg("至少要选择一条收汇记录!");
		}
	});
	
	//“恢复”按钮事件
	$("#recovery").on("click",function(){
		var selectRows = $table.bootstrapTable("getSelections");
		if(selectRows.length>0){
			ignoreOrrecovery(selectRows,1);
		}else{
			layer.msg("至少要选择一条供收汇记录!");
		}
	});
	
	//查看详情
	$(document).on("click",".lookInfo", function(){
		openLayer({
			ele:this,
			id : params.bgd,
			title : '<i class="glyphicon glyphicon-file" style="padding-right:3px;font-size:12px;"></i>报关单详情',
			url : "../../../pages/guandan/guandan/xiangqing.html"
		});
	});
	
	//忽略或者恢复
	function ignoreOrrecovery(selectRows,type){
		var title = ["忽略","恢复"][type];
		selectRows = selectRows.map(function(item){return item.shyj+":"+type;}).join(",");
		layer.confirm(
			"确定要"+title+"吗?",
			{btn:["确定"]},
			function(){
				ajaxHelper(
					"../../../../shouHuiYj/edit",
					{param:selectRows},
					function(result){
						layer.msg(result.msg);
						if(result.success){
							$table.bootstrapTable("refresh");
						}
					}
				);
			}
		);
	}
});