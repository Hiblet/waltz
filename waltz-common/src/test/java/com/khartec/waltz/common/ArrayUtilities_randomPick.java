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

package com.khartec.waltz.common;

import org.junit.Test;

import static com.khartec.waltz.common.ArrayUtilities.randomPick;
import static junit.framework.TestCase.assertEquals;
import static junit.framework.TestCase.assertTrue;

public class ArrayUtilities_randomPick {

    @Test(expected = IllegalArgumentException.class)
    public void cannotRandomPickFromNothing() {
        randomPick();
    }


    @Test
    public void randomPickFromPoolOfOneReturnsThatOne() {
        assertEquals("a", randomPick("a"));
    }


    @Test
    public void randomPickFromPoolIsMemberOfPool() {
        assertTrue(SetUtilities.fromArray("a", "b")
                .contains(randomPick("a", "b")));
    }

}
