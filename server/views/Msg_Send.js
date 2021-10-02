import React from 'react'
import ReactDom from 'react-dom'
import { sender } from './sender'
import { receiver } from './receiver'
import { msgId } from './msgId'

class Msg_Send extends React.Component {
    constructor() {
      super();
      this.state = { data: [] };
    }
    
    async writeMsg (msg) {

        let message = {
            "sender": 1, //sender
            "receiver": 2, //receiver
            "message": msg,
            "msgId": msgId,
        }
    
        await fetch ("/api/message", {
            method: "POST",
            body: JSON.stringify(message),
            headers: {
              Accept: "application/json, text/plain, */*",
              "Content-Type": "application/json"
            }
        })
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(err => console.log(err));
    }

    render() {
        return (
            <div id='msgBox'>
                <textarea type="text" placeholder="message" ref={'msg'} ></textarea>
                <button input='submit' 
                        type='button' 
                        onClick={this.writeMsg(ReactDom.findDOMNode(this.refs.msg).value) } />
            </div>
        )
    }
}