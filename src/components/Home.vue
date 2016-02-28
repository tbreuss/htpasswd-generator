<template>
    <div class="slider">
        <div class="container">
            <div class="pure-g">
                <div class="pure-u-1">
                    <h2 class="brand-tagline">HTPASSWD-GENERATOR</h2>
                    <p>Erstelle mit einem .htaccess Zugriffschutz schnell und einfach einen passwortgeschützten
                        Bereich. Gib den Namen, das Verzeichnis und die Logindaten ein, lade die generierten Dateien
                        herunter und kopiere sie in das Verzeichnis deines Webservers. Fertig!</p>
                    <p style="margin-top:2em"><a href="#generator" class="pure-button pure-button-primary button-large">
                        Zum HTPASSWD-Generator</a></p>
                </div>
            </div>
        </div>
    </div>
    <div class="container">
        <div class="pure-g">
            <div class="pure-u-1 pure-u-md-1-2">
                <div class="l-box">
                    <counter></counter>
                </div>
            </div>
            <news-teaser></news-teaser>

            <!-- div class="pure-u-1 pure-u-md-1-2">
                <div class="l-box">
                    <h4>Get Started Quickly</h4>
                    <p>Phasellus eget enim eu lectus faucibus vestibulum. Suspendisse sodales pellentesque elementum.</p>
                </div>
            </div>
            <div class="pure-u-1 pure-u-md-1-2">
                <div class="l-box">
                    <h4>Get Started Quickly</h4>
                    <p>Phasellus eget enim eu lectus faucibus vestibulum. Suspendisse sodales pellentesque elementum.</p>
                </div>
            </div>
            <div class="pure-u-1 pure-u-md-1-2">
                <div class="l-box">
                    <h4>Get Started Quickly</h4>
                    <p>Phasellus eget enim eu lectus faucibus vestibulum. Suspendisse sodales pellentesque elementum.</p>
                </div>
            </div -->

        </div>
    </div>
    <!-- div class="container">
        <div class="pure-g">
            <div class="pure-u-1 pure-u-md-1-4"></div>
            <div class="pure-u-1 pure-u-md-1-4"></div>
            <div class="pure-u-1 pure-u-md-1-4"></div>
            <div class="pure-u-1 pure-u-md-1-4"></div>
        </div>
    </div -->
</template>

<style>
</style>

<script>
    export default{
        data(){
            document.title = "HTPASSWD-Generator";
            return{
            }
        },
        components:{
        }
    }
</script>