Ext.require(['*']);
Ext.onReady(function() {

    

    var viewport = Ext.create('Ext.Viewport',{
           layout:'border',
	frame:false,
         renderTo:'document.body',
           

      
            
		
            bodyCls:'login-side-page',
        
        items: [
                { bodyCls:'login-side-page',
                    xtype: 'panel',
                    stretch:true,
                    region:'west',
                   // height: 710,
                    width: 367,
                    border:false,
                  //  autoScroll:true, 
                  
                
                layout: {
                        type: 'absolute'
                    },

                //   bodyCls:'admin-console-text',
                    items: [

                           
			{  
                            xtype: 'label',
                            x: 150,
                            y: 10,
                            height: 20,
                            width: 150,
                            text: 'Enterprise Mobility',
                            

			},
			{
                           
                           xtype: 'label',
                            x: 150,
                            y: 30,
                            height: 20,
                            width: 150,
                            text: 'Administration Console'
			},
                        {
                            xtype: 'image',
                            x: 100,
                            y: 200,
                            src:'mimages/login/logo_moadbus.png'
                        },
                        {
                            xtype: 'image',
                            x: 90,
                            y: 290,
                            src:'mimages/login/keys_@2x.png'
                        }]
                 

                },
                {
                    xtype: 'panel',
                    region:'center',
                                      
                      collapsible: false,
                      autoScroll:true,        
             
                  border:false,
                    bodyStyle: 'background-image:url(mimages/login/pattern_bg_central_@2x.png)',

                   // x: 310,
                    //y: 0,
                   // height: 710,
                   // width: 970,
                    
                    layout: {
                        type: 'absolute'
                    },
                    items: [
                        {
                            xtype: 'textfield',
                            x: 50,
                            y: 300,
                            emptyText: 'Username'
                        },
                        {
                            xtype: 'textfield',
				inputType : 'password',
                            x: 190,
                            y: 300,
                            emptyText: 'Password'
                        },
                        {
                            xtype: 'textfield',
                            x: 50,
                            y: 330,
                            width: 270,
                            emptyText: 'What is the name of your favourite pet?'
                        },
                        {
                           
	                    xtype:'button', 
	                    text: 'Login',
                            x: 340,
                            y: 300,
	                    handler: function() {
	                         Ext.Msg.alert('Success', 'Login Successful!')
                                window.location='menu.html';
	                    }
                       
                           
                        },
                        {
                            xtype: 'label',
                            x: 50,
                            y: 500,
                            height: 20,
                            width: 150,
                            text: 'Forgot your password?'
                        }
                    ]

               }
            ]
               
               
	
		
			
    });
});