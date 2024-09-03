import CryptoJS from 'crypto-js';

export function formatarNome(nome) {
  const partes = nome.split(' ');
  const primeiroNome = partes[0];
  const segundoNome = partes[1] || '';
  return `${primeiroNome} ${segundoNome}`;
}
export function formatarRG(rg) {
  const numeros = rg.replace(/\D/g, '');
  const regexRG = /^(\d{1,2})(\d{3})(\d{3})(\d{1})$/;
  return numeros.replace(regexRG, '$1.$2.$3-$4');
};
export function formatarCPF(cpf) {
  const numeros = cpf.replace(/\D/g, '');

  const regexCPF = /^(\d{3})(\d{3})(\d{3})(\d{2})$/;
  const cpfFormatado = numeros.replace(regexCPF, '$1.$2.$3-$4');

  return cpfFormatado;
};
export function validarCPF(cpf) {
  cpf = cpf.replace(/\D/g, '');
  if (cpf.length !== 11) {
    return false;
  }
  if (/^(\d)\1{10}$/.test(cpf)) {
    return false;
  }
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cpf.charAt(i)) * (10 - i);
  }
  let rest = sum % 11;
  let digit1 = (rest < 2) ? 0 : 11 - rest;
  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cpf.charAt(i)) * (11 - i);
  }
  rest = sum % 11;
  let digit2 = (rest < 2) ? 0 : 11 - rest;
  if (parseInt(cpf.charAt(9)) !== digit1 || parseInt(cpf.charAt(10)) !== digit2) {
    return false;
  }
  return true;
}

export function formatarData(data) {
  return data ? new Date(parseInt(data.substr(6))).toLocaleDateString() : '';
}

export function decrypt(encryptedText) {
  const keyHex = 'a1b2c3d4e5f607890a1b2c3d4e5f607890a1b2c3d4e5f607890a1b2c3d4e5f60';
  const ivHex = '00000000000000000000000000000000'; 

  const key = CryptoJS.enc.Hex.parse(keyHex);
  const iv = CryptoJS.enc.Hex.parse(ivHex);

  encryptedText = encryptedText.replace(/-/g, '+').replace(/_/g, '/');

  const encryptedWordArray = CryptoJS.enc.Base64.parse(encryptedText);

  const decrypted = CryptoJS.AES.decrypt(
    { ciphertext: encryptedWordArray },
    key,
    {
      iv: iv,
      padding: CryptoJS.pad.Pkcs7,
      mode: CryptoJS.mode.CBC
    }
  );

  const decryptedText = decrypted.toString(CryptoJS.enc.Utf8);

  return decryptedText;
}

export function parseJwt(token) {
  // Divide o token em suas três partes: header, payload e signature
  const base64Url = token.split('.')[1];

  // Converte o payload de base64 para uma string comum
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  // Retorna o payload como um objeto JavaScript
  return JSON.parse(jsonPayload);
}