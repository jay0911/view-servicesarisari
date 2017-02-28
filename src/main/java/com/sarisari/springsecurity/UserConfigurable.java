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
	
	private int userid;
	private String name;
	private String details;
	private String storename;
	private int storeid;
	private String storedetails;
	/**
	 * 
	 */
	private static final long serialVersionUID = -9168810770287668136L;

	public UserConfigurable(int userid,String username, String password,String name,String details,String storename,String storedetails,int storeid,
			Collection<? extends GrantedAuthority> authorities) {
		super(username, password, authorities);
		// TODO Auto-generated constructor stub
		this.setDetails(details);
		this.setName(name);
		this.setStoreid(storeid);
		this.setStorename(storename);
		this.setUserid(userid);
		this.setStoredetails(storedetails);
	}
	
	public UserConfigurable(int userid,String username, String password,String name,String details,
			Collection<? extends GrantedAuthority> authorities) {
		super(username, password, authorities);
		// TODO Auto-generated constructor stub
		this.setDetails(details);
		this.setName(name);
		this.setUserid(userid);
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

	public String getStorename() {
		return storename;
	}

	public void setStorename(String storename) {
		this.storename = storename;
	}

	public int getStoreid() {
		return storeid;
	}

	public void setStoreid(int storeid) {
		this.storeid = storeid;
	}

	public int getUserid() {
		return userid;
	}

	public void setUserid(int userid) {
		this.userid = userid;
	}

	public String getStoredetails() {
		return storedetails;
	}

	public void setStoredetails(String storedetails) {
		this.storedetails = storedetails;
	}

}
