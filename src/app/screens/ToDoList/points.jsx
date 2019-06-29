import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Button } from '@material-ui/core';
import { addPoint, donePoint, renameValuePoint } from '../../redux/toDoList/actions';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';



class Points extends React.Component {
    state = {
        valuePoint: '',
        renameValue: '',
        clicked: false,
        indexInput: null,
    }

    handleChange = (e) => {
        e.preventDefault();
        this.setState({
            valuePoint: e.target.value,
        })
    }

    newPoint = () => {
        const { valuePoint } = this.state;
        const { indexTask } = this.props;
        const value = valuePoint.charAt(0).toUpperCase() + valuePoint.slice(1);
        this.props.addPoint({ point: { value }, indexTask });
        this.setState({
            valuePoint: ''
        })
    }

    donePoint = (index) => {
        const { indexTask } = this.props;
        this.props.donePoint({ index, indexTask });
        this.setState({
            valuePoint: ''
        })

    }

    renamePoint = (index) => {
        this.setState(prevState => ({
            clicked: !prevState.clicked,
            indexInput: index
        }))
    }

    doRename = (index) => {
        const { renameValue } = this.state;
        const { indexTask } = this.props;
        this.props.renameValuePoint({ renameValue, index, indexTask })
        this.setState(prevState => ({
            clicked: !prevState.clicked,
        }))
    }

    renameInput = (e) => {
        this.setState({
            renameValue: e.target.value,
        })
    }

    render() {
        const { task: { points } } = this.props;
        const { clicked, indexInput } = this.state;
        console.log(points)
        return (
            <Grid
                className="points-wrapper"
                alignItems="center"
                justify="center"
                direction="column"
                container>
                <div className="points">
                    <div className="new-to-do">
                        <Typography>Enter new point</Typography>
                        <div className="new-point">
                            <input type="text" value={this.state.valuePoint} onChange={(e) => this.handleChange(e)} />
                            <Button onClick={this.newPoint}>Add Point</Button>
                        </div>
                    </div>
                    {!!points.length && <div className="points-to-do">
                        <Typography>Your Points:</Typography>
                        {points.map((point, index) => (
                            <div className="point" key={index}>
                                {clicked && index === indexInput ?
                                    <div className="rename-point">
                                        <input type="text" value={this.state.renameValue} onChange={this.renameInput} />
                                        <Button onClick={() => this.doRename(index)}>OK</Button>
                                    </div>
                                    : <Typography>{index + 1}.{point.value}</Typography>}
                                <Button onClick={() => this.donePoint(index)}>Done</Button>
                                <Button onClick={() => this.renamePoint(index)}>Rename</Button>
                            </div>
                        ))}
                    </div>}
                </div>
            </Grid>
        )
    }
}

const mapDispatchToProps = (dispatch) => (
    bindActionCreators({ addPoint, donePoint, renameValuePoint }, dispatch)
);

Points.propTypes = {
    valuePoint: PropTypes.string,
    renameValue: PropTypes.string,
    value: PropTypes.string,
    clicked: PropTypes.bool,
    clickedPoint: PropTypes.bool,
    indexInput: PropTypes.bool,
    indexPoint: PropTypes.bool,
}


export default connect(null, mapDispatchToProps)(Points);

