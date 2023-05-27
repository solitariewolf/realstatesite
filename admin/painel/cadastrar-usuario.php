<?php
// Dados de conexão com o banco de dados
$servername = "localhost";
$username = "root";
$password = "";
$database = "state";

// Cria a conexão com o banco de dados
$conn = new mysqli($servername, $username, $password, $database);

// Verifica se houve erro na conexão
if ($conn->connect_error) {
    die("Falha na conexão com o banco de dados: " . $conn->connect_error);
}

// Verifica se o formulário foi submetido
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Obtém os dados do formulário
    $usuario = $_POST["usuario"];
    $senha = $_POST["senha"];

    // Realize a validação e a inserção no banco de dados aqui

    // Aplica a sanitização nos dados
    $usuario = mysqli_real_escape_string($conn, $usuario);
    $senha = mysqli_real_escape_string($conn, $senha);

    // Insere os dados no banco de dados
    $sql = "INSERT INTO usuarios (usuario, senha) VALUES ('$usuario', '$senha')";
    if ($conn->query($sql) === TRUE) {
        $response = array(
            'success' => true,
            'message' => 'Usuário cadastrado com sucesso!'
        );
        echo json_encode($response);
    } else {
        $response = array(
            'success' => false,
            'message' => 'Erro ao cadastrar usuário: ' . $conn->error
        );
        echo json_encode($response);
    }
}

// Fecha a conexão com o banco de dados
$conn->close();
?>
