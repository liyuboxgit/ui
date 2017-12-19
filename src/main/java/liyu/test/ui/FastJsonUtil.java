package liyu.test.ui;

import java.util.Arrays;
import java.util.Collection;
import java.util.Date;
import java.util.List;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.annotation.JSONField;
import com.alibaba.fastjson.serializer.SerializerFeature;

public class FastJsonUtil {
	public static void main(String[] args) {
		Foo foo = new Foo();
		List<String> list = Arrays.asList(new String[]{"good boy","coder"});
		foo.setId(1);
		foo.setBirth(new Date());
		foo.setName("liyu");
		foo.setLabels(list);
		
		String string = JSON.toJSONString(foo,SerializerFeature.WriteMapNullValue);
		System.out.println(string);
		
		Foo ret = JSON.parseObject(string,Foo.class);
		System.out.println(ret.getBirth());
		
		//Ïê¼ûmvn fastjosn github
	}
	
	private static class Foo{
		private Integer id;
		private String name;
		@JSONField(format="yyyyMMdd")
		private Date birth;
		private Collection<String> labels;
		public Integer getId() {
			return id;
		}
		public void setId(Integer id) {
			this.id = id;
		}
		public String getName() {
			return name;
		}
		public void setName(String name) {
			this.name = name;
		}
		public Collection<String> getLabels() {
			return labels;
		}
		public void setLabels(Collection<String> labels) {
			this.labels = labels;
		}
		public Date getBirth() {
			return birth;
		}
		public void setBirth(Date birth) {
			this.birth = birth;
		}
	}
}
