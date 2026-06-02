<?php

require_once __DIR__ . '/../../../config/database.php';

class OrderController
{
    private $conn;

    public function __construct()
    {
        $db = new Database();
        $this->conn = $db->getConnection();
    }

    // CREATE ORDER
    public function create($data)
    {
        $query = "INSERT INTO orders (user_id, items, total, status)
                  VALUES (:user_id, :items, :total, 'pending')";

        $stmt = $this->conn->prepare($query);

        $items = json_encode($data['items']);

        $stmt->bindParam(":user_id", $data['user_id']);
        $stmt->bindParam(":items", $items);
        $stmt->bindParam(":total", $data['total']);

        return $stmt->execute();
    }

    // GET USER ORDERS
    public function getUserOrders($user_id)
    {
        $query = "SELECT * FROM orders WHERE user_id = :user_id ORDER BY id DESC";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":user_id", $user_id);
        $stmt->execute();

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    // GET ALL ORDERS (ADMIN)
    public function getAll()
    {
        $query = "SELECT * FROM orders ORDER BY id DESC";

        $stmt = $this->conn->prepare($query);
        $stmt->execute();

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    // UPDATE ORDER STATUS
    public function updateStatus($id, $status)
    {
        $query = "UPDATE orders
                  SET status = :status
                  WHERE id = :id";

        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(":id", $id);
        $stmt->bindParam(":status", $status);

        return $stmt->execute();
    }

    // DELETE ORDER
    public function delete($id)
    {
        $query = "DELETE FROM orders WHERE id = :id";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":id", $id);

        return $stmt->execute();
    }
}