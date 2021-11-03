import React, {useEffect, useState} from 'react';
import {Card, Form, Icon, Image} from 'semantic-ui-react';
import './App.css';

function App() {
    const [user, setUser] = useState('');
    const [isHireable, setIsHireable] = useState('');
    const [repos, setRepos] = useState('');
    const [myLocation, setMyLocation] = useState('');
    const [myName, setMyName] = useState('');
    const [avatar, setAvatar] = useState('');
    const [bioInfo, setBioInfo] = useState('');
    const [companyInfo, setCompanyInfo] = useState('');
    const [userInput, setUserInput] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("https://api.github.com/users/")
            .then(res => res.json())
            .then(data => {
                setData(data)
            })
    }, [])

    const setData = ({login, avatar_url, hireable, bio, repos, company, name, location}) => {
        setUser(login)
        setAvatar(avatar_url)
        setIsHireable(hireable)
        setBioInfo(bio)
        setRepos(repos)
        setCompanyInfo(company)
        setMyName(name)
        setMyLocation(location)

    }

    const searchInput = (e) => {
        e.preventDefault()
        setUserInput(e.target.value)
    }

    const searchSubmit = () => {
        fetch(`https://api.github.com/users/${userInput}`)
            .then(res => res.json())
            .then(data => {
                if (data.message) {
                    setError(data.message);
                } else {
                    setData(data);
                    console.log(data);
                    setError(null);
                }
            })
    }

    return (
        <div className="holder">
            <div className="navbar">
                <div className="search">
                    <Form onSubmit={searchSubmit}>
                        <Form.Group>
                            <Form.Input id="myInput" placeholder='Github Username' name='Github Username' onChange={searchInput}/>
                            <Form.Button content='Search'/>
                        </Form.Group>
                    </Form>
                </div>
            </div>
            {error ? (
                <error>{error}</error>) : (
                <div className="carddiv">
                    {user ? <Card className="cards">
                        <Image className='cardimage' src={avatar} wrapped ui={false}/>
                        <Card.Content>
                            {myName ? <Card.Header className='card-name'>{myName}</Card.Header>
                                : ''}
                            <Card.Header className='card-text'>{user}</Card.Header>
                        </Card.Content>
                        {myLocation ? <Card.Content className='cardtext'>
                                <Icon name={'location arrow'}/>
                                {myLocation}
                            </Card.Content>
                            : ''}
                        {isHireable ? <Card.Content extra className='cardstats'>
                                <Icon name={'thumbs up outline'}/>
                                {isHireable} Hire me!
                            </Card.Content>
                            : ''}
                        <Card.Content extra className='cardstats'>
                            <Icon name={'download'}/>
                            {repos} <a target={'_blank'} href={`https://github.com/${user}?tab=repositories`}>Public
                            Repos</a>
                        </Card.Content>
                        {bioInfo ? <Card.Content extra className='cardstats'>
                                <Icon name={'arrow alternate circle right'}/>
                                {bioInfo}
                            </Card.Content>
                            : ''}
                        {companyInfo ? <Card.Content extra className='cardstats'>
                                <Icon name={'address card'}/>
                                {companyInfo}
                            </Card.Content>
                            : ''}
                    </Card> : error}
                </div>
            )}
        </div>
    );
}

export default App;
