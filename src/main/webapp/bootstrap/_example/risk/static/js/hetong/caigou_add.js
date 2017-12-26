var branch = '0';
var fjMap = {};
//附件上传按钮
$(".inputBtn").fileinput({
    language : "zh",
    showCaption : true,
    browseClass : "btn btn-default btn-sm",
    uploadExtraData : {category:"cght"},
    dropZoneEnabled : false,
    showPreview : false,
    showUpload : false,
    showRemove : false,
    removeClass : "btn btn-default btn-sm",
    uploadClass : "btn btn-default btn-sm",
    //captionClass : "input-sm block",
    uploadUrl : "../../../../attachment/upload",
}).on("change",function(e,file){
    //$('#input-id').fileinput('refresh', {uploadExtraData : {id: $("#addInfoForm input[name='ckht']").val()}});

}).on("fileuploaded", function(event, data, previewId, index) {
    var fj = data.response.data.fj;
    var type = $(this).attr("data_type");
    var cat = $(this).attr("cat");
    /*if(type == '11'){
        $("#fj1").val(fj+"-"+type+"-"+cat);
    }else if(type == '00'){
        $("#fj2").val(fj+"-"+type+"-"+cat);
    }
    var fjids = $("#fj1").val()+","+$("#fj2").val();
    $("#fjids").val(fjids);*/
    layer.msg("上传成功");

    //上传成功后显示开始
    $(this).closest(".file-input").find(".xiazaiFile").remove();
    $(this).closest(".file-input").append('<p class="xiazaiFile" style="margin-top:10px;margin-bottom:0"><a href="../../../../attachment/download?attachmentId='+fj+'">'+data.files[0].name+'</a><a style="margin-left:10px;" href="javascript:;" class="deleteFile"><i class="glyphicon glyphicon-remove"></i></a></p>');
    var deleteEle = $(this).closest("div.form-group").find(".deleteFile");
    deleteEle.off("click").on("click",function(){
        var kind = $(this).closest("div.form-group").find(":file").attr("data_type");

        //delete fjMap[kind];

        //fjMap[fj+"-"+kind]= "0";

        //fjMap[kind] = {fj:fj,flag:"0"};
        var array = fjMap[kind];
        if(array==null){
            fjMap[kind]=array=[];
        }else{
            for(var i = 0; i < array.length; i++) array[i].flag = "0";
            //array[array.length-1].flag = "0";
        }
        //array.push({fj:fj,flag:"0"});

        $(this).closest("p").remove();
        
        $("#fujian").find("input.file-caption-name").eq(0).val("");
    });
    //重新上传的数据，设置标志为1，后台用于更新。之前的数据，设置标志为0，后台用于删除
    var array = fjMap[type];
    if(array==null){
        fjMap[type]=array=[];
    }else{
        for(var i = 0; i < array.length; i++) array[i].flag = "0";
        //array[array.length-1].flag = "0";
    }
    array.push({fj:fj,flag:"1"});
}).on("filebatchselected",function(event,files){
	var fileName = files[0].name;
	if(fileName.lastIndexOf(".zip") != -1){
        $(this).fileinput("upload");
	}else{
		parent.layer.msg("文件格式错误！请上传zip压缩文件");
	}
}).on("fileerror",function(e,data,msg){
	layer.msg("上传失败!");
});
$(function(){
	if(typeof(serchParam.editflag) != "undefined" && serchParam.editflag != null && serchParam.editflag.length != 0){
		editflag = serchParam.editflag;
	}

	//基本信息
	var config = {
		container:'info',
		columns:[
			{col:"contractCode",label:"合同编号",type:"text",required:true},
			{col:"contractName",label:"合同名称",type:"text",required:true,},
			{col:"signTime",label:"签约日期",type:"date",validate:{required:true,dateLEVal:"effectiveDate"}},
			{col:"effectiveDate",label:"生效日期",type:"date",validate:{required:true,dateGEInput:"signTime"}},
			{col:"currency",label:"币&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;制",type:"select",options:getDicts("currency")},
			{col:"contractAmount",label:"合同金额",type:"text",validate:{number:true}},
			{col:"checkoutMode",label:"结汇方式",type:"select",options:getDicts("jiehuifs")},
            {col:"state",label:"有效标志",type:"select",options:[{value:"1",text:"有效"},{value:"0",text:"无效"}]}
		]
	};
	
	//买方
	var buyer = {
			container:'buyer',
			columns:[
				{col:"buyerName",label:"买方名称",type:"text",validate:{required:true}},
				{col:"buyerSignName",label:"买方签约人",type:"text"},
				{col:"buyerTelephone",label:"买方联系电话",type:"text",validate:{telephone:true}},
				{col:"buyerOpenBank",label:"买方开户行",type:"text"},
				{col:"buyerBankAccount",label:"买方账号",type:"text",validate:{number:true}},
				{col:"buyerAddress",label:"买方地址",type:"textarea",rowNum:3}
			]
		};
	
	//卖方
	var seller = {
		container:'seller',
		columns:[
			{col:"sellerName",label:"卖方名称",type:"text",validate:{required:true},search:true},
			{col:"sellerSignName",label:"卖方签约人",type:"text"},
			{col:"sellerTelephone",label:"卖方联系电话",type:"text",validate:{telephone:true}},
			{col:"sellerOpenBank",label:"卖方开户行",type:"text"},
			{col:"sellerBankAccount",label:"卖方账号",type:"text",validate:{number:true}},
			{col:"sellerAddress",label:"卖方地址",type:"textarea",rowNum:3}
		]
	};
	
	//基本信息添加到页面
	formGenerator(config);
    //买方添加到页面
    formGenerator(buyer,"single");
    //卖方添加到页面
    formGenerator(seller,"single");
	//要验证的字段
	config.columns = $.merge($.merge(config.columns,buyer.columns),seller.columns);
	//验证表单
	registerValidate("addInfoForm",config);
	/*if(parent.flag){
        $('input[name="contractCode"]').attr("readonly",true);
	}*/
	
	if(serchParam.editflag=="detail" || serchParam.editflag=="edit"){
	    $.ajax({
	        url:'../../../../caiGouHeTong/selectByPrimaryKey',
	        type:'POST',
	        dataType:'json',
	        contentType:"application/x-www-form-urlencoded; charset=UTF-8",
	        data:{
	            "cghtUuid":parent.params.cght,
	            "type":"update",
	            "beian":parent.params.beian
	        },
	        success:function(result){
	           /* var ids = "";
	            var arr = result.data.fjids.split("-");
	            if(arr.length>0){
	                ids=arr[0]+"-"+arr[1]+"-"+arr[2];
	            }
	            fjstr = ids;*/
	            setFormData('addInfoForm',document,result.data);

	            var attachmentList = result.data.attachmentList;
	            if(attachmentList != null && attachmentList.length > 0){
	                $.each(attachmentList,function (index,attachment){
	                    var fileMark = attachment.fileMark;
	
	                    var array = fjMap[fileMark];
	                    if(array==null) fjMap[fileMark] = array = [];
	                    array.push({fj:attachment.fj,flag:"1"});
	
	                });
	            }

	            if(serchParam.editflag=="detail"){
	                $("#addInfoForm :input").attr({"readonly":true,"disabled":"disabled"});
	                $("#addInfoForm :button,#addInfoForm .btn-file,#addInfoForm .searchBtn,.text-danger").css("display","none");
	                $("#addInfoForm textarea").css("resize","none");
	
	                $("#addInfoForm .file-caption-name").attr({'placeholder':''})
	                $("#addInfoForm .kv-fileinput-caption").css({"display":"none"})
	
	                //查看时的附件显示
	                if(attachmentList != null && attachmentList.length > 0){
	                    $.each(attachmentList,function (index,attachment){
	                        var fjid = attachment.fj;
	                        var fjmc = attachment.name;
	                        var fileMark = attachment.fileMark;
	
	                        $("input[data_type="+fileMark+"]").closest("div.file-input").append('<p class="xiazaiFile" style="margin-top:10px;margin-bottom:0"><a href="../../../../attachment/download?attachmentId='+fjid+'">'+fjmc+'</a></p>');
	                    });
	                    $("#addInfoForm .xiazaiFile").css({"margin-top":"7px"})
	                }
	            }else if(serchParam.editflag=="edit"){
					if(attachmentList != null && attachmentList.length > 0){
						//修改时的附件
						$.each(attachmentList,function (index,attachment){
							var fjid = attachment.fj;
							var fjmc = attachment.name;
							var fileMark = attachment.fileMark;

							if(fjid != null && fjid != ''){
								$("input[data_type="+fileMark+"]").closest("div.file-input").append('<p class="xiazaiFile" style="margin-top:10px;margin-bottom:0"><a href="../../../../attachment/download?attachmentId='+fjid+'">'+fjmc+'</a><a style="margin-left:10px;" href="javascript:;" class="deleteFile"><i class="glyphicon glyphicon-remove"></i></a></p>');
							}
						});
						var deleteEle = $(document).find(".deleteFile");
						deleteEle.off("click").on("click",function(){
							var kind = $(this).closest("div.form-group").find(":file").attr("data_type");

							var array = fjMap[kind];
							if(array==null){
								fjMap[kind]=array=[];
							}else{
								array[array.length-1].flag = "0";
							}
							$(this).closest("p").remove();
						});
					}
				}
	        }
	    })
	}
    $('input[name="sellerName"]').attr("readonly",true);
    $('input[name="buyerName"]').attr("readonly",true);
	//合同编号重复校验
    $('input[name="contractCode"]').blur(function(){
        if($('input[name="contractCode"]').val().length>0){
            $.ajax({
                url:'../../../../caiGouHeTong/findPageByCondition',
                type:'POST',
                dataType:'json',
                contentType:"application/x-www-form-urlencoded; charset=UTF-8",
                data:{
                    "contractCodeConditon":$('input[name="contractCode"]').val(),
                    "pageNo":1,
                    "pageSize":10
                },
                success:function(result){
                    if(result.data.thisPageElements.length>0&&parent.oldContractCode.length==0){
                        layer.msg("合同编号重复，请重新输入");
                        $('input[name="contractCode"]').focus();
                    }
                    if(result.data.thisPageElements.length>0&&parent.oldContractCode!=$('input[name="contractCode"]').val()){
                        layer.msg("合同编号重复，请重新输入");
                        $('input[name="contractCode"]').focus();
                    }
                }
            })
		}
    });

	//初始化本企业
	initSelf();
	//初始化搜索按钮
    initSearchBtn();

	//添加或修改保存
	$("#saveOrUupdateBtn").on("click",function(e){
		if(parent.oldContractCode.length>0){
            $('#fjids').val(JSON.stringify(fjMap));//修改回显附件ids
		}
		if($('#addInfoForm').valid()){
			/*if($('#fjids').val().length<1){
				parent.layer.msg("请上传【合同源文件】！");
				return;
			}*/
			//验证附件
			var $pEle = $("#fujian").find("input.file-caption-name").eq(0).closest(".file-input").find("p");
			if($pEle.length==0){
				if(!$("#fujian").find("input.file-caption-name").eq(0).val()){
					parent.layer.msg("请上传【合同源文件】！");
					var i = $("#fujian").index();
					$("#addInfoForm").find(".nav.nav-tabs li").eq(i).find("a").trigger("click");
					return;
				}
			}
            $('#fjids').val(JSON.stringify(fjMap));//修改回显附件ids
		    var data = $("#addInfoForm").serialize();
		    var uuid = $("#addInfoForm input[name='cght']").val();
	        $.ajax({
	            url : "../../../../caiGouHeTong/editCght",
	            contenType:'application/json',
	            type : "POST",
	            data : data,
	            success : function (result) {
	                parent.layer.msg(result.msg);
            		parent.layer.close(parent.layer.getFrameIndex(window.name));//成功后关闭页面
            		parent.refreshTable(); //刷新页面
	            },
	            error: function(XMLHttpRequest, textStatus, errorThrown) {
	            }
	        });
		}else{
			var $tabPanel = $("#addInfoForm").find("div.tab-pane.active.clearfix");
			var $errEle = $tabPanel.find(".has-error :input").eq(0);
			 
			if($errEle.length!=0){//如果当前的tab没通过验证
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
		} 
	});
});

function initSelf() {
    $.ajax({
        url:'../../../../caiGouHeTong/initSelf',
        type:'POST',
        dataType:'json',
        contentType:"application/x-www-form-urlencoded; charset=UTF-8",
        success:function(result){
            if(result.data!=null){
                $('#buyerNsrsbh').val(result.data.nsrsbh);
                $('input[name="buyerName"]').val(result.data.enterpriseName);
                $('input[name="buyerSignName"]').val(result.data.contacts);
                $('input[name="buyerTelephone"]').val(result.data.telephone);
                $('input[name="buyerOpenBank"]').val(result.data.openBank);
                $('input[name="buyerBankAccount"]').val(result.data.bankAccount);
                $(":input[name='buyerAddress']").val(result.data.registeredAddress);
			}
        }
    })
}

function initSearchBtn() {
    $("input[name='sellerName']").next("a").click(function(){
        openLayer({
            ele:this,
            title : '<i class="text-info fa fa-search" style="padding-right:3px;font-size:12px;"></i>供货商列表',
            //area : ["98%","96%"],
            url : "../../../pages/hetong/caigou/ghs_list.html"
        });
    })
}

//添加联系人信息
function addLinks(config){
	
	if(!$.isEmptyObject(config)){
		var $ele = getEleByKey(config.container),array=[];
		for(var i=0; i<config.columns.length; i++){
			var required = config.columns[i].required;
			//if(required==null && $.isValidObject(config.columns.validate)) required = config.columns.validate.required;
			if(config.columns[i].validate){
				required = config.columns[i].validate.required;
			}
			array.push('<div class="form-group"><label class="col-sm-5 control-label">'+(required?'<span class="text-danger req">*&nbsp;</span>':'')+config.columns[i].label+':</label><div class="col-sm-5">');
			switch(config.columns[i].type){
				case "text":
					array.push('<input type="text" name="'+config.columns[i].col+'" class="form-control input-sm" /></div></div>');
					break;
				case "select":
					break;
				case "textarea":
					array.push('<textarea class="form-control input-sm"  rows="3" name="'+config.columns[i].col+'"></textarea></div></div>');
					break;
			}
			
		}
		$ele.append(array.join(""));
	}
	
}