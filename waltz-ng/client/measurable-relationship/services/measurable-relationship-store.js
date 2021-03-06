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

import {checkIsEntityRef} from '../../common/checks';

export function store($http, base) {
    const BASE = `${base}/measurable-relationship`;

    const findByMeasurable = (id) => $http
        .get(`${BASE}/MEASURABLE/${id}`)
        .then(r => r.data);

    const findByEntityReference = (ref) => {
        checkIsEntityRef(ref);
        return $http
            .get(`${BASE}/${ref.kind}/${ref.id}`)
            .then(r => r.data);
    };

    const remove = (d) => {
        checkIsEntityRef(d.a);
        checkIsEntityRef(d.b);
        const url = `${BASE}/${d.a.kind}/${d.a.id}/${d.b.kind}/${d.b.id}/${d.relationship}`;
        return $http
            .delete(url)
            .then(r => r.data);
    };

    const create = (d) => {
        checkIsEntityRef(d.a);
        checkIsEntityRef(d.b);
        const url = `${BASE}/${d.a.kind}/${d.a.id}/${d.b.kind}/${d.b.id}/${d.relationshipKind}`;
        return $http
            .post(url , d.description)
            .then(r => r.data);
    };

    const update = (key, changes) => {
        // changes -> { description, relationshipKind }
        checkIsEntityRef(key.a);
        checkIsEntityRef(key.b);
        const url = `${BASE}/${key.a.kind}/${key.a.id}/${key.b.kind}/${key.b.id}/${key.relationshipKind}`;
        return $http
            .put(url, changes)
            .then(r => r.data);
    };

    return {
        findByMeasurable,
        findByEntityReference,
        remove,
        create,
        update
    };
}


store.$inject = [
    '$http',
    'BaseApiUrl'
];


export const serviceName = 'MeasurableRelationshipStore';


export const MeasurableRelationshipStore_API = {
    findByMeasurable: {
        serviceName,
        serviceFnName: 'findByMeasurable',
        description: 'finds relationships by given measurable id'
    },
    findByEntityReference: {
        serviceName,
        serviceFnName: 'findByEntityReference',
        description: 'finds relationships by given entity reference'
    },
    create: {
        serviceName,
        serviceFnName: 'create',
        description: 'creates a relationship'
    },
    update: {
        serviceName,
        serviceFnName: 'update',
        description: 'updates a relationship (key, changes)'
    },
    remove: {
        serviceName,
        serviceFnName: 'remove',
        description: 'removes a relationship'
    }
};