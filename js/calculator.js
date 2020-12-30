//객체 생성
const calculator = {
    displayValue: '0', //사용자 입력 or 작업 결과를 나타내기 초기 입력값을 0 으로 설정 
    firstOperand: null, //첫 번째 피연산자 지정 초기값 null로 설정.
    waitingForSecondOperand: false, // 첫 번째 피연산자와 연산자 입력된지 확인 방법 'true'인경우 다음 숫자가 피연산자 구성
    operator: null, //입력값 저장 초기 null로 설정 
};

//숫자 입력
function inputDigit(digit) {
    const { displayValue, waitingForSecondOperand } = calculator;

    if (waitingForSecondOperand === true) {
        calculator.displayValue = digit;
        calculator.waitingForSecondOperand = false;
    } else {
        // 현재 값이 '0'이면 'displayValue'를 덮어 씁니다. 그렇지 않으면 추가합니다.
        calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
    }

    console.log(calculator);
}

//소수점 입력
function inputDecimal(dot) {
    //십진수 버그 수정
    if (calculator.waitingForSecondOperand === true) {
        calculator.displayValue = '0.'
        calculator.waitingForSecondOperand = false;
        return
    }
    // `displayValue` 속성에 소수점이없는 경우
    //includes ? 배열속 해당 원소가 있으면 t 없으면 f
    if (!calculator.displayValue.includes(dot)) {
        // 소수점 추가
        calculator.displayValue += dot;
    }
}

//연산자 처리 (+,-,x,/,=)
//이벤트 핸들러 : 이벤트가 발생했을 떄 동작하는 코드
function handleOperator(nextOperator) {
    // 계산기 개체의 속성을 구조화
    const { firstOperand, displayValue, operator } = calculator
    // `parseFloat`는`displayValue`의 문자열 내용을 변환합니다.
    // 부동 소수점 숫자로 반환
    const inputValue = parseFloat(displayValue);

    //두 개 이상의 연산자를 연속적으로 입력한 한 경우
    //연산자 입력 시점 계산기는 두 번째 피연산자가 입력 될 것으로 예상
    // waitingForSecondOperand true로 반환 
    if (operator && calculator.waitingForSecondOperand) {
        calculator.operator = nextOperator;
        console.log(calculator);
        return;
    }

    // `firstOperand`가 null이고`inputValue`가
    // 부동 소수점 숫자로
    // firstOperand 가 null 값이거나 not and number이면 // firstOperand 속성 업데이트 
    if (firstOperand === null && !isNaN(inputValue)) {
        calculator.firstOperand = inputValue;
        //그렇치 않으면 함수를 호출하고 결과를 변수에 저장
    } else if (operator) {
        const result = calculate(firstOperand, inputValue, operator);
        //부동 소수점 고정 수소점으로 변경
        //toFixed? 숫자를 고정 소수점 표시로 나타낸 물자열로 리턴
        calculator.displayValue = `${parseFloat(result.toFixed(7))}`;
        calculator.firstOperand = result;
    }
    calculator.waitingForSecondOperand = true;
    calculator.operator = nextOperator;
    console.log(calculator);
}


//사용자가 두 번째 피연산자를 입력 한 후 연사자를 칠 때 발생
//연산자가 = 인 경우 두번째 피연산자는 그대로 반환
function calculate(firstOperand, secondOperand, operator) {
    if (operator === '+') {
        return firstOperand + secondOperand;
    } else if (operator === '-') {
        return firstOperand - secondOperand;
    } else if (operator === '*') {
        return firstOperand * secondOperand;
    } else if (operator === '/') {
        return firstOperand / secondOperand;
    }

    return secondOperand;
}
//계산기 재설정 AC
function resetCalculator() {
    calculator.displayValue = '0';
    calculator.firstOperand = null;
    calculator.waitingForSecondOperand = false;
    calculator.operator = null;
    console.log(calculator);
}

//함수 생성
//displayvalue 속성 화면에 표시
function updateDisplay() {
    //(#calculator-screen) 은 id 가진 요소 찾기
    //(.calculator-screen) 은 class 가진 요소 찾기
    const display = document.querySelector('.calculator-screen');
    // 요소의 값을 displayValue 의 내용으로 업데이트합니다.
    display.value = calculator.displayValue;
}
updateDisplay();

//키 누름 설정
const keys = document.querySelector('.calculator-keys');
//addEventListener 특정 이벤트를 등록하는 방법
//
keys.addEventListener('click', (event) => {
    // const target = event.target == const { target } = event; 와 같다.
    //target ? 이벤트가 일어날  객체를 의미
    //이 코드 타겟은 버튼 태그에 대한 객체
    const { target } = event;
    // 클릭 한 요소가 버튼인지 확인 , 그렇지 않은 경우 함수를 종료하십시오.
    if (!target.matches('button')) {
        return;
    }
    //classList란 읽기 전용 프로퍼티 클래스 목록의 접근 방식
    //classList.contains란 값이 존재하는지  체크(true/false) 
    if (target.classList.contains('operator')) {
        handleOperator(target.value);
        updateDisplay();
        return;
    }
    if (target.classList.contains('decimal')) {
        inputDecimal(target.value)
        updateDisplay();
        return;
    }
    if (target.classList.contains('all-clear')) {
        resetCalculator();
        updateDisplay();
        return;
    }
    inputDigit(target.value);
    updateDisplay();
});

