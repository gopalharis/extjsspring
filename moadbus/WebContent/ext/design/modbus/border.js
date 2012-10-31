Ext.require(['*']);
Ext.onReady(function() {
    var cw;

    function closeRegion (e, target, header, tool) {
        var region = header.ownerCt;
        newRegions.unshift(region.initialConfig);
        viewport.remove(region);
    }

	Ext.define('Company', {
    extend: 'Ext.data.Model',
    fields: [
       {name: 'company'},
       {name: 'price',      type: 'float', convert: null,     defaultValue: undefined},
       {name: 'change',     type: 'float', convert: null,     defaultValue: undefined},
       {name: 'pctChange',  type: 'float', convert: null,     defaultValue: undefined},
       {name: 'lastChange', type: 'date',  dateFormat: 'n/j h:ia', defaultValue: undefined}
    ],
    idProperty: 'company'
});

var myData = [
        ['3m Co',                               71.72, 0.02,  0.03,  '9/1 12:00am'],
        ['Alcoa Inc',                           29.01, 0.42,  1.47,  '9/1 12:00am'],
        ['Altria Group Inc',                    83.81, 0.28,  0.34,  '9/1 12:00am'],
        ['American Express Company',            52.55, 0.01,  0.02,  '9/1 12:00am'],
        ['American International Group, Inc.',  64.13, 0.31,  0.49,  '9/1 12:00am'],
        ['AT&T Inc.',                           31.61, -0.48, -1.54, '9/1 12:00am'],
        ['Boeing Co.',                          75.43, 0.53,  0.71,  '9/1 12:00am'],
        ['Caterpillar Inc.',                    67.27, 0.92,  1.39,  '9/1 12:00am'],
        ['Citigroup, Inc.',                     49.37, 0.02,  0.04,  '9/1 12:00am']]
		
		 var store = Ext.create('Ext.data.ArrayStore', {
        model: 'Company',
        data: myData
    });
	
	var grid = Ext.create('Ext.grid.Panel', {
        store: store,
		border:false,
		frame:false,
        columns: [
            {
                text     : 'User',
                flex     : 1,
                sortable : false,
                dataIndex: 'company'
            },
			],
			viewConfig: {
            stripeRows: true,
            enableTextSelection: true
        }
		});
		
		
		var ImageModel = Ext.define('ImageModel', {
        extend: 'Ext.data.Model',
        fields: [
           {name: 'name'},
           {name: 'url'},
           {name: 'size', type: 'float'},
           {name:'lastmod', type:'date', dateFormat:'timestamp'}
        ]
    });

	var desktopData=[
		["My Alarms","mimages/right/alarm.png",2901,1349123253000],
		["My Messages","mimages/right/message.png",2901,1349123253000],
		["My Profile","mimages/right/profile.png",2901,1349123253000],
		["Print Reports","mimages/right/print.png",2901,1349123253000],
	];
     var deskTopStore = Ext.create('Ext.data.ArrayStore', {
        model: 'ImageModel',
        data: desktopData
    });
	
	
    deskTopStore.load();
	
	
	var desktopItems=Ext.create('Ext.Panel', {
        id: 'images-view',
		border:false,
		frame:false,
		//autoScroll:true,
		bodyCls:'transparent-body',
        items: Ext.create('Ext.view.View', {
            store: deskTopStore,
            tpl: [
                '<tpl for=".">',
                    '<div class="thumb-wrap" id="{name:stripTags}">',
                        '<div class="thumb"><img src="{url}" title="{name:htmlEncode}"></div>',
                        '<span class="x-editable">{shortName:htmlEncode}</span>',
                    '</div>',
                '</tpl>',
                '<div class="x-clear"></div>'
            ],
            height: 310,
			columnWidth:0.5,
            trackOver: true,
            overItemCls: 'x-item-over',
            itemSelector: 'div.thumb-wrap',
            emptyText: 'No images to display',
            prepareData: function(data) {
                Ext.apply(data, {
                    shortName: Ext.util.Format.ellipsis(data.name, 15),
                    sizeString: Ext.util.Format.fileSize(data.size),
                    dateString: Ext.util.Format.date(data.lastmod, "m/d/Y g:i a")
                });
                return data;
            },
            listeners: {
                
            }
        })
    });
	
	
	
	var centerWindows=[
		{
			
			bodyCls:'workarea-background',
			id:'actBySec',
			//xtype:'window',
			header:{
				cls:'workarea-background',
				border:false,
				hidden:true,
				frame:false
			},
			columnWidth:0.5,
			height: 260	,
			tools:[{
				type:'maximize',
				tooltip: 'Maximize',
				id:'btn-max-act-sec',
				hidden:true,
				handler: function(event, toolEl, panel){
					// refresh logic
				}
			},
			{
				type:'minimize',
				tooltip: 'Minnimize',
				id:'btn-min-act-sec',
				hidden:true,
				handler: function(event, toolEl, panel){
					// show help here
				}
			},
			{
				type:'close',
				tooltip: 'Close',
				id:'btn-close-act-sector',
				hidden:true,
				handler: function(event, toolEl, panel){
					// show help here
				}
			}],
			listeners:{
				afterrender:function(){
					this.el.on('mouseover',function(){
						Ext.getCmp('actBySec').getHeader().show();
						Ext.getCmp('btn-close-act-sector').show();
						Ext.getCmp('btn-min-act-sec').show();
						Ext.getCmp('btn-max-act-sec').show();
						
						
					});
					this.el.on('mouseout',function(){
						Ext.getCmp('actBySec').getHeader().hide();
						Ext.getCmp('btn-close-act-sector').hide();
						Ext.getCmp('btn-min-act-sec').hide();
						Ext.getCmp('btn-max-act-sec').hide();
						
						
					});
					//this.getHeader().hide();
				}
			
			},
			//width: 420,
			layout: 'anchor',
					items: [{border:false,padding:2, frame:false,html:'<div class="activity-by-sector-text">Activity By Sector</div>',bodyCls:'workarea-background',anchor:'100% 30%'},{  // Let's put an empty grid in just to illustrate fit layout
						xtype: 'image',
						anchor:'100% 70%',
						padding:3,
						src:'mimages/map.png'
					}]
		},
		{
			title: 'My Desktop',
			id:'myDeskTop',
			header:{
				cls:'user-activity-background',
				border:false,
				height:30,
				frame:false
			},
			bodyCls:'my-desktop-background',
			//xtype:'window',
			columnWidth:0.5,
			height: 260,
			height: 260	,
			
			layout: 'fit',
					items: desktopItems
		},
		{
			bodyCls:'workarea-background',
			id:'networkUsage',
			//xtype:'window',
			header:{
				cls:'workarea-background',
				border:false,
				hidden:true,
				frame:false
			},
			columnWidth:0.5,
			height: 220	,
			tools:[{
				type:'maximize',
				tooltip: 'Maximize',
				id:'btn-max-act-net',
				hidden:true,
				handler: function(event, toolEl, panel){
					// refresh logic
				}
			},
			{
				type:'minimize',
				id:'btn-min-act-net',
				tooltip: 'Minnimize',
				hidden:true,
				handler: function(event, toolEl, panel){
					// show help here
				}
			},
			{
				type:'close',
				tooltip: 'Close',
				id:'btn-close-act-net',
				hidden:true,
				handler: function(event, toolEl, panel){
					// show help here
				}
			}],
			listeners:{
				afterrender:function(){
					this.el.on('mouseover',function(){
					Ext.getCmp('networkUsage').getHeader().show();
						Ext.getCmp('btn-close-act-net').show();
						Ext.getCmp('btn-min-act-net').show();
						Ext.getCmp('btn-max-act-net').show();
					});
					this.el.on('mouseout',function(){
					Ext.getCmp('networkUsage').getHeader().hide();
						Ext.getCmp('btn-close-act-net').hide();
						Ext.getCmp('btn-min-act-net').hide();
						Ext.getCmp('btn-max-act-net').hide();
					});
				}
			
			},
			//width: 420,
			layout: 'anchor',
			
			items: [{border:false,padding:2, frame:false,html:'<div class="activity-by-sector-text">Network Usage</div>',bodyCls:'workarea-background',anchor:'100% 30%'},{  // Let's put an empty grid in just to illustrate fit layout
						xtype: 'image',
						anchor:'100% 70%',
						padding:1,
						src:'mimages/uses.png'
					}]
		},
		{
			title: 'User Activity',
			id:'userActivity',
			header:{
				cls:'user-activity-background',
				border:false,
				height:30,
				frame:false
			},
			//xtype:'window',
			columnWidth:0.5,
			//height: 200,
			listeners:{
				
			
			},
			height: 220	,
			layout: 'fit',
					items: grid
		}
	]

    var viewport = Ext.create('Ext.Viewport', {
		id:'aplication-body',
        layout: {
            type: 'border',
            padding: 2
        },
		defaults:{
			bodyCls:'transparent-body',
			border:false,
			frame:false
			},
			border:false,
			frame:false,
        items: [{
            region: 'north',
            collapsible: false,
            split: true,			
            height: 60,
			bodyCls:'header-bg',
			layout:{
				type: 'border',
				padding: 0
			},
			defaults:{
			bodyCls:'transparent-body',
			border:false,
			frame:false
			},
            minHeight: 60,
			items:[
				{
					region: 'west',
					width:'50%',
					layout:{
							type: 'hbox',
							align: 'stretch'
						},
					bodyCls:'transparent-body',
					items:[{xtype:'image',
							padding: '5 0 0 5',width:130,height:40,src:'mimages/login/logo_moadbus.png'},
							{flex: 1,bodyCls:'transparent-body logo-caption-text',border:false,style:'padding-top:35px;',height:18,html:'The Next Generation of Banking Solutions'}]
				},
				{
				bodyCls:'transparent-body admin-console-text right-text-align',
				region: 'east',width:'100%',padding:2,html:'<div class="padding3">Enterprise Mobility</div><div>Administration Console</div>'
				}
			]
        },
		{
			region:'south',
			id:'footer',
			height:30
		},
		{
			region:'west',
			split:true,
			collapsible:true,
			collapseDirection:'top',
			collapseMode:'mini',
			hideCollapseTool:true,
			bodyCls:'left-menu-background',
			header:false,
			width:246,		
			layout:'fit',	
			border:false,
			frame:false,
			items:[
			
				Ext.create('Ext.panel.Panel', {
				title: 'Mobile Application Setup',
				id:'navigationMenu',
				header:{
					cls:'user-navigation-background',
					border:false,
					height:50,
					frame:false
				},
				layout:'accordion',
				bodyCls:'left-menu-background',
				border:false,
				frame:false,
				padding:'10 0 0 0 ',
				defaults: {
					// applied to each contained panel
					bodyStyle: 'padding:15px',
					hideCollapseTool:true,
					bodyCls:'left-menu-background',
					border:false,
					frame:false,
					header:{height:35,border:false,frame:false,overCls:'accordion-over-cls',}
				},
				layoutConfig: {
					// layout-specific configs go here
					titleCollapse: false,
					animate: true,
					activeOnTop: true
				},
				items: [{
					title: 'Application',
					id:'l-nav-application',
					header:{
					cls:'nav-accordion-header',
					overCls:'accordion-over-cls',
					//border:false,
					height:35,
					border:false,frame:false
					},
					bodyCls:'left-menu-background',
					iconCls:'left-menu-application',
					html: 'Panel content!'
				},{
					title: 'Branding',
					bodyCls:'left-menu-background',
					iconCls:'left-menu-branding',
					html: 'Panel content!'
				},{
					title: 'Language Support',
					bodyCls:'left-menu-background',
					iconCls:'left-menu-language',
					html: 'Panel content!'
				}
				,{
					title: 'Payments',
					bodyCls:'left-menu-background',
					iconCls:'left-menu-payments',
					html: 'Panel content!'
				},
				{
					title: 'Supported Themes',
					iconCls:'left-menu-themes',
					html: 'Panel content!'
				},
				{
					title: 'Toolbar',
					iconCls:'left-menu-toolbar',
					html: 'Panel content!'
				},
				{
					title: 'Shopping',
					iconCls:'left-menu-shopping',
					html: 'Panel content!'
				},
				{
					title: 'Miscellaneous',
					iconCls:'left-menu-miscellaneous',
					html: 'Panel content!'
				}
				]
			})

		],
		frame:false,
		listeners: {
				  afterrender: function(){
					   //this.layout.splitters.west.setWidth(30);
					   //this.doLayout();
					}
				}
		},
		/*{
			region:'east',	
			id:'rightbar',
			split:true,
			width:150,			
			border:true,
			frame:true,
		},*/
		{				region:'center',
						autoScroll:true,
						layout:'column',
						columns:2,
						defaults:{border:false,frame:false,padding:5},
						items:centerWindows,
						bodyCls:'workarea-background',
						id:'modBusApplication',
						border:false,
							showAppPopup:function(menu){
								Ext.example.msg('Button Click', 'You clicked the {0} button', menu);
							},
							frame:false,
			dockedItems: [{
							xtype: 'toolbar',
							border:'false',
							frame:'false',
							id:'toolbar-menu',
							enableOverflow:true,
							layout: {
								overflowHandler: 'Menu'
							},
							dock: 'top',
							items: [
								{ xtype: 'button', handler :function(){Ext.getCmp('modBusApplication').showAppPopup(this.getText( ));},id:'b-user',text: 'User Security',toggleGroup:'tm-tg',enableToggle: true,iconAlign: 'top',scale: 'large',iconCls:'toolbar-menu-user' },
								{ xtype: 'button', id:'b-acc',text: 'Account Definitions',toggleGroup:'tm-tg',enableToggle: true,iconAlign: 'top',scale: 'large',iconCls:'toolbar-menu-account' },
								{ xtype: 'button', id:'b-device',text: 'Device Settiings',toggleGroup:'tm-tg',enableToggle: true,iconAlign: 'top',scale: 'large',iconCls:'toolbar-menu-device' },
								{ xtype: 'button', id:'b-audit',text: 'Audit Trail',toggleGroup:'tm-tg',enableToggle: true,iconAlign: 'top',scale: 'large',iconCls:'toolbar-menu-audit' },
								{ xtype: 'button', id:'b-sms',text: 'Simple SMS Setup',toggleGroup:'tm-tg',enableToggle: true,iconAlign: 'top',scale: 'large',iconCls:'toolbar-menu-sms' },
								{ xtype: 'button', id:'b-atm',text: 'Branch & ATM Locator',toggleGroup:'tm-tg',enableToggle: true,iconAlign: 'top',scale: 'large',iconCls:'toolbar-menu-branch' },
								{ xtype: 'button', id:'b-pass',text: 'Manage Digipass',toggleGroup:'tm-tg',enableToggle: true,iconAlign: 'top',scale: 'large',iconCls:'toolbar-menu-digipass' },
								{ xtype: 'button', id:'b-alert',text: 'Alert Preferences',toggleGroup:'tm-tg',enableToggle: true,iconAlign: 'top',scale: 'large',iconCls:'toolbar-menu-alert' },
								'->',
								{ xtype: 'button', id:'b-console',text: 'Error Console',toggleGroup:'tm-tg',enableToggle: true,iconAlign: 'top',scale: 'large',iconCls:'toolbar-menu-console' },
								{ xtype: 'button', id:'b-security',text: 'Logout',toggleGroup:'tm-tg',enableToggle: true,iconAlign: 'top',scale: 'large',iconCls:'toolbar-menu-login' }
								
								
							]
						}]
		}
		]
    });
});