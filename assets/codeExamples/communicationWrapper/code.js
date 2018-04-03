import { types, getParent } from 'mobx-state-tree'

const ActionsWrapperStore = types
    .model('ActionsWrapperStore', {})
    .actions(self => ({
        login() {
            authStore.login()
            pageStore.login()
            navigationStore.login()
        },
        goHome() {
            pageStore.showDefault();
            navigationStore.login()
        }
    }));
