package com.eshop2.eshop2;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class ContactController {
	 @Autowired
	    private ContactService contactService;
	    
	    @Autowired
	    private CheckoutService checkoutService; 

	    @PostMapping("/contacts")
	    public Contact addContact(@RequestBody Contact contact) {
	        Contact contact2 = contactService.addContact(contact);
	        System.out.println("Contact added");
	        return contact2;
	    }
	    
	    @PostMapping("/checkouts")
	    public Checkout addcCheckout(@RequestBody Checkout checkout) {
	        Checkout checkout2 = checkoutService.addCheckout(checkout);
	        System.out.println("Checkout added");
	        return checkout2;
	    }

}
