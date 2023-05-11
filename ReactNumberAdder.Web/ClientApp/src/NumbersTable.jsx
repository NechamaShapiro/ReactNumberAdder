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

        //const { selectedNumbers } = this.state;
        //if (selectedNumbers.includes(num.id)) {
        //    this.setState({ selectedNumbers: selectedNumbers.filter(i => i !== num.id) });
        //}
        //else {
        //    this.setState({ selectedNumbers: [...selectedNumbers, num.id] });
        //}
    }

    getNumberById = (id) => {
        return this.state.randomNumbers.find(n => n.id == id);
    }
    
    onLockClick = (n) => {
        console.log('lock');
        const { lockedNumbers } = this.state;
        if (lockedNumbers.includes(n.id)) {
            this.setState({ lockedNumbers: lockedNumbers.filter(i => i !== n.id) });
        }
        else {
            this.setState({ lockedNumbers: [...lockedNumbers, n.id] });
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
                                    num={n}
                                    onSelectClick={this.onSelectClick}
                                    lockedNumbers={this.state.lockedNumbers}
                                    selectedNumbers={this.state.selectedNumbers}
                                    isLocked={this.state.lockedNumbers.includes(n.id)}
                                />)}
                            </tbody>
                        </table>
                    </div>
                    {this.state.randomNumbers.map(n => <SelectedTable
                        selectedNumbers={this.state.selectedNumbers}
                        lockedNumbers={this.state.lockedNumbers}
                        num={n}
                        onLockClick={() => this.onLockClick(n)}
                    />)}

                </div>
            );
        }
    };
    
export default NumbersTable;