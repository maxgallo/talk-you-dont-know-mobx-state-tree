/** ---------- Region.store.js ---------------- **/
const RegionStore = types
    .model('RegionStore', {
        region: types.optional(types.string, 'UK')
    })

/** ---------- Navigation.store.js ------------ **/
import { types, getEnv } from 'mobx-state-tree';

const NavigationStore = types
    .model('NavigationStore', { path: types.string })
    .view(self => ({
        get urlPath() {
            return getEnv(self).regionStore.region
          		+ '/' + self.path;
        }
    }));
 
/** ---------- index.js ----------------------- **/
const regionStore = RegionStore.create({});
const navigationStore = NavigationStore.create(
    { path: 'login'},
    { regionStore } 
);

console.log(navigationStore.urlPath); // 'UK/login'