//任务流程中预关单审核的比对
$(function(){
	/*
	//预关单基本信息
	var yuGuanDanBaseInfo = { 
		container: "systemYuGuanDan",
		type : "biDui",
		columns:  [
			{name: "bianhao",label:"预录入编号",value:"1233213"},
			{name: "buyerTaxpayerIdentity",label:"海关编号 ",value:""},
			{name: "buyerBankcard",label:"出口口岸 ",value:""},
			{name: "buyerAccountBank",label:"备案号 ",value:""},
			{name: "buyerAccountBank",label:"经营单位 ",value:""},
			{name: "buyerAccountBank",label:"运输方式 ",value:""},
			{name: "buyerAccountBank",label:"运输工具 ",value:""},
			{name: "buyerAccountBank",label:"提运单号  ",value:""},
			{name: "buyerAccountBank",label:"发货单位 ",value:""},
			{name: "buyerAccountBank",label:"贸易方式  ",value:""},
			{name: "buyerAccountBank",label:"征免性质  ",value:""},
			{name: "buyerAccountBank",label:"许可证号  ",value:""},
			{name: "buyerAccountBank",label:"抵运国（地区）  ",value:""},
			{name: "buyerAccountBank",label:"指运港  ",value:""},
			{name: "buyerAccountBank",label:"境内货源地  ",value:""},
			{name: "buyerAccountBank",label:"批准文号",value:""},
			{name: "buyerAccountBank",label:"成交方式 ",value:""},
			{name: "buyerAccountBank",label:"运费 ",value:""},
			{name: "buyerAccountBank",label:"保费 ",value:""},
			{name: "buyerAccountBank",label:"杂费 ",value:""},
			{name: "buyerAccountBank",label:"合同协议号 ",value:""},
			{name: "buyerAccountBank",label:"件数 ",value:""},
			{name: "buyerAccountBank",label:"包装种类 ",value:""},
			{name: "buyerAccountBank",label:"毛重（kg） ",value:""},
			{name: "buyerAccountBank",label:"净重（kg） ",value:""},
			{name: "buyerAccountBank",label:"集装箱号 ",value:""},
			{name: "buyerAccountBank",label:"随附单据  ",value:""},
			{name: "buyerAccountBank",label:"生产厂家   ",value:""},
			{name: "buyerAccountBank",label:"标记码及备注  ",value:""}
		]
	};
	
	//报关行关单信息
	var haiGuanDanBaseInfo = { 
		container: "baoGuanHangGuanDan",
		type : "biDui",
		columns:  yuGuanDanBaseInfo.columns
	};
	
	//addRenWuInfo(yuGuanDanBaseInfo);
	//addRenWuInfo(haiGuanDanBaseInfo);
	
	//预关单数据
	//var yuguandanData = [{"bianhao":"3333","mingcheng":"abc"}];
	//var haiguanData = {"bianhao":"444", "ok":false };
	
	//有不一致的标红
	//$(document).find("span[data-name='bianhao']").addClass("text-danger");
	*/
	
	
	
	//预关单添加值
	/*
	$.each(yuguandanData,function(k,v){
		var $spanEle = $("span[data-name='"+k+"']","#systemYuGuanDan");
		if(k == 'ok' && v == false){
			$spanEle.addClass("text-danger");
		}
		 $spanEle.html(v);
	});
	*/
	
	//系统生成箱单信息
	var $sysXiangDanTable = $("#sysXiangDanTable");
	var $haiGuanXiangDanTable = $("#haiGuanXiangDanTable");
	
	/*
	//箱单标题
	var xiangDanColumns = [
		{
			title : '序号',
			field : "xuhao",
			align:'center',
			formatter : function(value,row,index){ 
				
				var page = $table.bootstrapTable("getPage");
				var pageSize = page.pageSize,pageNumber = page.pageNumber;
				return page.pageSize*(page.pageNumber-1)+index+1;
				
				return index+1;
			}
		},
		{
			title : "商品编码",
			field : "spbm",
			formatter : labelTrimFormatter
		},
		{
			title : "商品名称、规格型号",
			field : "guige",
			formatter : labelTrimFormatter
		},
		{
			title : "数量",
			field : "numbers"
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
			field : "bizhi",
		},
		{
			title : "征免",
			field : "zm"
		}
	];
	*/
	//箱单测试数据
	
	/*
	var sysXiangDanData = {
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
	    		}
	        ], 
	        "thisPageLastElementNumber": 20, 
	        "previousPageNo": 0, 
	        "thisPageFirstElementNumber": 11
	    }
	};
	*/
	
	
	
	
	//系统箱单表格
	//queryData({$container:$sysXiangDanTable,columns:xiangDanColumns,data:sysXiangDanData,height:240});
	
	//系统箱单表格
	//queryData({$container:$haiGuanXiangDanTable,columns:xiangDanColumns,data:sysXiangDanData,height:240});
	
	/*
	var staticObj = {
	    "success": true,
	    "msg": null,
	    "data": [
	        {
	            "data_a": "123123123122312999",
	            "data_b": "123123123122312999",
	            "compare_result": "1",
	            "compare_name": "预录入编号",
	            "zcfl": "1"
	        },
	        {
	            "data_a": "4016999090	钻井台防滑板 防护垫|硫化橡胶|不是机器及仪器用|无品牌|无型号	50	个	委内瑞拉	193.36	9668.08	美元",
	            "data_b": "4016999090	钻井台防滑板 防护垫|硫化橡胶|不是机器及仪器用|无品牌|无型号	50	个	委内瑞拉	193.36	9668.08	美元",
	            "compare_result": "1",
	            "compare_name": "商品编码|商品名称|规格型号|数量|单位|最终目的国|单价|总价|币制|征免",
	            "zcfl": "0"
	        },
	        {
	            "data_a": "123123343122312900",
	            "data_b": "223123123122312999",
	            "compare_result": "0",
	            "compare_name": "海关编号",
	            "zcfl": "1"
	        },
	        {
	            "data_a": "4016999090	钻井台防滑板 防护垫|硫化橡胶|不是机器及仪器用|无品牌|无型号	50	个	委内瑞拉	193.36	9668.08	美元",
	            "data_b": "4016999090	钻井台防滑板 防护垫|硫化橡胶|不是机器及仪器用|无品牌|无型号	49	个	委内瑞拉	193.36	9668.08	美元",
	            "compare_result": "0",
	            "compare_name": "商品编码|商品名称|规格型号|数量|单位|最终目的国|单价|总价|币制|征免",
	            "zcfl": "0"
	        }
	    ]
	};
	*/
	
	//var $systemYuGuanDan = $("#systemYuGuanDan"); //系统生成的关单基本信息
	//var $sysXiangDan = $("#sysXiangDan");
	
	//var $baoGuanHangGuanDan = $("#baoGuanHangGuanDan"); //报关行的关单基本信息
	//var $haiGuanXiangDan = $("#haiGuanXiangDan"); //系统生成的关单的箱单信息
	//处理后台返回的数据
	/*
	for(var i=0; i<staticObj.data.length; i++){
		
	}
	*/
	
	/*
	var staticObj = [
		{
			"bianma":{
				"data1":"1",
				"data2":"2"
			},
			"mingcheng":
			{
				"data1":"名称1",
				"data2":"名称2"
			},
			"shuliang":
			{
				"data1":"10",
				"data2":"20"
			}
		},
		{
			"bianma":{
				"data1":"1",
				"data2":"2"
			},
			"mingcheng":
			{
				"data1":"名称1",
				"data2":"名称2"
			},
			"shuliang":
			{
				"data1":"10",
				"data2":"20"
			}
		}
	];
	*/
	
	
    //预录入编号	 formCode
    //海关编号		customsCode
    //备案号		recordNo
    //出口口岸代码	exportPort
    //经营单位代码	operUnit
    //运输方式		transportType
    //发货单位		deliverUnit
    //运输工具		transportTool
    //提运单号		billNo
    //贸易方式		serviceType
    //征免性质		exemptionNature
    //成交方式		dealMode
    //许可证号		licenseKey
    //批准文号		approvalNum
    //合同协议号	contractNo
    //集装箱号		containerNo
    //运抵国		arrivingCountry
    //指运港		fingerPort
    //境内货源地	territorySourceName
    //运费 		freight
    //保费 		premium
    //杂费		Incidental
    //件数		num
    //净重（kg）	netWeight
    //毛重（kg）	grossWeight
    //包装种类		packingType
    //生产厂家		manufacturer
    //随附单据		cfpSfdj
    //标记码及备注	remarks
	
	
	//商品编码  	goodsCode
    //商品名称 		goodsName
    //规格型号 		specificationModel
    //单位 		legalUnit
    //数量 		legalNum
    //最终目的国 	destinationAreaName
    //单价 		unitPrice
    //总价 		totalPrice
    //币制 		currency
    //征免 		exempt
	/*
	var data = {
		basicInfo:{
			structure:{
				formCode:"预录入编号",customsCode:"海关编号",recordNo:"备案号",exportPort:"出口口岸代码",operUnit:"经营单位代码",
				transportType:"运输方式",deliverUnit:"发货单位",transportTool:"运输工具",billNo:"提运单号",serviceType:"贸易方式",
				exemptionNature:"征免性质",dealMode:"成交方式",licenseKey:"许可证号",approvalNum:"批准文号",contractNo:"合同协议号",
				containerNo:"集装箱号",arrivingCountry:"运抵国",fingerPort:"指运港",territorySourceName:"境内货源地",freight:"运费",
				premium:"保费",Incidental:"杂费",num:"件数",netWeight:" 净重(kg)",grossWeight:"毛重(kg)",
				packingType:"包装种类",manufacturer:"生产厂家",cfpSfdj:"随附单据",remarks:"标记码及备注"
			},
			seq:["formCode","customsCode","recordNo","exportPort","operUnit","transportType","deliverUnit","transportTool",
				"billNo","serviceType","exemptionNature","dealMode","licenseKey","approvalNum","contractNo","containerNo",
				"arrivingCountry","fingerPort","territorySourceName","freight","premium","Incidental","num","netWeight",
				"grossWeight","packingType","manufacturer","cfpSfdj","remarks"],
			datas:[
				{
					formCode:{
						value1:"A",
						value2:"B",
						result:false
					},
					customsCode:{
						value1:"a",
						value2:"b",
						result:false
					},
					recordNo:{
						value1:"1",
						value2:"2",
						result:false
					},
					exportPort:{
						value1:"1",
						value2:"1",
						result:true
					},
					operUnit:{
						value1:"1",
						value2:"1",
						result:true
					},
					transportType:{
						value1:"1",
						value2:"1",
						result:true
					},
					deliverUnit:{
						value1:"1",
						value2:"1",
						result:true
					},
					transportTool:{
						value1:"1",
						value2:"1",
						result:true
					},
					billNo:{
						value1:"1",
						value2:"1",
						result:true
					},
					serviceType:{
						value1:"1",
						value2:"1",
						result:true
					},
					exemptionNature:{
						value1:"1",
						value2:"1",
						result:true
					},
					dealMode:{
						value1:"1",
						value2:"1",
						result:true
					},
					licenseKey:{
						value1:"1",
						value2:"1",
						result:true
					},
					approvalNum:{
						value1:"1",
						value2:"1",
						result:true
					},
					contractNo:{
						value1:"1",
						value2:"1",
						result:true
					},
					containerNo:{
						value1:"1",
						value2:"1",
						result:true
					},
					arrivingCountry:{
						value1:"1",
						value2:"1",
						result:true
					},
					fingerPort:{
						value1:"1",
						value2:"1",
						result:true
					},
					territorySourceName:{
						value1:"1",
						value2:"1",
						result:true
					},
					freight:{
						value1:"1",
						value2:"1",
						result:true
					},
					premium:{
						value1:"1",
						value2:"1",
						result:true
					},
					Incidental:{
						value1:"1",
						value2:"1",
						result:true
					},
					num:{
						value1:"1",
						value2:"1",
						result:true
					},
					netWeight:{
						value1:"1",
						value2:"1",
						result:true
					},
					grossWeight:{
						value1:"1",
						value2:"1",
						result:true
					},
					packingType:{
						value1:"1",
						value2:"1",
						result:true
					},
					manufacturer:{
						value1:"1",
						value2:"1",
						result:true
					},
					cfpSfdj:{
						value1:"1",
						value2:"1",
						result:true
					},
					remarks:{
						value1:"1",
						value2:"1",
						result:true
					}
				}
			]
		},
		goods:{
			structure:{goodsCode:"商品编码",goodsName:"商品名称",specificationModel:"规格型号",legalUnit:"单位",legalNum:"数量",
				destinationAreaName:"最终目的国",unitPrice:"单价",totalPrice:"总价",currency:"币制",exempt:"征免"
			},
			seq:["goodsCode","goodsName","specificationModel","legalUnit","legalNum",
				"destinationAreaName","unitPrice","totalPrice","currency","exempt"],
			datas:[
				{
					goodsCode:{
						value1:"A",
						value2:"B",
						result:false
					},
					goodsName:{
						value1:"a",
						value2:"b",
						result:false
					},
					specificationModel:{
						value1:"1",
						value2:"2",
						result:false
					},
					legalUnit:{
						value1:"1",
						value2:"2",
						result:false
					},
					legalNum:{
						value1:"1",
						value2:"2",
						result:false
					},
					destinationAreaName:{
						value1:"1",
						value2:"2",
						result:false
					},
					unitPrice:{
						value1:"1",
						value2:"2",
						result:false
					},
					totalPrice:{
						value1:"1",
						value2:"2",
						result:false
					},
					currency:{
						value1:"1",
						value2:"2",
						result:false
					},
					exempt:{
						value1:"1",
						value2:"2",
						result:false
					}
				},
				{
					goodsCode:{
						value1:"A",
						value2:"B",
						result:false
					},
					goodsName:{
						value1:"a",
						value2:"b",
						result:false
					},
					specificationModel:{
						value1:"1",
						value2:"2",
						result:false
					}
				},
				{
					goodsCode:{
						value1:"A",
						value2:"B",
						result:false
					},
					goodsName:{
						value1:"a",
						value2:"b",
						result:false
					},
					specificationModel:{
						value1:"1",
						value2:"2",
						result:false
					}
				}
			]
		}
	};
	*/
	
	//处理数据
	/*
	$.ajax({
		url : "../../../data/yuGuanDanCompare.json",
		data : {id:123},
		type :"post",
		dataType : "json",
		contentType : "text/html;charset=utf-8",
		success : function(result){
			alert(result)
		}
	});
    */
	
});