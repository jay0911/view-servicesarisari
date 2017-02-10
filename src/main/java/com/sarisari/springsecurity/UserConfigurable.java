package com.sarisari.springsecurity;

import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;

/**
 * 
 * @author joliveros
 *
 *	this class will be the pojo for the user in the spring security session when logging in
 *
 */
public class UserConfigurable extends User{
	
	private String name;
	private String details;
	
	/**
	 * 
	 */
	private static final long serialVersionUID = -9168810770287668136L;

	public UserConfigurable(String username, String password,String name,String details,
			Collection<? extends GrantedAuthority> authorities) {
		super(username, password, authorities);
		// TODO Auto-generated constructor stub
		this.setDetails(details);
		this.setName(name);
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDetails() {
		return details;
	}

	public void setDetails(String details) {
		this.details = details;
	}

}
