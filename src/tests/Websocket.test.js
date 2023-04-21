const WebSocket = require('ws');

describe('WebSocket  tests', () => {
    // Test for successful WebSocket connection establishment
    test('WebSocket connection to bitfinex should be established successfully', done => {
        const wss = new WebSocket('wss://api-pub.bitfinex.com/ws/2');

        wss.on('open', () => {
            expect(wss.readyState).toBe(WebSocket.OPEN);
            wss.close();
            done();
        });
    });

    // Test for WebSocket subscription
    test('WebSocket should send and receive messages', done => {
        const wss = new WebSocket('wss://api-pub.bitfinex.com/ws/2');

        const subscribePayload = {
            "event": "subscribe",
            "channel": "book",
            "symbol": "tBTCUSD"
        }

        wss.on('open', () => {
            // Send subscribe request
            wss.send(JSON.stringify(subscribePayload));

            let firstMessage = null;
            let secondMessage = null;

            // Wait for server to respond with info message
            wss.on('message', (msg) => {
                if (!firstMessage) {
                    firstMessage = JSON.parse(msg)
                } else if (!secondMessage) {
                    secondMessage = JSON.parse(msg)
                    expect(secondMessage.event).toBe("subscribed");
                    wss.close();
                    done();
                }
            });
        });
    });

    // Test for WebSocket connection failure
    test('WebSocket should close gracefully when the server terminates the connection', done => {
        const wss = new WebSocket('wss://api-pub.bitfinex.com/ws/2');

        wss.on('open', () => {
            wss.close();
        });

        wss.on('close', () => {
            expect(wss.readyState).toBe(WebSocket.CLOSED);
            done();
        });
    });
})