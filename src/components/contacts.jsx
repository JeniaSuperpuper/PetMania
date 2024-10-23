import React from "react";
import ReviewForm from "./addreview";

class Contacts extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            error: null,
            isLoaded: false,
            items: [],
            name: "",
            description: "",

        }
    }
    componentDidMount() {
        fetch("http://127.0.0.1:8000/api/contacts/")
        .then(res => res.json())
        .then(
            (result) => {
                this.setState({
                    isLoaded: true,
                    items: result
                });
            },
            (error) => {
                this.setState({
                    isLoaded: true,
                    error
                });
            }
        )
    }
    render() {
        const {error, isLoaded, items} = this.state;
        if (error) {
            return <p> Error </p>
        } else if (!isLoaded) {
            return <p>LOading ...</p>
        }else {
            return (
                <main id="reviews">
                    <h1>Контакты</h1>
                    <wrap className="">
                    <ul>
                        {items.map(item => (
                            <li key={item.address} className="contacts">
                                <h4 className="item">Адрес: {item.address}</h4>
                                <p className="item">Контакты: {item.phone_number}</p>
                                <p className="item ">График работы: {item.operating_mode}</p>
                                <p className="item "><a className="contacts_link" href={item.instagram}>instagram</a></p>
                                <p className="item "><a href={item.youtube} className="contacts_link">youtube</a></p>
                                <p className="item "><a href={item.facebook} className="contacts_link">facebook</a></p>
                            </li>
                        ))}
                    </ul>
                    </wrap>
                </main>
            )
        }
    }
}

export default Contacts;