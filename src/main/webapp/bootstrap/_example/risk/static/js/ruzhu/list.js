var key = "uuid";
var uuid = "";
var examineStatus = "";
var branch = '0';
var oldContractCode = "";
var columns = [ 
	{
		field : 'select',
		align:'center',
		checkbox : true
	},
	{
        field : 'uuid',
        align:'center',
        visible : false
	},
	{
		title : '序号',
		align:'center',
		formatter : function(value,row,index){ 
			var page = $table.bootstrapTable("getPage");
			var pageSize = page.pageSize,pageNumber = page.pageNumber;
			return page.pageSize*(page.pageNumber-1)+index+1;
		}
	},
	{
		title : '供货商名称',
		field : 'supplierName',
		align:'left',
		formatter : lookInfoFormatter
	}, 
	{
		title : '纳税人识别号',
		align:'left',
		field : 'nsrsbh'
	}, 
	{
		title : '企业类型',
		align:'center',
		field : 'supplierType'
//		formatter : getDict("ywlx",'supplierType')
	},
    {
        title : '业务类型',
        align:'center',
        field : 'branch',
		formatter : function examineStatusFormatter(value,row,index){
			if(value == '0'){
				return "自营";
			}else if(value == '1'){
				return "代办";
			}else if(value == '2'){
				return "自营及代办";
			}else{
				return "";
			}
        }
    },
    {
		title : '纳税信用等级',
		align:'center',
		field : 'payTaxesCreditRating'
	}, 
	{
		title : '内部评估等级',
		align:'center',
		field : 'insideCreditRating'
	}, 
	{
		title : '风险评估等级',
		align:'center',
		field : 'taxCreditRating'
	}, 
	{
		title : '审核状态',
		field : 'examineStatus',
		align:'center',
		formatter : examineStatusFormatter
	}
];

