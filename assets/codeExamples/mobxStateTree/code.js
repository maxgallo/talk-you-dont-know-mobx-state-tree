import { observer } from 'mobx-react';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { types } from 'mobx-state-tree';

const AlbumStore = types
    .model('Album', {
        title: types.string,
        rating: types.integer
    })
    .views(self => ({
        get isGood() {
            return self.rating >= 7;
        }
    }));

const MusicLibraryStore = types
    .model('MusicLibrary', {
        albums: types.array(AlbumStore)
    })
    .views(self => ({
        get goodAlbums() {
            return self.albums.filter(x => x.isGood);
        }
    }))
    .actions(self => ({
        addAlbum(car) {
            self.albums.push(car);
        }
    }));

@observer
class MusicLibraryView extends Component {
    renderAlbum(album) {
        return (
            <li key={album.title}>
                {album.title} | Rating: {album.rating}
            </li>
        );
    }
    render() {
        const { musicLibrary } = this.props;
        return (
            <div>
                <ul>{musicLibrary.albums.map(this.renderAlbum)} </ul>
            </div>
        );
    }
}

const musicLibrary = MusicLibraryStore.create({
    albums: [{ title: 'Rumours', rating: 9 }]
});

ReactDOM.render(
    <MusicLibraryView musicLibrary={musicLibrary} />,
    document.getElementById('app')
);

musicLibrary.addAlbum({ title: 'Harvest', rating: 8 });
musicLibrary.addAlbum({ title: 'Ten', rating: 9 });
