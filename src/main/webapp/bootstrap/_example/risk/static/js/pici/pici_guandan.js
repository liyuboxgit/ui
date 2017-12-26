var key = "bgd", bgdWithOneServiceType = true;
$(function(){
    formGenerator({
        container :  "advSearchBox",
        columns : [
            {
                col : "bgdh",
                type : "text",
                label : "关单号"
            },
            {
                col : "serviceType",
                label : "贸易方式",
                type : "ComplexSelect",
                width : 100,
				comboWidth:340,
                options : getDictsExt("maoyifs")
            },
            {
                col : "expTime",
                label : "出口日期",
                type : "startEndDate",
                dates  : [
                    {name : "expTimeStart", text : "开始日期"},
                    {name : "expTimeEnd", text : "结束日期"}
                ]
            }
        ]
    },"query");
    
	/*
    var buyer = {
        container:"buyer",
        columns:[
            {col:"ssq",label:"所属期",type:"text",validate:{required:true}},
            {col:"sbpch",label:"批次号",type:"text",validate:{required:true}},
            {col:"qsglh",label:"起始关联号",type:"creatpici",validate:{required:true}},
            {col:"ywlx",label:"业务信息",type:"select",options:getDicts("serviceType"),validate:{required:true},multiple:true},
            {col:"pcbz",label:"备注",type:"textarea"}
        ]
    };
    
    formGenerator(buyer,"single");

    //验证表单
    registerValidate("addInfoForm",buyer);
    */
    
    var $piciTable = $("#table");
  //表格标题项
  var columns = [ 
	  {
		  checkbox : true
	  }, {
	      title : "关单号id",
	      field : "bgd",
	      visible : false
	  }, {
	          title : "序号",
	          align:"center",
	          formatter : function(value,row,index){
	              var page = $piciTable.bootstrapTable("getPage");
	              var pageSize = page.pageSize,pageNumber = page.pageNumber;
	              return page.pageSize*(page.pageNumber-1)+index+1;
	          }
	      }, {
	      title : "关单号",
	      field : "bgdh",
	      align : "center",
	      formatter : function(value,row,index){
	    	  return lookInfoFormatter(value,row,index,18);
	      }
	  }, {
	      title : "出口日期",
	      field : "expTime"
	  }, {
	      title : "贸易方式",
	      field : "serviceType",
	      formatter:function(el){
	          return getDict("maoyifs",el);
	      }
	  }, {
	      title : "出口口岸",
	      field : "exportPort",
	      formatter:function(el){
	          return getDict("exportPortName",el);
	      }
	  }, {
	      title : "出口国别",
	      field : "arrivingCountry",
	      formatter:function(el){
	          return getDict("nation",el);
	      }
	  }, {
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
	      align:"center",
	      class:"hide"
	  }
  ];
  
  //查询按钮
  $("#thSearchBtn").on("click",function(e){
	  queryData({url:"../../../../sbpc/findPageBgd",$container:$piciTable,columns:columns,
		  queryParams : function(params){
				params = {
					pageSize : params.pageSize,
					pageNo : params.pageNumber,
					sortName : params.sortName,
					sortOrder : params.sortOrder 
				};
				//alert($("#thSearchForm").find(":input[name]").length);
				$.each($piciTable.closest("div.tableBox").prevAll("form:eq(0)").find(":input[name]"),function(i,e){
					if($(e).val()){
						params[$(e).attr("name")] = $(e).val();
					}
				});
				return params;
			}
	  });
	  processEvent(e);
  }).trigger("click");
    
    addTableHeaderOpration({
        container : "optionsBtn",
        btns : [
            {id: "save", content: "确定",className : "glyphicon glyphicon-export"}
        ]
    });
    
    //查看详情
    $(document).on("click",".lookInfo", function(e){
        //openLayer({id : $(this).attr("key"),title : '<i class="glyphicon glyphicon-file" style="padding-right:3px;font-size:12px;"></i>报关单详情',url : "../../../pages/guandan/guandan/xiangqing.html"});//弹框模式
    	//openTab("报关单详情","guandan/guandan/xiangqing.html");//Tab模式
        window.open("../../../pages/guandan/guandan/xiangqing.html?uuid="+$(this).attr("key"),"newwindow");//新开浏览器窗口模式
        processEvent(e);
    });
    /*
    $(":input[name='ssq']:eq(0)").on({
        focus:function () {
            WdatePicker({
                dateFmt: 'yyyyMM',
                onpicked: function (dp) {
                    console.log(1);
                    console.log($(this).val());
                    getqsglh();
                }
            });
        }
    })
    */
    /**
     * 校验起始关联号01-99
     */
    /*
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
    })
    */
    //第一步选择关单的“确定”按钮处理
    $("#save").on("click",function(e){
        var selectRows = $table.bootstrapTable("getSelections");
        var bgdIds = selectRows.map(function(item){return item.bgd;});
        //根据后台的返回结果判断是否含有消费税
        if (selectRows.length >= 1) {
        	ajaxHelper("../../../../sbpc/checkXfs",{bgd:bgdIds.join(",")},function(result){
            	if(result.success && result.data && result.data.length>0){
            		var pgds = parentTabWindow.$("#piciTable").bootstrapTable("getData").map(function(item){return item.bgd; });
            		//debugger;
            		for(var i=0;i<bgdIds.length;i++){
            			if($.inArray(bgdIds[i],pgds) == -1){
            				parentTabWindow.$("#piciTable").bootstrapTable("append",selectRows[i]).bootstrapTable("uncheckAll");
            			}
            		}
            		for(var i=0;i<selectRows.length;i++){
            			parentTabWindow.$("#piciTable").bootstrapTable("updateByUniqueId",{
            				id : result.data[i].BGD,
                    		row : {
                    			czxfs : result.data[i].CZXFS
                    		}
            			});
            		}
                	//parentTabWindow.layer.close(parentTabWindow.layer.getFrameIndex(window.name));//成功后关闭页面
                	finishCallback();
                	var arrayBgd=parentTabWindow.$("#piciTable").bootstrapTable("getData");
                	for(var j=0;j<arrayBgd.length; j++){
                		if(arrayBgd[j].czxfs=="是"){
                			parentTabWindow.$("#piciTabBox span.tuish").show(); //显示
                			parentTabWindow.$(":radio[type='radio'][value='V']").prop("checked", "checked");
                			break;
                		}
                	}
            	}
            });
        } else {
            layer.msg("请至少选择一条关联关单!");
        }
        processEvent(e);
    });
});

