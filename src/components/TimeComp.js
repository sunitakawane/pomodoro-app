import React from 'react'

export default function TimeComp(props) {
    return (
        <section>
        <h4> {props.cname} Length</h4>
        <section className="interval-comp">
            <button disabled = {props.disableBtn ? "disabled" : ""} onClick={props.decr}>Down</button>
            <p className="interval-length">{props.compLength}</p>
            <button disabled = {props.disableBtn ? "disabled" : ""}  onClick={props.incr}>Up</button>
        </section>
        </section>
    );

}
