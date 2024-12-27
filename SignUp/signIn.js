function handleSignUp(event) {
  event.preventDefault(); // جلوگیری از ارسال فرم

  // دریافت اطلاعات فرم
  const fullName = document.getElementById("full-name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirm-password").value;
  const userType = document.getElementById("user-type").value;

  // اعتبارسنجی فرم
  if (password !== confirmPassword) {
    alert("Passwords do not match!");
    return;
  }
  alert("Sign up successful! Redirecting to Login...");
  window.location.href = "file:///C:/Users/98915/Desktop/University/DataBaseProject/profile/profilePage.html";
}
