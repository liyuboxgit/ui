var key = "bgd", bgdWithOneServiceType = true;
//var filterBgdIds = []; //要过滤的报关单id

$(function(){
    /////////////////////////////////////////////////////////////第一步中的处理开始/////////////////////////////////////////////////////////////
    //第一步中的关单
    var $piciTable = $("#piciTable");
    var columns = [ 
    	{
    		checkbox : true
	    }, 
	    {
	        title : "关单号id",
	        field : "bgd",
	        visible : false
	    }, 
	    {
            title : "序号",
            align:"center",
            formatter : function(value,row,index){
            	return index+1;
            }
	    }, 
	        {
	        title : "关单号",
	        field : "bgdh",
	        align : "center",
	        formatter : function(value,row,index){
		    	return lookInfoFormatter(value,row,index,18);
		    }
	    }, 
	    {
	        title : "出口日期",
	        field : "expTime"
	    }, {
	        title : "贸易方式",
	        field : "serviceType",
	        formatter:function(el){
	            return getDict("maoyifs",el);
	        }
	    }, 
	    {
	        title : "出口口岸",
	        field : "exportPort",
	        formatter:function(el){
	            return getDict("exportPortName",el);
	        }
	    }, 
	    
	    {
	        title : "申报状态",
	        field : "sbzt",
	        align:"center",
	        formatter:function(value,row,index){
	            return value=="1"?"可申报":"";
	        }
	    },
	    {
	        title : "是否含消费税",
	        field : "czxfs",
	        align:"center"
	    },
	    {
	        title : "出口发票号",
	        field : "ckfph",
	        formatter : function(value,row,index){
	            return '<input type="text" id="ckfph'+index+'" value=""/>';
	        }
	    }, 
	    {
	        title : "备注",
	        field : "lxbz",
	        formatter : function(value,row,index){
	            return '<input type="text" id="lxbz'+index+'" value=""/>';
	        }
	    }
    ];
    
    //出口发票号绑定改变事件
    $(document).on("keyup",":input[id^='ckfph']",function(e){
    	var ckfph = $(this).val();
    	var reg = /\W/ig;
    	if(reg.test(ckfph)){
    		$(this).val(ckfph.replace(reg,""));
    	}
    	processEvent(e);
    });
    
    queryData({data:{data:{thisPageElements:[]}},$container:$piciTable,columns:columns,height:360,uniqueId : "bgd"});
    
    //第一步选择关单
    $("#chooseGuandanBtn").on("click",function(e){
    	var selectRows = $piciTable.bootstrapTable("getData");
    	//filterBgdIds = selectRows.map(function(item){return item.bgdh; });
    	/*
        openLayer({
            ele:this,
            id : $(this).attr("key"),
            title : '<i class="glyphicon glyphicon-file" style="padding-right:3px;font-size:12px;"></i>选择关单',
            url : "../../../pages/tuishui/pici/pici_guandan.html"
        });
        */
    	openTab("选择关单","tuishui/pici/pici_guandan.html");
        processEvent(e);
    });
    //第一步删除按钮
    deleteHandler("deleteGuandanBtn","bgdh",$piciTable,function(data){
    	//debugger;
    	var flag = false;
    	for(var i=0;i<data.length;i++){
    		if(data[i].czxfs=="是" && !flag){
    			flag = true;
    		}
    	}
    	if(flag){
        	//根据结果判断,如果有消费税显示退税否则不显示提示
        	$("#piciTabBox span.tuish").show(); //隐藏或显示
    	}else{
    		$("#piciTabBox span.tuish").hide(); //隐藏或显示
    		$(":radio[type='radio'][value='0']").prop("checked", "checked");
    	}
    });
    
    //关单下一步
    $("#nextStep").on("click",function(e){
    	
    	var selectRows = $piciTable.bootstrapTable("getData");
        //校验报关单是否是同一中业务类型
    	//debugger;
        if(selectRows.length>0){
            var serviceTypes = selectRows.map(function(item,index,arr){
                return item.serviceType||"";
            });
            var _1 = serviceTypes[0];
            for(var i=1;i<serviceTypes.length;i++){
                if(_1 != serviceTypes[i]){
                    bgdWithOneServiceType = false;
                    layer.msg("您所选择的报关单必须是同一种业务类型！")
                    return;
                }
            }
        }else{
        	layer.msg("请选择关单！");
        	return;
        }
    	var bgdIds = selectRows.map(function(item){
    		return item.bgd;
    	});
    	//根据返回是否有敏感商品
    	
    	ajaxHelper("../../../../sbpcdl/checkSensitiveGoods",{bgd:bgdIds.join(",")},function(result){
    		
    		if(result.success){
    			var resIds = [];
    			if(result.data){
    				//if(result.data.indexOf(",")){
    					resIds = result.data.split(",");
    				//}
    				layer.confirm("您选择的关单中存在敏感商品,是否一起申报?选择否则去除含有敏感商品的关单！", {
    		            btn: ["是","否"] 
    		        }, function(index){
    		        	showHide(index);
    		        	tableListInit(bgdIds.join(",")); //第二部表格初始化
    		        }, function(index){
    		        	var arry = [];
    		        	for(var i=0;i<bgdIds.length;i++){
    		        		if($.inArray(bgdIds[i],resIds) == -1){
                				arry.push(bgdIds[i]);
                			}
    		        	}
    		        	showHide(index);
    		        	tableListInit(arry.join(","));//第二部表格初始化
    		        });
    			}else{
    				//debugger;
    				showHide(0);
    				tableListInit(bgdIds.join(",")); //第二部表格初始化
    			}
    			
    			function showHide(index){
    	    		var lis = $("#piciTitleBox").find("li");
    	    		lis.removeClass().hide().eq(1).addClass("active").show();
    	    		var tabs = $("#piciTabBox>div");
    	        	tabs.hide().eq(1).show();
    	        	$("#firstStep,#thirdStep").hide();
    	        	$("#secondStep").show();
    	        	layer.close(index);
    	    	}
    		}
    	});
    	processEvent(e);
    });
	/////////////////////////////////////////////////////////////第一步中的处理开始/////////////////////////////////////////////////////////////
    
    /////////////////////////////////////////////////////////////第二步中的处理开始/////////////////////////////////////////////////////////////
    var $tableList = $("#tableList");
    var tablelistColumn = [ 
    	{
    		checkbox : true,
    		class : "hide"
    	},
    	{
	        title : "关单号id",
	        field : "BGD",
	        visible : false
	    }, {
	        title : "关单号明细id",
	        field : "BGDMX",
	        visible : false
	    },{
	        title : "hgdmkid",
	        field : "hgdmk",
	        visible : false
	    }, 
	    {
	            title : "序号",
	            align:"center",
	            formatter : function(value,row,index){
	            	return index+1;
	            }
	    }, 
	    {
	        title : "关单号",
	        field : "BGDH",
	        align : "center",
	        formatter : function(value,row,index){
		    	return lookInfoFormatter(value,row,index,18);
		    }
	    }, 
	    {
	        title : "项号",
	        field : "NO_ORDER_NUMBER"
	    }, 
	    {
	        title : "商品代码",
	        field : "GOODS_CODE"
	    }, 
	    {
	        title : "已选择的商品代码",
	        field : "yxzCode"
	    }, 
	    {
	    	title : "已选择的商品名称",
	    	field : "unitName",
	    	class : "hide"
	    }, 
	    {
	        title : "商品名称",
	        field : "GOODS_NAME"
	    }, 
	    {
	        title : "操作",
	        align : "center",
	        formatter:function(value,row,index){
	        	return '<a href="javascript:void(0);" key="'+(row[key?key:"id"])+'" class="text-info ctrol"><i class="text-info fa fa-search"></i></a>';
	        }
	    }
    ];
    
    //第二步表格初始化
    function tableListInit(ids){
    	
    	ajaxHelper("../../../../sbpc/findBgdMxbyBgd",{bgd:ids},function(result){
    		var arr = [];
    		if(result.success && result.data && result.data.length>0){
    			arr = result.data
    		}
    		queryData({	
    			data: {data:{thisPageElements:arr}},
    			$container: $tableList,
    			columns:tablelistColumn,
    			pageSize:arr.length,
    			pagination:false,
    			height:360,
    			uniqueId : "BGDMX"
    		});
		});
    	
    }
    
    //tableListInit();
    
    //上一步处理
    $("#secondStep>button:eq(0)").on("click",function(e){
    	showHide();
    	function showHide(index){
    		var lis = $("#piciTitleBox").find("li");
    		lis.removeClass().hide().eq(0).addClass("active").show();
    		var tabs = $("#piciTabBox>div");
        	tabs.hide().eq(0).show();
        	$("#secondStep,#thirdStep").hide();
        	$("#firstStep").show();
    	}
    	processEvent(e);
    });
    //下一步处理
    $("#secondStep>button:eq(1)").on("click",function(e){
    	//debugger;
    	var selectRows = $tableList.bootstrapTable("getData");
    	for(var i=0;i<selectRows.length;i++){
    		if(!selectRows[i].yxzCode){
    			layer.msg("请选择商品编码！");
    			return;
    		}
    	}
    	//获取第一步的日期最大
    	var piciRows = $piciTable.bootstrapTable("getData");
    	//debugger;
    	var maxDate = piciRows[0].expTime;
    	var date = (new Date(maxDate)).getTime();
    	for(var i=0;i<piciRows.length;i++){
    		if(date<(new Date(piciRows[i].expTime)).getTime()){
    			maxDate=piciRows[i].expTime;
    		}
    	}
    	maxDate=maxDate.replace("-","").substr(0,6);
    	$("#addInfoForm :input[name='ssq']").val(maxDate);
    	getqsglh();
    	
    	showHide();
    	function showHide(index){
    		var lis = $("#piciTitleBox").find("li");
    		lis.removeClass().hide().eq(2).addClass("active").show();
    		var tabs = $("#piciTabBox>div");
        	tabs.hide().eq(2).show();
        	$("#firstStep,#secondStep").hide();
        	$("#thirdStep").show();
    	}
    	//根据业务类型提示信息
    	var bgd = piciRows.map(function (item) { return item.bgd; }).join(",");
    	ajaxHelper(
    		"../../../../sbpc/QueryServiceType",
    		{"bgd":bgd},
    		function(result){
    			if (result.success) {
                    if (result.data.ServiceName != "") {
                    	var ywlxTipHtml =  '<p style="position:absolute;left: 5px;top: -13px;white-space: nowrap;font-size: 10px;">&nbsp;<span style="color:red">'+(result.data.ServiceName || "")+'</span></p>';
                    	$("#buyer>.form-group:eq(4)>div").prepend(ywlxTipHtml)
                    }
                }
    		}
    	);
    	processEvent(e);
    });
    //放大镜操作处理
    $(document).on("click",".ctrol", function(e){
    	/*
        openLayer({
            title : '<i class="glyphicon glyphicon-file" style="padding-right:3px;font-size:12px;"></i>选择商品代码',
            url : "../../../pages/tuishui/pici/pici_savelist.html"
        });
        */
    	openTab("选择商品代码","tuishui/pici/pici_savelist.html");
        processEvent(e);
	});
    /////////////////////////////////////////////////////////////第二步中的处理结束/////////////////////////////////////////////////////////////
    
    /////////////////////////////////////////////////////////////第三步中的处理开始/////////////////////////////////////////////////////////////
    var buyer = {
        container:"buyer",
        columns:[
            {col:"ssq",label:"所属期",type:"text",validate:{required:true},sm:3},
            {col:"sbpch",label:"批次号",type:"text",validate:{required:true},sm:3},
            {col:"qsglh2",label:"起始关联号",type:"creatpici",validate:{required:true},sm:3},
            {col:"qsglh",label:"起始关联号",type:"hidden"},
            {col:"ywlxa",label:"业务类型",type:"select",options:getDicts("serviceType"),multiple:true,sm:3},
            {col:"ywlx",label:"业务类型",type:"hidden"},
            {col:"pcbz",label:"备注",type:"textarea",rowNum : 4,sm:3}
        ]
    };

    formGenerator(buyer,"single");

    //验证表单
    registerValidate("addInfoForm",buyer);
    
    var thiredButtons = $("#thirdStep").find("button");
    //上一步按钮事件
    thiredButtons.eq(0).on("click",function(e){
    	showHide();
    	function showHide(index){
    		var lis = $("#piciTitleBox").find("li");
    		lis.removeClass().hide().eq(1).addClass("active").show();
    		var tabs = $("#piciTabBox>div");
        	tabs.hide().eq(1).show();
        	$("#firstStep,#thirdStep").hide();
        	$("#secondStep").show();
    	}
    	processEvent(e);
    });
    
    //保存
    $("#oksave").on("click",function(e){
    	var radio=$("input:radio:checked").val();
    	if($("#addInfoForm").valid()){
    		var ywlx = $("#buyer").find(":input[name='ywlxa']").val();
    		$("#buyer").find(":input[name='ywlx']").val(ywlx ? ywlx.join(",") : "");
    		var qsglh = $("#buyer").find(".form-group:eq(2)").find("input:eq(0)").val()+""+$("#buyer").find(".form-group:eq(2)").find("input:eq(1)").val();
    		$("#buyer").find(":input[name='qsglh']").val(qsglh);
    		var piciListData = $piciTable.bootstrapTable("getData");
    		for(var i=0; i<piciListData.length; i++){
    			piciListData[i].ckfph = $piciTable.find("#ckfph"+i).val();
    			piciListData[i].lxbz = $piciTable.find("#lxbz"+i).val();
    		}
    		var tableListData = $tableList.bootstrapTable("getData");
    		var formData = $("#addInfoForm").serializeJSON();
    		
    		var data = {
				piciListData : JSON.stringify(piciListData),
				tableListData: JSON.stringify(tableListData),
    			formData : JSON.stringify(formData),
    			radioDate : radio
    		};
    		
    		ajaxHelper("../../../../sbpc/insertShenBaoPiCi",data,function(result){
    			 if(result.success){
                     parentTabWindow.layer.msg("添加成功！");
                 }else{
                     parentTabWindow.layer.msg(result.msg);
                 }
    			 //parentTabWindow.layer.close(parentTabWindow.layer.getFrameIndex(window.name));//成功后关闭页面
    			 //parentTabWindow.refreshTable(); //刷新页面
    			 finishCallback();
    		});
    	}
    	processEvent(e);
    });
    
    /////////////////////////////////////////////////////////////第三步中的处理结束/////////////////////////////////////////////////////////////
    
    //查看详情
    $(document).on("click",".lookInfo", function(e){
        openLayer({
            ele:this,
            id : $(this).attr("key"),
            title : '<i class="glyphicon glyphicon-file" style="padding-right:3px;font-size:12px;"></i>报关单详情',
            url : "../../../pages/guandan/guandan/xiangqing.html"
        });
        processEvent(e);
    });
	
   
    
    $(":input[name='ssq']:eq(0)").on({
        focus:function (e) {
            WdatePicker({
                dateFmt: "yyyyMM",
                onpicked: function (dp) {
                    /*console.log(1);*/
                    //console.log($(this).val());
                    getqsglh();
                }
            });
            processEvent(e);
        }
    });

    /**
     * 校验起始关联号01-99
     */
    $(":input[name='sbpch']:eq(0)").on("change",function (e) {
        var sbpch = $(this).val();
        var regpc = /^[0-9]{2}$/;
        if(!regpc.test(sbpch) || sbpch === "00"){
            layer.msg("只能01-99输入两位数字");
            $(this).val("");
            $(":input[name='qsglh']:eq(1)").val("");
            return false;
        }
		processEvent(e);
    });
    
  //初始化将业务类型设置为多选
    $('select[name="ywlxa"]').multipleSelect({
    	selectAll:false,
    	minimumCountSelected : 6,
    	countSelected : "当前&nbsp;<span style='color:red'>#</span>&nbsp;项,&nbsp;&nbsp;共&nbsp%&nbsp;项!"
    }).css({"display":"block","height":"0","opacity":"0"});
    
});

