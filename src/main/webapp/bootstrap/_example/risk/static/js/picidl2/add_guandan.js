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
                type : "select",
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
    var $piciTable = $("#table");
    //表格标题项
    var columns = [ {
        checkbox : true
    }, {
        title : '关单号id',
        field : 'bgd',
        visible : false
    }, {
        title : '序号',
        align:'center',
        formatter : function(value,row,index){
            var page = $piciTable.bootstrapTable("getPage");
            var pageSize = page.pageSize,pageNumber = page.pageNumber;
            return page.pageSize*(page.pageNumber-1)+index+1;
        }
    }, {
        title : '关单号',
        field : 'bgdh',
        align : 'center',
        formatter : function(value,row,index){
	    	return lookInfoFormatter(value,row,index,18);
	    }
    }, {
        title : '出口日期',
        field : 'expTime'
    }, {
        title : '贸易方式',
        field : 'serviceType',
        formatter:function(el){
            return getDict('maoyifs',el);
        }
    }, {
        title : '出口口岸',
        field : 'exportPort',
        formatter:function(el){
            return getDict('exportPortName',el);
        }
    }, {
        title : '出口国别',
        field : 'arrivingCountry',
        formatter:function(el){
            return getDict('nation',el);
        }
    }, {
        title : '申报状态',
        field : 'sbzt',
        align:'center',
        formatter:function(value,row,index){
            return value=='1'?'可申报':'';
        }
    }
    ];
    $('#thSearchBtn').on("click",function(){
        queryData({url:"../../../../sbpcdl/findPageBgd",$container:$piciTable,columns,columns,height:360,
            queryParams : function(params){
                params = {
                    pageSize : params.pageSize,
                    pageNo : params.pageNumber,
                    sortName : params.sortName,
                    sortOrder : params.sortOrder
                };
                $.each($piciTable.closest("div.tableBox").prevAll("form:eq(0)").find(":input[name]"),function(i,e){
                    if($(e).val()){
                        params[$(e).attr("name")] = $(e).val();
                    }
                });
                return params;
            },
        });
    }).trigger("click");

    addTableHeaderOpration({
        container : "optionsBtn",
        btns : [
            {id: "save", content: "确定",className : "glyphicon glyphicon-export"}
        ]
    });



    //查看详情
    $(document).on("click",".lookInfo", function(){
        openLayer({
            ele:this,
            id : $(this).attr("key"),
            title : '<i class="glyphicon glyphicon-file" style="padding-right:3px;font-size:12px;"></i>报关单详情',
            url : "../../../pages/guandan/guandan/xiangqing.html"
        });
    });
    //第一步选择关单的“确定”按钮处理
    $("#save").on("click",function(e){
        var selectRows = $table.bootstrapTable('getSelections');
        var bgdIds = selectRows.map(function(item){return item.bgd;});
        //根据后台的返回结果判断是否含有消费税
        if (selectRows.length >= 1) {
                    var pgds = parent.$("#piciTable").bootstrapTable("getData").map(function(item){return item.bgd; });
                    //debugger;
                    for(var i=0;i<bgdIds.length;i++){
                        if($.inArray(bgdIds[i],pgds) == -1){
                            parent.$("#piciTable").bootstrapTable("append",selectRows[i]).bootstrapTable("uncheckAll");
                        }
                    }
                    parent.layer.close(parent.layer.getFrameIndex(window.name));//成功后关闭页面
                    //根据结果判断,如果有消费税显示退税否则不显示提示
                   // parent.$("#piciTabBox span.tuish").show(); //隐藏或显示

        } else {
            layer.msg("请至少选择一条关联关单!");
        }
    });
});

