import renderer from 'react-test-renderer';
import {Provider} from "react-redux";
import store from "../redux/store";
import OrderBookContainer from "../app/OrderBook/containers/OrderBookContainer";


describe("OrderBookContainer rendering specification", () => {
    test('OrderBookContainer is rendered without crash', () => {
        const component = renderer.create(
            <Provider store={store}>
                <OrderBookContainer/>
            </Provider>
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});