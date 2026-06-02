<?php
// require database using an absolute path relative to this file
require_once __DIR__ . '/../../../config/database.php';

class AuthController {

    private $conn;

    public function __construct() {
        $db = new Database();
        $this->conn = $db->getConnection();
    }

    // REGISTER
    public function register($data) {
        $query = "INSERT INTO users (name, email, password, role) VALUES (:name, :email, :password, 'user')";
        $stmt = $this->conn->prepare($query);

        $password = password_hash($data['password'], PASSWORD_BCRYPT);

        $stmt->bindParam(":name", $data['name']);
        $stmt->bindParam(":email", $data['email']);
        $stmt->bindParam(":password", $password);

        if ($stmt->execute()) {
            return ["message" => "User registered"];
        }

        return ["message" => "Error"];
    }

    // LOGIN
    public function login($data) {
        $query = "SELECT * FROM users WHERE email = :email LIMIT 1";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":email", $data['email']);
        $stmt->execute();

        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$user) {
            return ["message" => "Invalid email"];
        }

        if (!password_verify($data['password'], $user['password'])) {
            return ["message" => "Invalid password"];
        }

        // simple token (you can upgrade to JWT later)
        $token = base64_encode($user['id'] . "|" . $user['role']);

        return [
            "id" => $user['id'],
            "name" => $user['name'],
            "email" => $user['email'],
            "role" => $user['role'],
            "token" => $token
        ];
    }
}