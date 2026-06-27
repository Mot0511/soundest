import cl from './style.module.sass'

const Fillbutton = (props: any) => {
    return (
        <button 
            className={cl.button + ' ' + (props.isSecondatyColor ? 'bg-secondary-color' : 'bg-primary-color')} 
            style={{width: props.fullwidth ? '100%' : ''}} 
            {...props}
        >{props.children}</button>
    )
}
export default Fillbutton