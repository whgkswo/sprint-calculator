const calculator = document.querySelector('.calculator'); // calculator 엘리먼트와, 그 자식 엘리먼트의 정보를 모두 담고 있습니다.
const buttons = calculator.querySelector('.calculator__buttons'); // calculator__keys 엘리먼트와, 그 자식 엘리먼트의 정보를 모두 담고 있습니다.

const firstOperend = document.querySelector('.calculator__operend--left'); // calculator__operend--left 엘리먼트와, 그 자식 엘리먼트의 정보를 모두 담고 있습니다.
const operator = document.querySelector('.calculator__operator'); // calculator__operator 엘리먼트와, 그 자식 엘리먼트의 정보를 모두 담고 있습니다.
const secondOperend = document.querySelector('.calculator__operend--right'); // calculator__operend--right 엘리먼트와, 그 자식 엘리먼트의 정보를 모두 담고 있습니다.
const calculatedResult = document.querySelector('.calculator__result'); // calculator__result 엘리먼트와, 그 자식 엘리먼트의 정보를 모두 담고 있습니다.
let inputStage = 0;

function calculate(n1, operator, n2) {
  let result = 0;
  // TODO : n1과 n2를 operator에 따라 계산하는 함수를 만드세요.
  // ex) 입력값이 n1 : '1', operator : '+', n2 : '2' 인 경우, 3이 리턴됩니다.
  switch (operator){
    case '+':
      result = n1+n2;
      break;
    case '-':
      result = n1-n2;
      break;
    case '*':
      result = n1*n2;
      break;
    case '/':
      result = n1/n2;
      break;
  }
  return String(result);
}

buttons.addEventListener('click', function (event) {
  // 버튼을 눌렀을 때 작동하는 함수입니다.

  const target = event.target; // 클릭된 HTML 엘리먼트의 정보가 저장되어 있습니다.
  const action = target.classList[0]; // 클릭된 HTML 엘리먼트에 클레스 정보를 가져옵니다.
  const buttonContent = target.textContent; // 클릭된 HTML 엘리먼트의 텍스트 정보를 가져옵니다.
  // ! 위 코드(Line 19 - 21)는 수정하지 마세요.

  if (target.matches('button')) {
    // TODO : 계산기가 작동할 수 있도록 아래 코드를 수정하세요. 작성되어 있는 조건문과 console.log를 활용하시면 쉽게 문제를 풀 수 있습니다.
    // 클릭된 HTML 엘리먼트가 button이면
    if (action === 'number') {
      // 그리고 버튼의 클레스가 number이면
      // 아래 코드가 작동됩니다.
      //console.log('숫자 ' + buttonContent + ' 버튼');
      if(inputStage === 0){
        firstOperend.textContent = buttonContent;
        inputStage++;
      }
      if(inputStage === 2){
        secondOperend.textContent = buttonContent;
        inputStage++;
      }
    }

    if (action === 'operator') {
      //console.log('연산자 ' + buttonContent + ' 버튼');
      if(inputStage === 1){
        operator.textContent = buttonContent;
        inputStage++;
      }
    }

    if (action === 'decimal') {
      // console.log('소수점 버튼');
    }

    if (action === 'clear') {
      //console.log('초기화 버튼');
      firstOperend.textContent = 0;
      operator.textContent = '+';
      secondOperend.textContent = 0;
      inputStage = 0;
      calculatedResult.textContent = 0;
    }

    if (action === 'calculate') {
      //console.log('계산 버튼');
      if(inputStage===3){
        calculatedResult.textContent = calculate(Number(firstOperend.textContent), operator.textContent, Number(secondOperend.textContent));
      }
    }
  }
});


// ! Advanced Challenge test와 Nightmare test를 위해서는 아래 주석을 해제하세요.

const display = document.querySelector('.calculator__display--for-advanced'); // calculator__display 엘리먼트와, 그 자식 엘리먼트의 정보를 모두 담고 있습니다.
let firstNum, operatorForAdvanced, previousKey, previousNum;

