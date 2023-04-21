import App from '../App';
import renderer from 'react-test-renderer';
import {Provider} from "react-redux";
import store from "../redux/store";


describe("App rendering specification", () => {
    test('App is rendered without crash', () => {
        const component = renderer.create(
            <Provider store={store}>
                <App/>
            </Provider>
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});