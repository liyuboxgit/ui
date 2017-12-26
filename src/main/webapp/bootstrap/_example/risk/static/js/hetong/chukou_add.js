var branch = serchParam.branch || "0";
$("#branch").val(branch);

/*
var fjMap = {};
//附件上传按钮
$(".inputBtn").fileinput({
	language : "zh",
	showCaption : true,
	browseClass : "btn btn-default btn-sm",
	uploadExtraData : {category:"ckht"},
	dropZoneEnabled : false,
	showPreview : false,
	showUpload : false,
	showRemove : false,
	removeClass : "btn btn-default btn-sm",
	uploadClass : "btn btn-default btn-sm",
	//captionClass : "input-sm block",
	uploadUrl : "../../../../attachment/upload"
}).on("change",function(e,file){debugger//上传文件发生变化的回调函数
	//$("#input-id").fileinput("refresh",{uploadExtraData :{id: $("#addInfoForm input[name='ckht']").val()}});
	//console.log($(this).attr("data_type"));
	//console.log(this.getAttribute("data_type"));
	processEvent(e);
}).on("filebatchselected",function(e,files){
    var fileName = files[0].name;
    if(fileName.lastIndexOf(".zip") != -1){
        $(this).fileinput("upload");
   }else{
        //parentTabWindow.layer.msg("文件格式错误！请上传zip压缩文件");
   		togglePoshytip($(this).closest("div.input-group").find("input:eq(0)"),"文件格式错误！请上传zip压缩文件",null,false);
   }
   processEvent(e);
}).on("fileuploaded",function(e,data,previewId,index){//上传成功的回调函数
	var fj = data.response.data.fj;
	var type = $(this).attr("data_type");
	//注释
	//if(type == "htywj"){
	//	$("#fj1").val(fj+"-"+type);
	//}else if(type == "tbwj"){
    //    $("#fj2").val(fj+"-"+type);
	//}else if(type == "zbwj"){
    //    $("#fj3").val(fj+"-"+type);
	//}else if(type == "qt"){
    //    $("#fj4").val(fj+"-"+type);
	//}else return;
	//注释
	layer.msg("上传成功");
	if($(this).attr("data_type")=="htywj"){
		togglePoshytip($(this).closest("div.input-group").find("input:eq(0)"),"上传成功",null,true);
	}
	//上传成功后显示开始
	$(this).closest(".file-input").find(".xiazaiFile").remove();
	$(this).closest(".file-input").append('<p class="xiazaiFile" style="margin-top:10px;margin-bottom:0"><a href="../../../../attachment/download?attachmentId='+fj+'">'+data.files[0].name+'</a><a style="margin-left:10px;" href="javascript:;" class="deleteFile"><i class="glyphicon glyphicon-remove"></i></a></p>');
	$(this).closest("div.form-group").find(".deleteFile").off("click").on("click",function(e){
		var kind = $(this).closest("div.form-group").find(":file").attr("data_type");
		//delete fjMap[kind];
        //fjMap[fj+"-"+kind]= "0";
        //fjMap[kind] ={fj:fj,flag:"0"};
        var array = fjMap[kind];
        if(array==null){
            fjMap[kind]=array=[];
       }else{
            for(var i = 0; i < array.length; i++) array[i].flag = "0";
            //array[array.length-1].flag = "0";
       }
       //array.push({fj:fj,flag:"0"});
       $(this).closest("p").remove();
       processEvent(e);
	});

	//注释
	//for(var key in fjMap){
	//    if(key.indexOf(type)>-1){
	//        delete fjMap[key];
	//        break;
    //   }
   	//}
   	//注释
    //fjMap[type] = fj;
    //fjMap[fj+"-"+type] = "1";
    

	//重新上传的数据，设置标志为1，后台用于更新。之前的数据，设置标志为0，后台用于删除
    var array = fjMap[type];
    if(array==null){
        fjMap[type]=array=[];
   	}else{
        for(var i = 0; i < array.length; i++) array[i].flag = "0";
        //array[array.length-1].flag = "0";
   	}
	array.push({fj:fj,flag:"1"});
	//上传成功后显示结束
	processEvent(e);
}).on("fileerror",function(e,data,msg){//上传文件出错的回调函数
    layer.msg("上传失败!");
    processEvent(e);
});

*/



var config = null;

