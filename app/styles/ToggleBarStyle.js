import {Colors, Texts, Shapes} from './BaseStyles'

export default ToggleBarStyle = {
    styles: {},
    header: {
        styles: {
            backgroundColor: Colors.white,
            flexDirection: 'row',
            alignItems: 'center',
            height: 50,
            paddingLeft: 20,
            paddingRight: 15,
            ...Shapes.bottomGreyBorder,
        },

        icon: {
            styles: {
                width: 18,
                height: 18,
                marginLeft: 5
            }
        },

        title: {
            styles: {
                backgroundColor: Colors.black,
                ...Texts.Font_14_900,
                letterSpacing: 1,
                flex: 0
            }
        },

        secondTitle: {
            styles: {
                backgroundColor: Colors.black,
                ...Texts.Font_14_900,
                flex: 0
            }
        },
    },

    content: {
        styles: {
            backgroundColor: Colors.grey,
            padding: 12,
        },

        _noPadTop: {
            styles: {
                backgroundColor: Colors.grey,
                padding: 12,
                paddingTop: 0
            }
        }
    }
}
