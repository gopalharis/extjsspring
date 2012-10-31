Ext.application({
    name: 'MoadBus',

    controllers: [
        'BulkSms'
    ],

    launch: function() {
        Ext.create('Ext.container.Viewport', {
            layout: 'fit',
            items: [
                {
                    xtype: 'bulksmslist'
                }
            ]
        });
    }
});
