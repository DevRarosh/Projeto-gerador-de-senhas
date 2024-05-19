function getChartTypes() {
  const uppercase = document.querySelector("#maiusculo").checked;
  const lowercase = document.querySelector("#minusculo").checked;
  const number = document.querySelector("#numeros").checked;
  const special = document.querySelector("#especial").checked;

  const charTypes = [];

  if (uppercase) {
    charTypes.push('ABCDEFGHIJKLMNOPQRSTUVWXYZ');
  }
  if (lowercase) {
    charTypes.push('abcdefghijklmnopqrstuvwxyz');
  }
  if (number) {
    charTypes.push('0123456789');
  }
  if (special) {
    charTypes.push('!@#$%^&*()_-+={}[]|\\/?><:;"\'.,~`');
  }
  return charTypes;
}

function gerPasswordSize() {
  const size = document.querySelector("#size").value;
  return size;
}

function randomCharType(charTypes) {
  const randomIndex = Math.floor(Math.random() * charTypes.length);
  return charTypes[randomIndex][Math.floor(Math.random() * charTypes[randomIndex].length)];
}

function generatePassword(size, charTypes) {
  let passwordGenerated = '';

  while (passwordGenerated.length < size) {
    passwordGenerated += randomCharType(charTypes);
  }
  return passwordGenerated;
}


function mensagem(text, background) {
  Toastify({
    text: text,
    duration: 2000,
    style: {
      background: background,
      boxShadow: 'none',
      borderRadius: '20px'
    }
  }).showToast();

}



document.querySelector('#buttongera').addEventListener('click', function() {
  const size = gerPasswordSize();
  const charTypes = getChartTypes();


  if (!size) {
    return;
  }

  if (!charTypes.length) {
    mensagem('Selecione pelo menos um tipo de caractere!', '#dc2626')
    return;
  }

  const passwordGenerated = generatePassword(size, charTypes);


  document.querySelector("#senhabox").value = passwordGenerated;


  // Analisar a força da senha
  const senhaDesativadaInput = document.getElementById('senhabox');
  const strengthMeter = document.querySelector('.indicador-de-senha');

  // Analisar o número de caracteres na senha
  const tamanhoSenha = senhaDesativadaInput.value.length;
  const passwordStrength = (tamanhoSenha / 20) * 68; // Normaliza para uma escala de 0 a 100
  strengthMeter.style.width = passwordStrength + '%';

  // Remover classes existentes
  strengthMeter.classList.remove('weak', 'medium', 'strong');

  // Definir classe com base no tamanho da senha
  if (tamanhoSenha < 8) {
    strengthMeter.classList.add('weak');
  } else if (tamanhoSenha >= 8 && tamanhoSenha < 15) {
    strengthMeter.classList.add('medium');
  } else {
    strengthMeter.classList.add('strong');
  }
});

document.getElementById('size').addEventListener('input', function() {
  const sizeValue = document.getElementById('size').value;
  document.getElementById('charCount').textContent = sizeValue;
});

document.getElementById('copy').addEventListener('click', function () {
  const password = document.querySelector('#senhabox').value;

  if (!password) {
    mensagem('Campo vazio. Não foi possível copiar.', '#dc2626');
    return;
  }
  

  navigator.clipboard.writeText(document.querySelector('#senhabox').value)
  mensagem('Senha copiada com sucesso!!','#84cc16');
  return;
});

