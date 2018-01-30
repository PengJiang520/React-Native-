import {
    StackNavigator,
    TabNavigator,
} from 'react-navigation';

import List from '../pages/List';
import Detail from '../pages/Detail';

const MyApp = StackNavigator ({
    List:{screen:List},
    Detail:{screen:Detail},
})

export default MyApp;