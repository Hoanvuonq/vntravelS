interface inputContent {
    Label: string;
    type: string;
    placeholder: string;
}

const InputC = ({ Label, type, placeholder }: inputContent) => {
    return (
        <div className="inputC">
            <label htmlFor={Label} className="block mb-[1vw] text-label  text-gray-900 dark:text-white">
                {Label}
            </label>
            <input
                type={type}
                id={Label}
                className="border border-gray-300 text-gray-900 xl:text-[0.8vw] text-[3vw] xl:rounded-[0.5vw] rounded-[2vw] focus:ring-blue-500 focus:border-blue-500 block w-full xl:p-[0.6vw] p-[2vw] outline-1 outline-gray-300"
                placeholder={placeholder}
                required
            />
        </div>
    );
};

export default InputC;
