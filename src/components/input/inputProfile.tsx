interface inputContent {
    Label: string;
    type: string;
    placeholder: string;
}

const InputC = ({ Label, type, placeholder }: inputContent) => {
    return (
        <div className="">
            <label htmlFor={Label} className="block mb-2 text-sm font-bold text-gray-900 dark:text-white">
                {Label}
            </label>
            <input
                type={type}
                id={Label}
                className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-1 outline-gray-300"
                placeholder={placeholder}
                required
            />
        </div>
    );
};

export default InputC;
