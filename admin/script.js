document.getElementById('login-form').addEventListener('submit', function (event) {
    event.preventDefault();
  
    // Obter os valores dos campos de login e senha
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
  
    // Verificar se o campo de login contém caracteres especiais
    var hasSpecialCharacters = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/.test(username);
    if (hasSpecialCharacters) {
      displayErrorMessage('O campo de login não pode conter caracteres especiais.');
      return;
    }
  
    // Verificar se o campo de login possui mais de 8 caracteres
    if (username.length > 8) {
      displayErrorMessage('O campo de login deve ter no máximo 8 caracteres.');
      return;
    }
  
    // Enviar uma solicitação para o arquivo PHP para validar o login e a senha
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'login.php', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          // Login bem-sucedido, redirecionar para a página do painel de administração
          window.location.href = 'admin/index.html';
        } else {
          // Login inválido, exibir mensagem de erro
          displayErrorMessage('Login ou senha inválidos.');
        }
      }
    };
    xhr.send('username=' + encodeURIComponent(username) + '&password=' + encodeURIComponent(password));
  });
  
  function displayErrorMessage(message) {
    var errorMessageElement = document.getElementById('error-message');
    errorMessageElement.textContent = message;
  }
  