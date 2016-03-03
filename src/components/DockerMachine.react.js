import React from 'react/addons';
import metrics from '../utils/MetricsUtil';
import utils from '../utils/Util';
import Router from 'react-router';
import DockerMachineUtil from '../utils/DockerMachineUtil';
var packages;

try {
    packages = utils.packagejson();
} catch (err) {
    packages = {};
}

var DockerMachine = React.createClass({
    mixins: [Router.Navigation],
    getInitialState: function () {
        return {
            metricsEnabled: metrics.enabled(),
            status: null,
        };
    },
    handleGoBackClick: function () {
        this.goBack();
        metrics.track('Went Back From DockerMachine');
    },
    getInfos: function () {
        DockerMachineUtil.status().then((data) => {
            this.setState({
                status: data,
            });
        });
    },
    renderMachine: function () {
        return (
            <div>
                <span>{DockerMachineUtil.name()}</span>
                <span>{this.state.status}</span>
            </div>
        );
    },
    render: function () {
        this.getInfos();

        return (
            <div className="docker-machine" >
            <div className="about-content" >
            <a onClick={this.handleGoBackClick}>Go Back</a>

                {this.renderMachine()}
            </div>
            </div>
    );
  }
});

module.exports = DockerMachine;
