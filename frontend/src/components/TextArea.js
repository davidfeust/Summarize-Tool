import React, {useEffect, useState} from 'react';
import '../styles/TextArea.css'
import {useParams} from 'react-router-dom';

function TextArea(props) {

    const {id} = useParams();


    const getSummary = () => {
        fetch('http://localhost:5000/get_summary?id=' + id, {
            method: 'POST',
            mode: 'cors'
        }).then(response => {
            response.json().then((body) => {
                handleSummary(body['summary']);
                props.setStateOfParentDone()
                props.setStateOfParentLink(body['link'])
                props.setStateOfParentTitle(body['title'])
            })
        });
    }

    const handleSummary = sum => {
        props.setStateOfParentSum(sum)
    };

    const [mounted, setMounted] = useState(false)

    if (!mounted) {
        if (id != null) {
            getSummary();
        }
    }

    useEffect(() => {
        setMounted(true)
    }, [])

    return (
        <div className="sum-textarea">
            <div className="title-res">
                {props.setTitle !== '' ? "Summary: " : ""}
                {props.setTitle}
            </div>
            <br/>
            <div onChange={(e) => e.preventDefault()}>
                {props.setSummary}
            </div>
        </div>
    );
}


export default TextArea;