import { types } from 'mobx-state-tree';

const BigStore = types
    .model('BigStore', {})
    .views(self => ({
        get updatedArray(){
            return self.itemArray.map(x => `big ${x}`);
        }
    }))

const DataStore = types
    .model('DataStore', {
        itemArray: types.array(types.string) 
    })

const BigDataStore = types.compose(DataStore, BigStore);

const bigDataStore = BigDataStore.create({
    itemArray: ['pen', 'sword']
});

bigDataStore.itemArray    // ['pen', 'sword']
bigDataStore.updatedArray // ['big pen', 'big sword']
