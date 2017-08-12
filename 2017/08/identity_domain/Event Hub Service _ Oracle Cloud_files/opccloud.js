var sectionEventBlog='OPC_POST';
var sectionPromotion='OPC_PROMOTION';
var opccloudLargeBreakpoint=1024;
var opccloudMediumBreakpoint=768;
function setNavBandSectionSticky() {
	var ieVersion=detectIE();
	if(ieVersion>8){
		var NavBandContainer = $('.opcComponent.opccPageNavBandLayout').parent(	".opcComponent-container");
		NavBandContainer.removeClass("fixedNavBand");
		NavBandContainer.css('top', "auto");
		var currentWindowOffset = $(window).scrollTop();
		var NavBandContainerOffsetHeight = $('.opcComponent.opcSlider').height();
		//var topbarHeight = ($('html').hasClass('iframe')) ? 0 : $('.top-bar').height();
		var topbarHeight = $('.top-bar').height();
		if (currentWindowOffset && NavBandContainerOffsetHeight) {
			if (currentWindowOffset > NavBandContainerOffsetHeight) {
				NavBandContainer.addClass("fixedNavBand");
				NavBandContainer.css('top', topbarHeight);
			} 
		}
	}else{
		var currentWindowOffset = $(window).scrollTop();
		var NavBandContainer = $('.opcComponent.opccPageNavBandLayout').parent(	".opcComponent-container");
		var NavBandContainerOffsetHeight = $('.opcComponent.opcSlider').height();
		//var topbarHeight = ($('html').hasClass('iframe')) ? 0 : $('.top-bar').height();
		var topbarHeight = $('.top-bar').height();
		if (currentWindowOffset && NavBandContainerOffsetHeight) {
			if (currentWindowOffset > NavBandContainerOffsetHeight) {
				NavBandContainer.addClass("fixedNavBand");
				NavBandContainer.css('top', topbarHeight);
			} else {
				NavBandContainer.removeClass("fixedNavBand");
				NavBandContainer.css('top', "");
			}
		}
	}
}
function setServieNavBandSticky() {
	var currentWindowOffset = $(window).scrollTop();
	var NavBandContainer = $('.opcComponent.opccPageNavBandLayout').parent(	".opcComponent-container");
	var NavBandContainerOffsetHeight = $('.opcComponent.opcServiceBanner').height();
	//var topbarHeight = ($('html').hasClass('iframe')) ? 0 : $('.top-bar').height();
	var topbarHeight = $('.top-bar').height();
	if (currentWindowOffset && NavBandContainerOffsetHeight) {
		if (currentWindowOffset > (NavBandContainerOffsetHeight+topbarHeight)) {
			NavBandContainer.addClass("fixedNavBand");
			NavBandContainer.css('top', topbarHeight);
		} else {
			NavBandContainer.removeClass("fixedNavBand");
			NavBandContainer.css('top', "");
		}
	}
}
function setNavBandSelectionHighlight() {
	var offset = $(window).scrollTop();
          for ( var s = 0; s < NavSections.length; s++ )
          {
            if ( $(NavSections[ s ]).offset().top < offset + 185 )
            {
              if ( NavSelected !== s )
              {
                NavSelected = s;
                NavSubitems
                  .removeClass( 'selected' )
                  .find( '[href="' + NavSections[ s ]+ '"]' )
                  .parent()
                  .addClass( 'selected' );
              }
            }
            } 
          }
