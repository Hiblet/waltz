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

package com.khartec.waltz.model.entity_relationship;

import com.khartec.waltz.model.EntityKind;
import org.jooq.lambda.tuple.Tuple2;

import java.util.Collections;
import java.util.Set;

import static com.khartec.waltz.common.SetUtilities.fromArray;
import static com.khartec.waltz.model.EntityKind.*;
import static org.jooq.lambda.tuple.Tuple.tuple;


public enum RelationshipKind {

    HAS(Collections.emptySet()),

    DEPRECATES(fromArray(
            tuple(CHANGE_INITIATIVE, APPLICATION),
            tuple(CHANGE_INITIATIVE, MEASURABLE)
    )),

    PARTICIPATES_IN(fromArray(
            tuple(APPLICATION, CHANGE_INITIATIVE)
    )),

    RELATES_TO(fromArray(
            tuple(APP_GROUP, CHANGE_INITIATIVE),
            tuple(MEASURABLE, MEASURABLE),
            tuple(MEASURABLE, CHANGE_INITIATIVE),
            tuple(CHANGE_INITIATIVE, CHANGE_INITIATIVE),
            tuple(CHANGE_INITIATIVE, MEASURABLE),
            tuple(CHANGE_INITIATIVE, DATA_TYPE)
    )),

    SUPPORTS(fromArray(
            tuple(APPLICATION, CHANGE_INITIATIVE)
    )),

    APPLICATION_NEW(fromArray(
            tuple(CHANGE_INITIATIVE, APPLICATION)
    )),

    APPLICATION_FUNCTIONAL_CHANGE(fromArray(
            tuple(CHANGE_INITIATIVE, APPLICATION)
    )),

    APPLICATION_DECOMMISSIONED(fromArray(
            tuple(CHANGE_INITIATIVE, APPLICATION)
    )),

    APPLICATION_NFR_CHANGE(fromArray(
            tuple(CHANGE_INITIATIVE, APPLICATION)
    )),

    DATA_PUBLISHER(fromArray(
            tuple(CHANGE_INITIATIVE, APPLICATION)
    )),

    DATA_CONSUMER(fromArray(
            tuple(CHANGE_INITIATIVE, APPLICATION)
    ));


    private Set<Tuple2<EntityKind, EntityKind>> allowedEntityKinds;


    RelationshipKind(Set<Tuple2<EntityKind, EntityKind>> allowedEntityKinds) {
        this.allowedEntityKinds = allowedEntityKinds;
    }


    public Set<Tuple2<EntityKind, EntityKind>> getAllowedEntityKinds() {
        return this.allowedEntityKinds;
    }

}
