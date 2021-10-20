<template>
  <section>
    <b-collapse
            class="resource card has-background-light"
            :open="false"
            animation="slide"
            aria-id="contentIdForA11y1"
    >
      <template #trigger="props">
        <header class="card-header">
          <div class="text">
            <h1 class="card-header-title">
              <span class="provider has-text-grey-light">{{ resource.Resource_Provider }}</span>
              <strong>{{ resource.Resource_Name }}</strong>
              <a class="card-header-icon"
                 :href="resource.Resource_Reference"
                 target="_blank"
              >
                <b-icon icon="open-in-new"/>
              </a>
            </h1>
            <p v-if="resource.Description !== ''">{{ resource.Description }}</p>
          </div>
          <a class="card-header-icon">
            <b-icon :icon="props.open ? 'menu-up' : 'menu-down'"/>
          </a>
        </header>
      </template>

      <div class="card-content body has-background-white">
        <div class="tags info"
             v-for="X in ['Resource_Category', 'Resource_Format', 'Topics', 'Subtopics', 'Discipline', 'Subdiscipline']"
             :key="X"
        >
          <div v-if="resource[X].length">
            <h2>{{ X.replace(/_/g, ' ') }}</h2>
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
            <h2>{{ X.replace(/_/g, ' ') }}</h2>
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
              <span class="provider has-text-grey-light">
                {{ $store.state.items.filter(i => i.Id === x)[0].Resource_Provider }}
              </span>
              {{ $store.state.items.filter(i => i.Id === x)[0].Resource_Name }}
            </li>
          </ul>
        </div>
      </div>
      <footer class="card-footer">
        Last updated {{ resource.Last_Updated_Date }}
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
  section {
    margin-bottom: 1.5em;
  }
  .provider {
    font-weight: normal;
    margin-right: 1em;
  }
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: .5em;
    .card-header-title {
      padding: 0;
    }
    p {margin-bottom: .5em;}
  }
  .body {
    display: block;
    padding: .5em;
    h2 {
      display: inline-block;
      margin: 1em;
      font-weight: bold;
    }
    .info {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: flex-start;
      margin: 0
    }
    ul {
      width: 100%;
    }
  }
  .card-footer {
    padding: .5em 1em 0 0;
    justify-content: flex-end;
  }
  button {
    margin: .1em;
  }
</style>
