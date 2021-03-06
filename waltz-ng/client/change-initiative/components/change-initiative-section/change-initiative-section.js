import _ from 'lodash';

import {CORE_API} from '../../../common/services/core-api-utils';
import {initialiseData} from '../../../common';
import {mkSelectionOptions} from "../../../common/selector-utils";
import {buildHierarchies} from "../../../common/hierarchy-utils";

import template from './change-initiative-section.html';
import {
    changeInitiativeNames,
    lifecyclePhaseDisplayNames,
} from "../../../common/services/display-names";


const bindings = {
    parentEntityRef: '<',
};


const externalIdCellTemplate = `
    <div class="ui-grid-cell-contents" style="vertical-align: baseline; ">
        <a ng-click="grid.appScope.onSelectViaGrid(row.entity)"
           class="clickable">
            <span ng-bind="row.entity.externalId"></span>
            &nbsp;
            <waltz-icon name="{{row.entity.icon}}" rotate="270"></waltz-icon>
        </a>
    </div>
`;

const nameCellTemplate = `
    <div class="ui-grid-cell-contents">
        <a ng-click="grid.appScope.onSelectViaGrid(row.entity)"
           class="clickable">
            <span ng-bind="row.entity.name"></span>
        </a>
    </div>
`;


const initialState = {
    changeInitiatives: [],
    selectedChange: null,
    visibility: {
        sourcesOverlay: false
    },
    gridOptions: {
        columnDefs: [
            { field: 'externalId', name: 'id', cellTemplate: externalIdCellTemplate },
            { field: 'name', cellTemplate: nameCellTemplate },
            { field: 'kindName', name: 'Kind' },
            { field: 'lifecyclePhaseName', name: 'Phase' }
        ],
        data: []
    }
};



function controller(serviceBroker) {
    const vm = initialiseData(this, initialState);

    const processChangeInitiativeHierarchy = (changeInitiatives) => {
        const cisByParentId = _.groupBy(changeInitiatives, 'parentId');
        const roots = _
            .chain(changeInitiatives)
            .filter(ci => !ci.parentId)
            .map(ci => {
                const children = cisByParentId[ci.id] || [];
                const icon = children.length > 0 ? 'sitemap' : 'fw';
                const extensions = {
                    kindName: changeInitiativeNames[ci.changeInitiativeKind],
                    lifecyclePhaseName: lifecyclePhaseDisplayNames[ci.lifecyclePhase],
                    icon,
                    parent: null,
                    children
                };
                return Object.assign({}, ci, extensions);
            })
            .value();

        vm.changeInitiatives = roots;
        vm.gridOptions.data = roots;
    };


    vm.onSelectViaGrid = (ci) => {
        vm.selectedChange = ci;
    };

    vm.onClearSelection = () => vm.selectedChange = null;

    vm.$onChanges = (changes) => {
        if(vm.parentEntityRef && changes.parentEntityRef.previousValue.id !== changes.parentEntityRef.currentValue.id) {
            serviceBroker
                .loadViewData(
                    CORE_API.ChangeInitiativeStore.findHierarchyBySelector,
                    [ mkSelectionOptions(vm.parentEntityRef) ])
                .then(r => processChangeInitiativeHierarchy(r.data));
        }
    };


}


controller.$inject = [
    'ServiceBroker'
];


const component = {
    template,
    bindings,
    controller
};


export default {
    component,
    id: 'waltzChangeInitiativeSection'
};
