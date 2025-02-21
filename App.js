import React, { useState } from 'react';
import axios from 'axios';

function App() {
    const [input, setInput] = useState('');
    const [response, setResponse] = useState(null);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [error, setError] = useState('');

    const handleInputChange = (e) => {
        setInput(e.target.value);
    };

    const handleSelectChange = (e) => {
        const value = Array.from(e.target.selectedOptions, option => option.value);
        setSelectedOptions(value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // Validate JSON input
        try {
            const jsonData = JSON.parse(input);
            const res = await axios.post('https://bfhl-api-1-rgqy.onrender.com/bfhl', jsonData);
            setResponse(res.data);
        } catch (err) {
            setError('Invalid JSON input');
        }
    };

    const renderResponse = () => {
        if (!response) return null;

        const filteredResponse = {};
        if (selectedOptions.includes('Alphabets')) {
            filteredResponse.alphabets = response.alphabets;
        }
        if (selectedOptions.includes('Numbers')) {
            filteredResponse.numbers = response.numbers;
        }
        if (selectedOptions.includes('Highest alphabet')) {
            filteredResponse.highest_alphabet = response.highest_alphabet;
        }

        return (
            <div>
                <h3>Response:</h3>
                <pre>{JSON.stringify(filteredResponse, null, 2)}</pre>
            </div>
        );
    };

    return (
        <div>
            <h1>Your Roll Number</h1>
            <form onSubmit={handleSubmit}>
                <textarea
                    value={input}
                    onChange={handleInputChange}
                    placeholder='Enter JSON here...'
                    rows='4'
                    cols='50'
                />
                <button type='submit'>Submit</button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </form>

            <select multiple onChange={handleSelectChange}>
                <option value='Alphabets'>Alphabets</option>
                <option value='Numbers'>Numbers</option>
                <option value='Highest alphabet'>Highest alphabet</option>
            </select>

            {renderResponse()}
        </div>
    );
}

export default App;