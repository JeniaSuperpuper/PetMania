import React from "react";
import ReviewForm from "./addreview";
import { shuffle } from "lodash";

class Reviews extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: [],
            name: "",
            description: "",
        };
    }

    componentDidMount() {
        fetch("http://127.0.0.1:8000/api/reviews/")
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
        const { error, isLoaded, items } = this.state;

        if (error) {
            return <p>Error</p>;
        } else if (!isLoaded) {
            return <p>Loading ...</p>;
        } else {
            // Перемешиваем список отзывов и берем первые 5 элементов
            const randomReviews = shuffle(items).slice(0, 5);

            return (
                <main id="reviews">
                    <h1>Отзывы</h1>
                    <wrap className="reviews">
                        <ul>
                            {randomReviews.map(item => (
                                <li key={item.author} className="card">
                                    <h4 className="item">{item.name}</h4>
                                    <p className="item">{item.description}</p>
                                    <p className="item date">{item.date}</p>
                                </li>
                            ))}
                        </ul>
                        <ReviewForm />
                    </wrap>
                </main>
            );
        }
    }
}

export default Reviews;