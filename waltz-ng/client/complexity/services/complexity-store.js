
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


export function store($http, BaseApiUrl) {

    const BASE = `${BaseApiUrl}/complexity`;

    const findByApplication = id => {
        console.log('DEPRECATED (1.2) - complexity-store:findByApplication');
        return $http
            .get(`${BASE}/application/${id}`)
            .then(result => result.data);
    };

    const findBySelector = (id, kind, scope = 'CHILDREN') => {
        const options = _.isObject(id)
            ? id
            : {scope, entityReference: {id, kind}};

        return $http
            .post(BASE, options)
            .then(result => result.data);
    };

    const recalculateAll = () =>
        $http
            .get(`${BASE}/rebuild`)
            .then(r => r.data);


    return {
        findByApplication,
        findBySelector,
        recalculateAll
    };
}

store.$inject = [
    '$http',
    'BaseApiUrl',
];

export const serviceName = 'ComplexityStore';

export const ComplexityStore_API = {
    findByApplication: {
        serviceName,
        serviceFnName: 'findByApplication',
        description: 'executes findByApplication (takes an id)'
    },
    findBySelector: {
        serviceName,
        serviceFnName: 'findBySelector',
        description: 'executes findBySelector'
    },
    recalculateAll: {
        serviceName,
        serviceFnName: 'recalculateAll',
        description: 'executes recalculateAll'
    },
};


