package liyu.test.ui;

import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.webapp.WebAppContext;

public class Start {
	public static void main(String[] args) {
		// 服务器的监听端口
		Server server = new Server(8080);
		// 关联一个已经存在的上下文
		WebAppContext context = new WebAppContext();
		// 设置描述符位置
		context.setDescriptor("./src/main/webapp/WEB-INF/web.xml");
		// 设置Web内容上下文路径
		context.setResourceBase("./src/main/webapp");
		// 设置上下文路径
		context.setContextPath("/ui");
		context.setParentLoaderPriority(true);
		server.setHandler(context);

		try {
			server.start();
		} catch (Exception e) {
			e.printStackTrace();
		}
		System.out.println("server is  start");

	}
}
