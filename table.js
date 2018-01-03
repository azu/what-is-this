// MIT © 2017 azu
"use strict";
/**
 *
 * @param {{
        type:string,
        isStrict:boolean,
        code:string,
        thisValue: *
 * }[]} results
 */
window.outputResults = (results) => {
    // register the grid component
    Vue.component('this-output', {
        template: '#grid-template',
        props: {
            data: Array,
            columns: Array,
            filterKey: String
        },
        data: function() {
            var sortOrders = {};
            this.columns.forEach(function(key) {
                sortOrders[key] = 1
            });
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
    new Vue({
        el: '#js-output',
        data: {
            searchQuery: '',
            gridColumns: [
                "type",
                "isStrict",
                "code",
                "thisValue"
            ],
            gridData: results
        }
    })
};

// main
// type=module is executed after Script
// buf, before script defer
// see https://jakearchibald.com/2017/es-modules-in-browsers/
(function() {
    function stripIndent(str) {
        const re = new RegExp(`^[ \\t]{${2}}`, 'gm');
        return str.replace(re, '');
    }

    function stripEmptyLine(str) {
        return str.replace(/(^[ \t]*\n)/gm, '');
    }

    function replaceConsoleLog(str) {
        return str.replace("window.logThis", "console.log");
    }

    var scriptList = Array.prototype.slice.call(document.querySelectorAll("[data-this]"));
    var results = thisValueLogList.map(function(thisValue, index) {
        var script = scriptList[index];
        var code = replaceConsoleLog(stripEmptyLine(stripIndent(script.textContent)));
        var type = script.getAttribute("type") === "module" ? "Module" : "Script";
        var isStrict = type === "Module" ? true : code.indexOf(`"use strict";`) !== -1;
        return {
            type: type,
            isStrict: isStrict,
            code: code,
            thisValue: thisValue
        }
    });
    window.outputResults(results);
    Prism.highlightAll();
})();
