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


export function store($http, BaseApiUrl) {
    const BASE = `${BaseApiUrl}/entity-search`;


    const search = (query, options) => $http
        .post(`${BASE}/${query}`, options)
        .then(result => result.data);

    return {
        search
    };
}


store.$inject = [
    '$http',
    'BaseApiUrl'
];


export const serviceName = 'EntitySearchStore';


export const EntitySearchStore_API = {
    search: {
        serviceName,
        serviceFnName: 'search',
        description: 'search for entities, params should be the query and a list of entity kinds'
    }
};