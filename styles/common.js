// const backgroundLight = 'white';
import colors from '../constants/colors';

const common = {
    container: {
        flex: 1,
        justifyContent: 'flex-start'
    },
    fieldset: {
        borderWidth: 2,
        borderColor: '#000',
        borderRadius: 5,
        padding: 5
    },
    frame: {
        backgroundColor: colors.background,
        height: '100%',
        width: '100%'
    },
    block: {paddingTop: 10, paddingBottom: 10, borderBottomWidth: 1, borderColor: 'rgba(0,0,0,0.5)', width: '100%'},
    infoBlock: {
        paddingBottom: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#CCC',
        backgroundColor: '#EEE',
        padding: 10,
        shadowColor: '#FFF',
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 1,
        shadowRadius: 0,
        marginBottom: 1

    },
    infoBlockContainer: {
        margin: 5,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.6,
        shadowRadius: 2,
        padding: 10,
        backgroundColor: '#EEE'
    },
    infoBlockHeader: {
        color: '#444',
        fontWeight: 'bold',
        fontSize: 22,
        textAlign: 'center',
        padding: 10,
        marginBottom: 0,
        paddingBottom: 5,
        marginTop: 10,
        backgroundColor: '#EEE'
    },
    padForIOSKeyboard: {height: 80},
    padForIOSKeyboardBig: {height: 150},
    profileHeader: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#000',
        backgroundColor: '#EEE'
    },
    profileName: {
        paddingLeft: 10,
        paddingTop: 12.5,
        fontSize: 20
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        borderBottomWidth: 1,
        borderBottomColor: '#CCC',
        height: 70,
        backgroundColor: '#EEE',
        alignItems: 'stretch',
        padding: 10,
        shadowColor: '#FFF',
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 1,
        shadowRadius: 0,
        marginBottom: 1
    },
    scroll: {
        marginBottom: 10,
        paddingLeft: 3,
        paddingRight: 3,
        paddingTop: 10,
        backgroundColor: colors.background,
    },
    searchHeader: {
        backgroundColor: colors.background,
        paddingTop: 10, paddingBottom: 9, paddingLeft: 12, paddingRight: 12,
        borderBottomWidth: 1,
        borderColor: 'black'
    },
    statusBar: {
        height: 60,
        width: '100%',
        marginBottom: 10,
        flex: 1,
        flexDirection: 'row',
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 5,
        paddingBottom: 5,
        backgroundColor: 'rgba(255,255,255,0.6)'
    },
    suggestion: {
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 5,
        borderColor: '#ABABAB',
        borderBottomWidth: 1
    }
};

export default common;
