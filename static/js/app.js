Vue.config.debug = true;
//Vue.http.options.emulateHTTP = true;
//Vue.http.options.emulateJSON = true;


// The generator component.
var generator = Vue.extend({
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
        hasErrors: function() {
            return this.errors.length > 0;
        }
    }
})

var Counter = Vue.extend({
    data: function () {
        return {
            'counter': 0
        }
    },
    template: '<h4>{{counter}} HTTP-Authentifizierungen</h4><p>Mit unserem Generator wurden schon an die {{ counter }} Konfigurationen für HTTP-Authentifizierungen generiert. Wow!</p>',
    ready: function() {
        this.$http.get('api.php?q=counter').then(function (response) {
            this.counter = 23432;
        }, function (response) {
            alert('Konnte nicht mit Server verbinden.')
        });
    }
})
Vue.component('counter', Counter);

var NewsTeaser = Vue.extend({
    data: function () {
        return {
            news: []
        }
    },
    template: '<template v-for="entry in news"><div class="pure-u-1 pure-u-md-1-2"><div class="l-box"><h4>{{ entry.title }}</h4><p>{{ entry.teaser }}</p></div></div>',
    ready: function() {
        this.$http.get('api.php?q=news&limit=3').then(function (response) {
            this.news = response.data;
            console.log(response.data);
        }, function (response) {
            alert('Konnte nicht mit Server verbinden.')
        });
    }
})
Vue.component('news-teaser', NewsTeaser);

// Create a router instance.
var router = new VueRouter()

// Define some routes.
router.map({
    '/generator': {
        component: generator
    },
    '/impressum': {
        component: {
            template: '#impressum',
            data: function() {
                document.title = "Impressum // HTPASSWD-Generator";
            }
        }
    },
    '/infos': {
        component: {
            template: '#infos',
            data: function() {
                document.title = "Infos // HTPASSWD-Generator";
            }
        }
    },
    '/': {
        component: {
            template: '#home',
            data: function() {
                document.title = "HTPASSWD-Generator";
            }
        }
    },
    '*': {
        component: {
            template: '#fehler',
            data: function() {
                document.title = "Seite nicht gefunden // HTPASSWD-Generator";
            }
        }
    }
})

// The router needs a root component to render.
var app = Vue.extend({})

// Now we can start the app!
router.start(app, '#app')
