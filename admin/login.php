<?php
// Dados de conexão com o banco de dados
$servername = "localhost";  // Endereço do servidor
$username = "root";        // Nome de usuário do MySQL
$password = "";            // Senha do MySQL
$database = "state";       // Nome do banco de dados

// Cria a conexão com o banco de dados
$conn = new mysqli($servername, $username, $password, $database);

// Verifica se houve erro na conexão
if ($conn->connect_error) {
    die("Falha na conexão com o banco de dados: " . $conn->connect_error);
}

// Verifica se o formulário foi submetido
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Obtém os dados do formulário
    $login = $_POST["username"];
    $senha = $_POST["password"];

    // Aplica a sanitização nos dados
    $login = mysqli_real_escape_string($conn, $login);
    $senha = mysqli_real_escape_string($conn, $senha);

    // Consulta ao banco de dados
    $sql = "SELECT * FROM usuarios WHERE usuario = '$login' AND senha = '$senha'";
    $result = $conn->query($sql);

    // Verifica se a consulta retornou algum resultado
    if ($result->num_rows > 0) {
        // Login bem-sucedido
        session_start();
        $_SESSION['usuario'] = $login;
        $_SESSION['logado'] = true;
        setcookie(session_name(), session_id(), 0, '/');
        header("Location: ./painel/index.html");
        exit();
    } else {
        // Login inválido
        echo "Login inválido!";
        echo "<script>setTimeout(function() { window.location.href = 'index.html'; }, 1000);</script>";
    }
}

// Fecha a conexão com o banco de dados
$conn->close();
?>
