/////////////////////////////////////////////////////////////add 2017 12 14/////////////////////////////////////////////////////////////


//添加顶部导航
function CreateTab(title,href,id){	
	//删除选中状态
	$('#main .con',window.parent.document).removeClass('active');
	$("#fkTabs li",window.parent.document).removeClass('active');
	
	//创建元素
	var $tabs = $('#fkTabs ul',window.parent.document);
	var $li = $('<li></li>');
	$li.attr('class','active');
	var $a = $('<a></a>');
	$a.attr('href','javascript:;');
	$a.attr('data-href',href);
	$a.attr('id',id+'-tab');
	$a.text(title);
	var $i = $('<i></i>');
	$i.attr('class','fa fa-close');
	$li.append($a);
	$li.append($i);
	//向右侧tab添加元素
	$tabs.append($li);
	//右侧内容区加载页面
	var $main = $('#main',window.parent.document);
	$main.find('.con').removeClass('active');
	var $con = $('<div></div>');
	$con.attr('class','con active');
	$con.html('<iframe id="'+ id +'-con" src="../'+href+'" frameborder="0" scrolling="yes" width="100%" height="100%"></iframe>');
	$main.append($con);
}

//删除顶部导航
function RemoveTab(id,updateid){	
   
	var $listap = $("#fkTabs li",window.parent.document);
	var $liscon = $("#main .con",window.parent.document);
	$listap.each(function(index, element) {
		var $id = $(this).find("a").attr("id");
		if( (id+"-tab") == $id ){
			$(this).remove();
			$listap.eq(index-1).addClass('active');	
			}
    });
	
	$liscon.each(function(index, element) {
		var $id = $(this).find("iframe").attr("id");
		if( (id+"-con") == $id ){
			$(this).remove();
			$liscon.eq(index-1).addClass('active');	
			
			if(updateid != undefined){
				window.parent.UpdateTab("20002");//重加载指定页面
				}
				
			}
    });	

}

//重加载指定页面
function UpdateTab(id){
	console.log("111")
	var $liscon = $("#main .con");
	$liscon.each(function(index, element) {
		var $iframe = $(this).find("iframe");
		var $id = $(this).find("iframe").attr("id");
		console.log("222")
		if( (id+"-con") == $id ){
			console.log("111")
			document.getElementById($id).contentWindow.location.reload(true);

		}
	});
}


