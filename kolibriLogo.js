/*
 * Draws kolibri logo as canvas.
 * requires jcanvas and jquery
 * 
 */
(function( $ ){

    var defaults = { 
        height:          1000, 
        stretchWidth:   1000, 
        color:          '#fff',
    };

    var methods = {
        init : function( options ) {
            $this = $(this);
            options = $.extend({}, defaults, options); 

            $this.height = options.height;
            $this.color = options.color;
            
            // stretchWidth has to be higher than width
            $this.stretchWidth = $this.height < options.stretchWidth ? 
                options.stretchWidth :
                $this.height;
            
            // when selected element is not a canvas, assign canvas as background
            $this.canvasElement = $this;
            if(!$this.is('canvas')) {
                var canvasId = 'canvas_' + (1 + Math.floor(Math.random() * 3137));
                $('body').append('<canvas id="' + canvasId + '" width="' + $this.stretchWidth + '" height="' + $this.height + '" style="display: none;"></canvas>');
                $this.canvasElement = $('#' + canvasId);
                $this.css('background-image', '-moz-element(#' + canvasId + ')');
            }
            
            // set default style
            $.jCanvas({
              fillStyle: options.color,
              fromCenter: false
            });
            
            // draw parts
            methods.drawBody();
            methods.drawWing();
            methods.drawEye();
            methods.drawCutOffLayer();
            
        },
        
        drawBody : function( ) {
            var bodyWidth = $this.height * 0.035;

            $this.canvasElement.drawRect({  // body / top horizontal line
              x: 0, y: 0,
              width: $this.stretchWidth,
              height: bodyWidth
            }).drawRect({  // beak / right vertical line
              x: $this.stretchWidth - bodyWidth, y: 0,
              width: bodyWidth,
              height: $this.height
            });
        },
        
        drawWing : function ( options ) {
            var wingWidth = $this.height * 0.100;
            
            for(var x = 0; x < 3; x++) {
                $this.canvasElement.drawRect({
                    x: wingWidth * 2 * x, y: 0,
                    width: wingWidth,
                    height: $this.height
                });
            }
        },
        
        drawEye : function () {
            
            var eyeWidth = $this.height * 0.060;
            var eyeHeight = $this.height * 0.070;
            var eyeX = ($this.stretchWidth > $this.height) ?
                ( $this.stretchWidth - $this.height * (1 - 0.870) ) :
                ( $this.height * 0.870 ) ;
            var eyeY = $this.height * 0.065;

            
            $this.canvasElement.drawEllipse({  // Eye / Top right dot
              x: eyeX + eyeWidth/2, y: eyeY + eyeHeight/2,
              width: eyeWidth, height: eyeHeight,
              fromCenter: true
            });
        },
        
        drawCutOffLayer : function() {
            var shapeOffset= $this.height * -0.100;
            var shapeCp1y = $this.height * 0.552;
            var shapeCp2x = $this.height * 0.394;
                
            $this.canvasElement.draw(function(ctx) {
                ctx.beginPath();
                ctx.moveTo(shapeOffset, 0);
                ctx.bezierCurveTo(
                    shapeOffset, shapeCp1y, 
                    shapeCp2x, $this.height, 
                    $this.height, $this.height
                );
                ctx.lineTo(0, $this.height);
                ctx.lineTo(0, 0);
                ctx.globalCompositeOperation = 'destination-out';
                ctx.fill();
            });
        }
        
    };

  $.fn.kolibriLogo = function( method ) {
    if ( methods[method] ) {
      return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof method === 'object' || ! method ) {
      return methods.init.apply( this, arguments );
    } else {
      $.error( 'Method ' +  method + ' does not exist on kolibriLogo' );
    }    
  
  };
})( jQuery );