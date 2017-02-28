package com.sarisari.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.sarisari.dto.ShopMaintenanceDTO;
import com.sarisari.model.AjaxResponseBody;
import com.sarisari.springsecurity.UserConfigurable;

@RestController
public class AjaxCallsShopMaintenance {
	@Autowired
	RestTemplate rt;
	
	private static final String REGISTER_SHOP = "http://shop-service/savestore";
	
	@GetMapping(value = "/checkshop")
	public ShopMaintenanceDTO checkShop(){
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		UserConfigurable userDetails = (UserConfigurable) authentication.getPrincipal();
		ShopMaintenanceDTO retDTO = new ShopMaintenanceDTO();
		if(userDetails.getStoreid() != 0){
			retDTO.setName(userDetails.getStorename());
			retDTO.setDetails(userDetails.getStoredetails());
		}else{
			retDTO.setDetails("400");
		}
		return retDTO;
	}
	
	@PostMapping(value="/registershop")
	public AjaxResponseBody registerShop(@RequestBody ShopMaintenanceDTO shopMaintenanceDTO){
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		UserConfigurable userDetails = (UserConfigurable) authentication.getPrincipal();
		
		AjaxResponseBody response = new AjaxResponseBody();
		shopMaintenanceDTO.setUserid(userDetails.getUserid());
		ShopMaintenanceDTO responsedto = rt.postForObject(REGISTER_SHOP, shopMaintenanceDTO, ShopMaintenanceDTO.class);
		
		userDetails.setStoreid(responsedto.getShopid());
		userDetails.setStorename(responsedto.getName());

		response.setMsg("success");
		response.setCode("200");

		return response;
	}
}
