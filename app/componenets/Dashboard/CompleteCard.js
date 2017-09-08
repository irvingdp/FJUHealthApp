import React, {Component} from 'react';
import DashboardCard from './DashboardCard'
import moment from 'moment'
import AppLabels from '../../AppLabels'

export default class CompleteCard extends Component {
    static propTypes = {
        type: React.PropTypes.string,
        reserved: React.PropTypes.object,
    }
    render() {
        return (
            <DashboardCard
                type={this.props.type}
                title={AppLabels.Common.complete}
                date={moment(this.props.reserved.reserveDate).format("YYYY-MM-DD")}
                description={AppLabels.DashboardScreen.comeOnTime}
            />
        )
    }
}