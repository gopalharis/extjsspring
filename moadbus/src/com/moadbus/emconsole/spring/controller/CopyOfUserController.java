package com.moadbus.emconsole.spring.controller;
/*
import java.util.ArrayList;
import java.util.HashMap;

import javax.security.sasl.AuthenticationException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.google.gson.Gson;
import com.moadbus.emconsole.domain.BankAdminGroupUsers;
import com.moadbus.emconsole.domain.Menu;
import com.moadbus.emconsole.services.MenuService;
import com.moadbus.emconsole.services.SecurityService;
import com.moadbus.emconsole.spring.mvc.beans.Login;

@Controller
@RequestMapping(value="/user/*")
public class CopyOfUserController {

	@Autowired
	private SecurityService securityService;
	
	@Autowired
	private MenuService menuService;
	
	@RequestMapping(method=RequestMethod.GET, value="login")
	public void login(Model model) {
		model.addAttribute("login", new Login());
	}
	
	@RequestMapping(method=RequestMethod.POST, value="login")
	public @ResponseBody String login(@RequestParam String username, @RequestParam String password, Model model, HttpServletRequest request) throws Exception {
		Gson gson = new Gson();
		HashMap<String, Boolean> map = new HashMap<String, Boolean>();
		securityService.isAuthenticUser(username, password);
		BankAdminGroupUsers groupUsers =	securityService.isAuthenticUser(username, password);
		if(groupUsers != null) {
			map.put("success", true);
			// Add user to session
			HttpSession session = request.getSession();
			session.setAttribute("user", groupUsers);
			return gson.toJson(map);
		}
		
		throw new AuthenticationException("Not a valid username or password");
		
	}
	
	@RequestMapping(method=RequestMethod.GET, value="menus")
	public @ResponseBody String getMenu(HttpSession session) throws Exception {
		Gson gson = new Gson();
		BankAdminGroupUsers groupUsers = (BankAdminGroupUsers) session.getAttribute("user");
		ArrayList<Menu> menus = menuService.getTopLevelMenuItems(groupUsers);
		return gson.toJson(menus);
	}
	
	@RequestMapping(method=RequestMethod.GET, value="submenus")
	public @ResponseBody String getSubMenu(@RequestParam int menuId, HttpSession session) throws Exception {
		Gson gson = new Gson();
		ArrayList<Menu> menus = menuService.getImmediateChildren(menuId);
		for (Menu menu : menus) {
			System.out.println(menu.getImage());
		}
		return gson.toJson(menus);
	}
	
}*/