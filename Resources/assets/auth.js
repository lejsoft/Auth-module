!function(e){var t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="/",r(r.s=0)}([function(e,t,r){e.exports=r(1)},function(e,t,r){r(2),r(3)},function(e,t){Ext.define("Auth.Login",{extend:"Ext.window.Window",xtype:"xLogin",title:"Login",bodyPadding:10,width:320,closable:!1,autoShow:!0,resizable:!1,draggable:!1,urlLogin:Cfg.api("auth/login"),formLogin:null,constructor:function(){this.createFormLogin(),this.items=[this.formLogin],this.callParent()},createFormLogin:function(){this.formLogin=Ext.create({xtype:"form",reference:"form",bodyStyle:"background:transparent;",defaultType:"textfield",border:!1,items:[{name:"username",fieldLabel:"Email",allowBlank:!1,emptyText:"Email"},{name:"password",inputType:"password",fieldLabel:"Password",allowBlank:!1,emptyText:"Password"},{xtype:"checkbox",fieldLabel:"Remember me",name:"remember"}],buttons:[{text:"Login",formBind:!0,scope:this,handler:function(){this.submitFormLogin()}}]})},submitFormLogin:function(){this.formLogin.getForm().submit({url:this.urlLogin,success:function(e,t){Cfg.log("success",arguments)},failure:function(e,t){Msg.ajaxError(t.response)}})}})},function(e,t){Ext.define("Auth.Auth",{name:"Auth",xtype:"xAuth",pBar:null,rBtn:null,pBarContainer:null,urlCheckAuth:Cfg.api("auth"),constructor:function(){this.pBar=this.createProgressBar(),this.rBtn=this.createReloadBtn(),this.pBarContainer=this.createContainer(),this.pBar.run(),this.checkAuth()},checkAuth:function(){var e=this;Ajax.request({url:this.urlCheckAuth,success:function(t,r){var n=Ext.decode(t.responseText);e.pBar.progress=1,e.pBarContainer.getEl().fadeOut({duration:600,callback:function(){n.status||Ext.create({xtype:"xLogin"}),e.pBarContainer.destroy()}})},failure:function(t,r){e.pBar.kill(),e.pBar.getEl().fadeOut({duration:600,callback:function(){e.rBtn.show().alignTo(e.pBarContainer,"c-c")}}),Msg.ajaxError(t)}})},createProgressBar:function(){return Ext.create("Ext.ProgressBar",{renderTo:Ext.getBody(),region:"center",style:"border-radius: 4px",border:!1,width:300,height:100,intervalID:null,progress:0,run:function(){var e=.2,t=this,r=.0012/((1-e)/.0012),n=0;t.progress=0,t.intervalID=setInterval(function(){t.progress>e&&e+.0012<1&&(e+=.0012,n+=r),t.progress+=.0012-n,t.progress>0&&t.progress<1?t.updateProgress(t.progress):(t.updateProgress(t.progress=1),t.kill())},1)},kill:function(){null!==this.intervalID&&clearInterval(this.intervalID)}})},createReloadBtn:function(){return Ext.create("Ext.Button",{iconCls:"fa fa-refresh",text:"Reload",hidden:!0,height:40,padding:"0 6",renderTo:Ext.getBody(),handler:function(){window.location.reload()}})},createContainer:function(){return Ext.create("Ext.container.Container",{renderTo:Ext.getBody(),height:"100vh",id:"mainLoaderContainer",layout:{type:"vbox",align:"center",pack:"center"},items:[this.pBar,this.rBtn]})}})}]);