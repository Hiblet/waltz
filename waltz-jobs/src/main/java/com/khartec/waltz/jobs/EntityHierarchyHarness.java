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

package com.khartec.waltz.jobs;

import com.khartec.waltz.model.EntityKind;
import com.khartec.waltz.service.DIConfiguration;
import com.khartec.waltz.service.entity_hierarchy.EntityHierarchyService;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

/**
 * Created by dwatkins on 30/07/2016.
 */
public class EntityHierarchyHarness {

    public static void main(String[] args) {
        AnnotationConfigApplicationContext ctx = new AnnotationConfigApplicationContext(DIConfiguration.class);

        EntityHierarchyService svc = ctx.getBean(EntityHierarchyService.class);
        svc.buildFor(EntityKind.ORG_UNIT);
    }
}
