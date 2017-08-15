import React, {Component} from 'react';
import DashboardCard from './DashboardCard'
import moment from 'moment'

export default class CompleteCard extends Component {
    static propTypes = {
        type: React.PropTypes.string,
        reserved: React.PropTypes.object,
    }
    render() {
        return (
            <DashboardCard
                type={this.props.type}
                title={"COMPLETE"}
                date={moment(this.props.reserved.reserveDate).format("YYYY-MM-DD")}
                description={"You are ready for your examination today. Please come on time. See you!"}
            />
        )
    }
}