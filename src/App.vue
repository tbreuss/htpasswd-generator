<template>
    <div id="app">
        <div class="header">
            <div class="container">
                <div class="pure-menu pure-menu-horizontal">
                    <router-link to="/" class="pure-menu-heading pure-menu-link">.htpw<span>gen</span></router-link>
                    <ul class="pure-menu-list">
                        <li class="pure-menu-item"><router-link to="/generator" class="pure-menu-link">Generator</router-link></li>
                        <li class="pure-menu-item"><router-link to="/infos" class="pure-menu-link">Infos</router-link></li>
                    </ul>
                </div>
            </div>
        </div>
        <router-view></router-view>
        <div class="footer">
            <div class="container">
                <div class="pure-g">
                    <div class="pure-u-1 pure-u-md-1-2 footer-about">
                        <h3>Über HTPWGEN</h3>
                        <p>Mit HTPWGEN kannst du dir die notwendigen Dateien für eine HTTP-Authentifizierung erstellen
                            lassen.
                            HTPWGEN ist aber in erster Linie eine Beispielapplikation für das Arbeiten mit den
                            Frameworks und
                            Werkzeugen Pure.css, Vue.js und Herbie CMS.</p>
                    </div>
                    <div class="pure-u-1 pure-u-md-1-4 footer-links">
                        <h3>Links</h3>
                        <ul>
                            <li><router-link to="/impressum">Impressum</router-link></li>
                            <li><a target="_blank" href="http://www.tebe.ch">Über den Autor</a></li>
                        </ul>
                    </div>
                    <div class="pure-u-1 pure-u-md-1-4">
                        <h3>Toolset</h3>
                        <ul>
                            <li><a target="_blank" href="http://purecss.io">Pure.css</a></li>
                            <li><a target="_blank" href="http://vuejs.org">Vue.js</a></li>
                            <li><a target="_blank" href="https://www.getherbie.org">Herbie CMS</a></li>
                        </ul>
                    </div>
                </div>
                <hr>
                <div class="pure-g">
                    <div class="pure-u-1 footer-copyright">
                        &copy; 2016 von Thomas Breuss
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    export default {
        data () {
            return {
                // note: changing this line won't causes changes
                // with hot-reload because the reloaded component
                // preserves its current state and we are modifying
                // its initial state.
                msg: 'Hello Vue!'
            }
        }
    }
</script>

<style>
    body {
        font-family: Helvetica, sans-serif;
    }
</style>
