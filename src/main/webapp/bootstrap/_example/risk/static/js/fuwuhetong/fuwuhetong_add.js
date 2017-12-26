var fjMap = {};
//附件上传按钮
$(".inputBtn").fileinput({
    language : "zh",
    showCaption : true,
    browseClass : "btn btn-default btn-sm",
    uploadExtraData : {category:'fwht'},
    dropZoneEnabled : false,
    showPreview : false,
    removeClass : "btn btn-default btn-sm",
    uploadClass : "btn btn-default btn-sm",
    //captionClass : "input-sm block",
    uploadUrl : "../../../attachment/upload",
}).on("change",function(e,file){
    //$('#input-id').fileinput('refresh', {uploadExtraData : {id: $("#addInfoForm input[name='ckht']").val()}});
    // console.log($(this).attr("data_type"));
    //console.log(this.getAttribute("data_type"));

}).on("fileuploaded", function(event, data, previewId, index) {
    var fj = data.response.data.fj;
    var type = $(this).attr("data_type");
    /*if(type == 'htywj'){
     $("#fj1").val(fj+"-"+type);
     }else{
     $("#fj4").val(fj+"-"+type);
     }*/
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
    });

    /*
     for(var key in fjMap){
     if(key.indexOf(type)>-1){
     delete fjMap[key];
     break;
     }
     }
     //fjMap[type] = fj;
     fjMap[fj+"-"+type] = "1";
     */

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
    //基本信息
    var config = {
        container:"info",
        columns:[
            {col:"fwht",label:"服务协议ID",type:"text",type:"hidden"},
            {col:"htbh",label:"合同编号",type:"text",validate:{required:true}},
            {col:"htmc",label:"合同名称",type:"text",validate:{required:true}},
            {col:"signTime",label:"签约日期",type:"date",validate:{required:true,date:true,dateLEInput:"startTime"}},
            {col:"startTime",label:"委托服务开始日期",type:"date",validate:{required:true,date:true}},
            {col:"endTime",label:"委托服务结束日期",type:"date",validate:{required:true,date:true,dateGEInput:"startTime"}},
            {col:"yhmc",label:"退税款账户开户行",type:"text",validate:{required:true}},
            {col:"zhmc",label:"退税款账户名称",type:"text",validate:{required:true}},
            {col:"zh",label:"退税款账户账号",type:"text",validate:{required:true},validate:{number:true}},
            {col:"state",label:"有效标志",type:"select",validate:{required:true},
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

    //委托方
    var clienter = {
        container:'clienter',
        columns:[
            {col:"wtfmc",label:"委托方名称",type:"text",validate:{required:true},search:true},
            {col:"wftfnsrsbh",label:"委托方纳税人识别号",type:"text",type:"hidden"},
            {col:"wtfqdr",label:"委托方签约人",type:"text"},
            {col:"wtflxdh",label:"委托方联系电话",type:"text",validate:{telephone:true}},
            {col:"wtfdz",label:"委托方地址",type:"textarea",rowNum:3}

        ]
    };

    //被委托方
    var servicer = {
        container:'servicer',
        columns:[
            {col:"bwtfmc",label:"被委托方名称",type:"text",validate:{required:true}},
            {col:"bwtfqdr",label:"被委托方签约人",type:"text"},
            {col:"bwtflxdh",label:"被委托方联系电话",type:"text",validate:{telephone:true}},
            {col:"bwtfdz",label:"被委托方地址",type:"textarea",rowNum:3}
        ]
    };

    //基本信息添加到页面
    formGenerator(config);
    //委托方添加到页面
    formGenerator(clienter,"single");
    //被委托方添加到页面
    formGenerator(servicer,"single");
    //要验证的字段
    config.columns = $.merge($.merge(config.columns,clienter.columns),servicer.columns);
    //验证表单
    registerValidate("addInfoForm",config);
    $('input[name="wtfmc"]').attr("readonly",true);
    $('input[name="bwtfmc"]').attr("readonly",true);

    if(serchParam.editflag=="detail" || serchParam.editflag=="edit"){
        $.ajax({
            url:'../../../fuwuhetong/selectByPrimaryKey',
            type:'POST',
            dataType:'json',
            contentType:"application/x-www-form-urlencoded; charset=UTF-8",
            data:{
                "fwht":parent.params.fwht
            },
            success:function(result){
                //$("#addInfoForm input[name='cght']",currentFrame).val(selectRows[0].uuid);
                setFormData('addInfoForm',document,result.data)

                var attachmentList = result.data.attachmentList;
                if(attachmentList != null && attachmentList.length > 0) {
                    $.each(attachmentList, function (index, attachment) {
                        /*
                         for(var key in fjMap){
                         if(key.indexOf(attachment.fileMark)>-1){
                         delete fjMap[key];
                         break;
                         }
                         }
                         //fjMap[attachment.fileMark] = attachment.fj;
                         fjMap[attachment.fj+"-"+attachment.fileMark] = "1";
                         */
                        var array = fjMap[attachment.fileMark];
                        if (array == null) fjMap[attachment.fileMark] = array = [];
                        array.push({fj: attachment.fj, flag: "1"});
                    })
                }
                //查看详情页面样式
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

                            $("input[data_type="+fileMark+"]").closest("div.file-input").append('<p class="xiazaiFile" style="margin-top:10px;margin-bottom:0"><a href="../../../attachment/download?attachmentId='+fjid+'">'+fjmc+'</a></p>');
                        });
                        $("#addInfoForm .xiazaiFile").css({"margin-top":"7px"})
                    }

                }else if(serchParam.editflag=="edit"){
                    //修改时附件显示
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

    //初始化被委托人
    $.ajax({
        url:'../../../caiGouHeTong/initSelf',
        type:'POST',
        dataType:'json',
        success:function(result){
            if(result.data!=null){
                $('input[name="bwtfmc"]').val(result.data.enterpriseName);
                $('input[name="bwtfqdr"]').val(result.data.contacts);
                $('input[name="bwtflxdh"]').val(result.data.telephone);
                $('input[name="bwtfdz"]').val(result.data.registeredAddress);
            }
        }
    });
    //初始化搜索按钮
    $("input[name='wtfmc']").next("a").click(function(){
        openLayer({
            ele:this,
            title : '<i class="text-info fa fa-search" style="padding-right:3px;font-size:12px;"></i>委托方列表',
            area : ["98%","96%"],
            url : "../fuwuhetong/fwht_ghs_list.html"
        });
    });

    //合同编号重复校验
    $(":input[name='htbh']:eq(0)").on("blur",function (e) {
        var htbh = $(":input[name='htbh']:eq(0)").val();
        if(htbh.length > 0 && serchParam.editflag != "detail"){
            console.log(htbh);
            $.ajax({
                url : "../../../fuwuhetong/findPageByCondition",
                type : "post",
                dataType : "json",
                data : {
                    "htbhCondition":htbh,
                    "pageNo":1,
                    "pageSize":10,
                },
                success : function (result) {
                    console.log(result);
                    if(result.data.thisPageElements.length>0&&parent.oldContractCode.length==0){
                        layer.msg("合同编号重复，请重新输入");
                        $('input[name="htbh"]').focus();
                    }
                    if(result.data.thisPageElements.length>0&&parent.oldContractCode!=$('input[name="htbh"]').val()){
                        layer.msg("合同编号重复，请重新输入");
                        $('input[name="htbh"]').focus();
                    }
                }
            })
        }

    });

    //添加或修改保存
    $("#saveOrUupdateBtn").on("click",function(e){
        if(parent.oldContractCode.length>0){
            $('#fjids').val(JSON.stringify(fjMap));//修改回显附件ids
        }
        //校验生效日期必须小于等于签约日期
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

            //var fjids = $("#fj1").val()+","+$("#fj4").val();
            $("#fjids").val(JSON.stringify(fjMap));
            var data = $("#addInfoForm").serialize();
            //  var uuid = $("#addInfoForm input[name='ckht']").val();
            $.ajax({
                url : "../../../fuwuhetong/insertFWT",
                contenType:'application/json',
                type : "POST",
                data : data,
                success : function (result) {
                    if(result.success){
                        parent.layer.msg(result.msg);
                    }else{
                        parent.layer.msg(result.msg);
                    }
                    parent.layer.close(parent.layer.getFrameIndex(window.name));//成功后关闭页面
                    parent.refreshTable(); //刷新页面
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