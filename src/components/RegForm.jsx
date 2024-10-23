import React, { useState } from 'react';

const RegForm = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Проверка на заполненность полей
        if (!username || !password || !email) {
            setError('Пожалуйста, заполните все поля');
            return;
        }

        // Отправка POST-запроса на API
        try {
            const response = await fetch('http://127.0.0.1:8000/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username, 
                    email,
                    password
                }),
            });

            if (!response.ok) {
                throw new Error('Ошибка при отправке отзыва');
            }

            setSuccess('Вы успешно загегистрировались');
            setUsername('');
            setEmail('');
            setPassword('');
            setError('');
        } catch (error) {
            setError('Произошла ошибка: ' + error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit} className='review_form'>
            <p className='review_title'>Добавьте отзыв</p>
            <div className='review_column'>
                <label htmlFor="username" className='review_label'>Логин:</label>
                <input
                    className='review_input'
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
            </div>
            <div className='review_column'>
                <label htmlFor="password" className='review_label'>Пароль:</label>
                <textarea
                    className='review_input'
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            <div className='review_column'>
                <label htmlFor="email" className='review_label'>Email:</label>
                <textarea
                    className='review_input'
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
        
            {error && <div style={{ color: 'red' }}>{error}</div>}
            {success && <div style={{ color: 'green' }}>{success}</div>}
            <button type="submit" className='button review_button'>Войти</button>
        </form>
    );
};

export default RegForm;