$(function(){
	var extParams = function($input){return{branch:branch};};
	
	//基本信息
    config ={
		container:"info",
		columns:[
			{col:"ckht",label:"id",type:"hidden",pk:true},
			{col:"contractCode",label:"合同编号",type:"text",validate:{required:true},bk:true,checkExistsUrl:"../../../../chuKouHeTong/checkcode",extParams:extParams},
			{col:"contractName",label:"合同名称",type:"text",validate:{required:true},bk:true,checkExistsUrl:"../../../../chuKouHeTong/checkcode",extParams:extParams},
			
			//{col:"serviceType",label:"贸易方式",type:"select",validate:{required:true},options:getDicts("maoyifs")},
			{col:"serviceType",label:"贸易方式",type:"ComplexSelect",comboWidth:340,validate:{required:true},options:getDicts("maoyifs"),
				changeHandler:function($valueInput,code,oldCode,$SearchInput,text,oldText){
					var $gqqsrqGroup = $("#info").find(":input[name='gqqsrq']").closest(".form-group");
					var $gqjsrqGroup = $("#info").find(":input[name='gqjsrq']").closest(".form-group");
					var $gq = $("#info").find(":input[name='gq']").closest(".form-group");
					//根据贸易方式的值修改工期的的显示隐藏
					$gqqsrqGroup.add($gqjsrqGroup).add($gq)[code=="3410"?"hide":"show"]();
				}
			},
			//{col:"signDate",label:"签约日期",type:"date",validate:{required:true,date:true,dateLEInput:"beginDate"}},
			//{col:"beginDate",label:"生效日期",type:"date",validate:{required:true,dateGEInput:"signDate"}},
			{col:"signDate",label:"签约日期",type:"date",validate:{required:true,date:true}},
			{col:"beginDate",label:"生效日期",type:"date",validate:{required:true,date:true,dateGEInput:"signDate"}},
			//{col:"currency",label:"币制",type:"select",validate:{required:true},options:getDicts("currency")},
			{col:"currency",label:"币制",type:"ComplexSelect",comboWidth:340,validate:{required:true},options:getDicts("currency")},
			{col:"contractAmount",label:"合同金额",type:"text",validate:{required:true,number:true}},
			//{col:"checkoutMode",label:"结汇方式",type:"select",validate:{required:true},options:getDicts("jiehuifs")},
			{col:"checkoutMode",label:"结汇方式",type:"SimpleSelect",comboWidth:340,validate:{required:true},options:getDicts("jiehuifs")},
			//{col:"dealMode",label:"成交方式",type:"select",validate:{required:true},options:getDicts("dealMode")},
			{col:"dealMode",label:"成交方式",type:"SimpleSelect",comboWidth:340,validate:{required:true},options:getDicts("dealMode")},
			//{col:"transportMode",label:"运输方式",type:"select",validate:{required:true},options:getDicts("transportMode")},
			{col:"transportMode",label:"运输方式",type:"ComplexSelect",comboWidth:340,validate:{required:true},options:getDicts("transportMode")},
			//{col:"exportCountry",label:"出口国别",type:"select",validate:{required:true},options:getDicts("nation")},
			{col:"exportCountry",label:"出口国别",type:"AlmightySelect",multi:false,validate:{required:true},options:getSpecialDicts("nation")},
			//{col:"exportPort",label:"出口口岸",type:"select",validate:{required:true},options:getDicts("exportPortName")},
			{col:"exportPort",label:"出口口岸",type:"ComplexSelect",comboWidth:340,pageGroup:6,validate:{required:true},options:getDicts("exportPortName")},
			//{col:"arrivingCountry",label:"运抵国",type:"select",validate:{required:true},options:getDicts("nation")},
			{col:"arrivingCountry",label:"运抵国",type:"AlmightySelect",validate:{required:true},options:getSpecialDicts("nation")},
			{col:"fingerPort",label:"指运港",type:"text",validate:{required:true}},
			{col:"approvalNumber",label:"批准文号",type:"text"},
			{col:"operatingUnit",label:"经营单位",type:"text"},
			{col:"licenseKey",label:"许可证",type:"text"},
			{col:"shipmentTime",label:"装运期",type:"date"},
			{col:"forwardUnitCode",label:"发货单位代码",type:"text"},
			{col:"forwardUnit",label:"发货单位",type:"text"},
			{col:"totalMaterial",label:"件数",type:"text",validate:{number:true}},
			/*
			{col:"gqqsrq",label:"工期起始时间",type:"date",validate:{dateLTInput:"gqjsrq"}},
			{col:"gqjsrq",label:"工期结束时间",type:"date",validate:{dateGTInput:"gqqsrq"}},
			*/
			
			{col:"gqqsrq",label:"工期起始时间",type:"date",validate:{date:true}},
			{col:"gqjsrq",label:"工期结束时间",type:"date",validate:{dateGTInput:"gqqsrq"}},
			{col:"gq",label:"工期（天）",type:"text" ,validate:{number:true}},
			{col:"drawbackIs",label:"是否退税",type:"radio",
				options:[
					{
						value:"0",text:"退税"
					},
					{
						value:"1",text:"不退税"
					}
				]
			},
            {col:"state",label:"有效标志",type:"radio",
                options:[
                    {
                        value:"1",text:"有效"
                   	},
                    {
                        value:"0",text:"无效"
                   	}
                ]
           }
		]
	};
	
	//买方
	var buyer = {
		container:"buyer",
		columns:[
			{col:"buyerName",label:"买方名称",type:"text",validate:{required:true}},
			{col:"buyerSignName",label:"买方签约人",type:"text"},
			{col:"buyerTelephone",label:"买方联系电话",type:"text",validate:{telephone:true}},
			{col:"buyerAddress",label:"买方地址",type:"textarea",rowNum : 3}
		]
	};
	
	//卖方（自营）
	var seller_wm = {
		container:"seller",
		columns:[
			{col:"sellerName",label:"卖方名称",type:"text",readonly:true,validate:{required:true}},
			{col:"sellerSignName",label:"卖方签约人",type:"text"},
			{col:"sellerTelephone",label:"卖方联系电话",type:"text",validate:{telephone:true}},
			{col:"sellerAddress",label:"卖方地址",type:"textarea",rowNum : 3}
		]
	};
	
	//卖方（代办）
    var seller_dl = {
        container:"seller",
        columns:[
            {col:"sellerName",label:"卖方名称",type:"text",readonly:true,validate:{required:true},search:true},
            {col:"sellerSignName",label:"卖方签约人",type:"text"},
            {col:"sellerTelephone",label:"卖方联系电话",type:"text",validate:{telephone:true}},
            {col:"sellerAddress",label:"卖方地址",type:"textarea",rowNum : 3}
        ]
   	};
   	
   	//附件信息
	var fjConfig = {
	    container:"fujian",
	    /*
	    columns:[
	        {col:"htywj",label:"合同源文件",type:"file",sm:2,fileStyle:"zip",uploadExtraData:{category:"ckht"},uploadUrl:"../../../../attachment/upload",downloadUrl:"../../../../attachment/download",validate:{required:true,strGMVal:".zip"}},
	        {col:"tbwj",label:"投标文件",type:"file",sm:2,fileStyle:"zip",uploadExtraData:{category:"ckht"},uploadUrl:"../../../../attachment/upload",downloadUrl:"../../../../attachment/download"},
	        {col:"zbwj",label:"中标文件",type:"file",sm:2,fileStyle:"zip",uploadExtraData:{category:"ckht"},uploadUrl:"../../../../attachment/upload",downloadUrl:"../../../../attachment/download"},
	        {col:"qt",label:"其他",type:"file",sm:2,fileStyle:"zip",uploadExtraData:{category:"ckht"},uploadUrl:"../../../../attachment/upload",downloadUrl:"../../../../attachment/download"}
	    ]
	    */
	    columns:(function(){
	    	var columns = [];
	    	var columnTemplate = {type:"upload",sm:2,fileStyle:"zip",uploadExtraData:{category:"ckht"},uploadUrl:"../../../../attachment/upload",downloadUrl:"../../../../attachment/download",validate:{strGMVal:".zip"}};
	    	columns.push($.extend(true,{col:"htywj",label:"合同源文件",validate:{required:true}},columnTemplate));
	    	columns.push($.extend(true,{col:"tbwj",label:"投标文件"},columnTemplate));
	    	columns.push($.extend(true,{col:"zbwj",label:"中标文件"},columnTemplate));
	    	columns.push($.extend(true,{col:"qt",label:"其他"},columnTemplate));
	    	return columns;
	    })()
	};
	
	formGenerator(config);//基本信息添加到页面
	formGenerator(buyer,"single");//买方添加到页面
    formGenerator(branch=="0"?seller_wm:seller_dl,"single");//卖方添加到页面
    formGenerator(fjConfig,"single");
	
    /*
	var $SearchInput = $("#info").find(".SearchInput");
	var $combostd = $SearchInput.data("$combostd");
	$combostd.height(100);
	*/
    
    /*
    //贸易方式
	$("#info").find(":input[name='serviceType']").on("change",function(e){
		var $gqqsrqGroup = $("#info").find(":input[name='gqqsrq']").closest(".form-group");
		var $gqjsrqGroup = $("#info").find(":input[name='gqjsrq']").closest(".form-group");
		var $gq = $("#info").find(":input[name='gq']").closest(".form-group");
		//根据贸易方式的值修改工期的的显示隐藏
		$gqqsrqGroup.add($gqjsrqGroup).add($gq)[$(this).val()=="3410"?"hide":"show"]();
		processEvent(e);
	});
	*/
    
    /*
    //合同编号重复校验
	$(":input[name='contractCode']:eq(0)").on("blur",function (e){
		var contractCode = $(":input[name='contractCode']:eq(0)").val();
		if(contractCode.length > 0 && serchParam.editflag != "detail"){
			ajaxHelper(
				"../../../../chuKouHeTong/findPageByCondition",
				{
					"contractCodeConditon":contractCode,
                    "pageNo":1,
                    "pageSize":10,
					"branch":branch
				},
				function (result){
                    if(result.data.thisPageElements.length>0&&parentTabWindow.oldContractCode.length==0){
                        layer.msg("合同编号重复，请重新输入");
                        $("input[name='contractCode']").focus();
                   }
                   if(result.data.thisPageElements.length>0&&parentTabWindow.oldContractCode!=$('input[name="contractCode"]').val()){
                        layer.msg("合同编号重复，请重新输入11");
                        $("input[name='contractCode']").focus();
                   }
               },
               null,
               true
			);
		}
		processEvent(e);
   	});
   	*/
    
	//初始化表单
    if(serchParam.editflag=="detail" || serchParam.editflag=="edit"){
    	ajaxHelper(
    		"../../../../chuKouHeTong/selectByPrimaryKey",
    		{
                "ckhtUuid":parentTabWindow.params.ckht,
                "type":"update",
                "beian":parentTabWindow.params.beian
           	},
           	function(result){
           		//result.data.exportCountry = "305,215,603";
                setFormData("addInfoForm",document,result.data);
                var attachmentList = result.data.attachmentList;
               	if(attachmentList != null && attachmentList.length > 0){
                    $.each(attachmentList,function (index,attachment){
                        if(attachment.fj){
	                    	var array = fjMap[attachment.fileMark];
		                    if(array==null) fjMap[attachment.fileMark] = array = [];
		                    array.push({fj:attachment.fj,flag:"1"});
	                        $('<p class="xiazaiFile" style="margin-top:10px;margin-bottom:0"><a href="../../../../attachment/download?attachmentId='+attachment.fj+'">'+attachment.name+'</a></p>').appendTo($("input[data_type="+attachment.fileMark+"]").closest("div.file-input"));
                        }
                   	});
               	}
               	
                //查看详情页面样式
                if(serchParam.editflag=="detail"){
                    $("#addInfoForm :input").attr({"readonly":true,"disabled":"disabled"});
                    $("#addInfoForm :button,#addInfoForm .btn-file,#addInfoForm .searchBtn,.text-danger").css("display","none");
                    $("#addInfoForm textarea").css("resize","none");
                    $("#addInfoForm .file-caption-name").attr({"placeholder":""})
                    $("#addInfoForm .kv-fileinput-caption").css({"display":"none"})
                    //查看时的附件显示
                    $("#addInfoForm .xiazaiFile").css({"margin-top":"7px"});
               	}else if(serchParam.editflag=="edit"){
               		$("#addInfoForm .xiazaiFile").each(function(i,p){
               			$('<a style="margin-left:10px;" href="javascript:void(0);" class="deleteFile"><i class="glyphicon glyphicon-remove"></i></a>').appendTo($(this)).on("click",function(e){
	                    	var kind = $(this).closest("div.form-group").find(":file").attr("data_type");
	                       	var array = fjMap[kind];
	                       	if(array==null){
	                        	fjMap[kind]=array=[];
	                       	}else{
	                           	array[array.length-1].flag = "0";
	                       	}
	                       	$(this).closest("p").remove();
	                       	processEvent(e);
	                  	});
               		});
            	}
        	}
		);
	}
   	if(branch == "0"){//自营
        ajaxHelper("../../../../caiGouHeTong/initSelf",{},function(result){
			if(result.data!=null){
	            $("#sellerNsrsbh").val(result.data.nsrsbh);
	            $("input[name='sellerName']").val(result.data.enterpriseName);
	            $("input[name='sellerSignName']").val(result.data.contacts);
	            $("input[name='sellerTelephone']").val(result.data.telephone);
	            $("input[name='sellerOpenBank']").val(result.data.openBank);
	            $("input[name='sellerBankAccount']").val(result.data.bankAccount);
	            $("input[name='sellerAddress']").val(result.data.registeredAddress);
	       	}
		});
        //要验证的字段
        //config.columns = $.merge($.merge(config.columns,buyer.columns),seller_wm.columns);
        config.columns = config.columns.concat(buyer.columns,seller_wm.columns);
   	}else{//代办
        $("input[name='sellerName']").next("a").click(function(){
	       	openLayer({
	            //ele:this,
	            title : '<i class="text-info fa fa-search" style="padding-right:3px;font-size:12px;"></i>供货商列表',
	            area : ["50%","70%"],
	            url : "../../hetong/caigou/ghs_list_ckht.html"
	       	});
	    	//openTab("供货商列表","hetong/caigou/ghs_list_ckht.html");
	   	});
        //要验证的字段
        //config.columns = $.merge($.merge(config.columns,buyer.columns),seller_dl.columns);
		config.columns = config.columns.concat(buyer.columns,seller_dl.columns);
	}
	config.columns = config.columns.concat(fjConfig.columns);
	registerValidate("addInfoForm",config);//验证表单

	//添加或修改保存
	$("#saveOrUpdateBtn").on("click",function(e){
        if(parentTabWindow.oldContractCode.length>0) $("#fjids").val(JSON.stringify(fjMap));//修改回显附件ids
		if($("#addInfoForm").valid()){
			
			//验证附件
			var $htywj = $("#fujian").find("input.file-caption-name").eq(0);
            if($htywj.closest(".file-input").find("p").length==0 && !$htywj.val()){
                //layer.msg("请上传【合同源文件】！");
                if(!$("#fujian").is(".active")) $("#addInfoForm").find(".nav.nav-tabs li").eq($("#fujian").index()).find("a").trigger("click");
            	togglePoshytip($htywj,"请上传【合同源文件】！",null,false);
                return;
           	}
           	
           	checkInputValueExists(
           		["ckht","contractCode","contractName"],
           		"../../../../chuKouHeTong/checkcode",
           		extParams,
           		function(){
	           		$("#fjids").val(JSON.stringify(fjMap));
				    var data = $("#addInfoForm").serialize();
				    var uuid = $("#addInfoForm input[name='ckht']").val();
				    ajaxHelper(
				    	"../../../../chuKouHeTong/addOrUpdate",
				    	data,
				    	function (result){
			                if(result.success) parentTabWindow.layer.msg(result.msg);
			               	else parentTabWindow.layer.msg("添加失败!");
			               	//parent.layer.close(parent.layer.getFrameIndex(window.name));//成功后关闭页面
			        		//parent.refreshTable(); //刷新页面
			               	//tab页添加保存关闭
							//var $i = parent.$('#fkTabs ul').find("li.active i");
							//$i.trigger("click");			
							//tab页添加保存关闭
			               	finishCallback();
			           	},
			           	null,
			           	false
				    );
	           	}
           	);
		}else{
			/*
			var $tabPanel = $("#addInfoForm").find("div.tab-pane.active.clearfix");
			var $errEle = $tabPanel.find(".has-error :input").eq(0);
			 
			if($errEle.length>0){//如果当前的tab没通过验证
				$errEle.focus().trigger("blur");
			}else{
				var $tabPanels = $("#addInfoForm").find("div[class*='tab-pane']");
				for(var i=0; i<$tabPanels.length; i++){
					if(i==$tabPanel.index()) continue;
					var $err = $tabPanels.eq(i).find(".has-error :input").eq(0);
					if($err.length!=0){
						$("#addInfoForm").find(".nav.nav-tabs li").eq(i).find("a").trigger("click");
						break;
					}
				}
			}
			*/
			/*
		 	$("div.tab-pane").not(".active").each(function(i,div){
				var poshtipTargets = $(this).data("poshtipTargets");
				if(poshtipTargets!=null){
					$.each(poshtipTargets,function(j,item){
						$(item).hide();
					});
				}
			});
			*/
			toggleDisplayTabPoshytip();
		}
		processEvent(e);
	});
	
	/*
	//添加或修改保存
	$("#cancel").on("click",function(){
		RemoveTab("ckht0001","20002");
	});
	*/
});