package com.moadbus.emconsole.spring.controller;


import java.util.Locale;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.context.NoSuchMessageException;
import org.springframework.web.servlet.LocaleResolver;



public abstract class BaseController {
	
	@Autowired
	private MessageSource messageSource;

	
	@Autowired(required = true)
	private LocaleResolver localeResolver;

	@Autowired(required=false)
	private HttpServletRequest request;
	
	@Autowired(required=false)
	private HttpServletResponse response;
	
	
	public String getCurrentLocle(){
		Locale locale;
		if (localeResolver!=null){
			locale = localeResolver.resolveLocale(request);
		}else{
			locale = request.getLocale();
		}
		return locale.getLanguage();
	}
	
	
	/**
	 * The method returns value of specified key.
	 * @param key
	 * @return
	 */
	public String getText(String key) {
		if (messageSource==null)
			return "messgSource null";
		if (localeResolver == null)
			return "localeResolver null";
		if (localeResolver.resolveLocale(getRequest())==null)
			return "resolveLocale null)";
		String msg ="";
		try{
			msg = messageSource.getMessage(key, null, localeResolver
					.resolveLocale(getRequest()));
		}catch (NoSuchMessageException e) {
			msg = e.getMessage();
		}
		return msg;

	}
	/**
	 * The method returns value of specified key and set arguments.
	 * e.g. error.required={0} is required.
	 * if we call getText("error.required", new String[]{"Name"});
	 * Result will be : Name is required
	 * @param key
	 * @param args
	 * @return
	 */
	public String getText(String key, String args) {
		return messageSource.getMessage(key, new String[] { args },
				localeResolver.resolveLocale(getRequest()));
	}
	/**
	 * @return the request
	 */
	
	
	
	public HttpServletRequest getRequest() {
		return request;
	}
	/**
	 * @param request the request to set
	 */
	public void setRequest(HttpServletRequest request) {
		this.request = request;
	}
	/**
	 * @return the response
	 */
	public HttpServletResponse getResponse() {
		return response;
	}
	/**
	 * @param response the response to set
	 */
	public void setResponse(HttpServletResponse response) {
		this.response = response;
	}

	
}
