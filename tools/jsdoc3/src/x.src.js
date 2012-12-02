(function (exports) {
	"use strict";
	/**
	 * @function Object.create
	 */
	if (typeof Object.create !== "function") {
		Object.create = function (o) {
			var F = function () {};
			F.prototype = o;
			return new F();
		};
	};

	 /**
	 * @namespace  UX 
	 * @author <a href="mailto:nizhang@tibco-support.com">Jonathan</a> 
	 * @version 0.1
	 */
	exports.UX = {

		isArray:function(item){
			return Object.prototype.toString.call(item) === '[object Array]';	
		},
		/**
		 * @function
		 * Register base tool,it works like package in java.
		 * @param  {String} name [going to package namespace]
		 * @param  {Object} fun  [the context you want to add]
		 * 
		 */
		register: function (id,dependencies,factory) {

			var args = Array.prototype.slice.call(arguments,0);

			if(args.length === 1){
				if(typeof args[0] === 'string'){
					id = args[0];
				}else if(this.isArray(args[0])){
					dependencies = args[0];
				}else if(typeof args[0] === 'function' || typeof args[0] === 'object'){
					factory = args[0];
				}
			}else if(args.length === 2){
				if(typeof args[0] === 'string'){
					id = args[0];
					dependencies = undefined;
				}else if(this.isArray(args[0])){
					dependencies = args[0];
				}
				factory = args[1];
			}

			if(!dependencies){
				dependencies = [ 'require' , 'exports' , 'module' ];
			}

			// console.log(id);
			// console.log(dependencies);
			// console.log(factory);
			
			// console.log( 'id : ' + id + ' . dependencies : ' + dependencies + ' . factory ' + factory );

			var curDomain = window,
				domains,
				contexts = [];
				if(typeof id === 'string'){
					domains = id.split('.')
				}else{
					domains=[];
				}
			for (var i=0;i<domains.length;i++){
				var domain = domains[i];

				if(!curDomain[domain]){
					curDomain[domain]={}
				}
				curDomain = curDomain[domain];
			}

			var i = 0
			for ( i = 0 ; i < dependencies.length ; i++) {

				var requirContext;

				if(dependencies[i] === 'require'){
					requirContext = this.require;
				}else if(dependencies[i] === 'exports'){
					requirContext = curDomain.exports={};
				}else if(dependencies[i] === 'module'){
					requirContext = curDomain.module={};
				}else{
					requirContext = this.require(dependencies[i]);
				}

				contexts.push(requirContext);
			}

			if(typeof factory === 'function'){

				var api = factory.apply(this,contexts);
				if(!curDomain.exports && typeof api === 'object' ){
					curDomain.exports = api;
				}
			}else if(typeof factory === 'object'){
				curDomain.exports = factory;
			}
		},

		/**
		 * @function
		 * Require base tool,it works like import in java.
		 * @param  {Array}   name     [going to import namespace]
		 * @param  {Function} callback [it will be invoked after get the context for required no mater it' sync or async,the context will transfer in to the callback.]
		 */
		require:function(id){
			var curDomain,domains,_pro;
			curDomain=window;
			domains = id.split('.');

			//the internal loop is for searching the refference.
			for (var i=0;i<domains.length;i++){
				var domain = domains[i];
				curDomain = curDomain[domain];
			}
			return curDomain.exports;
		}
	};
})(window);/**
 * @module X.Model
 * @version 1.0
 * @author Jonathan
 */
UX.register( 'com.tibco.Module' , function( require , exports , module ){
	
		/**
		 * extend,it woring for extending class,all the methord will be static though it contrustruts.
		 * @function
		 * @protected
		 * @param  {[type]} o [description]
		 * @return {[type]}   [description]
		 */
		exports.extend = function (o) {
			var extended = o.extended;
			for (var x in o){
				this[x] = o[x];
			}
			if(extended){
				extended();
			}
		},

		/**
		 * include,it woring for include methord for each instance.
		 * @function
		 * @protected
		 * @param  {[type]} o [description]
		 * @return {[type]}   [description]
		 */
		exports.include = function (o) {
			var included=o.included;
			for(var x in o){
				this.prototype[x]=o[x];
			}
			if(included){
				included();
			}
		}
});/**
 * @extends {x.Model}
 * @author <a href="mailto:nizhang@tibco-support.com">Jonathan</a>
 * @version 1.0
 */