/**
 * 获取起始关联号
 * @param sbpch 申报批次号
 * @param ssq 所属期
 */
function getqsglh(){
    var ssq = $(":input[name='ssq']:eq(0)").val();
    if( ssq != ""){
    	/*
        $.ajax({
            url : "../../../../sbpc/querySbpcGlh",
            type : "get",
            data : {"ssq":ssq},
            success : function(result){
                $(":input[name='qsglh2']:eq(0)").val(ssq);
                var max = result.data.qsglh.length;
                var qsglh = result.data.qsglh.substring((max-4),max);
                $(":input[name='sbpch']:eq(0)").val( result.data.sbpch);
              	//$(":input[name='qsglh2']:eq(1)").val(qsglh);
                $(":input[name='qsglh2']:eq(1)").val("0001");
            }
        });
        */
    	ajaxHelper(
    		"../../../../sbpc/querySbpcGlh",
    		{"ssq":ssq},
    		function(result){
    			if(result.data){
	                $(":input[name='qsglh2']:eq(0)").val(ssq);
	                var max = result.data.qsglh.length;
	                var qsglh = result.data.qsglh.substring((max-4),max);
	                $(":input[name='sbpch']:eq(0)").val( result.data.sbpch);
	              	//$(":input[name='qsglh2']:eq(1)").val(qsglh);
	                $(":input[name='qsglh2']:eq(1)").val("0001");
    			}else{
    				layer.msg(result.msg);
    			}
            }
    	);
    }
}