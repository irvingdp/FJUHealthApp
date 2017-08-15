import React, {Component} from 'react';
import DashboardCard from './DashboardCard'

export default class PackageCard extends Component {
    static propTypes = {
        reserved: React.PropTypes.object,
    }
    _getType() {
        if(this.props.reserved.paymentDate && !this.props.reserved.sentPackageDate) {
            return DashboardCard.TYPE.PENDING
        } else if(!this.props.reserved.paymentDate && !this.props.reserved.sentPackageDate) {
            return DashboardCard.TYPE.COMING
        }  else if(this.props.reserved.sentPackageDate) {
            return DashboardCard.TYPE.FINISH
        }
    }
    render() {
        if(!this.props.reserved)
            return null;

        //TODO: package sent wording?
        let description = this.props.reserved.sentPackageDate ?
            "package sent." : "We will send you a package with Checkup Manual, Speciment Collector and Complimentary Diet.";
        return (
            <DashboardCard
                type={this._getType()}
                title={"PACKAGE"}
                date={this.props.reserved.sentPackageDate && this.props.reserved.sentPackageDate}
                description={description}
            />
        )
    }
}