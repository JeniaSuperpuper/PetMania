import React from "react";

class HeaderTitle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        };
    }

    componentDidMount() {
        fetch("http://127.0.0.1:8000/api/header/")
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
        const { error, isLoaded, items,} = this.state;
        if (error) {
            return <p>Error</p>;
        } else if (!isLoaded) {
            return <p>Loading ...</p>;
        } else {
            return (
                <main id="services">
                    <wrap className="services">
                        <ul>
                            {items
                                .map(item => (
                                    <li key={item.title} className="header__box">
                                        <h4 className="header__item">{item.title}</h4>
                                        <p className="header__item">{item.slogan}</p>
                                        <p className="header__item">{item.city}</p>
                                    </li>
                                ))}
                        </ul>
                    </wrap>

                           
                </main>
            );
        }
    }
}

export default HeaderTitle