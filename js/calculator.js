//객체 생성
const calculator = {
    displayValue: '0',
    firstOperand: null, //첫 번째 피연산자 지정 초기값 null로 설정.
    waitingForSecondOperand: false, //첫 번째 피연산자 입력됬는지 확인하기 '.'인 경우 true로 사용자가 입력하는 다음 피연산자 구성
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
    if (!calculator.displayValue.includes(dot)) {
        // 소수점 추가
        calculator.displayValue += dot;
    }
}

//연산자 처리 (+,-,x,/,=)
//사용자가 첫 번째 피연산자를 입력 한 후 연산자를 칠 대
function handleOperator(nextOperator) {
    // 계산기 개체의 속성을 구조화
    const { firstOperand, displayValue, operator } = calculator
    // `parseFloat`는`displayValue`의 문자열 내용을 변환합니다.
    // 부동 소수점 숫자로
    const inputValue = parseFloat(displayValue);

    if (operator && calculator.waitingForSecondOperand) {
        calculator.operator = nextOperator;
        console.log(calculator);
        return;
    }

    // `firstOperand`가 null이고`inputValue`가
    // 부동 소수점 숫자로
    if (firstOperand === null && !isNaN(inputValue)) {
        // firstOperand 속성 업데이트
        calculator.firstOperand = inputValue;
    } else if (operator) {
        const result = calculate(firstOperand, inputValue, operator);

        // calculator.displayValue = String(result);

        calculator.displayValue = `${parseFloat(result.toFixed(7))}`;
        calculator.firstOperand = result;
    }

    calculator.waitingForSecondOperand = true;
    calculator.operator = nextOperator;
    console.log(calculator);
}


//사용자가 두 번째 피연산자를 입력 한 후 연사자를 칠 때
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
//계산기 재설정
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
    // 'calculator-screen'클래스가있는 요소를 선택합니다.
    const display = document.querySelector('.calculator-screen');
    // 요소의 값을`displayValue`의 내용으로 업데이트합니다.
    display.value = calculator.displayValue;
}

updateDisplay();

//키 누름 설정
const keys = document.querySelector('.calculator-keys');
keys.addEventListener('click', (e) => {
    //클릭 한 요소에 액세스
    // const target = e.target === const { target } = e; 와 같다.
    const { target } = e;
    // 클릭 한 요소가 버튼인지 확인
    // 그렇지 않은 경우 함수를 종료하십시오.
    if (!target.matches('button')) {
        return;
    }
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

