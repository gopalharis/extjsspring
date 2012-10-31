Ext.define('MoadBus.store.BulkSms', {
    extend: 'Ext.data.Store',
    model: 'MoadBus.model.BulkSms',
    autoLoad: true,
    pageSize: 35,
    autoLoad: {start: 0, limit: 35},
    
    proxy: {
        type: 'ajax',
        api: {
        	read : 'bulksms/view.htm',
            create : 'bulksms/create.htm',
            update: 'bulksms/update.htm',
            destroy: 'bulksms/delete.htm'
        },
        reader: {
            type: 'json',
            root: 'data',
            successProperty: 'success'
        },
        writer: {
            type: 'json',
            writeAllFields: true,
            encode: false,
            root: 'data'
        },
        listeners: {
            exception: function(proxy, response, operation){
                Ext.MessageBox.show({
                    title: 'REMOTE EXCEPTION',
                    msg: operation.getError(),
                    icon: Ext.MessageBox.ERROR,
                    buttons: Ext.Msg.OK
                });
            }
        }
    }
});