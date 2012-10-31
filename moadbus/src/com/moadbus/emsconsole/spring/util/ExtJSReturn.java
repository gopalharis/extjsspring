package com.moadbus.emsconsole.spring.util;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Component;

import com.moadbus.emconsole.domain.BulkSmsGroup;


/**
 * Util class, returns a Map in the format Ext JS expects
 * 
 */
@Component
public class ExtJSReturn {

	/**
	 * Generates modelMap to return in the modelAndView
	 * @param users
	 * @return
	 */
	public static Map<String,Object> mapOK(List<BulkSmsGroup> bulkSmsGroups){
		
		Map<String,Object> modelMap = new HashMap<String,Object>(3);
		modelMap.put("total", bulkSmsGroups.size());
		modelMap.put("data", bulkSmsGroups);
		modelMap.put("success", true);
		
		return modelMap;
	}
	
	/**
	 * Generates modelMap to return in the modelAndView
	 * @param users
	 * @return
	 */
	public static Map<String,Object> mapOK(List<BulkSmsGroup> bulkSmsGroups, int total){
		
		Map<String,Object> modelMap = new HashMap<String,Object>(3);
		modelMap.put("total", total);
		modelMap.put("data", bulkSmsGroups);
		modelMap.put("success", true);
		
		return modelMap;
	}
	
	/**
	 * Generates modelMap to return in the modelAndView in case
	 * of exception
	 * @param msg message
	 * @return
	 */
	public static Map<String,Object> mapError(String msg){

		Map<String,Object> modelMap = new HashMap<String,Object>(2);
		modelMap.put("message", msg);
		modelMap.put("success", false);

		return modelMap;
	} 
}
