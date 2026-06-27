import { useTypedSelector } from "@/app/hooks/useTypedSelector";
import cl from './notification.module.sass'
import { useTypedDispatch } from "@/app/hooks/useTypedDispatch";
import { NotificationsSlice } from "@/app/store/reducers/NotificationsSlice";


function Notification() {

    const {isVisible, title, body, color} = useTypedSelector(states => states.notifications)
    const dispatch = useTypedDispatch()
    const {hideNotification} = NotificationsSlice.actions

    const onHide = () => dispatch(hideNotification())

    return (
        <div 
            className={cl.notification} 
            style={{backgroundColor: color, right: isVisible ? '10px' : '-425px'}}
            onClick={onHide}
        >
            <h3>{title}</h3>
            <p>{body}</p>
        </div>
    );
}

export default Notification;