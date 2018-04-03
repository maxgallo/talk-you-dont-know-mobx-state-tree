import {observable, computed} from 'mobx';
import {observer} from 'mobx-react';
import React, {Component} from 'react';
import { render } from 'react-dom';

class CarPark {
    @observable cars = []
    @computed get howManyFerrari() {
        return this.cars.filter(this.isFerrari).length;
    }
    isFerrari = carName => carName.includes('Ferrari')
}

@observer
class CarParkView extends Component {
    renderCar(car){ return <li key={car}>{car}</li> }
    render() {
        const { carPark } = this.props
        return (<div>
            <ul>{ carPark.cars.map(this.renderCar) } </ul>
            How many Ferrari? { carPark.howManyFerrari }
        </div>);
    }
}
const carPark = new CarPark();

render(<CarParkView carPark={carPark} />,document.getElementById('root'));

setTimeout( () => carPark.cars.push('Ferrari 458')  , 1000);
setTimeout( () => carPark.cars.push('Ferrari Enzo') , 2000);

