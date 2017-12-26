(function ($) {
    $.extend({
        Request: function (m) {
            var sValue = location.search.match(new RegExp("[\?\&]" + m + "=([^\&]*)(\&?)", "i"));
            return sValue ? sValue[1] : sValue;
        }
    });
})(jQuery);
var key = "ckht";
var ctx = "../../../";
var currentSelectRow = null;
var columns = [ //表格标题项
    {
        align: "center",
        checkbox: true
    },
    {
        title: "序号",
        align: "center",
        formatter: function (value, row, index) {
            /*
            var pageNumber = $(".pagination .active").text();
            var pageSize = $(".pagination-detail .page-size").text();
            return pageSize * (pageNumber-1) + index + 1;
             */
            //return index + 1;
            var page = $table.bootstrapTable("getPage");
            var pageSize = page.pageSize, pageNumber = page.pageNumber;
            return page.pageSize * (page.pageNumber - 1) + index + 1;
        }
    },
    {
        title: "任务编号",
        align: "center",
        field: "rwbh",
        formatter: lookInfoFormatter
    },
    {
        title: "出口国别",
        align: "center",
        field: "destinationAreaName"
    },
    {
        title: "出口口岸",
        align: "center",
        field: "exportPortName"
    },
    {
        title: "贸易方式",
        align: "center",
        field: "serviceType"
    },
    {
        title: "运输方式",
        align: "center",
        field: "transportMode"
    },
    {
        title: $.Request("isZbrw") != null ? "当前环节" : "办理环节",
        align: "center",
        field: "lc_taskName"
    },
    {
        title: $.Request("isZbrw") != null ? "上一环节办理人" : "当前办理人",
        align: "center",
        field: "lc_operName",
        visible: $.Request("isLsrw") == 'true' ? false : true
    },
    {
        title: $.Request("isZbrw") != null ? "上一环节办理时间" : "当前环节办理时间",
        align: "center",
        field: "lc_operTime",
        visible: $.Request("isZbrw") != null ? true : false
    },
    {
        title: "操作",
        align: "center",
        field: "cz",
        //formatter : operationFormatter
        formatter: function (value, row, index) {
            //已办和历史任务需要增加业务表单按钮
            if ($.Request("isZbrw") != null) {
                return '<a href="javascript:void(0);" class="handleBtn">办理</a>' + '&nbsp;&nbsp;<a href="javascript:void(0);" class="lookInfo">流程轨迹</a>';
            } else if ($.Request("isLsrw") == 'true') {
                return '<a href="javascript:void(0);" class="FormBtn">业务表单</a>' + '&nbsp;&nbsp;<a href="javascript:void(0);" class="lookInfo">流程轨迹</a>';
            } else {
                return '<a href="javascript:void(0);" class="RestBtn">撤回</a>' + '&nbsp;&nbsp;<a href="javascript:void(0);" class="FormBtn">业务表单</a>' + '&nbsp;&nbsp;<a href="javascript:void(0);" class="lookInfo">流程轨迹</a>';
            }
        }
    }
];


