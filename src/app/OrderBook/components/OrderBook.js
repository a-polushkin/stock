import React from "react";
import _ from "lodash";

const totalReducer = (acc, item, index) => [
    ...acc,
    {
        ...item,
        total:
            index - 1 > 0
                ? acc[index - 1].total + Math.abs(item.amount)
                : Math.abs(item.amount)
    }
];

const OrderBook = ({ bids, asks, unsubscribe }) => {
    if (!bids || !Object.keys(bids).length) return <div/>;

    const format5 = new Intl.NumberFormat("en-US", {
        maximumSignificantDigits: 5
    }).format;
    const format = new Intl.NumberFormat("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format;

    const bidsSorted = _.orderBy(bids, ["price"], ["desc"]).reduce(
        totalReducer,
        []
    );
    const asksSorted = _.orderBy(asks, ["price"], ["asc"]).reduce(
        totalReducer,
        []
    );
    const maxTotal = Math.max(
        bidsSorted[bidsSorted.length - 1].total,
        asksSorted[asksSorted.length - 1].total
    );

    return (
        <div className="container">
            <div className="title">
                ORDER BOOK BTC/USD
                <button onClick={() => unsubscribe()}>Unsubscribe</button>
            </div>
            <div className="table">
                <table className="bids">
                    <thead className="header">
                    <td className="cell">Count</td>
                    <td className="cell">Amount</td>
                    <td className="cell">Total</td>
                    <td className="cell">Price</td>
                    </thead>
                    <div className="bars">
                        <svg
                            style={{
                                width: "100%",
                                height: "425px",
                                transform: "scale(-1, 1)",
                                zIndex: 0,
                                pointerEvents: "none"
                            }}
                        >
                            {_.map(bidsSorted, ({price, count, amount, total}, index) => (
                                <rect
                                    key={price}
                                    x="1"
                                    y={17 * index}
                                    width={`${(total / maxTotal) * 100}%`}
                                    height="17"
                                    fill="#01a781"
                                    fillOpacity="0.2"
                                />
                            ))}
                        </svg>
                    </div>
                    <tbody>
                    {_.map(bidsSorted, ({price, count, amount, total}) => (
                        <tr className="row" key={price}>
                            <td className="cell">{count}</td>
                            <td className="cell">{format(amount)}</td>
                            <td className="cell">{format(total)}</td>
                            <td className="cell">{format5(price)}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <table className="asks">
                    <thead className="header">
                    <td className="cell">Price</td>
                    <td className="cell">Total</td>
                    <td className="cell">Amount</td>
                    <td className="cell">Count</td>
                    </thead>
                    <div className="bars">
                        <svg className="bars-svg">
                            {_.map(asksSorted, ({price, count, amount, total}, index) => (
                                <rect
                                    key={price}
                                    x="1"
                                    y={17 * index}
                                    width={`${(total / maxTotal) * 100}%`}
                                    height="17"
                                    fill="#e44b44"
                                    fillOpacity="0.2"
                                />
                            ))}
                        </svg>
                    </div>
                    <tbody>
                    {_.map(asksSorted, ({price, count, amount, total}) => (
                        <tr className="row" key={price}>
                            <td className="cell">{format5(price)}</td>
                            <td className="cell">{format(total)}</td>
                            <td className="cell">{format(-amount)}</td>
                            <td className="cell">{count}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default OrderBook;
