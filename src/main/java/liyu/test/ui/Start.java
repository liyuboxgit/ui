package liyu.test.ui;

import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.webapp.WebAppContext;

public class Start {
	public static void main(String[] args) {
		// �������ļ����˿�
		Server server = new Server(8080);
		// ����һ���Ѿ����ڵ�������
		WebAppContext context = new WebAppContext();
		// ����������λ��
		context.setDescriptor("./src/main/webapp/WEB-INF/web.xml");
		// ����Web����������·��
		context.setResourceBase("./src/main/webapp");
		// ����������·��
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
