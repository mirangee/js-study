// 일정 데이터가 들어있는 배열 선언(할 일 정보가 담긴 객체 저장)
const todos = [];

// 할 일 추가 처리 함수 정의
function insertTodoData() {
  // 사용자가 작성한 할 일 input 요소 얻기
  const $todoText = document.getElementById('todo-text');

  // 1. 입력값이 없다면 추가 처리하지 않음
  // 공백이 들어갈 가능성이 있기 때문에 공백을 제거하고 비교.
  // 공백 제거 함수: trim() === '';
  // 입력값 공백이면 -> background: orangered, placeholder: 필수 입력사항입니다!, 이벤트 강제 종료
  if ($todoText.value.trim() === '') {
    $todoText.style.background = 'orangered';
    $todoText.setAttribute('placeholder', '필수 입력사항입니다');
    $todoText.value = '';
    $todoText.focus();
    return;
  } else {
    //제대로 입력 되면 속성과 디자인 초기화
    $todoText.style.background = '';
    $todoText.setAttribute('placeholder', '할 일을 입력하세요');

    // 2. todos 배열에 객체를 생성한 후 추가 (id 추가 순서대로 할 것)
    const newData = {
      id: makeNewID(),
      text: $todoText.value,
      done: false
    }
    console.log(newData);
    todos.push(newData);

    // 3. 추가된 데이터를 화면에 표현 (li 태그 추가)
    // 함수로 따로 작성 : makeNewTodoNode(2번에서 생성한 할일 객체 전달);
    makeNewTodoNode(newData);

    // 4. 입력 완료 후 input에 존재하는 문자열 제거
    $todoText.value = '';
  }
};

// 추가될 할 일 객체의 id를 생성해 주는 함수 정의
function makeNewID() {
  if (todos.length > 0) {
    // 배열 내의 할 일 객체 중 마지막 객체의 id보다 하나 크게
    return todos[todos.length - 1].id + 1;
  } else {
    // 배열의 길이가 0인 경우
    return 1;
  }
}

// 화면에 표현할 li.todo-slit-item 노드를 생성하는 함수 정의
function makeNewTodoNode(newData) {

  // label.checkbox 태그 생성
  const $label = document.createElement('label');
  $label.classList.add('checkbox');

  const $Input = document.createElement('input');
  $Input.setAttribute('type', 'checkbox');
  $label.appendChild($Input);

  const $checkboxText = document.createElement('span');
  $checkboxText.classList.add('text');
  $checkboxText.textContent = newData.text;
  $label.appendChild($checkboxText);

  //modify용 div 생성
  const $modify = document.createElement('div');
  $modify.classList.add('modify');

  const $modifyIcon = document.createElement('span');
  $modifyIcon.classList.add('lnr', 'lnr-undo');
  // 클래스 이름을 두 개 이상 add할 때는 따로 지정해야 함.
  $modify.appendChild($modifyIcon);

  //remove용 div 생성
  const $remove = document.createElement('div');
  $remove.classList.add('remove');

  const $removeIcon = document.createElement('span');
  $removeIcon.classList.add('lnr', 'lnr-cross-circle');
  $remove.appendChild($removeIcon);

  // li 태그 생성
  const $newLi = document.createElement('li');
  $newLi.dataset.id = newData.id;
  $newLi.classList.add('todo-list-item');

  // 반복문 활용해서 append 진행
  [$label, $modify, $remove].forEach($ele => {
    $newLi.appendChild($ele);
  })

  const $ul = document.querySelector('.todo-list');
  $ul.appendChild($newLi);
}


// 할 일 완료 처리하는 함수
function changeCheckState($ele) {
  /*
  할 일 완료된 노드의 클래스 이름을 추가(디자인 줄라고)
  checked라는 클래스 이름을 추가하세요. 근데, 할 일 완료는 껐다 켰다 할 수 있어야 해요.
  -> 클래스 이름을 뗏다 붙였다 할 수 있어야 한다고.
  */
  $ele.classList.toggle('checked');

  /*
  전역 변수로 선언한 배열 안의 객체의 done 값을 수정해야 합니다.
  data-id를 얻어서, 그와 일치하는 객체의 done 값을 true로 바꿔야 합니다.
  만약, 기존의 값이 true였다? 그럼 false로 바뀌는 거에요.
  */
 
 for (let t of todos) {  
  if (t.id === +$ele.parentNode.dataset.id) {
    t.done = !t.done; // 논리를 반전해서 넣음
  } 
 }
};


// main 역할을 하는 즉시 실행 함수
(function () {

  // 할 일 추가 이벤트 등록
  const $addBtn = document.getElementById('add');
  $addBtn.addEventListener('click', (e) => {
    // form 태그 안에 button은 type을 명시하지 않으면 자동 submit이 동작합니다.
    e.preventDefault(); //버튼의 고유기능(submit) 중지.

    insertTodoData();
  });

  // 할 일 완료 처리(체크박스 누르기) 이벤트 등록
  const $ul = document.querySelector('.todo-list');
  $ul.addEventListener('click', (e) => {
    if (!e.target.matches('input[type = checkbox]')) {
      return; // 체크박스에서만 이벤트가 동작하도록 처리
    }
    changeCheckState(e.target.parentNode); // label을 함수 매개값으로 전달
  })

  // 할 일 삭제 이벤트 등록

  // 할 일 수정 이벤트(수정 모드 진입, 수정 완료) 등록
})();