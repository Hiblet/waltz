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

package com.khartec.waltz.model.bookmark;


import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.khartec.waltz.model.*;
import org.immutables.value.Value;

import java.util.Optional;


@Value.Immutable
@JsonSerialize(as = ImmutableBookmark.class)
@JsonDeserialize(as = ImmutableBookmark.class)
public abstract class Bookmark implements
        EntityKindProvider,
        IdProvider,
        ProvenanceProvider,
        LastUpdatedProvider {

    public abstract Optional<Long> id();
    public abstract EntityReference parent();
    public abstract String bookmarkKind();
    public abstract Optional<String> title();
    public abstract Optional<String> url();
    public abstract Optional<String> description();

    @Value.Default
    public EntityKind kind() { return EntityKind.BOOKMARK; }

    @Value.Default
    public String provenance() {
        return "waltz";
    }

    @Value.Default
    public boolean isPrimary() { return false; }

    @Value.Default
    public boolean isRequired() {
        return false;
    }

}
