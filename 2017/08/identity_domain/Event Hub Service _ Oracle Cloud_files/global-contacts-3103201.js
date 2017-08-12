
/*-------------Extract XML content Code-------------------*/
(function(){
	$(document).ready(function(){
		var settings = {
			modalContainerId : "global_contacts_modal",
			selectEleId : "country_list",
			xmlURL : "/res/xml/contactlist_lang.xml",
			heading : "",
			label : "Global Contacts"
		};
		var lang = $('html').attr('lang').trim();
		var dmurl = window.location.search;
		if(dmurl){
			var lng = getURLParams('lang');
			if(lng)lang=lng;
		}
		if(!lang)lang="en";
	
		function getURLParams(q){
			var results = new RegExp('[\\?&]' + q + '=([^&#]*)').exec(dmurl);
			if (!results) { 
				return undefined;
			}
			return results[1] || undefined;
		}
		(function( $ ) {
			$.widget( "custom.combobox", {
				_create: function() {
					if(this.element.parents('.w01w6'))this.element.siblings('.custom-combobox').remove();
					this.wrapper = 
					$( "<span>" )
						.addClass( "custom-combobox" )
					.insertAfter( this.element );

					this.element.hide();
					this._createAutocomplete();
					this._createShowAllButton();
				},
				_createAutocomplete: function() {
					var selected = this.element.children( ":selected" ),
						value = selected.val() ? selected.text() : "";
					this.input = $( "<input>" )
						.appendTo( this.wrapper )
						.val("")
						.attr( "title", "" )
						.attr( "placeholder", settings.label )
						.addClass( "custom-combobox-input ui-widget ui-widget-content ui-state-default ui-corner-left textcnt" )
						 .autocomplete({
							delay: 0,
							minLength: 0,
							source: $.proxy( this, "_source" ),
							select: function(event, ui) {				
									var region = ui.item.category;
									var country = ui.item.option.value;
									globalContacts.displayPhoneNo(country);
							}		
						});
					this._on( this.input, {
						autocompleteselect: function( event, ui ) {
							ui.item.option.selected = true;
							this._trigger( "select", event, {
								item: ui.item.option
							});
						},
						autocompletechange: "_removeIfInvalid"
					});
				},

				_createShowAllButton: function() {
					var input = this.input,
						wasOpen = false;
					$( "<a>" )
						.attr( "tabIndex", -1 )
						.attr( "title", "Show All Items" )
						.appendTo( this.wrapper )
						.removeClass( "ui-corner-all" )
						.addClass( "custom-combobox-toggle ui-corner-right ui-button ui-widget ui-state-default ui-button-icon-only" )
						.append( "<span class='ui-button-icon-primary ui-icon ui-icon-triangle-1-s'></span><span class='ui-button-text'></span>")
						.mousedown(function() {
							wasOpen = input.autocomplete( "widget" ).is( ":visible" );
						})
						.click(function() {
							input.focus();
							$(".ui-tooltip-content").hide();
							$("#phone_no_list_div,.w01w7 #phone_no_list_div").empty();
							if ( wasOpen ) {
								return;
							}
							input.autocomplete( "search", "" );
						});
						
						input.click(function() {
							input.focus();
							$(".ui-tooltip-content").hide();
							$("#phone_no_list_div").empty();
							var wasOpen1 = input.autocomplete( "widget" ).is( ":visible" );
							if ( wasOpen1 ) {
								return;
							}
							input.autocomplete( "search", "" );
						});
				},

				_source: function( request, response ) {
					 var matcher = new RegExp( "^" + $.ui.autocomplete.escapeRegex( request.term ), "i" );
					response( this.element.find("option").map(function() {
						if($( this ).val()=='placeholder')return null;
						var text = $( this ).text();
						if ( this.value && ( !request.term || matcher.test(text) ) ){		
							return {
								label: text,
								value: text,
								option: this,
							};
						}
					}) );
				},

				_removeIfInvalid: function( event, ui ) {
					if ( ui.item ) {
						return;
					}
					var value = this.input.val(),
						valueLowerCase = value.toLowerCase(),
						valid = false;
					this.element.children( "option" ).each(function() {
						if ( $( this ).text().toLowerCase() === valueLowerCase ) {
							this.selected = valid = true;
							return false;
						}
					});
					if ( valid ) {
						return;
					}
					this.input
						.val( "" )
							.attr( "title", "No results match "+"'"+value+"'")
						.tooltip( "open" );
					this.element.val( "" );
					this._delay(function() {
						this.input.tooltip( "close" ).attr( "title", "" );
					}, 2500 );
				},

				_destroy: function() {
					this.wrapper.remove();
					this.element.show();
				}
			});
		})( jQuery );

		var globalContacts =function(){
			var countryList = new Object();
			var contactList = new Object();
			
			var GetXMLData = function(){
				$.ajax({
					type: "GET",
					url:settings.xmlURL,
					dataType: "xml",
					success: parseXml,
					complete: setupConatcList,
					 error: function (request, error) {
						console.log(request);
						console.log(error);
					},
					failure: function(data) {
						console.log("XML File could not be found");
					}
				});	
			};
			
			var  parseXml = function(xml){
				if(($(xml).find("country[lang='"+lang+"']")).length===0)lang="en";
				$(xml).find("contactnumber").each(function(k,v){
					var cc =$(this).attr('cc').trim().toLowerCase();
					var phone_number_1 = $(this).find('ph1').text().trim();
					var phone_number_1_line =$(this).find('ph1').attr('line').trim();
					var phone_number_2 = $(this).find('ph2').text().trim();
					var phone_number_2_line =$(this).find('ph2').attr('line').trim();
					contactList[cc]={'phone_number_1': phone_number_1, 'phone_number_2': phone_number_2,'phone_number_1_line':phone_number_1_line,'phone_number_2_line':phone_number_2_line};
				});
				
				$(xml).find("country[lang='"+lang+"']").find('name').each(function(k,v){
					var cc = $(this).attr('cc').trim().toLowerCase();
					var country_name = $(this).text().trim();
					countryList[cc]={'country_name': country_name,};
					
				});	
			};
			
			var setupConatcList = function () {
				
				var s = "<div class='ui-container'><div class='ui-widget' ><div class='left-icon'></div><label for='txtSearch'>"+settings.heading+"</label></br><select  id='"+settings.selectEleId+"' style='display: none;'>";
				s+= "<option style='display:none;' disabled selected value='placeholder'>"+settings.label+"</option>";
				$.each(countryList,function(k,v){
					if(k.trim())s+="<option value="+k+">"+unescape(v.country_name)+"</option>";
				});
				s+="</select></div><div id='phone_no_list_div'></div></div>";
				$("#"+settings.modalContainerId).html(s);
				$("#"+settings.modalContainerId+"2").html(s);
				initCombobox(" ");
				$( "#toggle" ).click(function() {
					$cb.toggle();
				});
			};
			
			var initCombobox = function(lightboxId){
				var $cb = $(lightboxId+" #"+settings.selectEleId);
				$cb.combobox();
				$cb.on('change', function(){
					globalContacts.displayPhoneNo($(this).val());
				});
			};
			
			var displayPhoneNo = function(country){
				if(contactList[country]==undefined)country='us';
				var dialvalue = dialNo(contactList[country]['phone_number_1']);
				var callTo = dialvalue.split("|")[0];
				var hrefcallTo = callTo.replace(/\s+/g, '');
				var nextTodial =dialvalue.split("|")[1];
				var dialvalue = dialNo(contactList[country]['phone_number_2']);
				var callTo_2 = dialvalue.split("|")[0];
				var hrefcallTo_2 = callTo_2.replace(/\s+/g, '');;
				var nextTodial_2 =dialvalue.split("|")[1];
				var cntList = "<div><a href=tel:"+hrefcallTo+">"+callTo+"</a>&nbsp;"+nextTodial+"&nbsp;"+ contactList[country]['phone_number_1_line']+"<br/>"+"<a href=tel:"+hrefcallTo_2+">"+callTo_2+"</a>&nbsp;"+nextTodial_2+"&nbsp;"+ contactList[country]['phone_number_2_line'];
			//	var cntList = "<div><a href=tel:"+hrefcallTo+">"+callTo+"</a><span>"+nextTodial+ contactList[country]['phone_number_1_line']+"</span></div><div>"+"<a href=tel:"+hrefcallTo_2+">"+callTo_2+"</a><span>"+nextTodial_2+ contactList[country]['phone_number_2_line']+"</span></div>";
				$("#phone_no_list_div,.w01w7 #phone_no_list_div").html(cntList);
	
				$(".custom-combobox-input").val($('#country_list [value="'+country+'"]').html());
			}
			var dialNo = function (value){
				var nextTodial,callTo,b;
				
				b = value.search('[A-Za-z]');
				if(b>0){
					callTo=(value.substring(0, b)).trim();
				
					nextTodial= value.substring(b, value.length)
					if((callTo.slice(-1))=='-')
						callTo=callTo.slice(0, -1);
				}else{
					callTo = value;nextTodial="";
				}
				return (callTo+'|'+nextTodial);
			}	
			return {
				Init : function(){
					GetXMLData();
					$('body').on('DOMNodeInserted', function(e) {
						if ($(e.target).is('.w01w16')) {
							$("#phone_no_list_div,.w01w7 #phone_no_list_div").html("");
						   initCombobox(".w01w7");
						}
					});
				},
				displayPhoneNo : function(country_code){
					displayPhoneNo(country_code);
				}
				
			}
		}();
		globalContacts.Init();
	});			
})();
