import React, { useEffect, useState } from "react";
import { ProjectContext } from "./ProjectContext";
import { Card, Button, Row, Col } from "react-bootstrap";
import * as Api from "../../api";
import Project from "./Project";
import ProjectForm from "./ProjectForm";

function Projects({ portfolioOwnerId, isEditable }) {
  const [projects, setProjects] = useState([]);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    Api.get("projectlist", portfolioOwnerId).then((res) =>
      setProjects(res.data)
    );
  }, [portfolioOwnerId]);

  return (
    <ProjectContext.Provider value={{ projects, setProjects }}>
      <Card>
        <Card.Body>
          <Card.Title>프로젝트</Card.Title>
          {projects.map((project) => (
            <Project
              key={project?.user_id}
              project={project}
              isEditable={isEditable}
            />
          ))}
          {isEditable && (
            <Row className="mt-3 text-center mb-4">
              <Col sm={{ span: 20 }}>
                <Button onClick={() => setIsAdding(true)}>+</Button>
              </Col>
            </Row>
          )}
          {isAdding && (
            <ProjectForm
              portfolioOwnerId={portfolioOwnerId}
              setIsAdding={setIsAdding}
            />
          )}
        </Card.Body>
      </Card>
    </ProjectContext.Provider>
  );
}

export default Projects;
