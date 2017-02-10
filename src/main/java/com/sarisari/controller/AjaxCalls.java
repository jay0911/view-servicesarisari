package com.sarisari.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.sarisari.dto.RegisterFormDTO;
import com.sarisari.model.AjaxResponseBody;

@RestController
public class AjaxCalls {
	
	@Autowired
	RestTemplate rt;
	
	private final static String REGISTER_USER = "http://usermaintenance-service/registeruserservice";
	
	@PostMapping(value = "/registerhere")
	public AjaxResponseBody registerHere(@RequestBody RegisterFormDTO registerform){
		
		System.out.println(registerform.toString());
		
		return rt.postForObject(REGISTER_USER, registerform, AjaxResponseBody.class);
	
	}
}
