package com.sarisari.controller;

import java.util.Set;

import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import com.sarisari.model.UserPrivateInfo;

@Controller
public class MainController {
	
	@GetMapping("/homepageadmin")
	public String homepageadmin(){		
		return "pages/homepageadmin";
	}
	
	@GetMapping("/homepagecustomers")
	public String homepagecustomers(){	
		
        Set<String> roles = AuthorityUtils.authorityListToSet(SecurityContextHolder.getContext().getAuthentication().getAuthorities());
        if (roles.contains("ROLE_ADMIN")) {
        	homepageadmin();
        }
		return "pages/homepagecustomers";
	}
	
	@GetMapping("/homepagepublic")
	public String homepagepublic(){		
		return "pages/homepagepublic";
	}
	
	@GetMapping("/login")
	public String log(Model model){	
		model.addAttribute("customer",new UserPrivateInfo());
		return "pages/login";
	}

}
