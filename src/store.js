import Vue
    from "vue";
import Vuex
    from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        filters: [],
        items: [],
        items_loading: false
    },
    mutations: {
        addFilter(state, value) {
            if(!value.field)
                throw new Error(`Filter requires a name.`);
            console.log(value)
            state.filters = [...state.filters.filter(f => f.field !== value.field)];
            if(value.value.length)
                state.filters = [
                    ...state.filters, {field: value.field, value: value.value}
                ]
        },
        addItem(state, value) {
            state.items.push(value);
        },
        removeItems(state) {state.items = [];},
        setItemsLoading(state, value) {state.items_loading = value;}
    },
    getters: {
        uniqueFieldValues: state => field => {
            const out = [];
            state.items.forEach(I => {
                if(I[field] === null || !I[field].length)
                    return;
                if(typeof I[field] === 'string') {
                    if (!out.includes(I[field]))
                        out.push(I[field]);
                }
                else {
                    I[field].forEach(v => {
                        if(v !== '' && !out.includes(v))
                            out.push(v);
                    })
                }
            });
            return out;
        }
    },
    actions: {
        async findItems(context) {
            if(context.state.items_loading)
                return;
            context.commit('setItemsLoading', true);
            try {
                const response = await fetch('/.netlify/functions/sheets');
                const json = await response.json();
                context.commit('removeItems');
                json.forEach(item => {
                    if(item.Resource_Reference)
                        context.commit('addItem', fixCSV(item))
                });
                console.log({Sheets: context.state.items})
            } catch(e) {
                console.error(e);
            }
            context.commit('setItemsLoading', false);
        }
    }
});

function fixCSV(item) {
    const out = {...item};
    for(let k of Object.keys(item)) {
        if(Object.prototype.hasOwnProperty.call(item, k)) {
            const match = /^(.+?)_csv$/.exec(k);
            if(match) {
                delete out[k];
                out[match[1]] = item[k].split(/, */).filter(x => x !== '');
            }
        }
    }
    return out;
}

export default store;