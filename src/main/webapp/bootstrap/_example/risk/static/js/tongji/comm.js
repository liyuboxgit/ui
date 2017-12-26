//根据类型获取input
function getInputByType(column,sm,xs){
	var prefix = '<form class=""><div class="form-group col-sm-'+(sm||column.sm||12)+'"><label class="col-xs-'+(xs||column.xs||0)+' control-label">'+(column.required?'<span class="text-danger req">*&nbsp;</span>':'')+ column.label + ':</label><div class="col-xs-'+(12-(xs||column.xs||0))+'">',input='',suffix='</div></div></form>';
	var type = $.trim(column.type || 'text');
	switch(type){
		case 'text':
			input = '<input type="text" name="'+column.col+'" class="form-control input-sm"/>';
			break;
		case 'select':
			var array = ['<select name="'+column.col+'" class="form-control input-sm">'];
			if(column.options && column.options.length>0){
				for(var i=0;i<column.options.length;i++) array.push('<option value="'+column.options[i].value+'"'+(column.options[i].selected ? ' selected' : '')+'>'+column.options[i].text+'</option>');
			}
			input = array.join('') + '</select>';
			break;
		case 'radio':
			break;
		case 'checkbox':
			break;
		case 'date':
			input = '<input type="text" name="'+column.col+'" class="form-control input-sm" onclick=""WdatePicker();"/>';
			break;
		default:
			//不处理
			break;
	}
	return prefix + input + suffix;
}