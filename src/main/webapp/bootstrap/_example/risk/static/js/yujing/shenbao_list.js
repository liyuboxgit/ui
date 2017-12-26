$(document).ready(function(){
	var columns = [ {
		field : 'state',
		checkbox : true
	}, {
		title : '报关单',
		align:"center",
		field : 'bgdh',
		formatter : function(value,row,index){
			return lookInfoFormatter(value,row,index,20);
		}
	}, {
		title : "出口日期",
		align:"center",
		field : "exptime"
	}, {
		title : "贸易方式",
		align:"center",
		field : "myfs",
		formatter:function(el){
			return getDict("maoyifs",el);
		}
	}, {
		title : "出口口岸",
		align:"left",
		field : "expport",
		formatter:function(el){
			return getDict("exportPortName",el);
		}
	}, {
		title : "抵运国",
		align:"left",
		field : "toguo",
		formatter:function(el){
			return getDict("nation",el);
		}
	}, {
		title : "指运港",
		align:"left",
		field : "togang"
	},{
		title : '操作时间',
		align:"center",
		field : 'createTime'
	}, {
		title : '剩余时间',
		field : 'sysj',
		formatter : function(value,row,index){
			return value+'天';
		}
	}, {
		title : '说明',
		field : 'bz'
	}, {
		title : '忽略',
		field : 'inactive',
		formatter : function(value,row,index){
			return value==1?'正常提醒':'<span style="color:red;">已忽略</span>'
		}
	}];

	
	
	formGenerator({
		container :  "advSearchBox",
		columns : [
			{
				col : "bgdh",
				type : "text",
				label : "关单号"
			},
			{
				col : "myfs",
				label : "贸易方式",
				type : "select",
				options : getDictsExt("maoyifs")
			},
			{
				col : "expport",
				label : "出口口岸",
				type : "select",
				options : getDictsExt("exportPortName") 
			},{
				col : "toguo",
				label : "抵运国",
				type : "select",
				options : getDictsExt("nation") 
			},{
				col : "togang",
				label : "指运港",
				type : "text"
			}
		]
	},"query");
	
	//搜索下拉模糊匹配
	setselect2("select[name='myfs']");
	setselect2("select[name='expport']");
	setselect2("select[name='toguo']");
	
	$("#thSearchBtn").on("click",function(){
		if(serchParam.inactive){			
			queryData({url:"../../../../shenBaoYj/findPage?inactive="+(serchParam.inactive),$container:$("#table"),columns:columns})
		}else{
			queryData({url:"../../../../shenBaoYj/findPage",$container:$("#table"),columns:columns})
		}
		
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
	
	//忽略或者恢复
	function ignoreOrrecovery(selectRows,type){
		var title = ["忽略","恢复"][type];
		selectRows = selectRows.map(function(item){return item.sbyj+":"+type;}).join(",");
		layer.confirm(
			"确定要"+title+"吗?",
			{btn:["确定"]},
			function(){
				ajaxHelper(
					"../../../../shenBaoYj/edit",
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
	
	//查看详情
	$(document).on("click",".lookInfo", function(){
		openLayer({
			ele:this,
			id : params.bgd,
			title : '<i class="glyphicon glyphicon-file" style="padding-right:3px;font-size:12px;"></i>报关单详情',
			url : "../../../pages/guandan/guandan/xiangqing.html"
		});
	});
});