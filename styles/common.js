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
        borderColor: '#fff',
        borderWidth: 0,
        borderRadius: 20,
        backgroundColor: 'white',
        height: 40,
        textAlign: 'left',
        padding: 5
    },
    button: {
        borderStyle: 'solid',
        borderWidth: 0,
        borderRadius: 20,
        borderColor: colors.buttonColor,
        backgroundColor: '#b3cc95',
        padding: 10,
        marginTop: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.6,
        shadowRadius: 2
    },
    buttonText: {
        color: '#000',
        fontSize: 16,
        fontWeight: 'bold',
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
    label: {
        color: '#fff',
        paddingTop: 5,
        paddingBottom: 2.5
    },
    link: {
        width: '100%',
    },
    linkText: {
        fontSize: 15,
        color: '#fff',
        textAlign: 'right'
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
    titleRow: {
        flex: 10,
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: '#04a0c6',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        backgroundColor: '#04a0c6',
        color: '#fff',
        fontSize: 25,
        fontWeight: 'bold',
        paddingTop: 12,
        paddingBottom: 15,
        alignSelf: 'center',
        textAlign: 'center',
        fontFamily: 'System',
    },
    blackText: {
        color: '#020202',
    },
    greenText: {
        color: '#b3cc95',
    },
    dots: {
        backgroundColor: '#04a0c6',
        flex: 1,
        fontWeight: 'normal',
        fontSize: 20,
        paddingTop: 20,
        paddingRight: 18,
        paddingLeft: 18,
        paddingBottom: 12,
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
        backgroundColor: '#e3f4cf',
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
        backgroundColor: '#cceef6',
        alignItems: 'center',
        borderRadius: 3,
        shadowColor: 'rgba(0, 0, 0, 0.1)',
        shadowOpacity: 0.8,
        elevation: 3,
        shadowRadius: 6,
        shadowOffset: { width: 1, height: 5 },
    },
    dashRow: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: 'transparent',
        alignItems: 'center',
    },
    dashColumn: {
        display: 'flex',
        flexDirection: 'column',
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
        color: '#809f5b',
    },
    completedTitle: {
        color: '#037a96',
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
    circle: {
        backgroundColor: '#fea488',
        width: 40,
        height: 40,
        borderRadius: 20,
        paddingTop: 5,
    },
    circleText: {
        backgroundColor: 'transparent',
        color: '#fff',
        fontSize: 22,
        textAlign: 'center',
        fontFamily: 'System',
    },
    days: {
        alignSelf: 'flex-end',
        color: '#020202',
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
        color: '#037a96',
        fontSize: 20,
        fontWeight: 'bold',
        paddingLeft: 24,
        paddingRight: 24,
        paddingTop: 10,
        fontFamily: 'System',
    },
    bigLetters: {
        fontSize: 40,
        color: '#020202',
    },
    FAIcon: {
        alignItems: 'flex-end',
        color: 'rgba(2,2,2,0.3)',
        fontSize: 20,
        fontWeight: 'bold',
        width: 28,
        height: 28,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 0,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 3,
        textAlign: 'center',
        paddingTop: 6,
        paddingLeft: 3,
    },
    icon1: {
        backgroundColor: '#dddea8',
        color: '#67674e',
    },
    icon2: {
        backgroundColor: '#b3cc95',
        color: '#535f46',
    },
    icon3: {
        backgroundColor: '#51bed9',
        color: '#265865',
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
    money: {
        flex: 1,
        color: '#020202',
        fontWeight: 'bold',
    },
    start: {
        alignSelf: 'flex-start'
    },
    end: {
        alignSelf: 'flex-end'
    },
    bottomLine: {
        display: 'flex',
        alignItems: 'center',
        borderBottomWidth: 2,
        borderColor: 'rgba(0,0,0,0.0)',
        width: 235,
        paddingBottom: 10,
    },

};

export default common;
