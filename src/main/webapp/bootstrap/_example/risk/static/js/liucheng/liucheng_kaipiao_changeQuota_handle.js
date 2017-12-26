var key = "tzdh";

//货物清单测试数据
var testData = {
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
        	/*
        	{
    			"name": "电视监控系统配件 防爆液晶显示器 ",
    			"number": 1,
    			"guige": "X-000 ",
    			"tzdh" : "123",
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
    		*/
        ], 
        "thisPageLastElementNumber": 20, 
        "previousPageNo": 0, 
        "thisPageFirstElementNumber": 11
    }
};

$(function(){
	
	//货物清单
	var $ghsList = $("#ghsList");
	
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
			title : '供货商',
			field : 'supplierName'
		}, 
		{
			title : '限额',
			field : 'invoiceLimit',
			formatter : function(value,row,index){
				var str='<select style="width:150px; height:20px;" name="invoiceLimit">';
				if(value=="10000"){
					str=str+'<option value="10000" selected="selected">万元</option>';
				}else {
                    str=str+'<option value="10000">万元</option>';
                }
                if(value=="100000"){
					str=str+'<option value="100000" selected="selected">十万元</option>';
				}else {
                    str=str+'<option value="100000" >十万元</option>';
                }
                if(value=="1000000"){
                	str=str+'<option value="1000000"  selected="selected">百万元</option>';
				}else {
                    str=str+'<option value="1000000"  >百万元</option>';
                }
                if(value=="10000000"){
					str=str+'<option value="10000000" selected="selected">千万元</option>';
				}else {
                	str=str+'<option value="10000000">千万元</option>';
				}
				return str+'</select>';
			}
		}
	];
	
	$.ajax({
		url : "../../../../kptzd/findNsrsbh",
		type : "post",
        data : {"rwbh":parent.lcparams.rwbh},
		dataType : "json",
		success : function(res){
			var array = [];
			if(res.success && res.data && res.data.length>0){
				array = res.data;
			}
			queryData({columns:columns,data:{success:true,data:{thisPageElements:array}}, pageSize:array.length,$container:$ghsList,height:202,pagination:false});
		}
	});
	
	
	////////////////////////////////////////////货物开始////////////////////////////////////////////
	var goodsColumns = [
		{
			title : '序号',
			align:'center',
			formatter : function(value,row,index){
				return index + 1;
			}
		},
		{
			title : '纳税人识别号',
			field : 'nsrsbh',
			formatter : labelTrimFormatter
		},
		{
			title : '供货商名',
			field : 'supplier',
//			formatter : labelTrimFormatter
		},
		{
			title : '名称',
			field : 'good_name',
			formatter : labelTrimFormatter
		},
		{
			title : '规格型号',
			field : 'specification_model',
//			formatter : labelTrimFormatter
		},
		{
			title : '单位',
			field : 'stan_unit_flag'
		},
		{
			title : '数量',
			field : 'numbers',
			formatter : function(value,row,index){
				return '<input style="width:100px;height:20px;" name="numbers" type="number" value='+value+'>';
			}
		},
//		{
//			title : '单价',
//			field : 'danjia',
//			formatter : function(value,row,index){
//				return '<input style="border:none;height:20px;" readonly="readonly" style="width:100px;" name="danjia" type="number" value='+value+'>';
//			}
//		}, 
		{
			title : '金额',
			field : 'total',
			formatter : function(value,row,index){
				return '<input style="width:100px;height:20px;" name="total" type="number" value='+value+'>';
			}
		}
	];
	
	var $goodsList = $("#goodsList");
	$.ajax({
		url : "../../../../kptzd/findKptzdGoods",
		type : "post",
		data : {"rwbh":parent.lcparams.rwbh},
		dataType : "json",
		success : function(res){
			var array = [];
			if(res.success && res.data && res.data.length>0){
				array = res.data;
			}else{
				array = testData.data.thisPageElements;
			}
			queryData({columns:goodsColumns,data:{success:true,data:{thisPageElements:array}},pageSize: array.length, pagination:false,$container:$goodsList,height:202});
			/*
			if(res.data && res.data.length>0){
				$.each(res.data[0],function(k,v){
					$("span[data-name='"+k+"']").html(v);
				});
			}
			*/
		}
	});
	
	
	////////////////////////////////////////////货物结束////////////////////////////////////////////
	
	
	//修改限额确定
	$("#updateQuota").bind("click",function(){
		//获取供货商表格数据
		var trs = $ghsList.find("tbody tr");
		for(var i=0; i<trs.length; i++){
			var invoiceLimit = $(trs[i]).find("td :input[name='invoiceLimit']").val();
			$ghsList.bootstrapTable("updateRow",{index:i,row:{invoiceLimit:invoiceLimit}});
		}
		//获取商品明细项数据
		var goodsTrs = $goodsList.find("tbody tr");
		for(var i=0; i<goodsTrs.length; i++){
			var num = $(goodsTrs[i]).find("td input[name='numbers']").val();
			var unitPrice = $(goodsTrs[i]).find("td input[name='danjia']").val();
			var amount = $(goodsTrs[i]).find("td input[name='total']").val();
			$goodsList.bootstrapTable("updateRow",{index:i,row:{numbers:num,danjia:unitPrice,total:amount}});
		}
		
		//向后台发送的参数
		var data = {
			rwbh : parent.lcparams.rwbh,
			ghsInfo : JSON.stringify($ghsList.bootstrapTable("getData")),
			goodsInfo : JSON.stringify($goodsList.bootstrapTable("getData"))
		};
		$.ajax({
			url : "../../../../kptzd/sckptzd",
			type : "post",
			data : data,
			dataType : "json",
			success : function(res){
				if(res.success){
					parent.layer.msg("修改成功!");
					parent.layer.close(parent.layer.getFrameIndex(window.name));//成功后关闭页面
					//parent.$("#gdList").bootstrapTable("refresh");
					parent.initGdList();
				}else{
					parent.layer.msg("修改失败!");
				}
			}
		});
	});
});