$(function(){
	//初始化查询
	if(typeof(serchParam.branch) != "undefined"){
        branch = serchParam.branch;
	}

	formGenerator({
		container :  "advSearchBox",
		columns : [
			{
				col : "nsrsbh",
				type : "text",
				label : "纳税人识别号",
			},
			{
				col : "supplierName",
				type : "text",
				label : "供货商名称",
			},
			{
				col : "supplierType",
				label : "企业类型",
				type : "select",
				options:getDictsExt("qylx")
			},
            {
                col : "examineStatus",
                label : "审核状态",
                type : "select",
                options  : [
                    {text : "请选择", value : ""},
                    {text : "已通过", value : "2"},
                    {text : "未通过", value : "1"},
                    {text : "未审核", value : "0"}
                ]
            },
           /* {
                col : "branch",
                label : "业务标志",
                type : "select",
                visible : false,
                options:[
                    {
                        value:"",text:"请选择"
                    },
                    {
                        value:"0",text:"外贸"
                    },
                    {
                        value:"1",text:"代理"
                    },
                    {
                        value:"2",text:"外贸及代理"
                    }
                ]
            },*/
			{
				col : "payTaxesCreditRating",
				label : "纳税信用等级",
				type : "select",
				options:getDictsExt("nsxydj")
			},
			{
				col : "insideCreditRating",
				label : "内部评估等级",
				type : "select",
				options:getDictsExt("nbpgdj")
			}/*,{
                col : "taxCreditRating",
                label : "风险评估等级",
                type : "select",
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
            }*/
		]
	},"query");
	setselect2("select[name='supplierType']");
	
	
	
    // $('select[name="branch"]').val(branch);
	//初始表头按钮
    addTableHeaderOpration({
        container : "optionsBtn",
        btns : [
            {id: "import", content: "导入",className : "glyphicon glyphicon-import"},
            {id: "add", content: "添加",className : "glyphicon glyphicon-plus"},
            {id: "update", content: "修改",className : "glyphicon glyphicon-pencil"},
			//{id: "delete", content: "删除",className : "glyphicon glyphicon-trash"},
            // {id: "shenhe", content: "审核",className : "glyphicon glyphicon-pawn"}
        ]
    });
	
	//查询
	$("#thSearchBtn").on("click",function(){
		queryData("../../../ghs/queryForList?branch="+branch);
	}).trigger("click");

	//导入
	$("#import").on("click", function(){
		openLayer({ele:this,title:'<i class="glyphicon glyphicon-import" style="padding-right:3px;font-size:12px;"></i>导入文件',area:[ "60%", "60%" ],url:"../../pages/ruzhu/import.html?branch="+branch});
	});

	//添加
	$("#add").on("click", function(){
        oldContractCode = "";
		openLayer({
			ele:this,
			title : '<i class="glyphicon glyphicon-plus" style="padding-right:3px;font-size:12px;"></i>添加供货商',
			url : "../../pages/ruzhu/add.html?branch="+branch,
		});
	});

	//修改
	$("#update").on("click",function(){
		var selectRows = $table.bootstrapTable('getSelections');
		params = selectRows[0];
		if (selectRows.length === 1) {
            if (selectRows[0].examineStatus != 2) {//审核通过状态2
                oldContractCode = params.nsrsbh;
                layer.open({
                    type: 2,
                    skin: 'myLayui', // 样式类名
                    title: '<i class="glyphicon glyphicon-pencil" style="padding-right:3px;font-size:12px;"></i>修改供货商信息【供货商名称：<font color="red">' + selectRows[0].supplierName + '</font>】',
                    area: ["98%", "96%"],
                    content: "../../pages/ruzhu/add.html?branch="+branch+"&editflag=edit&tempTime="+new Date().getTime(),
                    success: function (layero, index) {
                        //var currentFrame = layero.find("iframe")[0].contentWindow.document;
						/*$.ajax({
						 url:'../../../ghs/queryGhsForObject',
						 type:'GET',
						 dataType:'json',
						 data:{
						 "ghsUuid":selectRows[0].uuid,
						 "type":"update",
						 },
						 success:function(result){

						 $("#addInfoForm input[name='uuid']",currentFrame).val(selectRows[0].uuid);
						 setFormData('addInfoForm',currentFrame,result.data);
						 a = result.data.gongHuoShangShiQianHeCha.ghssqhc;
						 $("#ghssqhc",currentFrame).val(a);

						 if(result.data.gongHuoShangShiQianHeCha){
						 $.each(result.data.gongHuoShangShiQianHeCha,function(f,n){
						 $("#check select[name='"+f+"']",currentFrame).val(n);
						 $("#check textarea[name='"+f+"']",currentFrame).val(n);
						 });
						 }

						 }
						 })*/
                    }
                });
            }else {
                layer.msg("该条数据已经审核通过，无法继续修改！");
			}
		} else {
			layer.msg("请选择一条数据进行编辑!");
		}
	});

	//删除
	$("#delete").on("click", function(){
        var selectRows = $table.bootstrapTable('getSelections');
        if(selectRows.length<1){
            layer.msg("请选择至少一条数据进行删除!");
        }else {
            layer.confirm('确定要删除吗?', {
                btn : [ "确定" ]
            }, function() {
                var selectRows = $table.bootstrapTable('getSelections');
                selectRows = selectRows.map(function(item) {
                    return item.uuid;
                });
                var keys = selectRows.join(",");
                // console.info(keys);
                $.ajax({
                    url:'../../../ghs/delGhs',
                    type:'post',
                    dataType:'json',
                    data:{
                        "uuids":keys
                    },
                    success:function(result){
                        $table.bootstrapTable("refresh",{pageNumber:1});
                        layer.msg('删除成功!');
                    }
                })
            });
        }
	});

	// 审核
	$("#shenhe").on("click",function(){
		var selectRows = $table.bootstrapTable('getSelections');
		if (selectRows.length == 1) {
            uuid = selectRows[0].uuid;
            examineStatus = selectRows[0].examineStatus;
			layer.open({
				type : 2,
				skin : 'myLayui', // 样式类名
				title : '<i class="glyphicon glyphicon-pawn" style="padding-right:3px;font-size:12px;"></i>供货商审核【供货商名称：<font color="red">'+selectRows[0].supplierName+'</font>】',
                area :  [ "60%", "90%" ],
				content : "../../pages/ruzhu/shenhe.html?tempTime="+new Date().getTime()
				/*,
				success : function(layero, index) {
				   var currentFrame = layero.find("iframe")[0].contentWindow.document;
				   $("#uuid",currentFrame).val(keys);
				}*/
			});
		} else {
			layer.msg("请选择一条数据进行审核!");
		}
	});

	//查看详情
	$(document).on("click", ".lookInfo", function() {
		//var title = popupPreHandler(this,3);
		/*var title = $(this).attr("title");
		openLayer({
			ele:this,
			id : $(this).attr("key"),
			title : '<i class="glyphicon glyphicon-file" style="padding-right:3px;font-size:12px;"></i>供货商信息【<font color="red">'+title+'</font>】',
			url : "../../pages/ruzhu/detail.html"
		});*/
        layer.open({
            type : 2,
            skin : 'myLayui', // 样式类名
            title : '<i class="glyphicon glyphicon-pencil" style="padding-right:3px;font-size:12px;"></i>查看供货商信息【供货商名称：<font color="red">'+params.supplierName+'</font>】',
            area : [ "98%", "96%" ],
            content : "../../pages/ruzhu/add.html?editflag=detail&branch="+branch+"&tempTime="+new Date().getTime(),
            success : function(layero, index) {
                //var currentFrame = layero.find("iframe")[0].contentWindow.document;
                /*$.ajax({
                    url:'../../../ghs/queryGhsForObject',
                    type:'GET',
                    dataType:'json',
                    data:{
                        "ghsUuid":params.uuid,
                        "type":"update",
                    },
                    success:function(result){

                        $("#addInfoForm input[name='uuid']",currentFrame).val(params.uuid);
                        setFormData('addInfoForm',currentFrame,result.data);
                        // var a = result.data.gongHuoShangShiQianHeCha.ghssqhc;
                        // $("#ghssqhc",currentFrame).val(a);

                        if(result.data.gongHuoShangShiQianHeCha){
                            $.each(result.data.gongHuoShangShiQianHeCha,function(f,n){
                                $("#check select[name='"+f+"']",currentFrame).val(n);
                                $("#check textarea[name='"+f+"']",currentFrame).val(n);
                            });
                        }

                    }
                })*/
            }
        });
	});
});

function examineStatusFormatter(value,row,index){
    var title = "",className = "";
    switch(value){
        case "1":
            title = "审核未通过";
            className = "fa-times-circle text-danger";
            break;
        case "2":
            title = "审核已通过";
            className = "fa-check-circle-o text-success";
            break;
        default:
            title = "未审核";
            className = "fa-question-circle-o text-warning";
            break;
    }
    return '<a href="javascript:;"><span onclick="shenhe(\''+row.uuid+'\',\''+row.supplierName+'\',\''+row.examineStatus+'\')"><i title="'+title+'" class="fa '+className+'"></i></span></a>';
}

function shenhe(uuid,supplierName,examineStatus){
    openLayer({
        id : uuid,
        ele:this,
        
        title : '<i class="glyphicon glyphicon-plus" style="padding-right:3px;font-size:12px;"></i>供货商审核【供货商：<font color="red">'+supplierName+'</font>】',
        area :  [ "60%", "90%" ],
        url : "../../pages/ruzhu/shenhe.html?examineStatus="+examineStatus+"&uuid="+uuid,
    });
}