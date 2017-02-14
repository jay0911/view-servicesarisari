package com.sarisari.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.sarisari.dto.UserMaintenanceDTO;
import com.sarisari.model.AjaxResponseBody;
import com.sarisari.springsecurity.UserConfigurable;

@RestController
public class AjaxCalls {
	
	@Autowired
	RestTemplate rt;
	
	private final static String REGISTER_USER = "http://usermaintenance-service/registeruserservice";
	private final static String MODIFY_USER = "http://usermaintenance-service/modifyuser";
	private final static String GET_USERINFO = "http://usermaintenance-service/getuserinfo";
	
	@PostMapping(value = "/registerhere")
	public AjaxResponseBody registerHere(@RequestBody UserMaintenanceDTO registerform){
		
		System.out.println(registerform.toString());
		
		return rt.postForObject(REGISTER_USER, registerform, AjaxResponseBody.class);
	
	}
	
	@PostMapping(value = "/modifyaccount")
	public AjaxResponseBody modifyAccount(@RequestBody UserMaintenanceDTO modifyform){
		
		System.out.println(modifyform.toString());
		
		return rt.postForObject(MODIFY_USER, modifyform, AjaxResponseBody.class);
	
	}
	
	@GetMapping(value = "/currentuserinfo")
	public UserMaintenanceDTO getCurrentUserInfo(Authentication authentication){
		UserConfigurable userdetails = (UserConfigurable) authentication.getPrincipal();
		UserMaintenanceDTO dto = new UserMaintenanceDTO();
		dto.setUsername(userdetails.getUsername());
		return rt.postForObject(GET_USERINFO, dto, UserMaintenanceDTO.class);
	}
}