function setOfferingToggle(){
    var toggleContainer = $(".PRODUCT_OFFER .opcListItems");
       toggleContainer.each(function(index, element) {
            $(element).find(".fa.fa-plus-square").click(function() {
                $(element).children("div.row:nth-of-type(2)").slideToggle("fast");
		$(this).toggleClass("fa-plus-square fa-minus-square");
                });            
    });
}
function setOfferingToggleAll(){
     var toggleAll = $(".OfferingOpenClose li");
	 var toggleContainer = $(".PRODUCT_OFFER .opcListItems > div.row:nth-of-type(2)");
	 var toggler = $(".PRODUCT_OFFER .opcListItems .fa.fa-plus-square");
	 toggleAll.click(function(){
	  if(!$(this).hasClass("selected") && $(this).attr("id").toLowerCase()==="open") 
	  {
        toggleContainer.slideDown("fast");
		toggler.removeClass("fa-plus-square");
		toggler.addClass("fa-minus-square");
		toggleAll.toggleClass("selected");
	  } else if(!$(this).hasClass("selected") && $(this).attr("id").toLowerCase()==="close"){
	    toggleContainer.slideUp("fast");
		toggler.removeClass("fa-minus-square");
		toggler.addClass("fa-plus-square");
		toggleAll.toggleClass("selected");
	  }
    });
}
function setServiceOverviewEqual() {
var $eq_target = $('.opcservice-overview-equalizer-watch:visible');
var $img = $('.opcservice-overview-equalizer-watch:visible img'); 
    $img.css('height', $eq_target.outerHeight(false));
}
function setServiceOverviewEqualTest() {
var $eq_target_group = $('.OPC_SERVICE_OVERVIEW [wcs-data-equalizer]');
var $eq_target = $eq_target_group.find('.opcservice-overview-equalizer-watch:visible');
var $img = $('.opcservice-overview-equalizer-watch:visible img');
 $eq_target_group.on('after-height-change.fndtn.equalizer', function(){
   if (matchMedia(Foundation.media_queries['small']).matches && !matchMedia(Foundation.media_queries.medium).matches) {
       $img.css('height', "");
   } else {
    $img.css('height', $eq_target.outerHeight(false));
   }
});
 $eq_target_group.on('before-height-change.fndtn.equalizer', function(){
    $img.css('height', "");
});
}
function setReleaseTrainingSection() {
	     $(document).foundation({
        accordion: {
             content_class: 'content',
             active_class: 'active',
             multi_expand: true,
             toggleable: true
                   },
		       offcanvas : {
					close_on_click : true
                   }
         });
		 $(".ReleaseGroup .accordion").on('toggled', function (event, target) {
             target.prev("a").find("span:first-of-type").toggleClass("arrow-right arrow-down");
		}); 
         $(".RR_GROUP .accordion").on('toggled', function (event, target) {
             target.prev("a").find("span:first-of-type").toggleClass("arrow-right arrow-down");
		});
}
var desiredVersion="";
function readinessSideMenuInit() {
		     $(document).foundation({
        accordion: {
             content_class: 'content',
             active_class: 'active',
             multi_expand: true,
             toggleable: true
			}
	});
	readinessSideMenuAjaxCall();
	//Find out if there is an offering we should select. If not (or we don't find the requested one) select the first one.
	var desiredOffering="";
	if($(".selectDefaults").attr("offering")) {
		desiredOffering=$(".selectDefaults").attr("offering");
	}
	desiredVersion="";
	if($(".selectDefaults").attr("version")) {
		desiredVersion=$(".selectDefaults").attr("version");
	}
	var readinessMenu = $(".readinessSideBar .side-nav > li[tags]");
	var selectedItem=readinessMenu.first();
	var tags="";
	var parsedTags="";
	var pos=0;
	var selectionMade=false;

	//If we are given an offering to select we look for it. If it is not specified we select the first item. 
	if(desiredOffering.length > 0){
		for(var index=0;index < readinessMenu.length;index++) {
			var element = readinessMenu[index];
			//If it has no tags we have no possible matches
			if($(element).attr("tags")) {
				tags = $(element).attr("tags");
				parsedTags=tags.split(',');
				
				//Get rid of any whitespace in the tags
				for(var x = 0;x<parsedTags.length;x++) {
					parsedTags[x]=parsedTags[x].replace(/^\s*/, "").replace(/\s*$/, "").toUpperCase();
				}

				
				var foundOffering=false;
				//Search for offering
				for(var offeringIndex=0;offeringIndex<parsedTags.length;offeringIndex++) {
					if(parsedTags[offeringIndex] === desiredOffering) {
						//A match was made on the offering id
						foundOffering=true;

     					selectedItem=element;
						selectionMade=true;
						break;							
					}
				}
				//Need this to break out of outer for loop
				if(selectionMade == true) {
					break;
				}
			}
		}
	}
	
    $(selectedItem).trigger('click');
    
    //$(".readinessSideBar .accordion-navigation > a").first().trigger('click.fndtn.accordion');
    
    
    var accordions=[];
    var selectionParents= $(selectedItem).parents();
    //Find all the accordions we have to expand to make this item visible
    for(var z= 0;z < selectionParents.length;z++) {
    	var currentMenu = selectionParents[z];
    	if($(currentMenu).hasClass("accordion-navigation")) { 
    		accordions.push(currentMenu);
    	}
    }
    //Expand each accordion in turn
    
    for(var t=0;t < accordions.length;t++) {
    	var element=accordions[t];
    	$(element).children("a").first().trigger('click.fndtn.accordion');	
    }
    
    var category = $(".readinessSideBar .accordion-navigation");
	if( category.length ===1 ) {
		var subcategory = category.find("div.content li");
		if ( subcategory.length ===1 && subcategory.find(".readinessSideBar").length ===0 ) {
		    $(".OPC_RR_NAVBAR .RR_Menu").css("display","none");
			$(".OPC_RR_NAVBAR .Result").removeClass("medium-9");
			$(".OPC_RR_NAVBAR .Result").addClass("small-12");
		}	
  }	
     // set off-canvas menu target
	 $(".left-off-canvas-toggle").text(""); 
     $(".left-off-canvas-toggle").addClass("fa fa-toggle-right");
  	// change off-canvas menu target based on collapsible state
	$(document).on('open.fndtn.offcanvas', '[data-offcanvas]', function () {
		$(".left-off-canvas-toggle").removeClass("fa-toggle-right");
		$(".left-off-canvas-toggle").addClass("fa fa-toggle-left");
	});
	$(document).on('close.fndtn.offcanvas', '[data-offcanvas]', function () {
		$(".left-off-canvas-toggle").removeClass("fa-toggle-left");
		$(".left-off-canvas-toggle").addClass("fa fa-toggle-right");
	});
    
	if( $(".opcReadinessProxySection").prev(".opcComponent-container").children(".OPC_SERVICE_SUBNAVBAR").length ===0 ) {
	$(".opcReadinessProxySection").css("padding-top","2.5rem");
	} else {
	$(".opcReadinessProxySection").css("padding-top","0");
	}
	$(".readinessSideBar a").each(function(index, element) {
		if ( $(element).text().length >= 32 ) {
			$(element).css({"line-height": "20px","padding-top": "10px", "padding-bottom": "10px"});
	}
	});
	$(".readinessSideBar > ul > li a").each(function(index, element) {
		if ( $(element).text().length >= 30 ) {
			$(element).css({"line-height": "20px","padding-top": "10px", "padding-bottom": "10px"});
	}
	});	
	$(".readinessSideBar dd li a").each(function(index, element) {
		if ( $(element).text().length > 27 ) {
			$(element).css({"line-height": "20px","padding-top": "10px", "padding-bottom": "10px"});
	}
	});
	$(".readinessSideBar li.expanded li a").each(function(index, element) {
		if ( $(element).text().length > 21 ) {
			$(element).css({"line-height": "20px","padding-top": "10px", "padding-bottom": "10px"});
	}
	});
}
var opcReadinessMenuSelected;
function readinessSideMenuAjaxCall() {
	var proxyurl= $("section.opcReadinessProxySection").attr("proxyurl");
	var readinessMenu = $(".readinessSideBar .side-nav > li");
	readinessMenu.each(function(index, element) {
		var siteid="en_US";
		var assetname="";
		var tags="";
		if($("html").attr("siteid")) {
			siteid = $("html").attr("siteid");
		}
		if($("body").data("assetname")) {
			assetname = $("body").data("assetname");
		}
		if($(element).attr("tags")) {
			tags = $(element).attr("tags");

		}
		$(element).click(function() {
			var SubMenu = $(element).find(".readinessSideBar .side-nav > li");
			var tempOriginalNotfoundAlertPanelText=$('.opcClient-rr-no-found-text').html();
			if( SubMenu.length !== 0) {
				if($(element).find(".accordion-navigation.active").length !==0 ) {
						    if($(element).children(".readinessSideBar").length ===0 ) {
						    readinessMenu.removeClass("selected");
					$(element).addClass("selected");
					$(element).removeClass("expanded");
				} else {
					$(element).addClass("expanded");
								$(element).removeClass("selected");
				}
				
							}
					} else {
						opcReadinessMenuSelected = readinessMenu.filter(function() {
							return $(this).hasClass( "selected" );
						});
						readinessMenu.removeClass("selected");
				$(this).addClass("selected");
				if( readinessMenu.index($(this))>= 0.5*readinessMenu.length ) {
					readinessMenu.eq( readinessMenu.index($(this)) - 0.5*readinessMenu.length ).addClass("selected");
				} else {
					readinessMenu.eq( 0.5*readinessMenu.length + readinessMenu.index($(this)) ).addClass("selected");
				}
				if($(this).attr("tags")) {
					tags = $(this).attr("tags");
					if(desiredVersion.length >0 ) {
						tags=tags+",";
						tags=tags+desiredVersion;
						desiredVersion="";
					}

				}
				if($(this).attr("assetname")) {
					assetname = $(this).attr("assetname");
				}
				var tempCurrentMenuItemText=$(this).find('a').text();
				if (tempCurrentMenuItemText){		
					ReadinessHelperInstance.updateRRnotFoundMessage(tempCurrentMenuItemText+" "+tempOriginalNotfoundAlertPanelText);
				}
				ReadinessHelperInstance.setUpReadinessProxyURL(proxyurl);
				ReadinessHelperInstance.setUpReadinessProxyURLContent(siteid,tags,assetname);
				ReadinessHelperInstance.getReadinessResult();
				$('.off-canvas-wrap li').foundation('offcanvas', 'hide', 'move-right');
			}
		});
	});
 
}
function setSectionDescEqualWithNoImage(targetSelector,targetParentSelector,imageBlockSelector,cssBreakPoint){
	//only set same height if mobile up screen
	try{
		var descContainer= $(targetSelector);
		descContainer.height('auto');
		var screen_size=3;
		var breakpointScreensize=0;
	    if (matchMedia(Foundation.media_queries['large']).matches) {
	        screen_size=3;
	    } else if (matchMedia(Foundation.media_queries['medium']).matches) {
	        screen_size=2;
	    } else if (matchMedia(Foundation.media_queries['small']).matches) {
	        screen_size=1;
	    }
	    if(cssBreakPoint&&opccloudLargeBreakpoint==cssBreakPoint){
	    	breakpointScreensize=3;
	    }else if(cssBreakPoint&&opccloudMediumBreakpoint==cssBreakPoint){
	    	breakpointScreensize=2;
	    }
		if (screen_size>=breakpointScreensize) {
			var max_height=0;
			for(var index=0;index<descContainer.length;index++){
				var currentdescContainer=descContainer.get(index);
				var currentdescContainerHeight=$(currentdescContainer).outerHeight();
				var currentImageSelector=$(currentdescContainer).parents(targetParentSelector).find(imageBlockSelector);
				var currentImageContainerHeight=$(currentImageSelector).outerHeight();
				var topBlockHeight=currentImageContainerHeight+currentdescContainerHeight;
				if (topBlockHeight>max_height){
					max_height=topBlockHeight;
				}
			}
			if (max_height>0){
				for(var index=0;index<descContainer.length;index++){
					var currentdescContainer=descContainer.get(index);
					var currentdescContainerHeight=$(currentdescContainer).outerHeight();
					var currentImageSelector=$(currentdescContainer).parents(targetParentSelector).find(imageBlockSelector);
					var currentImageContainerHeight=$(currentImageSelector).outerHeight();
					if (currentImageSelector.find('img')){
						//there is img
						$(currentdescContainer).outerHeight(max_height-currentImageContainerHeight);
					}else{
						//no img
						$(currentdescContainer).outerHeight(max_height);
					}		
				}
			}
		}

	}catch(err){
		console.log(err);
	}
}
$(document).on('opc-before-height-change.fndtn.equalizer', function(){
	setSectionDescEqualWithNoImage('#categoryGroupPage .opcComponent.OPC_POST .opcObject-container .opcObject .opcDescContainer','.opcObject','.opcObjectContentsFirstBlock',opccloudMediumBreakpoint);
	setSectionDescEqualWithNoImage('#ServicePage .opcComponent.OPC_POST .opcObject-container .opcObject .opcDescContainer','.opcObject','.opcObjectContentsFirstBlock',opccloudMediumBreakpoint);
	// equalize customer desc in the service customer page.
	if ($('html').find('#ServicePage .opcComponent.OPC_CUSTOMERS').length >0) {
		equalizeCustomerDesc();
	}
	// equalize pricing card title container.
	if ($('html').find('#ServicePage .opcComponent.opccPricingCards').length >0) {
		equalizePricingCardTitle();
	}
});
function equalizeCustomerDesc(){
	var descContainer= $(".opcComponent.OPC_CUSTOMERS .opcDescContainer");
	//reset height
	descContainer.height('auto');
	var descContainerLength=descContainer.length;
	var screen_size=3;
	var breakpointScreensize=0;
    if (matchMedia(Foundation.media_queries['large']).matches) {
        screen_size=3;
    } else if (matchMedia(Foundation.media_queries['medium']).matches) {
        screen_size=2;
    } else if (matchMedia(Foundation.media_queries['small']).matches) {
        screen_size=1;
    }
	var sizePerRow=1;
	var numRow=descContainerLength;
    if(screen_size>=3){
    	//equalizer on every three in desktop up screen
		sizePerRow=3;
		numRow=Math.ceil(descContainerLength/3);	
    }else if (screen_size==2){
    	// equalizer on every two in tablet
		sizePerRow=2;
		numRow=Math.ceil(descContainerLength/2);
    }
	//only equalizer desc on tablet up screen
	var max_heightPerRow=0;
	if(screen_size>=2){
		for(var i=0;i<numRow;i++){
			max_heightPerRow=0;
			for(var j=0;j<sizePerRow;j++){
				if((i*sizePerRow+j)<descContainerLength){
					var currentdescContainer=descContainer.get(i*sizePerRow+j);
					var currentdescContainerHeight=$(currentdescContainer).outerHeight();
					if (currentdescContainerHeight>max_heightPerRow){
						max_heightPerRow=currentdescContainerHeight;
					}
				}
			}
			for(var j=0;j<sizePerRow;j++){
				if((i*sizePerRow+j)<descContainerLength){
					var currentdescContainer=descContainer.get(i*sizePerRow+j);
					$(currentdescContainer).height(max_heightPerRow);
				}
			}
		}
	}
} 
function equalizePricingCardTitle(){
	var equalContainer= $(".opcComponent.opccPricingCards .black-center-pricing");
	//reset height
	equalContainer.height('auto');
	var equalContainerLength=equalContainer.length;
	var screen_size=3;
	var breakpointScreensize=0;
    if (matchMedia(Foundation.media_queries['large']).matches) {
        screen_size=3;
    } else if (matchMedia(Foundation.media_queries['medium']).matches) {
        screen_size=2;
    } else if (matchMedia(Foundation.media_queries['small']).matches) {
        screen_size=1;
    }
	var sizePerRow=1;
	var numRow=equalContainerLength;
    if(screen_size>=3){
    	//equalizer on every three in desktop up screen
		sizePerRow=4;
		numRow=Math.ceil(equalContainerLength/4);	
    }else if (screen_size==2){
    	// equalizer on every two in tablet
		sizePerRow=2;
		numRow=Math.ceil(equalContainerLength/2);
    }
	//only equalizer desc on tablet up screen
	var max_heightPerRow=0;
	if(screen_size>=2){
		for(var i=0;i<numRow;i++){
			max_heightPerRow=0;
			for(var j=0;j<sizePerRow;j++){
				if((i*sizePerRow+j)<equalContainerLength){
					var currentdescContainer=equalContainer.get(i*sizePerRow+j);
					var currentdescContainerHeight=$(currentdescContainer).height();
					if (currentdescContainerHeight>max_heightPerRow){
						max_heightPerRow=currentdescContainerHeight;
					}
				}
			}
			for(var j=0;j<sizePerRow;j++){
				if((i*sizePerRow+j)<equalContainerLength){
					var currentdescContainer=equalContainer.get(i*sizePerRow+j);
					$(currentdescContainer).height(max_heightPerRow);
				}
			}
		}
	}	
}

