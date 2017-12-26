$(document).ready(function(){
	//查询表单
	formGenerator({
		container :  "advSearchBox",
		columns : [
			{
				col : "ghsmc",
				type : "text",
				label : "供货商名称"
			},
			{
				col : "taxCreditRating",
				label : "风险评估等级",
				type : "select",
				options:[
                    {
                        value:"",text:"请选择"
                    },
                    {
                        value:"1",text:">=60",selected:true
                    },
                    {
                    	value:"2",text:"<60"
                    },
                    {
                        value:"3",text:"60-70"
                    },
                    {
                        value:"4",text:"70-80"
                    },
                    {
                        value:"5",text:"80-90"
                    },
                    {
                        value:"6",text:"90-100"
                    }
                ]
			},
			{
				col : "payTaxesCreditRating",
				label : "纳税信用等级",
				type : "select",
				options:getDictsExt("nsxydj")
			},
			{
				col : "insideCreditRating",
				label : "内部信用等级",
				type : "select",
				options:getDictsExt("nbpgdj")
			}
		]
	},"query");
	
	var $table = $("#table");
	
	var columns = [ 
		{
			checkbox : true
		},
		{
			title : "供货商预警",
			field : "ghsyj",
			class : "hide"
		}, 
		{
			title : "供货商ID",
			field : "ghsid",
			class : "hide"
		}, 
		{
			title : "供货商名称",
			field : "ghsmc",
			formatter : function(value,row,index){
				return lookInfoFormatter(value,row,index,20);
			}
		},
		{
			title : "风险评估等级",
			align:"center",
			field : "taxCreditRating"
		}, 
		{
			title : "纳税信用等级",
			align:"center",
			field : "payTaxesCreditRating"
		}, 
		{
			title : "内部信用等级",
			align:"center",
			field : "insideCreditRating",
			formatter : function(value,row,index){
				if(value==1) return "白";
				if(value==2) return "黑";
				if(value==2) return "灰";
				return "";
			}
		},
		{
			title : "预警配置",
			align:"center",
			field : "yjconf",
			class:"hide"
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
			title : "预警时间",
			align:"center",
			field : "createTime"
			//class : "hide"
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
		{
			title : "备注",
			align:"center",
			field : "remarks"
		}
		*/
	];
	
	/*
	//测试数据
	var data = [ 
		{
			"ghsmc" : "创立信电子厂",
			"ghsyj" : "预警1",
			"ghsid" : "1",
			
			"payTaxesCreditRating" : "B",
			"insideCreditRating" : "B",
			"taxCreditRating" : "小于60",
			"yjconf" : "预警配置",
			"pc" : "批次5",
			"zxrid" : "001",
			"zxrname" : "张三",
			"creatTime" : "2017-11-29",
			"inactive" : "是",
			"remarks" : "备注"
		}
	];
	*/
	
	//查询
	$("#thSearchBtn").on("click",function(){
		//queryData({data:{success:true,data:{thisPageElements:data}},$container:$table,columns:columns});
		queryData({url:"../../../../gongHuoShangYj/findPageByCondition?inactive="+(serchParam.inactive||""),$container:$table,columns:columns});
	}).trigger("click");
	
	//“忽略”按钮事件
	$("#ignore").on("click",function(){
		var selectRows = $table.bootstrapTable("getSelections");
		if(selectRows.length>0){
			/*
			selectRows = selectRows.map(function(item){return item.ghsyj;}).join(":0,");
			layer.confirm(
				"确定要忽略吗?",
				{btn:["确定"]},
				function(){
					ajaxHelper(
						"../../../../gongHuoShangYj/",
						{ghsyjs:selectrows},
						function(result){
							layer.msg("result.msg");
						}
					);
				}
			);
			*/
			ignoreOrrecovery(selectRows,0);
		}else{
			layer.msg("至少要选择一条供应商记录!");
		}
	});
	
	//“恢复”按钮事件
	$("#recovery").on("click",function(){
		var selectRows = $table.bootstrapTable("getSelections");
		if(selectRows.length>0){
			ignoreOrrecovery(selectRows,1);
		}else{
			layer.msg("至少要选择一条供应商记录!");
		}
	});
	
	//查看详情
	$(document).on("click", ".lookInfo", function() {
		params.uuid = params.ghsid;
        layer.open({
            type : 2,
            skin : 'myLayui', // 样式类名
            title : '<i class="glyphicon glyphicon-pencil" style="padding-right:3px;font-size:12px;"></i>查看供货商信息【供货商名称：<font color="red">'+params.ghsmc+'</font>】',
            area : [ "98%", "96%" ],
            content : "../../../pages/ruzhu/add.html?editflag=detail&branch=0&tempTime="+new Date().getTime()
        });
	});
	
	//忽略或者恢复
	function ignoreOrrecovery(selectRows,type){
		var title = ["忽略","恢复"][type];
		selectRows = selectRows.map(function(item){return item.ghsyj+":"+type;}).join(",");
		layer.confirm(
			"确定要"+title+"吗?",
			{btn:["确定"]},
			function(){
				ajaxHelper(
					"../../../../gongHuoShangYj/edit",
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