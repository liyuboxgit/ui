var branch = '0';
var fjMap = {};
//附件上传按钮
$(".inputBtn").fileinput({
	language : "zh",
	showCaption : true,
	browseClass : "btn btn-default btn-sm",
	uploadExtraData : {category:'wlxy'},
	dropZoneEnabled : false,
    showPreview : false,
    showUpload : false,
    showRemove : false,
	removeClass : "btn btn-default btn-sm",
	uploadClass : "btn btn-default btn-sm",
	//captionClass : "input-sm block",
	uploadUrl : "../../../../attachment/upload"
}).on("change",function(e,file){
	//$('#input-id').fileinput('refresh', {uploadExtraData : {id: $("#addInfoForm input[name='ckht']").val()}});
	// console.log($(this).attr("data_type"));
}).on("fileuploaded", function(event, data, previewId, index) {
    var fj = data.response.data.fj;
    var type = $(this).attr("data_type");

    layer.msg("上传成功");

    //上传成功后显示开始
    $(this).closest(".file-input").find(".xiazaiFile").remove();
    $(this).closest(".file-input").append('<p class="xiazaiFile" style="margin-top:10px;margin-bottom:0"><a href="../../../../attachment/download?attachmentId='+fj+'">'+data.files[0].name+'</a><a style="margin-left:10px;" href="javascript:;" class="deleteFile"><i class="glyphicon glyphicon-remove"></i></a></p>');
    var deleteEle = $(this).closest("div.form-group").find(".deleteFile");
    deleteEle.off("click").on("click",function(){
        var kind = $(this).closest("div.form-group").find(":file").attr("data_type");


        var array = fjMap[kind];
        if(array==null){
            fjMap[kind]=array=[];
        }else{
            for(var i = 0; i < array.length; i++) array[i].flag = "0";
        }
        $(this).closest("p").remove();
    });
    //重新上传的数据，设置标志为1，后台用于更新。之前的数据，设置标志为0，后台用于删除
    var array = fjMap[type];
    if(array==null){
        fjMap[type]=array=[];
    }else{
        for(var i = 0; i < array.length; i++) array[i].flag = "0";
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
	if(typeof(serchParam.branch) != "undefined"){
		branch = serchParam.branch;
	}
	/*dateTime:true,required:true*/
	var config = {
		container:'info',
		columns:[
			{col:"agreementCode",label:"协议编号",type:"text",validate:{required:true}},
			{col:"agreementName",label:"协议名称",type:"text",validate:{required:true}},
            {col:"transportMode",label:"运输方式",type:"select",validate:{required:true},
                options:getDicts("transportMode")
            },
            {col:"dispatchPlace",label:"发运地",type:"text",validate:{required:true},},
            {col:"destination",label:"目的地",type:"text",validate:{required:true},},
            {col:"contractAmount",label:"协议金额",type:"text",validate:{number:true}},
            {col:"premium",label:"保费金额",type:"text",validate:{number:true}},
            {col:"bzje",label:"保障金额",type:"text",validate:{number:true}},
            {col:"currency",label:"币制",type:"select",
                options:getDicts("currency")
            },

            {col:"checkoutMode",label:"结汇方式",type:"select",
                options:getDicts("jiehuifs")
            },


			//{col:"signTime",label:"签约日期",type:"date"},//validate:{required:true,dateLEInput:"beginDate"}
			//{col:"beginDate",label:"生效日期",type:"date",validate:{required:true}},//,validate:{required:true,dateGEInput:"signTime"}
			/*{col:"endTime",label:"截止日期",type:"date"},*/

			{col:"paymentTime",label:"付款日期",type:"date"},

			{col:"state",label:"有效标志",type:"select",
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

	var buyer_wm = {
		container:'buyer',
		columns:[
			{col:"entrustingParty",label:"委托方名称",type:"text",validate:{required:true}},
			{col:"entrustingSignName",label:"委托方签约人",type:"text"},
			{col:"entrustingTelephone",label:"委托方联系电话",type:"text",validate:{telephone:true}},
			{col:"entrustingOpenBank",label:"委托方开户行",type:"text"},
			{col:"entrustingBankAccount",label:"委托方账号",type:"text",validate:{number:true}},
			{col:"entrustingAddress",label:"委托方地址",type:"textarea",rowNum:3}
		]
	};
    var buyer_dl = {
        container:'buyer',
        columns:[
            {col:"entrustingParty",label:"委托方名称",type:"text",validate:{required:true},search:true},
            {col:"entrustingSignName",label:"委托方签约人",type:"text"},
            {col:"entrustingTelephone",label:"委托方联系电话",type:"text",validate:{telephone:true}},
            {col:"entrustingOpenBank",label:"委托方开户行",type:"text"},
            {col:"entrustingBankAccount",label:"委托方账号",type:"text",validate:{number:true}},
            {col:"entrustingAddress",label:"委托方地址",type:"textarea",rowNum:3}
        ]
    };

	var seller = {
		container:'seller',
		columns:[
			{col:"agentParty",label:"代理方名称",type:"text",validate:{required:true}},
			{col:"agentSignName",label:"代理方签约人",type:"text"},
			{col:"agentTelephone",label:"代理方联系电话",type:"text",validate:{telephone:true}},
			{col:"agentOpenBank",label:"代理方开户行",type:"text"},
			{col:"agentBankAccount",label:"代理方账号",type:"text",validate:{number:true}},
			{col:"agentAddress",label:"代理方地址",type:"textarea",rowNum:3}
		]
	};

	//基本信息添加到页面
	formGenerator(config);

    if(branch == '0'){
        //买方添加到页面
        formGenerator(buyer_wm,"single");
	}else{
        formGenerator(buyer_dl,"single");
	}

	//卖方添加到页面
	formGenerator(seller,"single");

    if(branch == '0'){
        initSelf();
        //要验证的字段
        config.columns = $.merge($.merge(config.columns,buyer_wm.columns),seller.columns);
    }else{
        initSearchBtn();
        //要验证的字段
        config.columns = $.merge($.merge(config.columns,buyer_dl.columns),seller.columns);
    }
    //验证表单
    registerValidate("addInfoForm",config);

    if(serchParam.editflag == 'edit' || serchParam.editflag == 'detail'){
        $.ajax({
            url:'../../../../wuLiuYunShu/selectByPrimaryKey',
            type:'GET',
            dataType:'json',
            data:{
                "wlysUuid":parent.params.wlys,
                "type":"update",
                "beian":parent.params.beian
            },
            success:function(result){
                //$("#addInfoForm input[name='wlys']",currentFrame).val(selectRows[0].wlys);
                setFormData('addInfoForm',document,result.data)
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
                    $("#addInfoForm textarea").attr({"readonly":true,"disabled":"disabled"});
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
                        $("#check p").css({"margin-top" :"2px","text-align":"left"})
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
                        $("#check p").css({"margin-top" :"2px","text-align":"left"})
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

    $('input[name="entrustingParty"]').attr("readonly",true);

    //合同编号重复校验
    $('input[name="agreementCode"]').blur(function(){
        if($('input[name="agreementCode"]').val().length>0){
            $.ajax({
                url:'../../../../wuLiuYunShu/findPageByCondition',
                type:'POST',
                dataType:'json',
                contentType:"application/x-www-form-urlencoded; charset=UTF-8",
                data:{
                    "agreementCodeConditon":$('input[name="agreementCode"]').val(),
                    "pageNo":1,
                    "pageSize":10
                },
                success:function(result){
                    if(result.data.thisPageElements.length>0&&parent.oldContractCode.length==0){
                        layer.msg("合同编号重复，请重新输入");
                        $('input[name="agreementCode"]').focus();
                    }
                    if(result.data.thisPageElements.length>0&&parent.oldContractCode!=$('input[name="agreementCode"]').val()){
                        layer.msg("合同编号重复，请重新输入");
                        $('input[name="agreementCode"]').focus();
                    }
                }
            })
        }
    });

	$("#saveOrUupdateBtn").on("click",function(){
        if(parent.oldContractCode.length>0){
            $('#fjids').val(JSON.stringify(fjMap));//修改回显附件ids
        }
		if($("#addInfoForm").valid()){

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
			//var fjids = $("#fj1").val()+","+$("#fj2").val()+","+$("#fj3").val()+","+$("#fj4").val()+","+$("#fj5").val()+","+$("#fj6").val()+","+$("#fj7").val();
	        $("#fjids").val(JSON.stringify(fjMap));
		    var data = $("#addInfoForm").serialize();
		    var uuid = $("#addInfoForm input[name='wlys']").val();
	        $.ajax({
	            url : "../../../../wuLiuYunShu/addOrUpdate?branch="+branch,
	            contenType:'application/json',
	            type : "POST",
	            data : data,
	            success : function (result) {
	                if(result.success){
                        parent.layer.close(parent.layer.getFrameIndex(window.name));//成功后关闭页面
                        parent.refreshTable(); //刷新页面
	                	parent.layer.msg(result.msg);
	                }else{
                        parent.layer.msg(result.msg);
	                }

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

//添加表头操作按钮
function addLinks(config){
	if(!$.isEmptyObject(config)){
		var $ele = getEleByKey(config.container),array=[];
		for(var i=0; i<config.columns.length; i++){
			
			array.push('<div class="form-group"><label class="col-sm-5 control-label">'+config.columns[i].label+':</label><div class="col-sm-5">');
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


function initSelf() {

    $.ajax({
        url:'../../../../caiGouHeTong/initSelf',
        type:'POST',
        dataType:'json',
        // contentType:"application/x-www-form-urlencoded; charset=UTF-8",
        success:function(result){

            if(result.data!=null){

                $('#entrustingNsrsbh').val(result.data.nsrsbh);
                $('input[name="entrustingParty"]').val(result.data.enterpriseName);
                $('input[name="entrustingSignName"]').val(result.data.contacts);
                $('input[name="entrustingTelephone"]').val(result.data.telephone);
                $('input[name="entrustingOpenBank"]').val(result.data.openBank);
                $('input[name="entrustingBankAccount"]').val(result.data.bankAccount);
                $("input[name='entrustingAddress']").val(result.data.registeredAddress);
            }
        }
    })
}

function initSearchBtn() {
    $("input[name='entrustingParty']").next("a").click(function(){
        openLayer({
            ele:this,
            title : '<i class="text-info fa fa-search" style="padding-right:3px;font-size:12px;"></i>供货商列表',
            area : ["98%","96%"],
            url : "../../hetong/caigou/ghs_list_wlys.html"
        });
    })
}
