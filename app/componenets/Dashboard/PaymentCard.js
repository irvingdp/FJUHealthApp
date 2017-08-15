import React, {Component} from 'react';
import DashboardCard from './DashboardCard'

export default class PaymentCard extends Component {
    static propTypes = {
        reserved: React.PropTypes.object,
    }
    render() {
        if(!this.props.reserved)
            return null;

        //TODO: payment finished wording?
        let description = this.props.reserved.paymentDate ? "payment finished." : "Please proceed with making payment to complete your reservation.";

        return (
            <DashboardCard
                type={this.props.reserved.paymentDate ? DashboardCard.TYPE.FINISH : DashboardCard.TYPE.PENDING}
                title={"PAYMENT"}
                date={this.props.reserved.paymentDate && this.props.reserved.paymentDate}
                description={description}
                buttonText={"How To Make Payment"}
                onButtonPress={() => 0}
            />
        )
    }
}