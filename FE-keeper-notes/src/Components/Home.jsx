import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import {
  SiReactrouter,
  SiReact,
  SiBootstrap,
  SiSpring,
  SiJavascript,
  SiMysql,
  SiSpringboot,
  SiLinkedin,
  SiGithub,
} from "react-icons/si";
import { BiLogoJava, BiLinkExternal } from "react-icons/bi";
import { FaPortrait } from "react-icons/fa";

export default function Home() {
  return (
    <Container className="mx-auto my-5 border border-white rounded text-bg-light text-center">
      <Row>
        <h1 className="display-2">Keeper Notes</h1>
        <p>A full stack application built by Rachel VanHorn</p>
        <hr />
      </Row>
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Front End</Card.Title>
              <Card.Text>
                Built with JavaScript, React, React-router, React-Bootstrap and
                Bootstrap
              </Card.Text>
              <Card.Link href="https://developer.oracle.com/languages/javascript.html">
                <SiJavascript />
              </Card.Link>
              <Card.Link href="https://react.dev/">
                <SiReact />
              </Card.Link>
              <Card.Link href="https://reactrouter.com/en/main">
                <SiReactrouter />
              </Card.Link>
              <Card.Link href="https://getbootstrap.com/">
                <SiBootstrap />
              </Card.Link>
              <Card.Link href="https://react-bootstrap.netlify.app/">
                <BiLinkExternal />
              </Card.Link>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Back End</Card.Title>
              <Card.Text>Built with Java, Spring, Springboot, MySQL</Card.Text>

              <Card.Link href="https://www.java.com/en/">
                <BiLogoJava />
              </Card.Link>
              <Card.Link href="https://spring.io/">
                <SiSpring />
              </Card.Link>
              <Card.Link href="https://spring.io/projects/spring-boot">
                <SiSpringboot />
              </Card.Link>
              <Card.Link href="https://www.mysql.com/">
                <SiMysql />
              </Card.Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <h3 className="display-6 p-3">
          Learn more about the project and developer
        </h3>
      </Row>
      <Row>
        <p>
          Hi, I'm Rachel! I'm a full stack developer who came to software from
          zookeeping, embryology and private home management. I live in Las
          Vegas with my husband and 3 children. I am pursuing my first job in
          tech and would love to find something where I can use my background in
          biology as well as my knowledge of full stack developing. Please check
          out my portfolio, GitHub and LinkedIn to learn more about me!{" "}
          <a href="https://rvanhorn.dev/#">
            <FaPortrait />
          </a>{" "}
          <a href="https://github.com/RKVanHorn">
            <SiGithub />
          </a>{" "}
          <a href="https://www.linkedin.com/in/rachelkvanhorn/">
            <SiLinkedin />
          </a>
        </p>
      </Row>
      <Row>
        <p>
          This project is the culmination of my time completing Promineo Tech's
          front end and back end bootcamps. This was started as my final project
          for the back end course, but since I had also completed the front end,
          I wanted to have an example of my abilities as a full stack developer.
          Since zookeeping was a huge part of my life for 20 years, I built a
          database allowing zookeepers to keep track of the animals in their
          care as well as all of their animal notes. The front end was built to
          showcase all of the operations I wrote for the database. A user can
          add a zookeeper, animal or note to the database as well as assign and
          discharge care of an animal to a keeper. They can also update notes,
          keeper info and animal info. Animals and Keepers can be removed from
          the database. The repository for this project can be found at this
          link:{" "}
          <a href="https://github.com/RKVanHorn/keeper_notes">
            <SiGithub />
          </a>
        </p>
      </Row>
    </Container>
  );
}
