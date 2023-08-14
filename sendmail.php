<?php
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;

    require 'PHPMailer/src/Exception.php';
    require 'PHPMailer/src/PHPMailer.php';

    $mail = new PHPMailer(true);
    $mail->CharSet = 'UTF-8';
    $mail->setLanguage('ru', 'PHPMailer/language/');
    $mail->IsHtml(true);

    //От кого письмо
    $mail->setFrom('', '');
    //Кому отправить
    $mail->addAdress('pwpec95@gmail.com');
    //Тема письма
    $mail->Subject = 'Привет';

    //Тело письма
    $body = '<h1>Ежжи</h1>';

    if(trim(!empty($_POST['name']))){
        $body.='<p><strong>Имя:</strong> ' .$_POST['name'].'</p>';
    }
    if(trim(!empty($_POST['name']))){
        $body.='<p><strong>E-mail:</strong> ' .$_POST['email'].'</p>';
    }
    if(trim(!empty($_POST['name']))){
        $body.='<p><strong>Собщение:</strong> ' .$_POST['message'].'</p>';
    }

    $mail->Body = $body;

    //Отправление
    if (!$mail->send()) {
        $message = 'Ошибка';
    } else {
        $message = 'Данные отправлены!';
    }

    $response = ['message' => $message];

    header('Content-type: application/json');
    echo json_encode($response);
?>
    