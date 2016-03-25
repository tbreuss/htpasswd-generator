<template>
    <div class="container">
        <div class="pure-g">
            <div class="pure-u-1">
                <h2>HTTP-Authentifizierung auf NCSA-kompatiblen Webservern</h2>

                <h3>Die .htaccess-Datei</h3>
                <p>Die .htaccess-Datei (engl. hypertext access „Hypertext-Zugriff“) ist eine Konfigurationsdatei auf
                    NCSA-kompatiblen Webservern wie Apache, in der verzeichnisbezogene Regeln aufgestellt werden können.
                    Einzelne Verzeichnis oder Dateien können so durch HTTP-Authentifizierung vor unberechtigten
                    Zugriffen geschützt werden. Um einen Passwortschutz einzurichten, brauchst du die Anweisungen
                    AuthType, AuthName und AuthUserFile. Ein einfaches Beispiel sieht wie folgt aus:
                </p>
            <pre>AuthType Basic
AuthName "Titel des Passwortschutzes"
AuthUserFile /var/www/html/.htpasswd
Require valid-user</pre>

                <h4>AuthName</h4>
                <p>Der Name oder eine kurze Beschreibung des geschützten Web-Bereichs. Diese wird dem Anwender
                    angezeigt, bevor Benutzername und Passwort abgefragt werden. </p>

                <h4>AuthType</h4>
                <p>Mit AuthType wird die Art der Authentifizierung bezeichnet. Im einfachsten Fall ist <i>Basic</i> der
                    verwendete Authorisierungstyp (HTTP Basic Authentication). Der Basic Authorisierungstyp benutzt eine
                    zusätzliche Textdatei als Passwortdatei. Andere mögliche Authorisierungstypen sind zum Beispiel
                    PGP (Pretty Good Privacy) oder Kerberos (verteilter Authentifizierungsdienst). </p>

                <h4>AuthUserFile</h4>
                <p>Mit AuthUserFile wird die Datei angegeben, in der die Namen der autorisierten Benutzer und ihre
                    Passwörter stehen. Es sollte der vollständige absolute Pfadname angegeben werden. Das ist also nicht
                    der Pfad ab dem Wurzelverzeichnis deines Web-Projekts. Im Interesse der Sicherheit ist es sinnvoll,
                    die Datei mit den Namen der Benutzer und ihren Passwörtern ausserhalb des Web-Projekts auf dem
                    Server abzulegen.
                    <br><br>
                    Beispiele:<br>
                    AuthUserFile /home/projekte/www/htdocs/verein/intern/.htpasswd<br>
                    AuthUserFile /www/htdocs/verein/intern/.htpasswd</p>

                <h3>Die .htpasswd-Datei</h3>
                <p>Diese Datei enthält die Namen der autorisierten Benutzer und ihre Passwörter. Der Inhalt dieser Datei
                    kann beispielsweise mit dem Tool htpasswd oder mit einem Online-Generator erzeugt werden.
                    Zur Verschlüsselung der Passwörter stehen die Hashfunktionen MD5, bcrypt, crypt und SHA zur Auswahl.
                    Manchmal werden an das Passwort auch zufällige Zeichen angehängt, bevor der Hashwert berechnet wird
                    (auch Salt genannt, engl. für Salz). Dadurch können identischen Passwörtern unterschiedliche
                    Passwort-Hashwerte zugeordnet werden.<br>
                    <br>
                    Eine htpasswd-Datei sieht wie folgt aus:<br>
                </p>
            <pre>uwe:32/a7xZJFbDoo
otto:7dWdiLtedT8hA
maya:8rxILtw7x24B</pre>

            </div>
        </div>
    </div>
</template>

<style>
</style>

<script>
    export default{
        data(){
            document.title = "Infos // HTPASSWD-Generator";
            return {}
        }
    }
</script>