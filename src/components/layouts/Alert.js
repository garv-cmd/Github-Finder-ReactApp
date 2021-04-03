import React from 'react'

const Alert = ({alert}) => { // alert object which is present in state having msg and type
    return (
        alert!==null && (
            <div className={`alert alert-${alert.type}`} >
                <i className="fas fa-info circle"/>{alert.msg}
            </div>
        )
    )
}
export default Alert
