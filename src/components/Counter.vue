<template>
    <h4>{{counter}} HTTP-Authentifizierungen</h4>
    <p>Mit unserem HTPASSWD-Generator wurden schon an die {{ counter }} Konfigurationen für eine einfache HTTP-Authentifizierungen erstellt.</p>
</template>

<style>
</style>

<script>
    export default {
        data () {
            return {
                counter: 0
            }
        },
        ready () {
            this.$http.get('api.php?q=counter').then(function (response) {
                this.counter = response.data;
            }, function (response) {
                alert('Konnte nicht mit Server verbinden.')
            });
        }
    }
</script>