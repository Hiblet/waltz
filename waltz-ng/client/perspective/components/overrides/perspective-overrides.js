import _ from "lodash";
import {initialiseData} from "../../../common";
import {baseRagNames} from "../../../ratings/rating-utils";
import {nest} from "d3-collection";

/**
 * @name waltz-perspective-overrides
 *
 * @description
 * This component ...
 */


const bindings = {
    baseMeasurable: '<',
    baseRating: '<',
    ragNames: '<',
    overrides: '<',
    entityReference: '<',
    perspectiveDefinitions: '<'
};


const initialState = {

    ragNames: baseRagNames,
    overrides: [],
    perspectiveDefinitions: []
};


const template = require('./perspective-overrides.html');


// => [ { key: rating, values: [ { key: categoryId, values: [ measurables... ] } ] } ]
const nester = nest()
    .key(d => d.rating)
    .key(d => d.measurable.categoryId)
    .rollup(xs => _.map(xs, 'measurable'));


function mkNest(overrides = [], baseRating) {
    return nester.entries(overrides);
}


function controller() {
    const vm = this;

    vm.$onInit = () => initialiseData(vm, initialState);

    vm.$onChanges = (c) => {
        vm.overrideNest = mkNest(vm.overrides, vm.baseRating);
    };

    vm.calcPopoverText = (rating, override) => {
        if (! rating || ! override || ! vm.baseMeasurable) return '';

        return rating === 'X'
                ? `${vm.baseMeasurable.name} is not applicable when combined with ${override.name} `
                : `When ${vm.baseMeasurable.name} combines with ${override.name} the rating is ${vm.ragNames[rating].name}`;
    };
}


controller.$inject = [];


const component = {
    template,
    bindings,
    controller
};


export default component;