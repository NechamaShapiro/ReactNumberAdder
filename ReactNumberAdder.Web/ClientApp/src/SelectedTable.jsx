import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

class SelectedRow extends React.Component {

    generateTable = () => {
        const { selectedNumbers, lockedNumbers, onLockClick } = this.props;
        if (!selectedNumbers.length) {
            return //return nothing if none selected
        }
        return <div className="row p-5 rounded" style={{ backgroundColor: 'rgb(233, 236, 239)' }} >
            <div className="col-md-6 col-md-offset-3">
                <h3>Selected Numbers </h3>
                <ul className="list-group">
                    {selectedNumbers.map((n, i) => {
                        return <li className="list-group-item" key={n.id}>
                            {n.num}
                            <button className="ms-5 btn btn-primary" onClick={() => onLockClick(n.id)}>{`${!lockedNumbers.includes(n.id) ? 'Lock' : 'Unlock'}`}</button>
                        </li>
                    })}
                </ul>
            </div>
        </div>
    }
    
    render() {
        return (
            this.generateTable()
        );
    }
};

export default SelectedRow;