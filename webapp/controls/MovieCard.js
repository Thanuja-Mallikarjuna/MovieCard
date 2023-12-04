sap.ui.define(
    "com/ibm/moviecard01/controls/MovieCard",
    [
      
      "sap/ui/core/Control",
      "sap/m/Button",
      "sap/m/Image",
      "sap/m/Link",
      "sap/m/Text",
    ],
    function (Control, Button, Image, Link, Text) {
      "use strict";
  
      var MovieCard = Control.extend("com.ibm.moviecard01.controls.MovieCard", {
      
        metadata: {
          properties: {
          
            title: { type: "string" },
            author: { type: "string" },
            description: { type: "string" },
            price: { type: "float" },
            currencyCode: {
              
              defaultValue: "USD",
            }, 
            comments: { type: "string[]", defaultValue: [] },
            numberOfPages: { type: "int" },
            coverPictureUrl: { type: "string" }, 
            expressDelivery: { type: "boolean", defaultValue: false },
  
            width: { type: "sap.ui.core.CSSSize", defaultValue: "400px" },
            height: { type: "sap.ui.core.CSSSize", defaultValue: "400px" },
  
            
            someObject: { type: "object" },
            whatever: { type: "any" },
          },
  
          aggregations: {
            _buyButton: {
              type: "sap.m.Button",
              multiple: false,
              visibility: "hidden",
            },
            coverPicture: {
              type: "sap.m.Image",
              multiple: false,
              visibility: "public",
            },
          },
  
          associations: {
            relatedBooks: {
              type: "com.ibm.moviecard01.controls.Book",
              multiple: true,
              singularName: "relatedBook",
            },
          },
  
          events: {
            buy: { enablePreventDefault: true },
          },
        },
  
        
  
        init: function () {
          var oControl = this,
            oBuyBtn,
            oCoverPic;
  
          this._oLink = new Link();
          
  
          
          oBuyBtn = new Button({
            text: "Book Now",
            press: function (oEvent) {
              oControl.fireBuy({
                someData: "some data I want to pass along with the event object",
              });
            },
          });
          this.setAggregation("_buyButton", oBuyBtn);
  
      
          oCoverPic = new Image({
            decorative: true,
            width: "100%",
            height: "200px",
            tooltip: "Cover of book",
          });
          oCoverPic.addStyleClass("nsBookCvrPic");
          this.setCoverPicture(oCoverPic);
        },
  
        onAfterRendering: function () {
         
        },
  
        _somePrivateMethod: function () {
         
        },
  
        somePublicMethod: function () {
          
        },
  
        renderer: {
          render: function (oRm, oControl) {
            oRm.write("<div");
            oRm.writeControlData(oControl);
  
            oRm.addClass("nsBook");
            oRm.writeClasses();
  
            oRm.addStyle("width", oControl.getWidth());
            oRm.addStyle("height", oControl.getHeight());
            oRm.writeStyles();
  
            oRm.write(">");
  
        
  
            oRm.write("<div>");
            oRm.renderControl(oControl.getCoverPicture());
            oRm.write("</div>");
  
            
            oRm.write("<div>");
            oRm.write(
              "<div>Movie name         : " + oControl.getTitle() + "</div>"
            );
            oRm.write(
              "<div>DIrector           : " + oControl.getAuthor() + "</div>"
            );
            oRm.write(
              "<div>Description      : " + oControl.getDescription() + "</div>"
            );
            oRm.write(
              "<div>Price            : " +
                oControl.getPrice().toFixed(2) +
                " " +
                oControl.getCurrencyCode() +
                "</div>"
            );
            oRm.write(
              "<div>Comments         : <br>" +
                oControl.getComments().join("<br>") +
                "</div>"
            );
            oRm.write(
              "<div>Seats Available         : " + oControl.getNumberOfPages() + "</div>"
            );
            oRm.write(
              "<div>Express Delivery : " +
                oControl.getExpressDelivery() +
                "</div>"
            );
            oRm.write("<div>");
            oRm.renderControl(oControl.getAggregation("_buyButton"));
            oRm.write("</div>");
            oRm.write("</div>");
  
            oRm.write("</div>"); 
          },
        },
      });
  
     
      com.ibm.moviecard01.controls.MovieCard.prototype.setCoverPictureUrl = function (sVal) {
        if (sVal) {
          this.setProperty("coverPictureUrl", sVal, 
          this.getCoverPicture().setSrc(sVal);
        }
      };
  
      com.ibm.moviecard01.MovieCard.prototype.exit = function () {
       
        if (this._oLink) {
          this._oLink.destroy();
          delete this._oLink;
        }
      };
  
      return MovieCard;
    }
  );