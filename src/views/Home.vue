<template>
    <div class="container">
        <header>
            <h3>{{ $t('title') }}</h3>
            <hr>
        </header>
    </div>
</template>

<script>
export default {
    name: 'Home',
    data(){
        this.$i18n.locale = 'en';
        return{ 
            local: 'en'
        }
    }
}

</script>

<i18n>
{
    "en": {
        "title": "Welcome"
    }, 
    "fr": {
        "title": "Bienvenue sur le blog de Manon et Matthias"
    },
    "nl": {
        "title": "Welkom op de blog van Manon en Matthias"
    }
}
</i18n>

