import React, { useState } from 'react'
import  {Form, Button, Card, Container,Row,Col}  from 'react-bootstrap';
import Swal from 'sweetalert2'
import { PROYECTO1_backend } from 'declarations/PROYECTO1_backend';
import { useNavigate} from 'react-router-dom';
const Create = () => {
 const[title, setTitle] = useState("");
 const[genero, setGenero] = useState("");
 const[rating, setRating] = useState("0");

const navigate = useNavigate()

 const onChangeTitle = (e)=>{
  e.preventDefault();
  const preTitle = e.target.value
  setTitle(preTitle);
 }

 const onChangeGenero = (e)=>{
  e.preventDefault();
  const preGenero = e.target.value
  setGenero(preGenero);
 }

 const onChangeRating = (e)=>{
  e.preventDefault();
  const preRating = e.target.value
  setRating(preRating);
 }

 
 function createBooks() {
  Swal.fire("Guardando Libro");
  Swal.showLoading();
    PROYECTO1_backend.addBook(BigInt(rating), title, genero).then(books=>{
      Swal.fire({
        icon: "success",
        title: "Libro Guardado",
        showConfirmButton: false,
        timer: 1500
      }).then(()=>navigate('/'))
    }).catch((err)=>{
      Swal.fire({
        icon: "success",
        title: "¡ERROR!",
      });
    })
  } 
    return (
            <Container className='m-7'>
                <Row className='m-5'>
                  <Card>
                  <Card.Body>
                    <Card.Title>Agregar Libro </Card.Title>
                    <Form>
                    <Row>
                      <Col>
                      </Col>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Ingresa El Titulo Del Libro:</Form.Label>
            <Form.Control name="title" onChange={onChangeTitle} type="text" placeholder="Ingresa Titulo" />
          </Form.Group> 
                    </Row>
                    <Row>
                      <Col>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Ingresa El Genero Del Libro:</Form.Label>
            <Form.Control name="genero" onChange={onChangeGenero} as="textarea" placeholder="Ingresa Genero" />
          </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Ingresa El Rating Del Libro:</Form.Label>
            <Form.Control name = "rating" onChange={onChangeRating} type="number" placeholder="Ingresa Rating" />
          </Form.Group> 
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                      
          <Button variant="primary" onClick={createBooks}>
            Guardar Libro
          </Button>
                      </Col>
                    </Row>
        
        </Form>
      
       </Card.Body>
      </Card>
    </Row>
   </Container>
    
        );
      }


export default Create;