import React, { useState } from 'react';

const ReviewForm = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Проверка на заполненность полей
        if (!name || !description || !date) {
            setError('Пожалуйста, заполните все поля');
            return;
        }

        // Отправка POST-запроса на API
        try {
            const response = await fetch('http://127.0.0.1:8000/api/reviews/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    description,
                    date,
                }),
            });

            if (!response.ok) {
                throw new Error('Ошибка при отправке отзыва');
            }

            setSuccess('Отзыв успешно отправлен!');
            setName('');
            setDescription('');
            setDate('');
            setError('');
        } catch (error) {
            setError('Произошла ошибка: ' + error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit} className='review_form'>
            <p className='review_title'>Добавьте отзыв</p>
            <div className='review_column'>
                <label htmlFor="name" className='review_label'>Имя:</label>
                <input
                    className='review_input'
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </div>
            <div className='review_column'>
                <label htmlFor="description" className='review_label'>Описание:</label>
                <textarea
                    className='review_input'
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
            </div>
            <div className='review_column'>
                <label htmlFor="date" className='review_label'>Дата:</label>
                <input
                    className='review_input'
                    type="text"
                    id="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                />
            </div>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            {success && <div style={{ color: 'green' }}>{success}</div>}
            <button type="submit" className='button review_button'>Отправить отзыв</button>
        </form>
    );
};

export default ReviewForm;