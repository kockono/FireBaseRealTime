import React, { Component } from "react";
import App from "../App";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Button, Form } from 'react-bootstrap';
class Esp32 extends Component {
    
    constructor() {
        super();
        this.state = {
            message: 1, // Aqui almacenaremos el mensaje del input
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
            //ppm: this.state.message,
            apagado: this.state.message
        }
        let num=parseInt(newMessage.apagado);
        window.firebase.database().ref(`dispositivos/prototipo01/realtime/0/apagado`) // Contendran una id
        .set(num);
        this.setState({message: ''}); // Limpiar valor
    }
    handleChange(checked){
        this.setState({checked});
    }
    render() {

        const {messages} = this.state;
        const messagesList = messages.map(message => {
        return <div><li key={message.id}>   {message.ppm}</li>Apagado: {message.apagado}</div>

        })

        return(
            <div>
                <ol>
                    {messagesList}
                </ol>
                <Form onChange={this.hanldeSubmit.bind(this)}>
                <Form.Check 
                  type="switch"
                  id="custom-switch"
                  label="On/Off"
                  onChange={this.updateMessage.bind(this)}
                  checked ={this.state.checked}
                />
                </Form>
                <p>this switch {this.state.checked ? 0 : 1}</p>
            </div>
        )
    }
}

export default Esp32;

