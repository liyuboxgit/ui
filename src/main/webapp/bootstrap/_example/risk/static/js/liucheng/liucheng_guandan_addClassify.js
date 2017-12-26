var addclassIfyRow = {}; //需要添加的归类

$(function(){
	//箱单信息
	var $xiangDanTable = $("#xiangDanTable");
	//箱单标题
	var xiangDanColumns = [
		{
			title : "商品编码",
			field : "spbm",
			formatter : function(value,row,index){
				return '<input style="height:18px;" name="spbm" class="thgspmInput" list="renwu_lisi_shangpinma" type="text" />';
			}
			
		},
		{
			title : "商品名称、规格型号",
			field : "guige",
			formatter : function(value,row,index){
				var title = value;
				if(value && value.length>15){
					value = value.substring(0,15)+"...";
				}
				return '<span title="'+title+'">'+value+'</span>';
			}
		},
		{
			title : "数量",
			field : "numbers",
			formatter : function(){
				return '<input type="number" name="numbers" style="width:80px; height:18px;" />';
			}
		},
		{
			title : "单位",
			field : "danwei"
		},
		{
			title : "目的国",
			field : "mdg"
		},
		{
			title : "单价",
			field : "price",
			formatter : function(){
				return '<input type="number" name="price" style="width:80px; height:18px;" />';
			}
		},
		{
			title : "总价",
			field : "total",
			formatter : function(){
				return '<input type="number" name="total" style="width:80px; height:18px;" />';
			}
		},
		{
			title : "币制",
			field : "bizhi",
			formatter : function(){
				var array = [];
				var biZhi = getDicts("currency");
				array.push('<select style="width:60px; height:18px;">');
				for(var i=0; i<biZhi.length; i++){
					array.push('<option value="'+biZhi[i].value+'">'+biZhi[i].text+'</option>');
				}
				array.push('</select>');
				return array.join("");
			}
		},
		{
			title : "征免",
			field : "zm",
			formatter : function(){
				return '<input type="text" style="width:60px; height:18px;" />';
			}
		}
		
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
	    			"numbers": 1,
	    			"guige": "电视监控系统配件 防爆液晶显示器,X-000 ",
	    			"danwei": "套",
	    			"price": 9662.39,
	    			"mdg" : "法国",
	    			"total": 9662.39,
	    			"bizhi" : "人民币",
	    			"kzm": "10%"
	    		}
	        	/*
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
	    		*/
	        ], 
	        "thisPageLastElementNumber": 20, 
	        "previousPageNo": 0, 
	        "thisPageFirstElementNumber": 11
	    }
	};
	
	//箱单表格
	queryData({$container:$xiangDanTable,columns:xiangDanColumns,data:xiangdanData,height:76,pagination:false});
	
	var $goodsTable = $("#goodsTable");
	//物资表头项
	var goodsColumns = [{
		field : 'state',
		checkbox : true
	}, 
	{
		title : "序号",
		formatter : function(value,row,index){
			return index +1;
		}
	},
	{
		title : '物资名称',
		field : 'name'
	}, {
		title : '数量',
		field : 'number'
	}, {
		title : '规格型号',
		field : 'guige'
	}, {
		title : '计量单位',
		field : 'danwei'
	}, {
		title : '单价',
		field : 'oneMoney'
	}, {
		title : '总价',
		field : 'totalMoney'
	}, {
		title : '供货方',
		field : 'company'
	}];
	
	//物资测试数据
	var goodsData = {
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
	    			"name": "电视监控系统配件 防爆液晶显示器 ",
	    			"number": 1,
	    			"guige": "X-000 ",
	    			"danwei": "套",
	    			"oneMoney": 9662.39,
	    			"totalMoney": 9662.39,
	    			"company": "南京某自动化系统工程有限公司"
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
	//物品
	queryData({$container:$goodsTable,columns:goodsColumns,data:goodsData,height:240});
	
	//选择海关商品码 输入海关商品码后
	$(document).on('input','.thgspmInput',function() {
		//console.log($(this).val());
		//var value = $.trim($(this).val());
		/*if (value == '4016999090') {
			$(this).parent().siblings().find('input[name=spmc]')
					.val('钻井台防滑板  防护垫|硫化橡胶|不是机器及仪器用|无品牌|无型号');
			$(this).parent().siblings().find('input[name=dedw]')
					.val('个');
		} else if (value == '8544492100') {
			$(this).parent().siblings().find('input[name=spmc]')
					.val('电缆  传输电力|无接头|无品牌|无型号|400伏');
			$(this).parent().siblings().find('input[name=dedw]')
			.val('千米');
		} else if (value == '8528591090') {
			$(this).parent().siblings().find('input[name=spmc]')
					.val('液晶显示器  监视器用|显示影像，LED显示|21.5寸|无品牌|无型号|19');
			$(this).parent().siblings().find('input[name=dedw]')
			.val('台');
		} else {
			$(this).parent().siblings().find('input').val('');
		}*/
	});
	
	//点击确定
	$("#okClassify").click(function(){
		// debugger;
		var huiLv = $(":input[name='fromCNYToUSD']").val(); //获取汇率 
		var classIfyRow = $xiangDanTable.bootstrapTable("getData")[0]; //获取箱单数据
		
		classIfyRow.spbm = $(":input[name='spbm']").val();
		classIfyRow.numbers = $(":input[name='numbers']").val();
		classIfyRow.price = $(":input[name='price']").val();
		classIfyRow.total = $(":input[name='total']").val();
		parent.addclassIfyRow = classIfyRow; 
		
		parent.addXiangDanData();  //调用父类添加数据
		parent.layer.close(parent.layer.getFrameIndex(window.name));//关闭窗口
		
	});
});