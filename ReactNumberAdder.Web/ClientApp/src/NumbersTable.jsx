import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import TableRow from './TableRow';
import SelectedTable from './SelectedTable';
import { v4 as uuidv4 } from 'uuid';
import update from 'immutability-helper';

class NumbersTable extends React.Component {

    state = {
        randomNumbers: [],
        currentNumber: {
            id: uuidv4(),
            num: '',
            selected: false,
            locked: false
        },
        selectedNumbers: []
    }

    onAddClick = () => {
        const randomNum = Math.floor(Math.random() * 1000);
        const id = uuidv4();
        const copy = [...this.state.randomNumbers, { id: id, num: randomNum }];
        this.setState({ randomNumbers: copy, currentNumber: { id: id, num: randomNum } });
    }

    onSelectClick = e => {
        //console.log('selected');
        const id = e.target.id;
        const num = this.getNumberById(id);
        num.selected = !num.selected;
        const index = this.state.randomNumbers.findIndex((n) => n.id === id);
        const updatedNumbers = update(this.state.randomNumbers, { $splice: [[index, 1, num]] });  // array.splice(start, deleteCount, item1)
        this.setState({ randomNumbers: updatedNumbers });

        const selectedNumbers = this.state.randomNumbers.filter(n => n.selected === true);
        this.setState({ selectedNumbers: selectedNumbers });
    }
   
    getNumberById = (id) => {
        return this.state.randomNumbers.find(n => n.id == id);
    }

    onLockClick = e => {
        console.log('lock');
        const id = e.target.id;
        const num = this.getNumberById(id);
        num.locked = !num.locked; //this line is the problem
        console.log('lock2');

        const index = this.state.randomNumbers.findIndex((n) => n.id === id);
        const updatedNumbers = update(this.state.randomNumbers, { $splice: [[index, 1, num]] });  // array.splice(start, deleteCount, item1)
        this.setState({ randomNumbers: updatedNumbers });

        //const selectedNumbers = this.state.randomNumbers.filter(n => n.selected === true);
        //this.setState({ selectedNumbers: selectedNumbers });
    }
    render() {
        return (
            <div className="container" style={{ marginTop: '60px' }}>
                <div className="row">
                    <div className="col-md-12">
                        <button className="btn btn-success btn-lg w-100" onClick={this.onAddClick}>Add</button>
                    </div>
                </div>
                <div style={{ maxHeight: '500px', overflowY: 'scroll' }}>
                    <table className="table table-hover table-striped table-bordered">
                        <thead>
                            <tr>
                                <th style={{ width: 25 + '%' }}>Number</th>
                                <th>Add/Remove</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.randomNumbers.map(n => <TableRow
                                key={n.id}
                                num={n}
                                onSelectClick={this.onSelectClick}
                            />)}
                        </tbody>
                    </table>
                </div>
                <SelectedTable
                    selectedNumbers={this.state.selectedNumbers}
                    onLockClick={this.onLockClick}
                />
            </div>
        );
    }
};

export default NumbersTable;