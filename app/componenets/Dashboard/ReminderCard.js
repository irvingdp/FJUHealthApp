import React, {Component} from 'react';
import DashboardCard from './DashboardCard'

export default class PaymentCard extends Component {
    static propTypes = {
        reminder: React.PropTypes.object,
        buttonText: React.PropTypes.string,
        onButtonPress: React.PropTypes.func,
    }
    render() {
        if(!this.props.reminder)
            return null;

        return (
            <DashboardCard
                type={this.props.reminder.type}
                title={this.props.reminder.title}
                date={this.props.reminder.date}
                dateFormat={"YYYY-MM-DD HH:MM"}
                description={this.props.reminder.description}
                buttonText={this.props.buttonText}
                onButtonPress={this.props.onButtonPress}

            />
        )
    }
}