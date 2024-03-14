package com.eshop2.eshop2;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;

import org.springframework.stereotype.Component;

@Component
public class ContactService {
	
	private static final String DB_URL = "jdbc:mysql://localhost:3306/eshop2";
	private static final String DB_USERNAME = "root";
	private static final String DB_PASSWORD = "Ashu@123";
	
	
	public Contact addContact(Contact l)
	{
		try(Connection con=DriverManager.getConnection(DB_URL, DB_USERNAME, DB_PASSWORD)){
			String query="INSERT INTO contact(name,email,subject,message) VALUES (?,?,?,?)";
			PreparedStatement ps=con.prepareStatement(query);
			ps.setString(1,l.getName());
			ps.setString(2,l.getEmail());
			ps.setString(3,l.getSubject());
			ps.setString(4,l.getMessage());
			ps.executeUpdate();
			ps.close();
		}catch (SQLException e) {
			e.printStackTrace();
		}
		return l;		
	}

}
