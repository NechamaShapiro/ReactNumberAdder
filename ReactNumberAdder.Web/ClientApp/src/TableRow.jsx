import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

class TableRow extends React.Component {
    generateRow = () => {
        if (!this.props.num.selected) {
            return <tr>
                <td>{this.props.num.num}</td>
                <td>
                    <button className='btn btn-primary' id={this.props.num.id} value={this.props.num.num} onClick={this.props.onSelectClick}>Add to Selected</button>
                </td>
            </tr>
        }
        return <tr>
            <td>{this.props.num.num}</td>
            <td>
                <button className='btn btn-danger' id={this.props.num.id} value={this.props.num.num} onClick={this.props.onSelectClick}>Remove from Selected</button>
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