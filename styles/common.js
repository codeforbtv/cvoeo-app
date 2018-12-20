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
    block: { paddingTop: 10, paddingBottom: 10, borderBottomWidth: 1, borderColor: 'rgba(0,0,0,0.5)', width: '100%' },
    infoBlock: {
        paddingBottom: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#CCC',
        backgroundColor: '#EEE',
        padding: 10,
        shadowColor: '#FFF',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 1,
        shadowRadius: 0,
        marginBottom: 1

    },
    infoBlockContainer: {
        margin: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
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
    padForIOSKeyboard: { height: 80 },
    padForIOSKeyboardBig: { height: 150 },
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
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 1,
        shadowRadius: 0,
        marginBottom: 1
    },
    scroll: {
        marginBottom: 10,
        paddingLeft: 3,
        paddingRight: 3,
        paddingTop: 10,
        backgroundColor: colors.background
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
    },
    textArea: {
        borderColor: '#333',
        borderWidth: 1,
        padding: 5,
        minHeight: 250,
        backgroundColor: 'white',
        justifyContent: 'flex-start'
    },
    textInput: {
        borderColor: '#000',
        borderWidth: 1,
        backgroundColor: 'white',
        height: 40,
        textAlign: 'left',
        padding: 5
    },
    button: {
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: colors.buttonColor,
        backgroundColor: colors.buttonColor,
        padding: 10,
        marginTop: 10,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.6,
        shadowRadius: 2
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        textAlign: 'center'
    },
    buttonBar: {
        width: '100%',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    buttonBarButton: {
        width: '48%'
    },

    buttonRow: {
        width: '100%',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    goToButton: {
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#AAA',
        height: 30,
        margin: 5
    },
    goButtonText: {
        fontSize: 18,
        color: '#007AFF',
        textAlign: 'center',
        height: 30
    },

    link: {
        width: '100%',
        margin: 5,
        padding: 5
    },
    linkText: {
        fontSize: 16,
        color: 'gray',
        textAlign: 'center'
    },
    searchResultsTitle: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10
    },
    searchResult: {
        marginBottom: 1,
        borderBottomWidth: 1,
        borderBottomColor: '#CCC',
        padding: 10,
        backgroundColor: '#EEE',
        shadowColor: '#FFF',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 1,
        shadowRadius: 0
    },
    main: {
        backgroundColor: '#fff',
    },
    container: {
        flex: 1,
        backgroundColor: 'transparent',
        alignSelf: 'stretch',
    },
    title: {
        backgroundColor: '#4a6a7c',
        color: '#fff',
        fontSize: 25,
        fontWeight: 'bold',
        paddingTop: 15,
        paddingBottom: 15,
        alignSelf: 'stretch',
        textAlign: 'center',
        fontFamily: 'System',
    },
    padding: {
        paddingTop: 8,
        paddingLeft: 9,
        paddingRight: 9,
        paddingBottom: 0,
    },
    upcomingBox: {
        flex: 1,
        backgroundColor: '#fcf8e8',
        alignItems: 'center',
        borderRadius: 3,
        shadowColor: 'rgba(0, 0, 0, 0.1)',
        shadowOpacity: 0.8,
        elevation: 3,
        shadowRadius: 6,
        shadowOffset: { width: 1, height: 5 },
    },
    progressBox: {
        flex: 1,
        backgroundColor: '#fdfffb',
        alignItems: 'center',
        borderRadius: 3,
        shadowColor: 'rgba(0, 0, 0, 0.1)',
        shadowOpacity: 0.8,
        elevation: 3,
        shadowRadius: 6,
        shadowOffset: { width: 1, height: 5 },
    },
    goalsBox: {
        flex: 1,
        backgroundColor: '#ddebdf',
        alignItems: 'center',
        borderRadius: 3,
        shadowColor: 'rgba(0, 0, 0, 0.1)',
        shadowOpacity: 0.8,
        elevation: 3,
        shadowRadius: 6,
        shadowOffset: { width: 1, height: 5 },
    },
    completedBox: {
        flex: 1,
        backgroundColor: '#c4e8f3',
        alignItems: 'center',
        borderRadius: 3,
        shadowColor: 'rgba(0, 0, 0, 0.1)',
        shadowOpacity: 0.8,
        elevation: 3,
        shadowRadius: 6,
        shadowOffset: { width: 1, height: 5 },
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: 'transparent',
        alignItems: 'center',
    },
    bigBlock: {
        backgroundColor: 'transparent',
        flex: 5,
        alignItems: 'center',
        padding: 2,
    },
    biggerBlock: {
        backgroundColor: 'transparent',
        flex: 9,
        alignItems: 'center',
        padding: 2,
    },
    smallBlock: {
        backgroundColor: 'transparent',
        flexDirection: 'row',
        flex: 3,
        alignItems: 'flex-start',
    },
    smallerBlock: {
        backgroundColor: 'transparent',
        flex: 1,
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
    },
    blockTitle: {
        alignItems: 'flex-start',
        color: 'rgba(2,2,2,0.34)',
        fontSize: 16,
        fontWeight: 'bold',
        paddingTop: 6,
        paddingLeft: 7,
        paddingBottom: 5,
        alignSelf: 'stretch',
        textAlign: 'left',
        fontFamily: 'System',
    },
    upcomingTitle: {
        color: '#afb066',
    },
    goalsTitle: {
        color: '#8e9d91',
    },
    completedTitle: {
        color: '#4a6a7c',
    },
    subTitle: {
        alignItems: 'center',
        color: '#dc552b',
        fontSize: 17,
        fontWeight: 'bold',
        paddingTop: 1,
        alignSelf: 'stretch',
        textAlign: 'left',
        fontFamily: 'System',
    },
    subText: {
        backgroundColor: 'transparent',
        alignItems: 'center',
        color: '#555',
        fontSize: 16,
        alignSelf: 'stretch',
        textAlign: 'left',
        fontFamily: 'System',
    },
    days: {
        alignSelf: 'flex-end',
        color: '#9d9d9d',
        fontSize: 14,
        paddingBottom: 1,
        paddingLeft: 2,
        textAlign: 'center',
        fontFamily: 'System',
    },
    spaceRow: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    bigTitle: {
        color: '#38515e',
        fontSize: 20,
        fontWeight: 'bold',
        paddingLeft: 24,
        paddingRight: 24,
        paddingTop: 10,
        fontFamily: 'System',
    },
    bigLetters: {
        fontSize: 40,
    },
    FAIcon: {
        alignItems: 'flex-end',
        color: 'rgba(2,2,2,0.3)',
        fontSize: 20,
        fontWeight: 'bold',
        backgroundColor: 'rgba(50,50,50,0.2)',
        width: 28,
        height: 28,
        borderTopLeftRadius: 14,
        borderBottomRightRadius: 3,
        textAlign: 'center',
        paddingTop: 5,
        paddingLeft: 2,
    },
    dashButton: {
        backgroundColor: 'transparent',
    },
    moreButton: {
        backgroundColor: 'transparent',
        alignItems: 'flex-end',
        paddingTop: 3,
        alignSelf: 'stretch',
    },
    circle: {
        backgroundColor: '#fea488',
        color: '#fff',
        fontSize: 22,
        width: 40,
        height: 40,
        borderRadius: 20,
        textAlign: 'center',
        paddingTop: 4,
        fontFamily: 'System',
    },
    bigCircle: {
        backgroundColor: 'transparent',
        color: '#d4af37',
        fontSize: 60,
        textShadowColor: 'rgba(8, 6, 3, 0.75)',
        textShadowOffset: { width: -1, height: -1 },
        textShadowRadius: 10,
        paddingTop: 45,
        width: 180,
        height: 180,
        borderWidth: 6,
        borderColor: '#d4af37',
        borderRadius: 90,
        textAlign: 'center',
    },
    money: {
        flex: 1,
        color: '#38515e',
        fontWeight: 'bold',
    },
    start: {
        alignSelf: 'flex-start'
    },
    end: {
        alignSelf: 'flex-end'
    },
    diagonalLine: {
        position: 'absolute',
        bottom: -45,
        left: -8,
        backgroundColor: 'rgba(215,210,160, 0.0)',
        width: 80,
        height: 130,
        borderRightWidth: 2,
        borderColor: '#38515e',
        transform: [{ rotate: '-45deg' }],
    },
    arrow: {
        fontSize: 22,
        color: '#38515e',
        transform: [{ rotate: '135deg' }],
        position: 'absolute',
        top: 0,
        left: 8,
    },
    cone: {
        width: 0,
        height: 0,
        borderLeftWidth: 45,
        borderLeftColor: 'transparent',
        borderRightWidth: 44,
        borderRightColor: 'transparent',
        borderTopWidth: 101,
        borderTopColor: 'rgba(238,238,194, 1)',
        transform: [{ rotate: '-67.5deg' }],
        position: 'absolute',
        bottom: -19,
        left: 25.5,
        zIndex: 0,
    },
    bottomLine: {
        display: 'flex',
        alignItems: 'center',
        borderBottomWidth: 2,
        borderColor: 'rgba(0,0,0,0.0)',
        width: 235,
        paddingBottom: 10,
    },
    semiCircle: {
        flex: 10,
        backgroundColor: 'transparent',
        width: 220,
        height: 110,
        borderWidth: 7,
        borderBottomWidth: 0,
        borderColor: '#fea488',
        borderTopLeftRadius: 110,
        borderTopRightRadius: 110,
        alignItems: 'center',
        zIndex: 1,
    },

};

export default common;
