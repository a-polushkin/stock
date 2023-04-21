import renderer from 'react-test-renderer';
import {Provider} from "react-redux";
import store from "../redux/store";
import RootContainer from "../app/Root/containers/RootContainer";


describe("RootContainer rendering specification", () => {
    test('RootContainer is rendered without crash', () => {
        const component = renderer.create(
            <Provider store={store}>
                <RootContainer/>
            </Provider>
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});