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


/**
 * 
 * @author joliveros
 *
 * this class is the gateway for login of the spring security
 */
@Component
public class UserService implements UserDetailsService {

//	@Autowired
//	private LogInService loginService;
	
	/**
	 * this method will check if the username in the database is valid then rejects or accepts the user when logging in
	 */
	@Override
	public UserDetails loadUserByUsername(String username) 
			throws UsernameNotFoundException {
		// TODO Auto-generated method stub
		
/*		User user = loginService.checkCredentials(username);
		
		BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
		String hashedPassword = passwordEncoder.encode(user.getPassword());
		
		if (user == null) {
			throw new UsernameNotFoundException("User " + username + " not found");
		}
		
		return new UserConfigurable(username, hashedPassword, user.getName(), user.getDetails(), createAuthorities(user.getPosition()));*/
		BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
		return new UserConfigurable("jay",passwordEncoder.encode("jay"),"jay","jay",createAuthorities("ROLE_ADMIN"));
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
