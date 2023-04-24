const formEvt = document.querySelector('.form');
const formData = {};

formEvt.addEventListener('input', formInput);
formEvt.addEventListener('submit', formSubmit);

function formInput(evt) {
  formData[evt.target.name] = Number(evt.target.value);
};

function formSubmit(evt) {
  evt.preventDefault();

  const { delay, step, amount } = formData;

  if(delay <= 0 || step <= 0 || amount <= 0) {
    window.alert('Fail!, number must be > 0');
    console.log('');
    return;
  };
  
  for (let index = 0; index < amount; index += 1) {
    createPromise(index + 1, delay + step * index)
    .then(({position, delay}) => {
      console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      console.log(`❌ Rejected promise ${position} in ${delay}ms`)
    });
  };
};

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
       resolve({ position, delay })
      } else {
       reject({ position, delay })
      };
    }, delay);
  })
}
