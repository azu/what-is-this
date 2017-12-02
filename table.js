// MIT © 2017 azu
"use strict";

// util
window.isStrictMode = () => {
};
window.isModule = () => {
    const a = 1;
    try {
        a = 2;
    } catch (e) {
        return true;
    }
    return false;
};

// results

const results = [];

window.addResult = ({
                        type,
                        isStrict,
                        name,
                        thisValue
                    }) => {
    results.push({
        type,
        isStrict,
        name,
        thisValue: String(thisValue)
    });
};


window.output = () => {
    // register the grid component
    Vue.component('this-output', {
        template: '#grid-template',
        props: {
            data: Array,
            columns: Array,
            filterKey: String
        },
        data: function() {
            var sortOrders = {}
            this.columns.forEach(function(key) {
                sortOrders[key] = 1
            })
            return {
                sortKey: '',
                sortOrders: sortOrders
            }
        },
        computed: {
            filteredData: function() {
                var sortKey = this.sortKey;
                var filterKey = this.filterKey && this.filterKey.toLowerCase();
                var order = this.sortOrders[sortKey] || 1;
                var data = this.data;
                if (filterKey) {
                    data = data.filter(function(row) {
                        return Object.keys(row).some(function(key) {
                            return String(row[key]).toLowerCase().indexOf(filterKey) > -1
                        })
                    })
                }
                if (sortKey) {
                    data = data.slice().sort(function(a, b) {
                        a = a[sortKey];
                        b = b[sortKey];
                        return (a === b ? 0 : a > b ? 1 : -1) * order
                    })
                }
                return data
            }
        },
        filters: {
            capitalize: function(str) {
                return str.charAt(0).toUpperCase() + str.slice(1)
            }
        },
        methods: {
            sortBy: function(key) {
                this.sortKey = key;
                this.sortOrders[key] = this.sortOrders[key] * -1
            }
        }
    });
    // bootstrap the demo
    const output = new Vue({
        el: '#js-output',
        data: {
            searchQuery: '',
            gridColumns: [
                "type",
                "isStrict",
                "name",
                "thisValue"
            ],
            gridData: results
        }
    })
};
