package com.sarisari.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;


import com.sarisari.model.AjaxResponseBody;
import com.sarisari.springsecurity.UserConfigurable;

@RestController
public class AjaxCallsShopMaintenance {
	@Autowired
	RestTemplate rt;
	
	@GetMapping(value = "/checkshop")
	public AjaxResponseBody checkShop(){
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		UserConfigurable userDetails = (UserConfigurable) authentication.getPrincipal();
		AjaxResponseBody response = new AjaxResponseBody();
		if(userDetails.getStoreid() != 0){
			response.setMsg("shop exist");
			response.setCode("200");
		}else{
			response.setMsg("shop not exist");
			response.setCode("400");
		}
		return response;
	}
}
