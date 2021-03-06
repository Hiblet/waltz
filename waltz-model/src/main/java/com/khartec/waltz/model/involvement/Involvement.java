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

package com.khartec.waltz.model.involvement;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.khartec.waltz.model.EntityReference;
import com.khartec.waltz.model.ProvenanceProvider;
import org.immutables.value.Value;


@Value.Immutable
@JsonSerialize(as = ImmutableInvolvement.class)
@JsonDeserialize(as = ImmutableInvolvement.class)
public abstract class Involvement implements ProvenanceProvider {

    public abstract long kindId();
    public abstract EntityReference entityReference();
    public abstract String employeeId();

    @Value.Default
    public String provenance() {
        return "waltz";
    }


    public static Involvement mkInvolvement(
            EntityReference entityRef,
            String employeeId,
            int involvementKindId,
            String provenance) {

        return ImmutableInvolvement.builder()
                .entityReference(entityRef)
                .employeeId(employeeId)
                .kindId(involvementKindId)
                .provenance(provenance)
                .build();
    }
}
