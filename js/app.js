Vue.config.debug = true;
//Vue.http.options.emulateHTTP = true;
//Vue.http.options.emulateJSON = true;


// The generator component.
var generator = Vue.extend({
    template: '#generator',
    data: function () {
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

            var data = {
              authName: this.authName,
              authUserFile: this.authUserFile,
              logins: {}
            };
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
        },
        downloadFiles: function() {
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
    }
})

// Create a router instance.
var router = new VueRouter()

// Define some routes.
router.map({
    '/generator': {
        component: generator,
        title: 'Generator',
        class: 'default'
    },
    '/impressum': {
        component: {
            template: '#impressum'
        },
        title: 'Impressum',
        class: 'default'
    },
    '/infos': {
        component: {
            template: '#infos'
        },
        title: 'Infos',
        class: 'default'
    },
    '/': {
        component: {
            template: '#home'
        },
        title: 'Home',
        class: 'home'
    },
    '*': {
        component: {
            template: '#fehler'
        },
        title: 'Fehler - Seite nicht gefunden',
        class: 'default'
    }
})

// The router needs a root component to render.
var app = Vue.extend({})

// Now we can start the app!
router.start(app, '#app')
