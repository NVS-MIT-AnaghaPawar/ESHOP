package com.eshop2.eshop2;

public class Checkout {
	
	private String name;
	private String email;
	private String number;
	private String address;
	private String pincode;
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getNumber() {
		return number;
	}
	public void setNumber(String number) {
		this.number = number;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getPincode() {
		return pincode;
	}
	public void setPincode(String pincode) {
		this.pincode = pincode;
	}
	public Checkout(String name, String email, String number, String address, String pincode) {
		super();
		this.name = name;
		this.email = email;
		this.number = number;
		this.address = address;
		this.pincode = pincode;
	}
	public Checkout() {
		super();
		// TODO Auto-generated constructor stub
	}
	@Override
	public String toString() {
		return "Checkout [name=" + name + ", email=" + email + ", number=" + number + ", address=" + address
				+ ", pincode=" + pincode + "]";
	}
	
	

}
