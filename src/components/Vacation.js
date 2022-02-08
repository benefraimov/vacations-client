import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook } from '@fortawesome/free-brands-svg-icons'
import { faTrashAlt, faEdit } from "@fortawesome/free-regular-svg-icons"
import { useSelector } from 'react-redux';

function Vacation({ vacationObject, callback }) {
    const [userFollow, setUserFollow] = useState()
    const userRedux = useSelector(({ userReducer }) => userReducer)
    const followersNumber = vacationObject.followers.length

    useEffect(() => {
        setUserFollow(vacationObject.followers.find(follower => follower.user === userRedux.userInfo._id))
    }, [vacationObject])


    const handleFollow = async () => {
        if (userFollow) {
            const user = { _id: userRedux.userInfo._id }
            const { data: resp } = await axios.put(`/api/vacations/unfollow/${vacationObject._id}`, user)
        } else {
            const user = { _id: userRedux.userInfo._id }
            const { data: resp } = await axios.put(`/api/vacations/explore/${vacationObject._id}`, user)
        }
        callback()
    }

    return <Card className='my-3 p-3 rounded' style={{ width: "300px", height: "650px" }}>

        {
            userRedux.userInfo.isAdmin
                ?
                <div>
                    <FontAwesomeIcon
                        className="mb-2 fs-3 float-start edit-hover"
                        style={{ backgroundColor: 'rgba(251, 251, 251, 0.2)' }}
                        onClick={() => console.log("edit")}
                        icon={faEdit}
                    />
                    <FontAwesomeIcon
                        className="mb-2 fs-3 float-end delete-hover"
                        onClick={() => console.log("delete")}
                        icon={faTrashAlt}
                    />
                </div>
                :
                <FontAwesomeIcon
                    className={`ms-auto mb-2 fs-3 follow-hover ${userFollow ? 'text-warning' : 'text-dark'}`}
                    onClick={handleFollow}
                    icon={faFacebook}
                />
        }


        <Card.Img src={vacationObject.picture} variant='top' />

        <Card.Body>
            <Card.Title as='div'><strong>{vacationObject.name}</strong></Card.Title>

            <Card.Text as='p'>
                {vacationObject.description}
            </Card.Text>

            <Card.Text as='div'>
                Dates :
                <br />
                From <br />
                {vacationObject.startdate.slice(0, 10)}<br />
                to <br />
                {vacationObject.enddate.slice(0, 10)}
            </Card.Text><br />

            <Card.Text as='div'>
                Followers : {followersNumber}
            </Card.Text><br />


            <Card.Text as='h3'>Price: ${vacationObject.price}</Card.Text>
        </Card.Body>
    </Card >;
}

export default Vacation;
