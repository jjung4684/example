var eventCommon = {

  swiperOption : {
    scrollX: true,
    eventPassthrough: true,
    preventDefaultException: {tagName:/.*/},
    tap: true,
    disablePointer: true,
    disableMouse: true,
    disableTouch: false
  },

  //패키지 메인 최근검색일정, 찜해놓은 여행 이벤트
  likePrdScroll : function (){
    new IScroll('#prdList_wish', this.swiperOption);
  },

  currentSearchScroll : function(){
    new IScroll('#scheduleList', this.swiperOption);
  },

  hotDealScroll : function(){
    //new IScroll('#dealList', this.swiperOption);
    //var filterTabMagnet = new skpui.magnet('.deal_lst_scroll', {useSticky: false, zIndex: 102});

      var hotdealTabScroll,
        $hotDealTab,
        $hotDealContents,
        tabHeight,
        activeTabIdx = 0;

      initialize();

      function initialize(data) {

          setElement();
          addScrolls();
          addHandler();
      }

      function setElement(){

        $hotDealTab = $('.deal_lst_scroll');
        $hotDealContents = $('.deal_cont');
        tabHeight = $hotDealTab[0].clientHeight;
      }

      function addScrolls() {
        var iScrollOptions = {
          scrollX: true,
          scrollY: false,
          scrollbars: false,
          fadeScrollbars: true,
          eventPassthrough: true,
          preventDefaultException: {tagName: /.*/},
          tab: true
        };

        iScrollOptions.useTransform = false;
        hotdealTabScroll = new IScroll('.deal_lst_scroll', iScrollOptions);
      }

      function addHandler() {
        var tabMagnet = new skpui.magnet('.deal_lst_scroll', {
          useSticky: false,
          zIndex: 120
        });

        $hotDealTab.on('click', 'a', function(e) {
          e.preventDefault();

          var itemIndex = $hotDealTab.find('a').index(this);

          if (activeTabIdx !== itemIndex) {
            activeTab(itemIndex);
            moveTabScroll(itemIndex);

            activeTabIdx = itemIndex;
          }

          if ($hotDealContents.eq(itemIndex).length > 0) {
            $("html, body").scrollTop($hotDealContents.eq(itemIndex).offset().top - tabHeight);
          }
        });

        $(window).on('scroll', skpui.util.throttle(function() {
          skpui.util.viewport('.deal_cont', {
            threshold: -tabHeight - 1,
            onViewport: function(elements) {
              if (elements && elements.length > 0) {
                var index = $hotDealContents.index(elements[0]);

                if (activeTabIdx !== index) {
                  activeTab(index);
                  moveTabScroll(index);

                  activeTabIdx = index;
                }
              }
            }
          })
        }));

        //lazyload
        $(window).on('scroll.lazyload', skpui.util.throttle(function() { // 스크롤 이벤트 발생 시 throttle(이벤트가 여러번 발생해도 300ms 마다 한번만 실행)
          skpui.util.viewport('[data-type=ProductDeal_Shocking] v-lazy-image', {
            threshold: 300,
            onViewport: function(imgList) {
              for (var i = 0, len = imgList.length; i < len; i++) {
                skpui.util.lazyload(imgList[i]); // Lazyload
              }
            }
          });
        }));

      }

      function activeTab(index) {
        $hotDealTab.find('li.on').removeClass('on');
        $hotDealTab.find('li').eq(index).addClass('on');
      }

      function moveTabScroll(index) {
        hotdealTabScroll.scrollTo(0, 0);
        if (index > 1) {
          hotdealTabScroll.scrollToElement($hotDealTab.find('li').eq(index - 1)[0]);
        }
      }
  },

  recommendScroll : function(){
    var swiper = new Swiper('.swiper-container', {
      pagination: ".swiper-pagination",
      // 페이징의 페이지 번호 노출하는 옵션
      paginationClickable: true,
      paginationBulletRender: function (index, className) {
        return '<div class="' + className + '">' + (index + 1) + '</div>';
      },
      //bulletClass: "swiper-pagination-bullet", <!-- bulletClass를 지정하지않을 경우 자동생성되는 bullet의 기본 class명 'swiper-pagination-bullet'-->
      //bulletActiveClass: "swiper-pagination-bullet-active", <!-- bulletActiveClass를 지정하지 않을 경우 자동생성되는 active된 bullet의 기본 class명 'swiper-pagination-bullet-active'-->
      loop: false,
      spaceBetween: 20
    });
  },

  moveEvent : function(){
    require(['/src/tourpackage/config.js'], function() {
      require(['jquery'], function($) {
        require(['mwUI', 'iscroll'], function(mwUI, IScroll) {

          /* 2017-02-20 cypark : video sample */
          (function() {
            var playerWrap = document.querySelector('.dtl_mov'),
              playBtn = playerWrap.querySelector('button');

            playBtn.addEventListener('click', playBtnClickHandler, false);

            function playBtnClickHandler() {
              playerWrap.removeChild(playBtn);
              playVideo();
              playBtn.removeEventListener('click', playBtnClickHandler, false);
            }

            function playVideo() {
              var video = document.querySelector('#detailvideo');
              video.setAttribute('controls', 'controls')
              video.play();
            }
          }());
        });
      });
    });
  },


}
