require.config({
  /*
  baseUrl:
      JavaScript 파일이 있는 기본 경로를 설정한다.
  */
  baseUrl: 'http://s-ui-m.011st.com/MW/',
  /*
  paths:
      이 설정으로 모듈 이름을 호출하면 값의 위치를 요청한다.
      ".js"는 자동 추가
  */
  paths: {
    // library
    'jquery': 'js/lib/jquery-2.1.4.min',
    'iscroll': 'js/lib/iscroll-zoom-5.1.3.min',

    // common module
    'header': 'js/common/header',
    'mwUI': 'js/ui/ui'
  },
  /*
  shim:
      AMD 형식을 지원하지 않는 라이브러리의 경우 아래와 같이 shim을 사용해서 모듈로 불러올 수 있다
  */
  shim: {
    'iscroll': {
      exports: 'IScroll' // iscroll은 IScroll이라는 이름의 객체로 사용할 수 있게 해준다
    },

    'mwUI': {
      exports: 'mwUI',
      deps: ['jquery']
    }
  }
});
