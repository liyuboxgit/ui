$(function(){
	//箱单
	var $xiangDanTable = $("#xiangDanTable");
	
	//预关单
	var infos = [ 
		{
			name : "出口口岸",
			value : parent.params.number
		}, 
		{
			name : "备案号",
			value : "contractCode"
		}, 
		{
			name : "申报日期",
			value : "serviceType"
		}, 
		{
			name : "经营单位",
			value : "signDate"
		}, 
		{
			name : "运输方式",
			value : "beginDate"
		}, 
		{
			name : "运输工具",
			value : "currency"
		}, 
		{
			name : "提运单号",
			value : "contractAmount"
		}, 
		{
			name : "发货单位",
			value : "checkoutMode"
		}, 
		{
			name : "贸易方式",
			value : "dealMode"
		}, 
		{
			name : "征免性质",
			value : "transportMode"
		}, 
		
		{
			name : "许可证号",
			value : "exportCountry"
		}, 
		{
			name : "抵运国（地区）",
			value : "exportPort"
		}, 
		{
			name : "指运港",
			value : "arrivingCountry"
		}, 
		{
			name : "境内货源地",
			value : "fingerPort"
		}, 
		{
			name : "批准文号",
			value : "approvalNumber"
		}, 
		{
			name : "成交方式",
			value : "operatingUnit"
		}, 
		{
			name : "运费",
			value : "licenseKey"
		}, 
		{
			name : "保费",
			value : "shipmentTime"
		}, 
		{
			name : "杂费",
			value : "forwardUnitCode"
		}, 
		{
			name : "合同协议号",
			value : "forwardUnit"
		}, 
		{
			name : "件数",
			value : "totalMaterial"
		}, 
		{
			name : "包装种类",
			value : "gqqsrq"
		}, 
		{
			name : "毛重（kg）",
			value : "gqjsrq"
		}, 
		{
			name : "净重（kg）",
			value : "gq"
		}, 
		{
			name : "集装箱号",
			value : "drawbackIs"
		},
		{
			name : "随附单据",
			value : "drawbackIs"
		}, 
		{
			name : "生产厂家",
			value : "drawbackIs"
		},
		{
			name : "标记码及备注",
			value : "任务编号："+parent.lcparams.rwbh
		}

	];
	
	//预关单详情添加
	initDetailInfo({
		id : "info",
		elems : infos
	});
	//项号	商品编码	商品名称、规格型号	数量	单位	最终目的国	单价	总价	币制	征免
	//箱单标题
	var xiangDanColumns = [
		{
			title : '序号',
			align:'center',
			formatter : function(value,row,index){ 
				/*
				var page = $table.bootstrapTable("getPage");
				var pageSize = page.pageSize,pageNumber = page.pageNumber;
				return page.pageSize*(page.pageNumber-1)+index+1;
				*/
				return index+1;
			}
		},
		{
			title : "商品编码",
			field : "spbm"
		},
		{
			title : "商品名称、规格型号",
			field : "guige"
		},
		{
			title : "数量",
			field : "number"
		},
		{
			title : "单位",
			field : "danwei"
		},
		{
			title : "最终目的国",
			field : "mdg"
		},
		{
			title : "单价",
			field : "price"
		},
		{
			title : "总价",
			field : "total"
		},
		{
			title : "币制",
			field : "bizhi"
		},
		{
			title : "征免",
			field : "zm"
		},
	];
	//箱单测试数据
	var xiangdanData = {
	    "success": true, 
	    "msg": null, 
	    "data": {
	        "pageSize": 10, 
	        "pageNo": 1, 
	        "totalCount": 0, 
	        "lastPageNo": 3, 
	        "nextPageNo": 2, 
	        "firstPage": false, 
	        "lastPage": false, 
	        "thisPageElements": [
	        	{
	    			"spbm": "23121312312",
	    			"number": 1,
	    			"guige": "电视监控系统配件 防爆液晶显示器,X-000 ",
	    			"danwei": "套",
	    			"price": 9662.39,
	    			"mdg" : "法国",
	    			"total": 9662.39,
	    			"bizhi" : "人民币",
	    			"kzm": "10%"
	    		},
	    		{
	    			"name": "电视监控系统配件 控制器内变压器 ",
	    			"number": 2,
	    			"guige": "ZJYP-4-2 220VAC/15VAC*⑴",
	    			"danwei": "套",
	    			"oneMoney": 146.16,
	    			"totalMoney": 292.32,
	    			"company": "南京某自动化系统工程有限公司"
	    		},
	    		{
	    			"name": "40钻机橡胶配件 ZJ40 钻井平台防滑板 ",
	    			"number": 50,
	    			"guige": "510*510*30 天然橡胶",
	    			"danwei": "件",
	    			"oneMoney": 1074.23,
	    			"totalMoney": 53711.54,
	    			"company": "宝鸡某石油机械厂"
	    		},
	    		{
	    			"name": "铜芯塑料绝缘电力电缆 VVR ",
	    			"number": 0.6,
	    			"guige": "3*6+1*4mm2 1kV GB/T 127*⑴",
	    			"danwei": "km",
	    			"oneMoney": 13569.23,
	    			"totalMoney": 8141.54,
	    			"company": "扬州某点电缆股份有限公司"
	    		},
	    		{
	    			"name": "铜芯塑料绝缘电力电缆 VVR ",
	    			"number": 0.2,
	    			"guige": "3*2.5+1*1.5 0.6/1kV GB/*⑴",
	    			"danwei": "km",
	    			"oneMoney": 7634.85,
	    			"totalMoney": 1526.97,
	    			"company": "扬州某点电缆股份有限公司"
	    		}
	        ], 
	        "thisPageLastElementNumber": 20, 
	        "previousPageNo": 0, 
	        "thisPageFirstElementNumber": 11
	    }
	};
	
	//箱单表格
	queryData({$container:$xiangDanTable,columns:xiangDanColumns,data:xiangdanData,height:244});
	
});