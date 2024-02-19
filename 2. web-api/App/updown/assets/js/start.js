import gameData from "./gameData.js";
import { caseUp, caseDown, correctAnswer } from "./checkAnswer.js";


/*
  특정 클래스, 함수, 변수 등을 독립적으로 구성한 후에
  import하는 쪽에서 식별자로 바로 import하게 하려면
  export default를 선언합니다.

  선언된 함수들, 클래스들, 변수들을 모듈화시켜서 객체 형태로 전달할 때는
  export만 붙입니다. import 받는 쪽에서는 디스트럭쳐링 문법을 이용하여
  받아 사용합니다.

  html 파일에도 외부 js 파일을 불러올 때 해당 파일이 export가 포함된
  문법을 사용하고 그것을 import하는 파일이라면 type="module"을 선언해줘야
  로디잉 가능하다.
*/

// 게임이 시작되면 해야할 일을 정의하는 함수
export default function gameStart() { // default를 붙이지 않으면 import할 때 {gameStart}라고 써야 한다. 
  // 숫자 아이콘 담을 박스
  const $numbers = document.getElementById('numbers');

  // 아이콘 박스를 생성하는 함수
  const makeIcon = () => {

    // 가상 DOM 컨테이너 생성
    const $frag = document.createDocumentFragment();

    for(let n = 1; n <= 100; n++) {
      const $icon = document.createElement('div');
      $icon.classList.add('icon');
      $icon.textContent = n;
      $icon.dataset.iconNumber = n;
      $frag.appendChild($icon);
    }
    $numbers.appendChild($frag);
  }
  makeIcon();

  //아이콘에 클릭 이벤트 부여하기
  $numbers.onclick = e => {

    // 아이콘이 아닌 곳을 클릭하면 이벤트가 발생하지 않도록
    if(!e.target.matches('#numbers .icon')) return;

    console.log(`사용자가 클릭한 아이콘 번호: ${e.target.dataset.iconNumber}`);
    
    // 사용자가 클릭한 아이콘의 숫자를 answer에 저장(대소비교를 위해 정수로 변환)
    gameData.answer = +e.target.dataset.iconNumber;
    console.log(gameData.secret);

    // 정답 검증 함수 호출 => 이벤트가 발생한 아이콘 요소를 넘기자
    console.log(gameData);
    console.log(e.target.dataset);
    checkNumber(e.target);
  }
   
}

// 정답을 검증하는 함수
function checkNumber($target) {
  //gameData에서 정답과 사용자의 입력값만 얻어오기
  const {secret, answer} = gameData;

  // 실제 정답과 사용자 선택값 비교
  if (secret === answer) { // 정답인 경우
    correctAnswer($target);
  } else if (secret > answer) { // UP인 경우
    caseUp($target);
  } else { // Down인 경우
    caseDown($target);
  }
}

//예시 
let x = 3;
const name = '홍길동';
export{x, name}; //객체로 포장해서 보냄 (import 예시는 app.js 파일 확인 요망)

