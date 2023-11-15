import React from 'react'

function TextInput({ register, type, onClick, onChange, placeholder, name, value }) {
    return (
        <div>
            <input
                onClick={onClick}
                placeholder={placeholder}
                onChange={onChange}
                type={type || "text"}
                min={0}
                value={value}
                name={name}
                {...register(name, { required: true })}
                className="w-full border-gray-300 border-2 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg py-1 px-2"
            />
        </div>
    )
}

export default TextInput