$(function () {
    //初始化查询
    formGenerator({
        container: "advSearchBox",
        columns: [
            {
                col: "rwbh",
                type: "text",
                label: "任务编号"
            },
            {
                col: "destinationAreaName",
                label: "出口国别",
                type: "select",
                options: getDictsExt("nation")
            },
            {
                col: "serviceType",
                label: "贸易方式",
                type: "select",
                options: getDictsExt("maoyifs")
            },
            {
                col: "exportPortName",
                label: "出口口岸",
                type: "select",
                options: getDictsExt("exportPortName")

            },
            {
                col: "transportMode",
                label: "运输方式",
                type: "select",
                options: getDictsExt("transportMode")
            },
            /*{
                col: "dqhj",
                label: "当前环节",
                type: "select",
                options: getHuanJie()
                //options : getDictsExt("dqhj")
            },
            {
                col: "examineStatus",
                label: "发起时间",
                type: "startEndDate",
                dates: [
                    {name: "signDateStart", text: "开始日期"},
                    {name: "signDateEnd", text: "结束日期"}
                ]
            },*/
            {
                col: "isZbrw",
                label: "在办标志",
                type: "hidden",
                value: $.Request("isZbrw")
            },
            {
                col: "isLsrw",
                label: "历史标志",
                type: "hidden",
                value: $.Request("isLsrw")
            },
            {
                col: "procDefKey",
                label: "流程定义Key",
                type: "hidden",
                value: $.Request("procDefKey")
            },
            {
                col: "jggwBm",
                label: "机构岗位编码",
                type: "hidden",
                value: $.Request("jggwBm")
            }
        ]
    }, "query");

    //查询
    $("#thSearchBtn").bind("click", function () {
        var path = "";
        if ($.Request("isZbrw") != null) {
            path = ctx + "renwu/query/dbrws";
        } else if ($.Request("isLsrw") != null) {
            path = ctx + "renwu/query/ybrws";
        }
        queryData(path);
    }).trigger("click");


    //查看流程轨迹
    $(document).on("click", ".lookInfo", function () {
        //top.openTabs("ckts_1000001", new Date().getTime(), "&processInstanceId=" + procInstId + "&taskId=" + taskId, "流程轨迹");
        var menu = top.getMenuInfo("ckts_1000001");
        var url = "";
        if (menu != null && menu.urldz != null) {
            if (menu.urldz.indexOf("?") > -1) {
                url = menu.urldz + "&processInstanceId=" + params.lc_instId + "&taskId=" + params.lc_taskId;
            } else {
                url = menu.urldz + "?processInstanceId=" + params.lc_instId + "&taskId=" + params.lc_taskId;
            }
            window.parent.setParentWindow(menu.gnjc, url, 1280, 600);
        }
    });


    //办理操作
    $(document).on("click", ".handleBtn", function () {
        // console.log(params);
        $.ajax({
            url: ctx + 'renwu/clrw/' + params.lc_taskId,
            type: 'GET',
            data: {
                "procInstId": params.lc_instId,
                "bussinessId": params.rwbh
            },
            dataType: "json",
            success: function (data) {
                if (data.success == true) {
                    var result = data.data;
                    if (result['errorInfo'] != null) {
                        layer.alert(result['errorInfo'], function(index){
                            //刷新首页
                            top.openTabs("ckts_1000000");
                            layer.close(index);
                        });
                    } else {
                        var dkfs = result['dkfs'] != null ? result['dkfs'] : "0";
                        var url = result['url'] != null ? result['url'] : "";
                        if (dkfs == "3") {
                            window.parent.setParentWindow("办理任务", url, 1280, 600, function () {
                                top.openTabs("ckts_1000000");
                            });
                        } else {
                            top.openTabs("ckts_1000002", params.rwbh, url, "办理任务");
                        }
                    }
                }
            },
            error: function () {

            }
        });
    });

    //业务表单操作
    $(document).on("click", ".FormBtn", function () {
        // console.log(params);
        $.ajax({
            url: ctx + 'renwu/ckywbd/' + params.lc_taskId,
            type: 'GET',
            data: {
                "procInstId": params.lc_instId,
                "bussinessId": params.rwbh
            },
            dataType: "json",
            success: function (data) {
                if (data.success == true) {
                    var result = data.data;
                    if (result['errorInfo'] != null) {
                        layer.msg(result['errorInfo'], {time: 3});
                        top.openTabs("ckts_1000000");
                        //刷新首页
                    } else {
                        var dkfs = result['dkfs'] != null ? result['dkfs'] : "0";
                        var url = result['url'] != null ? result['url'] : "";
                        console.log(url);
                        if (url != "") {
                            if (dkfs == "3") {
                                window.parent.setParentWindow("业务表单", url, 1280, 600);
                            } else {
                                top.openTabs("ckts_1000002", new Date().getTime(), url, "业务表单");
                            }
                        }

                    }
                }
            },
            error: function () {

            }
        });
    });

    //撤回操作
    $(document).on("click", ".RestBtn", function () {
        // console.log(params);
        $.ajax({
            url: ctx + 'renwu/chrw/' + params.lc_instId,
            type: 'GET',
            data: {},
            dataType: "json",
            success: function (result) {
                if (result.success == true) {
                    layer.msg(result.msg, {time: 1200});
                    $("#thSearchBtn").bind("click", function () {
                        var path = "";
                        if ($.Request("isZbrw") != null) {
                            path = ctx + "renwu/query/dbrws";
                        } else if ($.Request("isLsrw") != null) {
                            path = ctx + "renwu/query/ybrws";
                        }
                        queryData(path);
                    }).trigger("click");
                } else {
                    layer.msg(result.msg, {time: 1200});
                }
            },
            error: function () {

            }
        });
    });

});