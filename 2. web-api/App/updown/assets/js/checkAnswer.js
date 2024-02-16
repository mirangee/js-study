

function caseUp($icon) {
  // 1. #begin인 em의 숫자값을 answer+1로 변경
  document.getElementById('begin').textContent = +$icon.dataset.iconNumber + 1;

  // 2. up 요소에 애니메이션 적용 -> .selected를 추가
  // #down 요소의 .selected를 제거, #up에 추가
  document.getElementById('down').classList.remove('selected');
  document.getElementById('up').classList.add('selected');

  // 3. 자기 자신 아이콘 포함 이전 형제 요소들 전부 삭제

  let $delTarget = $icon; // 사용자가 지목한, 지워져야할 타겟
  // 삭제되는 요소는 자신의 이전 형제 요소를 지목해 놓고 삭제됩니다. 
  // 삭제되는 요소가 1번 아이콘의 경우, 이전 요소가 없기 때문에 $delTarget이 null이 됩니다.
  // $delTarget이 null이 되는 순간 반복문을 종료시키겠다는 조건식을 작성.
  const $numbers = document.getElementById('numbers');

  while ($delTarget) {
    const $nextTarget = $delTarget.previousElementSibling;
    $numbers.removeChild($delTarget);

    $delTarget = $nextTarget; // 내가 지워지기 전에 다음 지울 타겟을 지목
  }
}

function caseDown($icon) {
  // 1. #end인 em의 숫자값을 answer-1로 변경
  document.getElementById('end').textContent = +$icon.dataset.iconNumber - 1;

  // 2. down 요소에 애니메이션 적용
  document.getElementById('up').classList.remove('selected');
  document.getElementById('down').classList.add('selected');

  // 3. 자기 자신 아이콘 포함 이후 형제 요소들 전부 삭제
  let $delTarget = $icon;
  const $numbers = document.getElementById('numbers');
  while ($delTarget) {
    const $nextTarget = $delTarget.nextElementSibling;
    $numbers.removeChild($delTarget);

    $delTarget = $nextTarget; // 내가 지워지기 전에 다음 지울 타겟을 지목
  }
}

function correctAnswer($icon) {
  //1. #finish 박스에 class 'show' 부여
  const $finish = document.getElementById('finish');
  $finish.classList.add('show');

  //2. #numbers 클릭 이벤트 해제
  const $numbers = document.getElementById('numbers');
  $numbers.onclick = null;

  // 3. 사용자가 선택한 아이콘에 id 'move' 추가
  $icon.setAttribute('id', 'move');

  // 4. up, down 움직임 해제
  document.getElementById('up').classList.remove('selected');
  document.getElementById('down').classList.remove('selected');
}

export {caseUp, caseDown, correctAnswer}