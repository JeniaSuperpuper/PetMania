import React from "react";

class Appointment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        };
    }

    componentDidMount() {
        fetch("http://127.0.0.1:8000/api/appointment/")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        items: result,
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error,
                    });
                }
            );
    }

    render() {
        const { error, isLoaded, items} = this.state;
        if (error) {
            return <p>Error</p>;
        } else if (!isLoaded) {
            return <p>Loading ...</p>;
        } else {
            return (
                <main id="services">
                    <h1>Услуги</h1>
                    <wrap className="services">
                        <ul>
                            {items
                                .filter(item => item.author.id)
                                .map(item => (
                                    <li key={item.id} className="card_new">
                                        <h4 className="item title">{item.pet_name}</h4>
                                        <p className="item description">{item.phone_number}</p>
                                        <p className="item description">{item.email}</p>
                                        <p className="item description">{item.date}</p>
                                        <p className="item description">{item.time}</p>
                                        <p className="item description">{item.status === "RJ" ? "На расмотрении" : "Одобрено"} </p>
                                    </li>
                                ))}
                        </ul>
                    </wrap>

                           
                </main>
            );
        }
    }
}

export default Appointment