<?php

$data = json_decode(file_get_contents('php://input'), true);
$type = $_GET['q'];

switch($type) {

    case 'create':

        $htaccess = sprintf(
            "AuthType Basic\nAuthName \"%s\"\nAuthUserFile \"%s\"\nRequire valid-user",
            $data['authName'],
            $data['authUserFile']
        );
        $htpasswd = '';

        foreach ($data['logins'] as $key => $login) {
            $htpasswd .= sprintf(
                "%s:%s\n",
                $login['username'],
                crypt($login['passwort'])
            );
        }

        echo json_encode([
            'htaccess' => $htaccess,
            'htpasswd' => $htpasswd
        ]);

        break;

    case 'download':

          $file = 'test.zip';
          #header('Content-Description: File Transfer');
          header('Content-Type: application/octet-stream');
          #header('Content-Disposition: attachment; filename="'.basename($file).'"');
          #header('Expires: 0');
          #header('Cache-Control: must-revalidate');
          #header('Pragma: public');
          #header('Content-Length: ' . filesize($file));
          #echo 'data:application/octet-stream;base64,';
          echo base64_encode(file_get_contents($file));
          exit;

        break;

    default:

        header("HTTP/1.0 404 Not Found");
        break;

}
