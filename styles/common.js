// const backgroundLight = 'white';
import colors from '../constants/colors';

const common = {
    // container: {
    //     flex: 1,
    //     justifyContent: 'flex-start'
    // },
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
        padding: 5,
        paddingLeft: 20
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
        shadowOffset: {width: 0, height: 2},
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
        width: '100%'
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
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 1,
        shadowRadius: 0
    },
    main: {
        flex: 1,
        backgroundColor: 'transparent',
        alignSelf: 'stretch'
    },
    container: {
        flex: 1,
        backgroundColor: 'transparent',
        alignSelf: 'stretch'
    },
    titleRow: {
        flex: 10,
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        backgroundColor: 'transparent',
        color: '#000',
        fontSize: 25,
        fontWeight: 'bold',
        paddingTop: 12,
        paddingBottom: 15,
        textAlign: 'center',
        fontFamily: 'System'
    },
    blackText: {
        color: '#020202'
    },
    greenText: {
        color: '#b3cc95'
    },
    dots: {
        flex: 1
    },
    padding: {
        paddingTop: 8,
        paddingLeft: 9,
        paddingRight: 9,
        paddingBottom: 0
    },
    goalsBox: {
        flex: 1,
        backgroundColor: '#fcf8e8',
        alignItems: 'center',
        borderRadius: 3,
        shadowColor: 'rgba(0, 0, 0, 0.1)',
        shadowOpacity: 0.8,
        elevation: 3,
        shadowRadius: 6,
        shadowOffset: {width: 1, height: 5}
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
        shadowOffset: {width: 1, height: 5}
    },
    completedBox: {
        flex: 1,
        backgroundColor: '#e3f4cf',
        alignItems: 'center',
        borderRadius: 3,
        shadowColor: 'rgba(0, 0, 0, 0.1)',
        shadowOpacity: 0.8,
        elevation: 3,
        shadowRadius: 6,
        shadowOffset: {width: 1, height: 5}
    },
    upcomingBox: {
        flex: 1,
        backgroundColor: '#cceef6',
        alignItems: 'center',
        borderRadius: 3,
        shadowColor: 'rgba(0, 0, 0, 0.1)',
        shadowOpacity: 0.8,
        elevation: 3,
        shadowRadius: 6,
        shadowOffset: {width: 1, height: 5}
    },
    dashRow: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: 'transparent',
        alignItems: 'center',
        zIndex: 100
    },
    dashColumn: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'transparent',
        alignItems: 'center'
    },
    bigBlock: {
        backgroundColor: 'transparent',
        flex: 5,
        alignItems: 'center',
        padding: 2
    },
    biggerBlock: {
        backgroundColor: 'transparent',
        flex: 9,
        alignItems: 'center',
        padding: 1
    },
    smallBlock: {
        backgroundColor: 'transparent',
        flexDirection: 'row',
        flex: 3,
        alignItems: 'flex-start'
    },
    smallerBlock: {
        backgroundColor: 'transparent',
        flex: 1,
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column'
    },
    blockTitle: {
        alignItems: 'flex-start',
        color: 'rgba(2,2,2,0.34)',
        fontSize: 14.5,
        fontWeight: 'bold',
        paddingTop: 30,
        paddingLeft: 30,
        paddingBottom: 5,
        alignSelf: 'stretch',
        textAlign: 'left',
        fontFamily: 'System'
    },
    goalsTitle: {
        color: '#afb066'
    },
    completedTitle: {
        color: '#809f5b'
    },
    upcomingTitle: {
        color: '#037a96'
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
    subText: {
        backgroundColor: 'transparent',
        alignItems: 'center',
        color: '#555',
        fontSize: 14,
        alignSelf: 'stretch',
        textAlign: 'left',
        fontFamily: 'System'
    },
    circle: {
        backgroundColor: '#fea488',
        width: 40,
        height: 40,
        borderRadius: 20,
        paddingTop: 5
    },
    circleText: {
        backgroundColor: 'transparent',
        color: '#fff',
        fontSize: 22,
        textAlign: 'center',
        fontFamily: 'System'
    },
    days: {
        alignSelf: 'flex-end',
        color: '#020202',
        fontSize: 14,
        paddingBottom: 1,
        paddingLeft: 2,
        textAlign: 'center',
        fontFamily: 'System'
    },
    spaceRow: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    bigTitle: {
        color: '#037a96',
        fontSize: 18,
        fontWeight: 'bold',
        paddingLeft: 24,
        paddingRight: 24,
        paddingTop: 24,
        fontFamily: 'System'
    },
    bigLetters: {
        fontSize: 40,
        color: '#020202',
        paddingTop: 10
    },
    FAIconView: {
        alignItems: 'flex-end',
        color: 'rgba(2,2,2,0.3)',
        width: 28,
        height: 28,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 0,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 3
    },
    FAIcon: {
        alignItems: 'flex-end',
        backgroundColor: 'transparent',
        color: 'rgba(2,2,2,0.3)',
        fontSize: 20,
        fontWeight: 'bold',
        width: 28,
        height: 28,
        textAlign: 'center',
        paddingTop: 6,
        paddingLeft: 3
    },
    icon2: {
        color: '#67674e'
    },
    icon2Bg: {
        backgroundColor: '#dddea8'
    },
    icon3: {
        color: '#535f46'
    },
    icon3Bg: {
        backgroundColor: '#b3cc95'
    },
    icon1: {
        color: '#265865'
    },
    icon1Bg: {
        backgroundColor: '#51bed9'
    },
    dashButton: {
        backgroundColor: 'transparent'
    },
    moreButton: {
        backgroundColor: 'transparent',
        alignItems: 'flex-end',
        paddingTop: 3,
        alignSelf: 'stretch'
    },
    money: {
        flex: 1,
        color: '#020202',
        fontWeight: 'bold',
        paddingBottom: 4
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
        width: 202,
        paddingBottom: 20
    },
    ellipsis: {
        marginTop: 16,
        marginBottom: 8,
        fontWeight: 'bold',
        fontSize: 19,
        // fontWeight: '600',
        textAlign: 'center'
    },
    circleOuter: {
        flex: 1,
        position: 'absolute',
        top: -150,
        left: -150,
        backgroundColor: '#04a0c6',
        width: 400,
        height: 400,
        borderRadius: 400 / 2,
        zIndex: -2
    },
    circleInner: {
        flex: 1,
        position: 'absolute',
        top: 0,
        left: 0,
        backgroundColor: '#ffffff',
        width: 75,
        height: 75,
        borderRadius: 75 / 2,
        zIndex: -1
    },
    logoutText: {
        color: '#ffffff',
        fontWeight: 'bold',
        position: 'absolute',
        top: 150,
        left: 40
    }

};

export default common;
