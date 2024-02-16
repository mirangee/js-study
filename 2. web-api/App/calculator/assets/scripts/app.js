// 현재 계산기에 그려질 숫자
let currentResult = 0;

// 계산 이력을 모아 둘 배열
const logEntries = [];

let seq = 0; // 로그 번호

// 입력창에 입력한 숫자를 읽는 함수
let flag = false;
const getUserNumberInput = () => parseInt($userInput.value);


// 계산 기능을 담당하는 함수
const calculate = (type) => {

  const originalResult = currentResult; // 계산 전 값을 기억
  const enteredNumber = getUserNumberInput(); // 사용자 입력값 기억

  // 숫자 입력을 안 할 경우 경고
  if(!enteredNumber && enteredNumber !== 0) {
    alert('숫자 입력은 필수입니다.');
    return;
  }

  let mark;
  if (type === 'ADD') {
    mark = '+';
    currentResult += enteredNumber;
  } else if (type === 'SUB') {
    mark = '-';
    currentResult -= enteredNumber;
  } else if (type === 'MULTI') {
    mark = 'X';
    currentResult *= enteredNumber;
  } else if (type === 'DIVIDE') {
    mark = '/';
    if(enteredNumber === 0) {
      alert('0으로 나눌 수 없습니다.'); // 0으로 나눌 경우
      return;
    }
    currentResult /= enteredNumber;
  }

  // 연산식과 결과값을 두번째 section에 렌더링
  $currentCalculationOutput.textContent = `${originalResult} ${mark} ${enteredNumber}`;
  $currentResultOutput.textContent = currentResult;

  //로그 이력 쌓기
  writeTolog(mark, originalResult, enteredNumber, currentResult);
}

// 로그 이력 쌓는 함수
const writeTolog = (operation, prevResult, number, result) => {

  // 하나의 로그 객체(연산타입, 이전 결과, 연산 숫자, 연산 결과)
  const logObject = {
    operation,
    prevResult,
    number,
    result
  };

  logEntries.push(logObject);
  console.log(logEntries);

  //화면에 로그를 li로 렌더링하는 함수 호출
  renderTolog(logObject);
}

//화면에 로그를 li로 렌더링하는 함수
const renderTolog = ({operation: mark, prevResult, number, result}) => { //매개변수로 객체를 받으면서 객체 디스트럭쳐링 
  
  // li 태그 생성
  const $newLi = document.createElement('li');
  $newLi.classList.add('log-entries-item');
  $newLi.textContent = `#${++seq}. ${prevResult}${mark}${number}=${result}`;

  // ul에 추가
  $ul.appendChild($newLi);
}

// 더하기 버튼 이벤트 핸들러
const addHandler = () => calculate('ADD');

// 빼기 버튼 이벤트 핸들러
const subHandler = () => calculate('SUB');

// 곱하기 버튼 이벤트 핸들러
const multiHandler = () => calculate('MULTI');

// 나누기 버튼 이벤트 핸들러
const divideHandler = () => calculate('DIVIDE');

// ========== 이벤트 핸들러 바인딩 ========== //
$addBtn.addEventListener('click', addHandler);
$subtractBtn.addEventListener('click', subHandler);
$multiplyBtn.addEventListener('click', multiHandler);
$divideBtn.addEventListener('click', divideHandler);