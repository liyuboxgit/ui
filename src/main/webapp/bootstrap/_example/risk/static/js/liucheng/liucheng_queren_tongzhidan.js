
/*console.log(parent.params);*/

//货物清单测试数据
//var data = {
//    "success": true, 
//    "msg": null, 
//    "data": {
//        "pageSize": 10, 
//        "pageNo": 1, 
//        "totalCount": 0, 
//        "lastPageNo": 3, 
//        "nextPageNo": 2, 
//        "firstPage": false, 
//        "lastPage": false, 
//        "thisPageElements": [
//        	{
//    			"name": "电视监控系统配件 防爆液晶显示器 ",
//    			"number": 1,
//    			"guige": "X-000 ",
//    			"tzdh" : "123",
//    			"danwei": "套",
//    			"unitPrice": 9662.39,
//    			"totalMoney": 9662.39,
//    			"company": "南京某自动化系统工程有限公司"
//    		},
//    		{
//    			"name": "电视监控系统配件 控制器内变压器 ",
//    			"number": 2,
//    			"guige": "ZJYP-4-2 220VAC/15VAC*⑴",
//    			"danwei": "套",
//    			"unitPrice": 146.16,
//    			"totalMoney": 292.32,
//    			"company": "南京某自动化系统工程有限公司"
//    		},
//    		{
//    			"name": "40钻机橡胶配件 ZJ40 钻井平台防滑板 ",
//    			"number": 50,
//    			"guige": "510*510*30 天然橡胶",
//    			"danwei": "件",
//    			"unitPrice": 1074.23,
//    			"totalMoney": 53711.54,
//    			"company": "宝鸡某石油机械厂"
//    		},
//    		{
//    			"name": "铜芯塑料绝缘电力电缆 VVR ",
//    			"number": 0.6,
//    			"guige": "3*6+1*4mm2 1kV GB/T 127*⑴",
//    			"danwei": "km",
//    			"unitPrice": 13569.23,
//    			"totalMoney": 8141.54,
//    			"company": "扬州某点电缆股份有限公司"
//    		},
//    		{
//    			"name": "铜芯塑料绝缘电力电缆 VVR ",
//    			"number": 0.2,
//    			"guige": "3*2.5+1*1.5 0.6/1kV GB/*⑴",
//    			"danwei": "km",
//    			"unitPrice": 7634.85,
//    			"totalMoney": 1526.97,
//    			"company": "扬州某点电缆股份有限公司"
//    		}
//        ], 
//        "thisPageLastElementNumber": 20, 
//        "previousPageNo": 0, 
//        "thisPageFirstElementNumber": 11
//    }
//};

