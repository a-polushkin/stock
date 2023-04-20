export const socketMiddleware = (params) => (next) => (action) => {
    const { dispatch, getState } = params
    const { type } = action
    const wss = new WebSocket('wss://api-pub.bitfinex.com/ws/2')

    switch (type) {
        case 'socket/connect':
            wss.onopen = () => {
                wss.send(JSON.stringify({
                    "event": "subscribe",
                    "channel": "book",
                    "symbol": "tBTCUSD"
                }))
            }
            wss.onclose = () => {
                wss.send(JSON.stringify({
                    "event": "unsubscribe",
                    "channel": "book"
                }))
            }
            // wss.onmessage = (msg) => console.log(msg.data)
            break

        case 'socket/disconnect':
            wss.close()
            break

        default:
            break
    }

    return next(action)
}