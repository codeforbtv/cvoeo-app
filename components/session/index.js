// @flow;

import React, {Fragment, useEffect} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actionCreators from './actions';
import type {Node} from 'react';

type Props = {
    actions: Object,
    children: Node,
    loginScreen: Node,
    uid: string,
    userIsLoggedIn: Boolean
};

const Session = ({actions, uid, userIsLoggedIn, loginScreen, children}: Props) => {

    useEffect(() => {
        actions.initialize(uid);
    }, []);

    return !userIsLoggedIn
        ? (<Fragment>{loginScreen}</Fragment>)
        : (<Fragment>{children}</Fragment>);
};


const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actionCreators, dispatch)
});

const mapStateToProps = state => ({
    userIsLoggedIn: Boolean(state.login.userIsLoggedIn),
    uid: (state.login.user || {}).uid
});

export default connect(mapStateToProps, mapDispatchToProps)(Session);
