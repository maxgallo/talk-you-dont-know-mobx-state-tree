import { observable, computed } from 'mobx';
import { observer } from 'mobx-react';
import React, { Component } from 'react';
import { render } from 'react-dom';

class CarPark {
  @observable cars = []
  @computed get howManyFerrari() {
    return this.cars.filter(this.isFerrari).length;
  }
  isFerrari = x => x.includes('Ferrari');
}

@observer
class CarParkView extends Component {
  render() {
    const { carPark: { cars } } = this.props
    return (<div>
      <ul>{cars.map(car => <li>{car}</li>)}</ul>
      How many Ferrari? {carPark.howManyFerrari}
    </div>);
  }
}

const carPark = new CarPark();

render(<CarParkView carPark={carPark} />, document.getElementById('root'));

setTimeout(() => carPark.cars.push('Ferrari 458'), 1000);
setTimeout(() => carPark.cars.push('Ferrari Enzo'), 2000);