function equalizerOnBlocks(opctargetSection,equalizerID){
	Foundation.utils.image_loaded($('[opc-data-equalizer] img'), function () {
		manualEqualizeBlock(opctargetSection,null, equalizerID,null);
	});
}
function manualEqualizeBlock(manualEqualizerIndex,items_single_group,opc_absolute_cal, opc_id,opcFixColumnByRowVal){
	try{
		if (opc_id&&manualEqualizerIndex){
			if(manualEqualizerIndex==sectionPromotion||manualEqualizerIndex==sectionEventBlog){
				var items_single_group_children = Foundation.utils.S('[opc-data-equalizer-watch][opc-equalizer-id="'+opc_id+'"]');	
				items_single_group_children.height('auto');
				var TempTargetCSSBreakpoint=opccloudLargeBreakpoint;
				if (manualEqualizerIndex&&manualEqualizerIndex=='OPC_POST'){
					TempTargetCSSBreakpoint=opccloudMediumBreakpoint;
				}
				if($(window).width() >TempTargetCSSBreakpoint){
					items_single_group = Foundation.utils.S('[opc-data-equalizer][opc-equalizer-id="'+opc_id+'"]');			
					opc_columns_equalize(items_single_group,opc_absolute_cal, opc_id,opcFixColumnByRowVal);	
				
				}
			}
		}
	}catch(err){
		console.log(err);
	}
}
//Customize equal height function, wcs-equalizer-id is the parameter that shows the equalizer group.
Foundation.utils.image_loaded($('[opc-data-equalizer] img'), function () {
    Foundation.utils.S(window).off('[opc-data-equalizer]').on('resize.fndtn.equalizer', function (e) {
        var items = Foundation.utils.S('[opc-data-equalizer]'); 
		// disable category page "PRODUCT_OFFER" for new design
		if ( $(".opcBreadCrumb > ul.breadcrumbs li").length === 2) {
			items = $(items).filter(function(index) {
					return !$(this).closest(".opcComponent").is( ".PRODUCT_OFFER.NoEqualizer" );
				});
		}
		// disable category page "PRODUCT_OFFER" section if image is empty
			items = $(items).filter(function(index) {
				return $(this).closest(".opcComponent").hasClass( "PRODUCT_OFFER" ) ? ($(this).find(".medium-2 img").length ?  $(this).find(".medium-2 img").attr('src').length : false) : true;	 
			});
		
		for (var i = 0; i < items.size(); i++) {
			var opc_id=$(items[i]).attr('opc-equalizer-id');
			var opc_absolute_cal=$(items[i]).attr('opc-absolute-calculate');
			var opcFixColumnByRowVal=$(items[i]).attr('opcFixColumnByRow');
			var opcManualEqulizerIndex=$(items[i]).attr('opc-manual-equlizer');
			var items_single_group;
			var isManualEqualizer=false;
			var manualEqualizerIndex;
			if (opcManualEqulizerIndex&&opcManualEqulizerIndex==sectionEventBlog) {
				isManualEqualizer=true;
			}else if (opcManualEqulizerIndex&&opcManualEqulizerIndex==sectionPromotion) {
				isManualEqualizer=true;
			}
			if (isManualEqualizer==true){
				if (opc_id){
					manualEqualizeBlock(opcManualEqulizerIndex,items_single_group,opc_absolute_cal, opc_id,opcFixColumnByRowVal);
				}
			}else{
				if (opc_id!=null){
					items_single_group = Foundation.utils.S('[opc-data-equalizer][opc-equalizer-id="'+opc_id+'"]');			
					opc_columns_equalize(items_single_group,opc_absolute_cal, opc_id,opcFixColumnByRowVal);	
				}else{
					items_single_group = $(items[i]);
					opc_columns_equalize(items_single_group);
				}
			}
		}
    }.bind($(this)));
});
function opc_columns_equalize(items,wcs_absolute_cal, wcs_id,opcFixColumnsByRow) {
    //Absolute height calculate can only apply with wcs_id together, it will calculate the absolute item on medium up screen
    var vals;
    var absulate_vals;
    if(wcs_id!=null){
        vals = $(items).find('[opc-equalizer-id="'+wcs_id+'"][opc-data-equalizer' + '-watch]:visible');
        if(wcs_absolute_cal!=null){
            absulate_vals=$(items).find('[opc-equalizer-id="'+wcs_id+'"][opc-data-equalizer' + '-watch]:visible'+' '+wcs_absolute_cal);	
        }
    }else{
        vals = $(items).find('[opc-data-equalizer' + '-watch]:visible');	
    }
    if (vals.length === 0) return;
    $(items).trigger('before-height-change').trigger('before-height-change.fndth.equalizer');
    $(items).trigger('opc-before-height-change').trigger('opc-before-height-change.fndth.equalizer');
    vals.height('inherit');
    var heights = vals.map(function () {
        return $(this).outerHeight(false)
    }).get();
    var absulate_heights;
    if(absulate_vals!=null){
        absulate_heights=absulate_vals.map(function () {
            return $(this).outerHeight(false);
        }).get();	
    }
    var small_column, medium_column, large_column;
    vals.each(function (index) {
        var attr_class = $(vals[index]).attr('class');
        if(attr_class.indexOf("small-")>-1 || attr_class.indexOf("medium-")>-1||attr_class.indexOf("large-")>-1){
        } else{
            attr_class=$(vals[index]).parent().attr('class');
        }
        //based on the usage of columns, if the columns css is not in the attr, it will in his parent div. 
        var re_small = /\bsmall-\d{1,2}\b|\ssmall-\d{1,2}\b/;
        var re_medium = /\bmedium-\d{1,2}\b|\smedium-\d{1,2}\b/;
        var re_large = /\blarge-\d{1,2}\b|\slarge-\d{1,2}\b/;
        var obj_match_small = attr_class.match(re_small);
        var obj_match_medium = attr_class.match(re_medium);
        var obj_match_large = attr_class.match(re_large);
        if (obj_match_small != null) {
            var str_match_small = String(obj_match_small).trim();
            small_column = parseInt(str_match_small.substring(str_match_small.indexOf("small-") + 6, str_match_small.indexOf("small-") + 8)); // get small number
        } else {
            small_column = 12;
        }
        if (obj_match_medium != null) {
            var str_match_medium = String(obj_match_medium).trim();
            medium_column = parseInt(str_match_medium.substring(str_match_medium.indexOf("medium-") + 7, str_match_medium.indexOf("medium-") + 9)); // get med number
        } else {
            medium_column = small_column;
        }
        if (obj_match_large != null) {
            var str_match_large = String(obj_match_large).trim();
            large_column = parseInt(str_match_large.substring(str_match_large.indexOf("large-") + 6, str_match_large.indexOf("large-") + 8)); // get large number
        } else {
            large_column = medium_column;
        }
    });
    var temp_css_column;
    var screen_size=0;
    var items_in_group;
    if (matchMedia(Foundation.media_queries['large']).matches) {
        temp_css_column = large_column;
        screen_size=3;
        items_in_group = Math.floor(12 / temp_css_column);
        if(opcFixColumnsByRow&&(opcFixColumnsByRow=='mediumUp2ByRow'||opcFixColumnsByRow=='largeUp2ByRow')){
        	items_in_group = 2;
        }
    } else if (matchMedia(Foundation.media_queries['medium']).matches) {
        temp_css_column = medium_column;
        screen_size=2;
        items_in_group = Math.floor(12 / temp_css_column);
        if(opcFixColumnsByRow&&opcFixColumnsByRow=='mediumUp2ByRow'){
        	items_in_group = 2;
        }
    } else if (matchMedia(Foundation.media_queries['small']).matches) {
        temp_css_column = small_column;
        screen_size=1;
        items_in_group = Math.floor(12 / temp_css_column);
    };
    var group_number = Math.ceil(vals.length / items_in_group);
    for (var i = 0; i < group_number; i++) {
        var max_height_Group = 0;
        for (var j = 0; j < items_in_group && (i * items_in_group + j) < vals.length; j++) {
            if (absulate_heights!=null){
                max_height_Group = Math.max(max_height_Group, heights[i * items_in_group + j]+absulate_heights[i * items_in_group + j]);
            }
            else{
                max_height_Group = Math.max(max_height_Group, heights[i * items_in_group + j]);
            }
        }
        for (var k = 0; k < items_in_group && (i * items_in_group + k) < vals.length; k++) {
            $(vals[i * items_in_group + k]).css('height', max_height_Group);
        }
    }
    $(items).trigger('after-height-change').trigger('after-height-change.fndtn.equalizer');
}
function setTargetSectionImageFullHeight(targetSelector, targetInternalSelector){
	//only apply to the category page in the medium screen
	try{
		var selectorContainer= $(targetSelector);
		selectorContainer.height('auto');
		for(var index=0;index<selectorContainer.length;index++){
			var currentContainer=selectorContainer.get(index);
			$(currentContainer).find(targetInternalSelector).height('auto');	
		}
		//
		if ($(window).width() > 640 && $(window).width() <opccloudLargeBreakpoint) {
			for(var index=0;index<selectorContainer.length;index++){
				var currentContainer=selectorContainer.get(index);
				var currentContainerHeight=$(currentContainer).height();
				var currentimageOrignalHeight=$(currentContainer).find(targetInternalSelector).height();
				$(currentContainer).find(targetInternalSelector).height(currentContainerHeight);
			}
		}

	}catch(err){
		console.log(err);
	}
}
function backtoTopHomepage() {
	try {
		if ($('html').find('#categoryGroupPage').length > 0) {
			var amountScrolled = $('#categoryGroupPage .opcComponent.OPC_OVERVIEW').offset().top;
			if ($(window).scrollTop() > amountScrolled) {
				$('.oow2015-home-page-float-top-back').addClass('show-top-back');
			} else {
				$('.oow2015-home-page-float-top-back').removeClass('show-top-back');
			}
		}else if ($('html').find('#HomePage').length > 0) {
			var amountScrolled = $('#HomePage .opcComponent.OPC_IMAGE_LEFT').offset().top;
			if ($(window).scrollTop() > amountScrolled) {
				$('.oow2015-home-page-float-top-back').addClass('show-top-back');
			} else {
				$('.oow2015-home-page-float-top-back').removeClass('show-top-back');
			}
		}
	} catch (err) {
	}
}
function setOPCslick(){
	$('.customerSpotlightSlick').slick({
		  dots: true,
		  infinite: false,
		  speed: 300,
		  slidesToShow: 6,
		  arrows: true,
	      dots: false,
		  slidesToScroll: 6,
		  responsive: [
		    {
		      breakpoint: 1024,
		      settings: {
		        slidesToShow: 4,
		        slidesToScroll: 4,
		        infinite: true
		      }
		    },
		    {
		      breakpoint: 600,
		      settings: {
		        slidesToShow: 2,
		        slidesToScroll: 2
		      }
		    },
		    {
		      breakpoint: 480,
		      settings: {
		        slidesToShow: 1,
		        slidesToScroll: 1
		      }
		    }
		  ]
		});
	$('.customerSpotlightSlick').show();
} 
function setCustomerWidget(){
	$('.customerWidget').slick({
		  dots: true,
		  infinite: false,
		  speed: 300,
		  slidesToShow: 5,
		  arrows: true,
	      dots: false,
		  slidesToScroll: 5,
		  onAfterChange: function() {
		    var activeSlides = $('.opcCustomerSpotlightLayout .customerWidget .slick-active');
			var firstActiveIndex = parseInt(activeSlides.eq(0).attr('index'));
			var isSelectedVisible = false;
				for(var i=0, len=activeSlides.length; i < len; i++){
					  if( parseInt(activeSlides.eq(i).attr('index')) === selectedIndex) {
						isSelectedVisible = true;
						break;
					  }	
				}
			if (!isSelectedVisible) {
				$('.opcCustomerSpotlightLayout .customerWidget .slick-slide:not(.slick-cloned)').eq(firstActiveIndex).trigger("click");
			}	
		  },
		  responsive: [
		    {
		      breakpoint: 1024,
		      settings: {
		        slidesToShow: 4,
		        slidesToScroll: 4,
		        infinite: false
		      }
		    },
		    {
		      breakpoint: 600,
		      settings: {
		        slidesToShow: 2,
		        slidesToScroll: 2
		      }
		    },
		    {
		      breakpoint: 480,
		      settings: {
		        slidesToShow: 1,
		        slidesToScroll: 1
		      }
		    }
		  ]
		});
	$('.customerWidget').show();
	$(".opcCustomerSpotlightLayout .customerWidget .opcImageTileImageContainer").css("display","block");
		//initial selection
	var selectedIndex = 0;
	var customerWidgetSlides = $('.opcCustomerSpotlightLayout .customerWidget .slick-slide:not(.slick-cloned)');
	var customerPanels = $(".opcCustomerSpotlightLayout .customersDetailBlock .customerPanel");
	customerWidgetSlides.eq(selectedIndex).toggleClass("selected");
	customerPanels.eq(selectedIndex).show();
	customerPanels.eq(selectedIndex).toggleClass("selected");
	//click event
			customerWidgetSlides.click( function (e) {
			var $currTarget = $(e.currentTarget), 
				newIndex = parseInt($currTarget.attr('index'));
				
				if( newIndex !== selectedIndex) {

				 customerPanels.eq(selectedIndex).hide();
				 customerPanels.eq(selectedIndex).toggleClass("selected");
				 $(this).toggleClass("selected");
				 
				 customerPanels.eq(newIndex).show();
				 setTimeout(function () {
					customerPanels.eq(newIndex).toggleClass("selected");
				 }, 500);
				 customerWidgetSlides.eq(selectedIndex).toggleClass("selected");
				 selectedIndex = newIndex;
				 
				}
		});
}

