window.addEventListener('DOMContentLoaded', function () {
    var userFormLink = document.querySelector('a[href="#cadastrar-usuario"]');
    userFormLink.addEventListener('click', function (event) {
      event.preventDefault();
  
      // Carregar o conteúdo do formulário de cadastro de usuário
      var contentContainer = document.querySelector('.content');
      contentContainer.innerHTML = `
        <h2>Cadastrar Usuário</h2>
        <form id="user-form" class="user-form">
          <div class="form-group">
            <label for="usuario">Usuário:</label>
            <input type="text" id="usuario" name="usuario" required>
          </div>
          <div class="form-group">
            <label for="senha">Senha:</label>
            <input type="password" id="senha" name="senha" required>
          </div>
          <div class="form-group">
            <label for="repetir-senha">Repetir Senha:</label>
            <input type="password" id="repetir-senha" name="repetir-senha" required>
          </div>
          <button type="submit">Cadastrar</button>
          <p id="error-message" class="error-message"></p>
          <p id="success-message" class="success-message"></p>
        </form>
      `;
  
      // Adicionar evento de envio do formulário
      var userForm = document.getElementById('user-form');
      userForm.addEventListener('submit', function (event) {
        event.preventDefault();
  
        var usuario = document.getElementById('usuario').value;
        var senha = document.getElementById('senha').value;
        var repetirSenha = document.getElementById('repetir-senha').value;
  
        // Verificar se as senhas coincidem
        if (senha !== repetirSenha) {
          displayErrorMessage('As senhas não coincidem.');
          return;
        }
  
        // Enviar os dados para o servidor
        var xhr = new XMLHttpRequest();
        xhr.open('POST', 'cadastrar-usuario.php', true);
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.onreadystatechange = function () {
          if (xhr.readyState === 4 && xhr.status === 200) {
            var response = JSON.parse(xhr.responseText);
            if (response.success) {
              displaySuccessMessage('Usuário cadastrado com sucesso!');
              // Redirecionar ou executar ações adicionais após o cadastro
            
            } else {
              displayErrorMessage(response.message);
            }
  
            // Limpar as mensagens após 5 segundos
            setTimeout(function () {
              clearMessages();
            }, 5000);
          }
        };
        xhr.send('usuario=' + encodeURIComponent(usuario) + '&senha=' + encodeURIComponent(senha));
      });
    });
  });
  
  function displayErrorMessage(message) {
    var errorMessageElement = document.getElementById('error-message');
    errorMessageElement.textContent = message;
    errorMessageElement.style.display = 'block';
  }
  
  function displaySuccessMessage(message) {
    var successMessageElement = document.getElementById('success-message');
    successMessageElement.textContent = message;
    successMessageElement.style.display = 'block';
  }
  
  function clearMessages() {
    var errorMessageElement = document.getElementById('error-message');
    var successMessageElement = document.getElementById('success-message');
    errorMessageElement.textContent = '';
    successMessageElement.textContent = '';
    errorMessageElement.style.display = 'none';
    successMessageElement.style.display = 'none';
  }
  