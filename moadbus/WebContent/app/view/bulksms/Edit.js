Ext.define('MoadBus.view.bulksms.Edit', {
    extend: 'Ext.window.Window',
    alias : 'widget.bulksmsedit',

    requires: ['Ext.form.Panel','Ext.form.field.Text'],

    title : 'Edit Details',
    layout: 'fit',
    autoShow: true,
    width: 280,
    
    iconCls: 'icon-user',

    initComponent: function() {
        this.items = [
            {
                xtype: 'form',
                padding: '5 5 0 5',
                border: false,
                style: 'background-color: #fff;',
                
                fieldDefaults: {
                    anchor: '100%',
                    labelAlign: 'left',
                    allowBlank: false,
                    combineErrors: true,
                    msgTarget: 'side'
                },

                items: [
					{
					    xtype: 'textfield',
					    name : 'smsGroupId',
					    fieldLabel: 'SmsGroupId',
					    hidden:true
					},    
                    {
                        xtype: 'textfield',
                        name : 'smsGroupName',
                        fieldLabel: 'SmsGroupName'
                    },
                    {
                        xtype: 'textfield',
                        name : 'smsMessage',
                        fieldLabel: 'SmsMessage'
                    },
                    {
                        xtype: 'textfield',
                        name : 'status',
                        fieldLabel: 'Status'
                    }
                ]
            }
        ];
        
        this.dockedItems = [{
            xtype: 'toolbar',
            dock: 'bottom',
            id:'buttons',
            ui: 'footer',
            items: ['->', {
                iconCls: 'icon-save',
                itemId: 'save',
                text: 'Save',
                action: 'save'
            },{
                iconCls: 'icon-reset',
                text: 'Cancel',
                scope: this,
                handler: this.close
            }]
        }];

        this.callParent(arguments);
    }
});
