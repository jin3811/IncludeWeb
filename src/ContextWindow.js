import React from "react"
import { Provider, useSelector, useDispatch } from 'react-redux';

import "./ContextWindow.css"
import reduer from "./DpwindowStore";
import activity from "./activity"

import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

const RouteBtn = (props) => {
    const dispatch = useDispatch()
    return(
        <div>
            <div id="btn-style" onClick={(e) => {
                dispatch({ type : "SET_SEMESTER", newSemester : props.name })
            }}>
                <Button >{ props.name }</Button>
            </div>
        </div>
    )
}

const ActivityLog = (props) => {
    // console.log(props.log.activityName)
    // console.log(props.log.participant)
    // console.log(props.log.contents)

    const getActivityName = log => {
        if (props.log.activityName === undefined) return ""
        else return props.log.activityName
    }

    const getParticipant = log => {
        if (props.log.participant === undefined) return ""
        else return props.log.participant.map(m => <span>{m + " "}</span>)
    }

    const getContents = log => {
        if (props.log.contents === undefined) return ""
        else return props.log.contents
    }

    return (
        <div>
            <div className="topWhiteSpace" />
            <h4>활동명 : { getActivityName(props.log) }
            </h4>
            <h5>참여 동아리원 : { getParticipant(props.log) } 
            </h5>
            <h5>활동 설명 : { getContents(props.log) }</h5>
        </div>
    )
} 

const DisplayWindow = () => {
    const inform = useSelector(state => { return state })
    
    return (
        <div id="DpWindow">
            <h3>학기 : { inform.semester }</h3>
            {
                activity[inform.semester].map(a => <ActivityLog log={a} />)
            }
            <hr />
            <h4>{inform.semester} 명단</h4>
        </div>
    )
}

const ContextWindow = () => {
    const semester = ["22-1"]
    {
        for(let i = 0; i < 3; i++) {
            let newSemester = ""
            if (semester[semester.length - 1][3] === "1") {
                for (let j = 0; j < 3; j++) newSemester += semester[i][j]
                newSemester += "2"
            }
            else {
                newSemester += "" + (parseInt(semester[i]) + 1)
                newSemester += "-1"
            }
            semester.push(newSemester)
        }
    }
    return(
        <div>
        <Provider store={reduer}>
            <div className="topWhiteSpace" />
            <div id="mainWindow">
                <ButtonGroup variant="text" orientation="vertical" aria-label="outlined primary button group" size="medium">
                    { semester.map(s => <RouteBtn name={s}/>) }
                </ButtonGroup>
                <DisplayWindow />
            </div>
        </Provider>
        </div>
    );
}

export default ContextWindow;