let numbers = [];
let operators = [];
let lastButton = "0";
let result; let totalResult;
buttons.addEventListener('click', function (event) {
  // 버튼을 눌렀을 때 작동하는 함수입니다.

  const target = event.target; // 클릭된 HTML 엘리먼트의 정보가 저장되어 있습니다.
  const action = target.classList[0]; // 클릭된 HTML 엘리먼트에 클레스 정보를 가져옵니다.
  const buttonContent = target.textContent; // 클릭된 HTML 엘리먼트의 텍스트 정보를 가져옵니다.
  // ! 위 코드는 수정하지 마세요.
  //console.log("지금 클릭한 버튼은 = " + buttonContent);

  // ! 여기서부터 Advanced Challenge & Nightmare 과제룰 풀어주세요.
  if (target.matches('button')) {
    if (action === 'number') {
      if(lastButton !== result){
        if("+-*/".indexOf(lastButton) !== -1){
          lastButton = "";
        }
        if(display.textContent === '0'){
          display.textContent = buttonContent;
          lastButton = buttonContent;
        }else{
          display.textContent += buttonContent;
          lastButton += buttonContent;
        }  
      } 
    }
    if (action === 'operator'){  
      if(!lastButton.endsWith(".")){
        if("+-*/".indexOf(lastButton) === -1){
          display.textContent += buttonContent;
          numbers.push(Number(lastButton));
          operators.push(buttonContent);
        }else{
          display.textContent = display.textContent.slice(0,display.textContent.length-1) + buttonContent;
          operators[operators.length-1] = buttonContent;
        }
        lastButton = buttonContent;
      }
    }
    if (action === 'decimal') {
      if(lastButton.indexOf(".") === -1){
        if(lastButton !== result){
          let firstDigit = "";
          if(display.textContent !== "0" && "+-*/".indexOf(lastButton) !== -1){
            lastButton = "0";
            firstDigit = "0";
          }
          display.textContent += firstDigit + buttonContent;
          lastButton += buttonContent;
        }
      }else if(lastButton.endsWith(".")){
        display.textContent = display.textContent.slice(0,display.textContent.length - lastButton.length);
        lastButton = lastButton.slice(0,lastButton.length-1);
        display.textContent += lastButton;
      }
    }
    if (action === 'clear') {
      display.textContent = '0';
      lastButton = "0";
      numbers = []; operators = [];
    }
    if (action === 'calculate') {
      if("+-*/.".indexOf(lastButton) === -1){
        numbers.push(Number(lastButton));
        //console.log(numbers);
        //console.log(operators);

        totalResult = 0;  result = 0;
        let mulDivMode = true;
        while(operators.length > 0){
          let mulDivFound = false;
          let plusMinusFound = false;
          let lastIndex = 0;
          for(let i = lastIndex; i<operators.length; i++){         
            if(mulDivMode){
              if(operators[i] === "*"){
                result = numbers[i] * numbers[i+1];
                mulDivFound = true;
              }else if(operators[i] === "/"){
                result = numbers[i] / numbers[i+1];
                mulDivFound = true;
              }
            }else{
              if(operators[i] === "+"){
                result = numbers[i] + numbers[i+1];
                plusMinusFound = true;
              }else if(operators[i] === "-"){
                result = numbers[i] - numbers[i+1];
                plusMinusFound = true;
              }
            }
            if(mulDivFound || plusMinusFound){
              numbers[i] = result;
              numbers.splice(i+1, 1);
              operators.splice(i, 1);
              totalResult += result;
              lastIndex = i;
              break;
            }
          }
          if(!mulDivFound){
            mulDivMode = false;
          }
        }
        totalResult = Math.round(result * 1000)/1000;
        display.textContent = totalResult;
        numbers = []; operators = [];
        lastButton = totalResult;
      }
    }
    console.log(lastButton);
  }

});
