//var selectionHg = null;
// var rwbh = "d529b2d31e67463588d1e7e16481dce9";
//parent.lcparams.rwbh = "RW20171114194106073";
var rwbh = parent.lcparams.rwbh;
// var rwbh = "WM2017112040";
var hgLayerIndex = null;
var $renwuForm=$("#renwuForm"),$goodsTable=null,$classifyedTable=null;
var mingXiRow = null;
var mapping = {};
var fitterGoodsCodes = []; //待过滤的海关编码
var bgdmx = null;
$(function(){
	///////////////////////////////////////////////////////基本信息开始///////////////////////////////////////////////////////
	/**
	 @author 周小建
	 @time 2017-11-01
	 @description 基本信息表单明细配置
	 */
	/*
	var config = {
		container:"basicDiv",
		columns:[
			{col:"rwbh",label:"备案号",type:"text",display:false},
			{col:"exportPort",label:"出口口岸",type:"select",options:getDicts("exportPortName")},
			{col:"recordNo",label:"备案号",type:"text"},
			{col:"declareTime",label:"申报日期",type:"date"},
			{col:"operUnit",label:"经营单位",type:"text"},
			{col:"transportType",label:"运输方式",type:"select",options:getDicts("transportMode")},
			{col:"transportTool",label:"运输工具",type:"text"},
			{col:"billNo",label:"提运单号",type:"text"},
			{col:"deliverUnit",label:"发货单位",type:"text"},
			{col:"serviceType",label:"贸易方式",type:"select",options:getDicts("serviceType")},
			
			{col:"exemptionNature",label:"征免性质",type:"text"},
			{col:"licenseKey",label:"许可证号",type:"text"},
			{col:"arrivingCountry",label:"抵运国（地区）",type:"select",options:getDicts("nation")},
			{col:"fingerPort",label:"指运港",type:"text"},
			{col:"territorySourceName",label:"境内货源地",type:"text"},
			{col:"approvalNum",label:"批准文号",type:"text"},
			{col:"dealMode",label:"成交方式",type:"select",options:getDicts("dealMode")},
			{col:"freight",label:"运费",type:"text"},
			{col:"premium",label:"保费",type:"text"},
			{col:"incidental",label:"杂费",type:"text"},
			
			{col:"contractNo",label:"合同协议号",type:"text"},
			{col:"num",label:"件数",type:"text"},
			{col:"packingType",label:"包装种类",type:"text"},
			{col:"grossWeight",label:"毛重（kg）",type:"text"},
			{col:"netWeight",label:"净重（kg）",type:"text"},
			
			{col:"containerNo",label:"集装箱号",type:"text"},
			{col:"cfpSfdj",label:"随附单据",type:"text"},
			{col:"manufacturer",label:"生产厂家",type:"text"},
			{col:"remarks",label:"标记码及备注",type:"textarea"}
		]
	};
	*/
	/**
	 @author 周小建
	 @time 2017-11-01
	 @description 生成基本信息表单
	 */
	//formGenerator(config);
	
	/**
	 @author 周小建
	 @time 2017-11-01
	 @description 注册基本信息表单验证
	 */
	//registerValidate($renwuForm,config);
	
	/**
	 @author 周小建
	 @time 2017-11-01
	 @description “上一步”或“下一步”按钮的鼠标单击事件处理函数
	 */
	/*
	$("#nextStep").on("click",function(){
		if($(this).html().indexOf("上一步") !== -1){
			$(this).html('<i class="glyphicon glyphicon-triangle-right"></i>下一步');
			//$(this).siblings().hide();
			$("#firstStep").show();
			$("#secondStep").hide();
		}else{
			$(this).html('<i class="glyphicon glyphicon-triangle-left"></i>上一步');
			//$(this).siblings().hide();
			$("#firstStep").hide();
			$("#secondStep").show();
		}
		var $thisTitle = $(".nav-tabs li[class=active]");
		var $sibTitle = $thisTitle.siblings(".hide");
		$thisTitle.removeClass("active").addClass("hide");
		$sibTitle.addClass("active").removeClass("hide");
		var $thisCon = $(".tab-content>div.active");
		var $sibCon = $thisCon.siblings();
		$thisCon.removeClass("active").fadeOut();
		$sibCon.addClass("active").fadeIn();
	});
	*/
	
	
	/**
	 @author 周小建
	 @time 2017-11-01
	 @description 修改情况下获取表单数据并填充到表单各个输入框中
	 */
	/*
	$.getJSON("../../../data/yuGuanDanDetail.json",function(result){
		setFormData($renwuForm,document,result.data);
	});
	*/
	/*
	ajaxHelper("../../../../lcygdsh/getXiTongYuGanDanDetail",{rwbh:rwbh},function(res){
		//console.log(res.data);
		$renwuForm=$("#renwuForm");
		setFormData($renwuForm,document,res.data);
		
		//如果页面中的值有的话设置不可修改
		var inputs = $renwuForm.find(":input");
		for(var i=0; i<inputs.length; i++){
			var $item = $(inputs[i]);
			var isInclude = ($.inArray(i,[1,4,5,8,9,11,12,13,15,16,20]) != -1);
			if(isInclude && $item.val()){
				$item.attr("disabled","disabled");
			}
		}
	});
    */
	$("#okClassify").on("click",function(){
		// if($renwuForm.valid()){
		// 	$renwuForm.find(":input").prop("disabled",false);
			var allData = $classifyedTable.bootstrapTable("getData");
			var array = [];
			var $classifyTrs = $classifyedTable.find("tbody tr").each(function(i,tr){
				//var $a = $(this).find("td:last").find("a:eq(0)");
				var $a = $(this).find("td:eq(11)").find("a:eq(0)");
				//var goodsCodeYgd = $a.attr("key");
				var goodsCodeYgd = $a.closest("tr").attr("data-uniqueid");
				//var ckhws = $a.attr("ckhws").split(",");
				var ckhws = mapping[goodsCodeYgd];
				if(ckhws && ckhws.length>0) array.push({goodsCode:goodsCodeYgd,ckhws:ckhws.split(",")});
			});

		    // var basicInfoData = $renwuForm.serialize();
			var data = {
				rwbh:rwbh,
		    	// renWu:JSON.stringify($renwuForm.serializeJSON()),
		    	classify:JSON.stringify(allData),
		    	goods : JSON.stringify(array)
		    };
		    ajaxHelper(
		    	"../../../../lcgdsh/saveBgdCkhw",
		    	data,
		    	function(result){
		    		if(result.success){
            			parent.layer.close(parent.layer.getFrameIndex(window.name));//成功后关闭页面
            		 	//parent.refreshTable();//刷新页面
						parent.initList();
                        parent.layer.msg(result.msg);
                    }else{
                        layer.msg(result.msg);
					}
		    	},
		    	function(error){
		    		parent.layer.msg("调用失败！");
		    	}
		    );
		// };
	});
	///////////////////////////////////////////////////////基本信息结束///////////////////////////////////////////////////////
	
	
	
	
	///////////////////////////////////////////////////////已选取的海关商品代码库表格开始///////////////////////////////////////////////////////
	/**
	 @author 周小建
	 @time 2017-11-01
	 @description “已选取的海关商品代码库”表格
	 */
	var $selectedHgTable = $("#selectedHgTable");
	
	/**
	 @author 周小建
	 @time 2017-11-01
	 @description 获取“币制”的字典数据并构造下拉列表
	 */
	// var currencyDatas = getDicts("currency");
	var currencyDatas = getDictsExt("currency");
	var $selectedHgCurrency = $selectedHgTable.find(":input[name='currency']");

	for(var i=0;i<currencyDatas.length;i++){
		var n = currencyDatas[i];
		// $selectedHgCurrency.append('<option value="'+n.value+'"'+(n.value=='USD'?' selected':'')+'>'+n.text+'</option>');
        $selectedHgCurrency.append('<option value="'+n.value+'">'+n.text+'</option>');
    }
	// setTimeout(function(){$selectedHgCurrency.val("USD");},100);//必须有此代码，否则不能自动选中“美元”	周小建
	
	/**
	 @author 周小建
	 @time 2017-11-01
	 @description 获取“汇率”的字典数据并构造下拉列表
	 */
	//var zjmDatas = getDicts("zjmsfh");
	var zjmDatas = getDictsExt("zjmsfh");
	var $selectedHgzjm = $selectedHgTable.find(":input[name='tsl']");

	for(var i=0;i<zjmDatas.length;i++){
		var n = zjmDatas[i];
		$selectedHgzjm.append('<option value="'+n.value+'">'+n.text+'</option>');
	}
	/**
	 @author 周小建
	 @time 2017-11-01
	 @description “已选取的海关商品代码库”表格列配置，现已移入html文件中，所以将其注释。
	 */
	/*
	var selectedHgColumns = [
		{
			title : "商品编码",
			field : "goodsCode",
			formatter : function(value,row,index){
				return '<input style="height:18px;" name="goodsCode" class="thgspmInput" list="renwu_lisi_shangpinma" type="text" />';
			}
			
		},
		{
			title : "商品名称、规格型号",
			//field : "guige",
			formatter : function(value,row,index){
				return '<span title="">'+row.goodsName + row.specificationModel+'</span>';
			}
		},
		{
			title : "数量",
			field : "legalNum",
			formatter : function(){
				return '<input type="number" name="legalNum" style="width:80px; height:18px;" />';
			}
		},
		{
			title : "单位",
			field : "legalUnit"
		},
		{
			title : "单价",
			field : "unitPrice",
			formatter : function(){
				return '<input type="number" name="unitPrice" style="width:80px; height:18px;" />';
			}
		},
		{
			title : "总价",
			field : "totalPrice",
			formatter : function(){
				return '<input type="number" name="totalPrice" style="width:80px; height:18px;" />';
			}
		},
		{
			title : "币制",
			field : "currency",
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
			field : "exempt",
			formatter : function(){
				return '<input type="text" style="width:60px; height:18px;" />';
			}
		},
		{
			title : "操作",
			formatter : function(value,row,index){
				//return '<button class="btn btn-ckts btn-xs">归类</button>';
				return "归类"
			}
		}
	];
	*/
	
	/**
	 @author 周小建
	 @time 2017-11-01
	 @description “已选取的海关商品代码库”表格测试数据
	 */
	/*
	var selectedHgData = {
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
	    			"goodsCode": "A",
	    			"goodsName":"电视监控系统配件 防爆液晶显示器",
	    			"legalNum": 1,
	    			"specificationModel": "X-000",
	    			"legalUnit": "套",
	    			"unitPrice": 9662.39,
	    			"destinationAreaName" : "美国",
	    			"totalPrice": 9662.39,
	    			"currency" : "人民币",
	    			"exempt": "10%",
	    			"company": "扬州某点电缆股份有限公司"
	    		}
	    		{
	    			"goodsCode":"B",
	    			"goodsName": "电视监控系统配件 控制器内变压器 ",
	    			"legalNum": 2,
	    			"specificationModel": "ZJYP-4-2 220VAC/15VAC*⑴",
	    			"legalUnit": "套",
	    			"unitPrice": 146.16,
	    			"destinationAreaName" : "英国",
	    			"totalPrice": 292.32,
	    			"currency" : "人民币",
	    			"exempt": "10%",
	    			"company": "南京某自动化系统工程有限公司"
	    		},
	    		{
	    			"goodsCode":"C",
	    			"goodsName": "40钻机橡胶配件 ZJ40 钻井平台防滑板 ",
	    			"legalNum": 50,
	    			"specificationModel": "510*510*30 天然橡胶",
	    			"legalUnit": "件",
	    			"unitPrice": 1074.23,
	    			"destinationAreaName" : "德国",
	    			"totalPrice": 53711.54,
	    			"currency" : "人民币",
	    			"exempt": "10%",
	    			"company": "宝鸡某石油机械厂"
	    		},
	    		{
	    			"goodsCode":"D",
	    			"goodsName": "铜芯塑料绝缘电力电缆 VVR ",
	    			"legalNum": 0.6,
	    			"specificationModel": "3*6+1*4mm2 1kV GB/T 127*⑴",
	    			"legalUnit": "km",
	    			"unitPrice": 13569.23,
	    			"destinationAreaName" : "法国",
	    			"totalPrice": 8141.54,
	    			"currency" : "人民币",
	    			"exempt": "10%",
	    			"company": "扬州某点电缆股份有限公司"
	    		},
	    		{
	    			"goodsCode":"E",
	    			"goodsName": "铜芯塑料绝缘电力电缆 VVR ",
	    			"legalNum": 0.2,
	    			"specificationModel": "3*2.5+1*1.5 0.6/1kV GB/*⑴",
	    			"legalUnit": "km",
	    			"unitPrice": 7634.85,
	    			"destinationAreaName" : "韩国",
	    			"totalPrice": 1526.97,
	    			"currency" : "人民币",
	    			"exempt": "10%",
	    			"company": "扬州某点电缆股份有限公司"
	    		}
	        ], 
	        "thisPageLastElementNumber": 20, 
	        "previousPageNo": 0, 
	        "thisPageFirstElementNumber": 11
	    }
	};
	*/
	
	/**
	 @author 周小建
	 @time 2017-11-01
	 @description 利用前面定义的表格列配置，结合测试数据，构建和加载“已选取的海关商品代码库”表格
	 */
	//queryData({columns:selectedHgColumns,data:selectedHgData,$container:$selectedHgTable,height:68,pagination:false});
	
	/**
	 @author 周小建
	 @time 2017-11-01
	 @description 利用前面定义的表格列配置，结合ajax查询，构建和加载“已选取的海关商品代码库”表格
	 */
	/*
	$.ajax({
		url : "../../../../lcygdsh/getXiTongYuGanDanMxList",
		type : "post",
		data : {"rwbh":rwbh},
		dataType : "json",
		success : function(res){
			console.log(res.data);
			queryData({columns:selectedHgColumns,data:{success:true,data:{thisPageElements:res.data}},$container:$selectedHgTable,height:270});
		}
	});
	*/
	
	/**
	 @author 周小建
	 @time 2017-11-01
	 @description “已选取的海关商品代码库”表格中“数量”输入框的焦点离开事件处理函数
	 */
	/*
	$selectedHgTable.find("input[name='legalNum']").on("blur",function(e){
		var $this = $(this);
		var legalNum = $this.val()-0;
		$this.attr("valueBak",legalNum);
		
		var selections = $goodsTable.bootstrapTable("getSelections");
		for(var i=0;i<selections.length;i++){
			var selection = selections[i];
			legalNum += selection.numbers;
		}
		$this.val(legalNum);
		
		var totalPrice = $selectedHgTable.find("td:eq(5)").text()-0;
		var $unitPrice = $selectedHgTable.find("td:eq(4)");
		
		var selections = $goodsTable.bootstrapTable("getSelections");
		
		if(totalPrice>0 && legalNum>0 && selections.length>0){
			$unitPrice.text(totalPrice.div(legalNum).myToFixed(4));
		}else{
			$unitPrice.text("");
		}
	});
	*/
	
	/**
	 @author 周小建
	 @time 2017-11-01
	 @description “已选取的海关商品代码库”表格中的“放大镜”弹出“海关商品代码库选取”对话框。
	 */
	//选择商品代码库
	$("#chooseSpdmk").on("click",function(){
		/*
		var classifyedData = $classifyedTable.bootstrapTable("getData");
		if(classifyedData.length>0){
			fitterGoodsCodes = classifyedData.map(function(item){return item.goodsCode;});
		}
		var $buttons = $("#hgSearchBox").next().find("button");
		$buttons.eq(0).trigger("click");
		*/
		setClassifyedData();
		hgLayerIndex = layer.open({
			type : 1,
			title : "选择商品代码",
			area : ["98%","96%"],
			
			skin : "myLayui",
			//closeBtn : 0,
			//content : "../../../pages/liucheng/lisi/spdmk.html"
			content : $(".myContainer:eq(0)")
		});
	});
	
	/**
	 @author 周小建
	 @time 2017-11-01
	 @description “已选取的海关商品代码库”表格中的“归类”按钮的单击事件处理函数。
	 */
	$("#clsssifyBtn").click(function(){
		var $selectedHgTds = $selectedHgTable.find("td");
		var $cmcode = $selectedHgTds.eq(0).find("input[name='cmcode']");
		var cmcode = $cmcode.val();
		if(cmcode==""){
			top.layer.msg("商品编码不能为空！");
			return;
		}
		
		var $stanName = $selectedHgTds.eq(1);
		var stanName = $.trim($stanName.text());
		if(stanName==""){
			top.layer.msg("商品名称不能为空！");
			return;
		}
		
		var $itemType = $selectedHgTds.eq(2);
		var itemType = $.trim($itemType.text());
		if(!itemType) itemType = "";
		/*
		if(itemType==""){
			top.layer.msg("规格型号不能为空！");
			return;
		}
		*/
		//var $legalNum = $selectedHgTds.find("input[name='legalNum']");
		var $legalNum = $selectedHgTds.eq(3);
		var legalNum = $.trim($legalNum.text());
		if(legalNum==""){
			top.layer.msg("数量不能为空！");
			return;
		}
		legalNum -= 0; 
		if(legalNum<=0){
			top.layer.msg("数量必须是正数！");
			return;
		}
		
		var $unitName = $selectedHgTds.eq(4);
		var unitName = $.trim($unitName.text());
		if(unitName==""){
			top.layer.msg("单位不能为空！");
			return;
		}
		
		var $unitPrice = $selectedHgTds.eq(5);
		var unitPrice = $.trim($unitPrice.text());
		if(unitPrice==""){
			top.layer.msg("单价不能为空！");
			return;
		}
		unitPrice-=0;
		if(unitPrice<=0){
			top.layer.msg("单价必须是正数！");
			return;
		}
		
		var $totalPrice = $selectedHgTds.eq(6);
		var totalPrice = $.trim($totalPrice.text());
		if(totalPrice==""){
			top.layer.msg("总价不能为空！");
			return;
		}
		totalPrice-=0;
		if(totalPrice<=0){
			top.layer.msg("总价必须是正数！");
			return;
		}
		
		var $currency = $selectedHgTds.eq(7).find("select");
		var currency = $.trim($currency.val());
		// if(currency==""){
		// 	top.layer.msg("币制不能为空！");
		// 	return;
		// }
		
		var $tsl = $selectedHgTds.eq(8).find("select");
		var tsl = $.trim($tsl.val());
		/*
		if(tsl==""){
			top.layer.msg("征免不能为空！");
			return;
		}
		*/
		
		var selectedGoodsRows = $goodsTable.bootstrapTable("getSelections");
		if(selectedGoodsRows==null || selectedGoodsRows.length==0){
			top.layer.msg("请选择至少一条出口物资！");
			return;
		}
		$legalNum.attr("valueBak",0);
		var selectedCkhws = selectedGoodsRows.map(function(item){return item.ckhw;});
		var $trs = $goodsTable.find("tbody tr");
		/*
		for(var i=0;i<selectedCkhws.length;i++){
			selectedGoodsRows[i].goodsCodeYgd = cmcode;//归类操作时要将“物资”表格的相关行的goodsCodeYgd置为当前海关商品代码库的cmcode值。
			$goodsTable.bootstrapTable("hideRow",{uniqueId:selectedCkhws[i]});
		}
		*/
		
		for(var i=0;i<selectedGoodsRows.length;i++){
			var row = selectedGoodsRows[i];
			row.goodsCodeYgd = cmcode;
			var ckhw = row.ckhw;
			$trs.each(function(j,tr){
				if($(tr).attr("data-uniqueid")==ckhw){
					$(tr).hide();
					return false;
				}
			});
		}
		
		$goodsTable.bootstrapTable("uncheckBy",{field:"ckhw",values:selectedCkhws});
		
		$goodsTable.find("tbody").find("tr:visible").each(function(i,n){
			$(this).find("td:eq(1)").text(i+1);
		});
		/*
		$goodsTable.find("tbody").find("tr:hidden").each(function(i,n){
			$(this).find("td:last").find("a:eq(0)").attr("");
		});
		*/

		$classifyedTable.bootstrapTable("append",{
			goodsCode:cmcode,
			goodsName:stanName,
			specificationModel:itemType,
			legalNum:legalNum,
			legalUnit:unitName,
			unitPrice:unitPrice,
			totalPrice:totalPrice,
			currency:currency,
			exempt:tsl,
			bgdmxId:bgdmx,
			//商品代码库的字段开始
	        hgdmk: selection.hgdmk,
	        cmcode: selection.cmcode,
	        stanName: selection.stanName,
	        stanNameFlag: selection.stanNameFlag,
	        cmname: selection.cmname,
	        goodsType: selection.goodsType,
	        unitCode: selection.unitCode,
	        stanUnitFlag: selection.stanUnitFlag,
	        unitName: selection.unitName,
	        remark: selection.remark,
	        memo: selection.memo,
	        baseFlag: selection.baseFlag,
	        specialFlag: selection.specialFlag,
	        tsl: selection.tsl,
	        zsl: selection.zsl,
	        cldezs: selection.cldezs,
	        cjdlzs: selection.cjdlzs,
	        sz: selection.sz,
	        endTime: selection.endTime,
	        staTime: selection.staTime
	        //商品代码库的字段结束
		});
		
		/*
		var $classifyedTrs = $classifyedTable.find("tbody tr");
		$classifyedTrs.last().find("td:last").find("a:eq(0)").attr("ckhws",selectedCkhws.join(","));
		$classifyedTrs.each(function(i,tr){
			var $a = $(this).find("td:last").find("a:eq(0)");
			var ckhws = $a.attr("ckhws");
			alert(ckhws);
		});
		*/
		mapping[cmcode] = selectedCkhws.join(",");
		
		/*
		var $classifyedTrs = $classifyedTable.find("tbody tr");
		$classifyedTrs.each(function(i,tr){
			//var $a = $(this).find("td:last").find("a:eq(0)");
			//var key = $a.attr("key");
			//var key = $a.closest("tr").attr("data-uniqueid");
			var key = $(this).attr("data-uniqueid");
			alert(i + "		" + key + "------------" + mapping[key]);
		});
		*/
		
		/*
		48059300:ae6d02c9d0294b62b9e0087c04bd241d,760664b98507487a9d9fa0aeaaa8c82c
		4805920010:e62b8703dac94e329d10f7ab0f6d2b99
		48132000:afb94de4512945c1b9678954fef2f977
		*/
		
		$cmcode.val("");
		$stanName.text("");
		$itemType.text("");
		$legalNum.text("");
		$unitName.text("");
		$unitPrice.text("");
		$totalPrice.text("");
		$currency.val("USD");
		$tsl.val("");
	});
	///////////////////////////////////////////////////////已选取的海关商品代码库表格结束///////////////////////////////////////////////////////
	
	
	
	
	///////////////////////////////////////////////////////物资表格开始///////////////////////////////////////////////////////
	/**
	 @author 周小建
	 @time 2017-11-01
	 @description “物资”表格
	 */
	$goodsTable = $("#goodsTable");
	
	/**
	 @author 周小建
	 @time 2017-11-01
	 @description “物资”表格列配置
	 */
	var goodsColumns = [
		{
			//field : "state",
			checkbox : true,
			width : 40
		}, 
		{
			title : "序号",
			align : "center",
			formatter : function(value,row,index){
				var field = this.field;
				return index +1;
				//return '<font key="'+row.ckhw+'">' + (index + 1) + '</font>';
			},
			width : 40
		},
		{
			title : "出口货物id",
			field : "ckhw",
			class : "hide"
		},
		{
			title : "物资编码",
			field : "goodsId",
			width : 160,
            class : "hide"
		}, 
		{
			title : "物资名称",
			field : "goodsName",
			width : 360,
			//formatter : labelTrimFormatter
			formatter : function(value,row,index){
				return labelTrimFormatter(value,row,index,24);
			}
		}, 
		{
			title : "数量",
			field : "numbers",
			width : 60
		}, 
		{
			title : "规格型号",
			field : "itemType",
			width : 120,
			formatter : function(value,row,index){
				return labelTrimFormatter(value,row,index,10);
			}
		}, 
		{
			title : "计量单位",
			field : "measurementUnit",
			width : 60
		}, 
		{
			title : "单价",
			field : "price",
			width : 60
		}, 
		{
			title : "总价",
			field : "total",
			width : 80
		}, 
		{
			title : "供货方",
			field : "supplier",
			//formatter : labelTrimFormatter
			formatter : function(value,row,index){
				return labelTrimFormatter(value,row,index,16);
			}
		}
	];
	
	/**
	 @author 周小建
	 @time 2017-11-01
	 @description “物资”表格选中事件处理器。
	 */
	function checkHandler(row,$element){
		var selections = $goodsTable.bootstrapTable("getSelections");
		var numbersSum=0,totalSum=0;
		for(var i=0;i<selections.length;i++){
			var selection = selections[i];
			numbersSum += selection.numbers;
			totalSum+=selection.total;
		}
		$selectedHgTable.find("td:eq(5)").text(totalSum);
		var $unitPrice = $selectedHgTable.find("td:eq(4)");
		var $legalNum = $selectedHgTable.find("td:eq(2)").find("input[name='legalNum']");
		
		//var legalNum = $legalNum.val()-0 + numbersSum;
		var legalNum = ($legalNum.attr("valueBak")||0)-0 + numbersSum;
		$legalNum.val(legalNum);
		if(totalSum>0 && legalNum>0){
			$unitPrice.text(totalSum.div(legalNum).myToFixed(4));
		}else{
			$unitPrice.text("");
			$legalNum.val(0);
		}
	}
	
	/**
	 @author 周小建
	 @time 2017-11-01
	 @description 结合测试数据构建和加载“物资”表格，并定义它的选中和取消选中事件处理函数。
	 */
	// riskManageWeb/lcygdsh/getFlhw     参数 rwbh:rw001  请求方式 post
	//$.getJSON("../../../data/goods.json",function(result){
	ajaxHelper("../../../../lcygdsh/getFlhw",{rwbh:rwbh},function(result){
		/*
		var array = [];
		for(var i=0;i<result.data.length;i++){
			var item = result.data[i];
			var goodsCodeYgd = item.goodsCodeYgd;
			if(goodsCodeYgd!=null && goodsCodeYgd!=""){
				array.push(item.ckhw);
			}
		}
		*/
		mingXiRow = result.data;
		
		queryData({$container:$goodsTable,columns:goodsColumns,data:{data:{thisPageElements:result.data}},height:170,pageList:[],pageSize:result.data.length,uniqueId:"ckhw",pagination:false,checkboxHeader:false,
			onCheck:function(row,$element){
				$element.closest("tr").find("td").css("backgroundColor","#e1dddd");
				//checkHandler(row,$element);
				/*
				var $selectedHgTds = $("#selectedHgTable").find("td");
				var $specificationModel = $selectedHgTds.eq(2);
				if(!$specificationModel.text()){
					$specificationModel.text(row.itemType);
				}
				*/
			},
			onUncheck:function(row,$element){
				$element.closest("tr").find("td").css("backgroundColor","");
				//checkHandler(row,$element);
			},
			onPostBody:function(data){
				/*
				//如果加上setTimeout可能导致页面死机，而去掉可能使表格宽度错位，所以将其注释改为后面实现方式。周小建
				setTimeout(function(){
					for(var i=0;i<array.length;i++){
						$goodsTable.bootstrapTable("hideRow",{
							uniqueId:array[i]
						});
					}
					$goodsTable.find("tbody").find("tr:visible").each(function(i,n){
						$(this).find("td:eq(1)").text(i+1);
					});
				},0);
				*/
				
				var seq = 0;
				var $trs = $goodsTable.find("tbody").find("tr");
				for(var i=0;i<result.data.length;i++){
					var row = result.data[i];
					var $tr = $trs.eq(i);
					//if(row.goodsCodeYgd!=null && row.goodsCodeYgd!="") $goodsTable.bootstrapTable("hideRow",{uniqueId:result.data[i].ckhw});
					if(row.goodsCodeYgd!=null && row.goodsCodeYgd!="") $tr.hide();
					else $tr.find("td:eq(1)").text(++seq);
				}
				var fixTable = $goodsTable.closest(".fixed-table-container");
				fixTable.height(fixTable.height()+32);
				$goodsTable.closest(".fixed-table-body").height(fixTable.height());
			}
		});
		
		handleClassifyed();
		/*
		//处理已关联行的隐藏以及未关联行的序号重排。
		setTimeout(function(){
			var seq = 0;
			for(var i=0;i<result.data.length;i++){
				var row = result.data[i];
				if(row.goodsCodeYgd!=null && row.goodsCodeYgd!="") $goodsTable.bootstrapTable("hideRow",{uniqueId:result.data[i].ckhw});
				else $goodsTable.find("tbody").find("tr").eq(i).find("td:eq(1)").text(++seq);
			}
			
			$goodsTable.find("tbody").find("tr:visible").each(function(i,n){
				$(this).find("td:eq(1)").text(i+1);
			});
		},1000);
		*/
	});
	///////////////////////////////////////////////////////物资表格结束///////////////////////////////////////////////////////
	
	
	
	
	///////////////////////////////////////////////////////已归类的海关商品代码库表格开始///////////////////////////////////////////////////////
	/**
	 @author 周小建
	 @time 2017-11-01
	 @description “已归类的海关商品代码库”表格。
	 */
	$classifyedTable = $("#classifyedTable");
	
	/**
	 @author 周小建
	 @time 2017-11-01
	 @description “已归类的海关商品代码库”表格列配置。
	 */
	var classifyedColumns = [
		{
			title : "序号",
			formatter : function(value,row,index){
				return index +1;
			}
		},
		{
			title:"商品编码",
			field:"系统预关单明细",
			class:"hide"
		},
		{
			title : "商品编码",
			field : "goodsCode",
			formatter : function(value,row,index){
				return '<a href="javascript:;" class="lookMinXi">'+value+'</a>';
				
				
			}
		},
		{
			title : "商品名称",
			field:"goodsName",
			formatter : function(value,row,index){
				//value = row.goodsName + "," + row.specificationModel;
				/*
				var title = value;
				var text = value;
				if(text && text.length>50){
					text = text.substring(0,50)+"...";
				}
				return '<span title="'+title+'">'+text+'</span>';
				*/
				return labelTrimFormatter(value,row,index,15);
			}
		},
		{
			title : "规格型号",
			field:"specificationModel",
			formatter : function(value,row,index){
				return labelTrimFormatter(value,row,index,10);
			}
		},
		{
			title : "数量",
			field : "legalNum"
		},
		{
			title : "单位",
			field : "legalUnit"
		},
		{
			title : "单价",
			field : "unitPrice"
		},
		{
			title : "总价",
			field : "totalPrice"
		},
		{
			title : "币制",
			field : "currency",
			formatter:function(value,row,index){
				return getDict("currency",value);
			}
		},
		{
			title : "征免",
			field : "exempt",
			formatter:function(value,row,index){
				if(value){
					return getDict("zjmsfh",value);
				}else{
					return "";
				}
				
			}
		},
		{
			title : "操作",
			formatter : function(value,row,index){
				//return '<p class="text-center" style="margin-bottom:0"><a href="javascript:void(0);" class="text-info rowUpdate" key="'+row.goodsCode+'">修改</a><a style="margin-left:5px;"  href="javascript:void(0);" class="text-info rowDelete" key="'+row.goodsCode+'">删除</a></p>';
				//return '<p class="text-center" style="margin-bottom:0"><a  href="javascript:void(0);" class="text-info rowDelete" key="'+row.goodsCode+'" ckhws="'+row.ckhw+'" onclick="deleteClassify(this);">删除</a></p>';
				return '<p class="text-center" style="margin-bottom:0"><a  href="javascript:void(0);" class="text-info rowDelete" onclick="deleteClassify(this);">删除</a></p>';
			}
		},
		{
			title:"",
			filed:"bgdmxId",
			class:"hide"
		}
	];
	
	/**
	 @author 周小建
	 @time 2017-11-01
	 @description 结合测试数据构建和加载“已归类的海关商品代码库”表格。
	 */
	//$.getJSON("../../../data/classifyHg.json",function(result){
	function handleClassifyed(){
		// ajaxHelper("../../../../lcygdsh/getXiTongYuGanDanMxList",{rwbh:rwbh},function(result){
		ajaxHelper("../../../../lcgdsh/findBaoGuanDanMingxi",{rwbh:rwbh},function(result){
			//queryData({$container:$goodsTable,columns:goodsColumns,data:result,height:170,pagination:false,pageSize:5});
			queryData({$container:$classifyedTable,columns:classifyedColumns,data:{data:{thisPageElements:result.data}},height:240,pagination:false,uniqueId:"goodsCode",
				onPostBody:function(data){
					//setTimeout(function(){
						var goodsRows = $goodsTable.bootstrapTable("getData");
						var classifyTrs = $classifyedTable.find("tbody tr");
						var classifyRows = result.data;	
						for(var i=0;i<classifyRows.length;i++){
							var classifyRow = classifyRows[i];
							var goodsCode = classifyRow.goodsCode;
							if(goodsCode){
								var array = [];
								for(var j=0;j<goodsRows.length;j++){
									var goodsRow = goodsRows[j];
									var ckhw=goodsRow.ckhw,goodsCodeYgd=goodsRow.goodsCodeYgd;
									if(goodsCodeYgd==goodsCode){
										array.push(ckhw);
									}
								}
								//if(array.length>0)
								//classifyTrs.eq(i).find("td:last").find("a:eq(0)").attr("ckhws",array.join(","));
								//var key = classifyTrs.eq(i).find("td:last").find("a:eq(0)").attr("key");
								var key = classifyTrs.eq(i).attr("data-uniqueid");
								mapping[key] = array.join(",");
							}
						}
					//},0);
				}
			});
		});
	}
	//$("div.fixed-table-body:gt(0)").css("overflowY","scroll");
	///////////////////////////////////////////////////////已归类的海关商品代码库表格结束///////////////////////////////////////////////////////
	
	
	///////////////////////////////////////////////////////已归类的海关商品明细表格开始///////////////////////////////////////////////////////
	//已归类的海关商品代码明细 classifyedMingXi
	//查看明细
	$(document).on("click",".lookMinXi",function(){
		var goodsCode = $.trim($(this).html());
		var tempArray = [];
		for(var i=0; i<mingXiRow.length; i++){
			var item = mingXiRow[i];
			if(item.goodsCodeYgd && item.goodsCodeYgd==goodsCode){
				tempArray.push(mingXiRow[i]);
			}
		}
		mingXiRows = tempArray;
		layer.open({
			type : 2,
			title : "商品明细<span style='color:red'>【商品编码:"+goodsCode+"】</span>",
			area : ["98%","96%"],
			
			skin : "myLayui",
			//closeBtn : 0,
			content : "../../../pages/liucheng/lisi/classify_detail.html"
			//content : $(".classifyedMingXi:eq(0)")
			
		});
	});
	///////////////////////////////////////////////////////已归类的海关商品明细表格结束///////////////////////////////////////////////////////
	//过滤掉已归类的海关编码
	setTimeout(function(){
		// setClassifyedData();
	},200);
	
	
	
});

