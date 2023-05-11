import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import TableRow from './TableRow';
import SelectedTable from './SelectedTable';
import { v4 as uuidv4 } from 'uuid';
import update from 'immutability-helper';

class NumbersTable extends React.Component {

    state = {
        randomNumbers: [],
        //currentNumber: {
        //    id: uuidv4(),
        //    //num: '',
        //    //selected: false,
        //    //locked: false,
        //},
        selectedNumbers: [],
        lockedNumbers: []
    }

    onAddClick = () => {
        const randomNum = Math.floor(Math.random() * 1000);
        const id = uuidv4();
        const copy = [...this.state.randomNumbers, { id: id, num: randomNum }];
        this.setState({ randomNumbers: copy/*, currentNumber: { id: id, num: randomNum }*/ });
    }

    onSelectClick = n => {
        const isSelected = this.state.selectedNumbers.some(num => n.id === num.id);
        if (isSelected) {
            this.setState({ selectedNumbers: this.state.selectedNumbers.filter(num => num.id !== n.id) });
        } else {
            this.setState({ selectedNumbers: [...this.state.selectedNumbers, n] });
        }
    }

    getNumberById = (id) => {
        return this.state.randomNumbers.find(n => n.id == id);
    }
    
    onLockClick = (n) => {
        console.log(n)
        const { lockedNumbers } = this.state;
        if (lockedNumbers.includes(n)) {
            this.setState({ lockedNumbers: lockedNumbers.filter(i => i !== n) });
        }
        else {
            this.setState({ lockedNumbers: [...lockedNumbers, n] });
        }
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
                                    num={n.num}
                                    onSelectClick={() => this.onSelectClick(n)}
                                    selected={this.state.selectedNumbers.some(num => n.id === num.id)}
                                    isLocked={this.state.lockedNumbers.includes(n.id)}
                                />)}
                            </tbody>
                        </table>
                    </div>
                     <SelectedTable
                        selectedNumbers={this.state.selectedNumbers}
                        lockedNumbers={this.state.lockedNumbers}
                        onLockClick={this.onLockClick}
                    />

                </div>
            );
        }
    };
    
export default NumbersTable;