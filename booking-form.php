<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name     = htmlspecialchars(trim($_POST["name"]));
    $email    = htmlspecialchars(trim($_POST["email"]));
    $service  = htmlspecialchars(trim($_POST["service"]));
    $date     = htmlspecialchars(trim($_POST["date"]));
    $message  = htmlspecialchars(trim($_POST["message"]));

    $to      = "arnold.pettersson@gmail.com";
    $subject = "New Service Booking Request";
    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    $body = "Name: $name\n";
    $body .= "Email: $email\n";
    $body .= "Service: $service\n";
    $body .= "Preferred Date: $date\n";
    $body .= "Message:\n$message\n";

    mail($to, $subject, $body, $headers);
    header("Location: booking.html");
    exit();
}
?>
