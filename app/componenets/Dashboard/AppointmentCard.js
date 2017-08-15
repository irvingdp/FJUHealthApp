import React, {Component} from 'react';
import DashboardCard from './DashboardCard'
import moment from 'moment'

export default class AppointmentCard extends Component {
    static propTypes = {
        reserved: React.PropTypes.object,
        packages: React.PropTypes.array,
    }
    render() {
        if(!this.props.reserved)
            return null;

        let selectedPackage = this.props.packages[this.props.reserved.package_id_fk];
        let description = "You have booked an appointment for " + moment(this.props.reserved.reserveDate).format("DD MMM YYYY") + "(" + selectedPackage.title + ").";

        return (
            <DashboardCard
                type={DashboardCard.TYPE.FINISH}
                title={"APPOINTMENT"}
                date={this.props.reserved.createdAt}
                description={description}
            />
        )
    }
}