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

package com.khartec.waltz.service.tour;

import com.khartec.waltz.data.tour.TourDao;
import com.khartec.waltz.model.tour.TourStep;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

import static com.khartec.waltz.common.Checks.checkNotNull;

/**
 * The tour service is used to provide guided tours through application functionality.
 * A tour is comprised of multiple steps, which are ordered by id and grouped together
 * using a key.  This key is typically the name of a page.
 */
@Service
public class TourService {

    private final TourDao tourDao;


    @Autowired
    public TourService(TourDao tourDao) {
        checkNotNull(tourDao, "tourDao cannot be null");
        this.tourDao = tourDao;
    }

    
    public List<TourStep> findByKey(String key) {
        return tourDao.findByKey(key);
    }
}
