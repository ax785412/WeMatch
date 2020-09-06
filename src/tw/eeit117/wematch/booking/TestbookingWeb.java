package tw.eeit117.wematch.booking;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.boot.MetadataSources;
import org.hibernate.boot.registry.StandardServiceRegistry;
import org.hibernate.boot.registry.StandardServiceRegistryBuilder;
import tw.eeit117.wematch.booking.BookingDAO;

@WebServlet("/TestbookingWeb")
public class TestbookingWeb extends HttpServlet {
	private static final long serialVersionUID = 1L;

	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		processAction(request, response);
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		processAction(request, response);
	}

	private void processAction(HttpServletRequest request, HttpServletResponse response) throws IOException {

		response.setContentType("text/html;charset=UTF-8");

		PrintWriter out = response.getWriter();
		StandardServiceRegistry serviceRegistry = new StandardServiceRegistryBuilder().configure().build();
		SessionFactory factory = new MetadataSources(serviceRegistry).buildMetadata().buildSessionFactory();
		Session session = factory.getCurrentSession();
		session.beginTransaction();
		
		BookingDAO bDAO = new BookingDAO(session);
		
		String Dumbbells1 = request.getParameter("Dumbbells1");
		String Dumbbells2 = request.getParameter("Dumbbells2");
		String Dumbbells3 = request.getParameter("Dumbbells3");
		String Dumbbells4 = request.getParameter("Dumbbells4");
		String date = request.getParameter("date");
		String time = request.getParameter("time");
		
		System.out.println("date"+date);
		System.out.println("time"+time);
		System.out.println("Dumbbells1"+Dumbbells1);
		System.out.println("Dumbbells2"+Dumbbells2);
		System.out.println("Dumbbells3"+Dumbbells3);
		System.out.println("Dumbbells4"+Dumbbells4);

		bookingBean bookingBean = new bookingBean();
		bookingBean.setBookingDate(date);
		bookingBean.setBookingTime(time);
		bookingBean.setEpt1(Dumbbells1);
		bookingBean.setEpt2(Dumbbells2);
		bookingBean.setEpt3(Dumbbells3);
		bookingBean.setEpt4(Dumbbells4);
		
		bDAO.insert(bookingBean);
		

		session.getTransaction().commit();

	}

}