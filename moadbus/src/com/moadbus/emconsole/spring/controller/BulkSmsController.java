package com.moadbus.emconsole.spring.controller;

import java.sql.Date;
import java.sql.Timestamp;
import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.expression.spel.ast.MethodReference;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.google.gson.Gson;
import com.moadbus.emconsole.domain.BulkSmsGroup;
import com.moadbus.emconsole.services.BulkSmsGroupService;
import com.moadbus.emconsole.spring.model.BulkSmsGroupWrapper;
import com.moadbus.emsconsole.spring.util.ExtJSReturn;


/**
 * Controller - Spring
 */
@Controller
@RequestMapping(value="/bulksms/*")
public class BulkSmsController  {

	@Autowired
	private BulkSmsGroupService bulkSmsGroupService;
	
	
	
	@RequestMapping(method=RequestMethod.GET, value="view")
	public @ResponseBody String view(@RequestParam int page,@RequestParam int start, @RequestParam int limit) throws Exception {
		Gson gson = new Gson();
		try{
			System.out.println("bulk sms view controller----");
			

			/*List<User> users = userService.getUserList(start,limit);
			
			int total = userService.getTotalUsers();

			return ExtJSReturn.mapOK(users, total);*/
			//@TODO  pass the id dynamically

			 java.util.Date date= new java.util.Date();
			 System.out.println(new Timestamp(date.getTime()));
			BulkSmsGroup bulkSmsGroup = new BulkSmsGroup();
			//bulkSmsGroup.setSmsGroupId(1);
			bulkSmsGroup.setSmsGroupName("geventech");
			bulkSmsGroup.setScheduledTime(new Timestamp(date.getTime()));
			bulkSmsGroup.setStatus("ready");
			bulkSmsGroup.setSmsMessage("testing");
			
			
			bulkSmsGroupService.insert(bulkSmsGroup);
			
			List<BulkSmsGroup> bulkSmsGroups = bulkSmsGroupService.getBulkSmsGroup(1);
			return gson.toJson(ExtJSReturn.mapOK(bulkSmsGroups));

		} catch (Exception e) {
			System.out.println("controller error="+e);

			return gson.toJson(ExtJSReturn.mapError("Error retrieving bulksms  from database."));
		}
	}
	
	@RequestMapping(method=RequestMethod.POST, value="create")
	public @ResponseBody Map<String,? extends Object> create(@RequestBody BulkSmsGroupWrapper data) throws Exception {

		try{

			/*List<User> users = userService.create(data.getData());

			return ExtJSReturn.mapOK(users);*/
		//	data.getData().setScheduledTime(new Date(Calendar.getInstance().getTimeInMillis()));
			
			  bulkSmsGroupService.insert(data.getData());
			  List<BulkSmsGroup> bulkSmsGroups = bulkSmsGroupService.getBulkSmsGroup(1);
				return ExtJSReturn.mapOK(bulkSmsGroups);
			 

		} catch (Exception e) {

			return ExtJSReturn.mapError("Error trying to create Bulksms.");
		}
	}
	
	@RequestMapping(method=RequestMethod.GET, value="update")
	public @ResponseBody Map<String,? extends Object> update(@RequestBody BulkSmsGroupWrapper data) throws Exception {
		try{

			/*List<User> users = userService.update(data.getData());

			return ExtJSReturn.mapOK(users);*/
	//		data.getData().setScheduledTime(new Date(Calendar.getInstance().getTimeInMillis()));
			
			bulkSmsGroupService.updateByPrimaryKey(data.getData());
			List<BulkSmsGroup> bulkSmsGroups = bulkSmsGroupService.getBulkSmsGroup(1);
			return ExtJSReturn.mapOK(bulkSmsGroups);
			
			

		} catch (Exception e) {

			return ExtJSReturn.mapError("Error trying to update bulksms.");
		}
	}
	
	@RequestMapping(method=RequestMethod.GET, value="delete")
	public @ResponseBody Map<String,? extends Object> delete(@RequestBody BulkSmsGroupWrapper data) throws Exception {
		
		try{
			
/*			userService.delete(data.getData());

			Map<String,Object> modelMap = new HashMap<String,Object>(3);
			modelMap.put("success", true);

			return modelMap;*/
			
			bulkSmsGroupService.deleteByPrimaryKey(1);
			Map<String,Object> modelMap=new HashMap<String, Object>(3);
			modelMap.put("success",true);
			return modelMap;
			

		} catch (Exception e) {

			return ExtJSReturn.mapError("Error trying to delete user.");
		}
	}
	

	
	@Autowired
	public void setBulkSmsService(BulkSmsGroupService bulkSmsGroupService)
	{
               this.bulkSmsGroupService=bulkSmsGroupService;
	}
}
