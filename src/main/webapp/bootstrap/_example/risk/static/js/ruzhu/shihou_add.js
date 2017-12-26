var ghshc = '';
var ghs = '';
var nsrsbh = '';
var ghsName = '';
var tse = '0';
var year = '';
var fjMap = {};
//详情信息
var infos = [{
	name : "纳税人识别号",
	value : "nsrsbh"
}, {
	name : "供货商名称",
	value : "ghsName"
}, {
	name : "年度",
	value : "year"
}, {
	name : "退税额",
	value : "tse"
}
];

//附件上传按钮
var uploadUrl = "../../../../attachment/upload";
$("input[name='file'].inputBtn").fileinput({
    language : "zh",
    showCaption : true,
    browseClass : "btn btn-default btn-sm",
    uploadExtraData : {category:'shihou'},//公司证件
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

}).on("filebatchselected",function(event,file){
    $(this).fileinput("upload");
});

$(function(){
    if(typeof(serchParam.ghshc) != "undefined" && serchParam.ghshc != null && serchParam.ghshc.length != 0){
        ghshc = serchParam.ghshc;
    }
    if(typeof(serchParam.ghs) != "undefined" && serchParam.ghs != null && serchParam.ghs.length != 0){
        ghs = serchParam.ghs;
    }
    if(typeof(serchParam.nsrsbh) != "undefined" && serchParam.nsrsbh != null && serchParam.nsrsbh.length != 0){
        nsrsbh = serchParam.nsrsbh;
    }
    if(typeof(serchParam.ghsName) != "undefined" && serchParam.ghsName != null && serchParam.ghsName.length != 0){
        ghsName = serchParam.ghsName;
    }
    if(typeof(serchParam.tse) != "undefined" && serchParam.tse != null && serchParam.tse.length != 0){
        tse = serchParam.tse;
    }
    if(typeof(serchParam.year) != "undefined" && serchParam.year != null && serchParam.year.length != 0){
        year = serchParam.year;
    }

    if(ghshc != null && ghshc != ''){
        getGshhc(ghshc);
    }
    ghsName = unescape(ghsName);
    if(tse == 'null'){
        tse = '0';
    }

    //点击保存
    $("#saveOrUupdateBtn").on("click",function(){
        if($('#addInfoForm').validate().form()){ //验证通过后
            saveOrUpdate();
        }
    });
    //详情添加
    initDetailInfo({
    	id : "info",
    	elems : infos
    });
    function initDetailInfo(config){
    	//console.log(config);
    	if(config){
    		var $row = $("<div class='row'><div>").appendTo($('#' + config.id));
    		for(var i=0;i<config.elems.length;i++){
    			$row.append('<div class="col-sm-10" style="margin-left:-4px;">'
    				+ '<label class="col-sm-2 text-right">'
    				+ config.elems[i].name + ':</label>'
    				+ '<div class="col-sm-7">' + '<p id="hc'+config.elems[i].value+'" type="'+(config.elems[i].type ? config.elems[i].type : "")+'">'
    				+ '</p></div></div>');
    		}
    	}
    }
    $("#hcnsrsbh").text(nsrsbh);
    $("#hcghsName").text(ghsName);
    $("#hctse").text(tse);
    $("#hcyear").text(year.substring(0,4));
});

/*跳转到后台进行新增或更新*/
function saveOrUpdate() {
    /*var str = '';
    for(var i = 1;i <= 6;i++){
        str += $("#shhcfj"+i).val()+','
    }*/
    var str = JSON.stringify(fjMap);
    $("#ghshc").val(ghshc);
    $("#ghs").val(ghs);
    $("#nsrsbh").val(nsrsbh);
    $("#ghsName").val(ghsName);
    $("#tse").val(tse);
    $("#year").val(year);
    var data = $("#addInfoForm").serialize();
        $.ajax({
            url : "../../../../ghsshhc/edit?fjids="+str,
            type : "post",
            dataType : "json",
            data:data,
            success : function (result) {
                if(result.success){
                    parent.layer.close(parent.layer.getFrameIndex(window.name));//成功后关闭页面
                    parent.refreshTable(); //刷新页面
                    parent.layer.msg("更新成功");
                }else{
                	parent.layer.msg("更新失败");
                }

            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {

            }
        });
};

function getGshhc(ghshc){

    $.ajax({
        url : '../../../../ghsshhc/select',
        type : 'get',
        data : {"ghshc":ghshc},
        dataType : 'json',
        success : function (result) {
            if(result.success){
                setFormData('addInfoForm',document,result.data)
                var attachmentList = result.data.attachmentList;
                if(attachmentList != null && attachmentList.length > 0){
                    $.each(attachmentList,function (index,attachment){
                        var fileMark = attachment.fileMark;
                        var fjid = attachment.fj;
                        var fjmc = attachment.name;

                        var array = fjMap[fileMark];
                        if(array==null) fjMap[fileMark] = array = [];
                        array.push({fj:attachment.fj,flag:"1"});
                        if(fjid != null && fjid != ''){
                            $("input[data_type="+fileMark+"]").closest("div.file-input").append('<p class="xiazaiFile" style="margin-top:10px;margin-bottom:0"><a href="../../../../attachment/download?attachmentId='+fjid+'">'+fjmc+'</a><a style="margin-left:10px;" href="javascript:;" class="deleteFile"><i class="glyphicon glyphicon-remove"></i></a></p>');
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