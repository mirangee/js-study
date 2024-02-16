

// index.html에는 app.js(현재 파일)이 import되어 있습니다.
// 현재 파일을 실행부로 취급해서 각각의 기능은 파일 별로 따로 구현해 보겠습니다.

import gameStart from "./start.js"; // 내가 지정한 특정 함수만 import 가능
// import {x, name} from "./start.js";


(function(){  
  gameStart();
})();