UX.register(['com.tibco.Module'],function (mod) {
	'use strict';
	mod.extend({
		records: {},
		attributes: [],
		prototype: {
			init: function () {
			}
		},
		/**
		 * [create description]
		 * @function
		 * @protected
		 * @extends {x.module}
		 * @return {[type]} [description]
		 */
		create: function () {
			var obj = Object.create(this);
			obj.parent = this;
			obj.prototype = obj.fn = Object.create(this.prototype);

			obj.created();
			this.inherited(obj);
			return obj;
		},
		/**
		 * [init description]
		 * @return {[type]} [description]
		 */
		init: function () {
			var instance = Object.create(this.prototype);
			instance.parent = this;
			instance.init.apply(instance, arguments);
			return instance;
		},
		/**
		 * [find description]
		 * @param  {[type]} id [description]
		 * @return {[type]}    [description]
		 */
		find: function (id) {
			var records = this.records[id];
			if (!records) {
				throw ('Unkonw record');
			}
			return this.records[id];
		},
		/**
		 * [created description]
		 * @return {[type]} [description]
		 */
		created: function (){
			this.records = {};
			this.attributes = [];
		},
		/**
		 * [inherited description]
		 * @return {[type]} [description]
		 */
		inherited: function () {},
		/**
		 * [populate description]
		 * @param  {[type]} values [description]
		 * @return {[type]}        [description]
		 */
		populate:function(values){
			this.records={};
			for(var i=0,il=values.length;i<il;i++){
				var record=this.init(values[i]);
				record.newRecord=false;
				this.records[record.id]=record;
			}
		},
		/**
		 * [saveLocal description]
		 * @param  {[type]} name [description]
		 * @return {[type]}      [description]
		 */
		saveLocal:function(name){
			var result=[];
			for(var i in this.records){
				result.push(this.records[i]);
			}
			localStorage[name]=JSON.stringify(result);
		},
		/**
		 * [loadLocal description]
		 * @param  {[type]} name [description]
		 * @return {[type]}      [description]
		 */
		loadLocal:function(name){
			var result=JSON.parse(localStorage[name]);
			this.populate(result);
		}
	});
});/**
 * @extends {x.module}
 * @version 1.0
 * @author <a href="mailto:nizhang@tibco-support.com">jonathan</a> 
 */
UX.register(
	['com.tibco.Module'],
	/**
	 * [ description]
	 * @param  {[type]} mod [description]
	 * @return {[type]}     [description]
	 */
	function (mod) {
		mod.include({
			/**
			 * [init description]
			 * @param  {[type]} attr [description]
			 * @return {[type]}      [description]
			 */
			init:function(attr){
				if(attr)this.load(attr);
			},
			/**
			 * [load description]
			 * @param  {[type]} attributes [description]
			 * @return {[type]}            [description]
			 */
			load:function(attributes){
				for(var item in attributes){
					this[item]=attributes[item];
				}
			},
			/**
			 * [newRecord description]
			 * @type {Boolean}
			 */
			newRecord:true,
			/**
			 * [create description]
			 * @return {[type]} [description]
			 */
			create:function(){
				this.newRecord=false;
				this.parent.records[this.id]=this.dup();
				return this;
			},
			/**
			 * [update description]
			 * @return {[type]} [description]
			 */
			update:function(){
				this.parent.records[this.id]=this.dup();
				return this;
			},
			/**
			 * [save description]
			 * @return {[type]} [description]
			 */
			save:function(){
				this.newRecord?this.create():this.update();
			},
			/**
			 * [destroy description]
			 * @return {[type]} [description]
			 */
			destroy:function(){
				delete this.parent.records[this.id];
			},
			/**
			 * [dup description]
			 * @return {[type]} [description]
			 */
			dup:function(){
				return $.extend(true,{},this);
			},
			/**
			 * [attributes description]
			 * @return {[type]} [description]
			 */
			attributes:function(){
				var result={};
				for(var i in this.parent.attributes){
					var attr=this.parent.attributes[i];
					result[attr]=this[attr];
				}
				result.id=this.id;
				return result;
			},
			/**
			 * [toJSON description]
			 * @return {[type]} [description]
			 */
			toJSON:function(){
				return (this.attributes());
			},
			/**
			 * [createRemote description]
			 * @param  {[type]}   url      [description]
			 * @param  {Function} callback [description]
			 * @return {[type]}            [description]
			 */
			createRemote:function(url,callback){
				$.post(url,this.attributes(),callback);
				return this;
			},
			/**
			 * [updateRemote description]
			 * @param  {[type]}   url      [description]
			 * @param  {Function} callback [description]
			 * @return {[type]}            [description]
			 */
			updateRemote:function(url,callback){
				$.ajax({
					url:url,
					data:this.attributes(),
					success:callback,
					type:'PUT'
				});
				return this;
			}
		});
});/**
 * @module Contact
 */
UX.register('X.Model.Contact',['com.tibco.Module'],function(mod){
		var Contact=mod.create();
		var jack=Contact.init({
			id:'001',
			name:'jack jone',
			skill:'javascript'
		}).create().createRemote('/example');
		jack.name='jonathan';
		console.log(Contact.find('001'));
		Contact.attributes=['name','skill'];
		return Contact;
});