<?php

$data = json_decode(file_get_contents('php://input'), true);
$type = $_GET['q'];

switch($type) {

    case 'create':

        $htaccess = sprintf(
            "AuthType Basic\nAuthName \"%s\"\nAuthUserFile \"%s\"",
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
        break;

    default:
        header("HTTP/1.0 404 Not Found");
        break;

}
