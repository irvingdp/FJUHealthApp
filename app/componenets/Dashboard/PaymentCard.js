import React, {Component} from 'react';
import DashboardCard from './DashboardCard'
import AppLabels from '../../AppLabels'

export default class PaymentCard extends Component {
    static propTypes = {
        reserved: React.PropTypes.object,
    }
    render() {
        if(!this.props.reserved)
            return null;

        //TODO: payment finished wording?
        let description = this.props.reserved.paymentDate ? AppLabels.DashboardScreen.paymentFinished : AppLabels.DashboardScreen.proceedPayment;

        return (
            <DashboardCard
                type={this.props.reserved.paymentDate ? DashboardCard.TYPE.FINISH : DashboardCard.TYPE.PENDING}
                title={AppLabels.Common.payment.toLocaleUpperCase()}
                date={this.props.reserved.paymentDate && this.props.reserved.paymentDate}
                description={description}
                buttonText={this.props.reserved.paymentDate ? "" : AppLabels.Common.howToMakePayment}
                onButtonPress={() => 0}
            />
        )
    }
}