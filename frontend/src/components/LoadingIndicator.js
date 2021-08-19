import {usePromiseTracker} from "react-promise-tracker";
import Loader from "react-loader-spinner";
import React from "react";

export const LoadingIndicator = () => {

    const {promiseInProgress} = usePromiseTracker();

    return (
        promiseInProgress &&
        <div>
            <div
                style={{
                    height: "50%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "min-content",
                    margin: "auto"
                }}
            >
                <Loader type="Rings" color="#2b50ad" height="60" width="60"/>
            </div>
            <p className="text" style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "-10px"
            }}>Please wait...</p>
        </div>
    );
}