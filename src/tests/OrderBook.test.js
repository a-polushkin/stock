import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import OrderBook from "../app/OrderBook/components/OrderBook";

describe('My Connected React-Redux Component', () => {
    let store;
    let component;

    beforeEach(() => {
        store = {
            bids: {
                28014: {amount: 0.43454631, count: 4, price: 28014},
                28015: {amount: 0.08539012, count: 1, price: 28015},
                28016: {amount: 0.35873593, count: 3, price: 28016},
                28017: {amount: 0.1063042, count: 1, price: 28017},
                28019: {amount: 2.265256, count: 2, price: 28019},
                28020: {amount: 0.49950153, count: 3, price: 28020},
                28021: {amount: 0.22506023, count: 1, price: 28021},
                28022: {amount: 2.89086311, count: 3, price: 28022},
                28023: {amount: 3.03463911, count: 6, price: 28023},
                28024: {amount: 1.12395495, count: 5, price: 28024},
                28026: {amount: 0.04956867, count: 1, price: 28026},
                28027: {amount: 0.0333037, count: 1, price: 28027},
                28028: {amount: 0.21377409, count: 2, price: 28028},
                28029: {amount: 0.0843, count: 1, price: 28029}
            },
            asks: {
                28044: {amount: -0.02354001, count: 1, price: 28044},
                28045: {amount: -0.02354001, count: 1, price: 28045},
                28046: {amount: -0.17136, count: 4, price: 28046},
                28047: {amount: -0.00125, count: 1, price: 28047},
                28048: {amount: -0.24741216, count: 2, price: 28048},
                28049: {amount: -0.09439947, count: 2, price: 28049},
                28050: {amount: -0.15176349, count: 2, price: 28050},
                28051: {amount: -0.53105759, count: 5, price: 28051},
                28052: {amount: -0.64438301, count: 5, price: 28052},
                28053: {amount: -2.3866, count: 2, price: 28053},
                28054: {amount: -0.25598506, count: 1, price: 28054},
                28055: {amount: -0.23164833, count: 2, price: 28055},
                28056: {amount: -0.4529, count: 2, price: 28056},
                28057: {amount: -1.06331941, count: 4, price: 28057}
            },
            unsubscribe: jest.fn()
        };
        component = render(<OrderBook bids={store.bids} asks={store.asks} unsubscribe={store.unsubscribe}/>);
    });

    test('it should render without crashing', () => {
        expect(component.container).toBeInTheDocument();
    });

    test('Count bars', () => {
        expect(component.container.querySelectorAll('rect').length).toEqual(Object.keys(store.bids).length + Object.keys(store.asks).length );
    });

    test('should dispatch an action on button click', () => {
        const incrementButton = component.getByText('Unsubscribe');
        fireEvent.click(incrementButton);
        expect(store.unsubscribe).toHaveBeenCalledTimes(1);
    });


});