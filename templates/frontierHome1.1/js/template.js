// Frontier 1.1 Home template script

var $ = jQuery.noConflict();

jQuery(function($) {

    // Find mobile device
    var isMobile = {
        Android: function() {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function() {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function() {
            return navigator.userAgent.match(/iPhone/i);
        },
        Opera: function() {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function() {
            return navigator.userAgent.match(/IEMobile/i);
        },
        iPad: function() {
            return navigator.userAgent.match(/iPad/i);
        },
        mobile: function() {
            return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
        },
        any: function() {
            return (isMobile.mobile() || isMobile.iPad());
        }
    };

    if (isMobile.mobile()) {
        $('.section-banner .n2-ss-slide').each(function() {
            var imageUrl = $(this).find('.n2-ss-slide-background').data('desktop');
            // console.log(imageUrl);
            imageUrl = imageUrl.replace("//frontier.in", "http://www.frontier.in");
            // console.log(imageUrl);
            $(this).css('background-image', 'url(' + imageUrl + ')');
        });
    }

    // Free POC
    particlesJS.load(
        'particles-js',
        'templates/frontierHome1.1/js/particlesjs-config.json',
        function() {
            console.log('callback - particles.js config loaded');
        }
    );

    //for limiting the words
    var showChar = 150; // How many characters are shown by default
    var ellipsestext = "... More";
    var moretext = "Read More";
    var lesstext = "Read Less";
    var htmlmore;
    var htmlless;

    // function
    $('.solution-grid').each(function() {
        var desc_ele = $(this).find('.desc');
        var content = desc_ele.html();
        htmlmore = content;
        if (content.length > showChar) {
            var c = content.substr(0, showChar);
            var html = c + '<span class="moreellipses more">' + ellipsestext + '&nbsp;</span>';
            desc_ele.html(html);
            // alert(html);
            htmlless = html;
        }

        // Store real text
        desc_ele.data('more-text', htmlmore);
        desc_ele.data('less-text', htmlless);

    });
    $(".moreellipses.more").click(function() {
        var desc_ele = $(this).parents('.solution-grid').find('.desc');
        var htmlmore = desc_ele.data('more-text');

        desc_ele.html(htmlmore);
        $(this).removeClass('more').addClass('less');

    });
    $(".moreellipses.less").click(function() {
        var desc_ele = $(this).parents('.solution-grid').find('.desc');
        var htmlless = desc_ele.data('less-text');

        desc_ele.html(htmlless);
        $(this).removeClass('less').addClass('more');
    });

    // Solution hover effect
    // $('.solution-grid').hover(
    // 	function() {
    // 	$(this).find('img').addClass('animated fadeInLeft');
    // 	},
    // 	function() {
    // 	$(this).find('img').removeClass('animated fadeInLeft');
    // 	}
    // );

    // Testimonial carousel
    $('.testimonial-carousel').owlCarousel({
        loop: true,
        nav: false,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 1
            },
            1000: {
                items: 1
            }
        }
    });

    // Awards carousel
    $('.awards-carousel').owlCarousel({
        autoplay: true,
        autoplayTimeout: 2000,
        loop: true,
        margin: 10,
        nav: false,
        // lazyLoad:true,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 3
            },
            1000: {
                items: 3
            }
        }
    });


    // Footer link - scroll to section
    // $('.solutions-footer a').click(function() {
    //     var target = $(this).data('target');
    //     var offsetHeight = 180;
    //     $('html, body').animate({
    //         scrollTop: $('#'+target).offset().top - offsetHeight
    //     }, 2000);
    // });

    // $('.services-footer a').click(function() {
    //     var target = $(this).data('target');
    //     var offsetHeight = 220;
    //     $('html, body').animate({
    //         scrollTop: $('#'+target).offset().top - offsetHeight
    //     }, 2000);
    // });

    if (!isMobile.mobile() && !isMobile.iPad()) {
        // page animation
        $(window).scroll(function() {
            // footer
            $('.section-support .supports:in-viewport').addClass('animated fadeInUp');
        });
    }


    // lazyload
    $("img.lazy").lazyload();
    $("img.lazy").lazyload({
        threshold: 200
    });

    if ($(window).width() <= 455) {
        console.log('Less than or Equal to 455');
        var words = $('.grids .col-md-4:first-child h2.title').text();
        var arrofwords = words.split(" ");
        var middle = 3;
        arrofwords.splice(middle, 0, "<br/>");
        var output = arrofwords.join(" ");
        console.log(output);
        $('.grids .col-md-4:first-child h2.title').html(output);
    }

    $(window).resize(function() {
        var words = $('.grids .col-md-4:first-child h2.title').text();
        if ($(window).width() <= 455) {
            console.log('Less than or Equal to 455');
            var arrofwords = words.split(" ");
            var middle = 3;
            arrofwords.splice(middle, 0, "<br/>");
            var output = arrofwords.join(" ");
            console.log(output);
            $('.grids .col-md-4:first-child h2.title').html(output);
        } else {
            $('.grids .col-md-4:first-child h2.title').html(words);
        }
    });
});