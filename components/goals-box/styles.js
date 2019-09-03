// @flow
const boxPadding = 20;

const styles = {
    goalsBox: {
        backgroundColor: '#fcf8e8',
        borderRadius: 3,
        shadowColor: 'rgba(0, 0, 0, 0.1)',
        shadowOpacity: 0.8,
        elevation: 3,
        shadowRadius: 6,
        shadowOffset: {width: 1, height: 5},
        marginTop: 4,
        marginLeft: 9,
        marginRight: 9,
        marginBottom: 4,
        padding: 0,
        paddingBottom: 50
    },
    goalsTitle: {
        alignItems: 'flex-start',
        color: 'rgba(2,2,2,0.34)',
        fontSize: 14.5,
        fontWeight: 'bold',
        marginTop: boxPadding,
        marginLeft: boxPadding,
        marginRight: boxPadding,
        marginBottom: boxPadding / 2,
        alignSelf: 'stretch',
        textAlign: 'left',
        fontFamily: 'System'
    },

    goalCompleteIcon: {
        width: 20,
        height: 20,
        color: 'white',
        flexDirection: 'row'
    },
    goalDateBlock: {
        paddingTop: 5
    },
    goalDateIcon: {
        width: 20,
        height: 20,
        flexDirection: 'row'
    },
    goalSectionTitle: {
        color: '#afb066'
    },
    hr: {height: 2, backgroundColor: '#DFDDB7', width: '100%'},
    icon1: {
        color: '#265865'
    },
    icon1Bg: {
        backgroundColor: '#51bed9'
    },
    moreButton: {
        backgroundColor: 'transparent',
        alignItems: 'flex-end',
        paddingTop: 3,
        alignSelf: 'stretch'
    },
    subText: {
        backgroundColor: 'transparent',
        alignItems: 'center',
        color: '#555',
        fontSize: 14,
        alignSelf: 'stretch',
        textAlign: 'left',
        fontFamily: 'System'
    },
    subTitle: {
        alignItems: 'center',
        color: '#dc552b',
        fontSize: 14,
        fontWeight: 'bold',
        paddingTop: 1,
        alignSelf: 'stretch',
        textAlign: 'left',
        fontFamily: 'System'
    },
    expandButton:{
        position: 'absolute',
        bottom: 0,
        right: 0
    }
};

export default styles;
