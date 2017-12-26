var branch = '0';
$(function(){
    if(typeof(serchParam.branch) != "undefined"){
        branch = serchParam.branch;
    }
    //基本信息-贸易
    var config_my = {
        container:'info',
        columns:[
            {col:"nsrsbh",label:"纳税人识别号",type:"text",validate:{required:true}},
            {col:"customsCode",label:"企业海关代码",type:"text",validate:{required:true}},
            {col:"supplierName",label:"供货商名称",type:"text",validate:{required:true}},
            {col:"supplierType",label:"企业类型",type:"text",validate:{required:true}},
            /*          {col:"branch",label:"业务类型",type:"select",validate:{required:true},
                options:[
                    {
                        value:"0",text:"外贸"
                    },
                    {
                        value:"2",text:"外贸及代理"
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
            },*/
            {col:"socialCreditCode",label:"社会信用代码",type:"text"},
            {col:"clrq",label:"成立日期",type:"date"},
            {col:"registrationAuthority",label:"登记机关",type:"text"},
            {col:"corporateRepresentative",label:"法人代表",type:"text"},
            {col:"insideCreditRating",label:"内部评估等级 ",type:"text"},
            {col:"payTaxesCreditRating",label:"纳税信用等级",type:"text"},
            {col:"zipCode",label:"邮编",type:"text",validate:{digits:true}},
            {col:"registeredCapital",label:"注册资本",type:"text"},
            {col:"deadline",label:"截止期限",type:"date"}/*,
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
            {col:"remarks",label:"备注",type:"textarea"}*/
        ]
    };

    //基本信息-代理
    var config_dl = {
        container:'info',
        columns:[
            {col:"nsrsbh",label:"纳税人识别号",type:"text",validate:{required:true}},
            {col:"customsCode",label:"企业海关代码",type:"text",validate:{required:true}},
            {col:"supplierName",label:"供货商名称",type:"text",validate:{required:true}},
            {col:"supplierType",label:"企业类型",type:"text",validate:{required:true}},
/*            {col:"branch",label:"业务类型",type:"select",validate:{required:true},
                options:[
                    {
                        value:"1",text:"代理"
                    },
                    {
                        value:"2",text:"外贸及代理"
                    }
                ]
            },
            {col:"invoiceLimit",label:"发票额度",type:"select",
                options:[
                    {
                        value:"10000",text:"1万"
                    },
                    {
                        value:"100000",text:"10万"
                    },
                    {
                        value:"1000000",text:"100万"
                    },
                    {
                        value:"10000000",text:"1000万"
                    }
                ]
            },*/
            {col:"socialCreditCode",label:"社会信用代码",type:"text"},
            {col:"clrq",label:"成立日期",type:"date"},
            {col:"registrationAuthority",label:"登记机关",type:"text"},
            {col:"corporateRepresentative",label:"法人代表",type:"text"},
            {col:"insideCreditRating",label:"内部评估等级 ",type:"text"},
            {col:"payTaxesCreditRating",label:"纳税信用等级",type:"text"},
            {col:"zipCode",label:"邮编",type:"text",validate:{digits:true}},
            {col:"registeredCapital",label:"注册资本",type:"text"},
            {col:"deadline",label:"截止期限",type:"date"}/*,
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
            {col:"remarks",label:"备注",type:"textarea"}*/
        ]
    };
    var $container = null;
    console.log(branch);
    if(branch == '0'){
        $container = formGenerator(config_my);
        registerValidate("addInfoForm",config_my);
    }else{
        $container = formGenerator(config_dl)
        registerValidate("addInfoForm",config_dl);
    }

    //联系人
    var links = {
        container:'link',
        columns:[
            {col:"contacts",label:"联系人",type:"text"},
            {col:"telephone",label:"固定电话",type:"text"},
            {col:"phone",label:"手机",type:"text"},
            {col:"openBank",label:"开户行",type:"text"},
            {col:"bankAccount",label:"账户",type:"text"},
            {col:"registeredAddress",label:"注册地址",type:"textarea",rowNum:1,height:22},
            {col:"jyfw",label:"经营范围",type:"textarea", rowNum : 3},
            {col:"remarks",label:"备注",type:"text"}
        ]
    };
    //添加联系人
    formGenerator(links);

    if(serchParam.editflag=="detail"){
        $("#addInfoForm textarea").attr({"readonly":true,"disabled":"disabled"});
        $("#addInfoForm :input").attr({"readonly":true,"disabled":"disabled"});
        $("#addInfoForm :button,#addInfoForm .btn-file,#addInfoForm .searchBtn,.text-danger").css("display","none");
        $("#addInfoForm textarea").css("resize","none");

        $("#addInfoForm .file-caption-name").attr({'placeholder':''})
        $("#addInfoForm .kv-fileinput-caption").attr({'background':'#EFEEEC',"readonly":true,"disabled":"disabled"})
    }


    detail(parent.uuid);

    //修改后处理详情
    function detail(uid){
        // 请求详情
        $.ajax({
            type : "post",
            dataType : "json",
            url : "../../../../ghs/queryGhsForObject",
            data:{
                "ghsUuid":uid,
                "type":"detail",
            },
            success : function(result){
                $.each(result.data,function(k,v){
                    $('input[name="'+k+'"]').val(v);
                    $("select[name='"+k+"']").val(v);
                    $("textarea[name='"+k+"']").val(v);
                });
            }
        });
    }
});

