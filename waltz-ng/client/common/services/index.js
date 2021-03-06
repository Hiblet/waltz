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
import _ from "lodash";
import BaseLookupService from "./BaseLookupService";
import {
    applicationKindDisplayNames,
    applicationRatingNames,
    attestationTypeDisplayNames,
    capabilityRatingNames,
    changeInitiativeNames,
    criticalityDisplayNames,
    dataFormatKindNames,
    endOfLifeStatusNames,
    entityNames,
    entityStatisticCategoryDisplayNames,
    frequencyKindNames,
    investmentRatingNames,
    issuanceDisplayNames,
    lifecyclePhaseDisplayNames,
    lifecycleStatusNames,
    orgUnitKindNames,
    physicalSpecDefinitionFieldTypeNames,
    physicalSpecDefinitionTypeNames,
    relationshipKindNames,
    releaseLifecycleStatusNames,
    rollupKindNames,
    severityNames,
    surveyInstanceStatusNames,
    surveyQuestionFieldTypeNames,
    surveyRunStatusNames,
    transportKindNames,
    usageKindDisplayNames
} from "./display-names";
import {
    booleanTypeIconNames,
    entityIconNames,
    entityStatisticCategoryIconNames,
    ragIconNames,
    severityIconNames,
    usageKindIconNames
} from "./icon-names";

import preventNavigationService from './prevent-navigation-service';
import serviceBroker from './service-broker';
import {CORE_API} from './core-api-utils';
import {toMap} from "../map-utils";


const displayNameService = new BaseLookupService();
const iconNameService = new BaseLookupService();
const descriptionService = new BaseLookupService();


function loadFromServer(involvementKindService,
                        serviceBroker) {

    serviceBroker
        .loadAppData(CORE_API.DataTypeStore.findAll)
        .then(result => {
            // DEPRECATED, should be byId
            const indexedByCode = _.keyBy(result.data, 'code');
            const indexedById = _.keyBy(result.data, 'id');

            displayNameService
                .register('dataType', _.mapValues(indexedByCode, 'name'))
                .register('dataType', _.mapValues(indexedById, 'name'))
                ;

            descriptionService
                .register('dataType', _.mapValues(indexedByCode, 'description'))
                .register('dataType', _.mapValues(indexedById, 'description'))
                ;
        });

    involvementKindService
        .loadInvolvementKinds()
        .then(results => {
            const indexedById = _.keyBy(results, 'id');
            displayNameService.register('involvementKind', _.mapValues(indexedById, 'name'));
            descriptionService.register('involvementKind', _.mapValues(indexedById, 'description'));
        });

    serviceBroker
        .loadAppData(CORE_API.MeasurableCategoryStore.findAll)
        .then(result => {
            const indexedById = _.keyBy(result.data, 'id');
            displayNameService.register('measurableCategory', _.mapValues(indexedById, 'name'));
            descriptionService.register('measurableCategory', _.mapValues(indexedById, 'description'));
        });

    serviceBroker
        .loadAppData(CORE_API.EntityNamedNoteTypeStore.findAll)
        .then(result => {
            const indexedById = _.keyBy(result.data, 'id');
            displayNameService.register('entityNamedNoteType', _.mapValues(indexedById, 'name'));
            descriptionService.register('entityNamedNoteType', _.mapValues(indexedById, 'description'));
        });

    serviceBroker
        .loadAppData(CORE_API.EnumValueStore.findAll)
        .then(r => {
            const keyFn = x => x.key;
            _.chain(r.data)
                .groupBy('type')
                .each((xs, type) => {
                    displayNameService.register(type, toMap(xs, keyFn, x => x.name));
                    descriptionService.register(type, toMap(xs, keyFn, x => x.description));
                    iconNameService.register(type, toMap(xs, keyFn, x => x.icon));
                })
                .value();
        });
}


export default (module) => {
    module
        .service('DisplayNameService', () => displayNameService)
        .service('IconNameService', () => iconNameService)
        .service('DescriptionService', () => descriptionService)
        .service('PreventNavigationService', preventNavigationService)
        .service('ServiceBroker', serviceBroker);

    displayNameService
        .register('applicationKind', applicationKindDisplayNames)
        .register('applicationRating', applicationRatingNames)
        .register('attestationType', attestationTypeDisplayNames)
        .register('capabilityRating', capabilityRatingNames)
        .register('changeInitiative', changeInitiativeNames)
        .register('criticality', criticalityDisplayNames)
        .register('dataFormatKind', dataFormatKindNames)
        .register('endOfLifeStatus', endOfLifeStatusNames)
        .register('entity', entityNames)
        .register('entityStatistic', entityStatisticCategoryDisplayNames)
        .register('frequencyKind', frequencyKindNames)
        .register('investmentRating', investmentRatingNames)
        .register('issuance', issuanceDisplayNames)
        .register('lifecyclePhase', lifecyclePhaseDisplayNames)
        .register('lifecycleStatus', lifecycleStatusNames)
        .register('orgUnitKind', orgUnitKindNames)
        .register('physicalSpecDefinitionFieldType', physicalSpecDefinitionFieldTypeNames)
        .register('physicalSpecDefinitionType', physicalSpecDefinitionTypeNames)
        .register('relationshipKind', relationshipKindNames)
        .register('rollupKind', rollupKindNames)
        .register('severity', severityNames)
        .register('surveyInstanceStatus', surveyInstanceStatusNames)
        .register('surveyRunStatus', surveyRunStatusNames)
        .register('releaseLifecycleStatus', releaseLifecycleStatusNames)
        .register('surveyQuestionFieldType', surveyQuestionFieldTypeNames)
        .register('usageKind', usageKindDisplayNames)
        .register('transportKind', transportKindNames);

    iconNameService
        .register('BOOLEAN', booleanTypeIconNames)
        .register('entity', entityIconNames)
        .register('entityStatistic', entityStatisticCategoryIconNames)
        .register('severity', severityIconNames)
        .register('rag', ragIconNames)
        .register('usageKind', usageKindIconNames);


    loadFromServer.$inject = [
        'InvolvementKindService',
        'ServiceBroker'
    ];


    function configServiceBroker($rootScope, serviceBroker) {
        $rootScope.$on('$stateChangeSuccess', () => {
            serviceBroker.resetViewData();
        });
    }

    configServiceBroker.$inject = ['$rootScope', 'ServiceBroker'];

    module
        .run(loadFromServer)
        .run(configServiceBroker);
};
