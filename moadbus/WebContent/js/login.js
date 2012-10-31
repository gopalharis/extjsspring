Ext.require([ '*' ]);

function showMask() {
	var myMask = new Ext.LoadMask(Ext.getBody(), {
		msg : "",
		height : 177,
		width : 175,
		maskCls : 'moadbus-loading-mask',
		id : 'modbusLoadingMask'
	});
	myMask.show();
}

function hideMask() {
	Ext.getCmp('modbusLoadingMask').hide();
}

function fnLoginForm(theForm) {
	Ext.Ajax.timeout = 90000;
	showMask();
	Ext.Ajax.request({
		url : '/emconsole/user/login.htm',
		form : "loginform",
		method : 'POST',
		success : function() {
			hideMask();
			var redirect = '/emconsole/menu.jsp';
			window.location = redirect;
		},

		// Failure function, see comment above re: success and failure.
		// You can see here, if login fails, it throws a messagebox
		// at the user telling him / her as much.

		failure : function(form, action) {
			hideMask();
			if (action.failureType == 'server') {
				obj = Ext.util.JSON.decode(action.response.responseText);
				Ext.Msg.alert('Login Failed!', obj.errors.reason);
			} else {
				Ext.Msg.alert('Warning!',
						'Authentication server is unreachable : '
								+ action.response.responseText);
			}
			login.getForm().reset();
		}
	});

} // end fnLoginForm
