<template>  
  <div>
    <h3>{{ ressource.meta.label }}</h3>
    <label class="form__group">Type d'activité
      <select v-model="ressource.extra.tns_autres_revenus_type_activite">
        <option value="achat_revente">Achat/revente ou fourniture de logement</option>
        <option value="bic">Autre activité relevant des BIC</option>
        <option value="bnc">Activité libérale et/ou intellectuelle (BNC)</option>
      </select>
    </label>

    <label class="form__group">Bénéfice sur le dernier exercice clos
      <input
        type="number" v-select-on-click
        v-model="ressource.amounts[$store.state.dates.lastYear.id]">
    </label>
  </div>
</template>

<script>

export default {
  name: 'RessourceProfessionLiberale',
  props: {
    ressource: Object,
  },
}
</script>

<style scoped lang="css">
</style>