/**
 * 获取起始关联号
 * @param sbpch 申报批次号
 * @param ssq 所属期
 */
/*
function getqsglh(){
    var ssq = $(":input[name='ssq']:eq(0)").val();
    if( ssq != ""){
        $.ajax({
            url : "../../../../sbpcdl/querySbpcGlh",
            type : "get",
            data : {"ssq":ssq},
            success : function(result){
                $(":input[name='qsglh']:eq(0)").val(ssq);
                var max = result.data.qsglh.length;

                var qsglh = result.data.qsglh.substring((max-4),max);
                $(":input[name='sbpch']:eq(0)").val( result.data.sbpch);
                $(":input[name='qsglh']:eq(1)").val(qsglh);
            }
        })
    }
}
*/
/*
$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
    if(e.target.hash=='#link'){
        var selectRows = $('#table').bootstrapTable('getSelections');
        //校验报关单是否是同一中业务类型
        if(selectRows.length>0){
            var serviceTypes = selectRows.map(function(item,index,arr){
                return item.serviceType||"";
            });
            var _1 = serviceTypes[0];
            for(var i=1;i<serviceTypes.length;i++){
                if(_1 != serviceTypes[i]){
                    bgdWithOneServiceType = false;
                    layer.msg("您所选择的报关单不是同一种业务类型，不能创建批次！")
                    return;
                }
            }
        }

        if(selectRows.length>0){
            var expTimes = selectRows.map(function(item,index,arr){
                return item.expTime||"";
            });

            var max = expTimes[0];
            for(var i=1;i<expTimes.length;i++){
                if(expTimes[i] && expTimes[i]>max)
                    max = expTimes[i];
            }

            if(max.length==10){
                var ssq = max.substring(0,7).replace('-','');
                $('input[name="ssq"]').eq(0).val(ssq);
                //后台获取起始关联号和批次号，并赋值
                getqsglh();
            }
            //初始化业务类型提示
            var bgds= $("#table").bootstrapTable('getData').map(function(item){return item.bgd;}).join(",");
            $.ajax({
                url : "../../../../sbpcdl/QueryServiceType",
                data : {"bgd":bgds},
                type : "POST",
                dataType : "json",
                success : function (result) {
                    if(result.success){
                        if(result.data.ServiceName!=""){
                            layer.msg(result.data.ServiceName);
                        }
                    }else{
                        layer.msg(result.msg);
                    }
                },
            });

        }
    };
    //初始化将业务类型设置为多选
    $('select[name="ywlx"]').change(function() {
    	
    }).multipleSelect({
    	selectAll:false
    });
})
*/