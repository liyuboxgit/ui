var loadData = null;
var ckhwColumns = null;
var isReview = false;
var isDaiLiBan = parentTabWindow.serchParam.branch; //是否是代理版
var rwbh="";
var dataCache = {
	allCkhw:[],//出口货物列表中的所有数据，它用于提交操作时做为所有页的数据。
	checkedCkhw : {},//出口货物列表中已选定的所有数据，它用于删除出口货物操作时做为所有页的数据。
	allCghw : [],//采购货物列表中的所有数据，它用于删除出口货物操作时将所有待删除出口货物的剩余数据归还所有对应的采购货物数据。
	checkedCghw : {}//采购货物列表中已选定的所有数据，它用于将采购货物回传给出口货物时的所有页已选中数据。
};
$(function(){
	var $renwuForm=$("#renwuForm"),$cghwForm=$("#cghwForm"),$ckhwTable=$("#ckhwTable"),$cghwDiv=$("#cghwDiv"),$cghwTable=$("#cghwTable");
	var globalSeq = 0;//全局计数器
	
	/**
	 @author 周小建
	 @time 2017-11-01
	 @description 这是一个在本模块中通用的函数，用于对已有数据进行重构并在表格中加载，
	 				并在加载完成后将checkedRowList中已存在项自动选中，以及自动注册“分配数量”输入框的焦点离开事件（校验数据合理性并在校验通过后动态修改“剩余数量”）
	 				这是一个逻辑性很强的处理函数，当然也比较复杂。
	 */
	loadData = function($container,columns,result,kind){
		var checkedKind="checked"+kind;
		//0
		dataCache["all"+kind] = result;
		//var data = {data:{thisPageElements:result}};
		for(var i=0;i<result.length;i++){ 
			var item = result[i];
			//item.seq = i;
			//if(item.selectedCount>0) dataCache["checked"+kind][i] = item;
			if(item.selectedCount>0){
				item.seq = globalSeq++;
				//dataCache["checked"+kind][i] = item;
				dataCache["checked"+kind][item.goodsId] = item;
			}
		}
		
		/**
		 @author 周小建
		 @time 2017-11-01
		 @description “采购货物”表格加载成功后的处理函数，用于在第一次加载和分页时调用
		 */
		function loadSuccessHandler(datas){
			//var datas = $cghwTable.bootstrapTable("getData");
			for(var i=0;i<datas.length;i++){
				var item = datas[i];
				/*
				var selectedCount = item.selectedCount;
				if(selectedCount>0){
					$cghwTable.bootstrapTable("check",i);
				}
				*/
				//if(dataCache["checked"+kind][item.seq]!=null) $container.bootstrapTable("check",item.seq);//选中状态还需要根据数据值进行自动完成
				if(dataCache["checked"+kind][item.goodsId]!=null) $container.bootstrapTable("checkBy",{field:"goodsId",values:[item.goodsId]});//选中状态还需要根据数据值进行自动完成
				else $container.bootstrapTable("uncheckBy",{field:"goodsId",values:[item.goodsId]});
			}
			var thisData = $container.bootstrapTable("getData");
			$(":input[name='fpNumbers']",$container).each(function(i,input){
				var $this = $(this);
				$this.bind("click",function(e){
					processEvent(e);
				}).bind("blur",function(e){
					//var $this = $(this);
					var thisValue = $this.val()-0;
					var kfValue = $this.closest("td").prev().text()-0;
					var $sy = $this.closest("td").prevAll().eq(1);
					function errorHandler(text){
						layer.msg(text,{time:1000},function(){
							//$this.focus();
						});
						processEvent(e);
					}
					if($this.val()==""){
						errorHandler("【分配数量】不可为空");
					}else if(thisValue<=0){
						errorHandler("【分配数量】必须为正数");
						$this.val(0);
					}else if(thisValue>kfValue){
						errorHandler("【分配数量】不能超过【可分数量】");
						//layer.tips("这是小提示",this);
						$this.val(0);
					}else{
						var thisValueBak = $this.attr("thisValueBak")-0;
						var syValueBak = $this.attr("syValueBak")-0;
						var syValue = syValueBak - (thisValue-thisValueBak);
						$sy.text(syValue);
						datas[i].fpNumbers = thisValue;
						datas[i].syNumbers = syValue;
					}
					processEvent(e);
				})
				/*
				.validate({
					rules:{
						required:true,
						min:0,
						max:$(this).closest("td").prev().text()
					},
					messages:{
						required:"【分配数量】不可空",
						min:"【分配数量】不能小于0",
						max:"【分配数量】不能大于"+$(this).closest("td").prev().text()
					}
				});
				//.rules("add",{min:0,max:100})
				*/
				//$("#cghwForm").validate();
			});
			//$cghwTable.bootstrapTable();
		}
		
		//1
		//queryData({data:data,$container:$goodsList,height:284});
		queryData({
			data:{
				data:{
					pageSize:5,
					pageNo:1,
					thisPageElements:result
				}
			},
			$container:$container,
			columns:columns,
			pageList:[5,10],
			pageSize:5,
			height:290,
			onLoadSuccess:function(datas){
				
			},
			onPageChange:function(pageNumber,pageSize){
				loadSuccessHandler(result.slice(pageSize * (pageNumber-1),pageSize * pageNumber));
				$(".fixed-table-container",$container).height(290);
			},
			onCheck:function(row, $element){
				$element.closest("tr").find("td").css("backgroundColor","#e1dddd");
				//dataCache["checked"+kind][row.seq] = $.extend({},row);
				//dataCache["checked"+kind][row.seq] = row;
				row.seq = globalSeq++;
				dataCache["checked"+kind][row.goodsId] = row;
			},
			onCheckAll:function(rows){
				$container.find("tbody").find("td").css("backgroundColor","#e1dddd");
				//for(var i=0;i<rows.length;i++) dataCache["checked"+kind][rows[i].seq] = $.extend({},rows[i]);
				//for(var i=0;i<rows.length;i++) dataCache["checked"+kind][rows[i].seq] = rows[i];
				for(var i=0;i<rows.length;i++){
					var row = rows[i];
					row.seq = globalSeq++;
					dataCache["checked"+kind][row.goodsId] = row;
				}
			},
			onUncheck:function(row,$element){
				$element.closest("tr").find("td").css("backgroundColor","");
				//dataCache["checked"+kind][row.seq] = null;
				delete row.seq;
				delete dataCache["checked"+kind][row.goodsId];
			},
			onUncheckAll:function(rows){
				$container.find("tbody").find("td").css("backgroundColor","");
				//for(var i=0;i<rows.length;i++) dataCache["checked"+kind][rows[i].seq] = null;
				for(var i=0;i<rows.length;i++){
					var row = rows[i];
					delete row.seq;
					delete dataCache["checked"+kind][row.goodsId];
				}
			}
		});
		
		//2 第一次加载表格完成后的处理
		var pageNumber = $($container).find(".pagination .active").text();
		if(!pageNumber) pageNumber = 1;
		var pageSize = $($container).find(".pagination-detail .page-size").text();
		if(!pageSize) pageSize = 10;
		loadSuccessHandler(result.slice(pageSize * (pageNumber-1),pageSize * pageNumber));
	};//通用函数
	
	
	////////////////////////////////////////////////////基本信息开始//////////////////////////////////////////////////
	/**
	 @author 周小建
	 @time 2017-11-01
	 @description 任务基本信息表单配置
	 */
	var formConfig = {
		container:"basicDiv",
		columns:[
			{col:"rwbh",label:"任务编号",type:"text",display:false},
			{col:"ckht",label:"出口合同",type:"text",display:false},
			{col:"contractCode",label:"出口合同",type:"text",display:false},
			
			{col:"nsrsbh",label:"纳税人识别号",type:"text",display:false},//代理版中出现,外贸版中没有
			{col:"supplierName",label:"生产企业",type:"text",readonly:true,display:false},//代理版中出现,外贸版中没有
			
			{col:"contractName",label:"出口合同",type:"text",readonly:true},
			{col:"taskName",label:"任务名称",type:"text",validate:{required:true}},
			{col:"serviceType",label:"贸易方式",type:"select",validate:{required:true},options:getDictsExt("maoyifs")},
			{col:"destinationAreaName",label:"运抵国",type:"select",validate:{required:true},options:getDictsExt("nation")},
			{col:"exportPortName",label:"出口口岸",type:"select",validate:{required:true},options:getDictsExt("exportPortName")},
			{col:"transportMode",label:"运输方式",type:"select",validate:{required:true},options:getDictsExt("transportMode")},
			//{col:"dqhj",label:"当前环节",type:"select",validate:{required:true},options:$.grep(getHuanJie(),function(a,i){return i>0;})},
			//{col:"updateName",label:"发起人",type:"text",validate:{required:true}},
			{col:"xyybgd",label:"生成预关单",type:"select",validate:{required:true},options  : [
				//{text : "请选择", value : ""},
				{text : "是", value : "y"},
				{text : "否", value : "n"}
			]},
			{col:"remarks",label:"说明",type:"textarea",rowNum : 3}
		]
	};
	
	if(Number(isDaiLiBan)){//如果是代理版(代理版中出现,外贸版中没有)
		formConfig.columns[4].display = true;
	}
	
	formGenerator(formConfig);//生成任务基本信息表单
	$("#basicDiv").find("input[name='contractName']:eq(0)").after('<a href="javascript:void(0);" id="chooseCkht" title="选取出口合同" class="text-info searchBtn" style0="position:absolute;right:-15px;top:2px;z-index:2;"><i class="fa fa-search"></i></a>');
	$("#basicDiv").find("input[name='supplierName']:eq(0)").after('<a href="javascript:void(0);" id="chooseQy" title="选取生产企业" class="text-info searchBtn" style0="position:absolute;right:-15px;top:2px;z-index:2;"><i class="fa fa-search"></i></a>');
	
	registerValidate($renwuForm,formConfig);//任务基本信息表单验证
	
	
	/**
	 @author 周小建
	 @time 2017-11-01
	 @description 选择出口合同。
	 */
	$("#chooseCkht").on("click",function(e){
		/*
		layer.open({
			type : 2,
			title : "选择出口合同",
			area : ["98%","96%"],
			skin : "myLayui",
			scrollbar : false,
			//closeBtn : 0,
			content : "../../../pages/liucheng/zhangsan/chooseCkht.html"
			//content : parent.$(".layerBodyBg:eq(0)")
		});
		*/
		openTab("选择出口合同","liucheng/zhangsan/chooseCkht.html");
		processEvent(e);
	});
	
	/**
	 @author 周小建
	 @time 2017-11-01
	 @description 选择生产企业。
	 */
	$("#chooseQy").on("click",function(e){
		/*
		layer.open({
			type : 2,
			title : "选择生产企业",
			area : ["98%","96%"],
			skin : "myLayui",
			scrollbar : false,
			//closeBtn : 0,
			content : "../../../pages/liucheng/zhangsan/chooseQiYe.html"
				//content : parent.$(".layerBodyBg:eq(0)")
		});
		*/
		openTab("选择生产企业","liucheng/zhangsan/chooseQiYe.html");
		processEvent(e);
	});
	
	
	/*
	var $ckhtTable = parent.$("#ckhtTable");
	
	$("#chooseCkht").on("click",function(){
		parent.layer.open({
			type : 1,
			title : "选择出口合同",
			area : ["96%","96%"],
			
			skin : "myLayui",
			//closeBtn : 0,
			//content : "../../../pages/liucheng/zhangsan/chooseCkht.html"
			content : parent.$(".layerBodyBg:eq(0)")
		});
	});
	
	var ckhtColumns = [ 
		{
			//field : 'state',
			align:'center',
			checkbox : true
		},
		{
			title : '序号',
			align:'center',
			formatter : function(value,row,index){ 
				var page = $ckhtTable.bootstrapTable("getPage");
				var pageSize = page.pageSize,pageNumber = page.pageNumber;
				return page.pageSize*(page.pageNumber-1)+index+1;
			}
		},
		{
			title : '合同ID',
			align:'center',
			field : 'ckht',
			visible : false
		},
		{
			title : '合同编号',
			align:'center',
			field : 'contractCode',
			align : 'left'
		}, 
		{
			title : '合同名称',
			align:'center',
			field : 'contractName',
			align : 'left',
			formatter : labelTrimFormatter
		}, 
		{
			title : '签订日期',
			align:'center',
			field : 'signDate'
		}, 
		{
			title : '买方',
			align:'center',
			field : 'buyerName',
			align : 'left',
			formatter : labelTrimFormatter
		}, 
		{
			title : '卖方',
			align:'center',
			field : 'sellerName',
			align : 'left',
			formatter : labelTrimFormatter
		}, 
		{
			title : '出口国别',
			align:'center',
			field : 'exportCountry',
			formatter : nullFormatter
		}, 
		{
			title : '贸易方式',
			align:'center',
			field : 'serviceType'
		}
	];
	
	formGenerator({
		container :  parent.$("#ckhtSearchBox"),
		columns : [
			{
				col : "contractCode",
				type : "text",
				label : "合同编号"
			},
			{
				col : "contractName",
				type : "text",
				label : "合同名称"
			},
			{
				col : "exportCountry",
				label : "出口国别",
				type : "select",
				options : getDictsExt("nation")
			}
		]
	},"query");
	//查询
	parent.$("#ckhtSearchBtn").on("click",function(){
		queryData({url:"../../../../chuKouHeTong/findPageByCondition?branch=0",$container:$ckhtTable,columns:ckhtColumns});
		//queryData({});
	}).trigger("click");
	*/
	
	
	
	
	/**
	 @author 周小建
	 @time 2017-11-01
	 @description 添加任务基本信息页面中的重置按钮，现已移入html页面中，所以将其注释。
	 */
	/*
	addTableHeaderOpration({
		container : "firstStep",
		btns : [
			{id: "", content: "重置",className : "glyphicon glyphicon-repeat"}
		]
	});
	*/

	/**
	 @author 周小建
	 @time 2017-11-01
	 @description 如果是“修改”操作，则查询本任务的已有基本信息，并加载到表单
	 */
	if(parentTabWindow.currentSelectRow!=null){
		rwbh=parentTabWindow.currentSelectRow.rwbh;
		ajaxHelper("../../../../renwu/selectByRwbh",{rwbh:parentTabWindow.currentSelectRow.rwbh,branch:parentTabWindow.currentSelectRow.branch},function(result){
	   		setFormData($renwuForm,document,result.data);
		});
	}
	////////////////////////////////////////////////////基本信息结束//////////////////////////////////////////////////
	
	
	
	
	////////////////////////////////////////////////////出口货物开始//////////////////////////////////////////////////
	/**
	 @author 周小建
	 @time 2017-11-01
	 @description 添加“出口货物”页面中的若干按钮
	 */
	addTableHeaderOpration({
		container : "secondStep",
		btns : [
			{id: "chooseCghw", content: "选择出口货物",className : "glyphicon glyphicon-plus"},
			{id: "deleteCkhw", content: "删除",className : "glyphicon glyphicon-trash"},
			{id: "importCkhw", content: "导入",className : "glyphicon glyphicon-import"},
			//{id: "export", content: "导出",className : "glyphicon glyphicon-export"},
			{id: "saveOrUupdate", content: "保存",className : "glyphicon glyphicon-saved"}
		]
	});
	
	/**
	 @author 周小建
	 @time 2017-11-01
	 @description 任务基本信息页面中的“下一步”按钮和出口货物页面中的“上一步”按钮的单击事件处理函数，两个其实是同一个按钮，只是显示信息进行切换。
	 */
	$("#nextStep").on("click",function(e){
		if($("#renwuForm").valid()){
			if($(this).html().indexOf("上一步") !== -1){
				$(this).html('<i class="glyphicon glyphicon-triangle-right"></i>下一步');
				//$(this).siblings().hide();
				$("#firstStep").show();
				$("#secondStep").hide();
			}else{
				var ckht = $renwuForm.find(":input[name='ckht']:eq(0)").val();
				var xyybgd = $renwuForm.find(":input[name='xyybgd']:eq(0)").val();
				if(!ckht && xyybgd=="y"){//没选出口合同，并且要生成预报关单
					parent.layer.alert("如果要生成预报关单必须选择出口合同!");
					return;
				}
				if(ckht){//已选出口合同，包括要生成预报关单和不生成预报关单两种
					var associatedCghts = [];
					var cgOrBcUrl = "";
					if(Number(isDaiLiBan)){//如果是代理版
						cgOrBcUrl = "../../../../chuKouHeTong/findAssociatedBcht";
					}else{
						cgOrBcUrl = "../../../../chuKouHeTong/findAssociatedCght";
					}
					$.ajax({
						type: "POST",
						// url: "../../../../chuKouHeTong/findAssociatedCght",
                        //url: "../../../../chuKouHeTong/findAssociatedBcht",
						url : cgOrBcUrl,
						data: {ckht:ckht},
						dataType:"json",
						async:false,
						cache:false,
						success:function(data){
							if(Number(isDaiLiBan)){//如果是代理版
								associatedCghts = data.data;
							}else{
								associatedCghts = data;
								
							}
						},
						error:function(){}
					});
					
					var htType = "";
					if(Number(isDaiLiBan)){//如果是代理版
						htType = "补充";
					}else{
						htType = "采购";
					}
					
					if(associatedCghts.length==0){
						parent.layer.alert("出口合同【" + $renwuForm.find(":input[name='contractName']:eq(0)").val() + "】没有关联"+htType+"合同，请重新选取！");
						$renwuForm.find(":input[name='ckht']:eq(0)").val("");
						$renwuForm.find(":input[name='contractCode']:eq(0)").val("");
						$renwuForm.find(":input[name='contractName']:eq(0)").val("");
						
						$renwuForm.find(":input[name='serviceType']").val("").attr("readonly",false).nextAll("span").remove();
						$renwuForm.find(":input[name='destinationAreaName']").val("").attr("readonly",false).nextAll("span").remove();;
						$renwuForm.find(":input[name='exportPortName']").val("").attr("readonly",false).nextAll("span").remove();;
						$renwuForm.find(":input[name='transportMode']").val("").attr("readonly",false).nextAll("span").remove();;
						
						
						$("#chooseCghw").attr("disabled",true);
						return;
					}
					var params = [];
					for(var i=0;i<associatedCghts.length;i++){
						if(Number(isDaiLiBan)){//如果是代理版
							params.push(associatedCghts[i].bcht);
						}else{
							params.push(associatedCghts[i].cght);
						}
						//params.push(associatedCghts[i].cght);
					}
					var cghwOrBcHwUrl = "";
					var cghwOrBcData = {};
					var associatedCghwCount = 0;
					if(Number(isDaiLiBan)){//如果是代理版
						cghwOrBcHwUrl = "../../../../buchonght/findCghwListByCghts";
						cghwOrBcData = {bchts:params.join(",")};
					}else{
						cghwOrBcHwUrl = "../../../../caiGouHeTong/findCghwListByCghts";
						cghwOrBcData = {cghts:params.join(",")};
					}
					
					$.ajax({
						type: "POST",
						//url: "../../../../caiGouHeTong/findCghwListByCghts",
						//data: {cghts:params.join(",")},
                        
						//url: "../../../../buchonght/findCghwListByCghts",
                        //data: {bchts:params.join(",")},
						
						url : cghwOrBcHwUrl,
						data : cghwOrBcData,
						dataType:"json",
						async:false,
						cache:false,
						success:function(data){
							associatedCghwCount = data;
						},
						error:function(){}
					});
					if(associatedCghwCount==0){
						parent.layer.alert("出口合同【" + $renwuForm.find(":input[name='contractName']:eq(0)").val() + "】关联的"+htType+"合同没有附带的商品，请在\""+htType+"合同\"导入商品！");
						$renwuForm.find(":input[name='ckht']:eq(0)").val("");
						$renwuForm.find(":input[name='contractCode']:eq(0)").val("");
						$renwuForm.find(":input[name='contractName']:eq(0)").val("");
						
						$renwuForm.find(":input[name='serviceType']").val("").attr("readonly",false).nextAll("span").remove();
						$renwuForm.find(":input[name='destinationAreaName']").val("").attr("readonly",false).nextAll("span").remove();;
						$renwuForm.find(":input[name='exportPortName']").val("").attr("readonly",false).nextAll("span").remove();;
						$renwuForm.find(":input[name='transportMode']").val("").attr("readonly",false).nextAll("span").remove();;
						
						$("#chooseCghw").attr("disabled",true);
						return;
					}
					$("#importCkhw").hide();
					$("#chooseCghw").show();
					isReview = false;
				}else{//没选出口合同，且不生成预报关单
					$("#importCkhw").show();
					$("#chooseCghw").hide();
					//isReview = true;
				}
				$("#chooseCghw").removeAttr("disabled");
				$(this).html('<i class="glyphicon glyphicon-triangle-left"></i>上一步');
				//$(this).siblings().hide();
				$("#firstStep").hide();
				$("#secondStep").show();
			}
			
			var $thisTitle = $(".nav-tabs li[class='active']");
			var $sibTitle = $thisTitle.siblings(".hide");
			$thisTitle.removeClass("active").addClass("hide");
			$sibTitle.addClass("active").removeClass("hide");
			var $thisCon = $(".tab-content>div.active");
			var $sibCon = $thisCon.siblings();
			$thisCon.removeClass("active").fadeOut();
			$sibCon.addClass("active").fadeIn();
		}
		processEvent(e);
	});
	
	/**
	 @author 周小建
	 @time 2017-11-01
	 @description 出口货物页面中出口货物表格列配置。
	 */
	ckhwColumns = [ 
		{
			align:"center",
			checkbox : true,
			field : "checked"
		},
		{
			title : "序号",
			align:"center",
			formatter : function(value,row,index){
				/*
				var pageNumber = $(".pagination .active").text();
				var pageSize = $(".pagination-detail .page-size").text();
				return pageSize * (pageNumber-1) + index + 1;
				 */
				/*
				//return index + 1;
				var page = $ckhwTable.bootstrapTable("getPage");
				var pageSize = page.pageSize,pageNumber = page.pageNumber;
				return page.pageSize*(page.pageNumber-1)+index+1;
				*/
				
				if(flag){
					var page = $ckhwTable.bootstrapTable("getPage");
					var pageSize = page.pageSize,pageNumber = page.pageNumber;
					return isNaN(pageSize) || isNaN(pageNumber) ? (index + 1) : (page.pageSize*(page.pageNumber-1)+index+1);
				}else return index + 1;
			}
		},
		{
			title:"货物编码",
			field : "goodsId",
			class : "hide"
		},
		{
			title : "货物名称",
			field : "goodsName",
			formatter: labelTrimFormatter
		}, 
		/*
		{
			title : "数量",
			field : "numbers"
		},
		*/ 
		{
			title : "分配数量",
			field : "fpNumbers"
		},
		{
			title : "规格型号",
			field : "itemType",
			formatter: labelTrimFormatter
		}, 
		{
			title : "计量单位",
			field : "measurementUnit"
		}, 
		{
			title : "单价",
			field : "price"
		}, 
		{
			title : "总价",
			field : "total",
			formatter : function(value,row,index){
				return (row.fpNumbers*row.price).toFixed(2);
			}
		}, 
		{
			title : "供货方",
			field : "supplier",
			formatter: function(value,row,index,len){
				if(!len){ len = 10; }
				var title = "";
				if(value){
					title = value;
					if(value.length>len){
						value = value.substring(0,len)+"...";
					}
				}else{
					value = "";//这行代码会导致显示空值，所以注掉
				}
				return '<span title="'+title+'">'+value+'</span>';
			}
		}
	];
	
	/**
	 @author 周小建
	 @time 2017-11-01
	 @description 根据“添加”和“修改”情况，分别处理出口货物页面中出口货物表格的数据加载。
	 */
	var flag = parentTabWindow.currentSelectRow!=null;//true：server，false：client
	if(flag){//修改
		/*
		queryData({
			url:"../../../../caiGouHeTong/findCkhwPageByCondition?rwbh="+parentTabWindow.currentSelectRow.rwbh,
			$container:$ckhwTable,
			columns:ckhwColumns,
			pageList:[5,10],
			pageSize:5,
			queryParams:function(params){
				return{
					pageSize : params.pageSize,
					pageNo : params.pageNumber,
					sortName : params.sortName,
					sortOrder : params.sortOrder 
				}
			},
			height:290
		});
		*/
		ajaxHelper(
			"../../../../caiGouHeTong/findCkhwListByCondition",
			{rwbh:parentTabWindow.currentSelectRow.rwbh},
			function(result){
				for(var i=0;i<result.length;i++){
					var item = result[i];
					item.fpNumbers = item.numbers;
					//delete item.numbers;
				}
				loadData($ckhwTable,ckhwColumns,result,"Ckhw");
			}
		);
	}else{//添加
		/*
		queryData({
			data:{data:{thisPageElements:[]}},
			$container:$ckhwTable,
			columns:ckhwColumns,
			pageList:[5,10],
			pageSize:5,
			queryParams:{},
			height:310
		});
		*/
		loadData($ckhwTable,ckhwColumns,[],"Ckhw");
	}
	
	function convertMap2Array(map){
		var array = [];
		for(var k in map){
			array.push(map[k]);
		}
		array.sort(function(n1,n2){
			var s1=n1.seq,s2=n2.seq;
			if(s2==null || s2<0) return -1;
			if(s1==null || s1<0) return 1;
			if(s1<s2)return -1;
			if(s1>s2)return 1;
			return -1;
		});
		return array;
	}
	
	/**
	 @author 周小建
	 @time 2017-11-01
	 @description 删除已选定的“出口货物”
	 */
	$("#deleteCkhw").on("click",function(e){
		if(dataCache.checkedCkhw.length==0){//如果没有被选中项则直接返回
			layer.msg("请选中一条记录");
			return null;
		};
		layer.confirm("确定要删除吗?",{btn:["确定"]},function(){
			if(isReview){
				/*
				var rowArray = $ckhwTable.bootstrapTable('getSelections');
				$ckhwTable.bootstrapTable("remove",{
					field : "checked",
					values : rowArray.map(function(item){return item.checked;})
				});
				*/
				$ckhwTable.bootstrapTable("removeAll");
				/*
				$ckhwTable.find("tbody").find("tr:visible").each(function(i,n){
					$(this).find("td:eq(1)").text(i+1);
				});
				*/
			}else{
				//var rowArray = $ckhwTable.bootstrapTable('getSelections');
				/*
				var rowArray = [];
				for(var i=0;i<dataCache.checkedCkhw.length;i++){
					var row = dataCache.checkedCkhw[i];
					if(row!=null){
						rowArray.push(row);
						//row["0"] = false;
						
						//将表格行删除后，它所对应的数据（dataCache.allCkhw[j]）会自动删除该项，所以不用在此手动置空。周小建
						//var seq = row.seq;
						//for(var j=0;j<dataCache.allCkhw.length;j++){
						//	var ckhw = dataCache.allCkhw[j];
						//	if(ckhw!=null && ckhw.seq==seq){
						//		dataCache.allCkhw[j] = null;
						//	}
						//}
					}
				}
				dataCache.checkedCkhw = [];
				*/
				var rowArray = convertMap2Array(dataCache.checkedCkhw);
				
				/*
				for(var i=0;i<rowArray.length;i++){
					var ckhw = rowArray[i];
					var ckhwGoodsId = ckhw.goodsId;
					for(var j=0;j<dataCache.checkedCghw.length;j++){//所有出口货物都必然是在采购货物中，而且都是采购货物的选中项，所以选中的出口货物更是如此，属于包含的包含。
						var cghw = dataCache.checkedCghw[j];
						if(cghw!=null){
							var cghwGoodsId = cghw.goodsId;
							if(ckhwGoodsId==cghwGoodsId){
								cghw.selectedCount = 0;
								cghw.fpNumbers = 0;
								cghw.syNumbers = item.kfNumbers;
								break;
							}
						}
					}
				}
				*/
				var checkedCghwArray = convertMap2Array(dataCache.checkedCghw);
				//var resetCghwGoodsIdArray = [];
				for(var i=0;i<rowArray.length;i++){
					var ckhw = rowArray[i];
					var ckhwGoodsId = ckhw.goodsId;
					for(var j=0;j<checkedCghwArray.length;j++){//所有出口货物都必然是在采购货物中，而且都是采购货物的选中项，所以选中的出口货物更是如此，属于包含的包含。
						var cghw = checkedCghwArray[j];
						if(cghw!=null){
							var cghwGoodsId = cghw.goodsId;
							if(ckhwGoodsId==cghwGoodsId){
								cghw.selectedCount = 0;
								cghw.fpNumbers = 0;
								cghw.syNumbers = cghw.kfNumbers;
                                ckhw.syNumbers=cghw.syNumbers;//add 20171125
								//resetCghwGoodsIdArray.push(cghw.goodsId);
								delete dataCache.checkedCghw[cghw.goodsId];
								break;
							}
						}
					}
				}
				
				loadData($cghwTable,cghwColumns,dataCache.allCghw,"Cghw");//删除出口货物后要自动修改采购货物：<1>将被选中项在采购货物中的对应项改为未选中<2>将被选中项在采购货物中的对应项的分配数量和selectedCount置0并将剩余数量改为可分配数量
				
				/*
				$ckhwTable.bootstrapTable("remove",{
					field:"goodsId",
					values:$ckhwTable.bootstrapTable("getSelections").map(function(item){return item.goodsId;})
				});
				*/
				
				$ckhwTable.bootstrapTable("remove",{
					field : "goodsId",
					//values : selectRows.map(function(item){return item.goodsId;}),
					values : rowArray.map(function(item){return item.goodsId;})
				});
			}
			layer.msg("删除成功!");
			//var keys = selectRows.join(",");
			/*
		    $.ajax({
		        url:"../../../../exportContract/delCkht",
		        type:"post",
		        dataType:"json",
		        data:{uuids:keys},
		        success:function(result){
		        	$table.bootstrapTable("remove",{
						field : "ckht",
						values : selectRows
					});
					layer.msg("删除成功!");
		        }
		    })
		    */
		});
		processEvent(e);
	});
	////////////////////////////////////////////////////出口货物结束//////////////////////////////////////////////////
	
	
	
	
	////////////////////////////////////////////////////选择采购货物开始//////////////////////////////////////////////////
	
	
	
	var currLayerIndex = null;//当前页面打开的窗口
	
	$("#chooseCghw").on("click",function(e){
		/*
		openLayer({//点击选择采购货物事件（iframe模式）
			ele:this,
			title : "选择采购货物",
			
			area : ["90%","95%"],
			url : "../../../pages/liucheng/zhangsan/ckhwDiv.html"
		});
		*/
		/*
		currLayerIndex = layer.open({//点击选择采购货物事件（非iframe模式）
			type : 1,
			//title : "选择采购货物",
			title : false,
			closeBtn : 0,
			skin : "myLayui",
			
			area : ["98%","96%"],
			content : $($cghwDiv)
		});
		*/
		openTab("添加出口合同",$($cghwDiv));
		
		var $ckht = $renwuForm.find(":input[name='ckht']:eq(0)");
		
		var assCgOrBcUrl = "";
		if(Number(isDaiLiBan)){//如果是代理版
			assCgOrBcUrl = "../../../../chuKouHeTong/findAssociatedBcht";
		}else{
			assCgOrBcUrl = "../../../../chuKouHeTong/findAssociatedCght";
		}
		// ajaxHelper("../../../../chuKouHeTong/findAssociatedCght",{ckht:$ckht.val()},
        //ajaxHelper("../../../../chuKouHeTong/findAssociatedBcht",{ckht:$ckht.val()},
		ajaxHelper(assCgOrBcUrl,{ckht:$ckht.val()},
		function(result){
			var $cght = $cghwDiv.find(":input[name='cght']:eq(0)");
			$cght.html('<option value="">请选择</option>').width(180);
			
			if(Number(isDaiLiBan)){//如果是代理版
				for(var i=0;i<result.data.length;i++){
					var item = result.data[i];
					$cght.append('<option value="'+item.bcht+'">'+item.htmc+'【'+item.htbh+'】</option>');
				}
			}else{
				for(var i=0;i<result.length;i++){
					var item = result[i];
					$cght.append('<option value="'+item.cght+'">'+item.contractName+'【'+item.contractCode+'】</option>');
				}
			}
			// for(var i=0;i<result.length;i++){
			// 	var item = result[i];
			/*
			for(var i=0;i<result.data.length;i++){
				var item = result.data[i];
				// $cght.append('<option value="'+item.cght+'">'+item.contractName+'【'+item.contractCode+'】</option>');
				$cght.append('<option value="'+item.bcht+'">'+item.htmc+'【'+item.htbh+'】</option>');
			}
			*/
			$("#thSearchBtn").click();
		});
		processEvent(e);
	});
	
	/**
	 @author 周小建
	 @time 2017-11-01
	 @description 导入出口货物
	 */
	$("#importCkhw").on("click", function(e){
        var uploadurl="../../../../chuKouHeTong/multifileUpload?type=ckhw";
		openLayer({ele:this,title:'<i class="glyphicon glyphicon-import" style="padding-right:3px;font-size:12px;"></i>导入文件',area:[ "80%", "80%" ],url:"../../../pages/hetong/chukou/import.html?type=ckhw&uploadurl="+uploadurl+"&branch="+isDaiLiBan+"&review=1"});
		processEvent(e);
	});
	
	/**
	 @author 周小建
	 @time 2017-11-01
	 @description “采购货物”表格的列定义。
	 */
	var cghwColumns = [ 
		{
			align:"center",
			checkbox : true
		},
		{
			title : "序号",
			align:"center",
			formatter : function(value,row,index){
				/*
				var pageNumber = $(".pagination .active").text();
				var pageSize = $(".pagination-detail .page-size").text();
				return pageSize * (pageNumber-1) + index + 1;
				 */
				//return index + 1;						
				
				if(Number(isDaiLiBan)){//如果是代理版
					return index+1;
				}
				
				var page = $cghwTable.bootstrapTable("getPage");
				var pageSize = page.pageSize,pageNumber = page.pageNumber;
				var seq = isNaN(pageSize) || isNaN(pageNumber) ? (index + 1) : (page.pageSize*(page.pageNumber-1)+index+1);
				//row.seq = seq;
				return seq;
				
				//return row.seq + 1;
			}
		},
		{
			title : "货物名称",
			field : "goodsName",
			formatter: labelTrimFormatter
		}, 
		{
			title : "总数量",
			field : "numbers"
		}, 
		{
			title : "剩余数量",
			field : "syNumbers",
			formatter : function(value,row,index){
				if(value==0||value=="0")return value;
				if(value==null || value=="" || value=="-")return row.numbers;
				return value;
			}
		}, 
		{
			title : "可分数量",
			field : "kfNumbers",
			formatter : function(value,row,index){
				return value;
			}
		},
		{
			title : "分配数量",
			field : "fpNumbers",
			formatter : function(value,row,index){
				if(value==null || value=="" || value=="-") value=0;
				return '<input type="number" min0="0" max0="'+row.kfNumbers+'" name="fpNumbers" style="width:60px;" value="'+value+'" thisValueBak="'+value+'" syValueBak="'+row.syNumbers+'"/>';
			}
		},
		{
			title : "规格型号",
			field : "itemType",
			formatter: labelTrimFormatter
		}, 
		{
			title : "计量单位",
			field : "measurementUnit"
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
			title : "供货方",
			field : "supplier",
			formatter: labelTrimFormatter
		},
        {
            title : "合同名称",
            field : "contractName"
        }
	];
	
	/**
	 @author 周小建
	 @time 2017-11-01
	 @description “采购货物”弹出窗口，首先要通过ajax查询“采购货物”弹出窗口的查询区域中的“采购合同”下拉列表选项数据，然后在回调函数中处理后续的一切。
	 */
   var htUrl="";
    if(Number(isDaiLiBan)){//如果是代理版
        htUrl = "../../../../buchonght/findListByCondition";
    }else{
        htUrl = "../../../../caiGouHeTong/findListByCondition";
    }
	ajaxHelper(htUrl,"",
		function(result){
			var options = [{text : "请选择", value : ""}];
			/*
			for(var i=0;i<result.data.length;i++){
				var item = result.data[i];
				options.push({value:item.cght,text:item.contractCode});
			}
			*/
			for(var i=0;i<result.length;i++){
				var item = result[i];
                if(Number(isDaiLiBan)){//如果是代理版
                    options.push({value:item.bcht,text:item.htbh});
                }else{
                    options.push({value:item.cght,text:item.contractCode});
                }
			}
			
			if(Number(isDaiLiBan)){//如果是代理版
				//初始化查询
				formGenerator({
					container :  "advSearchBox",
					columns : [
						{
							col:"rwbh",
							label:"任务编号",
							type:"text",
							display:false,
							value:parentTabWindow.currentSelectRow==null?"":parentTabWindow.currentSelectRow.rwbh
						},
						{
							col : "cght",
							label : "补充合同",
							type : "select",
							options : options
						},
						{
							col : "goodsName",
							type : "text",
							label : "货物名称"
						}
						]
				},"query");

			}else{
				//初始化查询
				formGenerator({
					container :  "advSearchBox",
					columns : [
						{
							col:"rwbh",
							label:"任务编号",
							type:"text",
							display:false,
							value:parentTabWindow.currentSelectRow==null?"":parentTabWindow.currentSelectRow.rwbh
						},
						{
							col : "cght",
							label : "采购合同",
							type : "select",
							options : options
						},
						{
							col : "goodsName",
							type : "text",
							label : "货物名称"
						}
						]
				},"query");
			}
			
			
			
			/**
			 @author 周小建
			 @time 2017-11-01
			 @description 选择采购货物弹出窗口中“查询”按钮的单击事件，ajax查询符合条件的“采购货物”数据并加载表格。
			 */
			$("#thSearchBtn").on("click",function(e){
				var $cght = $(":input[name='cght']:eq(0)",$cghwDiv);
				var goodsName = $(":input[name='goodsName']:eq(0)",$cghwDiv).val();
				var cghtVal = $cght.val();
				if(cghtVal==""){
					var array = [];
					$cght.find("option").each(function(i,o){
						var value = $(this).attr("value");
						if(value) array.push(value);
					});
					cghtVal = array.join(",");
				}
				var cgOrBcUrl = "";
				if(Number(isDaiLiBan)){//如果是代理版
					cgOrBcUrl = "../../../../caiGouHeTong/findBchwListByCondition";
				}else{
					cgOrBcUrl = "../../../../caiGouHeTong/findCghwListByCondition";
				}
				ajaxHelper(cgOrBcUrl,
					// "../../../../caiGouHeTong/findCghwListByCondition",
					//"../../../../caiGouHeTong/findBchwListByCondition",
					//{cght:cghtVal},
					{cght:cghtVal,goodsName:goodsName,rwbh:rwbh},
					function(result){
						loadData($cghwTable,cghwColumns,result,"Cghw");
					}
				);
				processEvent(e);
			}).trigger("click");
			
			/**
			 @author 周小建
			 @time 2017-11-01
			 @description 选择采购货物弹出窗口中“取消”按钮的单击事件
			 */
			$(".currCancel").on("click",function(e){
				layer.close(currLayerIndex);
				processEvent(e);
			});
			
			/**
			 @author 周小建
			 @time 2017-11-01
			 @description 选择采购货物弹出窗口中“确定”按钮的单击事件
			 */
			$("#ok").on("click",function(e){
				$cghwForm.find(".page-number:eq(0)").click();
				//发送请求成功后关闭窗口
				/*
				var selectRows = $cghwTable.bootstrapTable("getSelections");//获取选择的行
				//$ckhwTable.bootstrapTable("removeAll").bootstrapTable("append",selectRows).bootstrapTable("uncheckAll");
				$ckhwTable.bootstrapTable("removeAll").bootstrapTable("append",selectRows).bootstrapTable("uncheckAll");
				//var rowIds = selectRows.map(function(item){return item.goodsId}).join(",");//所有选中的货物id数组
				*/
				var selectRows = $cghwTable.bootstrapTable("getSelections");//获取选择的行
				if(selectRows.length>0){
					var rowArray = [];
					var zeroArray = [];
					var checkedCghwArray = convertMap2Array(dataCache.checkedCghw);
					for(var i=0;i<checkedCghwArray.length;i++){
						var row = checkedCghwArray[i];
						if(row!=null){
							var seq = row.seq;
							if(row.fpNumbers<=0){
								zeroArray.push(row.goodsName);
								//dataCache.checkedCghw[i] = null;
								delete dataCache.checkedCghw[row.goodsId];
								row["0"] = false;
								//$cghwTable.bootstrapTable("uncheck",seq);
								$cghwTable.bootstrapTable("uncheckBy",{field:"goodsId",values:[row.goodsId]});
							}else{
								rowArray.push(row);
								row["0"] = false;
								row.selectedCount = 1;
							}
						}
					}
					if(zeroArray.length>0) layer.alert("采购货物分配数量为0的无效项被排除：【"+zeroArray.join("、")+"】");
					dataCache.allCkhw = rowArray;
					$(".fixed-table-container","#ckhwDiv").height(290);
					//$ckhwTable.bootstrapTable("removeAll").bootstrapTable("append",rowArray).bootstrapTable("uncheckAll");
					flag = false;
					/*
					queryData({
						data:{
							data:{
								pageSize:5,
								pageNo:1,
								thisPageElements:rowArray
							}
						},
						$container:$ckhwTable,
						columns:ckhwColumns,
						pageList:[5,10],
						pageSize:5,
						height:290
					});
					*/
					loadData($ckhwTable,ckhwColumns,rowArray,"Ckhw");
					
					//layer.close(currLayerIndex);
					finishCallback();
					
				}else{
					layer.msg("请选择货物!");
				}
				processEvent(e);
			});
		}
	)
	////////////////////////////////////////////////////选择采购货物结束//////////////////////////////////////////////////
	
	
	/**
	 @author 周小建
	 @time 2017-11-01
	 @description 添加或修改保存
	 */
	$("#saveOrUupdate").on("click",function(e){
		if($renwuForm.valid()){
			if(dataCache.allCkhw.length==0){
                layer.msg("请您先选择出口货物，然后再进行保存！");
                return;
			}
		    var basicInfoData = $renwuForm.serialize();
		    //debugger;
		    var cghw = [];
		    var checkedCkhwArray = convertMap2Array(dataCache.checkedCkhw);
		    for(var j=0;j<checkedCkhwArray.length;j++){
				var item = checkedCkhwArray[j];
				if(item!=null){
					var cghwGoodsId = item.goodsId;
					if(item.bchthw!=null||item.goodsId!=null){
                        cghw.push({goodsId:item.goodsId,syNumbers:item.syNumbers,cght:item.cght,bchthw:item.goodsId,bcht:item.bcht});
					}
				}
			}

		    //var data = {renWu:$renwuForm.serialize(),ckhw:dataCache.allCkhw};
		    //var data = {renWu:$renwuForm.serialize(),ckhw:dataCache.allCkhw};
		    //var data = JSON.stringify({renWu:$renwuForm.serializeJSON(),ckhw:dataCache.allCkhw});
		    
		    var ckht = $renwuForm.find(":input[name='ckht']:eq(0)").val();
			var xyybgd = $renwuForm.find(":input[name='xyybgd']:eq(0)").val();
		    var data = {
		    	renWu:JSON.stringify($renwuForm.serializeJSON()),
		    	//ckhw:JSON.stringify(dataCache.allCkhw),
		    	ckhw:JSON.stringify(
		    		dataCache.allCkhw.map(function(item){
			    		if(ckht||xyybgd=="y"){
			    			item.numbers=item.fpNumbers;
			    			item.total=(item.fpNumbers*item.price).toFixed(2);
			    		}
			    		return item;
		    		})
		    	),
		    	//ckhw:JSON.stringify(dataCache.allCkhw.map(function(item){item = $.extend({},item);delete item.pageNo;delete item.pageSize;delete item.seq;item.numbers=item.fpNumbers;item.total=item.fpNumbers*item.price;return item;})),
		    	//ckhw:JSON.stringify($ckhwTable.bootstrapTable("getData")),
		    	cghw:JSON.stringify(cghw),
                dlFlag:isDaiLiBan
		    };
		    var rwbh = $("input[name='rwbh']",$renwuForm).val();
	        $.ajax({
	            url : "../../../../renwu/edit",
	            dataType:"json",
	            //contenType : "application/json",
	            //contenType : "text/html",
	            type : "POST",
	            data : data,
	            //Content type 'application/x-www-form-urlencoded;charset=UTF-8' not supported
	            success : function(result){
	                //parentTabWindow.layer.msg((rwbh==""?"添加":"修改") + (result.success?"成功":"失败"));
	                parentTabWindow.layer.msg(result.msg);
	                if(result.success){
            			//parent.layer.close(parent.layer.getFrameIndex(window.name));//成功后关闭页面
            		 	//parent.refreshTable();//刷新页面
	                	finishCallback();
	                }
	            }
	        });
		}
		processEvent(e);
	});
});