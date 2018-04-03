/** ------------- Root.store.js ---------------- **/

import { types } from 'mobx-state-tree';

const RootStore = types
    .model('RootStore', {
        navStore  : types.maybe(NavStore),
        pageStore : types.maybe(PageStore)
    })

/** ------------- Page.store.js ---------------- **/

import { types, getParent } from 'mobx-state-tree';

const PageStore = types
    .model('PageStore', {
        currentView : types.option(types.string, '')
    })
    .actions(self => ({
        showLoginForm() {
            self.currentView = 'login';
            getParent(self).navStore.setPath('/login')
        },
    }));
