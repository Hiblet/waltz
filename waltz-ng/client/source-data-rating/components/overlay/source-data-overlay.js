/*
 *
 *  * Waltz - Enterprise Architecture
 *  * Copyright (C) 2017  Khartec Ltd.
 *  *
 *  * This program is free software: you can redistribute it and/or modify
 *  * it under the terms of the GNU Lesser General Public License as published by
 *  * the Free Software Foundation, either version 3 of the License, or
 *  * (at your option) any later version.
 *  *
 *  * This program is distributed in the hope that it will be useful,
 *  * but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  * GNU Lesser General Public License for more details.
 *  *
 *  * You should have received a copy of the GNU Lesser General Public License
 *  * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 */

import _ from "lodash";
import {initialiseData, isEmpty} from "../../../common/index";
import {CORE_API} from '../../../common/services/core-api-utils';

import template from './source-data-overlay.html';


const bindings = {
    entities: '<',
    visible: '<'
};


const initialState = {
    filteredRatings: [],
    ratings: [],
    entities: []
};


function filterRatings(ratings,
                       entities = []) {
    return isEmpty(entities)
        ? ratings
        : _.filter(ratings, r => _.includes(entities, r.entityKind));
}


function controller(serviceBroker) {

    const vm = initialiseData(this, initialState);


    vm.$onChanges = (changes) => {
        if (vm.visible === true) {
            serviceBroker
                .loadAppData(CORE_API.SourceDataRatingStore.findAll)
                .then(r => {
                    vm.ratings = r.data;
                    vm.filteredRatings = filterRatings(vm.ratings, vm.entities);
                });
        }

    };
}


controller.$inject = ['ServiceBroker'];


const component = {
    bindings,
    controller,
    template
};


export default {
    component,
    id: 'waltzSourceDataOverlay'
}