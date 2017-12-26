
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
	

	//购买方
	var buyer ={ 
		container: "buyer",
		type : "tzd",
		columns:  [
			{name: "buyer",label:"名称",value:""},
			{name: "buyerTaxpayerIdentity",label:"纳税人识别号",value:""},
			{name: "buyerAddr",label:"地址",value:""},
			{name: "buyerTel",label:"电话",value:""},
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
			{name: "sellerAddr",label:"地址",value:""},
			{name: "sellerTel",label:"电话",value:""},
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
			field : 'cmname',
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
			formatter : function(value,row,index){
				return '<input style="width:100px;" name="num" type="number" value='+value+'>';
			}
		},
		{
			title : '单价',
			field : 'unitPrice',
			formatter : function(value,row,index){
				//value = parseFloat(value).toFixed(4);
				return '<input style="width:100px;" readonly name="unitPrice" type="number" value='+value+'>';
			}
		}, 
		{
			title : '金额',
			field : 'amount',
			formatter : function(value,row,index){
				return '<input style="width:100px;" name="amount" type="number" value='+value+'>';
			}
		}, 
		{
			title : '征税率',
			field : 'taxRate',
            formatter : function(value,row,index){
                return '<input style="width:100px;" readonly name="taxRate" type="number" value='+value+'>';
            }
		}, 
		{
			title : '税额',
			field : 'tax',
            formatter : function(value,row,index){
                return '<input style="width:100px;" readonly  name="tax" type="number" value='+value+'>';
            }
		}
	];
	var $goodsList = $("#goodsList");
	//debugger;
	//查询清单
	//queryData({columns:columns,url:"../../../../kptzd/queryKptzdMxForList?kptzdbm="+parent.params.kptzdbm,$container:$goodsList,height:270});
	$.ajax({
		url : "../../../../kptzd/findFpMx",
		type : "post",
		data : {"fp":parent.params.fp},
		dataType : "json",
		success : function(res){
			if(res.success && res.data && res.data.length>0){
				queryData({columns:columns,data:{success:true,data:{thisPageElements:res.data}},$container:$goodsList,pagination:false,height:"auto"});
				$.each(res.data[0],function(k,v){
					if(v){
						$("span[data-name='"+k+"']").html(v);
					}
				});
                // var msg="";
                // if("DL"==parent.lcparams.rwbh.substring(0,2)){
                //     msg="【代办退税专用】  ";
                //     $("#kpdlText").text("（注：开票时一定要选择代办退税发票）");
                // }
				$("#goodsList tbody").append('<tr><td style="width:55px;">合计:</td><td colspan="8" style="vertical-align:middle;width:370px;" id="jshjje">'+parent.params.jshjje+'</td></tr>');
				$goodsList.closest(".fixed-table-container").css({"paddingBottom":"0","borderBottom":"none"});
			}else{
				queryData({columns:columns,data:{success:true,data:{thisPageElements:[]}},$container:$goodsList,height:170});
			}
			//$("#goodsList tbody").append('<tr style="position:absolute;bottom: 0;"><td style="width:55px;">合计:</td><td colspan="4" style="vertical-align:middle;width:370px;">'+parent.params.invoiceValue+'</td><td style="">通知单号:</td><td colspan="4" style="width:353px;">'+parent.params.kptzdbm+'</td></tr>');
			//$("#goodsList tbody").append('<tr><td style="width:55px;">合计:</td><td colspan="4" style="vertical-align:middle;width:370px;">'+parent.params.invoiceValue+'</td><td style="">备注:</td><td colspan="4" style="width:353px;">'+parent.params.kptzdbm+'</td></tr>');
			//console.log(parent.params.kptzdbm)

            $("#goodsList tbody tr td input[name='num'], #goodsList tbody tr td input[name='amount']").on("blur",function(){
                updateGoodsList();
            });

		}
	});


	//添加或修改保存
	$("#saveBtn").on("click",function(e){
		
		// updateGoodsList(); //更新表格的数据
		
		var data = $("#goodsList").bootstrapTable("getData");
//		if($('#addInfoForm').validate().form()){
		  	  //前往修改
		        $.ajax({
		            url : "../../../../kptzd/updateFp",
		            // contenType:'application/json',
		            type : "POST",
		            data :{fpmxList:JSON.stringify(data),sumTax:$("#jshjje").text()},
		            success : function (result) {
		                if(result.success){
		                	parent.layer.msg("修改成功");
		                }else{
		                	parent.layer.msg("修改失败");
		                }
	            		parent.layer.close(parent.layer.getFrameIndex(window.name));//成功后关闭页面
	            		parent.initList(); //刷新页面
		            }
		        });
//		} 
	});

    // $("tbody tr td input[name='num'],tbody tr td input[name='amount']").on("blur",function(){
     //    debugger
     //    updateGoodsList();
	// });

    //更新列表的值
	function updateGoodsList(){
		//获取商品明细项数据
		var goodsTrs = $goodsList.find("tbody tr");
		var sumtax=0;//总税额
		for(var i=0; i<goodsTrs.length-1; i++){
			//数量
			var num = $(goodsTrs[i]).find("td input[name='num']").val();
			//单价
			var unitPrice = $(goodsTrs[i]).find("td input[name='unitPrice']").val();
			//金额
			var amount = $(goodsTrs[i]).find("td input[name='amount']").val();
			//征税率
			var taxRate = $(goodsTrs[i]).find("td input[name='taxRate']").val();
			//税额
			var tax =  $(goodsTrs[i]).find("td input[name='tax']").val()
           // 税额：  金额*固定税率
            tax=amount/100*taxRate;
			//单价 =  金额/数量
			unitPrice =amount/num;
           // 价税合计 = 每行的 金额*（1+税率%）的合计
            sumtax=Number(sumtax)+Number(tax)+Number(amount);
            $goodsList.bootstrapTable("updateRow",{index:i,row:{num:num,unitPrice:roundFun(unitPrice,2),tax:roundFun(tax,2),amount:amount}});
		}
		var msg="";
        // if("DL"==parent.lcparams.rwbh.substring(0,2)){
			// msg="【代办退税专用】  ";
        //     $("#kpdlText").text("（注：开票时一定要选择代办退税发票）");
        // }
        // $("#goodsList tbody").append('<tr><td style="width:55px;">合计:</td><td colspan="4" style="vertical-align:middle;width:370px;">'+ parent.params.invoiceValue+'</td><td style="">备注:</td><td colspan="4" style="width:353px;">'+ msg +parent.params.kptzdbm+'</td></tr>');
        $("#goodsList tbody").append('<tr><td style="width:55px;">合计:</td><td colspan="8" style="vertical-align:middle;width:370px;" id="jshjje">'+roundFun(sumtax,2)+'</td><td style=""></td></tr>');

        $("#goodsList tbody tr td input[name='num'], #goodsList tbody tr td input[name='amount']").off("blur").on("blur",function(){
            updateGoodsList();
        });
	}
    function roundFun(numberRound,roundDigit) //四舍五入，保留位数为roundDigit
    {
        if (numberRound>=0)
        {
            var tempNumber = parseInt((numberRound * Math.pow(10,roundDigit)+0.5))/Math.pow(10,roundDigit);
            return tempNumber;
        }
        else
        {
            numberRound1=-numberRound
            var tempNumber = parseInt((numberRound1 * Math.pow(10,roundDigit)+0.5))/Math.pow(10,roundDigit);
            return -tempNumber;
        }
    }
});

