import React from "react";
import _ from "lodash";

const OrderBook = ({ bids, asks, unsubscribe }) => {
    if (!bids || !Object.keys(bids).length) return <div/>;

    const format5 = new Intl.NumberFormat("en-US", {
        maximumSignificantDigits: 5
    }).format;
    const format = new Intl.NumberFormat("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format;

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
                <button onClick={unsubscribe}>Unsubscribe</button>
            </div>
            <div className="table">
                <div className="bids">
                    <div className="header">
                    <div className="cell">Count</div>
                    <div className="cell">Amount</div>
                    <div className="cell">Total</div>
                    <div className="cell">Price</div>
                    </div>
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
                    <div>
                    {_.map(bidsSorted, ({price, count, amount, total}) => (
                        <div className="row" key={price}>
                            <div className="cell">{count}</div>
                            <div className="cell">{format(amount)}</div>
                            <div className="cell">{format(total)}</div>
                            <div className="cell">{format5(price)}</div>
                        </div>
                    ))}
                    </div>
                </div>
                <div className="asks">
                    <div className="header">
                    <div className="cell">Price</div>
                    <div className="cell">Total</div>
                    <div className="cell">Amount</div>
                    <div className="cell">Count</div>
                    </div>
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
                    {_.map(asksSorted, ({price, count, amount, total}) => (
                        <div className="row" key={price}>
                            <div className="cell">{format5(price)}</div>
                            <div className="cell">{format(total)}</div>
                            <div className="cell">{format(-amount)}</div>
                            <div className="cell">{count}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default OrderBook;
