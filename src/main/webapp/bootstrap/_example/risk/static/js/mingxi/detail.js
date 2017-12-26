$(function() {
	$.each(parent.params,function(k,v){
		$("#addInfoForm span[name="+k+"]").html(v);
	});
    // 表格信息1
    var dbtseList = [ {
        nsrmc : "",
        nsrsbh : "",
        dbtse : "",
        bz : ""
    }];

    // 表格信息2
    var zhtseList = [ {
        nsrmc : "",
        nsrsbh : "",
        zhtse : "",
        bz : ""
    }];
    //查询详情信息
    detail(parent.params.dbtsk);

    //处理详情请求
    function detail(dbtsk){
        // 请求详情
        $.ajax({
            url:'../../../dbtsk/querydbtsk',
            type:'GET',
            dataType:'json',
            data:{
                "dbtsk":parent.params.dbtsk
            },
            success:function(result){
                if (result.success){
                    dbtseList.splice(0,dbtseList.length);//清空
                    dbtseList = result.data.dbtseList;

                    zhtseList.splice(0,zhtseList.length);//清空
                    zhtseList = result.data.zhtseList;

                    // 表格信息1
                    initDetailInfo({
                        id : "table_first",
                        elems : dbtseList
                    });

                    // 表格信息2
                    initDetailInfo({
                        id : "table_second",
                        elems : zhtseList
                    });
                }
            }
        })
    }

	//处理详情
	function initDetailInfo(settings){
		if(settings){
            if (settings.id == 'table_first'){
                var $row = $('#' + settings.id);
                for(var i=0;i<settings.elems.length;i++){
                    $row.prepend('<tr><td class="SortId"></td><td>'
                        + settings.elems[i].nsrmc+ '</td><td>'
                        + settings.elems[i].nsrsbh+ '</td><td>'
                        + settings.elems[i].dbtse+ '</td><td>'
                        + settings.elems[i].bz+ '</td>'
                        + '</tr>');
                }
            }
            if (settings.id == 'table_second'){
                var $row = $('#' + settings.id);
                for(var i=0;i<settings.elems.length;i++){
                    $row.prepend('<tr><td class="SortId"></td><td>'
                        + settings.elems[i].nsrmc+ '</td><td>'
                        + settings.elems[i].nsrsbh+ '</td><td>'
                        + settings.elems[i].zhtse+ '</td><td>'
                        + settings.elems[i].bz+ '</td>'
                        + '</tr>');
                }
            }
		}
	}
	

});