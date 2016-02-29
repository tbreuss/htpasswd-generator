<template>
    <div class="container">
        <div class="pure-g">
            <div class="pure-u-1">

                <div class="pure-form pure-form-stacked">

                    <h2>HTPASSWD-Generator</h2>

                    <fieldset>
                        <legend>1. Gib den Namen des geschützten Bereichs und den Pfad zur Passwortdatei ein.</legend>
                        <div class="pure-g">
                            <div class="pure-u-1">
                                <label for="authName">Name des geschützten Bereichs</label>
                                <input v-bind="" class="pure-u-1 pure-u-md-2-3" id="authName" v-model="authName"
                                       placeholder="Mein geschützter Bereich" lazy>
                            </div>
                            <div class="pure-u-1">
                                <label for="authUserFile">Pfad zur Passwortdatei</label>
                                <input class="pure-u-1 pure-u-md-2-3" id="authUserFile" v-model="authUserFile"
                                       placeholder="/htdocs/.htpasswd" lazy>
                            </div>
                        </div>
                    </fieldset>

                    <fieldset>
                        <legend>2. Gib die gewünschten Logindaten ein. Du kannst mehrere Benutzernamen und Passwörter
                            erfassen.
                        </legend>
                        <div class="pure-g" v-for="(index, login) in logins">
                            <div class="pure-u-1 pure-u-md-1-3">
                                <label v-if="index < 1" for="username-{{index}}">Benutzername</label>
                            </div>
                            <div class="pure-u-1 pure-u-md-1-3">
                                <label v-if="index < 1" for="password-{{index}}">Passwort</label>
                            </div>
                            <div class="pure-u-1 pure-u-md-1-3">
                            </div>
                            <div class="pure-u-1 pure-u-md-1-3">
                                <input class="pure-u-1" id="username-{{index}}" type="text" v-model="login.username"
                                       placeholder="Hans">
                            </div>
                            <div class="pure-u-1 pure-u-md-1-3">
                                <input class="pure-u-1" id="password-{{index}}" type="text" v-model="login.password"
                                       placeholder="*****">
                            </div>
                            <div class="pure-u-1 pure-u-md-1-3 buttons">
                                <button class="pure-button button-small" @click="addLogin">hinzufügen</button>
                                <button class="pure-button button-small" v-if="index > 0" @click="removeLogin(login)">
                                    entfernen
                                </button>
                            </div>
                        </div>
                    </fieldset>

                </div>

                <div v-if="hasErrors" class="errors">
                    <p>Das Formular konnte nicht abgesendet werden:</p>
                    <ul>
                        <li v-for="error in errors">{{ error }}</li>
                    </ul>
                </div>

                <div>
                    <button class="pure-button pure-button-primary button-large" @click="createFiles">Dateien erstellen
                    </button>
                </div>

                <div v-if="filesCreated">

                    <h2>Ausgabe</h2>

                    <h4>.htaccess</h4>
                    <pre>{{ htaccess }}</pre>

                    <h4>.htpasswd</h4>
                    <pre>{{ htpasswd }}</pre>

                    <button class="pure-button pure-button-primary button-large" @click="resetForm">Formular
                        zurücksetzen
                    </button>

                </div>

            </div>

        </div>
    </div>
</template>

<style>
</style>

<script>

    // The generator component.
    export default{
        template: '#generator',
        data: function () {
            document.title = "Generator // HTPASSWD-Generator";
            return {
                authName: '',
                authUserFile: '',
                logins: [{username: "", password: ""}],
                htaccess: '',
                htpasswd: '',
                filesCreated: false,
                errors: []
            }
        },
        methods: {
            resetForm: function () {
                this.authName = '';
                this.authUserFile = '';
                this.logins = [{username: "", password: ""}];
                this.filesCreated = false;
                document.getElementById("authName").focus();
            },
            addLogin: function () {
                this.logins.push({username: "", password: ""});
            },
            removeLogin: function (login) {
                this.logins.$remove(login);
            },
            validateForm: function () {
                var errors = [];
                if (this.authName.trim() == "") {
                    errors.push('Der Name des geschützten Bereichs ist leer');
                }
                if (this.authUserFile.trim() == "") {
                    errors.push('Der Pfad zur Passwortdatei ist leer');
                }
                for (var i = 0; i < this.logins.length; i++) {
                    if (!this.logins[i].username.trim() || !this.logins[i].password.trim()) {
                        errors.push('Der Benutzername oder das Passwort in Zeile ' + (i + 1) + ' ist leer');
                    }
                }
                return errors;
            },
            createFiles: function () {

                this.errors = this.validateForm();
                if (this.errors.length > 0) {
                    //console.log('validation error');
                    this.filesCreated = false;
                    return;
                }

                var data = {
                    authName: this.authName,
                    authUserFile: this.authUserFile,
                    logins: {}
                };
                for (var i = 0; i < this.logins.length; i++) {
                    data.logins[i] = {username: this.logins[i].username, password: this.logins[i].password};
                }

                this.$http.post('api.php?q=create', data).then(function (response) {
                    this.htaccess = response.data.htaccess;
                    this.htpasswd = response.data.htpasswd;
                    this.filesCreated = true;
                }, function (response) {
                    alert('Konnte nicht mit Server verbinden.')
                });
            },
            downloadFiles: function () {
                var data = {};
                this.$http.get('api.php?q=download', data).then(function (response) {
                    // see: http://www.fizerkhan.com/blog/posts/Download-a-file-without-server-request.html
                    var dataURL = 'data:application/octet-stream;base64,' + encodeURIComponent(response.data);
                    window.location = dataURL;
                }, function (response) {
                    alert('Konnte nicht mit Server verbinden.')
                });
            }
        },
        computed: {
            hasErrors: function () {
                return this.errors.length > 0;
            }
        }
    }

</script>