function customerApiWidgetLoad() {
	var ComponentCollections = [];

	$(".opcCustomerSpotlightLayout .customerApiWidget").each(function() {
		var vueInstances = [];
		$(this).find(".reactiveContent").each(function() {
			vueInstances.push($(this).attr("vueid"));
		});
		
		var component = {
			componentId: "#".concat($(this).attr("id")),
			vueIds: vueInstances
		}
		  ComponentCollections.push(component);
	});

	if(ComponentCollections.length > 0) {		 
			for ( var s = 0; s < ComponentCollections.length; s++ ) {
				 $.each( getVueInstanceArray(ComponentCollections[s].vueIds) , function( index, value ) {
					value.fetchData();
				 });				
			}		 		 
	}
	
	function getVueInstanceArray(idArr) {
	  var vueInstances = [], global = window; 
	 
	  for(var i =0, len =idArr.length ; i < len; i++) {
		  for (var prop in global) {
			if ( prop === idArr[i] ) {
			  vueInstances.push(global[prop]);
			  break;
			}
		  }
	  }
	  return vueInstances;
	}
	
}
function opcTrainingPromotionStamp() {
	$('#ServicePage .opcPromotionStamp').closest('.opcComponent.opcsText').addClass("opcPromotionStampContainer");
}
function SetActiveLearnMoreLink(learnmoreHeaderBlock,titleSelector,headerItemSelector){
	var block=$(learnmoreHeaderBlock);
	block.find(headerItemSelector).removeClass('active');
	var currentTitleBlock=block.find(titleSelector);
	var linkblockID=currentTitleBlock.attr('link');
	if(linkblockID){
		var linkblock=block.find('#'+linkblockID);
		linkblock.addClass('active');
	}
}
	
function bind_opcSelectbox_change(){	 
	$('#PageNavBandSectionMobile').bind('change', function () {
	    var url = $(this).find(":selected").val(); 
		var isNabFixed=$('.opcComponent.opccPageNavBandLayout').parents('.opcComponent-container').hasClass('fixedNavBand');
	    if (url) { 
	    	var $target = $("#"+url);
			if (isNabFixed==true){
		    	$('html, body').stop().animate({
					'scrollTop' : $target.offset().top-44-42-41
				}, 900, 'swing');
			}else{
		    	$('html, body').stop().animate({
					'scrollTop' : $target.offset().top-44-42-41-77
				}, 900, 'swing');
			}
	    }
	    return false;
	});
}
function process_opcSVGTags(){
	$(".opcSVG").each(
			function(index) {
				var opcSVGFile = "/res/css/symbol-defs.svg";
				var opcSVGFileAttr = $(this).attr("file");
				if (typeof opcSVGFileAttr !== typeof undefined && opcSVGFileAttr !== false) {
					opcSVGFile = opcSVGFileAttr; 
				}
				$(this).after(
						"<svg class=\"" + $(this).attr("cssclass") + "\">" +
						"<use xlink:href=\"" + opcSVGFile + "#" +
						$(this).attr("id") + 
						"\"></use></svg>");
			});

}
function updateOPCInternalURL(){
	$(".opcinternalurl").each(function(index, element) {
		var url = $(element).attr("href");
		if (url !== undefined) {
			if (url.indexOf("${siteid}") !== -1) {
				$(element).attr("href", url.replace('${siteid}',$("html").attr("siteid")));

			} else {
        		$(element).attr("href", "/" + $("html").attr("siteid") + $(element).attr("href"));
        	}
    	}	
	}); 
}
function updateOPCResourceURL(){
	$(".opcresourceurl").each(function(index, element) {
		var url = $(element).attr("href");
		if (url !== undefined) {
			siteidurl = $(element).attr($("html").attr("siteid").toLowerCase());
			if (siteidurl !== undefined) {
				$(element).attr("href", siteidurl);
			}
    	}	
	}); 
}
function updateMenuSearchBoxWidth(){
	var screen_size=3;
	var breakpointScreensize=0;
    if (matchMedia(Foundation.media_queries['large']).matches) {
        screen_size=3;
    } else if (matchMedia(Foundation.media_queries['medium']).matches) {
        screen_size=2;
    } else if (matchMedia(Foundation.media_queries['small']).matches) {
        screen_size=1;
    }
    if(screen_size>1){
    	   var menuBuyItWidth=$('.menu-buyit').outerWidth();
    	   var menuFreeTrialWidth=$('.menu-right-block-free-trial-block').width();
    	   var searchInputWidth=180;//11.25rem
    	    if(menuBuyItWidth&&menuFreeTrialWidth){
    	    	searchInputWidth=menuBuyItWidth+menuFreeTrialWidth;
    	    	$('.menu-first-row-search-input-block').width(searchInputWidth);
    	    }		
    }
}
function hightlightMenuCategory(){
	var currentPageContainer=$('html .opcComponent-container');
	var currentPageClassName=currentPageContainer.attr('class');
	if(currentPageClassName){
		if (currentPageClassName.toLowerCase().indexOf('resources_saas') !== -1 ||
				currentPageClassName.toLowerCase().indexOf('resources_paas') !== -1 ||
				currentPageClassName.toLowerCase().indexOf('resources_iaas') !== -1 ) {
			$('.has-dropdown.resourcess-menu-has-dropdown').addClass('hightlightMenuSupportItem');
		} else if (currentPageClassName.toLowerCase().indexOf('saas') !== -1 ) {
		    $('.has-dropdown.offers-menu-has-dropdown.application').addClass('hightlightMenuSaasItem');
		}else if (currentPageClassName.toLowerCase().indexOf('paas') !== -1 ) {
		    $('.has-dropdown.offers-menu-has-dropdown.platform').addClass('hightlightMenuPaasItem');
		}else if (currentPageClassName.toLowerCase().indexOf('iaas') !== -1 ) {
		    $('.has-dropdown.infrastructure-menu-has-dropdown').addClass('hightlightMenuIaasItem');
		}
	}
}
function addBorderOnServiceFeature(){
	var serviceFeatureOffers=$('#ServicePage .opcComponent-container .opcComponent.PRODUCT_OFFER');
	if (serviceFeatureOffers){
		var lastServiceFeatureOffer=$(serviceFeatureOffers[0]);
		lastServiceFeatureOffer.addClass("firstServiceOfferBorderLine"); 
	}
}
function setServiceNavbarHighlight(){
	try{
		$('.opcComponent.OPC_SERVICE_NAVBAR ul li').removeClass('active');
		var currentPageContainer=$('html #ServicePage .opcComponent-container');
		var currentPageClassName=currentPageContainer.attr('class');
		var navLevel=1;
		var currentPageIndex="";
		var words = currentPageClassName.split(" ");
		var CategorySERVICETAB="SERVICENAV";
		var CategoryLMTAB="LEARNMORESUB";
		var CategoryOFFERFEATURETAB="OFFERINGFEATURESUB";
		var CategoryOFFERPRICINGTAB="OFFERINGPRICINGSUB";
		var TAB_LM="OPC_TAB_LM";
		//contributor type the wrong tyep in
		var TAB_LM_WorkAround1="OPC_TAB_LEARNMORE";
		var TAB_LM_WorkAround2="OPC_TAB_LEARNMOTE";
		var TAB_FEATURES_OFFER="OPC_TAB_FEATURES";
		var TAB_FEATURES_PRICING="OPC_TAB_PRICING";
		var currentPageCategory=CategorySERVICETAB;
		
		for(var i = 0; i < words.length; i++) {
			if (words[i].startsWith('OPC_TAB_')){
				currentPageIndex=words[i];
			}
		}
		if(currentPageIndex){
			if(currentPageIndex.startsWith('OPC_TAB_LM_')){
				currentPageCategory=CategoryLMTAB;
			}else if(currentPageIndex.startsWith('OPC_TAB_FEATURES_')){
				currentPageCategory=CategoryOFFERFEATURETAB;
			}else if(currentPageIndex.startsWith('OPC_TAB_PRICING_')){
				currentPageCategory=CategoryOFFERPRICINGTAB;
			}
		}		
		if (currentPageContainer){
			if(currentPageIndex){
				if(currentPageCategory&&currentPageCategory==CategorySERVICETAB){
					var hightlightComponent=$('.opcComponent.OPC_SERVICE_NAVBAR').find("a#"+currentPageIndex); 
					hightlightComponent.parents('li').addClass('active');	
					var hightlightComponentMobile=$('.opcComponent.OPC_SERVICE_NAVBAR').find("option#"+currentPageIndex); 
					hightlightComponentMobile.attr('selected','true');	
				}
				else if(currentPageCategory&&currentPageCategory==CategoryLMTAB){
					var hightlightComponent=$('.opcComponent.OPC_SERVICE_SUBNAVBAR').find("a#"+currentPageIndex); 
					hightlightComponent.parents('li').addClass('active');	
					$('.opcComponent.OPC_SERVICE_NAVBAR').find("a#"+TAB_LM).parents('li').addClass('active');
					var hightlightComponentMobile=$('.opcComponent.OPC_SERVICE_SUBNAVBAR').find("option#"+currentPageIndex); 
					hightlightComponentMobile.attr('selected','true');	
					$('.opcComponent.OPC_SERVICE_NAVBAR').find("option#"+TAB_LM).attr('selected','true');
					//add workaround cuz contributor type the wrong type
					$('.opcComponent.OPC_SERVICE_NAVBAR').find("a#"+TAB_LM_WorkAround1).parents('li').addClass('active');
					$('.opcComponent.OPC_SERVICE_NAVBAR').find("option#"+TAB_LM_WorkAround1).attr('selected','true');
					$('.opcComponent.OPC_SERVICE_NAVBAR').find("option#"+TAB_LM_WorkAround2).attr('selected','true');
				}else if(currentPageCategory&&currentPageCategory==CategoryOFFERFEATURETAB){
					var hightlightComponent=$('.opcComponent.OPC_SERVICE_OFFERNAVBAR').find("a#"+currentPageIndex); 
					hightlightComponent.parents('li').addClass('active');	
					$('.opcComponent.OPC_SERVICE_NAVBAR').find("a#"+TAB_FEATURES_OFFER).parents('li').addClass('active');
					var hightlightComponentMobile=$('.opcComponent.OPC_SERVICE_OFFERNAVBAR').find("option#"+currentPageIndex); 
					hightlightComponentMobile.attr('selected','true');	
					$('.opcComponent.OPC_SERVICE_NAVBAR').find("option#"+TAB_FEATURES_OFFER).attr('selected','true');
				}else if(currentPageCategory&&currentPageCategory==CategoryOFFERPRICINGTAB){
					var hightlightComponent=$('.opcComponent.OPC_SERVICE_OFFERNAVBAR').find("a#"+currentPageIndex); 
					hightlightComponent.parents('li').addClass('active');	
					$('.opcComponent.OPC_SERVICE_NAVBAR').find("a#"+TAB_FEATURES_PRICING).parents('li').addClass('active');
					var hightlightComponentMobile=$('.opcComponent.OPC_SERVICE_OFFERNAVBAR').find("option#"+currentPageIndex); 
					hightlightComponentMobile.attr('selected','true');	
					$('.opcComponent.OPC_SERVICE_NAVBAR').find("option#"+TAB_FEATURES_PRICING).attr('selected','true');
				}
			}
		}
	}catch(err){
		console.log(err);
	}
}