$(function(){
	//如果任务已经调不允许重新收票
    if(serchParam.dqhj!="4"){
        $("#save_btn").attr("disabled", true);
    }
	$("#uuids").val(parent.params.kptzd);

	//购买方
	var buyer ={ 
		container: "buyer",
		type : "tzd",
		columns:  [
			{name: "buyer",label:"名称",value:""},
			{name: "buyerTaxpayerIdentity",label:"纳税人识别号",value:""},
			//{name: "buyerBankcard",label:"地址，电话",value:"北京市朝阳区XX路123号 010-56780000"},
			{name: "buyerAddr",label:"地址",value:""},
			{name: "buyerTel",label:"电话",value:""},
			//{name: "buyerAccountBank",label:"开户行及账号",value:"工行北京支行 010020203998009"}
			{name: "buyerAccountBank",label:"开户行",value:""},
			{name: "buyerBankcard",label:"开户行账号",value:""}
		]
	};
	//销售方
	var sales ={ 
		container: "sales",
		type : "tzd",
		columns:  [
			{name: "seller",label:"名称",value:""},
			{name: "sellerTaxpayerIdentity",label:"纳税人识别号",value:""},
			//{name: "sellerBankcard",label:"地址，电话",value:"北京市朝阳区XX路123号 010-56780000"},
			{name: "sellerAddr",label:"地址",value:""},
			{name: "sellerTel",label:"电话",value:""},
			//{name: "sellerAccountBank",label:"开户行及账号",value:"工行北京支行 010020203998009"}
			{name: "sellerAccountBank",label:"开户行",value:""},
			{name: "sellerBankcard",label:"开户行账号",value:""}
		]
	};
	
	addRenWuInfo(buyer);
	addRenWuInfo(sales);
	
	// 货物清单表头项
	var columns = [
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
				var page = $gdList.bootstrapTable("getPage");
				var pageSize = page.pageSize,pageNumber = page.pageNumber;
				return page.pageSize*(page.pageNumber-1)+index+1;
				*/
			}
		},
		{
			title : '名称',
			field : 'goodsName',
			formatter : labelTrimFormatter
		},
		{
			title : '规格型号',
			field : 'specificationModel'
			//formatter : labelTrimFormatter
		},
		{
			title : '单位',
			field : 'unit'
		},
		{
			title : '数量',
			field : 'num',
//			formatter : function(value,row,index){
//				return '<input style="width:100px;" name="num" type="number" value='+value+' onkeyup=updataRow(this,"'+index+'","num")>';
//			}
		},
		{
			title : '单价',
			field : 'unitPrice',
//			formatter : function(value,row,index){
//				return '<input style="width:100px;" name="unitPrice" type="number" value='+value+' onkeyup=updataRow(this,"'+index+'","unitPrice")>';
//			}
		}, 
		{
			title : '金额',
			field : 'amount',
//			formatter : function(value,row,index){
//				return '<input style="width:100px;" name="amount" type="number" value='+value+' onkeyup=updataRow(this,"'+index+'","amount")>';
//			}
		}, 
		{
			title : '征税率',
			field : 'taxRate'
		}, 
		{
			title : '税额',
			field : 'tax'
		}
	];
	var $goodsList = $("#goodsList");
	//查询清单
	//queryData({columns:columns,url:"../../../../kptzd/queryKptzdMxForList?kptzdbm="+parent.params.kptzdbm,$container:$goodsList,height:270});
	$.ajax({
		url : "../../../../kptzd/queryKptzdMxForList",
		type : "post",
		data : {"kptzdbm":parent.params.kptzdbm},
		dataType : "json",
		success : function(res){
			
			queryData({columns:columns,data:{success:true,data:{thisPageElements:res.data}},$container:$goodsList,pagination:false,height:"auto"});
			$.each(res.data[0],function(k,v){
				//$("span[data-name='"+k+"']").html(v);
				if(v){
					$("span[data-name='"+k+"']").html(v);
				}
			});
			// 发票号码  发票代码回显
			var invoiceNumber = res.data[0].invoiceNumber;
			if (invoiceNumber !== null && invoiceNumber !== undefined && invoiceNumber !== '') {
				$("#invoiceCode").val(invoiceNumber.substring(0,10))
				$("#invoiceNumber").val(invoiceNumber.substring(10))
			}
			 var msg="";
             if("DL"==parent.lcparams.rwbh.substring(0,2)){
                 msg="【代办退税专用】  ";
                 $("#kpdlText").text("（注：开票时一定要选择代办退税发票）");
             }
				$("#goodsList tbody").append('<tr><td style="width:55px;">合计:</td><td colspan="4" style="vertical-align:middle;width:370px;">'+parent.params.jshjje+'</td><td style="">备注:</td><td colspan="4" style="width:353px;">'+msg+parent.params.kptzdbm+'</td></tr>');
				
			//$("#goodsList tbody").append('<tr><td style="width:55px;">合计:</td><td style="vertical-align:middle;width:370px;">'+parent.params.invoiceValue+'</td><td>通知单号:</td><td style="width:353px;">'+parent.params.kptzdbm+'</td></tr>');
//			$("#goodsList tbody").append('<tr><td style="width:55px;">合计:</td><td colspan="4" style="vertical-align:middle;width:370px;">'+parent.params.invoiceValue+'</td><td style="">通知单号:</td><td colspan="4" style="width:353px;">'+parent.params.kptzdbm+'</td></tr>');
			$goodsList.closest(".fixed-table-container").css({"paddingBottom":"0","borderBottom":"none"});
		}
	});
	$('#save_btn').click(function(){
		 
		 $.ajax({
	            url : "../../../../kptzd/updateFpdm",
	            contenType:'application/json',
	            type : "POST",
	            data :{"invoiceCode":$("#invoiceCode").val(),"invoiceNumber":$("#invoiceNumber").val(),"kptzd":parent.params.kptzd},
	            success : function (result) {
	                if(result.success){
	                	parent.layer.msg("收票成功！");
	                	parent.layer.close(parent.layer.getFrameIndex(window.name));//成功后关闭页面
		         		parent.initGdList(); //刷新父页面
	                }else{
	                	parent.layer.msg(result.msg);
	                }
	            }
	    });
		
	});
	
	
	function transferData(){
		
		 $.ajax({
	            url : "../../../../kptzd/transferData",
	            contenType:'application/json',
	            type : "POST",
	            data :{"invoiceCode":$("#invoiceCode").val(),"invoiceNumber":$("#invoiceNumber").val(),"kptzd":parent.params.kptzd},
	            success : function (result) {
	                if(result.success){
	                	parent.layer.msg("收票成功！");
	                	parent.layer.close(parent.layer.getFrameIndex(window.name));//成功后关闭页面
		         		parent.initGdList(); //刷新父页面
	                }else{
	                	parent.layer.msg(result.msg);
	                }
	            }
	    });
		 
	}
	
	//添加或修改保存
	$("#saveBtn").on("click",function(e){
		var data = $("#goodsList").bootstrapTable("getData");
//		if($('#addInfoForm').validate().form()){
		  	  //前往修改
		        $.ajax({
		            url : "../../../../kptzd/updateKptzdxq",
		            contenType:'application/json',
		            type : "POST",
		            data :{kptzdmx:JSON.stringify(data)},
		            success : function (result) {
		                if(result.success){
		                	parent.layer.msg("修改成功");
		                }else{
		                	parent.layer.msg("修改失败");
		                }
	            		parent.layer.close(parent.layer.getFrameIndex(window.name));//成功后关闭页面
	            		parent.refreshTable(); //刷新页面
		            }
		        });
//		} 
	});
});



//成功后给页面设置值
function addDataToHtml(result){
	$.each(result,function(k,v){
		$("span[name="+k+"]").html(v);
	});
	
}

//更新修改的值
function updataRow(e,index,type){
	$(e).val($(e).val());
	var num = 0;
	var unitPrice = 0;
	var amount = 0;
	switch(type){
		case "num":
			num = $(e).val();
			unitPrice = $(":input[name='unitPrice']").val();
			amount = $(":input[name='amount']").val();
			break;
		case "unitPrice":
			unitPrice = $(e).val();
			num = $(":input[name='num']").val();
			amount = $(":input[name='amount']").val();
			break;
		case "amount":
			amount = $(e).val();
			num = $(":input[name='num']").val();
			unitPrice = $(":input[name='unitPrice']").val();
			break;
		default:
			break;
	}
	$("#goodsList").bootstrapTable("updateRow", {index:index, row:{num:num,unitPrice:unitPrice,amount:amount}});
	
	var el = $("#goodsList tbody tr:eq("+index+")").find("td").find("input[name="+type+"]");
	var t = el.val();
	el.val("").focus().val(t);
}