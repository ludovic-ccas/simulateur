<template>
  <div>
    <header class="navbar" role="navigation">
      <div class="navbar__container">
        <nav>
          <router-link to="/" class="navbar__home" id="logo">
            <img class="navbar__logo" src="./../../public/img/logo.svg" alt="Logo de Mes-Aides.org" />
          </router-link>
        </nav>

        <div class="navbar__home">
            <Modal analyticsCategory="Blocage">
              <template v-slot:message>Je suis bloqué·e…</template>
              <h1>Veuillez nous excuser…</h1>
              <p>Le simulateur Mes Aides est un service en constante évolution.<p>
              <p>Si vous êtes bloqué·e, c'est que nous avons encore du travail à faire.</p>
              <p>Aidez-nous en nous indiquant <a
                v-analytics="{ action: 'Envoi d\'email', category:'Blocage'}"
                v-mail="{to: 'equipe@mes-aides.org', subject:'Bloqué·e sur le simulateur', body:`Bonjour,

En utilisant le simulateur Mes Aides, je me suis retrouvé·e bloqué·e en faisant XXX.

Voici le lien affiché en haut de https://www.whatsmybrowser.org : XXXX.

Vous pouvez me joindre par téléphone au XX XX XX XX XX (de préférence en semaine) pour une dizaine de minutes d'échange afin de comprendre l'origine de mon blocage.

En pièce jointe une capture d'écran pour vous permettre de vous aider à comprendre l'origine du blocage. 

Merci et bonne journée,

————
Page : ${$route.fullPath}
————`}">par email</a>&nbsp;:
              </p>
              <ul>
                <li><strong>comment</strong> vous vous êtes retrouvé·e bloqué·e&nbsp;;</li>
                <li>le <strong>lien affiché</strong> en haut de <a target="_blank" rel="noopener" href="https://www.whatsmybrowser.org/">la page suivante</a> qui nous permet d'en savoir plus sur votre ordinateur&nbsp;;</li>
                <li>une capture d'écran si cela vous paraît pertinent et</li>
                <li>un <strong>numéro de téléphone</strong> auquel nous pouvons vous joindre pour mieux comprendre l'origine de votre blocage.</li>
              </ul>
              <p>Nous essaierons de vous débloquer et d'éviter que d'autres personnes se retrouvent bloquées comme vous.<p>

              <p>
                Merci,<br/>
                L'équipe Mes Aides
              </p>
            </Modal>
        </div>
      </div>
    </header>

    <slot></slot>

    <footer class="footer">
      <nav class="container">
        <ul>
          <li><span class="fa fa-fw fa-life-ring" aria-hidden="true"></span>&nbsp;<router-link to="/sos">SOS</router-link></li>
          <li><span class="fa fa-fw fa-star" aria-hidden="true"></span>&nbsp;<router-link to="/liens-utiles">Liens utiles</router-link></li>
          <li><span class="fa fa-fw fa-question-circle" aria-hidden="true"></span>&nbsp;<router-link to="/a-propos">À propos</router-link></li>
        </ul>
        <ul>
          <li><span class="fa fa-fw fa-eur" aria-hidden="true"></span>&nbsp;<router-link to="/financement">Financement</router-link></li>
          <li><span class="fa fa-fw fa-pencil" aria-hidden="true"></span>&nbsp;<router-link to="/ameliorer">Contribuez</router-link></li>
          <li><span class="fa fa-fw fa-paperclip" aria-hidden="true"></span>&nbsp;<router-link to="/cgu">Conditions d'utilisation</router-link></li>
        </ul>
        <ul>
          <li><span class="fa fa-fw fa-thumbs-up" aria-hidden="true"></span>&nbsp;<router-link to="/social">Réseaux sociaux</router-link></li>
          <li><span class="fa fa-fw fa-envelope" aria-hidden="true"></span>&nbsp;<router-link to="/contact">Contact</router-link></li>
          <li><span class="fa fa-fw fa-newspaper-o" aria-hidden="true"></span>&nbsp;<a target="_blank" rel="noopener" href="https://c8282fe1.sibforms.com/serve/MUIEALeK4cr3WdAp5x5mopAKSViUl_8HOgRWycyFqxzf2U2EwnfJS8GJ2ragsE3WagiU-OmKq_HhRamKpgndNUMN6wnrNKxk-wpY19N5N90_j6_hWPTjJ4XRa0djFNUrsWcCAWJQWR1fQgZRVqfinNCIqcGYRZsedqB9iaqWecSDEdP_dZN0PITSsB78r7SJkWvuSsWDc8nEj9eI">Abonnez-vous à nos informations</a></li>
        </ul>
      </nav>
    </footer>
  </div>
</template>

<script>
import Modal from '@/components/Modal'

export default {
  name: 'BaseLayout',
  components: {
    Modal
  }
}
</script>

<style scoped lang="scss">
.navbar__container {
  padding: 0.2em;
  flex-wrap: nowrap;
  -ms-flex-direction: row;
  flex-direction: row;
}

@media (max-width: 600px) {
  .navbar__home span {
    font-size: 12px;
  }
}

@media (max-width: 450px) {
  .navbar__home {
    height: 20px;
  }
}

#logo:hover, #logo:focus {
    opacity: 1;
    background-color: unset;
}

footer, footer a {
  background-color: white;
  color: black;
  text-decoration: none;
}
</style>
