import React, {Component} from 'react';
import DashboardCard from './DashboardCard'
import moment from 'moment'
import AppLabels from '../../AppLabels'

export default class AppointmentCard extends Component {
    static propTypes = {
        reserved: React.PropTypes.object,
        packages: React.PropTypes.array,
    }
    render() {
        if(!this.props.reserved)
            return null;

        let selectedPackage = this.props.packages[this.props.reserved.package_id_fk];
        let description = AppLabels.DashboardScreen.bookFor.replace("$date", moment(this.props.reserved.reserveDate).format(AppLabels.Common.dateFormat))
            + "(" + selectedPackage.title + ").";

        return (
            <DashboardCard
                type={DashboardCard.TYPE.FINISH}
                title={AppLabels.Common.appointment.toLocaleUpperCase()}
                date={this.props.reserved.createdAt}
                description={description}
            />
        )
    }
}