jQuery(document).ready(function () {

  var $ = jQuery;

  // первый способ
  $('.news .index__paralax__title').scroolly([
    {
      from: 'doc-top + 300px',
      to: 'doc-bottom - 500px',
      onScroll: function(element, offset, length){
        var progress = offset / length;
        console.log(offset);
        console.log(length);
        console.log(progress);
        element.css({
          transform: 'translateY(' + offset + 'px)',
          opacity: progress
        });
      }
    }
  ]);

  $('.index .index__paralax__title, .catalog-full .index__paralax__title').scroolly([
    {
      from: 'el-top = vp-top+300px',
      to: 'el-bottom = vp-center',
      cssFrom:{
        'transform': 'translateY(0)',
        'opacity': '0.1',
        //
      },
      cssTo:{
        'transform': 'translateY(300px)',
        'opacity': '0.8',
      }
    },
    {
      from: 'el-bottom = vp-center',
      to: 'el-top = vp-center',
      cssFrom:{
        'transform': 'translateY(300px)',
        'opacity': '1',
        //
      },
      cssTo:{
        'transform': 'translateY(0)',
        'opacity': '0.1',
      }
    },
  ]);


});
