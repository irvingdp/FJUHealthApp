import React, {Component} from 'react';
import DashboardCard from './DashboardCard'
import AppLabels from '../../AppLabels'

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
            AppLabels.DashboardScreen.packageSent : AppLabels.DashboardScreen.packageWillSend;
        return (
            <DashboardCard
                type={this._getType()}
                title={AppLabels.Common.package.toLocaleUpperCase()}
                date={this.props.reserved.sentPackageDate && this.props.reserved.sentPackageDate}
                description={description}
            />
        )
    }
}