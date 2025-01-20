export const Input = (props) => {
    return <input
        { ...props }
        className={`h-6 mr-1 text-roboto text-sm rounded-sm py-4 px-2 focus:border focus:border-stone-900 focus:outline-none focus:ring-0 ${props.className}` }
        />
} 