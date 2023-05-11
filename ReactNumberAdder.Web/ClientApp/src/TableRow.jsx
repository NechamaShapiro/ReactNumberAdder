import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

class TableRow extends React.Component {
    
    generateRow = () => {
            return <tr>
                <td>{this.props.num.num}</td>
                <td>
                    <button className={`${!this.props.num.selected ? 'btn btn-primary' : 'btn btn-danger'}`} disabled={this.props.isLocked} id={this.props.num.id} value={this.props.num.num} onClick={this.props.onSelectClick}>{`${!this.props.num.selected ? 'Add to Selected' : 'Remove from Selelcted'}`}</button>
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