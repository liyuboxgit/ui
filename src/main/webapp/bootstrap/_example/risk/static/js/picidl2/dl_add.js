var key = "bgd", bgdWithOneServiceType = true;

var filterBgdIds = []; //要过滤的报关单id
$(function () {
    /////////////////////////////////////////////////////////////第一步中的处理开始/////////////////////////////////////////////////////////////
    //第一步中的关单
    var $piciTable = $("#piciTable");
    var columns = [
        {
            checkbox: true
        },
        {
            title: '关单号id',
            field: 'bgd',
            visible: false
        },
        {
            title: '序号',
            align: 'center',
            formatter: function (value, row, index) {
                return index + 1;
            }
        },
        {
            title: '关单号',
            field: 'bgdh',
            align : 'center',
            formatter : function(value,row,index){
  	    	  return lookInfoFormatter(value,row,index,18);
  	      	}
        },
        {
            title: '出口日期',
            field: 'expTime'
        }, {
            title: '贸易方式',
            field: 'serviceType',
            formatter: function (el) {
                return getDict('maoyifs', el);
            }
        },
        {
            title: '出口口岸',
            field: 'exportPort',
            formatter: function (el) {
                return getDict('exportPortName', el);
            }
        },

        {
            title: '申报状态',
            field: 'sbzt',
            align: 'center',
            formatter: function (value, row, index) {
                return value == '1' ? '可申报' : '';
            }
        },
        {
            title: '出口发票号',
            field: 'ckfph',
            formatter: function (value, row, index) {
                return '<input type="text"  id="ckfph' + index + '" value=""/>';
            }
        },
        {
            title: '备注',
            field: 'lxbz',
            formatter: function (value, row, index) {
                return '<input type="text"  id="lxbz' + index + '" value=""/>';
            }
        }
    ];
    queryData({
        data: {data: {thisPageElements: [],}},
        $container: $piciTable,
        columns,
        columns,
        height: 360,
        uniqueId: "bgd"
    });
    //第一步选择关单
    $("#chooseGuandanBtn").on("click", function (e) {
        var selectRows = $piciTable.bootstrapTable("getData");
        filterBgdIds = selectRows.map(function (item) {
            return item.bgdh;
        });
        openLayer({
            ele: this,
            id: $(this).attr("key"),
            title: '<i class="glyphicon glyphicon-file" style="padding-right:3px;font-size:12px;"></i>选择关单',
            url: "../../../pages/tuishui/picidl2/add_guandan.html"
        });
    });
    //第一步删除按钮
    deleteHandler("deleteGuandanBtn", "bgdh", $piciTable);
    //关单下一步
    $("#nextStep").on("click", function () {
        var selectRows = $piciTable.bootstrapTable('getData');
        //校验报关单是否是同一中业务类型
        if (selectRows.length > 0) {
            var serviceTypes = selectRows.map(function (item, index, arr) {
                return item.serviceType || "";
            });
            var _1 = serviceTypes[0];
            for (var i = 1; i < serviceTypes.length; i++) {
                if (_1 != serviceTypes[i]) {
                    bgdWithOneServiceType = false;
                    layer.msg("您所选择的报关单必须是同一种业务类型！")
                    return;
                }
            }
        }else{
        	layer.msg("请选择关单！");
        	return;
        }
        var bgdIds = selectRows.map(function (item) {
            return item.bgd;
        });
        //根据返回是否有敏感商品
        ajaxHelper("../../../../sbpcdl/checkSensitiveGoods", {bgd: bgdIds.join(",")}, function (result) {
            if (result.success) {
                var resIds = [];
                if (result.data) {
                    resIds = result.data.split(",");
                    layer.confirm('您选择的关单中存在敏感商品,是否一起申报?选择否则去除含有敏感商品的关单！', {
                        btn: ['是', '否']
                    }, function (index) {
                        showHide(index);
                        tableListInit(bgdIds.join(",")); //第二部表格初始化
                    }, function (index) {
                        var arry = [];
                        for (var i = 0; i < bgdIds.length; i++) {
                            if ($.inArray(bgdIds[i], resIds) == -1) {
                                arry.push(bgdIds[i]);
                            }
                        }
                        showHide(index);
                        tableListInit(arry.join(","));//第二部表格初始化
                    });
                } else {
                    //debugger;
                    showHide(0);
                    tableListInit(bgdIds.join(",")); //第二部表格初始化
                }
                function showHide(index) {
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
    });
    /////////////////////////////////////////////////////////////第一步中的处理开始/////////////////////////////////////////////////////////////

    /////////////////////////////////////////////////////////////第二步中的处理开始/////////////////////////////////////////////////////////////
    var $tableList = $("#tableList");
    var tablelistColumn = [
        {
            checkbox: true,
            class: "hide"
        },
        {
            title: '关单号id',
            field: 'BGD',
            visible: false
        },
        {
            title: '美元离岸价',
            field: 'FOB',
            visible: false
        }, {
            title: '关单号明细id',
            field: 'BGDMX',
            visible: false
        }, {
            title: 'hgdmkid',
            field: 'hgdmk',
            visible: false
        },
        {
            title: '序号',
            align: 'center',
            formatter: function (value, row, index) {
                return index + 1;
            }
        },
        {
            title: '关单号',
            field: 'BGDH',
            align : 'center',
            formatter : function(value,row,index){
	    	  return lookInfoFormatter(value,row,index,18);
	      	}
        },
        {
            title: '项号',
            field: 'NO_ORDER_NUMBER'
        },
        {
            title: '商品代码',
            field: 'GOODS_CODE'
        },
        {
            title: '已选择的商品代码',
            field: 'yxzCode'
        },
        {
            title: '商品名称',
            field: 'GOODS_NAME'
        },
        {
            title: '操作',
            align: "center",
            formatter: function (value, row, index) {
                return '<a href="javascript:void(0);" key="' + (row[key ? key : "id"]) + '" class="text-info ctrol"><i class="text-info fa fa-search"></i></a>';
            }
        }
    ];
    //第二步表格初始化
    function tableListInit(ids) {
        ajaxHelper("../../../../sbpc/findBgdMxbyBgd", {bgd: ids}, function (result) {
            var arr = [];
            if (result.success && result.data && result.data.length > 0) {
                arr = result.data
            }
            queryData({
                data: {data: {thisPageElements: arr}},
                $container: $tableList,
                columns: tablelistColumn,
                pageSize: arr.length,
                pagination: false,
                height: 360,
                uniqueId: "BGDMX"
            });
        });
    }
    //上一步处理
    $("#secondStep>button:eq(0)").on("click", function () {
        showHide();
        function showHide(index) {
            var lis = $("#piciTitleBox").find("li");
            lis.removeClass().hide().eq(0).addClass("active").show();
            var tabs = $("#piciTabBox>div");
            tabs.hide().eq(0).show();
            $("#secondStep,#thirdStep").hide();
            $("#firstStep").show();
        }
    });
    //下一步处理
    $("#secondStep>button:eq(1)").on("click", function () {
//    	debugger;
        var selectRows = $tableList.bootstrapTable("getData");
        for (var i = 0; i < selectRows.length; i++) {
            if (!selectRows[i].yxzCode) {
                layer.msg("请选择商品编码！");
                return;
            }
        }
        //获取第一步的日期最大
        var piciRows = $piciTable.bootstrapTable("getData");
        var maxDate = piciRows[0].expTime;
        var date = (new Date(maxDate)).getTime();
        for (var i = 0; i < piciRows.length; i++) {
            if (date < (new Date(piciRows[i].expTime)).getTime()) {
                maxDate = piciRows[i].expTime;
            }
        }
        maxDate = maxDate.replace("-", "").substr(0, 6);
        $("#addInfoForm :input[name='ssq']").val(maxDate);
        getqsglh();
        showHide();
        function showHide(index) {
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
    		"../../../../sbpcdl/QueryServiceType",
    		{"bgd":bgd},
    		function(result){
    			if (result.success) {
                    if (result.data.ServiceName != "" && $("#buyer").find("p").length === 0) {
                    	var ywlxTipHtml =  '<p style="position:absolute;left: 5px;top: -13px;white-space: nowrap;font-size: 10px;">&nbsp;<span style="color:red">'+(result.data.ServiceName || "")+'</span></p>';
                    	$("#buyer>.form-group:eq(3)>div").prepend(ywlxTipHtml)
                    }
                }
    		}
    	);
    });
    //放大镜操作处理
    $(document).on("click", ".ctrol", function () {
        openLayer({
            title: '<i class="glyphicon glyphicon-file" style="padding-right:3px;font-size:12px;"></i>选择商品代码',
            url: "../../../pages/tuishui/picidl2/dl_savelist.html"
        });
    });
    /////////////////////////////////////////////////////////////第二步中的处理结束/////////////////////////////////////////////////////////////

    /////////////////////////////////////////////////////////////第三步中的处理开始/////////////////////////////////////////////////////////////
    var buyer = {
        container: 'buyer',
        columns: [
            {col: "ssq", label: "所属期", type: "text", validate: {required: true},sm:3},
            {col: "sbpch", label: "批次号", type: "text"/*, readonly:true*/,sm:3},
            {col: "qsglh", label: "起始关联号", type: "creatpici", validate: {required: true},sm:3},
            {
                col: "ywlx",
                label: "业务类型",
                type: "select",
                options: getDicts("serviceType"),
                multiple: true,
                sm:3
            },
            {col: "pcbz", label: "备注", type: "textarea",sm:3,rowNum:4}
        ]
    };
    formGenerator(buyer, "single");
    //验证表单
    registerValidate("addInfoForm", buyer);
    $(":input[name='sbpch']").removeClass("form-control");
    var thiredButtons = $("#thirdStep").find("button");
    //上一步按钮事件
    thiredButtons.eq(0).on("click", function () {
        showHide();
        function showHide(index) {
            var lis = $("#piciTitleBox").find("li");
            lis.removeClass().hide().eq(1).addClass("active").show();
            var tabs = $("#piciTabBox>div");
            tabs.hide().eq(1).show();
            $("#firstStep,#thirdStep").hide();
            $("#secondStep").show();
        }
    });

    //保存
    $("#oksave").on("click", function () {
        var bgdTablerows = $("#piciTable").bootstrapTable('getData');
        for(var i=0; i<bgdTablerows.length; i++){
            bgdTablerows[i].ckfph = $piciTable.find("#ckfph"+i).val();
            bgdTablerows[i].lxbz = $piciTable.find("#lxbz"+i).val();
        }
        var tableListRows = $tableList.bootstrapTable('getData');
//    	var picinfoRows = $("#addInfoForm #buyer").serialize();
        var formData = [];
        var ssq = $(":input[name='ssq']").val();
        var sbpch =  $(":input[name='sbpch']").val();
        var ywlxlist = $("select[name='ywlx']").val();
        var pcbz = $("textarea[name='pcbz']").val();
        var qsglhstart = $(":input[name='qsglh']:eq(0)").val();
        var qsglhend = $(":input[name='qsglh']:eq(1)").val();
        var qsglh = qsglhstart + qsglhend;
        //将业务类型 用逗号分隔拼接成字符串
        /*
        var ywlx="";
        for(var i=0;i<ywlxlist.length;i++){
            if(i==0){
                ywlx=ywlxlist[i];
            }else{
                ywlx=ywlx+","+ywlxlist[i];
            }
        }
        */
        var ywlx = ywlxlist ? ywlxlist.join(",") : "";
        formData.push({ssq:ssq,sbpch:sbpch,qsglh:qsglh,ywlx:ywlx,pcbz:pcbz});
        //传入服务器的数据
        var data = {
            "bgdList" : JSON.stringify(bgdTablerows),
            "bgdmxList" : JSON.stringify(tableListRows),
            "piciDl" : JSON.stringify(formData),
        };
        //alert(data)
        $.ajax({
            url : "../../../../sbpcdl/insertShenBaoPiCi",
            contenType:"application/json",
            type : "POST",
            data : data,
            success : function (result) {
                if(result.success){
                    parent.layer.msg("添加成功！");
                }else{
                    parent.layer.msg(result.msg);
                }
                parent.layer.close(parent.layer.getFrameIndex(window.name));//成功后关闭页面
                parent.refreshTable(); //刷新页面
            }
        });
    });

    /////////////////////////////////////////////////////////////第三步中的处理结束/////////////////////////////////////////////////////////////
    //查看详情
    $(document).on("click", ".lookInfo", function () {
        openLayer({
            ele: this,
            id: $(this).attr("key"),
            title: '<i class="glyphicon glyphicon-file" style="padding-right:3px;font-size:12px;"></i>报关单详情',
            url: "../../../pages/guandan/guandan/xiangqing.html"
        });
    });
    $(":input[name='ssq']:eq(0)").on({
        focus: function () {
            WdatePicker({
                dateFmt: 'yyyyMM',
                onpicked: function (dp) {
                    /*console.log(1);*/
                    console.log($(this).val());
                    getqsglh();
                }
            });
        }
    })
    /**
     * 校验起始关联号01-99
     */
    $(":input[name='sbpch']:eq(0)").on("change", function () {
        var sbpch = $(this).val();
        var regpc = /^[0-9]{2}$/;
        if (!regpc.test(sbpch) || sbpch === '00') {
            layer.msg('只能01-99输入两位数字');
            $(this).val('');
            $(":input[name='qsglh']:eq(1)").val('');
            return false;
        }

    })
    //初始化将业务类型设置为多选
    $('select[name="ywlx"]').multipleSelect({
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
function getqsglh() {
    var ssq = $(":input[name='ssq']:eq(0)").val();
    if (ssq != '') {
        $.ajax({
            url: '../../../../sbpcdl/querySbpcGlh',
            type: 'get',
            data: {'ssq': ssq},
            success: function (result) {
                $(":input[name='qsglh']:eq(0)").val(ssq);
                var max = result.data.qsglh.length;
                var qsglh = result.data.qsglh.substring((max - 4), max);
                $(":input[name='sbpch']:eq(0)").val(result.data.sbpch);
//                $(":input[name='qsglh']:eq(1)").val(qsglh);
                $(":input[name='qsglh']:eq(1)").val("0001");
            }
        })
    }
}