function SetMenuLinkWholeAreaClickable(){
	$('#ServicePageNavBandSection ul li').click(function(){
		   var target = "_self";
		   if ($(this).find("a").attr("target") != undefined) {
		   	target  = $(this).find("a").attr("target");
		   }
		   window.open($(this).find("a").attr("href"), target); 
		   return false;
	});
	$('#ServicePageSubNavBandSection ul li').click(function(){
		   var target = "_self";
		   if ($(this).find("a").attr("target") != undefined) {
		   	target  = $(this).find("a").attr("target");
		   }
		   window.open($(this).find("a").attr("href"), target); 
		   return false;
	});
	$('#ServicePageOfferNavBandSection ul li').click(function(){
		   var target = "_self";
		   if ($(this).find("a").attr("target") != undefined) {
		   	target  = $(this).find("a").attr("target");
		   }
		   window.open($(this).find("a").attr("href"), target); 
		   return false;
	});
}
$(document).on('click','.opcRRNotfoundAlertPanel .close', function(event) {
	$('.opcRRNotfoundAlertPanel').hide();
});
function ReadinessHelper(options) {
	this.options = $.extend({
		LoadImageId: '#loading-image',
		LoadImageIdMobile: '#loading-image-mobile',
		targetShowPanelID: '#opcReadinessProxyReturn',
		targetShowPanelIDMobile: '#opcReadinessProxyReturnMobile',
		httpMethod:'POST',
		requestSiteid:'en_us',
		tags:'',
		assetname:'',
		proxyurl:"/api/v1/readiness",
		ajaxRRSelectBox:"#opcReadinessProxyReturn select.opcReadinessSelection",
		ajaxRRSelectBoxMobile:"#opcReadinessProxyReturnMobile select.opcReadinessSelection",
		ProxyUrlHtmlTag:".opcReadinessProxySection", 
		callBackErrorIndicatorClass:"opcReadiness-error-return",
		NotfoundAlertPanel:".opcRRNotfoundAlertPanel",
		NotfoundAlertPanelContentPanel:".opcRRNotfoundAlertPanel .opcRRNotfoundAlertPanelContent",
		NotfoundAlertPanelContent:"",
		OriginalNotfoundAlertPanelText:$('.opcClient-rr-no-found-text').html(),
		PreviousSlectOptionTagValue:""
	}, options);
};
ReadinessHelper.prototype = {
	setUpReadinessProxyURLContent:function(requestSiteid,tags,assetname){
		if (requestSiteid){
			this.options.requestSiteid=requestSiteid;
		}else{
			var htmlSiteid=$('html').attr('siteid')
			if (htmlSiteid){
				this.options.requestSiteid=htmlSiteid;
			}
			else{
				this.options.requestSiteid="en_US";
			}
		}
		if (tags){
			this.options.tags=tags;
		}else{
			this.options.tags="";
		}
		if (assetname){
			this.options.assetname=assetname;
		}else{
			var bodyAssetName=$("body").data("assetname");
			if (bodyAssetName){
				this.options.assetname=bodyAssetName;
			}else{
				this.options.assetname="";
			}
		}
	},
	setUpReadinessProxyURL:function(proxyurl){
		if(proxyurl) {
		this.options.proxyurl=proxyurl;
		}
	},
	setUpProxyUrlHtmlTag:function(proxyUrlHtmlTag){
		this.options.ProxyUrlHtmlTag=ProxyUrlHtmlTag;
	},
	setUpAjaxRRSelectBox:function(ajaxRRSelectBox){
		this.options.ajaxRRSelectBox=ajaxRRSelectBox;
	},
	setUpAjaxRRSelectBoxMobile:function(ajaxRRSelectBoxMobile){
		this.options.ajaxRRSelectBoxMobile=ajaxRRSelectBoxMobile;
	},
	updateRRnotFoundMessage:function(notfoundStr){
		this.options.NotfoundAlertPanelContent=notfoundStr;
	},
	getReadinessResult:function(){
		var orginalInstance=this;
		var actionUrl=orginalInstance.options.proxyurl;
		$(orginalInstance.options.LoadImageId).show();
		$(orginalInstance.options.LoadImageIdMobile).show();
		$(orginalInstance.options.NotfoundAlertPanel).hide();
		$(orginalInstance.options.NotfoundAlertPanelContentPanel).text("");
	    $.ajax({
	        url: actionUrl,
	        type: orginalInstance.options.httpMethod,
	        data: { 
	            'requestSiteid': orginalInstance.options.requestSiteid, 
	            'tags': orginalInstance.options.tags,
	            'assetname':orginalInstance.options.assetname
	        },
			error: function(data) { 
			   	$(orginalInstance.options.LoadImageId).hide();
				$(orginalInstance.options.LoadImageIdMobile).hide();
			   	orginalInstance.postErrorReadinessCallBack(data);
			},
			complete: function(){
			    $(orginalInstance.options.LoadImageId).hide();
			    $(orginalInstance.options.LoadImageIdMobile).hide();
			},
			success: function(data) {
				$(orginalInstance.options.LoadImageId).hide();
				$(orginalInstance.options.LoadImageIdMobile).hide();
			    //location.reload();
				orginalInstance.postSuccessReadinessCallBack(data);
				// reflow accordion
				$(document).ready(function() {
					$(document).foundation({
					accordion: {
						 content_class: 'content',
						 active_class: 'active',
						 multi_expand: true,
						 toggleable: true
							   },
					    reveal: {
							  animation: 'fadeAndPop',
							  animation_speed: 250,
							  close_on_background_click: true,
							  close_on_esc: true,
							  dismiss_modal_class: 'close-reveal-modal',
							  bg_class: 'reveal-modal-bg',
							  root_element: 'body',
							  open: function(){},
							  opened: function(){},
							  close: function(){},
							  closed: function(){},
							  bg : $('.reveal-modal-bg'),
							  css : {
								open : {
								  'opacity': 0,
								  'visibility': 'visible',
								  'display' : 'block'
								},
								close : {
								  'opacity': 1,
								  'visibility': 'hidden',
								  'display': 'none'
								}
							  }
							}		   
					 });
					$('.opcReadinessReleaseSection').foundation('reflow');
                    $("#ServicePage .OPC_RR_NAVBAR").foundation({
						accordion: {
							 content_class: 'content',
							 active_class: 'active',
							 multi_expand: false,
							 toggleable: true
							}	
					});
					$("#ServicePage .OPC_RR_NAVBAR").foundation('accordion','reflow');
					$(".ReleaseGroup .accordion").on('toggled', function (event, target) {
						target.prev("a").find("span:first-of-type").toggleClass("arrow-right arrow-down");
					});
					$(".RR_GROUP .accordion").on('toggled', function (event, target) {
						target.prev("a").find("span:first-of-type").toggleClass("arrow-right arrow-down");
					});					
					if( $(".show-for-medium-up.OPC_RR_NAVBAR > .readinessSideBar").hasClass("hiddenMenu") ) {
						$("select.opcReadinessSelection").closest(".columns").addClass("large-5");
					}
					$("select.opcReadinessSelection").addClass("B6");

				});
			}
	    });  
	},
	postSuccessReadinessCallBack:function(data){
		//For RR page, due to the requirement of client side, there are alway to set of separate code for each page
		var showForForMobile=true;
		var processForMobileUp=true;
		if (showForForMobile==true){
			var prePanelContent=$(this.options.targetShowPanelIDMobile).html();			
			if (data.indexOf(this.options.callBackErrorIndicatorClass)!=-1){
				//$(".readinessSideBar .side-nav > li").removeClass("selected");
				//opcReadinessMenuSelected.addClass("selected");
				$(this.options.NotfoundAlertPanelContentPanel).html(this.options.NotfoundAlertPanelContent);
				$(this.options.NotfoundAlertPanel).show();
				$(this.options.targetShowPanelIDMobile).html(prePanelContent);
				this.highlightContentSelectedOption();
			}else{
				$(this.options.targetShowPanelIDMobile).empty();
				$(this.options.targetShowPanelIDMobile).append(data);
				$(this.options.ajaxRRSelectBoxMobile).find('[tags="'+this.options.tags+'"]').prop('selected', true);
				var splitArr = $("#opcReadinessProxyReturnMobile .opcComponent-container").eq(0).attr("class").trim().split(" ");
				var RRVSelected = "";

				for (var i=0;i <splitArr.length;i++) {
					if( splitArr[i].startsWith("RRV") ) {
						RRVSelected = splitArr[i];
						break;
					}		
				}

				$(this.options.ajaxRRSelectBoxMobile).children("option").filter(function( index ) {
					return $(this).attr("tags").indexOf(RRVSelected) !== -1
				}).prop('selected', true);
			}
			this.bindRRselectAjaxChnage("MobileID");
		}
		if (processForMobileUp==true){
			var prePanelContent=$(this.options.targetShowPanelID).html();			
			if (data.indexOf(this.options.callBackErrorIndicatorClass)!=-1){
				//$(".readinessSideBar .side-nav > li").removeClass("selected");
				//opcReadinessMenuSelected.addClass("selected");
				$(this.options.NotfoundAlertPanelContentPanel).html(this.options.NotfoundAlertPanelContent);
				$(this.options.NotfoundAlertPanel).show();
				$(this.options.targetShowPanelID).html(prePanelContent);
				this.highlightContentSelectedOption();
			}else{
				$(this.options.targetShowPanelID).empty();
				$(this.options.targetShowPanelID).append(data);
				$(this.options.ajaxRRSelectBox).find('[tags="'+this.options.tags+'"]').prop('selected', true);
				var splitArr = $("#opcReadinessProxyReturn .opcComponent-container").eq(0).attr("class").trim().split(" ");
				var RRVSelected = "";

				for (var i=0;i <splitArr.length;i++) {
					if( splitArr[i].startsWith("RRV") ) {
						RRVSelected = splitArr[i];
						break;
					}		
				}
				$(this.options.ajaxRRSelectBox).children("option").filter(function( index ) {
					return $(this).attr("tags").indexOf(RRVSelected) !== -1
				}).prop('selected', true);				
			}
			this.bindRRselectAjaxChnage("desktopID");
		}

	},
	postErrorReadinessCallBack:function(data){
		var showForForMobile=true;
		var processForMobileUp=true;
		if (showForForMobile==true){
			$(this.options.targetShowPanelID).empty();
			$(this.options.targetShowPanelID).append(data);
		} else{
			$(this.options.targetShowPanelIDMobile).empty();
			$(this.options.targetShowPanelIDMobile).append(data);			
		}
	},
	highlightContentSelectedOption:function(){
		var tags=this.options.PreviousSlectOptionTagValue;
		$(this.options.ajaxRRSelectBox).find('[tags="'+tags+'"]').prop('selected', true);
		$(this.options.ajaxRRSelectBoxMobile).find('[tags="'+tags+'"]').prop('selected', true);
	},
	bindRRselectAjaxChnage:function(selectboxID){
		var orginalInstance=this;
		var actionUrl=orginalInstance.options.proxyurl;
		var tempAjaxSelectbox;
		if (selectboxID=="desktopID"){
			tempAjaxSelectbox=orginalInstance.options.ajaxRRSelectBox;
		}else{
			tempAjaxSelectbox=orginalInstance.options.ajaxRRSelectBoxMobile;
		}
		var proxyUrlHtmlTag=orginalInstance.options.ProxyUrlHtmlTag;
		var tempOriginalNotfoundAlertPanelText=orginalInstance.options.OriginalNotfoundAlertPanelText;
	   $(tempAjaxSelectbox).focus(function(){
		   var slectedOption=$(tempAjaxSelectbox+' option:selected');
           var theTagValue = slectedOption.attr('tags');
           orginalInstance.options.PreviousSlectOptionTagValue=theTagValue;
       });
		$(tempAjaxSelectbox).bind('change', function () {
			var currentSiteid=$('html').attr('siteid');
			var slectedOption=$(tempAjaxSelectbox+' option:selected');
			var slectedOptionText=$(tempAjaxSelectbox+' option:selected').text();
			var tags = slectedOption.attr("tags");
			var assetname=slectedOption.attr("assetname");
			var proxyurl=$(proxyUrlHtmlTag).attr('proxyurl');
			if (!proxyurl){
				proxyurl=actionUrl;
			}
			if (slectedOptionText){		
				orginalInstance.updateRRnotFoundMessage(slectedOptionText+" "+tempOriginalNotfoundAlertPanelText);
			}
			opcReadinessMenuSelected = $(".readinessSideBar .side-nav > li").filter(function() {
				return $(this).hasClass( "selected" );
			});
			orginalInstance.setUpReadinessProxyURL(proxyurl);
			orginalInstance.setUpReadinessProxyURLContent(currentSiteid,tags,assetname);
			orginalInstance.getReadinessResult();
		});	
	},
	init:function(data){
		
	}
}
var ReadinessHelperInstance=new ReadinessHelper();
$(document).ready(function() {
	updateOPCInternalURL();
	updateOPCResourceURL();
	//showOPCSlider();
	process_opcSVGTags();
	//update menu to have button and search box same width
	updateMenuSearchBoxWidth();
	hightlightMenuCategory();
	SetMenuLinkWholeAreaClickable();
	addBorderOnServiceFeature();
	if ($('html').find('#ServicePage').length >0) {
		setServiceNavbarHighlight();
		bind_ServiceOpcSelectbox_change(); 
		SetActiveLearnMoreLink('#ServicePage .opcComponent.OPC_SERVICE_DATASHEETS_HEADER','h3.black','ul li');
		//add promotion equalizer function
		setSectionDescEqualWithNoImage('#ServicePage .opcComponent.OPC_PROMOTION .opcObject-container .opcObject .opcDescContainer','.opcObject','.opcObjectContentsFirstBlock',1024);
	}
	opcPricingDropDown();
	
	opcAddMissingAnalyticsAttributes();
	
	opcRandomizeAssets();
	//for readiness proxy page only
	opcNewTrialSetup();
	setUpCategoryPageOfferingDisplay();
	resetProductOfferDisplay();
	updateOpcReadinessOverviewUrl();
	// customer Widget
	setCustomerWidget();
	customerApiWidgetLoad();
	opcTrainingPromotionStamp();
});
Foundation.utils.image_loaded($('.opcComponent.opcSlider img'), function () {
	   showOPCSlider(); 
});
$( window ).resize(function() {
	updateMenuSearchBoxWidth();	//update menu to have button and search box same width
	if ($('html').find('#ServicePage').length >0) {
		//add promotion equalizer function
		setSectionDescEqualWithNoImage('#ServicePage .opcComponent.OPC_PROMOTION .opcObject-container .opcObject .opcDescContainer','.opcObject','.opcObjectContentsFirstBlock',1024);
		var menu_array=[];
		var targetSections=$('[opc-manual-equlizer="OPC_PROMOTION"]');
		var equalizerID;
		for(var index=0;index<targetSections.length;index++){
			equalizerID=$(targetSections[index]).attr('opc-equalizer-id');
			if (equalizerID){
				equalizerOnBlocks('OPC_PROMOTION', equalizerID);
			} 
		}
	}
});
//single video modal support, get the video id 
var opcvideoid;
var opcvideotitle;
var opcvideoPageID;
var opcvideoURL;
var opcvideoObject;
var opcvideoDesc;
var opctryitdialoginfoindex;

