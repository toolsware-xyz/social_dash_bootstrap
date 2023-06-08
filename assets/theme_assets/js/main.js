/* eslint-disable */
(function ($) {
  /* clock  */
  $('#clock').countdown('2030/10/10', function (event) {
    var $this = $(this).html(event.strftime('' +
      '<span class="number">%d<span class="text">days</span></span> ' +
      '<span class="number">%H<span class="text">hours</span></span> ' +
      '<span class="number">%M<span class="text">minutes</span></span> ' +
      '<span class="number">%S<span class="text">seconds</span></span> '));
  });

  //Counter date
  (from = $('input[name="date-range-from"]')
    .datepicker({
      defaultDate: "+1w",
      changeMonth: true,
      numberOfMonths: 2,
      onSelect: function () {
        $("#ui-datepicker-div").addClass("testX");
      },
    })
    .on("change", function () {
      to.datepicker("option", "minDate", getDate(this));
    })),
  (to = $('input[name="date-range-to"]')
    .datepicker({
      defaultDate: "+1w",
      changeMonth: true,
      numberOfMonths: 2,
    })
    .on("change", function () {
      from.datepicker("option", "maxDate", getDate(this));
    }));

  function getDate(element) {
    var date;
    try {
      date = $.datepicker.parseDate(dateFormat, element.value);
    } catch (error) {
      date = null;
    }

    return date;
  }

  /* Replace all SVG images with inline SVG */
  $('img.svg').each((i, e) => {

    const $img = $(e);

    const imgID = $img.attr('id');

    const imgClass = $img.attr('class');

    const imgURL = $img.attr('src');

    $.get(imgURL, (data) => {
      // Get the SVG tag, ignore the rest
      let $svg = $(data).find('svg');

      // Add replaced image's ID to the new SVG
      if (typeof imgID !== 'undefined') {
        $svg = $svg.attr('id', imgID);
      }
      // Add replaced image's classes to the new SVG
      if (typeof imgClass !== 'undefined') {
        $svg = $svg.attr('class', `${imgClass} replaced-svg`);
      }

      // Remove any invalid XML tags as per http://validator.w3.org
      $svg = $svg.removeAttr('xmlns:a');

      // Check if the viewport is set, if the viewport is not set the SVG wont't scale.
      if (!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
        $svg.attr(`viewBox 0 0  ${$svg.attr('height')} ${$svg.attr('width')}`);
      }

      // Replace image with new SVG
      $img.replaceWith($svg);
    }, 'xml');
  });
  /* sidebar collapse  */
  $('body').on("click", function (e) {
    if (window.matchMedia('(max-width: 1151px)').matches) {
      if ($(e.target).is(".sidebar__menu-group *") == false &&
        $(e.target).is('.header-top *') == false) {
        $(".sidebar").addClass("collapsed");
        $(".contents").addClass("expanded");
        $(".footer-wrapper").addClass("expanded");
      }
    }
  });

  /* sidebar collapse  */
  const sidebarToggle = document.querySelector(".sidebar-toggle");

  function sidebarCollapse() {
    $('.overlay-dark-sidebar').toggleClass('show');
    document.querySelector(".sidebar").classList.toggle("sidebar-collapse");
    document.querySelector(".sidebar").classList.toggle("collapsed");
    document.querySelector(".contents").classList.toggle("expanded");
  }
  if (sidebarToggle) {
    sidebarToggle.addEventListener("click", function (e) {
      e.preventDefault();
      sidebarCollapse();
    });
  }

  /* sidebar nav events */
  $(".sidebar_nav .has-child ul").hide();
  $(".sidebar_nav .has-child.open ul").show();
  $(".sidebar_nav .has-child >a").on("click", function (e) {
    e.preventDefault();
    $(this).parent().next("has-child").slideUp();
    $(this).parent().parent().children(".has-child").children("ul").slideUp();
    $(this).parent().parent().children(".has-child").removeClass("open");
    if ($(this).next().is(":visible")) {
      $(this).parent().removeClass("open");
    } else {
      $(this).parent().addClass("open");
      $(this).next().slideDown();
    }
  });

  $(window).on('scroll', function (e) {
    let blogContainer = document.querySelector(".blog-details"),
      shareGroup = document.querySelector(".blog-share-top");
    if (blogContainer != null && shareGroup != null) {
      window.pageYOffset <= blogContainer.offsetTop ? shareGroup.classList.remove("show") : window.pageYOffset >= blogContainer.offsetTop && window.pageYOffset <= blogContainer.offsetTop + blogContainer.clientHeight - 700 ? shareGroup.classList.add("show") : shareGroup.classList.remove("show");
    }
  });

  $("#status").select2({
    minimumResultsForSearch: Infinity,
    placeholder: "Status",
    allowClear: true,
  });
  $(".atbd-select .header-drop-select").select2({
    minimumResultsForSearch: Infinity,
    placeholder: "Status",
    allowClear: true,
    dropdownCssClass: "header-drop-select-down"
  });
  

  /* Header mobile view */
  $(window)
  .bind("resize", function () {
    var screenSize = window.innerWidth;
    if ($(this).width() <= 767.98) {
      $(".navbar-right__menu").appendTo(".mobile-author-actions");
      // $(".search-form").appendTo(".mobile-search");
      $(".contents").addClass("expanded");
      $(".sidebar ").removeClass("sidebar-collapse");
      $(".sidebar ").addClass("collapsed");
    } else {
      $(".navbar-right__menu").appendTo(".navbar-right");
    }

  })
  .trigger("resize");
  $(window)
    .bind("resize", function () {
      var screenSize = window.innerWidth;
      if ($(this).width() <= 991) {
        $(".sidebar").removeClass("sidebar-collapse");
        $(".sidebar").addClass("collapsed");
        $(".sidebar-toggle").on("click", function () {
          $(".overlay-dark-sidebar").toggleClass("show");
        });
        $(".overlay-dark-sidebar").on("click", function () {
          $(this).removeClass("show");
          $(".sidebar").removeClass("sidebar-collapse");
          $(".sidebar").addClass("collapsed");
        });
      }
    })
    .trigger("resize");

  /* Mobile Menu */
  $(".btn-search").on("click", function () {
    $(this).toggleClass("search-active");
    $(".mobile-search").toggleClass("show");
    $(".mobile-author-actions").removeClass("show");
  });

  $(".btn-author-action").on("click", function () {
    $(".mobile-author-actions").toggleClass("show");
    $(".mobile-search").removeClass("show");
    $(".btn-search").removeClass("search-active");
  });

  $(".menu-mob-trigger").on("click", function (e) {
    e.preventDefault();
    $(".mobile-nav-wrapper").toggleClass("show");
  });

  $(".nav-close").on("click", function (e) {
    e.preventDefault();
    $(".mobile-nav-wrapper").removeClass("show");
  });

  /* Input password toggle */
  function eye_pass() {
    $(".toggle-password2").click(function () {
      $(this).toggleClass("uil-eye");
      input = $(this).parent().find("#password-field");
      if (input.attr("type") == "password") {
        input.attr("type", "text");
      } else {
        input.attr("type", "password");
      }
    });
  }
  eye_pass();

  /* Collapsable Menu */
  function mobileMenu(dropDownTrigger, dropDown) {
    $(".menu-wrapper .menu-collapsable " + dropDown).slideUp();

    $(".menu-wrapper " + dropDownTrigger).on("click", function (e) {
      if ($(this).parent().hasClass("has-submenu")) {
        e.preventDefault();
      }
      $(this)
        .toggleClass("open")
        .siblings(dropDown)
        .slideToggle()
        .parent()
        .siblings(".sub-menu")
        .children(dropDown)
        .slideUp()
        .siblings(dropDownTrigger)
        .removeClass("open");
    });
  }
  mobileMenu(".menu-collapsable .atbd-menu__link", ".atbd-submenu");


    /* Hamburger */
    if (document.querySelector(".hamburger")) {
      $(".hamburger").on("click", function () {
        $(this).toggleClass("is-active");
      });
    }


  /* Indeterminate */
  $('.bd-example-indeterminate [type="checkbox"]').prop("indeterminate", true);

   /* Submenu position relative to it's parent */
   let submenus = document.querySelectorAll('.sidebar li.has-child');
   let direction = document.querySelector('html').getAttribute('dir');
   submenus.forEach(item => {
     item.addEventListener('mouseover', function () {
       let menuItem = this;
       let menuItemRect = menuItem.getBoundingClientRect()
       let submenuWrapper = menuItem.querySelector('ul');
       submenuWrapper.style.top = `${menuItemRect.top}px`;
       if (direction === 'ltr') {
         submenuWrapper.style.left = `${menuItemRect.left + Math.round(menuItem.offsetWidth * 0.75) + 10}px`;
       } else if (direction === 'rtl') {
         submenuWrapper.style.right = `${Math.round(menuItem.offsetWidth * 0.75) + 10}px`;
       }
     })
   });
 
   /* sidebar scroll to active link on page load */
   const activeLink = document.querySelector('.sidebar_nav li a.active');
   if (activeLink !== null) {
     const activeLinkOffset = activeLink.offsetTop;
     //document.querySelector('.sidebar').style.marginTop = activeLinkOffset + 'px';
     $('.sidebar').animate({
       scrollTop: activeLinkOffset - 120
     }, 'slow');
   }

  /* Active Tooltip */
  var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
  var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
  })

  /* Sidebar Change */
  const layoutChangeBtns = document.querySelectorAll("[data-layout]");

  function changeLayout(e) {
    e.preventDefault();
    if (this.dataset.layout === "light") {
      $('ul.l_sidebar li a,.l_sidebar a').removeClass('active');
      $(this).addClass("active");
      $("body").removeClass("layout-dark");
      $("body").addClass("layout-light");
    } else if (this.dataset.layout === "dark") {
      $('ul.l_sidebar li a,.l_sidebar a').removeClass('active');
      $(this).addClass("active");
      $("body").removeClass("layout-light");
      $("body").addClass("layout-dark");
    } else if (this.dataset.layout === "side") {
      $('ul.l_navbar li a,.l_navbar a').removeClass('active');
      $(this).addClass("active");
      $("body").removeClass("top-menu");
      $("body").addClass("side-menu");
    } else if (this.dataset.layout === "top") {
      $('ul.l_navbar li a,.l_navbar a').removeClass('active');
      $(this).addClass("active");
      $("body").removeClass("side-menu");
      $("body").addClass("top-menu");
    }
  }

  if (layoutChangeBtns) {
    layoutChangeBtns.forEach((layoutChangeBtn) =>
      layoutChangeBtn.addEventListener("click", changeLayout)
    );
    layoutChangeBtns.forEach((layoutChangeBtn) =>
      layoutChangeBtn.addEventListener("click", closeCustomizer)
    );
  }

  /* Customizing */
  const customizerBtn = document.querySelector(".customizer-trigger");
  const customizer = document.querySelector(".customizer-wrapper");
  const customizerClose = document.querySelector(".customizer-close");
  const customizerOverlay = document.querySelector(".customizer-overlay");

  function toggleCustomizer(e) {
    e.preventDefault();
    this.classList.toggle("show");
    customizer.classList.toggle("show");
    $('.customizer-overlay').addClass('show');
  }

  function closeCustomizer(e) {
    e.preventDefault();
    customizer.classList.remove("show");
    customizerBtn.classList.remove("show");
    customizerOverlay.classList.remove("show");
  }

  if (customizerBtn) {
    customizerBtn.addEventListener("click", toggleCustomizer);
  }

  if (customizerClose && customizerOverlay) {
    customizerClose.addEventListener("click", closeCustomizer);
    customizerOverlay.addEventListener("click", closeCustomizer);
  }

  $('.search-toggle').on('click', function (e) {
    e.preventDefault();
    $(this).toggleClass('active');
    $('.nav-search .search-form-topMenu').toggleClass('show')
  });

  // Preloader
  window.addEventListener('load', function () {
    document.querySelector('body').classList.add("loaded")
  });

})(jQuery);