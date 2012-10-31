Ext.define('MoadBus.view.bulksms.List' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.bulksmslist',
    
    //requires: ['Ext.toolbar.Paging'],
    
    iconCls: 'icon-grid',

    title : 'BulkSms',
    store: 'BulkSms',

    columns: [{
    	header: "SMS GROUP NAME",
		width: 160,
		flex:1,
		dataIndex: 'smsGroupName'
	},{
		header: "SMS MESSAGE ",
		width: 150,
		flex:1,
		dataIndex: 'smsMessage'
	},{
		header: "Status",
		width: 160,
		flex:1,
		dataIndex: 'status'
	}],
	
	initComponent: function() {
		
		this.dockedItems = [{
            xtype: 'toolbar',
            items: [{
                iconCls: 'icon-save',
                itemId: 'add',
                text: 'Add',
                action: 'add'
            },{
                iconCls: 'icon-delete',
                text: 'Delete',
                action: 'delete'
            }]
        },
        {
            xtype: 'pagingtoolbar',
            dock:'top',
            store: 'BulkSms',
            displayInfo: true,
            displayMsg: 'Displaying users {0} - {1} of {2}',
            emptyMsg: "No users to display"
        }];
		
		this.callParent(arguments);
	}
});
