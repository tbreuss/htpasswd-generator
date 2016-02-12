Vue.config.debug = true;
//Vue.http.options.emulateHTTP = true;
//Vue.http.options.emulateJSON = true;

new Vue({
    el: '#app',
    data: {
        authName: '',
        authUserFile: '',
        logins: [{username: "", password: ""}],
        htaccess: '',
        htpasswd: '',
        filesCreated: false,
        errors: []
    },
    methods: {
        resetForm: function() {
            this.authName = '';
            this.authUserFile = '';
            this.logins = [{username: "", password: ""}];
            this.filesCreated = false;
            document.getElementById("authName").focus();
        },
        addLogin: function(){
            this.logins.push({username:"",password:""});
        },
        removeLogin: function(login){
            this.logins.$remove(login);
        },
        validateForm: function() {
            var errors = [];
            if (this.authName.trim() == "") {
                errors.push('Der Name des geschützten Bereichs ist leer');
            }
            if (this.authUserFile.trim() == "") {
                errors.push('Der Pfad zur Passwortdatei ist leer');
            }
            for (var i=0; i<this.logins.length; i++) {
                if (!this.logins[i].username.trim() || !this.logins[i].password.trim()) {
                    errors.push('Der Benutzername oder das Passwort in Zeile ' + (i+1) + ' ist leer');
                }
            }
            return errors;
        },
        createFiles: function() {

            this.errors = this.validateForm();
            if (this.errors.length > 0) {
                //console.log('validation error');
                this.filesCreated = false;
                return;
            }

            var data = {};
            data.authName = this.authName;
            data.authUserFile = this.authUserFile;
            data.logins = {};
            for (var i=0; i<this.logins.length; i++) {
                data.logins[i] = {username: this.logins[i].username, password: this.logins[i].password };
            }

            this.$http.post('api.php?q=create', data).then(function (response) {
                this.htaccess = response.data.htaccess;
                this.htpasswd = response.data.htpasswd;
                this.filesCreated = true;
            }, function (response) {
                alert('Konnte nicht mit Server verbinden.')
            });
        }
    },
    computed: {
    }
});
