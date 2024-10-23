import React from "react";
import Modal from "./addappointment";

class Services extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: [],
            filteredItems: [],
            sortBy: 'price', // По умолчанию сортировка по цене
            filter: {
                minPrice: '',
                maxPrice: '',
            },
            modalActive: false,
            pet_name: "",
            phone_number: "",
            email: "",
            date: "",
            time: "",
            author: 8, // Замените на реальный ID текущего пользователя
            status: "RJ", // Задайте значение по умолчанию для статуса
        };
    }


    componentDidMount() {
        fetch("http://127.0.0.1:8000/api/services/")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        items: result,
                        filteredItems: this.sortItems(result, 'price'), // Сортировка по умолчанию
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

    toggleModal = () => {
        this.setState(prevState => ({
            modalActive: !prevState.modalActive,
        }));
    };

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleFilterChange = (e) => {
        const { name, value } = e.target;
        this.setState(prevState => ({
            filter: {
                ...prevState.filter,
                [name]: value,
            },
        }));
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const { pet_name, phone_number, email, date, time, author, status } = this.state;

        fetch("http://127.0.0.1:8000/api/appointment/", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                pet_name,
                phone_number,
                email,
                date,
                time,
                author,
                status,
            }),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            this.toggleModal();
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    };

    sortItems = (items, sortBy) => {
        return items.slice().sort((a, b) => {
            if (sortBy === 'price') {
                return a.price - b.price;
            } else if (sortBy === 'title') {
                return a.title.localeCompare(b.title);
            }
            return 0;
        });
    };

    applyFilters = () => {
        const { items, filter, sortBy } = this.state;
        const filteredItems = items.filter(item => {
            const price = parseFloat(item.price);
            const minPrice = parseFloat(filter.minPrice) || 0;
            const maxPrice = parseFloat(filter.maxPrice) || Infinity;
            return price >= minPrice && price <= maxPrice;
        });
        this.setState({
            filteredItems: this.sortItems(filteredItems, sortBy),
        });
    };

    resetFilters = () => {
        this.setState({
            filter: {
                minPrice: '',
                maxPrice: '',
            },
            filteredItems: this.sortItems(this.state.items, this.state.sortBy),
        });
    };

    render() {
        const { error, isLoaded, filteredItems, modalActive, pet_name, phone_number, email, date, time, filter } = this.state;
        if (error) {
            return <p>Error</p>;
        } else if (!isLoaded) {
            return <p>Loading ...</p>;
        } else {
            return (
                <main id="services">
                    <h1>Услуги</h1>
                    <div className="filters">
                        <label className="label">
                            Сортировка:
                            <select className="review_input" onChange={(e) => this.setState({ sortBy: e.target.value }, this.applyFilters)}>
                                <option value="price">По цене</option>
                                <option value="title">По названию</option>
                            </select>
                        </label>
                        <label className="label">
                            Мин. цена:
                            <input
                                className="review_input"
                                type="number"
                                name="minPrice"
                                value={filter.minPrice}
                                onChange={this.handleFilterChange}
                            />
                        </label>
                        <label className="label">
                            Макс. цена:
                            <input
                                className="review_input"
                                type="number"
                                name="maxPrice"
                                value={filter.maxPrice}
                                onChange={this.handleFilterChange}
                            />
                        </label>
                        <button onClick={this.applyFilters} className="button">Применить</button>
                        <button onClick={this.resetFilters} className="button">Сбросить фильтр</button>
                    </div>
                    <wrap className="services">
                        <ul>
                            {filteredItems
                                .filter(item => item.is_active)
                                .map(item => (
                                    <li key={item.title} className="card_new">
                                        <h4 className="item title">{item.title}</h4>
                                        <p className="item description">{item.description}</p>
                                        <p className="item date">{item.price}$</p>
                                        <button className="card_button button" onClick={this.toggleModal}>Выбрать</button>
                                    </li>
                                ))}
                        </ul>
                    </wrap>
                    <Modal active={modalActive} setActive={this.toggleModal}>
                        <form onSubmit={this.handleSubmit}>
                            <div>
                                <label htmlFor="pet_name">Имя питомца:</label>
                                <input
                                    type="text"
                                    id="pet_name"
                                    name="pet_name"
                                    value={pet_name}
                                    onChange={this.handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="phone_number">Телефон:</label>
                                <input
                                    type="tel"
                                    id="phone_number"
                                    name="phone_number"
                                    value={phone_number}
                                    onChange={this.handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="email">Email:</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={email}
                                    onChange={this.handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="date">Дата:</label>
                                <input
                                    type="date"
                                    id="date"
                                    name="date"
                                    value={date}
                                    onChange={this.handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="time">Время:</label>
                                <input
                                    type="time"
                                    id="time"
                                    name="time"
                                    value={time}
                                    onChange={this.handleChange}
                                    required
                                />
                            </div>
                            <button type="submit" className="button">Отправить заявку</button>
                        </form>
                    </Modal>
                </main>
            );
        }
    }
}

export default Services;