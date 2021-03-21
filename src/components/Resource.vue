<template>
  <section>
    <b-collapse
            class="resource card"
            :open="false"
            animation="slide"
            aria-id="contentIdForA11y1"
    >
      <template #trigger="props">
        <header class="card-header has-background-light">
          <h1 class="card-header-title">
            <span class="provider">{{ resource.Resource_Provider }} - </span>
            <strong>{{ resource.Resource_Name }}</strong>
            <a class="card-header-icon"
               :href="resource.Resource_Reference"
               target="_blank"
            >
              <b-icon icon="open-in-new"/>
            </a>
          </h1>
          <a class="card-header-icon">
            <b-icon :icon="props.open ? 'menu-up' : 'menu-down'"/>
          </a>
        </header>
      </template>

      <div class="card-content body">
        <h2>Description</h2>
        <p>{{ resource.Description }}</p>
        <div class="tags info"
             v-for="X in ['Resource_Type', 'Topics', 'Subtopics', 'Discipline', 'Subdiscipline']"
             :key="X"
        >
          <div v-if="resource[X].length">
            <h2>{{ X }}</h2>
            <b-button
                    v-for="x in resource[X]"
                    :key="`${X}_${x}`"
                    :inverted="$store.state.filters.filter(f => f.field === X && f.value.includes(x)).length > 0"
                    @click="$store.commit('toggleFilterTag', {field: X, value: x})"
                    size="is-small"
                    type="is-light"
            >{{ x }}</b-button>
          </div>
        </div>
        <div class="links info"
             v-for="X in ['External_Links', 'Workshop_Lessons']"
             :key="X"
        >
          <div v-if="resource[X].length">
            <h2>{{ X }}</h2>
            <ul>
              <li v-for="x in resource[X]"
                 :key="`${X}_${x}`"
              >
                <a :href="x" target="_blank">{{ x }}</a>
              </li>
            </ul>
          </div>
        </div>
        <div class="links internal info" v-if="resource['Internal_Links'].length">
          <h2>See also:</h2>
          <ul>
            <li v-for="x in resource['Internal_Links']"
                  :key="x"
            >
              {{ $store.state.items.filter(i => i.Id === x)[0].Resource_Name }}
            </li>
          </ul>
        </div>
      </div>
      <footer class="card-footer">
        Last updated {{ resource.Accessed_Date }}
      </footer>
    </b-collapse>

  </section>
</template>

<script>
export default {
  name: 'Resource',
  props: {
    resource: {type: Object, required: true}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .provider {
    font-weight: normal;
    margin-right: .25em;
  }
  .body {
    display: flex;
    flex-wrap: wrap;
    h2, p {width: 100%;}
    .info {
      display: flex;
      flex-wrap: wrap;
      max-width: 50%;
    }
  }
  button {
    margin: .1em;
  }
</style>
