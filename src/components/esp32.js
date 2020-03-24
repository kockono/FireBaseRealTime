import React, { Component } from "react";
import App from "../App";
// import firebase from 'firebase'

class Esp32 extends Component {
    
    constructor() {
        super();
        this.state = {
            message: '', // Aqui almacenaremos el mensaje del input
            messages: [

            ]
        }
    }

    updateMessage(e) {
        this.setState({message: e.target.value})
        console.log(e.target.value);
    }

    componentDidMount() {
        window.firebase.database().ref('dispositivos/prototipo01/realtime/').on('value', snap => { // Guardar datos en messages5
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
        const newMessage = {
            id: 0,
            ppm: this.state.message,
            apagado: this.state.message
        }
        // parseInt(apagado);
        window.firebase.database().ref(`dispositivos/prototipo01/realtime/${newMessage.id}`) // Contendran una id
        .set(newMessage);
        this.setState({message: ''}); // Limpiar valor
    }
    
    render() {

        const {messages} = this.state;
        const messagesList = messages.map(message => {
            return <div><li key={message.id}>   {message.ppm}</li>Apagado: {message.apagado}</div>

        })

        return(
            <div>
                <ol>
                    {messagesList}
                </ol>
                    <form onSubmit={this.hanldeSubmit.bind(this)}>
                    <input 
                    type="apagado"
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