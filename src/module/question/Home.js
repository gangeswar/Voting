import React from 'react';
import {
    Jumbotron,
    Row,
    Col
} from 'react-bootstrap';
import {
    Link
} from 'react-router-dom';
import add_que from '../../media/add_question.png';

const Home = () => {
    return(
      <div className="Home">
    <Jumbotron>
        <Col xsOffset={5} >
        <h2>Admin</h2>
        </Col>
    </Jumbotron>
    <Row className="box-space">
        <Col xsPush={2}  sm={2}  mdPush={1}>
        <Link to="/question/totaluser" className="btn btn-sq-lg btn-success">
        <br/> <br/><br/>
        Total User
        </Link>
        </Col>
        <Col xsPush={2} smPush={2}  md={2}>
        <Link to="question/add">
        <img id="plus" src={add_que} alt="question add" width="170" height="170" /></Link>
        </Col>
        <Col xsPush={3} sm={2} >
        <Link to="/question/totalquestion" className="btn btn-sq-lg  btn-primary">
        <br/> <br/><br/>
        Total Question
        </Link>
        </Col>
    </Row>
</div>
     );
}

export default Home;
