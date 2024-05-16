const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  clearMessages();
  let isFormValid = true;

  isFormValid =
    checkInput([username, email, password, confirmPassword]) && isFormValid;
  if (!checkEmail(email.value)) {
    showError(email, `อีเมลไม่ถูกต้อง`);
    isFormValid = false;
  } else {
    showSuccess(email);
  }
  isFormValid = checkPassword(password, confirmPassword) && isFormValid;
  isFormValid = checkLength(username, 6, 10) && isFormValid;
  isFormValid = checkLength(password, 4, 8) && isFormValid;

  if (!isFormValid) {
    showFormMessage("error", "กรุณากรอกข้อมูลให้ครบทุกช่อง");
  }
});

const checkEmail = (email) => {
  const reg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return reg.test(String(email).toLowerCase());
};

const checkLength = (input, min, max) => {
  if (input.value.length < min) {
    showError(input, `${getInputCase(input)} ต้องมีอย่างน้อย ${min} ตัวอักษร`);
    return false;
  } else if (input.value.length > max) {
    showError(input, `${getInputCase(input)} ต้องมีไม่เกิน ${max} ตัวอักษร`);
    return false;
  } else {
    showSuccess(input);
    return true;
  }
};

const checkPassword = (password, confirmPassword) => {
  if (password.value !== confirmPassword.value) {
    showError(confirmPassword, "กรุณาป้อนรหัสผ่านให้ตรงกัน");
    return false;
  }
  return true;
};

const showError = (input, message) => {
  const formControl = input.parentElement;
  const small = formControl.querySelector("small");
  small.innerText = message;
  formControl.className = "form-control error";
};

const showSuccess = (input) => {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
};

const checkInput = (InputArr) => {
  let isAllFilled = true;
  InputArr.forEach((input) => {
    if (input.value.trim() === "") {
      showError(input, `กรุณาป้อน ${getInputCase(input)}`);
      isAllFilled = false;
    } else {
      showSuccess(input);
    }
  });
  return isAllFilled;
};

const clearMessages = () => {
  const messages = document.querySelectorAll(".form-message");
  messages.forEach((message) => message.remove());
};

const showFormMessage = (type, message) => {
  const formMessage = document.createElement("div");
  formMessage.className = `form-message ${type}-message`;
  formMessage.innerText = message;
  form.appendChild(formMessage);
};

const getInputCase = (input) => {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
};
