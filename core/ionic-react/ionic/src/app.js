const calculateBtn = document.getElementById('calc-btn');
const resetBtn = document.getElementById('reset-btn');
const heightInput = document.getElementById('height-input');
const weightInput = document.getElementById('weight-input');

const resultArea = document.getElementById('result');

const resetInputs = () => {
  heightInput.value = '';
  weightInput.value = '';
};

const calculateBmi = () => {
  const enteredHeight = +heightInput.value;
  const enteredWeight = +weightInput.value;

  const bmi = enteredWeight / (enteredHeight * enteredHeight);

  if (isNaN(bmi)) {
    alert('Not a number, please check inputs!');
    return;
  }

  const resultElement = document.createElement('ion-card');
  resultElement.innerHTML = `
    <ion-card-content>
      <h2>${bmi}</h2>
    </ion-card-content>
  `;
  resultArea.innerHTML = '';
  resultArea.appendChild(resultElement);
};

calculateBtn.addEventListener('click', calculateBmi);
resetBtn.addEventListener('click', resetInputs);