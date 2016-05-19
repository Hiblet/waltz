/*
 *  Waltz
 * Copyright (c) David Watkins. All rights reserved.
 * The use and distribution terms for this software are covered by the
 * Eclipse Public License 1.0 (http://opensource.org/licenses/eclipse-1.0.php)
 * which can be found in the file epl-v10.html at the root of this distribution.
 * By using this software in any fashion, you are agreeing to be bound by
 * the terms of this license.
 * You must not remove this notice, or any other, from this software.
 *
 */

const BINDINGS = {
    shouldBeAnonymous: '=waltzIfAnonymous'
};

function controller(UserService) {
    const vm = this;

    UserService
        .whoami()
        .then(user => vm.show = vm.shouldBeAnonymous
            ? user.userName === 'anonymous'
            : user.userName != 'anonymous');

    vm.show = false;
}

controller.$inject = ['UserService'];


export default () => ({
    replace: true,
    restrict: 'A',
    transclude: true,
    scope: {},
    bindToController: BINDINGS,
    controllerAs: 'ctrl',
    template: '<div ng-show="ctrl.show"><ng-transclude></ng-transclude></div>',
    controller
});