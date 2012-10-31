Ext.define('MoadBus.controller.BulkSms', {
    extend: 'Ext.app.Controller',

    stores: ['BulkSms'],

    models: ['BulkSms'],

    views: ['bulksms.Edit', 'bulksms.List'],

    refs: [{
            ref: 'bulksmsPanel',
            selector: 'panel'
        },{
            ref: 'bulksmslist',
            selector: 'bulksmslist'
        }
    ],

    init: function() {
        this.control({
            'bulksmslist dataview': {
                itemdblclick: this.editUser
            },
            'bulksmslist button[action=add]': {
            	click: this.editUser
            },
            'bulksmslist button[action=delete]': {
                click: this.deleteUser
            },
            'bulksmslist button[action=save]': {
                click: this.updateUser
            }
        });
    },

    editUser: function(grid, record) {
        var edit = Ext.create('MoadBus.view.bulksms.Edit').show();
        
        if(record){
        	edit.down('form').loadRecord(record);
        }
    },
    
    updateUser: function(button) {
        var win    = button.up('window'),
            form   = win.down('form'),
            record = form.getRecord(),
            values = form.getValues();
        
        
		if (values.id > 0){
			record.set(values);
		} else{
			record = Ext.create('MoadBus.model.BulkSms');
			record.set(values);
			record.setId(0);
			this.getUsersStore().add(record);
		}
        
		win.close();
        this.getUsersStore().sync();
    },
    
    deleteUser: function(button) {
    	
    	var grid = this.getUserlist(),
    	record = grid.getSelectionModel().getSelection(), 
        store = this.getUsersStore();

	    store.remove(record);
	    this.getUsersStore().sync();
    }
});
