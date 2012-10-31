Ext.require([ '*' ]);

// FIXME: pass id to listeners with proper property

var menus = [];

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

var toolBar = Ext.create('Ext.toolbar.Toolbar', {
	border : 'false',
	frame : 'false',
	id : 'toolbar-menu',
	enableOverflow : true,
	layout : {
		overflowHandler : 'Menu'
	},
	dock : 'top',
	items : []
});

var startMenuModuleItems = Ext.create('Ext.menu.Menu', {
	floating : false, // usually you want this set to True (default)
	items : []
});

Ext
		.onReady(function() {

			Ext.Ajax.timeout = 90000;
			showMask();
			Ext.Ajax.request({
				url : '/emconsole/user/menus.htm',
				success : function(response) {

					var menuItems = Ext.decode(response.responseText);
					for ( var i = 0; i < menuItems.length; i++) {
						this.menuId = menuItems[i].menuId;
						startMenuModuleItems.items.add(Ext.create(
								'Ext.menu.Item', {
									text : menuItems[i].menuLabel,
									iconcls : menuItems[i].menuId,
									listeners : {
										click : function(source, event) {
											loadTopMenus(source);
											/*startMenuModuleItems.on('deactivate', function () {
												startMenuModuleItems.hide();
										        });*/
										},
									
										scope : this
									},
									icon : 'mimages/' + menuItems[i].image
								}));
					}
					
					startMenu.doLayout();
					hideMask();
				},
				failure : function(response) {
					hideMask();
					window.location = '/emconsole/index.jsp';
				}
			});

			function loadTopMenus(source) {
				Ext.Ajax.request({
					url : '/emconsole/user/submenus.htm',
					method : 'GET',
					params : {
						menuId : source.iconcls
					},
					success : function(response) {
						
						var menuItems = Ext.decode(response.responseText);
						toolBar.removeAll();
						for ( var i = 0; i < menuItems.length; i++) {
							toolBar.items.add(Ext.create('Ext.button.Button', {
								text : menuItems[i].menuLabel,
								iconcls : menuItems[i].menuId,
								listeners : {
									click : function(button, event) {
										loadLeftMenus(button)
									}
								},
								toggleGroup : 'tm-tg',
								enableToggle : true,
								iconAlign : 'top',
								scale : 'large',
								icon : 'mimages/' + menuItems[i].image,
								border : false

							}));
							
							
						}
						
						//toolBar.items.add(new Ext.Toolbar.Fill());
						
						toolBar.items.add(Ext.create('Ext.button.Button',{
							id : 'b-console',
							text : text.errorconsole,
							toggleGroup : 'tm-tg',
							enableToggle : true,
							iconAlign : 'top',
							scale : 'large',
							iconCls : 'toolbar-menu-console',
						}));
						
						toolBar.items.add(Ext.create('Ext.button.Button',{
							id : 'b-security',
							text : text.logout,
							toggleGroup : 'tm-tg',
							enableToggle : true,
							iconAlign : 'top',
							scale : 'large',
							iconCls : 'toolbar-menu-login',
							listeners : {
								click : function(source, event) {
									window.location='/emconsole/index.jsp';
								},
							}
						}));
						
						toolBar.doLayout();
					},
					failure : function(response) {
						// window.location = '/emsconsole/index.html';
					}
				});
			}

			function loadLeftMenus(button) {
				showMask();
				Ext.Ajax.request({
					url : '/emconsole/user/leftmenus.htm',
					method : 'GET',
					params : {
						menuId : button.iconcls
					},
					success : function(response) {

						var leftMenuBar = Ext.create('Ext.panel.Panel', {
							title : button.text,
							id : 'navigationMenu',
							header : {
								cls : 'user-navigation-background',
								border : false,
								height : 50,
								frame : false
							},
							layout : 'accordion',
							bodyCls : 'left-menu-background',
							border : false,
							frame : false,
							padding : '10 0 0 0 ',
							defaults : {
								// applied to each contained panel
								bodyStyle : 'padding:15px',
								hideCollapseTool : true,
								bodyCls : 'left-menu-background',
								border : false,
								frame : false,
								header : {
									height : 35,
									border : false,
									frame : false,
									overCls : 'accordion-over-cls',
								}
							},
							layoutConfig : {
								// layout-specific configs go here
								titleCollapse : false,
								animate : true,
								activeOnTop : true
							},
							items : [

							]
						});

						var navRegion = {
							region : 'west',
							split : true,
							id : 'leftMenuContainer',
							collapsible : true,
							collapseDirection : 'top',
							collapseMode : 'mini',
							hideCollapseTool : true,
							bodyCls : 'left-menu-background',
							header : false,
							width : 246,
							layout : 'fit',
							border : false,
							frame : false,
							items : [ leftMenuBar ],
							frame : false,
							listeners : {
								afterrender : function() {
									// this.layout.splitters.west.setWidth(30);
									// this.doLayout();
								}
							}
						};
						// Ext.getCmp('aplication-body').removeAll();
						Ext.getCmp('aplication-body').add(navRegion);

						var navBar = Ext.getCmp('navigationMenu');
						navBar.removeAll();
						var menuItems = Ext.decode(response.responseText);
						for ( var i = 0; i < menuItems.length; i++) {

							navBar.add({
								title : menuItems[i].menuLabel,
								bodyCls : 'left-menu-background',
								html : 'Panel content!',
								icon : 'mimages/' + menuItems[i].image
							});

						}

						navBar.doLayout();
						hideMask();

					},
					failure : function(response) {
						hideMask();
					}
				});
			}

			function closeRegion(e, target, header, tool) {
				var region = header.ownerCt;
				newRegions.unshift(region.initialConfig);
				viewport.remove(region);
			}

			Ext.define('Company', {
				extend : 'Ext.data.Model',
				fields : [ {
					name : 'company'
				}, {
					name : 'price',
					type : 'float',
					convert : null,
					defaultValue : undefined
				}, {
					name : 'change',
					type : 'float',
					convert : null,
					defaultValue : undefined
				}, {
					name : 'pctChange',
					type : 'float',
					convert : null,
					defaultValue : undefined
				}, {
					name : 'lastChange',
					type : 'date',
					dateFormat : 'n/j h:ia',
					defaultValue : undefined
				} ],
				idProperty : 'company'
			});

			var myData = [
					[ '3m Co', 71.72, 0.02, 0.03, '9/1 12:00am' ],
					[ 'Alcoa Inc', 29.01, 0.42, 1.47, '9/1 12:00am' ],
					[ 'Altria Group Inc', 83.81, 0.28, 0.34, '9/1 12:00am' ],
					[ 'American Express Company', 52.55, 0.01, 0.02,
							'9/1 12:00am' ],
					[ 'American International Group, Inc.', 64.13, 0.31, 0.49,
							'9/1 12:00am' ],
					[ 'AT&T Inc.', 31.61, -0.48, -1.54, '9/1 12:00am' ],
					[ 'Boeing Co.', 75.43, 0.53, 0.71, '9/1 12:00am' ],
					[ 'Caterpillar Inc.', 67.27, 0.92, 1.39, '9/1 12:00am' ],
					[ 'Citigroup, Inc.', 49.37, 0.02, 0.04, '9/1 12:00am' ] ]

			var store = Ext.create('Ext.data.ArrayStore', {
				model : 'Company',
				data : myData
			});

			var grid = Ext.create('Ext.grid.Panel', {
				store : store,
				border : false,
				frame : false,
				columns : [ {
					text : text.user,
					flex : 1,
					sortable : false,
					dataIndex : 'company'
				}, ],
				viewConfig : {
					stripeRows : true,
					enableTextSelection : true
				}
			});

			var ImageModel = Ext.define('ImageModel', {
				extend : 'Ext.data.Model',
				fields : [ {
					name : 'name'
				}, {
					name : 'url'
				}, {
					name : 'size',
					type : 'float'
				}, {
					name : 'lastmod',
					type : 'date',
					dateFormat : 'timestamp'
				} ]
			});

			var startMenu = Ext.create('widget.window', {
				height : 200,
				width : 400,
				id : 'startMenu',
				closeAction : 'hide',
				// header:false,
				headerPosition : 'right',
				frame : false,
				border : false,
				closable : true,
				plain : true,
				layout : 'fit',
				items : [ {
					title : text.modules,
					layout : 'fit',
					border : false,
					frame : false,
					id : 'startModules',
					header : {
						cls : 'user-activity-background',
						border : false,
						height : 30,
						frame : false
					},
					items : [ startMenuModuleItems ]
				} ],
				dockedItems : [ {
					xtype : 'toolbar',
					dock : 'right',
					items : [ {
						xtype : 'label',
						width : 100,
						text : text.settings,
						icon : 'mimages/settings.jpg',
						padding : '2 5 1 0'
					}, {
						xtype : 'tbseparator',
						width : 100,
					}, {
						text : text.languages,
						icon : 'mimages/lang.jpg',
						width : 30
					}, {
						text : text.themes,
						icon : 'mimages/theme.jpg',
						width : 10
					} ]
				} ]

			});
			var desktopData = [
					[ "My Alarms", "mimages/right/alarm.png", 2901,
							1349123253000 ],
					[ "My Messages", "mimages/right/message.png", 2901,
							1349123253000 ],
					[ "My Profile", "mimages/right/profile.png", 2901,
							1349123253000 ],
					[ "Print Reports", "mimages/right/print.png", 2901,
							1349123253000 ], ];
			var deskTopStore = Ext.create('Ext.data.ArrayStore', {
				model : 'ImageModel',
				data : desktopData
			});

			deskTopStore.load();

			var desktopItems = Ext
					.create(
							'Ext.Panel',
							{
								id : 'images-view',
								border : false,
								frame : false,
								// autoScroll:true,
								bodyCls : 'transparent-body',
								items : Ext
										.create(
												'Ext.view.View',
												{
													store : deskTopStore,
													tpl : [
															'<tpl for=".">',
															'<div class="thumb-wrap" id="{name:stripTags}">',
															'<div class="thumb"><img src="{url}" title="{name:htmlEncode}"></div>',
															'<span class="x-editable">{shortName:htmlEncode}</span>',
															'</div>', '</tpl>',
															'<div class="x-clear"></div>' ],
													height : 310,
													columnWidth : 0.5,
													trackOver : true,
													overItemCls : 'x-item-over',
													itemSelector : 'div.thumb-wrap',
													emptyText :text.noimage,
													prepareData : function(data) {
														Ext
																.apply(
																		data,
																		{
																			shortName : Ext.util.Format
																					.ellipsis(
																							data.name,
																							15),
																			sizeString : Ext.util.Format
																					.fileSize(data.size),
																			dateString : Ext.util.Format
																					.date(
																							data.lastmod,
																							"m/d/Y g:i a")
																		});
														return data;
													},
													listeners : {

													}
												})
							});

			var centerWindows = [ {
				xtype : 'container',

				height : 500,
				layout : {
					type : 'table',
					columns : 4,
					align : 'stretch'
				},
				defaults : {
					bodyStyle : 'padding:10px'
				},
				items : [
						{
							title : 'Recovery Management System',
							id:'myDeskTop1',
							collapsible : true,
							header : {
								cls : 'user-activity-background',
								border : false,
								height : 30,
								frame : false
							},
							bodyCls : 'my-desktop-background',
							// xtype:'window',
							// scolumnWidth:0.5,
							height : 200,
							width : 275,
							layout : 'vbox',
							items : [ {
								xtype : 'image',
								anchor : '100% 70%',
								padding : 3,
								src : 'mimages/right/alarm.png',

							}, {
								border : false,
								padding : 2,
								frame : false,
								html : '<div class="many-window">RMS</div>',
								bodyCls : 'workarea-background',
								anchor : '100% 30%'
							}, ]

						},

						{
							title : 'Spartan IDW Queue',
							collapsible : true,
							id:'myDeskTop2',
							header : {
								cls : 'user-activity-background',
								border : false,
								height : 30,
								frame : false
							},
							bodyCls : 'my-desktop-background',
							// xtype:'window',
							columnWidth : 0.5,
							height : 200,
							width : 275,

							layout : 'vbox',
							items : [ {
								xtype : 'image',

								anchor : '100% 70%',
								padding : 3,
								src : 'mimages/right/message.png',

							}, {
								border : false,
								padding : 2,
								frame : false,
								html : '<div class="many-window">IDW</div>',
								bodyCls : 'workarea-background',
								anchor : '100% 30%'
							}, ]
						},
						{
							title : 'Dashboard',
							id:'myDeskTop3',
							collapsible : true,
							header : {
								cls : 'user-activity-background',
								border : false,
								height : 30,
								frame : false
							},
							bodyCls : 'my-desktop-background',
							// xtype:'window',
							columnWidth : 0.5,
							height : 200,
							width : 275,

							layout : 'vbox',
							items : [
									{
										xtype : 'image',

										anchor : '100% 70%',
										padding : 3,
										src : 'mimages/right/print.png',

									},
									{
										border : false,
										padding : 2,
										frame : false,
										html : '<div class="many-window">Dasboard</div>',
										bodyCls : 'workarea-background',
										anchor : '100% 30%'
									}, ]
						},
						{
							title : 'Create Referral',
							collapsible : true,
							id:'myDeskTop4',
							header : {
								cls : 'user-activity-background',
								border : false,
								height : 30,
								frame : false
							},
							bodyCls : 'my-desktop-background',
							// xtype:'window',
							columnWidth : 0.5,
							height : 200,
							width : 275,
							layout : 'vbox',
							items : [
									{
										xtype : 'image',

										anchor : '100% 70%',
										padding : 3,
										src : 'mimages/right/profile.png',

									},
									{
										border : false,
										padding : 2,
										frame : false,
										html : '<div class="many-window">Create Referral</div>',
										bodyCls : 'workarea-background',
										anchor : '100% 30%'
									}, ]
						},
						{
							title : 'Diary',
							collapsible : true,
							 id:'myDeskTop5',
							header : {
								cls : 'user-activity-background',
								border : false,
								height : 30,
								frame : false
							},
							bodyCls : 'my-desktop-background',
							// xtype:'window',
							columnWidth : 0.5,
							height : 200,
							width : 275,

							layout : 'vbox',
							items : [ {
								xtype : 'image',

								anchor : '100% 70%',
								padding : 3,
								src : 'mimages/right/message.png',

							}, {
								border : false,
								padding : 2,
								frame : false,
								html : '<div class="many-window">Diary</div>',
								bodyCls : 'workarea-background',
								anchor : '100% 30%'
							}, ]
						},
						{
							title : 'Message',
							collapsible : true,
							id:'myDeskTop6',
							header : {
								cls : 'user-activity-background',
								border : false,
								height : 30,
								frame : false
							},
							bodyCls : 'my-desktop-background',
							// xtype:'window',
							columnWidth : 0.5,
							height : 200,
							width : 275,

							layout : 'vbox',
							items : [
									{
										xtype : 'image',

										anchor : '100% 70%',
										padding : 3,
										src : 'mimages/right/alarm.png',

									},
									{
										border : false,
										padding : 2,
										frame : false,
										html : '<div class="many-window">Message</div>',
										bodyCls : 'workarea-background',
										anchor : '100% 30%'
									}, ]
						},

						{
							title : 'Evidence Log',
							collapsible : true,
							id:'myDeskTop7',
							header : {
								cls : 'user-activity-background',
								border : false,
								height : 30,
								frame : false
							},
							bodyCls : 'my-desktop-background',
							// xtype:'window',
							columnWidth : 0.5,
							height : 200,
							width : 275,

							layout : 'vbox',
							items : [
									{
										xtype : 'image',

										anchor : '100% 70%',
										padding : 3,
										src : 'mimages/right/print.png',

									},
									{
										border : false,
										padding : 2,
										frame : false,
										html : '<div class="many-window">Evidence Log</div>',
										bodyCls : 'workarea-background',
										anchor : '100% 30%'
									}, ]
						},
						{
							title : 'Admin Tool',
							collapsible : true,
							id:'myDeskTop8',
							header : {
								cls : 'user-activity-background',
								border : false,
								height : 30,
								frame : false
							},
							bodyCls : 'my-desktop-background',
							// xtype:'window',
							columnWidth : 0.5,
							height : 200,
							width : 275,
							layout : 'vbox',
							items : [
									{
										xtype : 'image',

										anchor : '100% 70%',
										padding : 3,
										src : 'mimages/right/message.png',

									},
									{
										border : false,
										padding : 2,
										frame : false,
										html : '<div class="many-window">Admin Tool</div>',
										bodyCls : 'workarea-background',
										anchor : '100% 30%'
									}, ]
						},
						{
							title : 'Internal Report',
							collapsible : true,
							id:'myDeskTop9',
							header : {
								cls : 'user-activity-background',
								border : false,
								height : 30,
								frame : false
							},
							bodyCls : 'my-desktop-background',
							// xtype:'window',
							columnWidth : 0.5,
							height : 200,
							width : 275,

							layout : 'vbox',
							items : [
									{
										xtype : 'image',

										anchor : '100% 70%',
										padding : 3,
										src : 'mimages/right/alarm.png',

									},
									{
										border : false,
										padding : 2,
										frame : false,
										html : '<div class="many-window">Internal Report</div>',
										bodyCls : 'workarea-background',
										anchor : '100% 30%'
									}, ]
						},
						{
							title : 'Client Report',
							collapsible : true,
							id:'myDeskTop10',
							header : {
								cls : 'user-activity-background',
								border : false,
								height : 30,
								frame : false
							},
							bodyCls : 'my-desktop-background',
							// xtype:'window',
							columnWidth : 0.5,
							height : 200,
							width : 275,

							layout : 'vbox',
							items : [
									{
										xtype : 'image',

										anchor : '100% 70%',
										padding : 3,
										src : 'mimages/right/print.png',

									},
									{
										border : false,
										padding : 2,
										frame : false,
										html : '<div class="many-window">Client Report</div>',
										bodyCls : 'workarea-background',
										anchor : '100% 30%'
									}, ]
						},

				]
			} ]

			var viewport = Ext
					.create(
							'Ext.Viewport',
							{
								
								id : 'aplication-body',
								layout : {
									type : 'border',
									padding : 2
								},
								defaults : {
									bodyCls : 'transparent-body',
									border : false,
									frame : false
								},
								border : false,
								frame : false,
								items : [
										{
											region : 'north',
											collapsible : false,
											split : true,
											height : 60,
											bodyCls : 'header-bg',
											layout : {
												type : 'border',
												padding : 0
											},
											defaults : {
												bodyCls : 'transparent-body',
												border : false,
												frame : false
											},
											minHeight : 60,
											items : [
													{
														region : 'west',
														width : '50%',
														layout : {
															type : 'hbox',
															align : 'stretch'
														},
														bodyCls : 'transparent-body',
														items : [
																{
																	xtype : 'image',
																	padding : '5 0 0 5',
																	width : 130,
																	height : 40,
																	src : 'mimages/login/logo_moadbus.png'
																},
																{
																	flex : 1,
																	bodyCls : 'transparent-body logo-caption-text',
																	border : false,
																	style : 'padding-top:35px;',
																	height : 18,
																	html : text.nextgeneration
																} ]
													},
													{
														bodyCls : 'transparent-body admin-console-text right-text-align',
														region : 'east',
														width : '100%',
														padding : 2,
														html : '<div class="padding3">'+text.enterprise+'</div><div>'+text.adminconsole+'</div>'
													} ]
										},
										{
											region : 'south',
											id : 'footer',
											height : 45,
											xtype : 'toolbar',
											items : {
												text : text.start,
												scale : 'large',
												border : '1',
												icon : 'mimages/start-button.jpg',
												handler : function() {
													var smenuPos = Ext.getCmp(
															'footer')
															.getPosition();
													// var
													// windowHeight=Ext.getCmp('startMenu').getHeight();
													startMenu.showAt(
															smenuPos[0] + 2,
															smenuPos[1] - 200);

												}
											}
										},
										/*
										 * { region:'east', id:'rightbar',
										 * split:true, width:150, border:true,
										 * frame:true, },
										 */
										{
											region : 'center',
											autoScroll : true,
											layout : 'column',
											columns : 2,
											defaults : {
												border : false,
												frame : false,
												padding : 5
											},
											items : centerWindows,
											bodyCls : 'workarea-background',
											id : 'modBusApplication',
											border : false,
											showAppPopup : function(menu) {
												Ext.example
														.msg(
																'Button Click',
																'You clicked the {0} button',
																menu);
											},
											frame : false,
											dockedItems : [ toolBar ]
										} ]

						       
							});
			

		});