import React from 'react';

export const Home = (props: any) => {
    console.log("Here we go", props);
    return (
        <div>
            <div>Home page</div><br/>
            <button type={"button"} onClick={() => alert(props.auth.getIdToken())}>Show Id Token</button><br/>
            <button type={"button"} onClick={() => alert(props.auth.getAccessToken())}>Show Access Token</button><br/>
            <button type={"button"} onClick={() => alert(props.auth.isAuthenticated())}>Am I authenticated?</button>
        </div>
    )
};
