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

import ChangeInitiativeView from './pages/view/change-initiative-view';

const baseState = {
    url: 'change-initiative'
};


const viewState = {
    url: '/{id:int}',
    views: { 'content@': ChangeInitiativeView }
};


const appRelationshipEdit = {
    url: '/{id:int}/app-relationship/edit',
    views: { 'content@': require('./change-initiative-app-relationship-edit') }
};


function setupRoutes($stateProvider) {
    $stateProvider
        .state('main.change-initiative', baseState)
        .state('main.change-initiative.view', viewState)
        .state('main.change-initiative.app-relationship-edit', appRelationshipEdit)
}

setupRoutes.$inject = ['$stateProvider'];


export default setupRoutes;