$(document).on('click','.opcvideo-modal-btn', function(e) {
    opcvideoid = $(this).attr('opcvideoid');
    opcvideotitle = $(this).attr("opcvideotitle");
    opcvideoPageID=$(this).attr("opcvideopageid");   
    opcvideoURL=$(this).attr("opcvideourl"); 
    opcvideoObject=$(this).attr("opcvideoobject"); 
    opcvideoDesc=$(this).attr("opcvideodescription"); 
    
	opctryitdialoginfoindex=$(this).attr("opctryitdialoginfoindex"); 
	var tooltipTitleStr = opcvideotitle.replace(/'/g, '&#39;');
	var newTooltip = "<h4>" + tooltipTitleStr + "</h4>";
	tooltipTitleStr = jQuery(newTooltip).text();
    var str_iframe = "<h4 class='title' title='"+tooltipTitleStr+"'>"+opcvideotitle+"</h4>";
    $('#opcmodal-video h4').replaceWith(str_iframe);
    $('#opcmodal-tryit h4').replaceWith(str_iframe);
    $('#opcmodal-selecttrialservice h4').replaceWith(str_iframe);
    //pop up dialogue info
    $('#opcmodal-selecttrialservice .opcmodal-info-block').empty();
    $('#opcmodal-selecttrialservice .opcmodal-info-block').append($(opctryitdialoginfoindex+'.dialogue-try-pop-up-info-content').children().clone());
   
    $('#opcmodal-video .cloud-dialog-caption').children().replaceWith("<div class='small-12 columns'><div class='p3'>"+opcvideoDesc+"</div></div>"); 

    if(opcvideoURL) {
    	$('#opcmodal-video .modal-viewall-button').attr('href',opcvideoURL);
    	$('#opcmodal-video .modal-viewall-button').show();
    } else {
    	$('#opcmodal-video .modal-viewall-button').hide();
	};

    $('#wcsmodal-readiness-video h4').replaceWith(str_iframe);
   
    if (matchMedia(Foundation.media_queries['large']).matches) {
    	$('#opcmodal-video').removeClass("small");
    	$('#opcmodal-video').removeClass("medium");
    	$('#opcmodal-video').removeClass("large");
    	$('#opcmodal-video').addClass("medium");
    	
    } else if (matchMedia(Foundation.media_queries['medium']).matches) {
    	$('#opcmodal-video').removeClass("small");
    	$('#opcmodal-video').removeClass("medium");
    	$('#opcmodal-video').removeClass("large");
    	$('#opcmodal-video').addClass("medium");
        
    } else if (matchMedia(Foundation.media_queries['small']).matches) {
    	$('#opcmodal-video').removeClass("small");
    	$('#opcmodal-video').removeClass("medium");
    	$('#opcmodal-video').removeClass("large");
    	$('#opcmodal-video').addClass("small"); 
    };   
});

//Special case. If we don't have a link to put here then we should enable the close button instead
$('#opcmodal-video .modal-close-button').on('click', function() {
	$('#opcmodal-video').foundation('reveal', 'close');
});

var BCL = {};
BCL.isPlayerAdded = false;

function opcOnBrightcoveTemplateLoaded(id) 
{
	BCL.player = brightcove.getExperience(id);
	BCL.experienceModule = BCL.player.getModule(APIModules.EXPERIENCE);
	BCL.videoPlayer = BCL.player.getModule(APIModules.VIDEO_PLAYER);
};

$(document).on('opened.fndtn.reveal', '[data-reveal][opcsingleVideoModal]', function () {
    var modal = $(this);
    var element_id = $(this).attr('id');
    var obj_parent = "#" + element_id + " .flex-video";
	
	if (opcvideoObject == "brightcove")
	{
	    if (BCL.isPlayerAdded == false) 
		{
			var playerKey = (typeof opcvideoid === 'string') ? opcvideoid.substr(0, opcvideoid.indexOf(' ')) : "";
			var videoId   = (typeof opcvideoid === 'string') ? opcvideoid.substr(opcvideoid.indexOf(' ')+1) : opcvideoid.toString();

			if (playerKey == "") playerKey = "AQ~~,AAACtzWhMPk~,yakyzylX4OTWF9pGj-PWpALbZnJjRNjn";
			
			BCL.isPlayerAdded = true;
			var str_object = "<object id='myExperience' class='BrightcoveExperience'>"
						   + "<param name='bgcolor' value='black'/>"
						   + "<param name='width' value='1280'/>"
						   + "<param name='height' value='720'/>"
						   + "<param name='playerKey' value='"+playerKey+"'/>"
						   + "<param name='isVid' value='true'/>"
						   + "<param name='isUI' value='true'/>"
						   + "<param name='secureConnections' value='true'/>"
						   + "<param name='secureHTMLConnections' value='true'/>"
						   + "<param name='dynamicStreaming' value='true'/>"
						   + "<param name='@videoPlayer' value='"+videoId+"'/>"
						   + "<param name='templateLoadHandler' value='onBrightcoveTemplateLoaded'>"
						   +"</object>";
			var replace_tag = $(obj_parent).children();
			$(replace_tag).replaceWith(str_object);
			brightcove.createExperiences();
		}
	}
	else if (opcvideoObject == "youtube" || opcvideoObject == "medianetwork")
	{
		var str_iframe = "<iframe id='player-frame' frameborder='0' allowfullscreen='' ></iframe>";
		var replace_tag = $(obj_parent).children();
		$(replace_tag).replaceWith(str_iframe);

		var h = $("#opcmodal-video #player-frame").height();
		var w = $("#opcmodal-video #player-frame").width();
		if(opcvideoid.search("brightcove")!=-1) {
			opcvideoid+="&width="+w+"&height="+h;
		}
		$("#opcmodal-video #player-frame").attr("src", opcvideoid);
		if(opcvideoObject == "youtube") {
			$(".flex-video").addClass("vimeo");
		}
	}
	else if (opcvideoObject == "vimeo") {
		var str_iframe = "<iframe id='player-frame' width='400' height='225' frameborder='0' ></iframe>";		
		var replace_tag = $(obj_parent).children();
		$(replace_tag).replaceWith(str_iframe);
		$("#opcmodal-video #player-frame").attr("src", opcvideoid);
		$(".flex-video").addClass("vimeo");
	}
	
});

$(document).on('closed.fndtn.reveal', '[data-reveal][opcsingleVideoModal]', function () {
	try{
    var modal = $(this);
    var element_id = $(this).attr('id');
	
	if ((opcvideoObject == "brightcove") && BCL.isPlayerAdded)
	{
		BCL.isPlayerAdded = false;
		BCL.experienceModule.unload();
	}
	
    $("#" + element_id + " .flex-video").children().replaceWith('<div id="opc-feature-modal-video" />');
	}
	catch(err){
		console.log(err);
	}

});
function showOPCSlider(){
	$('.da-slider.opc-da-slider').show();
}
//for service features page only
function setFirstLastFeature(){
	try{
		 var containers=$('.opcComponent-container');
		 var getFirstElement=false;
		 var lastFeatureIndex;
	     for ( var i = 0; i < containers.length; i++ )
	     {
	    	 var element=$(containers[i]);
	    	 if(element.find('.opcComponent.OPC_IMAGE_NOT_EXIST').length>0||
	    	    element.find('.opcComponent.OPC_IMAGE_EXIST').length>0){
	    		 lastFeatureIndex=i;
	    		 if(getFirstElement==false){
	    			 element.addClass('firstFeature');
	    			 getFirstElement=true;
	    		 }
	    	 }
	     }
    	 if(lastFeatureIndex){
    		 $(containers[lastFeatureIndex]).addClass('lastFeature');
    	 }	
	}catch(err){
		console.log(err);
	}	
}
function setNavBand(){
	 var NavSelected = -1;
	 var NavSections = [];
	 var NavSubitems;
	$(".opcAnchor").each(function(index) {
		$("#PageNavBandSection ul").append("<li><a href=\"#" + $(this).attr("id") + "\">"+ $(this).text() + "</a></li>");
		$("#PageNavBandSectionMobile select").append("<option value='" + $(this).attr("id") + "'>"+ $(this).text() + "</option>");
		$(this).parent().attr("id", $(this).attr("id"));
	});
	$("#PageNavBandSection a").each( function(i){
		NavSections.push($(this).attr("href"));
	});
	NavSubitems = $("#PageNavBandSection").find("li");
	$('#PageNavBandSection a[href^="#"]').on('click', function(e) {
		e.preventDefault();
		var target = this.hash;
		var $target = $(target);
		$('html, body').stop().animate({'scrollTop' : $target.offset().top - 44 - 42 - 41
		}, 900, 'swing');
	});   
	bind_opcSelectbox_change();
}
//******************************//
/*************SERVICE LEARN MORE *********/
function bind_ServiceOpcSelectbox_change(){	 
	$('#MobileServicePageNavBandSection select').bind('change', function () {
	    var url = $('#MobileServicePageNavBandSection option:selected').attr("href");
	    if (url) { 
		   var target = "_self";
		   if ($('#MobileServicePageNavBandSection option:selected').attr("target") != undefined) {
		   	target  = $('#MobileServicePageNavBandSection option:selected').attr("target");
		   }
		   window.open(url, target); 
	    }
	    return false;
	});	
	$('#MobileServicePageSubNavBandSection select').bind('change', function () {
	    var url = $('#MobileServicePageSubNavBandSection option:selected').attr("href");
	    if (url) { 
			   var target = "_self";
			   if ($('#MobileServicePageSubNavBandSection option:selected').attr("target") != undefined) {
			   	target  = $('#MobileServicePageSubNavBandSection option:selected').attr("target");
			   }
			   window.open(url, target); 
	    }
	    return false;
	});	
	$('#MobileServicePageOfferNavBandSection select').bind('change', function () {
	    var url = $('#MobileServicePageOfferNavBandSection option:selected').attr("href");
	    if (url) { 
			   var target = "_self";
			   if ($('#MobileServicePageOfferNavBandSection option:selected').attr("target") != undefined) {
			   	target  = $('#MobileServicePageOfferNavBandSection option:selected').attr("target");
			   }
			   window.open(url, target); 
	    }
	    return false;
	});	
}

function opcPricingDropDown() {
    var PricingInfo = {};
    PricingInfo.ViewModel = function () {

	var 
	currencyList = ko.observableArray([]),
	selectedCurrency = ko.observable("USD"),
	
	loadCurrency = function () {
	$(".opcpartNumberPrices").each(function () {
	      var pricestring = $(this).attr("value");

	      if(pricestring){
	    	  var data= JSON.parse(pricestring);	
	    	  var defString = data.defaultCurrency.replace("_XSX_","'");
	       	  selectedCurrency(defString);
	       	  var len = data.cvalues.length;
	       	  for(var i=0; i< len;i++) {
	       		var currencyName = data.cvalues[i].currency.replace("___","'");
				if(currencyList.indexOf(currencyName)<0) {
					currencyList.push(currencyName);

	       	    }
	          }
	      }		  
	})
	},
	sortedCurrencyList = ko.computed(function() {
		return currencyList.slice().sort(function(a,b) {
				return a.toLowerCase() > b.toLowerCase() ? 1: -1;
		});
	});
	return {
     currencyList: sortedCurrencyList,
		selectedCurrency : selectedCurrency,
     loadCurrency: loadCurrency,
 };
	
}();
PricingInfo.ViewModel.loadCurrency();
if(document.getElementById('opcservice-contents-section')){
	ko.applyBindings(PricingInfo.ViewModel,document.getElementById('opcservice-contents-section'));
}

//Utility Function: Update Price based on Currency Selection
var opcupdatePrice = function(selection) {
	$(".opcpartNumberPrices").each(function () {
	      var pricestring = $(this).attr("value");
		  var currentPrice = "N/A";
	      if(pricestring){
		      var data = JSON.parse(pricestring);
	       	  var len = data.cvalues.length;
	       	  for(var i=0; i< len;i++) {
	       		var currencyName = data.cvalues[i].currency;
				if(currencyName.replace("___","'")== selection ) {
					   currentPrice = data.cvalues[i].value;
					   break;
				}
	       	  }
		  }
		  $(this).text(currentPrice);
	})
};

// SET up default Value once page is loaded
var initialSelection  = PricingInfo.ViewModel.selectedCurrency();
  opcupdatePrice(initialSelection);
// updating prices based on selected currency
$(document).on('change','#opccurrencyOption', function(e) {
  if(this.options[e.target.selectedIndex]){
	  var selected = this.options[e.target.selectedIndex].text;
	  if(selected) {
		 opcupdatePrice(selected);
	  }
  }
});
};
/*****/
//request a quote modal set title 
$('.opcmodalTryitLink').on('click', function (e) {
    var requestQuoteModalTitle = $(this).text();
    if(requestQuoteModalTitle){
        $('#opcmodalTryitService .dialog-title').text(requestQuoteModalTitle)
    }
});

// Add missing data-trackas and data-lbl attributes to links under "main-container"
function opcAddMissingAnalyticsAttributes() {
	var trackas = $('body').attr('data-assetname');
	if (trackas) {
	   $(".main-container a").each(function(index, element) {
			var analyticsAttr = $(element).attr('data-trackas');
			if (analyticsAttr === undefined) {
				$(element).attr('data-trackas', trackas);
				var analyticsLabel = $(element).attr('data-lbl');
				if (analyticsLabel === undefined) {
					var labelSuffix = $(element).text();
					if (labelSuffix === "") {
						var childImg = $(element).children('img');
						if (childImg !== undefined) {
							var childImgSrc = childImg.attr('src');
							labelSuffix = childImgSrc.substring(childImgSrc.lastIndexOf('/')+1);
						}
					}
					$(element).attr('data-lbl', index + ' - ' + labelSuffix);
				}
			}
	   });
	}
}

// Randomize assets
function opcRandomizeAssets() {
    $(".OPC_RANDOMIZE").each(function(index, element) {
		var maxAssets = -1;
		var beginIndex = $(element).attr('class').indexOf('OPC_RANDOMIZE_MAX_');
		if (beginIndex !== -1) {
			var endIndex = $(element).attr('class').indexOf(' ', beginIndex);
			if (endIndex === -1) maxAssets = parseInt($(element).attr('class').substr(beginIndex+18));
			else maxAssets = parseInt($(element).attr('class').substr(beginIndex+18, endIndex));
		}
		
		var assetList = $(element).find(".opcListItems .opcObject-container:not('.end')");
		if (assetList !== undefined) {
			var assetsToShow = [];
			if (maxAssets === -1) {
				assetsToShow = assetList;
			} else {
				var assetsToRandomize = [];
				while (assetList.length !== 0) {
					var stickyAsset = assetList[0].getElementsByClassName('OPC_RANDOMIZE_STICKY');
					if (stickyAsset !== undefined && stickyAsset.length > 0) {
						var assetToShow = assetList.splice(0, 1);
						assetsToShow.push(assetToShow[0]);
					} else {
						var assetToRandomize = assetList.splice(0, 1);
						assetsToRandomize.push(assetToRandomize[0]);
					}
				}
				
				for (var i = assetsToShow.length; i < maxAssets && assetsToRandomize.length !== 0; i++) {
					var randIndex = Math.floor(Math.random() * assetsToRandomize.length);
					var assetToShow = assetsToRandomize.splice(randIndex, 1);
					assetsToShow[i] = assetToShow[0];
				}
			}

			for (var j = 0; j < assetsToShow.length; j++) {
				assetsToShow[j].style.display = 'inherit';
			};
		}
	});
}
// reset product offer display
function resetProductOfferDisplay() {  	  
	if ($('html').find('#ServicePage .opcComponent-container .opcComponent.PRODUCT_OFFER:not(.NoEqualizer)').length >0) {
	    var listItems = $("#ServicePage .opcComponent-container .opcComponent.PRODUCT_OFFER:not(.NoEqualizer) .opcListItems > .row");
			listItems.each(function(index, element) {
				var img = $(element).find('.medium-2.medium-push-10 img');
				if(!img.length || !img.attr('src').length) {
					$(element).find('.medium-2.medium-push-10').attr("style", "display: none;left: auto;width: 0;padding: 0;");
					$(element).find('.medium-10.medium-pull-2').css('right', 'auto');
				}
			});
	}
}

// update OpcReadinessOverview Url
function updateOpcReadinessOverviewUrl(){
  if ( $(".call-from-servicepage").data("assetname") && $(".call-from-servicepage").data("assetname").endsWith("ReadinessOverview") ) {
	 $("#ServicePage .opcReadinessProxySection").prev().find(".opcListItems > .columns a").each(function(index, element) {
		var url = $(element).attr("href");
		if (url !== undefined) {
			if (url.indexOf("${siteid}") !== -1) {
				$(element).attr("href", url.replace('${siteid}',$("html").attr("siteid")));

			} else {
        		$(element).attr("href", "/" + $("html").attr("siteid") + $(element).attr("href"));
        	}
    	}	
	}); 
  }
}

/* new trial service */
function opcNewTrialSetup() {
	var toggleButtons = $("#trialpage .opcComponent.OPC_TRIAL_SVC_LIST .opcTrialPaaSSaaSListContent .opcTrialList .headWrapper .toggleButton");
	toggleButtons.each(function(index, element) {
		$(element).click(function() {
			var textNode = $(element).children("a");
			(textNode.text() === "Details") ? textNode.text("Hide") : textNode.text("Details");
			$(element).closest(".headWrapper").siblings().slideToggle("fast");
		});
	});	
	var opcTrialPromoListShowMoreClicked = false;
	var intPromoItemsDisplay = 3; // Initial number of items to display
	var promoItems = $("#trialpage .opcComponent.OPC_TRIAL_PROMOTION .opcTrialPromoListContent .promoItem");
	if( $(window).width() <= 640) {
		if ( promoItems.length > intPromoItemsDisplay) {
			promoItems.slice(0, intPromoItemsDisplay).show();
			promoItems.slice(intPromoItemsDisplay).hide();
			$("#trialpage .opcComponent.OPC_TRIAL_PROMOTION .opcTrialPromoListShowMore").show();
		}
	} else {
		$("#trialpage .opcComponent.OPC_TRIAL_PROMOTION .opcTrialPromoListShowMore").hide();
		promoItems.show();
	}
	$(window).on("resize",function(e){
	  if (!opcTrialPromoListShowMoreClicked) {
		if( $(window).width() <= 640) {
			if ( promoItems.length > intPromoItemsDisplay) {
				promoItems.slice(0, intPromoItemsDisplay).show();
				promoItems.slice(intPromoItemsDisplay).hide();
				$("#trialpage .opcComponent.OPC_TRIAL_PROMOTION .opcTrialPromoListShowMore").show();
			}
		} else {
			$("#trialpage .opcComponent.OPC_TRIAL_PROMOTION .opcTrialPromoListShowMore").hide();
			promoItems.show();
		}
	  } 	
	});
	$("#trialpage .opcComponent.OPC_TRIAL_PROMOTION .opcTrialPromoListShowMore").click(function() {
		$("#trialpage .opcComponent.OPC_TRIAL_PROMOTION .opcTrialPromoListContent .promoItem").show();
		$(this).hide();
		opcTrialPromoListShowMoreClicked = true;
	});
}

/* new category landing */
$(window).on("resize", Foundation.utils.throttle(setUpCategoryPageOfferingDisplay, 250));
function setUpCategoryPageOfferingDisplay() {
	if ($('html').find('#ServicePage .opcComponent-container .opcComponent.NoEqualizer.PRODUCT_OFFER').length >0) {
	    var listItems = $("#ServicePage .opcComponent-container .opcComponent.NoEqualizer.PRODUCT_OFFER .opcListItems > .row");
		var equalContainer = listItems.children(".columns:nth-of-type(2)").find("h3");
		
		//reset height
		equalContainer.height('auto');
		var equalContainerLength=equalContainer.length;
		var screen_size=3;
		var breakpointScreensize=0;
		if (matchMedia(Foundation.media_queries['large']).matches) {
			screen_size=3;
			if(listItems.length >= 4) {
				listItems.attr("style", "flex-basis: calc(25% - 1.875em);max-width: calc(25% - 1.875em);margin-left: 0.938rem;margin-right: 0.938rem;" );
			} else if(listItems.length === 3) {
				listItems.attr("style", "flex-basis: calc(33% - 1.7em);max-width: calc(33% - 1.7em);margin-left: 0.938rem;margin-right: 0.938rem;" );
			} else if(listItems.length === 2) {
				listItems.attr("style", "flex-basis: calc(50% - 1.875em);max-width: calc(50% - 1.875em);margin-left: 0.938rem;margin-right: 0.938rem;" );
			}
			
			
		} else if (matchMedia(Foundation.media_queries['medium']).matches) {
			screen_size=2;
			if(listItems.length >= 4) {
				listItems.attr("style", "flex-basis: calc(33% - 0.563em);max-width: calc(33% - 0.563em);margin-left: 0.2815rem;margin-right: 0.2815rem;" );
			} else if(listItems.length === 3) {
				listItems.attr("style", "flex-basis: calc(33% - 0.563em);max-width: calc(33% - 0.563em);margin-left: 0.2815rem;margin-right: 0.2815rem;" );
			} else if(listItems.length === 2) {
				listItems.attr("style", "flex-basis: calc(50% - 0.938em);max-width: calc(50% - 0.938em);margin-left: 0.3125rem;margin-right: 0.3125rem;" );
			}
		} else if (matchMedia(Foundation.media_queries['small']).matches) {
			screen_size=1;
			listItems.attr("style", "flex-basis: calc(100%);max-width: calc(100%);margin-left: 0.938rem;margin-right: 0.938rem;" );
			
		}
		var sizePerRow=1;
		var numRow=equalContainerLength;
		if(screen_size>=3){
			//equalizer on max 4 in desktop up screen
			sizePerRow=4;
			numRow=Math.ceil(equalContainerLength/4);	
		}else if (screen_size==2){
			// equalizer on max 3 in tablet
			sizePerRow=3;
			numRow=Math.ceil(equalContainerLength/3);
		}
		//only equalize on tablet up screen
		var max_heightPerRow=0;
		if(screen_size>=2){
			for(var i=0;i<numRow;i++){
				max_heightPerRow=0;
				for(var j=0;j<sizePerRow;j++){
					if((i*sizePerRow+j)<equalContainerLength){
						var currentdescContainer=equalContainer.get(i*sizePerRow+j);
						var currentdescContainerHeight=$(currentdescContainer).height();
						if (currentdescContainerHeight>max_heightPerRow){
							max_heightPerRow=currentdescContainerHeight;
						}
					}
				}
				for(var j=0;j<sizePerRow;j++){
					if((i*sizePerRow+j)<equalContainerLength){
						var currentdescContainer=equalContainer.get(i*sizePerRow+j);
						$(currentdescContainer).height(max_heightPerRow);
					}
				}
			}
		}
	}	
}
