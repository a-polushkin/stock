import React, {useEffect}from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {actions as rootActions, NAME as ROOT_NAME} from "../";
import OrderBookContainer from "../../OrderBook/containers/OrderBookContainer";

const mapStateToProps = state => {
    return {
        ...state[ROOT_NAME]
    };
};

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            ...rootActions
        },
        dispatch
    );

const RootContainer =(props)=> {
    useEffect(()=> {
        const {connect, close} = props;
        connect();
        return ()=>{
            close();
        }
        // if we add props to the array of dependencies, it's going to close the connection
        // eslint-disable-next-line
    },[]);

        return (
            <div>
                <OrderBookContainer/>
            </div>
        );
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RootContainer);
