/*
 * Waltz - Enterprise Architecture
 * Copyright (C) 2016  Khartec Ltd.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
import _ from 'lodash';
import {CORE_API} from '../common/services/core-api-utils';


export function loadDataTypes(serviceBroker) {
    return serviceBroker
        .loadAppData(CORE_API.DataTypeStore.findAll, [])
        .then(r => r.data);
}

loadDataTypes.$inject = [
    'ServiceBroker'
];


export function dataTypeByIdResolver($stateParams, serviceBroker) {
    if(!$stateParams.id)
        throw "'id' not found in stateParams";

    return serviceBroker
        .loadAppData(CORE_API.DataTypeStore.findAll, [])
        .then(r => {
            const dataType = _.find(r.data, { id: $stateParams.id});
            if (dataType) {
                return dataType;
            } else {
                throw `data type with id: ${$stateParams.id} not found`;
            }
        });
}

dataTypeByIdResolver.$inject = [
    '$stateParams',
    'ServiceBroker'
];


export function dataTypeByCodeResolver($stateParams, serviceBroker) {
    if(!$stateParams.code)
        throw "'code' not found in stateParams";

    return serviceBroker
        .loadAppData(CORE_API.DataTypeStore.findAll, [])
        .then(r => {
            const dataType = _.find(r.data, { code: $stateParams.code});
            if (dataType) {
                return dataType;
            } else {
                throw `data type with code: ${$stateParams.code} not found`;
            }
        });
}

dataTypeByCodeResolver.$inject = [
    '$stateParams',
    'ServiceBroker'
];