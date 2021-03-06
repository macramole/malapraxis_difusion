var CANT_IMAGENES = 68;
var CANT_IMAGENES_GRANDES = 10;
var CANT_CITAS = 2;
// var IMAGENES_GRANDES = [ 7, 18 ];

var cantImagesLoaded = 0;

$(function() {
    addImages( function() {
        $('#fullpage').fullpage({
            scrollOverflow : true,

            afterLoad  : function(anchorLink, index) {
                if (anchorLink == "mapa") {
                    // $("#map .wrapper").css("height", "100%");
                    createNetwork();
                }


                $("nav a").removeClass("active");
                $("a[href='#" + anchorLink + "']").addClass("active");
            }
        });

        init();
    } );
});

function init() {
    $("body").removeClass("init");
    $("#overlayLoading").addClass("hide");
}

function addImages(callback) {
  var currentImagenGrande = 1;
  var currentCitas = 1;
  CANT_IMAGENES_TOTALES = CANT_IMAGENES * 2 + 6;

  for ( var i = 1 ; i <= CANT_IMAGENES_TOTALES ; i++ ) {
      var $img = $("<img>").attr("src", "images/fotos/" + ((i % CANT_IMAGENES)+1) + ".JPG");
      $("#imgs .wrapper").append($img);

      if ( i % 11 == 0 ) {
          if ( currentImagenGrande <= CANT_IMAGENES_GRANDES ) {
              var $imgGrande = $("<img>").attr("src", "images/fotos/grandes/" + currentImagenGrande + ".JPG");
              $imgGrande.addClass("grande");
              $("#imgs .wrapper").append($imgGrande);
              currentImagenGrande++;
          }
      }
      if ( i % 33 == 0 ) {
          if ( currentCitas <= CANT_CITAS ) {
              var $img = $("<img>").attr("src", "images/fotos/citas/" + currentCitas + ".PNG");
              $img.addClass("cita");
              $("#imgs .wrapper").append($img);
              currentCitas++;
          }
      }
  }

  $('#imgs .wrapper').packery({
    // options
    itemSelector: '#imgs .wrapper img',
    percentPosition: true,
    columnWidth : '.sizer'
  });
  //
  // $('#imgs .wrapper').imagesLoaded( function() {
  // });

  $('#imgs .wrapper').imagesLoaded()
       .always( function( instance ) {
           $('#imgs .wrapper').packery('layout');
           callback();
       })
      .progress( function( instance, image ) {
          cantImagesLoaded++;

          if ( cantImagesLoaded % 15 == 0 ) {
              $('#imgs .wrapper').packery('layout');
          }
      });
  ;

  $("#imgs .wrapper").css("margin-top", $("header").outerHeight());
}

function getRandomInt(min, max) {
    return min + Math.floor(Math.random() * (max - min + 1));
}
