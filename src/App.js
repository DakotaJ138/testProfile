import React, {useEffect, useState} from 'react';
import {Card, Form, Icon, Image} from 'semantic-ui-react';
import semantic from 'semantic-ui-css/semantic.min.css';
import back from './back.mp4';
import Confetti from 'react-confetti'
import './App.css';

function App() {
    const [userInput, setUserInput] = useState('');
    const [error, setError] = useState(null);
    const [users, setUsers] = useState([])


    const searchInput = (e) => {
        e.preventDefault()
        setUserInput(e.target.value)
    }

    const searchSubmit = () => {
        fetch(`https://api.github.com/users/${userInput}`)
            .then(res => res.json())
            .then(data => {
                document.getElementById('myInput').value = '';
                if (data.message) {
                    setError(data.message);
                } else {
                    setUsers([...users, data])
                    setError(null);
                    setUserInput('');

                }
            })
    }

    const startOver = () => {
        document.getElementById('myInput').value = '';
        setUsers([]);
    }


    return (

        <div className="holder">
            <Confetti numberOfPieces={200} recycle={false}/>
            <div className={"headerpage"}>
                <video autoPlay loop muted width={window.visualViewport.width}>
                    <source src={back} type='video/mp4'/>
                </video>
            </div>
            <div className="navbar">
                <div className="reset">
                    <Form onSubmit={startOver}>
                        <Form.Group>
                            <Form.Button content='reset'/>
                        </Form.Group>
                    </Form>
                </div>

                <div className="search">
                    <Form onSubmit={searchSubmit}>
                        <Form.Group>
                            <Form.Input id="myInput" placeholder='Github Username' name='Github Username'
                                        onChange={searchInput}/>
                            <Form.Button content='Search'/>
                        </Form.Group>
                    </Form>
                </div>


            </div>

            <div className='carddiv'>
                {error ? <error>{error}</error> :
                    users.map(u => u.login ? (
                        <div className='cardrow'>
                            <Card className="cards">
                                <Image className='cardimage' src={u.avatar_url} wrapped ui={false}/>
                                <Card.Content>
                                    {u.name ? <Card.Header className='card-name'>{u.name}</Card.Header>
                                        : ''}
                                    <Card.Header className='card-text'>
                                        <a target={'_blank'} href={`https://github.com/${u.login}`}>{u.login}</a>
                                    </Card.Header>
                                </Card.Content>
                                {u.location ? <Card.Content className='cardtext'>
                                        <Icon name={'location arrow'}/>
                                        {u.location}
                                    </Card.Content>
                                    : ''}
                                {u.hireable ? <Card.Content extra className='cardstats'>
                                        <Icon name={'thumbs up outline'}/>
                                        {u.hireable} <a href={`https://github.com/${u.login}`}> Hire me!</a>
                                    </Card.Content>
                                    : ''}

                                <Card.Content extra className='cardstats'>
                                    <Icon name={'download'}/>
                                    <a target={'_blank'}
                                       href={`https://github.com/${u.login}?tab=repositories`}>Public
                                        Repos</a>
                                </Card.Content>
                                {u.bio ? <Card.Content extra className='cardstats'>
                                        <Icon name={'arrow alternate circle right'}/>
                                        {u.bio}
                                    </Card.Content>
                                    : ''}
                                {u.company ? <Card.Content extra className='cardstats'>
                                        <Icon name={'address card'}/>
                                        <a target={'_blank'} href={`https://google.com/search?q=${u.company}`}>{u.company}</a>
                                    </Card.Content>
                                    : ''}
                            </Card>
                        </div>
                    ) : '')}
            </div>
        </div>
    );
}

export default App;