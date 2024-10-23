import React from "react";
import logo from "../img/petmania.svg";
import Modal from "./addappointment";
import LoginForm from "./LoginForm";
import RegForm from "./RegForm";
import HeaderTitle from "./headerTitle";

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalActiveLogin: false, // Инициализация состояния модального окна
            modalActiveReg: false, // Инициализация состояния модального окна
            username: '',
            password: '',
            isAuth: false, // Изначально пользователь не авторизован
        };
    }

    toggleModalLogin = () => {
        this.setState(prevState => ({
            modalActiveLogin: !prevState.modalActiveLogin,
        }));
    };

    toggleModalReg = () => {
        this.setState(prevState => ({
            modalActiveReg: !prevState.modalActiveReg,
        }));
    };

    handleLogin = () => {
        // Логика для обработки входа
        this.setState({ isAuth: true });
        this.toggleModalLogin(); // Закрыть модальное окно после входа
    };

    handleLogout = () => {
        // Логика для обработки выхода
        this.setState({ isAuth: false });
    };

    render() {
        const { modalActiveLogin, modalActiveReg, isAuth } = this.state;

        return (
            <header className="header">
                <HeaderTitle />
                <div className="header__menu">
                    <a href="#services" className="header__link">Услуги</a>
                    <a href="#reviews" className="header__link">Отзывы</a>
                    <a href="#contacts" className="header__link">Контакты</a>
                </div>
                <div className="wrap_log">
                    {isAuth ? (
                        <button className="button" onClick={this.handleLogout}>Logout</button>
                    ) : (
                        <>
                            <button className="button" onClick={this.toggleModalLogin}>Login</button>
                            <button className="button" onClick={this.toggleModalReg}>Regist</button>
                        </>
                    )}
                </div>
                <div>
                    {isAuth ? (
                        <Modal active={modalActiveLogin} setActive={this.toggleModalLogin}>
                            <LoginForm onLogin={this.handleLogin} />
                        </Modal>
                    ) : (
                        <>
                            <Modal active={modalActiveLogin} setActive={this.toggleModalLogin}>
                                <LoginForm onLogin={this.handleLogin} />
                            </Modal>
                            <Modal active={modalActiveReg} setActive={this.toggleModalReg}>
                                <RegForm onRegister={this.handleLogin} />
                            </Modal>
                        </>
                    )}
                </div>
            </header>
        );
    }
}

export default Header;