import { types, NAME as ROOT_NAME } from "./reducer";
import { actions as bookActions } from "../OrderBook/actions";

let wss;
const wsUrl = "wss://api-pub.bitfinex.com/ws/2"
let channelId;

export const actions = {
  connect: () => (dispatch, getState) => {
    wss = new WebSocket(wsUrl);
    wss.onopen = () => {
      dispatch(actions.changeConnectionStatus(true));
      if(wss.readyState===1){
        dispatch(actions.subscribeToBook());
      }
    };
    wss.onmessage = msg => {
      const data = JSON.parse(msg.data);
      if (data.event === "subscribed") {
        channelId = data.chanId;
        dispatch(actions.subscribed(data));
        dispatch(bookActions.subscribed(data));
      }
      if (Array.isArray(data) && data.length > 1) {
        const subscriptions = getState()[ROOT_NAME].subscriptions;
        const channel = Object.keys(subscriptions).find(
          key => subscriptions[key].chanId === data[0]
        );
        if (channel) {
          dispatch(bookActions.message(data));
        }
      }
    };
  },

  changeConnectionStatus: payload => ({
    type: types.CHANGE_CONNECTION_STATUS,
    payload
  }),

  subscribeToBook: () => () => {
    const subscribePayload = {
      "event": "subscribe",
      "channel": "book",
      "symbol": "tBTCUSD"
    }
      wss.send(JSON.stringify(subscribePayload));

  },

  unsubscribe: () => () => {
    const unsubscribePayload = {
      "event": "unsubscribe",
      "chanId": channelId
    }
    wss.send(JSON.stringify(unsubscribePayload));
  },

  close:()=>(dispatch)=>{
    if(wss.readyState===1){
      dispatch(actions.unsubscribe());
      wss.close();
    }
  },

  subscribed: payload => ({ type: types.SUBSCRIBED, payload }),

  message: payload => ({ type: types.MESSAGE, payload })
};
