package com.sarisari.springsecurity;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.sarisari.dto.UserMaintenanceDTO;
import com.sarisari.model.UserPrivateInfo;


/**
 * 
 * @author joliveros
 *
 * this class is the gateway for login of the spring security
 */
@Component
@RestController
public class UserService implements UserDetailsService {

	@Autowired
	RestTemplate rt;
	
	private final static String CHECK_CREDENTIALS = "http://usermaintenance-service/checkcredentials";
	
	/**
	 * this method will check if the username in the database is valid then rejects or accepts the user when logging in
	 */
	@Override
	public UserDetails loadUserByUsername(String username) 
			throws UsernameNotFoundException {
		// TODO Auto-generated method stub
		UserMaintenanceDTO dto = new UserMaintenanceDTO();
		dto.setUsername(username);

		UserPrivateInfo[] userPrivateInfo = rt.postForObject(CHECK_CREDENTIALS,dto, UserPrivateInfo[].class);
		
		BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
		String hashedPassword = passwordEncoder.encode(userPrivateInfo[0].getPassword());
		
		if (userPrivateInfo.length == 0) {
			throw new UsernameNotFoundException("User " + username + " not found");
		}
		return new UserConfigurable(username, hashedPassword, userPrivateInfo[0].getUsername(), userPrivateInfo[0].getUsername(), createAuthorities(userPrivateInfo[0].getUsergroup()));
	}
	
	/**
	 * Create the Authority
	 * @param account
	 * @return
	 */
	private List<GrantedAuthority> createAuthorities(String role) {
		String[] arrayRoles = role.split(",");
		List<GrantedAuthority> authorities=new ArrayList<GrantedAuthority>(arrayRoles.length);
		
		//added the role to the list of authorities
		for(String sRole:arrayRoles){
			authorities.add(new SimpleGrantedAuthority(sRole));
		}
		return Collections.unmodifiableList(authorities);
	}

}
