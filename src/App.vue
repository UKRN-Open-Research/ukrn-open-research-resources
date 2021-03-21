<template>
  <div id="app">
    <div v-if="!$store.state.items.length" class="retry">
      No items found.
      <b-button icon-left="retry" label="Retry"/>
    </div>
    <div v-else class="items">
        <div class="filters">
          <header><h1>Filters</h1></header>
          <FieldFilter field="Resource_Name" type="input"/>
          <FieldFilter field="Discipline" type="checkbox"/>
          <FieldFilter field="Subdiscipline" type="tag"/>
          <FieldFilter field="Topics" type="checkbox"/>
          <FieldFilter field="Subtopics" type="tag"/>
          <FieldFilter field="Resource_Type" type="checkbox"/>
          <FieldFilter field="Resource_Provider" type="tag"/>
          <FieldFilter field="Description" type="input"/>
        </div>
      <div class="results">
        <header><h1>Resources</h1></header>
        <Resource v-for="r in filteredResources"
                  :key="r.Resource_Reference"
                  :resource="r"
        />
      </div>
    </div>
    <b-loading :active="$store.state.items_loading"/>
  </div>
</template>

<script>
import store from './store.js'
import Resource from './components/Resource.vue'
import FieldFilter
  from "@/components/FieldFilter";

export default {
  name: 'App',
  components: {
    FieldFilter,
    Resource
  },
  computed: {
    filteredResources() {
      return this.$store.state.items.filter(i => {
        let okay = true;
        this.$store.state.filters.forEach(f => {
          if(typeof i[f.field] === 'string') {
            // We check strings directly
            if(typeof f.value === 'string') {
              if(!match(i[f.field], f.value))
                okay = false;
            } else {
              // Is string in array of options
              if(f.value.filter(v => match(i[f.field], v)).length === 0)
                okay = false;
            }
          } else {
            if(typeof f.value === "string") {
              // Checking array vs string value - look for string in array
              if(i[f.field].filter(x => match(x, f.value)).length === 0)
                okay = false;
            } else {
              // Checking array vs array - look for any intersection
              let allBad = true;
              f.value.forEach(v => {
                if(i[f.field].filter(x => match(x, v)).length > 0)
                  allBad = false;
              });
              if(allBad)
                okay = false;
            }
          }
        });
        return okay;
      })
    }
  },
  mounted: function() {
    this.$store.dispatch('findItems');
  },
  store: store
}

/**
 * Return whether string b is in string a
 * @param a {string}
 * @param b {string}
 * @return {boolean}
 */
function match(a, b) {
  return a.toLowerCase().indexOf(b.toLowerCase()) !== -1
}
</script>

<style lang="scss">
#app {
  margin-top: 1em;
}
.items {
  margin: 0 .5em;
  display: grid;
  grid-template-columns: 1fr 4fr;
  grid-column-gap: 1em;
  .filters {
    font-size: .8em;
    .autocomplete.control {
      width: 100%;
    }
  }
  .results {
    grid-column: 2;
    div {
      margin: .5em auto;
    }
  }
  .taginput-container {
    display: flex;
    flex-direction: column;
  }
}
</style>
