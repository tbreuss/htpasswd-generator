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

        // Open the file for reading
        $fp = fopen("data/counterlog.txt", "r");

        // Get the existing count
        $count = fread($fp, 1024);

        // Close the file
        fclose($fp);

        // Add 1 to the existing count
        $count = $count + 1;

        // Reopen the file and erase the contents
        $fp = fopen("data/counterlog.txt", "w");

        // Write the new count to the file
        fwrite($fp, $count);

        // Close the file
        fclose($fp);


        break;

    case 'counter':

        $fp = fopen("data/counterlog.txt", "r");
        $count = fread($fp, 1024);
        fclose($fp);

        echo json_encode(number_format($count, 0, '.', "'"));
        break;

    case 'news':

        $news = [
            ['title' => 'News Nummer 10', 'teaser' => 'Lorem Ipsum Dolor Sit Amet'],
            ['title' => 'News Nummer 11', 'teaser' => 'Lorem Ipsum Dolor Sit Amet'],
            ['title' => 'News Nummer 12', 'teaser' => 'Lorem Ipsum Dolor Sit Amet'],
            ['title' => 'News Nummer 13', 'teaser' => 'Lorem Ipsum Dolor Sit Amet'],
            ['title' => 'News Nummer 14', 'teaser' => 'Lorem Ipsum Dolor Sit Amet'],
            ['title' => 'News Nummer 15', 'teaser' => 'Lorem Ipsum Dolor Sit Amet'],
        ];

        echo json_encode(array_slice($news, 0, (int)$_GET['limit']));

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
