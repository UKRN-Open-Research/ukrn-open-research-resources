<template>
  <b-field :label="field.replace(/_/g, ' ')">
    <b-input
      v-if="type === 'input'"
      v-model="value"
    />
    <div v-else-if="type === 'checkbox'" class="checkboxes">
      <b-checkbox v-for="v in $store.getters.uniqueFieldValues(field)"
                  :key="v"
                  :value="value"
                  @input="e => checkOrUncheck(v, e)"
                  :native-value="v">
        {{ v }}
      </b-checkbox>
    </div>
    <b-taginput
            v-else-if="type === 'tag'"
            v-model="value"
            :data="filteredTags"
            autocomplete
            ellipsis
            :allow-new="false"
            :open-on-focus="true"
            icon="label"
            placeholder="Add option"
            @typing="getFilteredTags">
    </b-taginput>
  </b-field>
</template>

<script>
export default {
  name: 'FieldFilter',
  props: {
    field: {type: String, required: true},
    type: {type: String, required: true}
  },
  data: function() {
    return {
      selected: null,
      filteredTags: []
    }
  },
  computed: {
    value: {
      get: function () {
        const fallback = ['checkbox', 'tag'].includes(this.type)? [] : "";
        try {
          const store = this.$store.state.filters.filter(f => f.field === this.field);
          return store.length? store[0].value : fallback;
        }
        catch (e) {return fallback}
      },
      set: function(value) {
        this.$store.commit('addFilter', {field: this.field, value})
      }
    }
  },
  methods: {
    getFilteredTags(x) {
      this.filteredTags = this.$store.getters.uniqueFieldValues(this.field)
              .filter(t => t.toLowerCase().indexOf(x.toLowerCase()) !== -1)
    },
    checkOrUncheck(v, e) {
      const addValue = e.includes(v);
      if(addValue && !this.value.includes(v))
        this.value = [...this.value, v];
      else if(!addValue)
        this.value = this.value.filter(x => x !== v);
    }
  },
  mounted() {
    this.filteredTags = this.$store.getters.uniqueFieldValues(this.field);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .checkboxes {
    display: flex;
    flex-direction: column;
    & > * {
      margin: .1em 0;
    }
  }
</style>
