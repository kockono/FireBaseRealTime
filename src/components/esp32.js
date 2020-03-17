import React, { Component } from "react";
import App from "../App";
// import firebase from 'firebase'

class Esp32 extends Component {
    
    constructor() {
        super();
        this.state = {
            message: '', // Aqui almacenaremos el mensaje del input
            messages: [
                // {id:0, text: 'text1'},
                // {id:1, text: 'text2'},
                // {id:2, text: 'text3'},
            ]
        }
    }

    updateMessage(e) {
        this.setState({message: e.target.value})
        console.log(e.target.value);
    }

    componentDidMount() {
        window.firebase.database().ref('messages/').on('value', snap => { // Guardar datos en messages5
            const currentmessages = snap.val();
            if(currentmessages != null) {
                this.setState({
                    messages: currentmessages
                });
            }
        });
    }


    hanldeSubmit(e) { // Recibe el evento de la informacion
        e.preventDefault();
        let list = this.state.messages;
        const newMessage = {
            id: this.state.messages.length,
            text: this.state.message
        }
        // list.push(newMessage);
        // this.setState({messages: list})
        window.firebase.database().ref(`messages/${newMessage.id}`) // Contendran una id
        .set(newMessage);
        this.setState({message: ''}); // Limpiar valor
    }

    
    render() {

        const {messages} = this.state;
        const messagesList = messages.map(message => {
            return<li key={message.id}>{message.text}</li>

        })

        return(
            <div>
                <ol>
                    {messagesList}
                </ol>
                    <form onSubmit={this.hanldeSubmit.bind(this)}>
                    <input 
                    type="text"
                    value={this.state.message}
                    onChange={this.updateMessage.bind(this)}
                    />
                    <button>
                    Send
                    </button>
                    </form>
            </div>
        )
    }
}

export default Esp32;