// @flow;

import React, {Component, Fragment} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actions from './actions';
import type {Node} from 'react';

type Props = {
    actions: Object,
    children: Node,
    loginScreen: Node,
    userIsLoggedIn: Boolean
};

class Session extends Component<Props> {

    componentDidMount() {
        this.props.actions.initialize();
    }

    render() {
        const {userIsLoggedIn, children, loginScreen} = this.props;
        return !userIsLoggedIn
            ? (<Fragment>{loginScreen}</Fragment>)
            : (<Fragment>{children}</Fragment>);
    }
}

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch)
});

const mapStateToProps = state => ({
    userIsLoggedIn: Boolean(state.login.userIsLoggedIn)
});

export default connect(mapStateToProps, mapDispatchToProps)(Session);
