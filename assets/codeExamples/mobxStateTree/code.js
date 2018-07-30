import { observer } from 'mobx-react';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { types } from 'mobx-state-tree';

const CarStore = types
    .model('Car', {
        name: types.string
    })
    .views(self => ({
        get isFerrari() {
            return self.name.includes('Ferrari');
        }
    }));

const CarParkStore = types
    .model('CarPark', {
        cars: types.array(CarStore)
    })
    .actions(self => ({
        addCar(car) {
            self.cars.push(car);
        }
    }));

@observer
class CarParkView extends Component {
    renderCar(car) {
        return <li key={car.name}>{car.name}</li>;
    }
    render() {
        const { carPark } = this.props;
        return (
            <div>
                <ul>{carPark.cars.map(this.renderCar)} </ul>
            </div>
        );
    }
}

const carParkStore = CarParkStore.create({ cars: [{ name: 'Fiat 500' }] });

ReactDOM.render(
    <CarParkView carPark={carParkStore} />,
    document.getElementById('root')
);

carParkStore.addCar({ name: 'Ferrari 458 Italia' });
carParkStore.addCar({ name: 'Ferrari Enzo' });
