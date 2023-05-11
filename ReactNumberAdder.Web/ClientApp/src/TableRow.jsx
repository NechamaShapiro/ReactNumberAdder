import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

class TableRow extends React.Component {
    
    generateRow = () => {
        const { num, isLocked, onSelectClick, selected } = this.props;
            return <tr>
                <td>{num}</td>
                <td>
                    <button className={`${!selected ? 'btn btn-primary' : 'btn btn-danger'}`} disabled={isLocked} onClick={onSelectClick}>{`${!selected ? 'Add to Selected' : 'Remove from Selelcted'}`}</button>
                </td>
            </tr>
        
    }
    render() {
        return (
            this.generateRow()
        );
    }
};

export default TableRow;