function deleteClassify(a){
	layer.confirm("确定要删除吗?",{btn:["确定"]},function(){
		//var goodsCode = $(a).attr("key");
		var goodsCode = $(a).closest("tr").attr("data-uniqueid");
		//var selectedCkhws = $(a).attr("ckhws");
		var selectedCkhws = mapping[goodsCode];
		delete mapping[goodsCode];
		$classifyedTable.bootstrapTable("remove",{
			field:"goodsCode",values:[goodsCode]
		});
		var $trs = $goodsTable.find("tbody tr");
		if(selectedCkhws){
			selectedCkhws = selectedCkhws.split(",");
			for(var i=0;i<selectedCkhws.length;i++){
				var itemRow = $goodsTable.bootstrapTable("getRowByUniqueId",selectedCkhws[i]);
				itemRow.goodsCodeYgd = null;//删除操作时要将“物资”表格的相关行的goodsCodeYgd置空。
				//$goodsTable.bootstrapTable("showRow",{uniqueId:selectedCkhws[i]});
				$trs.each(function(j,tr){
					if($(tr).attr("data-uniqueid")==selectedCkhws[i]){
						$(tr).show();
						return false;
					}
				});
			}
		}
		$goodsTable.find("tbody").find("tr:visible").each(function(i,n){
			$(this).find("td:eq(1)").text(i+1);
		});
		
		$goodsTable.bootstrapTable("uncheckAll");
		
		layer.msg("已归类的海关商品代码库数据删除成功！");
	});
}

//已经归类的商品编码
function setClassifyedData(){
    fitterGoodsCodes=[];
	var classifyedData = $classifyedTable.bootstrapTable("getData");
	if(classifyedData.length>0){
		fitterGoodsCodes = classifyedData.map(function(item){return item.goodsCode;});
	}
	var $buttons = $("#hgSearchBox").next().find("button");
	$buttons.eq(0).trigger("click");
}
