$(function(){
	//处理详情信息
	function handlerDetailInfo(ret){
		var buyer ={ 
				container: "buyer",
				type : "tzd",
				columns:  [
					{name: "buyer",label:"名称",value:ret.buyer},
                    {name: "buyerTaxpayerIdentity",label:"纳税人识别号",value:ret.buyerTaxpayerIdentity},
                    {name: "buyerAddr",label:"地址",value:ret.buyerAddr},
					{name: "buyerTel",label:"电话",value:ret.buyerTel},
                    {name: "buyerAccountBank",label:"开户行",value:ret.buyerAccountBank},
                    {name: "buyerBankcard",label:"开户行账号",value:ret.buyerBankcard}				]
			};
		var sales ={ 
				container: "sales",
				type : "tzd",
				columns:  [
					{name: "seller",label:"名称",value:ret.seller},
                    {name: "sellerTaxpayerIdentity",label:"纳税人识别号",value:ret.sellerTaxpayerIdentity},
                    {name: "sellerAddr",label:"地址",value:ret.sellerAddr},
					{name: "sellerTel",label:"电话",value:ret.sellerTel},
                    {name: "sellerAccountBank",label:"开户行",value:ret.sellerAccountBank},
                    {name: "sellerBankcard",label:"开户行账号",value:ret.sellerBankcard}
				]
			};
		
		$("span[data-name='kptzdbm']").html(ret.kptzdbm);
		$("span[data-name='kaiPiaoRiQi']").html(ret.createTime);
		
		addRenWuInfo(buyer);
		addRenWuInfo(sales);
	}
	//通知单详情
	$.ajax({
		url:'../../../../kaipiaotzd/detail',
		data:{"kptzd":parent.params.kptzd},
		success:function(result){
			if(result.success && result.data){
				if (result.data.branch == 1){//代办1
                    $("#db_information").append("（注：开票时一定要选择代办退税发票）");
				}
				handlerDetailInfo(result.data);
			}
		}
	});
	
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
			field : 'specificationModel',
			formatter : labelTrimFormatter
		},
		{
			title : '单位',
			field : 'unit'
		},
		{
			title : '数量',
			field : 'num'/*,
			formatter : function(value,row,index){
				return '<input style="width:50px;" name="num" type="number" value='+value+' onkeyup=updataRow(this,"'+index+'","num")>';
			}*/
		},
		{
			title : '单价',
			field : 'unitPrice'/*,
			formatter : function(value,row,index){
				return '<input style="width:70px;" name="unitPrice" type="number" value='+value+' onkeyup=updataRow(this,"'+index+'","unitPrice")>';
			}*/
		}, 
		{
			title : '金额',
			field : 'amount'/*,
			formatter : function(value,row,index){
				return '<input style="width:80px;" name="amount" type="number" value='+value+' onkeyup=updataRow(this,"'+index+'","amount")>';
			}*/
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
	$.ajax({
		url : "../../../../kaipiaotzd/queryKptzdMxForList",
		type : "post",
		data : {"kptzd":parent.params.kptzd},
		dataType : "json",
		success : function(res){
			if(res.success && res.data){
				var msg = "";
                if("DL"==parent.params.kptzdbm.substring(4,6)){
                    msg="【代办退税专用】  ";
                }
				queryData({columns:columns,data:{success:true,data:{thisPageElements:res.data}},$container:$goodsList,height:"auto",pagination:false,
					onPostBody:function(){
						$goodsList.find("tbody").append('<tr><td style="width:56px;">合计:</td><td colspan="4" style="vertical-align:middle;width:300px">'+parent.params.jshjje+'</td><td style="width:160px;">备注:</td><td colspan="5" style="">'+msg+parent.params.kptzdbm+'</td></tr>');
						$goodsList.closest(".fixed-table-container").css({"paddingBottom":"0","borderBottom":"none"});
					}
				});
			}else{
				queryData({columns:columns,data:{success:true,data:{thisPageElements:[]}},$container:$goodsList,height:"auto",pagination:false});
			}
//			$("#goodsList tbody").append('<tr style="position:absolute;bottom: 0;width:100%;"><td style="width:10%;">合计:</td><td style="vertical-align:middle;width:40%;">'+parent.params.invoiceValue+'</td><td style="width:10%;">通知单号:</td><td style="vertical-align:middle;width:10%;">'+parent.params.kptzdbm+'</td></tr>');
		}
	});
})