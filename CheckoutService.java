package com.eshop2.eshop2;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.Properties;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import org.springframework.stereotype.Component;


@Component
public class CheckoutService {

	private static final String DB_URL = "jdbc:mysql://localhost:3306/eshop2";
	private static final String DB_USERNAME = "root";
	private static final String DB_PASSWORD = "Ashu@123";
	
	private static final String EMAIL_USERNAME = "martand.mahajan@mitaoe.ac.in";
	private static final String EMAIL_PASSWORD = "31122003";
	
	public Checkout addCheckout(Checkout c)
	{
		try(Connection con=DriverManager.getConnection(DB_URL, DB_USERNAME, DB_PASSWORD)){
			String query="INSERT INTO checkout(name,email,number,address,pincode) VALUES (?,?,?,?,?)";
			PreparedStatement ps=con.prepareStatement(query);
			ps.setString(1,c.getName());
			ps.setString(2,c.getEmail());
			ps.setString(3,c.getNumber());
			ps.setString(4,c.getAddress());
			ps.setString(5,c.getPincode());
			ps.executeUpdate();
			ps.close();
			sendEmail(c.getEmail(), "Checkout Confirmation", "Thank you for your order!  -- From Eshop");
		}catch (SQLException e) {
			e.printStackTrace();
		}
		return c;		
	}
	
	private void sendEmail(String toEmail, String subject, String message) {
		Properties props = new Properties();
		props.put("mail.smtp.auth", "true");
		props.put("mail.smtp.starttls.enable", "true");
		props.put("mail.smtp.host", "smtp.gmail.com"); 
		props.put("mail.smtp.port", "587"); 

		Session session = Session.getInstance(props, new javax.mail.Authenticator() {
			protected PasswordAuthentication getPasswordAuthentication() {
				return new PasswordAuthentication(EMAIL_USERNAME, EMAIL_PASSWORD);
			}
		});

		try {
			Message msg = new MimeMessage(session);
			msg.setFrom(new InternetAddress(EMAIL_USERNAME));
			msg.setRecipients(Message.RecipientType.TO, InternetAddress.parse(toEmail));
			msg.setSubject(subject);
			msg.setText(message);

			Transport.send(msg);

			System.out.println("Email sent successfully!");
		} catch (MessagingException e) {
			e.printStackTrace();
			System.out.println("Failed to send email.");
		}
	}
}
