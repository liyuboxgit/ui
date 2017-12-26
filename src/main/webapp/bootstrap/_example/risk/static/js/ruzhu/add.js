var branch = '0';
var fjMap = {};

//附件上传按钮
var uploadUrl = "../../../attachment/upload";
$("input[name='file'].inputBtn").fileinput({
    language : "zh",
    showCaption : true,
    browseClass : "btn btn-default btn-sm",
    uploadExtraData : {category:'ghs'},//供货商
    dropZoneEnabled : false,
    showPreview : false,
    showUpload : false,
    showRemove : false,
    removeClass : "btn btn-default btn-sm",
    uploadClass : "btn btn-default btn-sm",
    //captionClass : "input-sm block",
    uploadUrl :uploadUrl
}).on("change",function(e,file){

}).on("fileuploaded", function(event, data, previewId, index) {
    var fj = data.response.data.fj;
    var type = $(this).attr("data_type");

    layer.msg("上传成功");

    //上传成功后显示开始
    $(this).closest(".file-input").find(".xiazaiFile").remove();
    $(this).closest(".file-input").append('<p class="xiazaiFile" style="margin-top:10px;margin-bottom:0"><a href="../../../attachment/download?attachmentId='+fj+'">'+data.files[0].name+'</a><a style="margin-left:10px;" href="javascript:;" class="deleteFile"><i class="glyphicon glyphicon-remove"></i></a></p>');
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
    });
    //上传成功后显示结束
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
    if(typeof(serchParam.branch) != "undefined"){
        branch = serchParam.branch;
    }
	//基本信息-贸易
	var config_my = {
			container:'info',
			columns:[
                {col:"nsrsbh",label:"纳税人识别号",type:"text",validate:{required:true,nsrsbh:true}},
				{col:"customsCode",label:"企业海关代码",type:"text",validate:{required:true,length:10}},
				{col:"supplierName",label:"供货商名称",type:"text",validate:{required:true}},
				{col:"supplierType",label:"企业类型",type:"select",validate:{required:true},
					options:getDictsExt("qylx")
				},
                {col:"branch",label:"业务类型",type:"select",validate:{required:true},
                    options:[
                        {
                            value:"0",text:"自营"
                        },
                        {
                            value:"2",text:"自营及代办"
                        }
                    ]
                },
                {col:"invoiceLimit",label:"发票限额",type:"select",
                    options:[
                        {
                            value:"10000",text:"万元"
                        },
                        {
                            value:"100000",text:"十万元"
                        },
                        {
                            value:"1000000",text:"百万元"
                        },
                        {
                            value:"10000000",text:"千万元"
                        }
                    ]
                },
				{col:"socialCreditCode",label:"社会信用代码",type:"text",validate:{length:18}},
				{col:"clrq",label:"成立日期",type:"date"},
				{col:"registrationAuthority",label:"登记机关",type:"text"},
				{col:"corporateRepresentative",label:"法人代表",type:"text"},
				{col:"insideCreditRating",label:"内部评估等级 ",type:"select",
					options:getDictsExt("nbpgdj")
				},
				//{col:"taxCreditRating",label:"风险评估等级 ",type:"number",validate:{required:true,number:true,min:0,max:100}},
				{col:"taxCreditRating",label:"风险评估等级 ",type:"select",
					options: [
	                    {
	                        value:"",text:"请选择",selected:true
	                    },
	                    {
	                        value:"1",text:">=60"
	                    },
	                    {
	                    	value:"2",text:"<60"
	                    },
	                    {
	                        value:"3",text:"60-70"
	                    },
	                    {
	                        value:"4",text:"70-80"
	                    },
	                    {
	                        value:"5",text:"80-90"
	                    },
	                    {
	                        value:"6",text:"90-100"
	                    }
	                ]
				},
				{col:"payTaxesCreditRating",label:"纳税信用等级",type:"select",
					options:getDictsExt("nsxydj")
				},
				{col:"zipCode",label:"邮编",type:"text",validate:{ postalCode:true }},
				{col:"registeredCapital",label:"注册资本",type:"text"},
				{col:"deadline",label:"截止期限",type:"date"},
                {col:"myyx",label:"有效标志",type:"select",
                    options:[
                        {
                            value:"1",text:"有效"
                        },
                        {
                            value:"0",text:"无效"
                        }
                    ]
                },
                {col:"remarks",label:"备注",type:"textarea"}
			]
		};

    //基本信息-代理
    var config_dl = {
            container:'info',
            columns:[
                {col:"nsrsbh",label:"纳税人识别号",type:"text",validate:{required:true,nsrsbh:true}},
                {col:"customsCode",label:"企业海关代码",type:"text",validate:{required:true,length:10}},
                {col:"supplierName",label:"供货商名称",type:"text",validate:{required:true}},
                {col:"supplierType",label:"企业类型",type:"select",validate:{required:true},
                    options:getDictsExt("qylx")
                },
                {col:"branch",label:"业务类型",type:"select",validate:{required:true},
                    options:[
                        {
                            value:"1",text:"代办"
                        },
                        {
                            value:"2",text:"自营及代办"
                        }
                    ]
                },
                {col:"invoiceLimit",label:"发票额度",type:"select",
                    options:[
                        {
                            value:"10000",text:"万元"
                        },
                        {
                            value:"100000",text:"十万元"
                        },
                        {
                            value:"1000000",text:"百万元"
                        },
                        {
                            value:"10000000",text:"千万元"
                        }
                    ]
                },
                {col:"socialCreditCode",label:"社会信用代码",type:"text",validate:{length:18}},
                {col:"clrq",label:"成立日期",type:"date"},
                {col:"registrationAuthority",label:"登记机关",type:"text"},
                {col:"corporateRepresentative",label:"法人代表",type:"text"},
                {col:"insideCreditRating",label:"内部评估等级 ",type:"select",
                    options:getDictsExt("nbpgdj")
                },
				{col:"taxCreditRating",label:"风险评估等级 ",type:"select",
					options: [
	                    {
	                        value:"",text:"请选择",selected:true
	                    },
	                    {
	                        value:"1",text:">=60"
	                    },
	                    {
	                    	value:"2",text:"<60"
	                    },
	                    {
	                        value:"3",text:"60-70"
	                    },
	                    {
	                        value:"4",text:"70-80"
	                    },
	                    {
	                        value:"5",text:"80-90"
	                    },
	                    {
	                        value:"6",text:"90-100"
	                    }
	                ]},
                {col:"payTaxesCreditRating",label:"纳税信用等级",type:"select",
                    options:getDictsExt("nsxydj")
                },
                {col:"zipCode",label:"邮编",type:"text",validate:{ postalCode:true }},
                {col:"registeredCapital",label:"注册资本",type:"text"},
                {col:"deadline",label:"截止期限",type:"date"},
                {col:"dlyx",label:"有效标志",type:"select",
                    options:[
                        {
                            value:"1",text:"有效"
                        },
                        {
                            value:"0",text:"无效"
                        }
                    ]
                },
                {col:"remarks",label:"备注",type:"textarea"}
            ]
        };
        
		//联系人
		var links = {
				container:'link',
				columns:[
					{col:"contacts",label:"联系人",type:"text"},
					{col:"telephone",label:"固定电话",type:"text",validate:{telephone:true}},
					{col:"phone",label:"手机",type:"text",validate:{mobile:true}},
					{col:"openBank",label:"开户行",type:"text"},
					{col:"bankAccount",label:"账户",type:"text",validate:{number:true}},
					{col:"registeredAddress",label:"注册地址",type:"textarea",rowNum:1,height:22},
					{col:"jyfw",label:"经营范围",type:"textarea", rowNum : 3}

					//{col:"remarks",label:"备注",type:"text"},
				]
		};
		//添加联系人
		formGenerator(links);
		
		var $container = null;
        console.log(branch);
        
        if(branch == '0'){
            $container = formGenerator(config_my);
            config_my.columns = $.merge(config_my.columns, links.columns);
            registerValidate("addInfoForm",config_my);
        }else{
            $container = formGenerator(config_dl);
            config_dl.columns = $.merge(config_dl.columns, links.columns);
            registerValidate("addInfoForm",config_dl);
        }
		
        if(serchParam.editflag=="detail" || serchParam.editflag=="edit"){
            var uuid = '';
            if(typeof(serchParam.ghs) == "undefined" || serchParam.ghs == null || serchParam.ghs.length == 0){
                uuid = parent.params.uuid;
            }else{
                uuid = serchParam.ghs;
            }
            $.ajax({
                url:'../../../ghs/queryGhsForObject',
                type:'GET',
                dataType:'json',
                data:{
                    "ghsUuid":uuid,
                    "type":"update",
                },
                success:function(result){

                    $("#addInfoForm input[name='uuid']").val(parent.params.uuid);
                    setFormData('addInfoForm',document,result.data);

                    var attachmentList = result.data.attachmentList;
                    if(attachmentList != null && attachmentList.length > 0) {
                        if (result.data.gongHuoShangShiQianHeCha != null) {
                            var a = result.data.gongHuoShangShiQianHeCha.ghssqhc;
                            $("#ghssqhc").val(a);
                            $.each(result.data.gongHuoShangShiQianHeCha, function (f, n) {
                                $("#check select[name='" + f + "']").val(n);
                                $("#check textarea[name='" + f + "']").val(n);
                            });
                        }
                    }
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

                                $("input[data_type="+fileMark+"]").closest("div.file-input").append('<p class="xiazaiFile" style="margin-top:10px;margin-bottom:0"><a href="../../../attachment/download?attachmentId='+fjid+'">'+fjmc+'</a></p>');
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
                                    $("input[data_type="+fileMark+"]").closest("div.file-input").append('<p class="xiazaiFile" style="margin-top:10px;margin-bottom:0"><a href="../../../attachment/download?attachmentId='+fjid+'">'+fjmc+'</a><a style="margin-left:10px;" href="javascript:;" class="deleteFile"><i class="glyphicon glyphicon-remove"></i></a></p>');
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

		//点击保存
		$("#saveOrUupdateBtn").on("click",function(){
			if($('#addInfoForm').validate().form()){ //验证通过后
                if(parent.oldContractCode.length>0){
                    $('#fjids').val(JSON.stringify(fjMap));//修改回显附件ids
                }
                //验证附件
                var $pEle = $("#fujian").find("input.file-caption-name").eq(0).closest(".file-input").find("p");
                if($pEle.length==0){
                    if(!$("#fujian").find("input.file-caption-name").eq(0).val()){
                        parent.layer.msg("请上传【营业执照】！");
                        var i = $("#fujian").index();
                        $("#addInfoForm").find(".nav.nav-tabs li").eq(i).find("a").trigger("click");
                        return;
                    }
                }
				saveOrUpdate();
			}
		});

		//纳税识别号失去焦点的事件，去后台查询数据
        $(":input[name='nsrsbh']:eq(0)").on("change",function () {
           var nsrsbh = $(":input[name='nsrsbh']:eq(0)").val();
           var uuid = $("#uuid").val();

           $.ajax({
               url : '../../../ghs/queryByNsrsbh',
               type : 'get',
               data : {"nsrsbh":nsrsbh},
               success : function (result) {
                   if(result.success){
                       //查询出该nsrsbh下有的数据
                       layer.alert('已存在该纳税人识别号下的信息', {closeBtn: 0 } ,
                           function (index) {
                               layer.close(index);
                               setFormData('addInfoForm',document,result.data);
                               var attachmentList = result.data.attachmentList;

                               var a = result.data.gongHuoShangShiQianHeCha.ghssqhc;
                               $("#ghssqhc").html('<input name="ghssqhc" value="'+a+'"/>');
                               console.log(a);
                               //debugger;
                               if(result.data.gongHuoShangShiQianHeCha){
                                   $.each(result.data.gongHuoShangShiQianHeCha,function(f,n){
                                       $("#check select[name='"+f+"']").val(n);
                                       $("#check textarea[name='"+f+"']").val(n);
                                   });
                               }
                               if(attachmentList != null && attachmentList.length > 0){
                                   $.each(attachmentList,function (index,attachment){
                                       var fileMark = attachment.fileMark;
                                       var fjid = attachment.fj;
                                       var fjmc = attachment.name;

                                       var array = fjMap[fileMark];
                                       if(array==null) fjMap[fileMark] = array = [];
                                       array.push({fj:attachment.fj,flag:"1"});

                                       if(fjid != null && fjid != ''){
                                           $("input[data_type="+fileMark+"]").closest("div.file-input").append('<p class="xiazaiFile" style="margin-top:10px;margin-bottom:0"><a href="../../../attachment/download?attachmentId='+fjid+'">'+fjmc+'</a><a style="margin-left:10px;" href="javascript:;" class="deleteFile"><i class="glyphicon glyphicon-remove"></i></a></p>');
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
                       )

                   }else{
                       //setFormData('addInfoForm',document,document,result.data);
                       //$(":input[name='nsrsbh']:eq(0)").val(nsrsbh);
                       //$(":input[name='uuid']:eq(0)").val(uuid);
                       //$(":input[name='branch']:eq(0)").val(branch);
                   }
               },
               error : function () {

               }
           })

        });
});

/*跳转到后台进行新增或更新*/
function saveOrUpdate() {
 /*   var fjids = $("#fj1").val()+","+$("#fj2").val()+","+$("#fj3").val()+","+$("#fj4").val();
    var str = ',';
    for(var i = 1;i <= 9;i++){
        str += $("#sqhefj"+i).val()+','
    }
    fjids = fjids + str;*/
    $("#fjids").val(JSON.stringify(fjMap));
    var uuid = $("#uuid").val();

    $("#addInfoForm input[name='uuid']").val(uuid);
    var data = $("#addInfoForm").serialize();
    //debugger;
    $.ajax({
        url : "../../../ghs/editGhs",
        type : "post",
        dataType : "json",
        // contentType:"application/x-www-form-urlencoded; charset=UTF-8",
        // data : {data:data,fjids:fjids},
        data:data,
        success : function (result) {
            if(result.success){
                parent.layer.close(parent.layer.getFrameIndex(window.name));//成功后关闭页面
                parent.refreshTable(); //刷新页面
                parent.layer.msg(result.msg);
            }else{
                parent.layer.msg(result.msg);
            }

        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {

        }
    });
};